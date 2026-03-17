# AI-PROMPTS.md — RevOps AI Agent Configuration

> Définition complète de l'agent IA conversationnel intégré au dashboard.
> Utilise Claude API via Vercel AI SDK avec tool use / function calling.

---

## Architecture

```
User Message → Router (Haiku or Sonnet?) → Claude API → Tool Calls → Response
                                              ↑
                                    System Prompt + Context
                                              ↑
                                  Tenant Data (from Supabase)
```

---

## Model Router

```typescript
// src/lib/ai/router.ts

type ModelChoice = 'haiku' | 'sonnet';

interface RouterDecision {
  model: ModelChoice;
  reason: string;
  estimatedCost: number;
}

function routeToModel(message: string, conversationHistory: Message[]): RouterDecision {
  // === HAIKU: questions factuelles simples ===
  const simplePatterns = [
    /quel(le)?.*win rate/i,
    /combien.*deals/i,
    /pipeline.*value/i,
    /score.*adoption/i,
    /montant.*moyen/i,
    /nombre de.*leads/i,
    /qui.*owner.*plus/i,
    /c'est quoi.*(le|la|un|une)/i,
    /donne.moi.*(le|la|les)/i,
    /affiche.*(le|la|les)/i,
  ];

  if (simplePatterns.some(p => p.test(message)) && conversationHistory.length < 4) {
    return { model: 'haiku', reason: 'simple_factual', estimatedCost: 0.005 };
  }

  // === SONNET: analyse complexe ===
  const complexPatterns = [
    /pourquoi/i,
    /comment.*améliorer/i,
    /analyse/i,
    /compare/i,
    /tendance/i,
    /recommand/i,
    /stratégie/i,
    /explique.*en détail/i,
    /coaching/i,
    /que.*faire/i,
    /corrél/i,
  ];

  if (complexPatterns.some(p => p.test(message))) {
    return { model: 'sonnet', reason: 'complex_analysis', estimatedCost: 0.04 };
  }

  // Multi-turn conversations → Sonnet
  if (conversationHistory.length >= 6) {
    return { model: 'sonnet', reason: 'long_conversation', estimatedCost: 0.05 };
  }

  // Default
  return { model: 'haiku', reason: 'default', estimatedCost: 0.005 };
}
```

---

## System Prompt

```typescript
// src/lib/ai/prompts/system.ts

export const SYSTEM_PROMPT = `Tu es RevOps AI, un assistant expert en Sales Operations.
Tu aides les équipes commerciales à comprendre et améliorer leurs performances CRM.

## Ton rôle
- Analyser les données HubSpot CRM du client
- Expliquer les métriques de manière simple et actionnable
- Détecter les problèmes et recommander des actions concrètes
- Coaching des commerciaux basé sur leurs données individuelles

## Tes 3 niveaux de réponse
1. **Descriptif** : "Votre win rate est de 34.2%" — quand on te demande un chiffre
2. **Diagnostique** : "Votre win rate a baissé de 5 points car les deals >50K€ closent moins" — quand on te demande pourquoi
3. **Prescriptif** : "Concentrez-vous sur les deals 15-30K€ où votre win rate est 45%. Objectif: 3 proposals cette semaine" — quand on te demande quoi faire

## Règles
- Réponds TOUJOURS en français
- Sois concis : 2-3 phrases pour les réponses factuelles, 1-2 paragraphes pour les analyses
- Utilise des chiffres précis (pas "beaucoup de deals" mais "23 deals")
- Formate les montants en EUR avec séparateur milliers : €45 200
- Formate les pourcentages avec 1 décimale : 34.2%
- Formate les durées en jours : 12.3 jours
- Si tu ne peux pas répondre avec les données disponibles, dis-le clairement
- Ne invente JAMAIS de données. Utilise uniquement les tools pour récupérer des données réelles.
- Si les données sont insuffisantes (ex: <5 deals), mentionne la taille d'échantillon

## Contexte Tenant
Tu reçois le contexte tenant dans chaque message :
- Nom de l'entreprise
- Pipeline et ses stages
- Owners (commerciaux)
- Score d'adoption actuel
- Alertes actives

