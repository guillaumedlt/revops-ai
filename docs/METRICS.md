# METRICS.md — 87 Metrics Specifications

> Format structuré pour chaque métrique. Claude Code doit implémenter chaque fonction
> en suivant l'interface `MetricResult` définie dans AGENTS.md.

---

## Interface commune

```typescript
interface MetricResult {
  value: number;
  displayValue: string;         // "34.2%", "€45,200", "12.3 jours"
  trend: number | null;         // % change vs previous period
  trendDirection: 'up' | 'down' | 'flat';
  status: 'good' | 'warning' | 'critical';
  metadata: Record<string, any>; // Drill-down data
  alerts: Alert[];
  sampleSize: number;
}

interface MetricFilter {
  dateRange: { start: Date; end: Date };
  ownerIds?: string[];
  pipeline?: string;
  dealStage?: string;
  amountRange?: { min: number; max: number };
  source?: string;
}
```

---

## Catégorie 1 — Lead Management (L1-L10)

### L1: Volume de Leads Créés
- **ID**: `lead_volume`
- **Calcul**: `COUNT(hs_contacts WHERE lifecyclestage = 'lead' AND createdate IN period)`
- **Champs HubSpot**: `createdate`, `lifecyclestage`
- **Affichage**: Nombre + trend bar chart par semaine/mois
- **Visualisation**: `TrendLine` (area chart avec barres)
- **Filtres**: période, owner, source
- **Seuils**: aucun (informatif), alerte si -30% vs période précédente
- **Drill-down**: Liste des leads par date, owner, source

### L2: Volume de Leads par Owner
- **ID**: `lead_volume_by_owner`
- **Calcul**: `GROUP BY hubspot_owner_id → COUNT(*)`
- **Champs HubSpot**: `createdate`, `lifecyclestage`, `hubspot_owner_id`
- **Affichage**: Horizontal bar chart par owner
- **Visualisation**: `HorizontalBar`
- **Filtres**: période, source
- **Seuils**: alerte si écart > 3x entre min/max owner
- **Drill-down**: Détail par owner avec timeline

### L3: Lead-to-Deal Conversion Rate
- **ID**: `lead_to_deal_rate`
- **Calcul**: `COUNT(contacts avec deal associé) / COUNT(contacts lead) × 100`
- **Champs HubSpot**: `lifecyclestage`, `deal_ids` (association)
- **Affichage**: Pourcentage + gauge
- **Visualisation**: `GaugeChart`
- **Filtres**: période, owner, source
- **Seuils**: good > 20%, warning 10-20%, critical < 10%
- **Drill-down**: Leads convertis vs non convertis

### L4: Lead-to-Deal par Owner
- **ID**: `lead_to_deal_by_owner`
- **Calcul**: Par owner → taux de conversion
- **Champs HubSpot**: `lifecyclestage`, `hubspot_owner_id`, associations
- **Affichage**: Bar chart comparatif
- **Visualisation**: `HorizontalBar` avec ligne de moyenne
- **Filtres**: période, source
- **Seuils**: warning si owner < 50% de la moyenne équipe
- **Drill-down**: Détail par owner

### L5: Lead Source Distribution
- **ID**: `lead_source_distribution`
- **Calcul**: `GROUP BY hs_analytics_source → COUNT(*) + conversion rate`
- **Champs HubSpot**: `hs_analytics_source`, `hs_analytics_source_data_1`
- **Affichage**: Donut chart + tableau
- **Visualisation**: `DonutChart` + table
- **Filtres**: période, owner
- **Seuils**: aucun (informatif)
- **Drill-down**: Par source → sous-source → leads individuels

### L6: Speed to Lead (Time to First Engagement)
- **ID**: `speed_to_lead`
- **Calcul**: `MEDIAN(hs_time_to_first_engagement)` converti en heures
- **Champs HubSpot**: `hs_time_to_first_engagement` (millisecondes)
- **Affichage**: Heures + distribution histogram
- **Visualisation**: `DistributionHistogram`
- **Filtres**: période, owner
- **Seuils**: good < 4h, warning 4-24h, critical > 24h
- **Drill-down**: Distribution par tranche horaire, par owner

### L7: Leads Non Travaillés (Unworked)
- **ID**: `unworked_leads`
- **Calcul**: `COUNT(contacts WHERE hs_is_unworked = true AND lifecyclestage = 'lead')`
- **Champs HubSpot**: `hs_is_unworked`, `lifecyclestage`
- **Affichage**: Nombre + pourcentage du total
- **Visualisation**: `KPICard` avec spark trend
- **Filtres**: période, owner
- **Seuils**: good < 5%, warning 5-15%, critical > 15%
- **Drill-down**: Liste des leads non travaillés avec ancienneté

