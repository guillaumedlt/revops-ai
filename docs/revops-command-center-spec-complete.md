# REVOPS COMMAND CENTER — Spec Complète Page par Page

## Métaphore & Univers

**Thème : Base militaire / QG d'opérations stratégiques**

| Rôle réel | Rôle dans l'app |
|---|---|
| Commercial / AE | Agent / Soldat |
| SDR / BDR | Éclaireur |
| Directeur commercial | Commandant |
| Ops / RevOps | Stratège / Officier Intel |
| Admin HubSpot | Ingénieur de la Base |

L'app s'adresse principalement au **Stratège (Ops)** et au **Commandant (Dir. commercial)** — c'est un outil de pilotage, pas un outil de saisie. Les commerciaux y voient leur profil, leur rang, leurs missions, mais ne font rien dedans : tout est calculé depuis HubSpot.

---

## Système de Progression Global

### Niveaux & Rangs (par utilisateur/owner)

| Rang | Niveaux | XP cumulé | Icône | Couleur |
|---|---|---|---|---|
| Recrue | 1-5 | 0 → 500 | 🔰 | Gris |
| Caporal | 6-12 | 500 → 1 500 | ⚔️ | Bronze |
| Sergent | 13-20 | 1 500 → 4 000 | 🛡️ | Argent |
| Lieutenant | 21-30 | 4 000 → 9 000 | 🎖️ | Or |
| Capitaine | 31-40 | 9 000 → 18 000 | ⭐ | Platine |
| Commandant | 41-48 | 18 000 → 30 000 | 💎 | Diamant |
| Général | 49-50 | 30 000+ | 👑 | Légendaire |

### Sources d'XP (toutes calculées depuis champs natifs HubSpot)

**Actions Deal :**
- Deal créé (`createdate` sur Deal) → +10 XP
- Deal passé au stage suivant (`hs_v2_date_entered_*` change) → +15 XP/stage
- Deal marqué "Closed Won" (`hs_is_closed_won = true`) → +50 XP + 1 XP / 100€ du montant
- Deal fermé avec raison renseignée (`closed_lost_reason` non vide) → +5 XP
- Deal closé en < 30 jours (`days_to_close < 30`) → +25 XP bonus

**Actions Contact :**
- Contact engagé (`notes_last_contacted` mis à jour) → +5 XP
- Lead converti en Opportunity (`lifecyclestage` passe à opportunity) → +15 XP
- Contact créé dans les 2h après premier contact (`hs_time_to_first_engagement`) → +10 XP

**Data Quality :**
- Deal avec toutes les propriétés clés remplies (amount, closedate, dealstage, owner) → +10 XP
- Montant renseigné sur un deal existant qui n'en avait pas → +5 XP

**Hebdo :**
- 0 deal stallé (`hs_is_stalled = false` sur tout le pipe perso) → +30 XP/semaine
- 0 lead non travaillé (`hs_is_unworked = false` sur ses contacts) → +20 XP/semaine

### XP Decay
- 2% d'XP saisonnier perdu par semaine sans activité (aucun `notes_last_contacted` mis à jour)
- L'XP total (lifetime) ne décroît jamais, seul l'XP saisonnier est affecté

### Saisons
- Reset du leaderboard tous les trimestres
- L'XP lifetime reste, le classement saisonnier repart à zéro
- Badges saisonniers exclusifs pour les top performers

---

# PAGES DE L'APPLICATION

---

## PAGE 1 — ÉCRAN DE CONNEXION / ONBOARDING

### 1.1 Login
- **Bouton unique** : "Connecter mon HubSpot" (OAuth HubSpot)
- Fond sombre avec animation de radar/grille militaire
- Logo RevOps Command Center
- Pas de création de compte, pas de mot de passe — uniquement OAuth HubSpot

### 1.2 Onboarding (premier lancement uniquement)
**Étape 1 — Détection automatique**
- L'app scanne le portail HubSpot connecté
- Affiche : nombre de deals, contacts, companies, pipelines détectés
- Animation de "scan en cours" style radar

**Étape 2 — Sélection du pipeline principal**
- Liste des pipelines détectés (ex: Services, Billing, Scrapthesky)
- L'utilisateur sélectionne celui à tracker (peut en ajouter d'autres après)
- Affichage des stages du pipeline sélectionné avec compteur de deals par stage

**Étape 3 — Configuration de l'équipe**
- Liste des owners HubSpot actifs détectés automatiquement
- L'utilisateur coche ceux qui font partie de l'équipe commerciale à tracker
- Attribution automatique du rang "Recrue" à chaque agent

**Étape 4 — Objectifs (optionnel)**
- Saisie des objectifs trimestriels :
  - Revenue cible (€)
  - Nombre de deals à closer
  - Pipeline coverage souhaitée (2x, 3x, 4x)
- Si non renseigné, l'app calcule des benchmarks depuis l'historique

**Étape 5 — Lancement**
- Animation "Base opérationnelle activée"
- Premier calcul des scores (peut prendre 30-60 secondes)
- Redirect vers le Dashboard

---

## PAGE 2 — DASHBOARD PRINCIPAL (QG / Salle de Commandement)

C'est LA page centrale. Le cœur de l'app. Visible dès la connexion.

### 2.1 Header
- **Logo** RevOps Command Center (coin haut gauche)
- **Nom de l'équipe** / portail (ex: "Ceres Agency — QG")
- **Score Global** : gros chiffre animé de 0 à 100 au centre, avec cercle de progression coloré (rouge < 30, orange < 60, vert ≥ 60)
- **Rang de l'équipe** affiché en texte sous le score : "Mode Survie" / "Vol à vue" / "Instruments de Bord" / "Autopilote" / "Revenue Machine"

| Score global | Rang équipe | Couleur |
|---|---|---|
| 0-20 | Mode Survie 🔴 | Rouge |
| 21-40 | Vol à Vue 🟠 | Orange |
| 41-60 | Instruments de Bord 🟡 | Jaune |
| 61-80 | Autopilote 🟢 | Vert |
| 81-100 | Revenue Machine 💎 | Bleu/Or |

- **Sélecteur de période** : Ce mois / Ce trimestre / Custom
- **Bouton refresh** : force un re-pull des données HubSpot

### 2.2 Les 6 Jauges — Zone centrale

Disposées en grille 3×2 ou en hexagone. Chaque jauge est un cercle avec :
- **Icône du monde** au centre
- **Score** (0-100) en gros
- **Nom du pilier** en dessous
- **Mini flèche tendance** (↑ amélioration, → stable, ↓ dégradation vs période précédente)
- **Couleur dynamique** selon le score

**Les 6 jauges :**

