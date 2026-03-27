// Proactive Alert Engine — runs daily after score computation
// Analyzes HubSpot data and generates actionable alerts

import { createAdminClient } from "@/lib/supabase/admin";

interface Alert {
  alert_type: string;
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
  metric_id?: string;
  domain?: string;
  owner_id?: string;
  deal_id?: string;
  current_value?: number;
  previous_value?: number;
  threshold?: number;
  ai_suggestion?: string;
}

interface DealRow {
  id: string;
  properties: Record<string, any>;
}

var FOURTEEN_DAYS = 14 * 24 * 60 * 60 * 1000;
var SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
var THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export async function generateAlerts(tenantId: string): Promise<{ generated: number }> {
  var supabase = createAdminClient();
  var alerts: Alert[] = [];

  // Fetch all tenant data
  var [dealsRes, contactsRes, scoresRes, prevScoresRes] = await Promise.all([
    supabase.from("hs_deals").select("*").eq("tenant_id", tenantId),
    supabase.from("hs_contacts").select("*").eq("tenant_id", tenantId),
    supabase.from("daily_scores").select("*").eq("tenant_id", tenantId).order("score_date", { ascending: false }).limit(1),
    supabase.from("daily_scores").select("*").eq("tenant_id", tenantId).order("score_date", { ascending: false }).range(1, 1),
  ]);

  var deals = (dealsRes.data ?? []) as any[];
  var contacts = (contactsRes.data ?? []) as any[];
  var todayScore = scoresRes.data?.[0];
  var prevScore = prevScoresRes.data?.[0];
  var now = Date.now();

  // ══════════════════════════════════════════════════
  // 1. PIPELINE ALERTS
  // ══════════════════════════════════════════════════

  var openDeals = deals.filter(function(d) { return d.properties?.hs_is_closed !== "true"; });
  var wonDeals = deals.filter(function(d) { return d.properties?.hs_is_closed_won === "true"; });
  var closedDeals = deals.filter(function(d) { return d.properties?.hs_is_closed === "true"; });

  // 1a. Deals stalled >14 jours
  var stalledDeals = openDeals.filter(function(d) {
    var lastActivity = d.properties?.hs_last_sales_activity_date || d.properties?.notes_last_updated;
    if (!lastActivity) return true;
    return (now - new Date(lastActivity).getTime()) > FOURTEEN_DAYS;
  });

  if (stalledDeals.length > 0) {
    var stalledValue = stalledDeals.reduce(function(s, d) { return s + (Number(d.properties?.amount) || 0); }, 0);
    alerts.push({
      alert_type: "stalled_deal",
      severity: stalledDeals.length >= 5 ? "critical" : "warning",
      title: stalledDeals.length + " deal" + (stalledDeals.length > 1 ? "s" : "") + " sans activite depuis 14+ jours",
      description: formatEur(stalledValue) + " en jeu. Deals : " + stalledDeals.slice(0, 5).map(function(d) { return d.properties?.dealname || "Sans nom"; }).join(", ") + (stalledDeals.length > 5 ? " et " + (stalledDeals.length - 5) + " autres" : ""),
      domain: "pipeline",
      current_value: stalledDeals.length,
      ai_suggestion: "Priorise les deals par montant et contacte les owners. Les deals bloques >30j sont probablement morts — ferme-les pour assainir le pipe.",
    });
  }

  // 1b. Deals sans montant
  var noAmount = openDeals.filter(function(d) { return !d.properties?.amount || Number(d.properties.amount) === 0; });
  if (noAmount.length > 0 && noAmount.length / Math.max(openDeals.length, 1) > 0.2) {
    alerts.push({
      alert_type: "data_quality",
      severity: noAmount.length / Math.max(openDeals.length, 1) > 0.5 ? "critical" : "warning",
      title: noAmount.length + " deal" + (noAmount.length > 1 ? "s" : "") + " sans montant (" + Math.round(noAmount.length / Math.max(openDeals.length, 1) * 100) + "% du pipe)",
      description: "Impossible de faire un forecast fiable sans montants. Deals : " + noAmount.slice(0, 3).map(function(d) { return d.properties?.dealname || "Sans nom"; }).join(", "),
      domain: "data_quality",
      current_value: noAmount.length,
      threshold: Math.round(openDeals.length * 0.2),
      ai_suggestion: "Demande a chaque commercial de mettre un montant estime sur ses deals. Meme une fourchette vaut mieux que 0.",
    });
  }

  // 1c. Pipeline coverage
  var openValue = openDeals.reduce(function(s, d) { return s + (Number(d.properties?.amount) || 0); }, 0);
  var monthlyWon = wonDeals.filter(function(d) {
    var cd = d.properties?.closedate;
    if (!cd) return false;
    var closeDate = new Date(cd);
    return (now - closeDate.getTime()) < THIRTY_DAYS;
  });
  var monthlyRevenue = monthlyWon.reduce(function(s, d) { return s + (Number(d.properties?.amount) || 0); }, 0);
  var coverageRatio = monthlyRevenue > 0 ? openValue / monthlyRevenue : 0;

  if (coverageRatio > 0 && coverageRatio < 3) {
    alerts.push({
      alert_type: "pipeline_hygiene",
      severity: coverageRatio < 2 ? "critical" : "warning",
      title: "Pipeline coverage a " + coverageRatio.toFixed(1) + "x (objectif : 3x minimum)",
      description: "Pipeline : " + formatEur(openValue) + " vs revenue mensuel : " + formatEur(monthlyRevenue) + ". Risque de ne pas atteindre les objectifs.",
      domain: "pipeline",
      current_value: Math.round(coverageRatio * 10) / 10,
      threshold: 3,
      ai_suggestion: "Genere plus de pipe : augmente la prospection, reactive les deals perdus recuperables, ou monte le deal size moyen.",
    });
  }

  // 1d. Deals proches de la close date mais en early stage
  var atRiskClose = openDeals.filter(function(d) {
    var cd = d.properties?.closedate;
    var stage = d.properties?.dealstage || "";
    if (!cd) return false;
    var daysToClose = (new Date(cd).getTime() - now) / (24 * 60 * 60 * 1000);
    var isEarlyStage = stage.includes("discovery") || stage.includes("qualification") || stage.includes("appointmentscheduled");
    return daysToClose < 14 && daysToClose > -7 && isEarlyStage;
  });

  if (atRiskClose.length > 0) {
    alerts.push({
      alert_type: "revenue_risk",
      severity: "warning",
      title: atRiskClose.length + " deal" + (atRiskClose.length > 1 ? "s" : "") + " proche" + (atRiskClose.length > 1 ? "s" : "") + " de la close date mais en early stage",
      description: "Ces deals risquent de glisser : " + atRiskClose.slice(0, 3).map(function(d) { return d.properties?.dealname; }).join(", "),
      domain: "pipeline",
      current_value: atRiskClose.length,
      ai_suggestion: "Soit pousse la close date, soit accelere la progression — organise un call de closing cette semaine.",
    });
  }

  // ══════════════════════════════════════════════════
  // 2. PERFORMANCE ALERTS
  // ══════════════════════════════════════════════════

  // 2a. Win rate
  if (closedDeals.length >= 10) {
    var winRate = wonDeals.length / closedDeals.length;
    if (winRate < 0.2) {
      alerts.push({
        alert_type: "win_rate_drop",
        severity: "critical",
        title: "Win rate a " + Math.round(winRate * 100) + "% (benchmark B2B SaaS : 25-35%)",
        description: wonDeals.length + " won / " + closedDeals.length + " closed. Probleme de qualification ou de closing.",
        domain: "performance",
        current_value: Math.round(winRate * 100),
        threshold: 25,
        ai_suggestion: "Analyse les deals perdus : est-ce un probleme de pricing, de timing, ou de fit ? Focus sur la qualification en amont.",
      });
    } else if (winRate < 0.25) {
      alerts.push({
        alert_type: "win_rate_drop",
        severity: "warning",
        title: "Win rate a " + Math.round(winRate * 100) + "% — en dessous de la moyenne",
        description: "Benchmark B2B SaaS : 25-35%. Analyse les patterns des deals perdus.",
        domain: "performance",
        current_value: Math.round(winRate * 100),
        threshold: 25,
      });
    }
  }

  // 2b. Velocity spike
  var recentWon = wonDeals.filter(function(d) {
    var cd = d.properties?.closedate;
    return cd && (now - new Date(cd).getTime()) < THIRTY_DAYS * 3;
  });
  if (recentWon.length >= 5) {
    var cycles = recentWon.map(function(d) {
      var created = new Date(d.properties.createdate).getTime();
      var closed = new Date(d.properties.closedate).getTime();
      return Math.round((closed - created) / (24 * 60 * 60 * 1000));
    }).filter(function(c) { return c > 0 && c < 365; });

    if (cycles.length > 0) {
      var avgCycle = Math.round(cycles.reduce(function(s, c) { return s + c; }, 0) / cycles.length);
      if (avgCycle > 90) {
        alerts.push({
          alert_type: "velocity_spike",
          severity: "warning",
          title: "Cycle de vente moyen a " + avgCycle + " jours",
          description: "C'est long pour du B2B SaaS. Benchmark SMB : 14-30j, Mid-Market : 30-90j.",
          domain: "performance",
          current_value: avgCycle,
          threshold: 90,
          ai_suggestion: "Identifie ou les deals ralentissent (quel stage) et optimise : meilleurs contenus, process de validation, pricing simplifie.",
        });
      }
    }
  }

  // ══════════════════════════════════════════════════
  // 3. DATA QUALITY ALERTS
  // ══════════════════════════════════════════════════

  // 3a. Deals sans close date
  var noCloseDate = openDeals.filter(function(d) { return !d.properties?.closedate; });
  if (noCloseDate.length > 3) {
    alerts.push({
      alert_type: "data_quality",
      severity: "warning",
      title: noCloseDate.length + " deals ouverts sans date de closing prevue",
      description: "Impossible de forecaster sans close dates. Reps : force la saisie.",
      domain: "data_quality",
      current_value: noCloseDate.length,
      ai_suggestion: "Ajoute une close date estimee sur chaque deal. Meme approximative, ca permet un forecast.",
    });
  }

  // 3b. Contacts sans email
  var noEmail = contacts.filter(function(c) { return !c.properties?.email; });
  if (contacts.length > 0 && noEmail.length / contacts.length > 0.3) {
    alerts.push({
      alert_type: "data_quality",
      severity: "info",
      title: Math.round(noEmail.length / contacts.length * 100) + "% des contacts sans email",
      description: noEmail.length + " contacts sur " + contacts.length + " n'ont pas d'email.",
      domain: "data_quality",
      current_value: noEmail.length,
    });
  }

  // ══════════════════════════════════════════════════
  // 4. SCORE DROP ALERTS
  // ══════════════════════════════════════════════════

  if (todayScore && prevScore) {
    var scoreDrop = (prevScore.adoption_score || 0) - (todayScore.adoption_score || 0);
    if (scoreDrop >= 10) {
      alerts.push({
        alert_type: "score_drop",
        severity: scoreDrop >= 20 ? "critical" : "warning",
        title: "Score d'adoption en baisse : " + todayScore.adoption_score + "/100 (-" + Math.round(scoreDrop) + " pts)",
        description: "Le score est passe de " + prevScore.adoption_score + " a " + todayScore.adoption_score + ". Verifie la qualite des donnees et l'activite des reps.",
        domain: "adoption",
        current_value: todayScore.adoption_score,
        previous_value: prevScore.adoption_score,
        ai_suggestion: "Compare les domaines : Data Discipline, Pipeline Rigor, Activity Logging. Le domaine qui a le plus baisse est ta priorite.",
      });
    }
  }

  // ══════════════════════════════════════════════════
  // 5. QUICK WINS
  // ══════════════════════════════════════════════════

  // 5a. Deals avec montant élevé et activité récente
  var hotDeals = openDeals.filter(function(d) {
    var amount = Number(d.properties?.amount) || 0;
    var lastActivity = d.properties?.hs_last_sales_activity_date;
    if (amount < 5000 || !lastActivity) return false;
    return (now - new Date(lastActivity).getTime()) < SEVEN_DAYS;
  }).sort(function(a, b) { return (Number(b.properties?.amount) || 0) - (Number(a.properties?.amount) || 0); });

  if (hotDeals.length > 0) {
    alerts.push({
      alert_type: "quick_win",
      severity: "info",
      title: hotDeals.length + " deal" + (hotDeals.length > 1 ? "s" : "") + " chaud" + (hotDeals.length > 1 ? "s" : "") + " avec activite recente",
      description: "Focus : " + hotDeals.slice(0, 3).map(function(d) { return d.properties?.dealname + " (" + formatEur(Number(d.properties?.amount)) + ")"; }).join(", "),
      domain: "pipeline",
      current_value: hotDeals.length,
      ai_suggestion: "Ces deals sont actifs et gros — assure-toi que chaque owner a une prochaine etape planifiee cette semaine.",
    });
  }

  // ══════════════════════════════════════════════════
  // SAVE ALERTS
  // ══════════════════════════════════════════════════

  if (alerts.length === 0) {
    return { generated: 0 };
  }

  // Clear old active alerts for this tenant (replace with fresh ones)
  await supabase
    .from("alerts")
    .update({ status: "resolved", resolved_at: new Date().toISOString() })
    .eq("tenant_id", tenantId)
    .eq("status", "active");

  // Insert new alerts
  var rows = alerts.map(function(a) {
    return { tenant_id: tenantId, ...a };
  });

  var { error } = await supabase.from("alerts").insert(rows);
  if (error) {
    console.error("[alerts] Insert error:", error.message);
  }

  return { generated: alerts.length };
}

function formatEur(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M EUR";
  if (n >= 1000) return Math.round(n / 1000) + "K EUR";
  return n + " EUR";
}