### L8: Lead Aging
- **ID**: `lead_aging`
- **Calcul**: Répartition par tranche d'âge: 0-7j, 7-14j, 14-30j, 30-60j, 60j+
- **Champs HubSpot**: `createdate`, `lifecyclestage`
- **Affichage**: Stacked bar chart
- **Visualisation**: `StackedArea` ou `HorizontalBar` stacked
- **Filtres**: période, owner
- **Seuils**: critical si > 30% des leads > 30 jours
- **Drill-down**: Liste par tranche

### L9: Lead Status Distribution
- **ID**: `lead_status_distribution`
- **Calcul**: `GROUP BY hs_lead_status → COUNT(*)`
- **Champs HubSpot**: `hs_lead_status`
- **Affichage**: Donut chart + funnel-like view
- **Visualisation**: `DonutChart`
- **Filtres**: période, owner
- **Seuils**: aucun (informatif)
- **Drill-down**: Par statut → liste de leads

### L10: Contact-to-Company Association Rate
- **ID**: `contact_company_rate`
- **Calcul**: `COUNT(contacts avec company associée) / COUNT(contacts) × 100`
- **Champs HubSpot**: `company_ids` (association)
- **Affichage**: Pourcentage
- **Visualisation**: `KPICard`
- **Filtres**: période, owner
- **Seuils**: good > 80%, warning 60-80%, critical < 60%
- **Drill-down**: Contacts sans company

---

## Catégorie 2 — Pipeline (P1-P12)

### P1: Pipeline Value Total
- **ID**: `pipeline_value`
- **Calcul**: `SUM(amount) WHERE hs_is_closed = false`
- **Champs HubSpot**: `amount`, `hs_is_closed`
- **Affichage**: €XXX,XXX + trend
- **Visualisation**: `KPICard`
- **Filtres**: période (closedate), owner, pipeline
- **Seuils**: informatif, alerte si -20% vs mois précédent

### P2: Pipeline Value par Stage
- **ID**: `pipeline_by_stage`
- **Calcul**: `GROUP BY dealstage → SUM(amount), COUNT(*)`
- **Champs HubSpot**: `dealstage`, `amount`
- **Affichage**: Funnel chart horizontal
- **Visualisation**: `FunnelChart`
- **Filtres**: pipeline, owner
- **Seuils**: alerte si un stage contient > 50% de la valeur totale

### P3: Pipeline Value par Owner
- **ID**: `pipeline_by_owner`
- **Calcul**: `GROUP BY hubspot_owner_id → SUM(amount)`
- **Champs HubSpot**: `hubspot_owner_id`, `amount`
- **Affichage**: Horizontal bar chart
- **Visualisation**: `HorizontalBar`
- **Filtres**: pipeline, période
- **Seuils**: alerte si écart > 3x entre owners

### P4: Nombre de Deals par Stage
- **ID**: `deal_count_by_stage`
- **Calcul**: `GROUP BY dealstage → COUNT(*)`
- **Affichage**: Bar chart vertical
- **Visualisation**: `FunnelChart` (mode count)
- **Filtres**: pipeline, owner, période

### P5: Weighted Pipeline
- **ID**: `weighted_pipeline`
- **Calcul**: `SUM(amount × hs_deal_stage_probability)` par stage
- **Champs HubSpot**: `amount`, `hs_deal_stage_probability`
- **Affichage**: KPI card + breakdown par stage
- **Visualisation**: `KPICard` + `StackedArea`
- **Filtres**: pipeline, owner
- **Seuils**: good > objectif × 3, warning > objectif × 2, critical < objectif × 2

### P6: Pipeline Coverage Ratio
- **ID**: `pipeline_coverage`
- **Calcul**: `pipeline_value / quarterly_target`
- **Note**: Target stocké dans `tenants.settings.quarterly_target`
- **Affichage**: Ratio (ex: 3.2x) + gauge
- **Visualisation**: `GaugeChart`
- **Seuils**: good > 3x, warning 2-3x, critical < 2x

### P7: Deals Créés vs Fermés (Flow)
- **ID**: `deal_flow`
- **Calcul**: Créés = `COUNT(createdate IN period)`, Fermés = `COUNT(closedate IN period AND hs_is_closed)`
- **Affichage**: Dual bar chart par mois
- **Visualisation**: `TrendLine` (dual series)
- **Filtres**: période, owner

### P8: Montant Moyen des Deals (ACV)
- **ID**: `average_deal_size`
- **Calcul**: `AVG(amount) WHERE amount > 0` et `MEDIAN(amount)`
- **Affichage**: € + distribution
- **Visualisation**: `KPICard` + `DistributionHistogram`
- **Filtres**: période, owner, stage
- **Seuils**: informatif, alerte si trend -15%