| # | Nom | Icône | Poids dans le score global |
|---|---|---|---|
| 1 | Lead Flow | 🌊 | 15% |
| 2 | Pipeline Health | 🏗️ | 25% |
| 3 | Velocity | 🚀 | 20% |
| 4 | Closing Power | 🎯 | 25% |
| 5 | Revenue Health | 💰 | 10% |
| 6 | Data Quality | 🧹 | 5% (mais multiplicateur) |

**Clic sur une jauge** → ouvre la page détaillée du monde (Pages 8-13).

### 2.3 Bandeau d'Alertes (sous les jauges)

Barre horizontale scrollable avec les alertes actives, triées par criticité :

**Rouge (critique) :**
- "⚠️ 3 deals stallés depuis > 30 jours (47 200€ en jeu)"
- "🔴 Win rate tombé à 8% ce mois — seuil critique"
- "🚨 Data Quality à 42 — plafond activé sur tous les scores"

**Orange (warning) :**
- "⚡ 7 leads non travaillés depuis > 48h"
- "📉 Pipeline coverage à 1.8x — en dessous de la cible 3x"
- "🕐 Deal 'Finalcad Renouvellement' bloqué en Proposition depuis 25 jours"

**Bleu (info) :**
- "✅ Badge 'Speed Demon' débloqué par Simon"
- "📈 Score Pipeline Health en hausse de +12 pts cette semaine"

Chaque alerte est cliquable → amène au détail du problème (deal spécifique, liste de leads, etc.)

### 2.4 Leaderboard Compact (colonne droite)

Classement des agents de l'équipe, format carte :

Pour chaque agent :
```
┌─────────────────────────────┐
│ 🥇 #1                      │
│ ⭐ Capitaine Lv.34          │
│ Guillaume Delachet           │
│ ████████████████░░ 14 200 XP │
│ 🏆×3 ⚡×2 🎯×1  (badges)    │
│ +340 XP cette semaine        │
└─────────────────────────────┘
```

- Top 3 affichés directement
- Bouton "Voir tout" → Page Leaderboard complète (Page 5)
- Sélecteur : Saisonnier / All-time

### 2.5 Missions en Cours (sous les alertes)

3 missions actives affichées avec barre de progression :

```
┌─────────────────────────────────────────┐
│ 🎯 Mission Quotidienne                  │
│ "Contacter 3 prospects aujourd'hui"     │
│ ██████████░░░░░░░░ 2/3                  │
│ Récompense : +15 XP                     │
└─────────────────────────────────────────┘
```

Bouton "Toutes les missions" → Page Missions (Page 6)

### 2.6 Timeline d'Activité (bas de page)

Flux chronologique inversé des dernières actions scorées :
```
14:32 — Guillaume a closé "Kolsquare Audit CRM" (+50 XP, +85 XP montant)
13:15 — Simon a fait passer "Leeto Onboarding" en Offre envoyée (+15 XP)
11:45 — Bruno a contacté 4 prospects (+20 XP)
09:30 — ⚡ Badge "Blitz" débloqué par Simon (deal closé en 12 jours)
```

- Filtrable par agent
- Scrollable, chargement infini
- Chaque entrée montre l'XP gagné

---

## PAGE 3 — PROFIL AGENT (Fiche du Soldat)

Accessible en cliquant sur un agent dans le leaderboard, ou via menu.

### 3.1 En-tête du Profil

```
┌──────────────────────────────────────────────┐
│  [Avatar/Initiales]                          │
│  ⭐ Capitaine — Niveau 34                     │
│  Guillaume Delachet                           │
│  ██████████████████░░░ 14 200 / 18 000 XP    │
│  → 3 800 XP avant Commandant 💎               │
│                                               │
│  Saison Q1 2026 : #1 (2 340 XP saisonnier)  │
│  All-time : 14 200 XP                         │
└──────────────────────────────────────────────┘
```

### 3.2 Statistiques Personnelles

**KPIs individuels (période sélectionnable) :**

| Métrique | Valeur | Vs Équipe | Tendance |
|---|---|---|---|
| Deals actifs | 8 | Moy: 5.3 | ↑ |
| Pipeline value | 87 000€ | Moy: 44 000€ | → |
| Win rate | 24% | Moy: 12% | ↑ |
| Days to close moy. | 42j | Moy: 58j | ↓ (mieux) |
| Deals stallés | 1 | Moy: 2.3 | → |
| Leads non travaillés | 0 | Moy: 3.7 | ✅ |
| Data quality perso | 88/100 | Moy: 65 | ↑ |

Chaque métrique sourcée depuis les champs natifs :
- Deals actifs → `dealstage` pas closed + `hubspot_owner_id` = cet owner
- Pipeline value → somme `amount` des deals actifs
- Win rate → `hs_is_closed_won` / total closed avec `hubspot_owner_id`
- Days to close → moyenne `days_to_close` sur ses deals won
- Stallés → `hs_is_stalled = true` + `hubspot_owner_id`
- Leads non travaillés → `hs_is_unworked = true` sur contacts owned
- Data quality → % propriétés remplies sur ses deals

### 3.3 Vitrine de Badges

Grille de badges, gagnés = couleur, non gagnés = grisés avec condition affichée :

```
⚡ Speed Demon          🏰 Pipeline Blindé       🎯 Sniper
"Réponse < 30min       "0 deal stallé 14j"      "Win rate > 40%
 moy. 30j"              ✅ Obtenu le 02/03       sur 30j (min 5 deals)"
 ✅ Obtenu le 15/02                               🔒 En cours: 24%
```

**Catégories de badges :**

**Lead Flow :**
- ⚡ Speed Demon — Réponse < 30 min en moyenne sur 30 jours
- 🎯 Zéro Gaspillage — 0 lead unworked pendant 7 jours consécutifs
- 🌐 Multi-Canal — Leads provenant d'au moins 4 sources différentes

