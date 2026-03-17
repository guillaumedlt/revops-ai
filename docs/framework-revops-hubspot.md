# Framework RevOps HubSpot — Liste complète priorisée

> Ce document liste **tout ce qu'un Ops ou un Directeur Commercial doit suivre** dans HubSpot pour piloter efficacement la performance commerciale. Classé par priorité et par thématique.

---

## 🔴 PRIORITÉ 1 — Ce qui impacte le revenu immédiatement

### 1.1 Pipeline Velocity (Vitesse du pipeline)

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Temps moyen par stage** | Identifie où les deals stagnent — si le passage de "Proposition envoyée" à "Négociation" prend 3x plus longtemps que le reste, c'est là qu'il faut agir | ⚠️ Difficile — nécessite de croiser `hs_v2_date_entered_*` et `hs_v2_date_exited_*` pour chaque stage |
| **Taux de conversion stage-to-stage** | Montre l'entonnoir réel : sur 100 deals en Discovery, combien passent en Diagnostic, puis en Offre, etc. Permet de savoir où on perd le plus de deals | ⚠️ Difficile — pas de rapport funnel natif par stage de deal |
| **Durée moyenne du cycle de vente (days_to_close)** | Benchmark global : si le cycle s'allonge, c'est un signal d'alerte avant même que le revenu baisse | ✅ Faisable mais limité |
| **Vélocité pondérée du pipeline** | Formule : (Nb deals × Montant moyen × Win rate) / Durée cycle. Donne un "débit" de revenu par unité de temps | 🔴 Impossible natif |

### 1.2 Forecast & Revenue Predictability

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Pipeline coverage ratio** | Ratio entre le pipeline ouvert pondéré et l'objectif. Rule of thumb : 3x à 4x. Si tu es en dessous, tu n'atteindras pas ton objectif même avec un bon win rate | ⚠️ Calcul manuel |
| **Forecast accuracy (rétro)** | Comparer chaque mois/trimestre le forecast fait à M-1 vs le réel. Si l'écart est > 20%, les probabilités par stage ou le jugement des reps sont à revoir | 🔴 Impossible natif — nécessite un snapshot historique |
| **Commit vs. Upside vs. Best case** | Catégoriser les deals ouverts en 3 buckets : quasi-sûr (commit), probable (upside), optimiste (best case). Donne 3 scénarios au board | ⚠️ Nécessite une propriété custom ou un workflow |
| **Weighted pipeline par mois de close** | Ventiler le pipeline par `closedate` pour voir la répartition temporelle du revenu attendu | ✅ Faisable mais fastidieux |
| **Glissement des close dates** | Tracker combien de fois un deal a vu sa close date repoussée. Un deal repoussé 3x est presque toujours un dead deal | 🔴 Impossible natif — nécessite un historique de la propriété |

### 1.3 Win/Loss Analysis

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Win rate global** | % de deals Closed Won vs total (Won + Lost). Le KPI le plus fondamental | ✅ Faisable |
| **Win rate par segment** | Ventilé par : taille de deal, type (New vs Existing), source, industrie, owner. Révèle où on est bon et où on perd | ⚠️ Limité — un rapport par dimension |
| **Analyse des raisons de perte (close lost reason)** | Top 5 des raisons de perte, tendance dans le temps. Si "prix" domine, c'est un problème de positionnement. Si "timing" domine, c'est un problème de qualification | ✅ Faisable si la propriété est remplie |
| **Taille moyenne des deals gagnés vs perdus** | Si les gros deals se perdent plus souvent, il y a un problème de qualification ou de staffing sur les gros comptes | ⚠️ Calcul croisé nécessaire |
| **Win rate par source d'acquisition** | Quel canal marketing génère les deals qui closent le mieux ? Pas juste le volume, la qualité | 🔴 Difficile — nécessite le croisement deal ↔ contact ↔ source |

---

## 🟠 PRIORITÉ 2 — Performance commerciale & productivité