### P9: Deals Stalled
- **ID**: `stalled_deals`
- **Calcul**: `COUNT(WHERE hs_is_stalled = true AND hs_is_closed = false)`
- **Champs HubSpot**: `hs_is_stalled`
- **Affichage**: Nombre + % du pipeline + liste
- **Visualisation**: `KPICard` + table drill-down
- **Filtres**: owner, stage
- **Seuils**: good < 10%, warning 10-25%, critical > 25%

### P10: Deals sans Activité Récente
- **ID**: `inactive_deals`
- **Calcul**: `COUNT(WHERE hs_is_closed = false AND hs_last_sales_activity_date < now() - 14 days)`
- **Champs HubSpot**: `hs_last_sales_activity_date`
- **Affichage**: Nombre + heatmap par ancienneté
- **Visualisation**: `HeatmapTable` (owner × stage)
- **Filtres**: owner, seuil de jours (configurable)
- **Seuils**: good < 15%, warning 15-30%, critical > 30%

### P11: Pipeline Age Distribution
- **ID**: `pipeline_age`
- **Calcul**: Répartition par tranche: 0-30j, 30-60j, 60-90j, 90-180j, 180j+
- **Champs HubSpot**: `createdate`
- **Affichage**: Stacked bar
- **Visualisation**: `StackedArea`
- **Seuils**: critical si > 25% des deals > 90 jours

### P12: New Pipeline Created
- **ID**: `new_pipeline`
- **Calcul**: `SUM(amount) WHERE createdate IN period`
- **Affichage**: € + trend
- **Visualisation**: `TrendLine`
- **Filtres**: période, owner, source

---

## Catégorie 3 — Velocity (V1-V10)

### V1: Sales Cycle Length (DTC)
- **ID**: `sales_cycle`
- **Calcul**: `MEDIAN(days_to_close) WHERE hs_is_closed_won = true`
- **Champs HubSpot**: `days_to_close`, `createdate`, `closedate`
- **Affichage**: Jours + trend
- **Visualisation**: `KPICard` + `DistributionHistogram`
- **Filtres**: période, owner, tranche montant
- **Seuils**: basés sur médiane historique ±20%

### V2: DTC par Owner
- **ID**: `sales_cycle_by_owner`
- **Calcul**: `GROUP BY owner → MEDIAN(days_to_close)`
- **Affichage**: Bar chart comparatif
- **Visualisation**: `HorizontalBar`
- **Filtres**: période, tranche montant

### V3: DTC par Tranche de Montant
- **ID**: `sales_cycle_by_amount`
- **Calcul**: Tranches: <5K€, 5-15K€, 15-30K€, 30-50K€, 50-100K€, >100K€
- **Affichage**: Grouped bar chart
- **Visualisation**: `HorizontalBar` groupé
- **Note**: Corrélation attendue montant↔durée

### V4: Durée par Stage
- **ID**: `time_per_stage`
- **Calcul**: `AVG(hs_v2_cumulative_time_in_*) / 86400000` pour chaque stage (millisecondes → jours)
- **Champs HubSpot**: `cumulative_stage_times` (JSONB), `hs_v2_cumulative_time_in_*`
- **Affichage**: Horizontal stacked bar (une barre = un deal ou agrégé)
- **Visualisation**: `HorizontalBar` stacked
- **Filtres**: période, owner, won/lost

### V5: Bottleneck Detection
- **ID**: `bottleneck_stage`
- **Calcul**: Stage avec le plus grand ratio `AVG(time_in_stage) / conversion_rate_from_stage`
- **Affichage**: Traffic light par stage + indicateur bottleneck
- **Visualisation**: `TrafficLight` + annotation
- **Seuils**: critical si un stage concentre > 40% du temps total

### V6: Conversion Stage-to-Stage
- **ID**: `stage_conversion`
- **Calcul**: Pour chaque paire (stageN → stageN+1): `COUNT(exited_to_next) / COUNT(entered_stage)`
- **Champs HubSpot**: `stage_timestamps` (JSONB avec hs_date_entered_* / hs_date_exited_*)
- **Affichage**: Funnel avec % à chaque transition
- **Visualisation**: `FunnelChart` annoté
- **Filtres**: période, owner

### V7: Time in Current Stage
- **ID**: `time_in_current_stage`
- **Calcul**: `hs_time_in_current_stage / 86400000` (millisecondes → jours) pour deals ouverts
- **Champs HubSpot**: `hs_time_in_current_stage`
- **Affichage**: Table avec couleur par ancienneté
- **Visualisation**: `HeatmapTable` (deal × stage)
- **Filtres**: owner, stage
- **Seuils**: par stage, basés sur médiane × 1.5