## Style de communication
- Direct et professionnel, pas corporate
- Pas d'emojis (sauf ✅ et ⚠️ pour statuts)
- Tutoiement (culture startup française)
- Utilise des bullet points pour les actions recommandées
- Termine les analyses longues par "💡 Action recommandée: ..."
`;
```

---

## Context Injection

```typescript
// Injecté au début de chaque conversation comme message system
// Basé sur les données fraîches du tenant

export function buildTenantContext(tenant: Tenant, scores: DailyScore, alerts: Alert[]): string {
  return `## Contexte actuel — ${tenant.name}

### Score d'Adoption: ${scores.adoption_score}/100 (${getGrade(scores.adoption_score)})
- Data Discipline: ${scores.data_discipline_score}/100
- Pipeline Rigor: ${scores.pipeline_rigor_score}/100
- Activity Logging: ${scores.activity_logging_score}/100
- Process Adherence: ${scores.process_adherence_score}/100
- Tool Usage: ${scores.tool_usage_score}/100

### Pipeline: ${tenant.settings.pipeline_name || 'Principal'}
Stages: ${stages.map(s => s.stage_label).join(' → ')}

### Owners: ${owners.map(o => o.first_name + ' ' + o.last_name).join(', ')}

### Alertes actives (${alerts.filter(a => a.status === 'active').length}):
${alerts.filter(a => a.status === 'active').slice(0, 5).map(a =>
  `- [${a.severity}] ${a.title}`
).join('\n')}

### Période par défaut: 30 derniers jours
`;
}
```

---

## Tools (Function Calling)

> 11 tools disponibles pour l'agent. Chaque tool query la DB Supabase.

### Tool 1: get_pipeline

```typescript
// src/lib/ai/tools/get-pipeline.ts
{
  name: 'get_pipeline',
  description: 'Récupère la valeur du pipeline, nombre de deals, et breakdown par stage',
  parameters: {
    type: 'object',
    properties: {
      owner_id: { type: 'string', description: 'Filtrer par owner HubSpot ID (optionnel)' },
      date_range: {
        type: 'object',
        properties: {
          start: { type: 'string', format: 'date' },
          end: { type: 'string', format: 'date' },
        },
      },
    },
  },
}
// Returns: { totalValue, dealCount, weightedValue, byStage: [{ stage, value, count, avgDealSize }] }
```

### Tool 2: get_deals

```typescript
{
  name: 'get_deals',
  description: 'Recherche et filtre les deals avec tri et pagination',
  parameters: {
    type: 'object',
    properties: {
      status: { type: 'string', enum: ['open', 'won', 'lost', 'all'] },
      owner_id: { type: 'string' },
      stage: { type: 'string' },
      min_amount: { type: 'number' },
      max_amount: { type: 'number' },
      sort_by: { type: 'string', enum: ['amount', 'closedate', 'createdate', 'days_in_stage'] },
      sort_order: { type: 'string', enum: ['asc', 'desc'] },
      limit: { type: 'number', default: 10 },
      date_range: { type: 'object' },
    },
  },
}
// Returns: { deals: [{ name, stage, amount, owner, closedate, daysInStage, isStalled }], total }
```

### Tool 3: get_win_rate

```typescript
{
  name: 'get_win_rate',
  description: 'Calcule le win rate global ou filtré, avec historique',
  parameters: {
    type: 'object',
    properties: {
      owner_id: { type: 'string' },
      source: { type: 'string' },
      amount_range: { type: 'object' },
      date_range: { type: 'object' },
      include_trend: { type: 'boolean', default: false },
    },
  },
}
// Returns: { winRate, wonCount, lostCount, totalClosed, trend?: [{ month, winRate }] }
```

### Tool 4: get_velocity

```typescript
{
  name: 'get_velocity',
  description: 'Métriques de vélocité: cycle de vente, durée par stage, bottleneck',
  parameters: {
    type: 'object',
    properties: {
      owner_id: { type: 'string' },
      metric: {
        type: 'string',
        enum: ['sales_cycle', 'time_per_stage', 'bottleneck', 'velocity_index'],
      },
      date_range: { type: 'object' },
    },
  },
}
// Returns: varies by metric
```