### 2.1 Performance par Rep

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Revenue par rep** | Won revenue par owner, par mois/trimestre. Le classement de base | ✅ Faisable |
| **Win rate par rep** | Certains reps closent 40%, d'autres 15% — même pipeline. L'écart indique un besoin de coaching | ⚠️ Pas de rapport natif combiné |
| **Cycle de vente moyen par rep** | Un rep qui close en 25 jours vs un autre en 60 jours = problème de process ou de qualification | ⚠️ Difficile à croiser |
| **Pipeline généré par rep** | Volume et montant de deals créés par chaque rep. Distingue les "closers" des "hunters" | ✅ Faisable |
| **Taille moyenne de deal par rep** | Révèle si un rep se concentre sur les petits deals "faciles" vs. les gros comptes stratégiques | ⚠️ Calcul nécessaire |
| **Activité par rep (calls, emails, meetings)** | Volume d'activité vs résultats. Un rep avec beaucoup d'activité mais peu de résultats a un problème de qualité, pas de quantité | ✅ Faisable |
| **Ratio activité/deal créé** | Combien de calls/emails faut-il pour générer un deal ? Mesure l'efficience de la prospection | 🔴 Croisement complexe |
| **Quota attainment** | % d'atteinte de l'objectif par rep. Nécessite un objectif défini quelque part | ⚠️ Nécessite une propriété custom pour l'objectif |

### 2.2 Discipline & Process Compliance

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Deals sans montant renseigné** | Un deal sans `amount` = un pipeline non fiable. Si 30% des deals ouverts n'ont pas de montant, le forecast est faux | ⚠️ Faisable mais pas alerté |
| **Deals sans close date** | Idem — un deal sans date de close attendue est un deal sans engagement | ⚠️ Faisable |
| **Deals sans owner** | Des deals orphelins = des deals oubliés | ✅ Faisable |
| **Deals sans type (New/Existing)** | Empêche de segmenter new business vs expansion | ⚠️ Faisable |
| **Deals sans activité depuis X jours** | Un deal ouvert avec 0 activité depuis 14 jours est probablement mort. C'est le nettoyage de pipeline le plus important | 🔴 Difficile — nécessite de croiser `notes_last_contacted` ou engagements |
| **Taux de remplissage des raisons de perte** | Si seulement 30% des deals perdus ont un `close_lost_reason`, l'analyse win/loss est biaisée | ⚠️ Calcul custom |
| **Contacts non associés aux deals** | Des deals sans contact associé = des deals impossibles à travailler et un CRM sale | 🔴 Nécessite un croisement associations |
| **Deals avec close date passée toujours ouverts** | Le signal #1 de pipeline gonflé. Si 40% du pipeline a une close date dans le passé, le pipeline réel est 40% plus petit que ce qui est affiché | ⚠️ Faisable mais pas de rapport dédié |

---

## 🟡 PRIORITÉ 3 — Gestion du funnel & conversion

### 3.1 Lead-to-Deal Conversion

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Taux de conversion Lead → Opportunity → Customer** | Le funnel complet par lifecycle stage. Si le taux Lead → Opportunity est de 2%, soit le volume est trop faible soit la qualification est mauvaise | ⚠️ Limité — pas de funnel natif lifecycle → deal |
| **Lead response time (Speed to Lead)** | Temps entre la création du lead et le 1er contact par un commercial. Études Harvard : répondre en < 5 min = 9x plus de chances de convertir vs > 30 min | ✅ Propriété native `hs_time_to_first_engagement` |
| **MQL → SQL conversion rate** | Si le marketing envoie des MQLs mais que le sales les rejette, il y a un problème d'alignement | ⚠️ Nécessite une définition claire MQL/SQL en propriétés |
| **Lead source performance** | Nombre de leads, taux de conversion en deal, et revenu généré par source (Organic, Paid, Referral, Outbound). Le ROI par canal | 🔴 Croisement multi-objets complexe |
| **Leads non travaillés (unworked)** | Leads assignés mais jamais contactés. Propriété native `hs_is_unworked` — si le % est élevé, les leads sont gaspillés | ✅ Faisable |
| **Taux de recyclage des leads** | Leads passés en "Lost" puis réactivés et convertis plus tard. Montre si le nurturing fonctionne | 🔴 Très difficile |