### V8: Velocity Trend
- **ID**: `velocity_trend`
- **Calcul**: DTC médian par mois sur 12 mois
- **Affichage**: Line chart avec trend
- **Visualisation**: `TrendLine`
- **Filtres**: owner, tranche montant

### V9: Stage d'Entrée des Deals Lost
- **ID**: `lost_entry_stage`
- **Calcul**: `GROUP BY dealstage WHERE hs_is_closed_won = false AND hs_is_closed = true → COUNT(*)`
- **Note**: Le stage dans lequel se trouvait le deal au moment du lost
- **Affichage**: Bar chart
- **Visualisation**: `HorizontalBar`
- **Filtres**: période, owner, raison de perte

### V10: Sales Velocity Index
- **ID**: `sales_velocity_index`
- **Calcul**: `(nb_deals × win_rate × avg_deal_size) / sales_cycle_length`
- **Affichage**: Index + sparkline trend
- **Visualisation**: `KPICard` avec `TrendLine` mini
- **Filtres**: période, owner
- **Note**: Métrique composite — indique le "débit" monétaire du pipeline

---

## Catégorie 4 — Closing & Win Rate (C1-C12)

### C1: Win Rate Global
- **ID**: `win_rate`
- **Calcul**: `COUNT(closed_won) / COUNT(closed_won + closed_lost) × 100`
- **Affichage**: Pourcentage + gauge
- **Visualisation**: `GaugeChart`
- **Filtres**: période, owner, pipeline, source
- **Seuils**: good > 30%, warning 20-30%, critical < 20%

### C2: Win Rate par Owner
- **ID**: `win_rate_by_owner`
- **Calcul**: Par owner → win rate
- **Affichage**: Bar chart comparatif
- **Visualisation**: `HorizontalBar` avec ligne de moyenne
- **Seuils**: warning si owner < 50% de la moyenne

### C3: Win Rate par Tranche de Montant
- **ID**: `win_rate_by_amount`
- **Calcul**: Mêmes tranches que V3 → win rate
- **Affichage**: Bar chart
- **Visualisation**: `HorizontalBar`

### C4: Win Rate par Source
- **ID**: `win_rate_by_source`
- **Calcul**: `GROUP BY hs_analytics_source → win rate`
- **Affichage**: Scatter plot (volume vs win rate)
- **Visualisation**: `ScatterPlot`

### C5: Win/Loss Ratio Over Time
- **ID**: `win_loss_trend`
- **Calcul**: Win rate par mois sur 12 mois
- **Affichage**: Line chart
- **Visualisation**: `TrendLine`
- **Seuils**: alerte si drop > 10 points sur 2 mois

### C6: Lost Reason Analysis
- **ID**: `lost_reasons`
- **Calcul**: `GROUP BY closed_lost_reason → COUNT(*), SUM(amount)`
- **Champs HubSpot**: `closed_lost_reason`, `hs_closed_lost_category`
- **Affichage**: Pareto chart (80/20)
- **Visualisation**: `ParetoCurve`
- **Filtres**: période, owner, stage

### C7: Competitive Win Rate
- **ID**: `competitive_win_rate`
- **Calcul**: Win rate filtré sur `closed_lost_reason LIKE '%compet%'` ou catégorie compétitive
- **Affichage**: KPI + trend
- **Visualisation**: `KPICard`

### C8: Deal Size Won vs Lost
- **ID**: `deal_size_won_vs_lost`
- **Calcul**: `AVG(amount WHERE won)` vs `AVG(amount WHERE lost)`
- **Affichage**: Dual KPI cards + distribution overlay
- **Visualisation**: `DistributionHistogram` (dual)

### C9: Time to Close Won vs Lost
- **ID**: `close_time_comparison`
- **Calcul**: `MEDIAN(days_to_close WHERE won)` vs `MEDIAN(days_to_close WHERE lost)`
- **Affichage**: Dual KPI + box plots
- **Visualisation**: `DistributionHistogram` (dual)

### C10: Close Rate par Stage Atteint
- **ID**: `close_rate_by_stage_reached`
- **Calcul**: Pour chaque stage: `COUNT(won parmi deals ayant atteint ce stage) / COUNT(deals ayant atteint ce stage)`
- **Champs HubSpot**: `stage_timestamps` (hs_date_entered_*)
- **Affichage**: Line chart croissant par stage
- **Visualisation**: `TrendLine` (type: step)
- **Note**: Montre le "point de non-retour" — stage à partir duquel le win rate grimpe