**Pipeline Health :**
- 🏰 Pipeline Blindé — 0 deal stallé pendant 14 jours
- 💰 Tout Chiffré — 100% des deals ont un montant renseigné
- ⚖️ Équilibre Parfait — Distribution uniforme sur les stages (pas d'embouteillage)
- 📊 Pipeline 3x — Pipeline coverage > 3x l'objectif

**Velocity :**
- 🏎️ Blitz — Deal closé en < 15 jours
- 📉 Anti-Bottleneck — Aucun deal perso avec durée > 14 jours dans un stage
- 🔄 Momentum — Au moins 1 changement de stage par deal actif par semaine pendant 4 semaines

**Closing Power :**
- 🏆 Sniper — Win rate > 40% sur 30 jours (minimum 5 deals)
- 📝 Feedback Loop — 100% des closed lost ont une raison renseignée
- 💎 Gros Gibier — Deal closé > 20 000€
- 🔥 Série de 3 — 3 deals closés en 7 jours

**Revenue :**
- 👑 Revenue King — Meilleur revenu closé du trimestre
- 🔁 Machine à Upsell — > 50% du revenu vient d'existing business
- 🌱 Chasseur — > 5 new business closés dans le mois

**Data Quality :**
- 🧼 Data Clean — Score data > 90 pendant 30 jours
- ⭐ 5 Étoiles — 100% des deals perso parfaitement remplis pendant 14 jours

**Spéciaux / Saisonniers :**
- 🏅 MVP Saison — #1 du classement saisonnier
- 🎖️ Progression Fulgurante — Gagné > 5 niveaux en un mois
- 🛡️ Régulier — Activité chaque jour ouvré pendant 1 mois

### 3.4 Historique d'XP

Graphique en courbe montrant l'évolution de l'XP sur 90 jours avec annotations aux moments de gain importants (deal won, badge, etc.)

### 3.5 Deals en Cours (tableau)

Liste des deals actifs de cet agent :

| Deal | Stage | Montant | Jours dans stage | Stallé? |
|---|---|---|---|---|
| Kolsquare Audit | Proposition | 12 000€ | 8j | Non |
| Leeto Renouvellement | Offre envoyée | 15 000€ | 3j | Non |
| NewCo Discovery | Discovery call | 8 000€ | 22j | ⚠️ Oui |

Chaque ligne cliquable → lien direct vers le deal dans HubSpot.

---

## PAGE 4 — CLASSEMENT / LEADERBOARD (Hall of Fame)

### 4.1 Sélecteur de vue
- **Saisonnier** (Q en cours, reset trimestriel)
- **All-time** (XP total depuis le début)
- **Ce mois**

### 4.2 Podium Top 3

Affichage visuel style podium avec les 3 premiers :

```
              🥇
         Guillaume
        ⭐ Lv.34
       14 200 XP
    ┌─────────────┐
    │             │
    │    🥈       │  🥉
    │  Simon      │ Bruno
    │  🛡️ Lv.19  │ ⚔️ Lv.8
    │  4 100 XP   │ 1 200 XP
    ├─────────────┼──────────┐
    │             │          │
    └─────────────┴──────────┘
```

### 4.3 Tableau complet

| Rang | Agent | Niveau | XP Saison | Deals Won | Win Rate | Badges |
|---|---|---|---|---|---|---|
| 🥇 | Guillaume Delachet | ⭐ 34 | 2 340 | 4 | 24% | ×6 |
| 🥈 | Simon Toussaint | 🛡️ 19 | 1 870 | 3 | 18% | ×4 |
| 🥉 | Bruno Teixeira | ⚔️ 8 | 920 | 1 | 11% | ×2 |

### 4.4 Comparatif Radar

Graphique radar (spider chart) comparant les agents sur 6 axes :
1. Lead engagement
2. Pipeline management
3. Velocity
4. Closing
5. Revenue
6. Data quality

Permet de visualiser les forces/faiblesses de chaque agent.

### 4.5 Progression Saisonnière

Graphique multi-lignes montrant l'évolution de l'XP saisonnier de chaque agent au fil des semaines du trimestre. Permet de voir qui accélère, qui stagne.

---

## PAGE 5 — MISSIONS (Centre de Missions)

### 5.1 Missions Quotidiennes (reset à minuit)

```
┌─────────────────────────────────────────────────────┐
│ 📋 MISSIONS DU JOUR — Lundi 16 mars 2026            │
├─────────────────────────────────────────────────────┤
│                                                      │
│ 🎯 Contacter au moins 3 prospects                    │
│    ██████████░░░░░░ 2/3           Récompense: +15 XP │
│    Source: notes_last_contacted mis à jour            │
│                                                      │
│ 🔄 Faire avancer 1 deal de stage                     │
│    ████████████████ 1/1 ✅ COMPLÉTÉ  Gagné: +20 XP   │
│    Source: hs_v2_date_entered_* change               │
│                                                      │
│ 📝 Renseigner le montant sur 2 deals                 │
│    ░░░░░░░░░░░░░░░░ 0/2           Récompense: +10 XP │
│    Source: amount passe de vide à renseigné           │
│                                                      │
│ ⏱️ Répondre à 1 nouveau lead en < 1h                 │
│    EN ATTENTE (pas de nouveau lead aujourd'hui)       │
│    Source: hs_time_to_first_engagement < 3600        │
│                                                      │
└─────────────────────────────────────────────────────┘
```

### 5.2 Missions Hebdomadaires (reset le lundi)

| Mission | Objectif | Progrès | XP |
|---|---|---|---|
| Zéro Lead Perdu | 0 lead unworked en fin de semaine | 3 restants | +50 |
| Closer 1 deal | Au moins 1 deal won | 0/1 | +75 |
| Documentation | Raison renseignée sur 100% des closed lost | 4/5 (80%) | +30 |
| Pipeline Propre | 0 deal stallé en fin de semaine | 1 stallé | +40 |
| Activité Continue | Au moins 1 action/jour pendant 5 jours | 3/5 | +35 |

### 5.3 Missions Spéciales / Événements

Missions limitées dans le temps, avec timer :

```
🔥 SPRINT FIN DE MOIS — 5 jours restants
   "Closer 3 deals avant le 31 mars"
   Progrès: 1/3
   Récompense: +200 XP + Badge "Sprint Master" 🏅
```

```
🧹 OPÉRATION NETTOYAGE — Disponible cette semaine
   "Corriger 20 fiches avec données manquantes"
   Progrès: 7/20
   Récompense: +100 XP + Badge "Détective" 🔍
```

### 5.4 Missions Complétées (historique)

Log des missions terminées avec date et XP gagné, filtrable par type et par agent.

---

## PAGE 6 — ALERTES (Centre de Commandement — Alertes)

### 6.1 Vue d'ensemble

Compteur par niveau :
- 🔴 Critiques : 3
- 🟠 Warnings : 7
- 🔵 Infos : 12

### 6.2 Liste détaillée par criticité

**🔴 CRITIQUES**

```
┌──────────────────────────────────────────────────────┐
│ 🔴 DEAL STALLÉ — MONTANT ÉLEVÉ                       │
│                                                       │
│ Deal: "Finalcad - Renouvellement CRM"                │
│ Montant: 32 000€                                      │
│ Stage: Proposition/devis depuis 34 jours              │
│ Owner: Guillaume Delachet                             │
│ Dernière activité: il y a 21 jours                    │
│                                                       │
│ Source HubSpot:                                       │
│   hs_is_stalled = true                                │
│   hs_v2_time_in_current_stage = 2 937 600s (34j)     │
│   notes_last_contacted = 2026-02-23                   │
│                                                       │
│ Actions suggérées:                                    │
│   → Relancer le prospect                              │
│   → Réévaluer la probabilité                          │
│   → Envisager un repositionnement de l'offre          │
│                                                       │
│ [Voir dans HubSpot ↗]                                 │
└──────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────┐
│ 🔴 WIN RATE CRITIQUE                                  │
│                                                       │
│ Win rate actuel: 8.1% (ce trimestre)                  │
│ Seuil critique: < 10%                                 │
│ Trimestre précédent: 12.4%                            │
│ Évolution: ↓ -4.3 pts                                 │
│                                                       │
│ Source: ratio hs_is_closed_won / (won + lost)         │
│                                                       │
│ Détail par agent:                                     │
│   Guillaume: 12% — Simon: 6% — Bruno: 4%             │
│                                                       │
│ Actions suggérées:                                    │
│   → Analyser les closed lost récents                  │
│   → Revoir la qualification en Discovery              │
│   → Identifier le stage de décrochage                 │
└──────────────────────────────────────────────────────┘
```

```
┌──────────────────────────────────────────────────────┐
│ 🔴 DATA QUALITY SOUS LE SEUIL — PLAFOND ACTIVÉ       │
│                                                       │
│ Score Data Quality: 42/100                            │
│ Seuil de plafonnement: 50                             │
│ ⚠️ TOUS les scores sont plafonnés à 60 max            │
│                                                       │
│ Problèmes détectés:                                   │
│   - 23% des deals sans montant (amount vide)          │
│   - 18% des contacts sans lifecycle stage             │
│   - 34% des closed lost sans raison                   │
│   - 12% des deals sans owner                          │
│                                                       │
│ Impact: Score global réel 67 → affiché 60 (plafonné) │
│                                                       │
│ Actions suggérées:                                    │
│   → Lancer l'Opération Nettoyage (mission spéciale)  │
│   → Remplir les montants sur les 37 deals concernés  │
│   → Compléter les raisons de perte                    │
└──────────────────────────────────────────────────────┘
```

**🟠 WARNINGS** (même format, exemples) :
- "7 leads non travaillés depuis > 48h" avec liste des contacts + owner
- "Pipeline coverage à 1.8x (cible: 3x)" avec calcul détaillé
- "Deal X en stage Y depuis 25 jours — approche du seuil critique"
- "5 deals sans date de fermeture estimée"
- "Concentration client: HubSpot = 22% du revenu total"

**🔵 INFOS :**
- "Badge débloqué par Simon : Blitz 🏎️"
- "Nouveau lead entrant : Antsa Ravison (source: Referral)"
- "Score Pipeline Health en hausse : +12 pts cette semaine"

### 6.3 Paramètres d'alertes

Seuils configurables par l'utilisateur :
- Seuil deal stallé : X jours (défaut: 14)
- Seuil lead non travaillé : X heures (défaut: 48)
- Seuil win rate critique : X% (défaut: 10%)
- Seuil data quality plafond : X pts (défaut: 50)
- Seuil concentration client : X% (défaut: 30%)

---

## PAGE 7 — SETTINGS (Paramètres de la Base)

### 7.1 Configuration Générale
- Nom de l'équipe
- Pipeline(s) à tracker
- Devise (EUR, CAD, USD)
- Fuseau horaire
- Fréquence de refresh des données (15 min, 30 min, 1h, manuel)

### 7.2 Gestion de l'Équipe
- Liste des owners trackés (activer/désactiver)
- Attribution des rôles dans l'app (Commandant, Stratège, Agent)
- Permissions de vue (qui voit quoi)

### 7.3 Objectifs
- Revenue cible trimestriel
- Nombre de deals cible
- Pipeline coverage cible
- Win rate cible
- Objectifs individuels par agent (optionnel)

### 7.4 Personnalisation du Scoring
- Poids des 6 piliers ajustables (total = 100%)
- Seuils de chaque métrique (quand est-ce rouge/orange/vert)
- Seuil du plafond Data Quality

### 7.5 Seuils d'Alertes
- Configurer chaque type d'alerte (activer/désactiver + seuil)

### 7.6 Gamification
- Activer/désactiver l'XP et les badges (certaines équipes pourraient vouloir juste les métriques)
- Personnaliser les noms de rangs
- Configurer les missions quotidiennes/hebdo
- Activer/désactiver le leaderboard

### 7.7 Intégrations
- Statut de la connexion HubSpot
- Re-connexion OAuth
- Export de données (CSV)
- Webhooks (optionnel, pour notifications Slack)

---

## PAGES 8-13 — ZOOM SUR CHAQUE MONDE (6 pages détaillées)

Quand on clique sur une jauge du dashboard, on arrive sur la page détaillée de ce monde. Structure identique pour les 6, contenu différent.

### Structure commune d'une page Monde :

```
┌──────────────────────────────────────────────────────────┐
│ [← Retour au QG]                                         │
│                                                           │
│ 🌊 LEAD FLOW                           Score: 72/100 ↑   │
│ ███████████████████████████████████░░░░░░░░░              │
│                                                           │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ DÉCOMPOSITION DU SCORE                               │  │
│ │                                                      │  │
│ │ Speed to lead        ████████████████░░ 78/100       │  │
│ │ Leads non travaillés ██████████████████ 95/100       │  │
│ │ Taux de conversion   ████████████░░░░░░ 62/100       │  │
│ │ Volume               ██████████░░░░░░░░ 55/100       │  │
│ │ Diversification      █████████████████░ 85/100       │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                           │
│ [Graphiques]  [Tableau]  [Actions]  [Comparatif]          │
│                                                           │
│ ┌────────────────────────────────────────────────────┐    │
│ │           (contenu de l'onglet actif)              │    │
│ └────────────────────────────────────────────────────┘    │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

### PAGE 8 — MONDE 1 : LEAD FLOW 🌊

**Onglet Graphiques :**
- **Line chart** : Volume de leads créés par semaine (12 semaines)
  - Source : `createdate` sur Contact, compté par semaine
- **Pie chart** : Répartition par source d'acquisition
  - Source : `hs_analytics_source` sur Contact
  - Segments : ORGANIC_SEARCH, PAID_SEARCH, SOCIAL_MEDIA, REFERRALS, DIRECT_TRAFFIC, OFFLINE, EMAIL_MARKETING, OTHER
- **Bar chart** : Speed to lead (distribution par tranche)
  - Source : `hs_time_to_first_engagement` (secondes, converti en tranches: <30min, 30min-1h, 1-4h, 4-24h, >24h)
- **Funnel** : Lead → MQL → SQL → Opportunity
  - Source : `lifecyclestage` sur Contact (lead, marketingqualifiedlead, salesqualifiedlead, opportunity)

**Onglet Tableau :**
- Liste des leads non travaillés (`hs_is_unworked = true`) avec : nom, source, date de création, owner assigné, jours depuis création
- Liste des leads récents avec temps de réponse
- Triable par colonne, filtrable par owner

**Onglet Actions Suggérées :**
- "7 leads non travaillés — cliquer pour voir la liste et assigner"
- "Source PAID_SEARCH a un taux de conversion de 3% vs 12% pour REFERRALS — réévaluer le budget pub"
- "Speed to lead moyen à 6h — objectif < 1h — mettre en place une notification temps réel"

**Onglet Comparatif :**
- Ce mois vs mois dernier (toutes métriques)
- Cet agent vs moyenne équipe (si vue filtrée par agent)

**Champs HubSpot natifs utilisés :**
| Métrique | Champ HubSpot | Objet |
|---|---|---|
| Volume leads | createdate | Contact |
| Source | hs_analytics_source | Contact |
| Non travaillés | hs_is_unworked | Contact |
| Speed to lead | hs_time_to_first_engagement | Contact |
| Lifecycle | lifecyclestage | Contact |
| Owner | hubspot_owner_id | Contact |

---

### PAGE 9 — MONDE 2 : PIPELINE HEALTH 🏗️

**Onglet Graphiques :**
- **Funnel horizontal** : Nombre de deals par stage avec montant total par stage
  - Source : `dealstage` + `amount` sur Deal
  - Stages : Discovery → Diagnostic → Proposition → Offre envoyée → Confirmation verbale → Attente signature
- **Stacked bar** : Répartition des deals par owner et par stage
- **Donut** : % deals stallés vs actifs
  - Source : `hs_is_stalled` sur Deal
- **Scatter plot** : Montant vs Jours dans le stage actuel (pour repérer les gros deals qui stagnent)
  - Source : `amount` vs `hs_v2_time_in_current_stage`

**Onglet Tableau :**
- Liste complète des deals actifs avec colonnes :
  - Nom du deal (`dealname`)
  - Stage (`dealstage`)
  - Montant (`amount`)
  - Owner (`hubspot_owner_id` → nom)
  - Jours dans le stage (`hs_v2_time_in_current_stage` converti en jours)
  - Stallé (`hs_is_stalled`)
  - Date de création (`createdate`)
  - Close date estimée (`closedate`)
- Triable, filtrable par owner/stage/stallé
- Code couleur : rouge si stallé, orange si > 20j dans un stage

**Onglet Actions :**
- "3 deals stallés à débloquer" (liste avec liens HubSpot)
- "8 deals sans montant à compléter"
- "2 deals sans close date estimée"
- "Pipeline coverage à 1.8x — il faudrait X € de plus pour atteindre 3x"

**Champs natifs utilisés :**
| Métrique | Champ | Objet |
|---|---|---|
| Stage | dealstage | Deal |
| Montant | amount | Deal |
| Stallé | hs_is_stalled | Deal |
| Temps dans stage | hs_v2_time_in_current_stage | Deal |
| Owner | hubspot_owner_id | Deal |
| Date fermeture | closedate | Deal |
| Pipeline | pipeline | Deal |

---

### PAGE 10 — MONDE 3 : VELOCITY 🚀

**Onglet Graphiques :**
- **Bar chart horizontal** : Durée moyenne par stage (du plus long au plus court)
  - Source : `hs_v2_cumulative_time_in_[stage_id]` pour chaque stage, moyenné
  - Mise en évidence du goulot d'étranglement (stage le plus long en rouge)
- **Line chart** : Évolution du `days_to_close` moyen par mois (12 mois)
- **Box plot** : Distribution du `days_to_close` par owner (voir qui est rapide/lent)
- **Heatmap** : Jours dans chaque stage × Owner (quelle personne bloque où)

**Onglet Tableau :**
- Deals classés par temps dans le stage actuel (du plus long au plus court)
  - Deal, Stage, Jours dans ce stage, Owner, Montant
  - Highlight rouge > 30 jours, orange > 14 jours
- Deals classés par days_to_close (les plus lents d'abord) pour les closed récents

**Onglet Actions :**
- "Le goulot est au stage 'Proposition/devis' — durée moyenne 18 jours vs 7 jours pour les autres stages"
- "3 deals > 30 jours dans leur stage actuel — relancer en priorité"
- "La velocity s'est dégradée de 12% ce mois vs le mois dernier"

**Champs natifs :**
| Métrique | Champ | Objet |
|---|---|---|
| Temps dans chaque stage | hs_v2_cumulative_time_in_[stage] | Deal |
| Temps stage actuel | hs_v2_time_in_current_stage | Deal |
| Days to close | days_to_close | Deal |
| Date entrée stage | hs_v2_date_entered_[stage] | Deal |
| Date sortie stage | hs_v2_date_exited_[stage] | Deal |

---

### PAGE 11 — MONDE 4 : CLOSING POWER 🎯

**Onglet Graphiques :**
- **KPI cards** en haut : Win Rate global, Win Rate ce mois, Montant moyen won, Nb deals won ce mois
- **Bar chart** : Win rate par owner
  - Source : `hs_is_closed_won` / total closed par `hubspot_owner_id`
- **Funnel conversion** : Taux de passage entre chaque stage (Discovery → Diagnostic : 70%, Diagnostic → Proposition : 45%, etc.)
  - Source : comptage de deals ayant atteint chaque stage vs stage suivant
- **Pie chart** : Raisons de perte
  - Source : `closed_lost_reason` sur deals closed lost
- **Line chart** : Évolution du win rate mensuel sur 12 mois

**Onglet Tableau :**
- **Deals won récents** : Deal, Montant, Days to close, Owner, Source du contact associé
- **Deals lost récents** : Deal, Montant perdu, Stage atteint max, Raison de perte, Owner
- **Deals sans raison de perte** : liste avec lien HubSpot pour compléter

**Onglet Actions :**
- "Win rate à 8% — la moyenne SaaS B2B est 20-30%"
- "Le stage de décrochage principal est 'Offre envoyée → Confirmation' (52% de perte)"
- "Top raison de perte : 'Budget' (34%) — adapter le pricing ?"
- "12 closed lost sans raison — à compléter pour améliorer l'analyse"

**Champs natifs :**
| Métrique | Champ | Objet |
|---|---|---|
| Won | hs_is_closed_won | Deal |
| Lost | hs_is_closed_lost | Deal |
| Raison perte | closed_lost_reason | Deal |
| Montant | amount | Deal |
| Probabilité | hs_deal_stage_probability | Deal |
| Days to close | days_to_close | Deal |
| Type | dealtype | Deal |

---

### PAGE 12 — MONDE 5 : REVENUE HEALTH 💰

**Onglet Graphiques :**
- **Big number** : Revenue closé ce trimestre vs objectif, avec jauge de progression
- **Bar chart empilé** : Revenue par mois (12 mois), split new business vs existing business
  - Source : `amount` sur closed won + `dealtype` + `closedate`
- **Top 10 comptes** : Bar chart horizontal des top companies par `total_revenue`
- **Pie chart** : Concentration client (top 3, top 5, top 10, reste)
  - Source : `total_revenue` sur Company
- **Line chart** : Panier moyen par mois (évolution)

**Onglet Tableau :**
- **Top comptes** avec colonnes : Company, Total Revenue, Nb deals won, Dernier deal, Owner principal
  - Source : `total_revenue`, `num_associated_deals` sur Company
- **Deals won ce trimestre** : Deal, Montant, Type (new/existing), Close date, Owner

**Onglet Actions :**
- "Objectif Q1 : 150 000€ — Atteint : 87 000€ (58%) — Il reste 15 jours"
- "Concentration risquée : HubSpot = 22% du revenu — diversifier"
- "Ratio new business : 28% — proche de la cible 30%"
- "Pipeline ouverte de 132K€ — au win rate actuel (8%), projection = 10 560€ supplémentaires"

**Champs natifs :**
| Métrique | Champ | Objet |
|---|---|---|
| Revenue total | total_revenue | Company |
| Montant deal | amount | Deal |
| Close date | closedate | Deal |
| Type | dealtype | Deal |
| Won | hs_is_closed_won | Deal |
| Nb deals | num_associated_deals | Company |

---

### PAGE 13 — MONDE 6 : DATA QUALITY 🧹

**⚠️ Rappel : si score < 50, TOUS les autres piliers plafonnés à 60**

**Onglet Graphiques :**
- **Big number** : Score Data Quality avec status du plafond (Actif / Inactif)
- **Bar chart** : % de complétude par propriété critique
  - amount renseigné : 77%
  - closedate renseigné : 82%
  - hubspot_owner_id renseigné : 88%
  - closed_lost_reason renseigné : 66%
  - lifecyclestage renseigné : 71%
  - hs_analytics_source renseigné : 90%
- **Donut** : % global de fiches "propres" vs "incomplètes"
- **Line chart** : Évolution du score data quality sur 12 semaines
- **Heatmap** : Complétude par owner (qui remplit bien, qui ne remplit pas)

**Onglet Tableau :**
- **Deals avec données manquantes** — triés par impact (montant × incomplétude) :
  - Deal, Montant, Champs manquants, Owner, Lien HubSpot
- **Contacts sans lifecycle stage**
- **Contacts sans source**
- **Deals avec nom générique** ("New Deal", "test", etc.)
- **Fiches potentiellement dupliquées** (même email sur plusieurs contacts)

**Onglet Actions (prioritisées) :**
1. "🔴 PRIORITÉ 1 : Remplir le montant sur 37 deals (impact direct sur Pipeline Health)"
2. "🔴 PRIORITÉ 2 : Renseigner la raison de perte sur 23 deals (impact sur Closing Power)"
3. "🟠 PRIORITÉ 3 : Compléter le lifecycle stage sur 145 contacts"
4. "🟠 PRIORITÉ 4 : Assigner un owner sur 12 deals orphelins"
5. "🔵 PRIORITÉ 5 : Renommer 8 deals avec des noms génériques"

**Impact calculé :**
- "Si vous passez le score Data Quality de 42 à 55 (+13 pts), le plafond sera levé et votre score global passera de 60 à 67"

**Champs natifs :**
| Métrique | Champ vérifié | Objet |
|---|---|---|
| Montant renseigné | amount ≠ vide | Deal |
| Close date renseigné | closedate ≠ vide | Deal |
| Owner renseigné | hubspot_owner_id ≠ vide | Deal |
| Raison perte | closed_lost_reason ≠ vide | Deal (closed lost) |
| Lifecycle | lifecyclestage ≠ vide | Contact |
| Source | hs_analytics_source ≠ vide | Contact |
| Nom générique | dealname contient "test/new deal/demo" | Deal |
| Fraîcheur | notes_last_contacted < 14 jours | Deal (ouvert) |

---

## PAGE 14 — HISTORIQUE & TENDANCES

### 14.1 Timeline Globale

Graphique multi-courbes montrant l'évolution des 6 scores + score global sur 12 semaines/6 mois/12 mois.

Permet de voir :
- Est-ce que l'équipe progresse globalement ?
- Quel pilier s'améliore, lequel se dégrade ?
- Impact d'actions correctives (ex: après une opération nettoyage, le score data monte)

### 14.2 Snapshots Trimestriels

Tableau comparatif trimestre par trimestre :

| Métrique | Q3 2025 | Q4 2025 | Q1 2026 | Tendance |
|---|---|---|---|---|
| Score Global | 34 | 41 | 52 | ↑↑ |
| Win Rate | 6% | 9% | 12% | ↑ |
| Pipeline Value | 95K€ | 120K€ | 132K€ | ↑ |
| Days to Close | 72j | 65j | 58j | ↑ (↓ = mieux) |
| Data Quality | 38 | 45 | 62 | ↑↑ |
| Revenue closé | 45K€ | 67K€ | 87K€ | ↑ |

### 14.3 Export

Bouton "Exporter en PDF" → génère un rapport trimestriel propre avec tous les KPIs, évolutions, top actions. Idéal pour un board meeting ou un comité de direction.

---

## PAGE 15 — RAPPORT AUTOMATIQUE (Weekly Brief)

Accessible depuis le menu + envoyé par email chaque lundi matin.

### Contenu du rapport :

```
══════════════════════════════════════════════
  REVOPS COMMAND CENTER — RAPPORT SEMAINE 11
  Ceres Agency — 10 → 16 mars 2026
══════════════════════════════════════════════

SCORE GLOBAL : 52/100 (↑ +4 vs semaine dernière)
Rang : Instruments de Bord 🟡

━━━ RÉSUMÉ DES 6 PILIERS ━━━

🌊 Lead Flow:     72 (↑ +3)  — 12 nouveaux leads, 2 non travaillés
🏗️ Pipeline:      58 (→ 0)   — 16 deals actifs, 132K€, 3 stallés
🚀 Velocity:      45 (↑ +7)  — Days to close moyen: 52j
🎯 Closing:       31 (↓ -2)  — Win rate: 8.1%, 1 deal won (8 500€)
💰 Revenue:       44 (↑ +5)  — 87K€ closé Q1 / objectif 150K€
🧹 Data Quality:  55 (↑ +13) — Plafond LEVÉ cette semaine ✅

━━━ HIGHLIGHTS ━━━

✅ Plafond Data Quality levé (passé de 42 à 55)
✅ Badge "Speed Demon" débloqué par Simon
✅ 2 deals avancés de stage
⚠️ Win rate toujours critique (< 10%)
⚠️ 3 deals stallés > 30 jours

━━━ TOP 3 ACTIONS PRIORITAIRES ━━━

1. Débloquer les 3 deals stallés (47K€ en jeu)
2. Closer les 2 deals en "Attente signature" (23K€)
3. Continuer le nettoyage data (score à 55, cible 70)

━━━ LEADERBOARD SEMAINE ━━━

🥇 Guillaume  +340 XP  (1 deal won, 4 contacts, 0 stallé)
🥈 Simon      +215 XP  (0 deal won, 6 contacts, badge)
🥉 Bruno      +120 XP  (0 deal won, 2 contacts, 1 stallé)
```

---

## NAVIGATION GLOBALE

### Menu latéral (sidebar gauche, toujours visible)

```
┌─────────────────┐
│ [Logo]           │
│ RevOps Command   │
│ Center           │
│                  │
│ ── PRINCIPAL ──  │
│ 🏠 QG (Dashboard)│
│ 🎖️ Classement    │
│ 🎯 Missions      │
│ 🚨 Alertes (3)   │
│                  │
│ ── MONDES ──     │
│ 🌊 Lead Flow     │
│ 🏗️ Pipeline      │
│ 🚀 Velocity      │
│ 🎯 Closing       │
│ 💰 Revenue       │
│ 🧹 Data Quality  │
│                  │
│ ── OUTILS ──     │
│ 📊 Historique    │
│ 📋 Rapport Hebdo │
│ ⚙️ Paramètres    │
│                  │
│ ── MON PROFIL ── │
│ ⭐ Lv.34 Guillaume│
│ 14 200 XP        │
│ [Voir profil]    │
└─────────────────┘
```

---

## NOTIFICATIONS (système transversal)

### In-app (cloche en haut à droite)
- Badge débloqué
- Mission complétée
- Alerte critique déclenchée
- Changement de rang/niveau

### Email (optionnel, configurable)
- Rapport hebdomadaire le lundi
- Alerte critique immédiate (deal stallé > seuil, win rate crash)
- Résumé mensuel

### Slack (optionnel, webhook)
- Post automatique dans un channel : alertes critiques, badges, deals won
- Format : "🏆 Guillaume vient de closer 'Kolsquare Audit CRM' pour 12 000€ — +135 XP"

---

## MAPPING COMPLET DES CHAMPS HUBSPOT NATIFS

Aucune propriété custom n'est requise. Tout repose sur des champs par défaut :

### Sur l'objet DEAL :
| Champ natif | Utilisé pour |
|---|---|
| `dealname` | Affichage |
| `dealstage` | Pipeline funnel, stage distribution |
| `amount` | Pipeline value, revenue, data quality |
| `pipeline` | Filtre pipeline principal |
| `hubspot_owner_id` | Attribution agent, leaderboard |
| `createdate` | Volume deals créés, XP |
| `closedate` | Revenue par période, data quality |
| `hs_is_stalled` | Deals stallés (natif HubSpot) |
| `hs_is_closed_won` | Win count, revenue |
| `hs_is_closed_lost` | Loss count, win rate |
| `days_to_close` | Velocity |
| `hs_v2_time_in_current_stage` | Aging par deal |
| `hs_v2_cumulative_time_in_*` | Durée moyenne par stage |
| `hs_v2_date_entered_*` | Détection progression, XP |
| `hs_v2_date_exited_*` | Calcul de vélocité inter-stages |
| `hs_deal_stage_probability` | Forecast pondéré |
| `closed_lost_reason` | Analyse des pertes, data quality |
| `dealtype` | New business vs existing |
| `deal_currency_code` | Gestion multi-devises |
| `notes_last_contacted` | Fraîcheur, XP activité |

### Sur l'objet CONTACT :
| Champ natif | Utilisé pour |
|---|---|
| `firstname` / `lastname` | Affichage |
| `lifecyclestage` | Funnel Lead → Customer, data quality |
| `hs_lead_status` | Statut lead |
| `hubspot_owner_id` | Attribution |
| `hs_analytics_source` | Source d'acquisition |
| `hs_is_unworked` | Leads non travaillés |
| `hs_time_to_first_engagement` | Speed to lead |
| `createdate` | Volume leads par période |
| `notes_last_contacted` | Fraîcheur |
| `num_associated_deals` | Lien contact-deal |

### Sur l'objet COMPANY :
| Champ natif | Utilisé pour |
|---|---|
| `name` | Affichage |
| `total_revenue` | Revenue par compte (auto-agrégé) |
| `num_associated_deals` | Volume deals par compte |
| `num_associated_contacts` | Taille du compte |
| `domain` | Identification unique |

---

## FORMULES DE SCORING DÉTAILLÉES

### Score Global
```
Score Global = (Lead Flow × 0.15) + (Pipeline × 0.25) + (Velocity × 0.20)
             + (Closing × 0.25) + (Revenue × 0.10) + (Data Quality × 0.05)

SI Data Quality < 50 ALORS Score Global = MIN(Score Global, 60)
```

### Lead Flow (0-100)
```
speed_score =
  si avg(hs_time_to_first_engagement) < 1800s (30min) → 100
  si < 3600s (1h) → 85
  si < 14400s (4h) → 60
  si < 86400s (24h) → 30
  sinon → 10

unworked_score =
  si count(hs_is_unworked=true) == 0 → 100
  si < 3 → 70
  si < 10 → 40
  sinon → 10

conversion_score =
  taux = count(lifecyclestage=opportunity) / count(lifecyclestage=lead) × 100
  si taux > 25% → 100
  si > 15% → 75
  si > 10% → 50
  si > 5% → 30
  sinon → 10

volume_score =
  comparaison vs mois précédent
  si volume ↑ > 20% → 100
  si ↑ > 0% → 70
  si stable (±5%) → 50
  si ↓ → 30

diversification_bonus =
  si aucune source > 40% du total → +10
  si aucune source > 50% → +5
  sinon → 0

LEAD_FLOW = (speed_score × 0.30) + (unworked_score × 0.25) + (conversion_score × 0.25)
          + (volume_score × 0.15) + diversification_bonus
          plafonné à 100
```

### Pipeline Health (0-100)
```
stalled_score =
  ratio = count(hs_is_stalled=true) / count(deals_ouverts)
  si ratio == 0 → 100
  si < 5% → 85
  si < 10% → 60
  si < 20% → 35
  sinon → 10

coverage_score =
  coverage = sum(amount deals ouverts) / objectif_revenue_trimestre
  si coverage > 4x → 100
  si > 3x → 85
  si > 2x → 60
  si > 1x → 35
  sinon → 10

completeness_score =
  pct_with_amount = count(amount != null) / count(deals_ouverts)
  pct_with_closedate = count(closedate != null) / count(deals_ouverts)
  pct_with_owner = count(owner != null) / count(deals_ouverts)
  score = (pct_with_amount + pct_with_closedate + pct_with_owner) / 3 × 100

aging_score =
  pct_old = count(hs_v2_time_in_current_stage > 30j) / count(deals_ouverts)
  si pct_old == 0 → 100
  si < 10% → 75
  si < 25% → 45
  sinon → 15

PIPELINE_HEALTH = (stalled_score × 0.30) + (coverage_score × 0.25)
               + (completeness_score × 0.20) + (aging_score × 0.25)
```

### Velocity (0-100)
```
dtc_score =
  avg_dtc = avg(days_to_close) sur deals won récents (90j)
  si avg_dtc < 20j → 100
  si < 30j → 85
  si < 45j → 65
  si < 60j → 45
  si < 90j → 25
  sinon → 10

bottleneck_score =
  max_stage_duration = max des moyennes hs_v2_cumulative_time_in_*
  si max_stage_duration < 7j → 100
  si < 14j → 75
  si < 21j → 50
  si < 30j → 30
  sinon → 10

trend_bonus =
  si avg_dtc ce mois < avg_dtc mois dernier → +15
  si stable → +0
  si pire → -10

VELOCITY = (dtc_score × 0.45) + (bottleneck_score × 0.40) + trend_bonus + 15
           plafonné à 100, minimum 0
```

### Closing Power (0-100)
```
winrate_score =
  wr = count(closed_won) / count(closed_won + closed_lost) × 100
  si wr > 35% → 100
  si > 25% → 80
  si > 20% → 65
  si > 15% → 50
  si > 10% → 35
  si > 5% → 20
  sinon → 5

reason_score =
  pct = count(closed_lost_reason != null) / count(closed_lost) × 100
  si pct > 95% → 100
  si > 80% → 70
  si > 60% → 45
  sinon → 15

conversion_funnel_score =
  basé sur le taux de conversion proposition → won
  si > 50% → 100
  si > 35% → 75
  si > 20% → 50
  si > 10% → 25
  sinon → 10

CLOSING_POWER = (winrate_score × 0.45) + (reason_score × 0.25)
             + (conversion_funnel_score × 0.30)
```

### Revenue Health (0-100)
```
target_score =
  pct_objectif = revenue_closé_trimestre / objectif_trimestre × 100
  ajusté au prorata temporel (si mi-trimestre, cible = 50%)
  si pct_objectif > 110% → 100
  si > 90% → 80
  si > 70% → 60
  si > 50% → 40
  sinon → 15

concentration_score =
  pct_top3 = revenue_top3_clients / revenue_total × 100
  si pct_top3 < 25% → 100
  si < 35% → 80
  si < 50% → 55
  si < 70% → 30
  sinon → 10

mix_score =
  pct_new = revenue_new_business / revenue_total × 100
  si pct_new > 40% → 100
  si > 30% → 80
  si > 20% → 55
  si > 10% → 30
  sinon → 10

REVENUE_HEALTH = (target_score × 0.50) + (concentration_score × 0.25)
              + (mix_score × 0.25)
```

### Data Quality (0-100)
```
Pour chaque propriété critique, calculer le % de complétude :

deal_amount_pct = count(amount != null sur deals ouverts) / count(deals ouverts)
deal_closedate_pct = count(closedate != null sur deals ouverts) / count(deals ouverts)
deal_owner_pct = count(owner != null) / count(deals)
lost_reason_pct = count(closed_lost_reason != null) / count(closed_lost)
contact_lifecycle_pct = count(lifecyclestage != null) / count(contacts récents 90j)
contact_source_pct = count(hs_analytics_source != null) / count(contacts)

avg_completeness = moyenne des 6 pourcentages ci-dessus × 100

freshness_bonus =
  pct_fresh = count(notes_last_contacted < 14j sur deals ouverts) / count(deals ouverts)
  si pct_fresh > 80% → +15
  si > 50% → +8
  sinon → 0

generic_name_penalty =
  count(dealname contient "test"|"new deal"|"demo"|"copy")
  -2 pts par occurrence (max -20)

DATA_QUALITY = avg_completeness + freshness_bonus + generic_name_penalty
               plafonné à 100, minimum 0

RÈGLE PLAFOND :
SI DATA_QUALITY < 50 ALORS pour chaque pilier P :
  P_affiché = MIN(P_calculé, 60)
```

---

## STACK TECHNIQUE RECOMMANDÉE

| Composant | Technologie | Justification |
|---|---|---|
| Frontend | React + TypeScript + Tailwind | Standard SaaS, animations fluides |
| Animations | Framer Motion | Jauges animées, transitions, XP counters |
| Graphiques | Recharts ou D3.js | Flexibilité pour les 20+ types de graphiques |
| Backend | Node.js (Express) ou Python (FastAPI) | Légèreté, rapidité de dev |
| Auth | OAuth 2.0 HubSpot | Connexion en 1 clic, accès API |
| API Data | HubSpot CRM API v3 | Toutes les données nécessaires |
| Cache | Redis | Refresh toutes les 15 min, pas d'appel API à chaque page |
| Database | PostgreSQL | XP, badges, historique scores, config |
| Job Scheduler | Bull (Node) ou Celery (Python) | Calcul des scores en background, rapports hebdo |
| Email | SendGrid ou Resend | Rapports hebdo, alertes |
| Hosting | Vercel (front) + Railway (back) | Simple, scalable, pas cher |
| Monitoring | Sentry + Posthog | Erreurs + analytics usage |

### Coût estimé d'infrastructure
- Phase MVP (< 50 utilisateurs) : ~50€/mois
- Phase Growth (50-500 utilisateurs) : ~200-500€/mois
- Enterprise (500+) : ~1000€/mois+

---

## ROADMAP SUGGÉRÉE

### V1 — MVP (4-6 semaines)
- Connexion OAuth HubSpot
- Dashboard avec 6 jauges (score calculé)
- Page détaillée pour chaque monde (graphiques + tableau)
- Alertes critiques
- 1 pipeline supporté

### V2 — Gamification (3-4 semaines)
- Système XP + niveaux + rangs
- Leaderboard
- Profil agent
- Badges (top 10 badges les plus importants)

### V3 — Missions & Engagement (3-4 semaines)
- Missions quotidiennes et hebdomadaires
- Missions spéciales / événements
- Notifications in-app
- Rapport hebdomadaire par email

### V4 — Polish & Scale (4-6 semaines)
- Multi-pipeline
- Multi-devise
- Historique / tendances longue durée
- Export PDF
- Intégration Slack
- Saisons et XP decay
- Paramètres avancés

### V5 — SaaS (ongoing)
- Onboarding self-service
- Billing (Stripe)
- Multi-tenant
- API publique
- Marketplace de badges custom

---

*Document généré le 16 mars 2026 — RevOps Command Center Spec v1.0*
*Basé sur les données réelles du portail HubSpot Ceres Agency (ID: 2703445)*
*100% des métriques reposent sur des champs HubSpot natifs — 0 propriété custom requise*