### 3.2 Qualification Quality

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Drop-off rate par stage initial** | Quel % des deals créés ne dépassent jamais le 1er stage ? Un taux > 50% signifie qu'on crée des deals trop tôt | ⚠️ Calculable mais pas natif |
| **Ratio deals créés / deals qualifiés** | Sur 10 deals créés, combien atteignent "Proposition" ? Si < 3, la barre d'entrée du pipeline est trop basse | ⚠️ Croisement stages nécessaire |
| **Taux de postpone/stall** | % de deals qui passent en "Postpone" ou équivalent. Un taux élevé = mauvais timing identifié trop tard | ✅ Faisable si le stage existe (c'est le cas chez toi) |
| **Deal-to-close time par stage d'entrée** | Les deals qui entrent directement en "Diagnostic" closent-ils plus vite que ceux qui passent par "Discovery" ? Aide à décider si on skip des stages | 🔴 Croisement complexe |

---

## 🟢 PRIORITÉ 4 — Revenu, expansion & rétention

### 4.1 Revenue Mix & Growth

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **New Business vs Existing Business revenue** | Quel % du revenu vient de nouveaux clients vs upsell/expansion ? Une agence saine vise 60-70% existing | ⚠️ Faisable si `dealtype` est bien rempli |
| **Revenue par client (Account Revenue)** | Montant total won par company. Identifie les top accounts et les comptes sous-exploités | 🔴 Agrégation deal → company nécessaire |
| **Évolution du panier moyen** | Taille moyenne des deals gagnés, tendance sur 6-12 mois. Si elle baisse, on perd en valeur par deal | ⚠️ Calcul tendance difficile |
| **Revenu récurrent vs one-shot** | Avec tes produits (Support @150/mois, Growth manager recurring), distinguer le MRR/ARR du revenu ponctuel | 🔴 Nécessite le croisement line items + billing frequency |
| **Net Revenue Retention (NRR)** | (Revenu existant + expansion - churn) / Revenu existant. > 100% = croissance organique sans acquisition | 🔴 Très complexe — nécessite le suivi client dans le temps |
| **Revenue concentration risk** | Quel % du revenu vient du top 3 ou top 5 clients ? Si > 40%, risque de dépendance | 🔴 Agrégation custom |

### 4.2 Customer Health & Expansion

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Nombre de deals won par client** | Un client avec 5+ deals est un champion. Un client avec 1 deal de 2022 et rien depuis est un risque de churn | 🔴 Croisement deals ↔ companies |
| **Time since last deal won par client** | Si un client récurrent n'a pas signé depuis 6 mois, il est peut-être en train de partir | 🔴 Calcul custom |
| **Ticket volume par client vs revenue** | Un client qui génère 5K€/an mais crée 50 tickets est non-rentable. Croiser tickets et revenu par company | 🔴 Multi-objet complexe |
| **Taux de repeat business** | % des clients qui signent plus d'un deal. Indicateur de satisfaction et de stickiness | 🔴 Agrégation nécessaire |
| **Expansion rate** | Croissance du revenu par client existant d'une période à l'autre | 🔴 Calcul temporel complexe |

---

## 🔵 PRIORITÉ 5 — Billing, collections & cash

### 5.1 Invoice & Payment Tracking

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Invoice aging (ancienneté des factures)** | Répartition des factures impayées par tranche : 0-30j, 30-60j, 60-90j, 90j+. Le nerf de la guerre pour le cash | ⚠️ Possible mais pas de vue aging native |
| **DSO (Days Sales Outstanding)** | Délai moyen entre l'émission de la facture et le paiement. Plus il est bas, mieux le cash flow se porte | 🔴 Calcul custom |
| **Taux de factures en retard** | % de factures dont la `due_date` est passée sans paiement. Alerte early warning | ⚠️ Filtre possible |
| **Montant total impayé** | Somme des `balance_due` de toutes les factures ouvertes. Vision cash à encaisser | ⚠️ Agrégation manuelle |
| **Taux de factures disputées** | % de factures en statut "disputed". Si élevé, problème de delivery ou de communication des terms | ✅ Filtrable |
| **Won → Invoiced → Paid velocity** | Temps entre Closed Won, création de la facture, et paiement. Mesure la rapidité de monétisation | 🔴 Croisement multi-pipeline |
| **Draft invoices oubliées** | Factures restées en draft sans être envoyées. Revenu théoriquement gagné mais jamais facturé | ⚠️ Filtrable |

---

## 🟣 PRIORITÉ 6 — Attribution & ROI Marketing-Sales

### 6.1 Source & Channel Performance

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Cost per Acquisition par source** | Combien coûte l'acquisition d'un client par canal (Paid, Organic, Referral, Outbound, Partner) | 🔴 Nécessite des données de coût externe |
| **Revenue attributed par source** | Pas juste les leads, mais le revenu effectivement closé par source d'acquisition originale | 🔴 Croisement contact source → deal amount |
| **Time to revenue par source** | Les leads Inbound mettent-ils plus ou moins de temps à closer que les Outbound ? | 🔴 Très complexe |
| **Pipeline generated par source** | Volume et montant de pipeline créé par canal, par mois | ⚠️ Croisement nécessaire |
| **First touch vs Last touch attribution** | Quel canal a initié la relation vs quel canal a déclenché l'achat ? Les deux visions sont nécessaires | 🔴 Multi-touch = très complexe |

---

## ⚪ PRIORITÉ 7 — Opérationnel & hygiène CRM

### 7.1 Data Quality

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Contacts sans email** | Un contact sans email est quasi-inutile pour le marketing | ✅ Faisable |
| **Contacts dupliqués** | Pollution du CRM, rapports faussés, communications multiples au même contact | ⚠️ Outil de dédup natif limité |
| **Companies sans domaine** | Empêche le matching automatique et l'enrichment | ⚠️ Faisable |
| **Deals sans company associée** | Empêche l'analyse par compte, le reporting account-level | 🔴 Croisement associations |
| **Contacts avec lifecycle stage incohérent** | Un contact "Subscriber" avec un deal en "Closed Won" = lifecycle stage jamais mis à jour | 🔴 Croisement contact ↔ deal stage |
| **Owner inactifs avec des deals assignés** | Des deals ou contacts assignés à des users désactivés = orphelins de fait | ⚠️ Croisement owner activity |
| **Propriétés custom jamais remplies** | Si une propriété custom a un fill rate < 10%, elle est soit inutile soit mal intégrée au process | 🔴 Audit de fill rate complexe |

### 7.2 Process & Automation Health

| Métrique | Pourquoi c'est critique | Difficulté HubSpot natif |
|---|---|---|
| **Workflow enrollment vs completion rate** | Des workflows qui enrollent 1000 contacts mais en complètent 200 ont un problème de conditions ou de branchement | ⚠️ Visible dans workflow mais pas en rapport croisé |
| **Taux d'emails bounced dans les séquences** | Des séquences avec > 5% de bounce = mauvaise qualité de données ou liste obsolète | ⚠️ Dans les analytics séquence |
| **SLA de handoff Marketing → Sales** | Temps entre le moment où un lead devient MQL et le moment où un commercial le contacte. Si > 24h, le lead refroidit | 🔴 Calcul custom timestamps |

---

## Matrice récapitulative

| # | Rapport / Métrique | Impact Business | Difficulté HubSpot natif | Valeur ajoutée API |
|---|---|---|---|---|
| 1 | Pipeline Velocity par stage | 🔴 Critique | ⚠️ Difficile | ⭐⭐⭐⭐⭐ |
| 2 | Deals fantômes (close date passée, sans activité) | 🔴 Critique | 🔴 Très difficile | ⭐⭐⭐⭐⭐ |
| 3 | Win rate par segment (owner, type, taille, source) | 🔴 Critique | ⚠️ Limité | ⭐⭐⭐⭐⭐ |
| 4 | Forecast accuracy & glissement close dates | 🔴 Critique | 🔴 Impossible | ⭐⭐⭐⭐⭐ |
| 5 | Pipeline coverage ratio | 🟠 Haut | ⚠️ Manuel | ⭐⭐⭐⭐ |
| 6 | Revenue New vs Existing vs Recurring | 🟠 Haut | 🔴 Difficile | ⭐⭐⭐⭐ |
| 7 | Performance par rep (multi-dimensionnel) | 🟠 Haut | ⚠️ Partiel | ⭐⭐⭐⭐ |
| 8 | Revenue concentration & top accounts | 🟡 Moyen-Haut | 🔴 Difficile | ⭐⭐⭐⭐ |
| 9 | Lead source → Revenue (attribution complète) | 🟡 Moyen-Haut | 🔴 Très difficile | ⭐⭐⭐⭐⭐ |
| 10 | Invoice aging & DSO | 🟡 Moyen-Haut | ⚠️ Limité | ⭐⭐⭐⭐ |
| 11 | Data quality score (fill rate, doublons, orphelins) | 🟢 Fondation | 🔴 Très difficile | ⭐⭐⭐⭐⭐ |
| 12 | Customer health score (tickets × revenue × récence) | 🟢 Fondation | 🔴 Impossible | ⭐⭐⭐⭐⭐ |
| 13 | Speed to Lead | 🟡 Moyen-Haut | ✅ Natif | ⭐⭐ |
| 14 | Net Revenue Retention | 🟠 Haut | 🔴 Impossible | ⭐⭐⭐⭐⭐ |
| 15 | Won → Invoiced → Paid velocity | 🟡 Moyen | 🔴 Très difficile | ⭐⭐⭐⭐ |

---

*Généré le 16 mars 2026 — Framework RevOps par Ceres Agency*