### C11: First Contact to Close
- **ID**: `first_contact_to_close`
- **Calcul**: `MEDIAN(closedate - MIN(contact.createdate))` pour deals won avec contacts associés
- **Affichage**: Jours
- **Visualisation**: `KPICard` + `DistributionHistogram`

### C12: Revenue Perdue (Lost)
- **ID**: `revenue_lost`
- **Calcul**: `SUM(amount WHERE closed_lost AND closedate IN period)`
- **Affichage**: € + trend + breakdown par raison
- **Visualisation**: `KPICard` + `DonutChart` (par raison)
- **Filtres**: période, owner
- **Seuils**: informatif mais alerte si > 50% du won

---

## Catégorie 5 — Revenue & Comptes (R1-R11)

### R1: Revenue Closed Won
- **ID**: `revenue_won`
- **Calcul**: `SUM(amount WHERE hs_is_closed_won = true AND closedate IN period)`
- **Affichage**: € + trend
- **Visualisation**: `KPICard` + `TrendLine`
- **Filtres**: période, owner

### R2: Revenue par Owner
- **ID**: `revenue_by_owner`
- **Calcul**: `GROUP BY owner → SUM(amount WHERE won)`
- **Affichage**: Bar chart
- **Visualisation**: `HorizontalBar`

### R3: Revenue par Client (Top Accounts)
- **ID**: `revenue_by_account`
- **Calcul**: `GROUP BY company → SUM(deal.amount WHERE won)` trié DESC, top 20
- **Champs HubSpot**: `company_ids` (associations), company `total_revenue`
- **Affichage**: Table triée + Pareto
- **Visualisation**: Table + `ParetoCurve`

### R4: New Business vs Expansion vs Renewal
- **ID**: `revenue_segmentation`
- **Calcul**: Classification par type basée sur l'historique company/deal :
  - New = première deal won avec cette company
  - Expansion = company avec déjà un deal won, montant > précédent
  - Renewal = company avec déjà un deal won, montant ≤ précédent
- **Affichage**: Stacked bar chart par mois
- **Visualisation**: `StackedArea`

### R5: ACV Trend
- **ID**: `acv_trend`
- **Calcul**: `AVG(amount WHERE won)` par mois/trimestre
- **Affichage**: Line chart avec MA (moving average)
- **Visualisation**: `TrendLine`

### R6: Revenue Forecast vs Réalisé
- **ID**: `revenue_forecast_vs_actual`
- **Calcul**:
  - Réalisé = `SUM(amount WHERE won AND closedate <= now())`
  - Forecast = Réalisé + `SUM(amount × probability WHERE NOT closed AND closedate IN period)`
- **Affichage**: Gauge de progression vers objectif
- **Visualisation**: `GaugeChart` + bar chart comparatif
- **Note**: Objectif stocké dans `tenants.settings.revenue_target`

### R7: Client Lifetime Value (CLV)
- **ID**: `client_ltv`
- **Calcul**: `GROUP BY company → SUM(all won deals)` + durée relation
- **Affichage**: Top 20 table + distribution
- **Visualisation**: Table + `DistributionHistogram`

### R8: Churn & Inactivité
- **ID**: `client_churn`
- **Calcul**: Companies avec deals won dans P-2 mais aucun dans P-1 (périodes de 6 mois)
- **Affichage**: Nombre + valeur à risque + liste
- **Visualisation**: `KPICard` + table
- **Seuils**: alerte par client inactif > seuil de revenu

### R9: Revenue Concentration Risk (Pareto)
- **ID**: `revenue_concentration`
- **Calcul**: Coefficient de Gini + % revenue des top 3/5/10 clients
- **Affichage**: Pareto curve + KPI Gini
- **Visualisation**: `ParetoCurve`
- **Seuils**: warning si top 3 > 50%, critical si top 1 > 30%

### R10: Monthly Recurring Revenue (approximé)
- **ID**: `mrr_approx`
- **Calcul**: `SUM(amount WHERE won AND closedate IN last 12 months) / 12`
- **Note**: Approximation — pas de billing récurrent natif dans HubSpot standard
- **Affichage**: € + trend
- **Visualisation**: `TrendLine`

### R11: Revenue par Secteur
- **ID**: `revenue_by_industry`
- **Calcul**: `GROUP BY company.industry → SUM(deal.amount WHERE won)`
- **Champs HubSpot**: company `industry`
- **Affichage**: Treemap ou donut
- **Visualisation**: `DonutChart`

---

## Catégorie 6 — Activité & Engagement (A1-A6)

### A1: Volume d'Activités par Owner
- **ID**: `activity_volume`
- **Calcul**: `GROUP BY owner → COUNT(contacts avec notes_last_updated IN period)`
- **Champs HubSpot**: `notes_last_updated`, `num_notes`, `num_contacted_notes`
- **Affichage**: Bar chart par owner
- **Visualisation**: `HorizontalBar`
- **Filtres**: période, type d'activité