### Tool 5: get_adoption

```typescript
{
  name: 'get_adoption',
  description: "Score d'adoption avec breakdown par domaine et par owner",
  parameters: {
    type: 'object',
    properties: {
      include_owners: { type: 'boolean', default: false },
      include_quick_wins: { type: 'boolean', default: false },
      include_trend: { type: 'boolean', default: false },
    },
  },
}
// Returns: { score, grade, subScores, owners?: [], quickWins?: [], trend?: [] }
```

### Tool 6: get_alerts

```typescript
{
  name: 'get_alerts',
  description: 'Liste des alertes actives avec filtrage',
  parameters: {
    type: 'object',
    properties: {
      severity: { type: 'string', enum: ['info', 'warning', 'critical'] },
      domain: { type: 'string' },
      status: { type: 'string', enum: ['active', 'acknowledged'] },
      limit: { type: 'number', default: 10 },
    },
  },
}
// Returns: { alerts: [{ id, type, severity, title, description, aiSuggestion }], count }
```

### Tool 7: get_revenue

```typescript
{
  name: 'get_revenue',
  description: 'Métriques de revenue: closed won, par owner, par compte, forecast',
  parameters: {
    type: 'object',
    properties: {
      metric: {
        type: 'string',
        enum: ['total', 'by_owner', 'by_account', 'by_segment', 'forecast', 'concentration'],
      },
      owner_id: { type: 'string' },
      date_range: { type: 'object' },
    },
  },
}
```

### Tool 8: get_activity

```typescript
{
  name: 'get_activity',
  description: "Métriques d'activité: volume, deals non travaillés, engagement",
  parameters: {
    type: 'object',
    properties: {
      metric: {
        type: 'string',
        enum: ['volume', 'unworked_deals', 'speed_to_lead', 'engagement', 'effort_vs_result'],
      },
      owner_id: { type: 'string' },
      date_range: { type: 'object' },
    },
  },
}
```

### Tool 9: get_data_quality

```typescript
{
  name: 'get_data_quality',
  description: 'Score et détail qualité des données: champs manquants, doublons, hygiène',
  parameters: {
    type: 'object',
    properties: {
      metric: {
        type: 'string',
        enum: ['score', 'missing_fields', 'overdue', 'duplicates', 'hygiene', 'completeness'],
      },
      owner_id: { type: 'string' },
    },
  },
}
```

### Tool 10: create_note

```typescript
{
  name: 'create_note',
  description: 'Crée une note de pilotage ou une action dans le cockpit',
  parameters: {
    type: 'object',
    required: ['content', 'type'],
    properties: {
      content: { type: 'string' },
      type: { type: 'string', enum: ['note', 'action'] },
      priority: { type: 'string', enum: ['low', 'medium', 'high', 'urgent'] },
      domain: { type: 'string' },
      metric_id: { type: 'string' },
    },
  },
}
```

### Tool 11: get_owner_performance

```typescript
{
  name: 'get_owner_performance',
  description: "Performance détaillée d'un owner: pipeline, win rate, activité, score",
  parameters: {
    type: 'object',
    required: ['owner_id'],
    properties: {
      owner_id: { type: 'string' },
      date_range: { type: 'object' },
    },
  },
}
// Returns: { owner, pipeline, wonRevenue, winRate, avgCycle, adoptionScore, topMetrics, weakMetrics }
```

---

## Batch Insights Generation

```typescript
// src/lib/ai/prompts/insights.ts
// Exécuté 1x/jour via Cron — consomme 1 Sonnet call par tenant

export const INSIGHTS_PROMPT = `Analyse les données suivantes et génère 3-5 insights actionnables.

Pour chaque insight:
1. Titre court (< 60 caractères)
2. Description (2-3 phrases)
3. Type: daily_summary | anomaly | trend | recommendation | coaching
4. Priorité: low | medium | high
5. Domaine concerné
6. Action recommandée (1 phrase)