### A2: Deals Non Travaillés
- **ID**: `unworked_deals`
- **Calcul**: `COUNT(deals WHERE hs_is_closed = false AND (hs_last_sales_activity_date IS NULL OR hs_last_sales_activity_date < now() - 14 days))`
- **Champs HubSpot**: `hs_last_sales_activity_date`, `hs_is_closed`
- **Affichage**: Nombre + % pipeline + heatmap
- **Visualisation**: `HeatmapTable` (owner × ancienneté)
- **Seuils**: good < 10%, warning 10-25%, critical > 25%

### A3: Speed to Lead
- **ID**: `speed_to_lead`
- **Calcul**: Identique à L6 mais dans le contexte activité
- **Note**: Même métrique, affichée dans deux pages différentes
- **Cross-reference**: L6

### A4: Taux d'Engagement des Contacts
- **ID**: `contact_engagement_rate`
- **Calcul**: `COUNT(contacts WHERE hs_sales_email_last_replied IS NOT NULL AND period) / COUNT(contacts contactés)`
- **Champs HubSpot**: `hs_sales_email_last_replied`, `num_contacted_notes`
- **Affichage**: Pourcentage + trend
- **Visualisation**: `KPICard` + `TrendLine`

### A5: Activité par Étape du Funnel
- **ID**: `activity_by_stage`
- **Calcul**: `GROUP BY dealstage → AVG(activities count sur deals de ce stage)`
- **Affichage**: Heatmap stages × types d'activité
- **Visualisation**: `HeatmapTable`
- **Note**: Aide à identifier les stages où l'effort est insuffisant ou excessif

### A6: Effort vs Résultat
- **ID**: `effort_vs_result`
- **Calcul**: Par owner → scatter plot (nb activités vs revenue won)
- **Affichage**: Scatter plot avec quadrants (high effort/low result = inefficient)
- **Visualisation**: `ScatterPlot` avec quadrant lines
- **Note**: Identifie les reps efficaces vs ceux qui "pédalent dans le vide"

---

## Catégorie 7 — Data Quality (D1-D10)

### D1: Score Global de Qualité
- **ID**: `data_quality_score`
- **Calcul**: Moyenne pondérée de D2-D10 (100 = parfait)
- **Affichage**: Score /100 + gauge
- **Visualisation**: `GaugeChart`
- **Seuils**: good > 80, warning 60-80, critical < 60

### D2: Deals sans Montant
- **ID**: `deals_no_amount`
- **Calcul**: `COUNT(WHERE (amount IS NULL OR amount = 0) AND hs_is_closed = false) / COUNT(open deals) × 100`
- **Affichage**: Pourcentage + liste
- **Visualisation**: `KPICard` + table drill-down
- **Seuils**: good < 5%, warning 5-15%, critical > 15%
- **Poids dans D1**: 20%

### D3: Deals Périmés (Date de close dépassée)
- **ID**: `overdue_deals`
- **Calcul**: `COUNT(WHERE closedate < now() AND hs_is_closed = false) / COUNT(open deals) × 100`
- **Affichage**: Pourcentage + heatmap par ancienneté
- **Visualisation**: `KPICard` + `HeatmapTable`
- **Seuils**: good < 10%, warning 10-25%, critical > 25%
- **Poids dans D1**: 15%

### D4: Deals sans Contact Associé
- **ID**: `deals_no_contact`
- **Calcul**: `COUNT(WHERE contact_ids = '{}' AND hs_is_closed = false) / COUNT(open deals) × 100`
- **Affichage**: Pourcentage + liste
- **Visualisation**: `KPICard`
- **Seuils**: good < 5%, warning 5-20%, critical > 20%
- **Poids dans D1**: 15%

### D5: Deals sans Company Associée
- **ID**: `deals_no_company`
- **Calcul**: `COUNT(WHERE company_ids = '{}' AND hs_is_closed = false) / COUNT(open deals) × 100`
- **Affichage**: Pourcentage
- **Visualisation**: `KPICard`
- **Seuils**: good < 5%, warning 5-20%, critical > 20%
- **Poids dans D1**: 10%

### D6: Taux de Remplissage des Champs Clés
- **ID**: `field_completeness`
- **Calcul**: Pour chaque champ clé (amount, closedate, dealstage, owner, contact, company, source) → % de remplissage
- **Affichage**: Radar chart (un axe par champ)
- **Visualisation**: `RadarChart`
- **Poids dans D1**: 15%

### D7: Pipeline Hygiene Score
- **ID**: `pipeline_hygiene`
- **Calcul**: Composite: `100 - (stalled% × 0.3) - (overdue% × 0.3) - (no_activity_14d% × 0.2) - (no_amount% × 0.2)`
- **Affichage**: Score /100
- **Visualisation**: `GaugeChart`
- **Seuils**: good > 75, warning 50-75, critical < 50
- **Poids dans D1**: 10%

### D8: Tendance DQ dans le Temps
- **ID**: `dq_trend`
- **Calcul**: D1 score par semaine sur 12 semaines
- **Affichage**: Line chart
- **Visualisation**: `TrendLine`
- **Seuils**: alerte si drop > 10 points sur 2 semaines

### D9: Doublons Détectés
- **ID**: `duplicates`
- **Calcul**:
  - Contacts: même email OU (même firstname+lastname+company)
  - Companies: même domain
  - Deals: même dealname+company+amount+closedate (±7j)
- **Affichage**: Nombre par type + liste
- **Visualisation**: `KPICard` par type + table
- **Seuils**: warning > 5, critical > 20
- **Poids dans D1**: 10%

### D10: Complétude des Deals Fermés
- **ID**: `closed_deal_completeness`
- **Calcul**: Pour deals closed (won+lost): % ayant tous les champs remplis (amount, closedate, owner, contact, company, lost_reason si lost)
- **Affichage**: Pourcentage
- **Visualisation**: `KPICard`
- **Seuils**: good > 90%, warning 70-90%, critical < 70%
- **Poids dans D1**: 5%

---

## Adoption Score — Composants (H1-H10)

> Ces métriques sont affichées sur la page Home et composent le score d'adoption.

### H1: Score Central d'Adoption
- **ID**: `adoption_score`
- **Calcul**: Weighted average:
  - Data Discipline (30%) = f(D1, D2, D4, D5, D6)
  - Pipeline Rigor (25%) = f(P9, P10, P11, D3, D7)
  - Activity Logging (20%) = f(A1, A2, L7)
  - Process Adherence (15%) = f(V6, C10, stage usage patterns)
  - Tool Usage (10%) = f(login frequency, feature usage — tracked server-side)
- **Affichage**: Grande jauge centrale 0-100 avec note lettre (A+ à F)
- **Visualisation**: `AdoptionGauge` (composant custom)
- **Mapping score → note**:
  - 90-100 = A+, 85-89 = A, 80-84 = A-
  - 75-79 = B+, 70-74 = B, 65-69 = B-
  - 60-64 = C+, 55-59 = C, 50-54 = C-
  - 45-49 = D+, 40-44 = D, < 40 = F

### H2-H6: Sub-scores (voir calcul H1)
- **IDs**: `data_discipline_score`, `pipeline_rigor_score`, `activity_logging_score`, `process_adherence_score`, `tool_usage_score`
- **Affichage**: 5 mini-gauges sous le score central
- **Visualisation**: 5 × `GaugeChart` (mini)

### H7: Adoption par Owner
- **ID**: `adoption_by_owner`
- **Calcul**: Score H1 calculé individuellement par owner
- **Affichage**: Radar chart (un owner = une forme)
- **Visualisation**: `RadarChart` multi-séries