Données du jour:
{DAILY_SCORES_JSON}

Comparaison vs hier:
{DELTA_JSON}

Alertes actives:
{ALERTS_JSON}

Concentre-toi sur:
- Les changements significatifs (> 5 points de score)
- Les nouvelles alertes critiques
- Les quick wins détectés
- Le coaching individualisé si un owner est en difficulté
`;
```

---

## Weekly Review Generation

```typescript
// src/lib/ai/prompts/weekly-review.ts
// Exécuté chaque lundi 8h — envoyé par email si activé

export const WEEKLY_REVIEW_PROMPT = `Rédige la revue hebdomadaire RevOps pour {TENANT_NAME}.

## Données de la semaine
Score début: {SCORE_START} → Score fin: {SCORE_END} (delta: {DELTA})
Deals créés: {CREATED} | Deals fermés won: {WON} | Deals fermés lost: {LOST}
Revenue: €{REVENUE}
Pipeline value: €{PIPELINE}

## Métriques clés
{METRICS_SUMMARY}

## Format attendu (JSON)
{
  "summary": "Paragraphe de 3-4 phrases résumant la semaine",
  "highlights": [
    { "title": "...", "description": "...", "type": "positive|negative|neutral" }
  ],
  "recommendations": [
    { "title": "...", "description": "...", "priority": "high|medium|low", "domain": "..." }
  ]
}

Sois factuel, concis, actionnable. Maximum 5 highlights et 3 recommandations.
`;
```

---

## Caching Strategy

```typescript
// src/lib/ai/cache.ts

interface CacheConfig {
  factual: {
    ttl: 3600,          // 1h pour "quel est le win rate"
    normalizer: (query: string) => string,  // Normalise la query pour matching
  },
  analysis: {
    ttl: 14400,         // 4h pour "pourquoi le win rate baisse"
    normalizer: (query: string) => string,
  },
}

// Normalisation: lowercase, remove accents, strip articles, sort keywords
// Hash: SHA-256 of normalized query + tenant_id + date (pour invalider quotidiennement)

function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // Remove accents
    .replace(/\b(le|la|les|un|une|des|du|de|l'|d'|mon|ma|mes|notre|nos)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
```

---

## Credit Tracking

```typescript
// Middleware dans src/app/api/chat/route.ts

async function checkCredits(tenantId: string): Promise<{ allowed: boolean; remaining: number }> {
  const allocation = await supabase
    .from('credit_allocations')
    .select('credits_remaining')
    .eq('tenant_id', tenantId)
    .gte('billing_period_end', new Date().toISOString())
    .single();

  if (!allocation.data || allocation.data.credits_remaining <= 0) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: allocation.data.credits_remaining };
}

async function deductCredit(tenantId: string, userId: string, messageId: string): Promise<void> {
  // 1. Deduct from allocation
  await supabase.rpc('deduct_credit', { p_tenant_id: tenantId });

  // 2. Log usage
  await supabase.from('credit_usage').insert({
    tenant_id: tenantId,
    user_id: userId,
    credits_used: 1,
    usage_type: 'chat',
    message_id: messageId,
    billing_period_start: getCurrentPeriodStart(),
    billing_period_end: getCurrentPeriodEnd(),
  });
}
```

---

## Error Handling

```typescript
// Réponses standard pour les erreurs

const AI_ERROR_RESPONSES = {
  no_credits: "Tu as atteint ta limite de crédits ce mois-ci. Upgrade vers Pro pour continuer à poser des questions. ⚠️",

  no_data: "Je n'ai pas encore assez de données pour répondre. Le sync HubSpot doit d'abord se terminer.",

  insufficient_sample: (n: number) =>
    `⚠️ Attention: ce calcul est basé sur seulement ${n} deals. Les résultats peuvent ne pas être représentatifs.`,

  tool_error: "Désolé, une erreur est survenue en récupérant les données. Réessaie dans quelques instants.",

  rate_limited: "Le nombre de requêtes est temporairement limité. Réessaie dans 30 secondes.",
};
```