### H8: Quick Wins
- **ID**: `quick_wins`
- **Calcul**: Algorithme:
  1. Scanner toutes les métriques en status `warning` ou `critical`
  2. Pour chaque métrique → estimer impact (delta score) et effort (nb d'actions)
  3. Trier par ratio impact/effort DESC
  4. Top 5 = Quick Wins
- **Affichage**: Cards empilées avec impact estimé
- **Visualisation**: `QuickWinsPanel`

### H9: Tendance 12 Semaines
- **ID**: `adoption_trend`
- **Calcul**: Score H1 par semaine sur 12 dernières semaines
- **Affichage**: Line chart avec zones colorées (good/warning/critical)
- **Visualisation**: `TrendLine` avec fills

### H10: Santé Instantanée (Traffic Lights)
- **ID**: `domain_health`
- **Calcul**: 7 domaines → chacun good/warning/critical basé sur les seuils de ses métriques
- **Affichage**: 7 indicateurs colorés (vert/orange/rouge) avec labels
- **Visualisation**: `TrafficLight` × 7
- **Domaines**: Lead Management, Pipeline, Velocity, Closing, Revenue, Activity, Data Quality

---

## Pages Layout

### Page 0: Home (Adoption Score)
```
┌─────────────────────────────────────────────┐
│ [H1: Grande Jauge Adoption Score]            │
│                                              │
│ [H2][H3][H4][H5][H6] 5 mini-gauges          │
├──────────────────┬──────────────────────────┤
│ [H10: Traffic    │ [H9: Tendance 12 sem]     │
│  Lights 7 dom]   │                           │
├──────────────────┼──────────────────────────┤
│ [H8: Quick Wins] │ [H7: Radar par Owner]     │
└──────────────────┴──────────────────────────┘
```

### Page 1: Lead Management
```
┌─────────┬─────────┬─────────┬─────────┐
│ L1: Vol │ L3: Conv│ L6: Spd │ L7: Unw │  KPI Cards row
├─────────┴─────────┴─────────┴─────────┤
│ [L2: Leads par Owner] [L4: Conv/Owner] │  2 bar charts
├────────────────────┬──────────────────┤
│ [L5: Sources]       │ [L8: Lead Aging]  │
├────────────────────┼──────────────────┤
│ [L9: Status Distrib]│ [L10: Contact→Co] │
└────────────────────┴──────────────────┘
```

### Page 2: Pipeline
```
┌─────────┬─────────┬─────────┬─────────┐
│ P1: Val │ P5: Wtd │ P6: Cov │ P8: ACV │  KPI Cards
├─────────┴─────────┴─────────┴─────────┤
│ [P2: Funnel par Stage]                  │  Full width funnel
├────────────────────┬──────────────────┤
│ [P3: Val/Owner]     │ [P7: Flow créé/fermé]│
├────────────────────┼──────────────────┤
│ [P9: Stalled]       │ [P10: Inactifs]   │
│ [P11: Age Distrib]  │ [P12: New Pipeline]│
└────────────────────┴──────────────────┘
```

### Page 3: Velocity
```
┌─────────┬─────────┬─────────┐
│ V1: DTC │ V10: SVI│ V5: Neck│  KPI Cards
├─────────┴─────────┴─────────┤
│ [V4: Durée par Stage - stacked bar]      │
├────────────────────┬──────────────────┤
│ [V2: DTC/Owner]     │ [V3: DTC/Montant] │
├────────────────────┼──────────────────┤
│ [V6: Stage→Stage]   │ [V7: Time Current]│
├────────────────────┼──────────────────┤
│ [V8: Velocity Trend]│ [V9: Lost Entry]  │
└────────────────────┴──────────────────┘
```

### Page 4: Closing & Win Rate
```
┌─────────┬─────────┬─────────┬─────────┐
│ C1: WR  │ C7: Comp│ C12: Rev│ C11: FC │  KPI Cards
├─────────┴─────────┴─────────┴─────────┤
│ [C5: Win/Loss Over Time]                │
├────────────────────┬──────────────────┤
│ [C2: WR/Owner]      │ [C4: WR/Source]   │
├────────────────────┼──────────────────┤
│ [C3: WR/Montant]    │ [C6: Lost Reasons]│
├────────────────────┼──────────────────┤
│ [C8: Size Won/Lost] │ [C9: Time Won/Lost]│
│                     │ [C10: Rate/Stage]  │
└────────────────────┴──────────────────┘
```

### Page 5: Revenue & Comptes
```
┌─────────┬─────────┬─────────┬─────────┐
│ R1: Rev │ R5: ACV │ R10: MRR│ R9: Gini│  KPI Cards
├─────────┴─────────┴─────────┴─────────┤
│ [R4: New/Expansion/Renewal stacked]      │
├────────────────────┬──────────────────┤
│ [R2: Rev/Owner]     │ [R6: Forecast/Real]│
├────────────────────┼──────────────────┤
│ [R3: Top Accounts]  │ [R7: CLV]         │
├────────────────────┼──────────────────┤
│ [R8: Churn]         │ [R11: Rev/Secteur]│
└────────────────────┴──────────────────┘
```

### Page 6: Activité & Engagement
```
┌─────────┬─────────┬─────────┐
│ A3: StL │ A4: Eng │ A2: Unw │  KPI Cards
├─────────┴─────────┴─────────┤
│ [A1: Volume Activités par Owner]         │
├────────────────────┬──────────────────┤
│ [A5: Activité/Stage]│ [A6: Effort/Résult]│
└────────────────────┴──────────────────┘
```

### Page 7: Data Quality
```
┌─────────┬─────────┬─────────┬─────────┐
│ D1: DQ  │ D7: Hyg │ D9: Dup │ D10:Comp│  KPI Cards
├─────────┴─────────┴─────────┴─────────┤
│ [D6: Radar Remplissage Champs]           │
├────────────────────┬──────────────────┤
│ [D2: Sans Montant]  │ [D3: Périmés]     │
│ [D4: Sans Contact]  │ [D5: Sans Company] │
├────────────────────┴──────────────────┤
│ [D8: Tendance DQ 12 semaines]            │
└──────────────────────────────────────┘
```
