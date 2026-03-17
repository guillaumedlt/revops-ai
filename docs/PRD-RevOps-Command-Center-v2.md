# REVOPS COMMAND CENTER
## Product Requirements Document (PRD) v2.0

**Auteur :** Ceres Agency
**Date :** 16 mars 2026
**Statut :** Draft — En cours de validation
**Confidentialité :** Confidentiel — Ne pas diffuser

---

# TABLE DES MATIÈRES

1. [Executive Summary](#1-executive-summary)
2. [Vision Produit & Positionnement](#2-vision-produit--positionnement)
3. [Personas & Cas d'Usage](#3-personas--cas-dusage)
4. [Architecture de l'Information](#4-architecture-de-linformation)
5. [Parcours Utilisateurs Clés](#5-parcours-utilisateurs-clés)
6. [Spécifications Page par Page](#6-spécifications-page-par-page)
7. [Système de Gamification](#7-système-de-gamification)
8. [Moteur de Scoring](#8-moteur-de-scoring)
9. [Moteur d'Alertes](#9-moteur-dalertes)
10. [Modèle de Données](#10-modèle-de-données)
11. [Architecture Technique](#11-architecture-technique)
12. [Sécurité & Permissions](#12-sécurité--permissions)
13. [Performance & Scalabilité](#13-performance--scalabilité)
14. [Benchmarks Sectoriels](#14-benchmarks-sectoriels)
15. [Modèle Économique & Pricing](#15-modèle-économique--pricing)
16. [Analyse Concurrentielle](#16-analyse-concurrentielle)
17. [Roadmap Détaillée](#17-roadmap-détaillée)
18. [Métriques de Succès du Produit](#18-métriques-de-succès-du-produit)
19. [Annexes — Mapping HubSpot Complet](#19-annexes)

---

# 1. EXECUTIVE SUMMARY

## Le problème

Les équipes RevOps et directions commerciales utilisant HubSpot font face à trois problèmes structurels :

**1. Opacité des données.** HubSpot contient des centaines de champs natifs puissants (`hs_is_stalled`, `hs_v2_cumulative_time_in_*`, `hs_time_to_first_engagement`...) que 95% des utilisateurs ne connaissent pas et n'exploitent jamais. Les rapports natifs HubSpot ne permettent pas de croiser ces champs facilement ni de produire des vues agrégées orientées RevOps.

**2. Absence de framework actionnable.** Les directeurs commerciaux et Ops n'ont pas de grille de lecture unifiée pour évaluer la santé de leur machine commerciale. Ils regardent le pipeline value, le win rate, peut-être le forecast — mais pas de manière systématique ni corrélée.

**3. Désengagement des équipes.** Les CRM sont perçus comme des outils de flicage. Les commerciaux remplissent le minimum. La qualité des données se dégrade, ce qui rend les analyses inutiles — cercle vicieux.

## La solution

**RevOps Command Center** est un SaaS connecté à HubSpot qui :
- Agrège automatiquement les données natives HubSpot en **6 piliers RevOps** avec un score de santé de 0 à 100
- Fournit des **vues détaillées par pilier** avec graphiques, tableaux, actions prioritisées
- Gamifie l'engagement CRM avec un **système d'XP, de rangs, de badges et de missions** qui transforme la discipline CRM en un jeu d'équipe
- Fonctionne **sans aucune propriété custom** — 100% basé sur les champs natifs HubSpot

## Proposition de valeur

| Pour | Bénéfice |
|---|---|
| Le Dir. Commercial | Tableau de bord unique de santé commerciale, alertes proactives, rapport hebdo automatique |
| L'Ops / RevOps | Framework structuré, scoring objectif, priorisation data-driven des actions correctives |
| Le Commercial | Visibilité sur sa progression, motivation par le jeu, reconnaissance des bonnes pratiques |
| Le CEO / Board | KPIs RevOps synthétiques pour le pilotage stratégique |

---

# 2. VISION PRODUIT & POSITIONNEMENT

## Vision à 3 ans

Devenir le standard de pilotage RevOps pour les équipes commerciales B2B sur HubSpot, en rendant les données CRM aussi engageantes qu'un jeu et aussi claires qu'un dashboard financier.

## Positionnement

```
Pour les équipes RevOps et directions commerciales B2B
Qui utilisent HubSpot CRM et trouvent que leurs données sont sous-exploitées
RevOps Command Center est un outil SaaS de pilotage gamifié
Qui transforme les champs natifs HubSpot en un score de santé actionnable avec un système de progression par le jeu
Contrairement à HubSpot Reporting, Databox, ou des dashboards BI custom
Notre produit ne nécessite aucune configuration technique, aucune propriété custom, et motive les équipes à maintenir la qualité des données grâce à la gamification
```

## Principes de Design

1. **Zero-config** — L'app doit fonctionner dès la connexion OAuth, sans paramétrage. Les données natives suffisent.
2. **Score > Data** — Chaque donnée brute est traduite en score compréhensible (0-100). On ne montre jamais un chiffre brut sans contexte.
3. **Action > Constat** — Chaque écran propose des actions concrètes, pas juste des constats. "Ton win rate est à 8%" → "Voici les 3 deals en Offre envoyée à relancer cette semaine."
4. **Fun > Flicage** — La gamification récompense les bonnes pratiques, elle ne punit pas les mauvaises. On ne classe jamais "du pire au meilleur".
5. **Data Quality = Fondation** — Si les données sont mauvaises, tout le reste est faux. Le score Data Quality agit comme un plafond sur tous les autres.

---

# 3. PERSONAS & CAS D'USAGE

## Persona 1 — "Nadia" — Head of RevOps

| Attribut | Détail |
|---|---|
| Titre | Head of RevOps / Revenue Operations Manager |
| Équipe | 1-3 personnes Ops, supporte 5-20 commerciaux |
| Stack | HubSpot (Sales Hub Pro/Enterprise), Slack, Google Sheets pour les rapports |
| Frustrations | Passe 2 jours/semaine à construire des rapports manuels. Les données sont incomplètes. Les commerciaux ne remplissent pas le CRM. Pas de vision unifiée RevOps. |
| Objectif | Avoir une vue unique de la santé commerciale, automatiser les rapports, améliorer la data quality |
| Usage de l'app | Quotidien. Consulte le dashboard matin, vérifie les alertes, prépare le weekly meeting avec le dashboard |

**User Stories Nadia :**
- "En tant que Head of RevOps, je veux voir en un coup d'œil si le pipeline est sain, pour identifier les problèmes avant qu'ils ne deviennent critiques."
- "En tant que Head of RevOps, je veux recevoir un rapport hebdomadaire automatique par email, pour ne plus passer 3h à le construire dans Google Sheets."
- "En tant que Head of RevOps, je veux voir exactement quelles données sont manquantes dans le CRM, pour briefer les commerciaux sur ce qu'ils doivent corriger."
- "En tant que Head of RevOps, je veux comparer les métriques de ce mois vs le mois dernier, pour mesurer l'impact de mes actions."
- "En tant que Head of RevOps, je veux savoir quel stage du pipeline est le goulot d'étranglement, pour recommander des améliorations de process."

## Persona 2 — "Marc" — Directeur Commercial / VP Sales

| Attribut | Détail |
|---|---|
| Titre | Directeur Commercial / VP Sales / CRO |
| Équipe | 5-30 commerciaux |
| Stack | HubSpot, rarement dans les rapports détaillés, reçoit des slides de l'Ops |
| Frustrations | N'a pas confiance dans le forecast. Ne sait pas qui performe vraiment. Les weekly reviews sont basées sur du déclaratif. |
| Objectif | Piloter son équipe avec des données fiables, motiver sans fliquer, anticiper les problèmes de pipe |
| Usage de l'app | 2-3 fois/semaine. Regarde le leaderboard, les alertes critiques, le score global. Utilise le rapport hebdo pour le comité. |

**User Stories Marc :**
- "En tant que Dir. Commercial, je veux un score unique de 0 à 100 qui me dit si ma machine commerciale tourne bien, sans avoir à analyser 15 rapports."
- "En tant que Dir. Commercial, je veux voir quel commercial a le meilleur win rate et la meilleure vélocité, pour identifier les best practices à répliquer."
- "En tant que Dir. Commercial, je veux être alerté quand un gros deal est bloqué, pour intervenir personnellement."
- "En tant que Dir. Commercial, je veux un leaderboard qui motive mon équipe sans créer de tensions, en valorisant les bonnes pratiques (pas juste le revenue)."
- "En tant que Dir. Commercial, je veux un export PDF propre pour mon board meeting trimestriel."

## Persona 3 — "Lucas" — Account Executive / Commercial

| Attribut | Détail |
|---|---|
| Titre | Account Executive / Business Developer |
| Stack | HubSpot (saisie basique), email, téléphone |
| Frustrations | Le CRM est une corvée. Pas de feedback positif quand il fait bien les choses. Ne voit pas l'impact de son travail sur le pipeline global. |
| Objectif | Voir sa progression, être reconnu, comprendre ce qu'on attend de lui |
| Usage de l'app | 1-2 fois/semaine. Regarde son profil, son rang, ses missions, le leaderboard. Ne "travaille" pas dans l'app — il travaille dans HubSpot. |

**User Stories Lucas :**
- "En tant que commercial, je veux voir mon rang et mon XP, pour savoir où j'en suis par rapport à mes collègues."
- "En tant que commercial, je veux des missions claires et atteignables, pour savoir quoi prioriser aujourd'hui."
- "En tant que commercial, je veux débloquer des badges quand je fais bien les choses, pour avoir un feedback positif."
- "En tant que commercial, je veux voir mes stats personnelles (win rate, velocity, pipeline), pour m'améliorer."
- "En tant que commercial, je ne veux PAS avoir à saisir quoi que ce soit dans cette app. Tout doit venir de HubSpot automatiquement."

## Persona 4 — "Consultant RevOps externe"

| Attribut | Détail |
|---|---|
| Titre | Consultant / Agence RevOps (ex: Ceres Agency) |
| Frustrations | Doit auditer les portails HubSpot manuellement. Pas d'outil pour montrer l'état des lieux au client. Difficile de prouver la valeur de ses recommandations. |
| Objectif | Connecter le portail du client, montrer immédiatement les scores, prioriser les actions, justifier sa prestation |
| Usage | Connecte le portail client, fait une démo du score, utilise les données pour son plan d'action |

---

# 4. ARCHITECTURE DE L'INFORMATION

## Sitemap Complet

```
RevOps Command Center
│
├── 🔐 Authentification
│   ├── Page de connexion (OAuth HubSpot)
│   └── Onboarding (5 étapes, premier lancement uniquement)
│
├── 🏠 Dashboard Principal (QG)
│   ├── Score global + rang équipe
│   ├── 6 jauges (Lead Flow, Pipeline, Velocity, Closing, Revenue, Data Quality)
│   ├── Bandeau d'alertes actives
│   ├── Leaderboard compact (top 3)
│   ├── Missions en cours (3 actives)
│   └── Timeline d'activité récente
│
├── 🌊 Lead Flow (Monde 1)
│   ├── Score décomposé (5 sous-métriques)
│   ├── Onglet Graphiques (4 graphiques)
│   ├── Onglet Tableau (leads non travaillés, leads récents)
│   ├── Onglet Actions Suggérées
│   └── Onglet Comparatif (période + agent)
│
├── 🏗️ Pipeline Health (Monde 2)
│   ├── Score décomposé (4 sous-métriques)
│   ├── Onglet Graphiques (4 graphiques)
│   ├── Onglet Tableau (deals actifs, détail complet)
│   ├── Onglet Actions Suggérées
│   └── Onglet Comparatif
│
├── 🚀 Velocity (Monde 3)
│   ├── Score décomposé (3 sous-métriques)
│   ├── Onglet Graphiques (4 graphiques)
│   ├── Onglet Tableau (deals par aging, deals par DTC)
│   ├── Onglet Actions Suggérées
│   └── Onglet Comparatif
│
├── 🎯 Closing Power (Monde 4)
│   ├── Score décomposé (3 sous-métriques)
│   ├── Onglet Graphiques (5 graphiques)
│   ├── Onglet Tableau (won récents, lost récents, sans raison)
│   ├── Onglet Actions Suggérées
│   └── Onglet Comparatif
│
├── 💰 Revenue Health (Monde 5)
│   ├── Score décomposé (3 sous-métriques)
│   ├── Onglet Graphiques (4 graphiques)
│   ├── Onglet Tableau (top comptes, deals won)
│   ├── Onglet Actions Suggérées
│   └── Onglet Comparatif
│
├── 🧹 Data Quality (Monde 6)
│   ├── Score décomposé (6 sous-métriques) + status plafond
│   ├── Onglet Graphiques (4 graphiques)
│   ├── Onglet Tableau (fiches à corriger, par priorité)
│   ├── Onglet Actions Suggérées (priorisées par impact)
│   └── Simulateur d'impact ("si je corrige X, mon score passe à Y")
│
├── 🎖️ Leaderboard
│   ├── Podium Top 3
│   ├── Tableau complet classement
│   ├── Radar comparatif (spider chart)
│   ├── Progression saisonnière (courbes)
│   └── Sélecteur : Saisonnier / All-time / Ce mois
│
├── 👤 Profil Agent
│   ├── En-tête (avatar, rang, niveau, XP, barre de progression)
│   ├── KPIs personnels vs équipe
│   ├── Vitrine de badges (gagnés + à débloquer)
│   ├── Historique d'XP (courbe 90j)
│   ├── Deals en cours (tableau)
│   └── Missions personnelles
│
├── 🎯 Centre de Missions
│   ├── Missions quotidiennes (reset minuit)
│   ├── Missions hebdomadaires (reset lundi)
│   ├── Missions spéciales / événements
│   ├── Historique des missions complétées
│   └── Récompenses disponibles
│
├── 🚨 Centre d'Alertes
│   ├── Vue d'ensemble (compteurs par criticité)
│   ├── Alertes critiques (rouge)
│   ├── Warnings (orange)
│   ├── Infos (bleu)
│   └── Historique des alertes résolues
│
├── 📊 Historique & Tendances
│   ├── Évolution des 6 scores + global (multi-courbes)
│   ├── Snapshots trimestriels (tableau comparatif)
│   ├── Export PDF rapport trimestriel
│   └── Sélecteur période (12 sem / 6 mois / 12 mois / custom)
│
├── 📋 Rapport Hebdomadaire
│   ├── Prévisualisation du rapport de la semaine
│   ├── Historique des rapports passés
│   └── Paramètres d'envoi (destinataires, jour, heure)
│
└── ⚙️ Paramètres
    ├── Configuration générale (équipe, devise, timezone, refresh)
    ├── Gestion de l'équipe (owners trackés, rôles)
    ├── Objectifs (revenue, deals, coverage, win rate)
    ├── Personnalisation du scoring (poids, seuils)
    ├── Seuils d'alertes
    ├── Gamification (activer/désactiver, noms de rangs, missions)
    ├── Intégrations (HubSpot status, Slack webhook, email)
    ├── Notifications (in-app, email, Slack)
    └── Compte & Facturation
```

## Navigation

### Sidebar (permanente, colonne gauche, 240px)

```
┌────────────────────────┐
│                        │
│  [Logo] RevOps CC      │
│  ─────────────────     │
│                        │
│  PILOTAGE              │
│  ● QG (Dashboard)      │
│  ● Alertes        (3)  │
│  ● Rapport Hebdo       │
│  ● Historique          │
│                        │
│  MONDES                │
│  ◐ Lead Flow      72   │
│  ◐ Pipeline       58   │
│  ◐ Velocity       45   │
│  ◐ Closing        31   │
│  ◐ Revenue        44   │
│  ◐ Data Quality   55   │
│                        │
│  ÉQUIPE                │
│  ● Classement          │
│  ● Missions            │
│                        │
│  ─────────────────     │
│  ⚙ Paramètres          │
│                        │
│  ─────────────────     │
│  [Avatar] Guillaume    │
│  ⭐ Capitaine Lv.34    │
│  14 200 XP             │
│                        │
└────────────────────────┘
```

**Comportement responsive :**
- Desktop (>1280px) : Sidebar déployée, contenu à droite
- Tablet (768-1280px) : Sidebar réduite (icônes uniquement, 64px), hover pour déployer
- Mobile (<768px) : Sidebar masquée, hamburger menu en haut à gauche, overlay au clic

### Topbar (permanente, barre horizontale en haut)

```
┌──────────────────────────────────────────────────────────────┐
│  [Breadcrumb: QG > Pipeline Health]    [Période: Ce mois ▼] │
│                                        [🔔 3] [🔄 Refresh]  │
└──────────────────────────────────────────────────────────────┘
```

- **Breadcrumb** : Navigation contextuelle (ex: "QG > Pipeline Health > Deal X")
- **Sélecteur de période** : Global, affecte toutes les pages. Options : "Ce mois", "Ce trimestre", "30 derniers jours", "90 derniers jours", "Custom"
- **Cloche notifications** : Badge avec compteur, dropdown au clic avec les 10 dernières notifications
- **Bouton refresh** : Force un re-pull des données HubSpot (cooldown 5 min entre deux refresh)

---

# 5. PARCOURS UTILISATEURS CLÉS

## Parcours 1 — Premier lancement (Onboarding)

```
[Utilisateur arrive sur l'app]
       │
       ▼
[Page Login — Bouton "Connecter HubSpot"]
       │ (OAuth HubSpot — scopes: crm.objects.deals.read,
       │  crm.objects.contacts.read, crm.objects.companies.read,
       │  crm.schemas.deals.read, crm.schemas.contacts.read)
       ▼
[Étape 1/5 — Scan du portail]
  Animation radar pendant 5-10s
  Affichage résultats :
  "✅ 1 073 deals détectés"
  "✅ 4 980 contacts détectés"
  "✅ 10 333 companies détectées"
  "✅ 3 pipelines trouvés"
  [Bouton: Continuer →]
       │
       ▼
[Étape 2/5 — Sélection du pipeline]
  Liste des pipelines avec preview :
  ┌──────────────────────────────────┐
  │ ● Services (default)             │
  │   1 073 deals · 6 stages actifs  │
  │   [Voir les stages ▼]            │
  │     Discovery call done          │
  │     Diagnostic done              │
  │     Proposition/devis            │
  │     Offre envoyée                │
  │     Confirmation verbale         │
  │     Attente signature            │
  │                                  │
  │ ○ Billing                        │
  │   48 deals · 3 stages            │
  │                                  │
  │ ○ Scrapthesky                    │
  │   12 deals · 4 stages            │
  └──────────────────────────────────┘
  Checkbox: "Tracker aussi les pipelines secondaires"
  [← Retour]  [Continuer →]
       │
       ▼
[Étape 3/5 — Configuration de l'équipe]
  Owners détectés (actifs uniquement) :
  ┌──────────────────────────────────┐
  │ ☑ Guillaume Delachet   (active)  │
  │   47 deals actifs · 32 won      │
  │                                  │
  │ ☑ Simon Toussaint      (active)  │
  │   23 deals actifs · 18 won      │
  │                                  │
  │ ☑ Bruno Teixeira       (active)  │
  │   12 deals actifs · 5 won       │
  │                                  │
  │ ☐ Margot Damiens      (inactive) │
  │   0 deals actifs                 │
  └──────────────────────────────────┘
  Note: "Les owners inactifs sont décochés par défaut"
  [← Retour]  [Continuer →]
       │
       ▼
[Étape 4/5 — Objectifs (optionnel)]
  ┌──────────────────────────────────┐
  │ Revenue cible ce trimestre:      │
  │ [150 000] €                      │
  │                                  │
  │ Pipeline coverage cible:         │
  │ [3x] (recommandé: 3x)           │
  │                                  │
  │ Win rate cible:                  │
  │ [20%] (benchmark B2B: 20-30%)   │
  │                                  │
  │ ☐ Passer cette étape (utiliser   │
  │   les benchmarks automatiques)   │
  └──────────────────────────────────┘
  [← Retour]  [Continuer →]
       │
       ▼
[Étape 5/5 — Lancement]
  Animation : "Calcul des scores en cours..."
  Barre de progression : 0% → 100%
  Messages dynamiques pendant le chargement :
    "Analyse des deals..."
    "Détection des deals stallés..."
    "Calcul de la vélocité..."
    "Évaluation de la data quality..."
    "Score global : 52/100 — Instruments de Bord"
  [Bouton: Entrer dans le QG →]
       │
       ▼
[Dashboard Principal]
  Tooltip d'onboarding sur les éléments clés (3 bulles max):
  1. "Voici vos 6 piliers RevOps. Cliquez sur un pilier pour le détail."
  2. "Les alertes vous signalent les problèmes urgents."
  3. "Le leaderboard montre la progression de votre équipe."
```

**Edge cases onboarding :**
- **Portail vide (< 10 deals)** : Message "Votre portail contient peu de données. Les scores seront imprécis. Nous recommandons au moins 50 deals pour des résultats significatifs." → L'app fonctionne quand même mais affiche un bandeau "Données insuffisantes" sur chaque score.
- **Pas de deal closed** : Le pilier "Closing Power" affiche "N/A — Aucun deal fermé détecté" au lieu d'un score.
- **Un seul owner** : Le leaderboard est masqué. La section "vs équipe" sur le profil est masquée.
- **Multi-devises** : Détectée automatiquement via `deal_currency_code`. Affichage dans la devise principale (celle avec le plus de deals). Conversion via taux HubSpot ou taux fixe configurable dans Settings.
- **Token expiré** : Redirect vers login avec message "Votre connexion HubSpot a expiré. Reconnectez-vous."

## Parcours 2 — Consultation matinale (Nadia, quotidien)

```
[Nadia ouvre l'app → Dashboard]
       │
       ▼
[Vérifie le score global : 52 → stable]
[Scanne les alertes : 1 nouvelle alerte rouge]
       │
       ▼
[Clic sur l'alerte rouge : "Deal Finalcad stallé 34j"]
       │
       ▼
[Vue détaillée de l'alerte]
  → Voit le deal, le montant, l'owner, les actions suggérées
  → Clic "Voir dans HubSpot" → nouvel onglet HubSpot sur ce deal
       │
       ▼
[Retour Dashboard → Vérifie les missions]
  → Voit que l'équipe a 2/3 missions quotidiennes en cours
       │
       ▼
[Clic sur Data Quality (score 55)]
       │
       ▼
[Page Data Quality → Onglet Actions]
  → Voit "23 deals sans montant" en priorité 1
  → Note la liste pour le stand-up du matin
       │
       ▼
Durée totale : 3-5 minutes
```

## Parcours 3 — Weekly review (Marc, hebdo)

```
[Marc reçoit le rapport hebdo par email lundi 9h]
       │
       ▼
[Lit le résumé : score, highlights, top 3 actions]
       │
       ▼
[Clic "Voir le détail dans l'app"]
       │
       ▼
[Dashboard → Clic Leaderboard]
  → Voit le classement, félicite le top performer en réunion
       │
       ▼
[Clic Pipeline Health]
  → Voit le funnel par stage, identifie le goulot
  → Onglet Comparatif : ce mois vs mois dernier
       │
       ▼
[Clic Closing Power]
  → Voit les raisons de perte
  → Note : "42% perdus pour budget → on revoit le pricing"
       │
       ▼
[Historique → Export PDF pour le board meeting]
       │
       ▼
Durée totale : 10-15 minutes
```

## Parcours 4 — Consultation du profil (Lucas, 1-2x/semaine)

```
[Lucas ouvre l'app → Son profil s'affiche]
       │
       ▼
[Voit son rang : Sergent Lv.19, 4 100 XP]
  → "+780 XP cette semaine, rang #2"
  → Barre de progression vers Lieutenant : 4 100/9 000
       │
       ▼
[Vérifie ses missions quotidiennes]
  → "Contacter 3 prospects" : 1/3 → il sait ce qu'il doit faire
  → "Faire avancer 1 deal" : 0/1
       │
       ▼
[Vérifie ses badges]
  → "Speed Demon" débloqué la semaine dernière ✅
  → "Sniper" en cours : win rate à 18%, objectif 40% → pas encore
  → "Blitz" grisé : nécessite un close en < 15j → motivant
       │
       ▼
[Regarde le leaderboard]
  → Il est #2, à 340 XP du #1
  → Motivation : "Si je close le deal Leeto cette semaine, je passe devant"
       │
       ▼
Durée totale : 2-3 minutes
L'action se passe dans HubSpot, pas dans l'app.
```

---

# 6. SPÉCIFICATIONS PAGE PAR PAGE

---

## 6.1 PAGE : LOGIN

### Objectif
Permettre la connexion via OAuth HubSpot en un clic.

### Layout

```
┌──────────────────────────────────────────────┐
│                                              │
│              [Logo + Nom]                    │
│         RevOps Command Center                │
│                                              │
│     "Pilotez votre machine commerciale"      │
│                                              │
│     ┌────────────────────────────────┐       │
│     │  🔶 Connecter mon HubSpot     │       │
│     └────────────────────────────────┘       │
│                                              │
│     Pas de compte à créer.                   │
│     Connectez votre portail HubSpot          │
│     et c'est parti.                          │
│                                              │
│  ─────────────────────────────────────────   │
│                                              │
│  "Fonctionne avec HubSpot Sales Hub"         │
│  "Free · Starter · Pro · Enterprise"         │
│                                              │
│  [Politique de confidentialité]              │
│  [Conditions d'utilisation]                  │
│                                              │
└──────────────────────────────────────────────┘
```

### Fond
- Sombre (#0B1120), avec animation subtile de grille/radar en arrière-plan (canvas ou CSS)
- Ambiance "salle de commandement"

### États
- **Default** : Bouton de connexion actif
- **Loading** : Après clic, le bouton passe en spinner "Connexion en cours..."
- **Erreur OAuth** : Message rouge sous le bouton : "La connexion a échoué. Vérifiez que vous avez autorisé l'accès. [Réessayer]"
- **Portail déjà connecté** : Redirect automatique vers le Dashboard
- **Token expiré** : Message "Votre session a expiré. Reconnectez-vous." + bouton

### Scopes OAuth demandés

```
crm.objects.deals.read
crm.objects.contacts.read
crm.objects.companies.read
crm.schemas.deals.read
crm.schemas.contacts.read
crm.objects.owners.read
settings.users.read
```

Aucun scope d'écriture n'est demandé. L'app est 100% lecture seule.

---

## 6.2 PAGE : ONBOARDING

(Détaillé dans le Parcours 1 ci-dessus)

### Spécifications supplémentaires

**Persistance :** L'onboarding n'est affiché qu'une seule fois. Un flag `onboarding_completed = true` est stocké en DB. Si l'utilisateur quitte avant la fin, il reprend à l'étape où il s'est arrêté.

**Skip :** Un lien discret "Passer l'onboarding (configuration par défaut)" est disponible à chaque étape. Valeurs par défaut : pipeline avec le plus de deals, tous les owners actifs, benchmarks auto.

**Durée cible :** < 2 minutes pour compléter les 5 étapes.

---

## 6.3 PAGE : DASHBOARD PRINCIPAL (QG)

### Objectif
Vue unique et synthétique de la santé commerciale. L'utilisateur doit comprendre la situation en < 10 secondes.

### Layout Détaillé (Desktop, 1440px)

```
┌─ SIDEBAR ─┬──────────────────────── TOPBAR ──────────────────────────────┐
│            │  QG                            Ce trimestre ▼  🔔3  🔄      │
│  [Logo]    ├─────────────────────────────────────────────────────────────┤
│            │                                                             │
│  PILOTAGE  │  ┌── SCORE GLOBAL ──────────────────────────────────────┐  │
│  ● QG      │  │                                                      │  │
│  ● Alertes │  │        ┌─────┐                                       │  │
│  ● Rapport │  │        │ 52  │  Instruments de Bord 🟡               │  │
│  ● Histo   │  │        │/100 │  ↑ +4 vs trimestre dernier            │  │
│            │  │        └─────┘                                       │  │
│  MONDES    │  │                                                      │  │
│  ◐ Lead 72 │  └──────────────────────────────────────────────────────┘  │
│  ◐ Pipe 58 │                                                             │
│  ◐ Velo 45 │  ┌── 6 JAUGES ─────────────────────────────────────────┐  │
│  ◐ Clos 31 │  │                                                      │  │
│  ◐ Rev  44 │  │  ┌──────┐  ┌──────┐  ┌──────┐                      │  │
│  ◐ Data 55 │  │  │🌊 72 │  │🏗️ 58│  │🚀 45 │                      │  │
│            │  │  │Lead  ↑│  │Pipe →│  │Velo ↑│                      │  │
│  ÉQUIPE    │  │  └──────┘  └──────┘  └──────┘                      │  │
│  ● Class.  │  │                                                      │  │
│  ● Mission │  │  ┌──────┐  ┌──────┐  ┌──────┐                      │  │
│            │  │  │🎯 31 │  │💰 44 │  │🧹 55 │                      │  │
│  ──────    │  │  │Clos ↓│  │Rev  ↑│  │Data ↑│                      │  │
│  ⚙ Params  │  │  └──────┘  └──────┘  └──────┘                      │  │
│            │  │                                                      │  │
│  ──────    │  └──────────────────────────────────────────────────────┘  │
│  [G.D.]    │                                                             │
│  ⭐ Lv.34  │  ┌── ALERTES ──────────────────────────────────────────┐  │
│  14200 XP  │  │ 🔴 3 deals stallés > 30j (47K€) │ 🟠 7 leads…     │  │
│            │  │ 🔴 Win rate 8% < seuil 10%       │ 🟠 Coverage…    │  │
│            │  └──────────────────────────────────────────────────────┘  │
│            │                                                             │
│            │  ┌── LEADERBOARD ────────┐  ┌── MISSIONS ───────────┐     │
│            │  │ 🥇 Guillaume  +340 XP │  │ 🎯 Contacter 3        │     │
│            │  │   ⭐ Lv.34  14200 XP  │  │   ██████░░░ 2/3       │     │
│            │  │ 🥈 Simon     +215 XP  │  │                       │     │
│            │  │   🛡️ Lv.19   4100 XP  │  │ 🔄 Avancer 1 deal    │     │
│            │  │ 🥉 Bruno     +120 XP  │  │   ████████ 1/1 ✅     │     │
│            │  │   ⚔️ Lv.8    1200 XP  │  │                       │     │
│            │  │                       │  │ 📝 Renseigner 2 montants│    │
│            │  │ [Voir tout →]         │  │   ░░░░░░░░ 0/2        │     │
│            │  └───────────────────────┘  └───────────────────────┘     │
│            │                                                             │
│            │  ┌── TIMELINE ──────────────────────────────────────────┐  │
│            │  │ 14:32 Guillaume closé "Kolsquare" +135 XP           │  │
│            │  │ 13:15 Simon avancé "Leeto" en Offre envoyée +15 XP  │  │
│            │  │ 11:45 Bruno contacté 4 prospects +20 XP             │  │
│            │  │ 09:30 ⚡ Badge "Blitz" débloqué par Simon           │  │
│            │  │ [Voir plus ↓]                                       │  │
│            │  └──────────────────────────────────────────────────────┘  │
│            │                                                             │
└────────────┴─────────────────────────────────────────────────────────────┘
```

### Composants détaillés

#### A. Score Global

| Propriété | Spécification |
|---|---|
| Taille | 120px × 120px cercle |
| Animation | Au chargement : compteur de 0 au score final (1.5s, ease-out) |
| Couleur cercle | 0-29: #EF4444 (rouge), 30-59: #F59E0B (orange), 60-79: #10B981 (vert), 80-100: #3B82F6 (bleu) |
| Rang texte | Affiché en dessous, même couleur que le cercle |
| Tendance | Flèche + chiffre vs période précédente (ex: "↑ +4 vs Q4 2025") |
| Tooltip hover | "Score calculé comme moyenne pondérée des 6 piliers. Lead Flow (15%), Pipeline (25%), Velocity (20%), Closing (25%), Revenue (10%), Data Quality (5% + plafond)." |

**Rangs d'équipe :**

| Plage | Rang | Emoji | Description courte |
|---|---|---|---|
| 0-20 | Mode Survie | 🔴 | Les fondamentaux ne sont pas en place |
| 21-40 | Vol à Vue | 🟠 | On avance mais sans visibilité |
| 41-60 | Instruments de Bord | 🟡 | Les bases sont là, à optimiser |
| 61-80 | Autopilote | 🟢 | Machine commerciale efficace |
| 81-100 | Revenue Machine | 💎 | Excellence opérationnelle |

#### B. Jauges (×6)

| Propriété | Spécification |
|---|---|
| Taille | 180px × 200px chacune (icône + cercle + texte) |
| Layout | Grille 3×2, gap 24px |
| Animation | Cercle se remplit de 0 au score (1.2s, staggered 0.1s entre chaque) |
| Hover | Léger scale(1.05), ombre plus prononcée, cursor pointer |
| Clic | Navigation vers la page détaillée du monde |
| Score texte | 32px bold, centré dans le cercle |
| Nom du pilier | 14px medium, sous le cercle |
| Tendance | Flèche 12px à droite du nom : ↑ vert, → gris, ↓ rouge |
| Couleur | Dégradé du bord du cercle selon le score (même palette que score global) |

**État "plafond actif" :** Si Data Quality < 50, les 5 autres jauges ont un cadenas 🔒 superposé en semi-transparent et le texte "(plafonné)" sous le score. La jauge Data Quality clignote doucement en rouge.

**État "données insuffisantes" :** Si < 10 deals pour calculer un pilier, afficher "—" au lieu du score, avec tooltip "Pas assez de données pour calculer ce score (minimum 10 deals)."

#### C. Bandeau d'alertes

| Propriété | Spécification |
|---|---|
| Position | Sous les jauges, largeur 100% |
| Hauteur | 80px fixe, scroll horizontal si > 3 alertes |
| Format alerte | Pastille couleur + icône + texte court (max 60 chars) |
| Clic | Ouvre un drawer latéral avec le détail de l'alerte |
| Animation | Slide-in de la gauche au chargement (0.3s) |
| Si aucune alerte | Bandeau vert : "✅ Aucune alerte active — Tout est sous contrôle" |

**Règle d'affichage :** Max 5 alertes visibles. Si > 5, bouton "Voir les X alertes →" qui mène au Centre d'Alertes.

**Priorité d'affichage :** Rouges d'abord (triées par montant en jeu décroissant), puis oranges, puis bleues.

#### D. Leaderboard Compact

| Propriété | Spécification |
|---|---|
| Position | Colonne gauche sous les alertes, 50% de la largeur |
| Contenu | Top 3 agents avec : rang, nom, niveau, XP saison, XP gagné cette semaine |
| Chaque carte | 60px de haut, avatar/initiales 40px, barre XP 4px |
| Clic sur un agent | Navigation vers son Profil Agent |
| "Voir tout" | Lien vers le Leaderboard complet |
| Sélecteur | Toggle discret : "Saison" / "All-time" |

**Si 1 seul agent :** Masquer le leaderboard, remplacer par un message "Ajoutez des agents dans les paramètres pour débloquer le classement."

#### E. Missions en cours

| Propriété | Spécification |
|---|---|
| Position | Colonne droite, à côté du leaderboard |
| Contenu | 3 missions actives les plus proches de complétion |
| Chaque mission | Icône + titre + barre de progression + récompense XP |
| Barre | Couleur : gris si 0%, bleu en progression, vert si complété |
| Animation complété | Confetti micro-animation + "✅ +XX XP" pendant 3s puis disparaît |
| "Toutes les missions" | Lien vers le Centre de Missions |

#### F. Timeline

| Propriété | Spécification |
|---|---|
| Position | Bas de page, largeur 100% |
| Contenu | Dernières 10 actions scorées (deals, contacts, badges) |
| Chaque entrée | Horodatage + nom agent + action + XP gagné |
| Filtre | Dropdown "Tous" / par agent |
| Scroll | Chargement infini (20 items par batch) |
| Refresh | Polling toutes les 60s pour les nouvelles entrées (avec animation slide-in) |

### États de la page

| État | Comportement |
|---|---|
| **Chargement initial** | Skeleton UI : 6 cercles gris pulsant, blocs gris pour leaderboard et missions. Durée max : 3s. |
| **Données chargées** | Animation d'entrée : score compte de 0 à X, jauges se remplissent, alertes slide-in. |
| **Refresh en cours** | Icône 🔄 tourne dans la topbar. Les scores ne disparaissent pas, ils se mettent à jour in-place. |
| **Erreur API** | Bandeau rouge en haut : "Impossible de charger les données. Dernière mise à jour : il y a 2h. [Réessayer]". Les dernières données en cache sont affichées avec un badge "Données datant de [heure]". |
| **Portail vide** | Message central : "Votre portail HubSpot ne contient pas assez de données pour calculer les scores. Ajoutez au moins 10 deals pour commencer." |

---

## 6.4 PAGES MONDE (×6) — Structure commune

Chaque monde suit une structure identique. Je détaille la structure commune puis les spécificités de chacun.

### Layout commun

```
┌─ SIDEBAR ─┬─ TOPBAR (breadcrumb: QG > [Nom du Monde]) ──────────────────┐
│            ├─────────────────────────────────────────────────────────────┤
│            │                                                             │
│            │  ┌── EN-TÊTE DU MONDE ──────────────────────────────────┐  │
│            │  │                                                      │  │
│            │  │  [Icône] [NOM DU MONDE]           Score: XX/100 [↑]  │  │
│            │  │  █████████████████████████░░░░░░░░░░░░               │  │
│            │  │                                                      │  │
│            │  └──────────────────────────────────────────────────────┘  │
│            │                                                             │
│            │  ┌── DÉCOMPOSITION ──────────────────────────────────────┐  │
│            │  │                                                      │  │
│            │  │  Sous-métrique 1    ████████████████░░  78/100       │  │
│            │  │  Sous-métrique 2    ██████████████████  95/100       │  │
│            │  │  Sous-métrique 3    ████████████░░░░░░  62/100       │  │
│            │  │  Sous-métrique 4    ██████████░░░░░░░░  55/100       │  │
│            │  │                                                      │  │
│            │  └──────────────────────────────────────────────────────┘  │
│            │                                                             │
│            │  ┌─ ONGLETS ────────────────────────────────────────────┐  │
│            │  │ [Graphiques] [Tableau] [Actions] [Comparatif]        │  │
│            │  ├──────────────────────────────────────────────────────┤  │
│            │  │                                                      │  │
│            │  │              (Contenu de l'onglet actif)             │  │
│            │  │              Hauteur variable, scrollable            │  │
│            │  │                                                      │  │
│            │  └──────────────────────────────────────────────────────┘  │
│            │                                                             │
└────────────┴─────────────────────────────────────────────────────────────┘
```

### En-tête du monde

| Propriété | Spécification |
|---|---|
| Icône | Emoji du monde, 48px |
| Nom | 28px bold |
| Score | 48px bold + couleur dynamique + flèche tendance |
| Barre | 100% largeur, 8px de haut, même couleur que le score |
| Tooltip score | Explication de la formule de scoring de ce pilier |

### Décomposition du score

| Propriété | Spécification |
|---|---|
| Chaque ligne | Nom de la sous-métrique + barre + score numérique |
| Barre | Proportionnelle, couleur selon le score individuel |
| Hover | Tooltip avec la valeur brute et le seuil (ex: "Speed to lead: 2h14 — Seuil vert: < 1h") |
| Clic | Scroll vers la section correspondante dans l'onglet Graphiques |

### Onglets

| Onglet | Contenu |
|---|---|
| **Graphiques** | 3-5 graphiques pertinents pour ce monde. Chaque graphique : titre, légende, tooltip au hover, bouton "Plein écran" |
| **Tableau** | Tableau de données brutes filtrable, triable, avec liens vers HubSpot. Pagination (20 items/page). Export CSV. |
| **Actions** | Liste numérotée d'actions prioritisées par impact. Chaque action : titre, description, impact estimé ("corrige ça → +5 pts sur ce pilier"), liens vers les éléments concernés dans HubSpot. |
| **Comparatif** | Deux colonnes : "Ce mois" vs "Mois dernier" (ou "Cet agent" vs "Moyenne équipe"). Chaque métrique avec flèche d'évolution et delta. |

### Filtre par agent

En haut de chaque page monde, un sélecteur dropdown : "Toute l'équipe" / "Guillaume" / "Simon" / "Bruno". Quand un agent est sélectionné, TOUS les graphiques, tableaux et scores se recalculent pour cet agent uniquement.

---

### 6.4.1 Monde Lead Flow 🌊 — Spécificités

**Sous-métriques de décomposition :**

| Sous-métrique | Poids | Source HubSpot | Calcul |
|---|---|---|---|
| Speed to Lead | 30% | `hs_time_to_first_engagement` (Contact) | Moyenne en secondes → score selon seuils |
| Leads non travaillés | 25% | `hs_is_unworked` (Contact) | Comptage = true → score inversé |
| Taux de conversion | 25% | `lifecyclestage` (Contact) | Ratio opportunity / lead × 100 |
| Volume de leads | 15% | `createdate` (Contact) | Comparaison vs période précédente |
| Diversification | 5% (bonus) | `hs_analytics_source` (Contact) | Concentration max par source |

**Graphiques (onglet) :**

1. **Volume de leads / semaine** (Line chart)
   - Axe X : 12 dernières semaines
   - Axe Y : Nombre de contacts créés
   - Source : `COUNT(Contact) WHERE createdate IN week GROUP BY week`
   - Ligne de tendance optionnelle
   - Tooltip : "Semaine du 4 mars : 23 leads"

2. **Répartition par source** (Donut chart)
   - Segments : ORGANIC_SEARCH, PAID_SEARCH, SOCIAL_MEDIA, REFERRALS, DIRECT_TRAFFIC, OFFLINE, EMAIL_MARKETING, OTHER_CAMPAIGNS, AI_REFERRALS
   - Source : `hs_analytics_source` sur Contact (période sélectionnée)
   - Couleurs fixes par source (vert pour organic, bleu pour paid, etc.)
   - Centre du donut : nombre total de leads

3. **Distribution Speed to Lead** (Horizontal bar chart)
   - Barres : < 30 min, 30min-1h, 1-4h, 4-24h, > 24h
   - Source : `hs_time_to_first_engagement` converti en tranches
   - Couleur : vert pour < 1h, orange pour 1-4h, rouge pour > 4h
   - Annotation : "Cible : < 1h pour 80%+ des leads"

4. **Funnel de conversion** (Funnel chart)
   - Étapes : Lead → MQL → SQL → Opportunity → Customer
   - Source : `lifecyclestage` sur Contact
   - Affichage : nombre + % de conversion entre chaque étape
   - Couleur : dégradé du clair au foncé

**Tableau (onglet) :**

Vue 1 — "Leads non travaillés" (par défaut si > 0 non travaillés) :

| Nom | Source | Créé le | Owner | Jours sans activité | Action |
|---|---|---|---|---|---|
| Antsa Ravison | REFERRALS | 16/03 | Guillaume | 0j | [→ HubSpot] |
| Joris LB | DIRECT | 13/03 | Guillaume | 3j | [→ HubSpot] |

- Filtrable par owner, par source, par date
- Triable par colonnes
- Export CSV

Vue 2 — "Leads récents" (toggle) : tous les leads créés dans la période, même colonnes + lifecycle stage actuel.

**Actions suggérées (onglet) :**

Format de chaque action :
```
┌──────────────────────────────────────────────────────────────┐
│ 🔴 PRIORITÉ 1 — Impact estimé : +8 pts Lead Flow            │
│                                                              │
│ Traiter les 7 leads non travaillés                           │
│                                                              │
│ 7 contacts avec hs_is_unworked = true n'ont reçu aucune     │
│ activité depuis leur création. Le plus ancien date de 5      │
│ jours.                                                       │
│                                                              │
│ Responsables :                                               │
│  - Guillaume (4 leads)                                       │
│  - Simon (2 leads)                                           │
│  - Non assigné (1 lead)                                      │
│                                                              │
│ [Voir la liste complète]  [Ouvrir dans HubSpot ↗]           │
└──────────────────────────────────────────────────────────────┘
```

Actions type pour Lead Flow :
1. Traiter les leads non travaillés (impact direct sur sous-score)
2. Améliorer le speed to lead (si > 4h en moyenne)
3. Diversifier les sources (si une source > 50%)
4. Investiguer la baisse de volume (si volume ↓ > 20%)
5. Optimiser la conversion Lead → Opportunity (si < 10%)

**Comparatif (onglet) :**

| Métrique | Ce mois | Mois dernier | Delta |
|---|---|---|---|
| Volume leads | 34 | 28 | ↑ +21% 🟢 |
| Speed to lead (moy.) | 2h14 | 3h45 | ↓ -40% 🟢 |
| Leads non travaillés | 7 | 12 | ↓ -42% 🟢 |
| Conversion L→O | 8.2% | 6.1% | ↑ +2.1pts 🟢 |
| Score Lead Flow | 72 | 65 | ↑ +7 🟢 |

Si filtre agent actif : colonne supplémentaire "Moyenne équipe" pour comparaison individuelle.

---

### 6.4.2 Monde Pipeline Health 🏗️ — Spécificités

**Sous-métriques :**

| Sous-métrique | Poids | Source | Calcul |
|---|---|---|---|
| Deals stallés | 30% | `hs_is_stalled` (Deal) | Ratio stallés / actifs |
| Pipeline coverage | 25% | `amount` (Deal) + objectif | Sum pipeline / objectif |
| Complétude des deals | 20% | `amount`, `closedate`, `hubspot_owner_id` (Deal) | % deals avec toutes les propriétés clés |
| Aging | 25% | `hs_v2_time_in_current_stage` (Deal) | % deals > 30j dans un stage |

**Graphiques :**

1. **Funnel pipeline** (Horizontal funnel)
   - Chaque stage = une barre avec : nombre de deals + montant total
   - Stages du pipeline Services : Discovery → Diagnostic → Proposition → Offre envoyée → Confirmation → Attente signature
   - Couleur : dégradé bleu, deals stallés en rouge dans chaque barre
   - Hover : tooltip avec détail (nb deals, montant, nb stallés, durée moyenne)

2. **Pipeline par owner** (Stacked bar chart)
   - Axe X : Chaque owner
   - Axe Y : Nombre de deals (ou montant, toggle)
   - Segments : un par stage, couleur différente
   - Permet de voir : qui a quoi, à quel stage

3. **Scatter : Montant vs Aging** (Scatter plot)
   - Axe X : `hs_v2_time_in_current_stage` (jours)
   - Axe Y : `amount` (€)
   - Taille du point : proportionnelle au montant
   - Couleur : rouge si `hs_is_stalled = true`, bleu sinon
   - Quadrant haut-droite = danger (gros deals qui stagnent)
   - Label au hover : nom du deal

4. **Évolution pipeline value** (Area chart)
   - 12 semaines, montant total du pipeline ouvert
   - Zone sous la courbe colorée selon la couverture (vert > 3x, orange 2-3x, rouge < 2x)
   - Ligne horizontale pointillée = objectif

**Tableau :**

| Deal | Stage | Montant | Owner | Jours dans stage | Stallé | Close date | |
|---|---|---|---|---|---|---|---|
| Finalcad Renouv. | Proposition | 32 000€ | Guillaume | 34j ⚠️ | 🔴 Oui | 15/04/26 | [↗] |
| Leeto Onboarding | Offre envoyée | 15 000€ | Simon | 3j | Non | 28/03/26 | [↗] |
| NewCo Discovery | Discovery | 8 000€ | Bruno | 22j | 🟠 | 30/04/26 | [↗] |
| — | Diagnostic | — | Guillaume | — | — | — | [↗] |

- Couleur de fond : rouge si stallé, orange si > 20j, blanc sinon
- Deals sans montant : cellule vide en jaune clignotant "À remplir"
- Deals sans close date : idem
- Filtres : par stage, par owner, par stallé (oui/non), par montant (range)
- Tri : par défaut par "jours dans stage" décroissant (les plus en danger d'abord)

**Actions spécifiques Pipeline :**
1. "Débloquer les X deals stallés" (liste + liens)
2. "Renseigner le montant sur X deals" (impact data quality + pipeline coverage)
3. "Pipeline coverage à Xx — besoin de Y€ supplémentaires pour atteindre la cible 3x"
4. "Goulot au stage Z — X deals y sont depuis > 14j en moyenne"

---

### 6.4.3 Monde Velocity 🚀 — Spécificités

**Sous-métriques :**

| Sous-métrique | Poids | Source | Calcul |
|---|---|---|---|
| Days to close | 45% | `days_to_close` (Deal won) | Moyenne sur deals closés (90j) |
| Goulot d'étranglement | 40% | `hs_v2_cumulative_time_in_*` | Max durée moyenne par stage |
| Tendance | 15% | `days_to_close` | Ce mois vs précédent |

**Graphiques :**

1. **Durée moyenne par stage** (Horizontal bar)
   - Chaque barre = un stage du pipeline
   - Longueur = durée moyenne en jours (`hs_v2_cumulative_time_in_[stage_id]` moyenné sur tous les deals passés par ce stage)
   - La barre la plus longue = rouge (goulot), les autres = bleu
   - Annotation sur le goulot : "⚠️ Goulot — 2.3x plus long que la moyenne des autres stages"

2. **Évolution Days to Close** (Line chart)
   - 12 mois, 1 point/mois = moyenne `days_to_close` des deals closés ce mois
   - Ligne de tendance (régression linéaire)
   - Zone colorée : vert < 30j, orange 30-60j, rouge > 60j
   - Annotation si tendance s'améliore ou se dégrade

3. **Distribution DTC par owner** (Box plot)
   - Chaque owner = un box plot (min, Q1, médiane, Q3, max)
   - Permet de comparer qui close vite vs lentement
   - Si 1 seul owner : remplacer par un histogramme de distribution

4. **Heatmap Stage × Owner** (Heatmap)
   - Lignes : stages
   - Colonnes : owners
   - Couleur cellule : durée moyenne dans ce stage pour cet owner (vert = rapide, rouge = lent)
   - Permet d'identifier : "Simon est lent au stage Diagnostic, mais rapide au Closing"

---

### 6.4.4 Monde Closing Power 🎯 — Spécificités

**Sous-métriques :**

| Sous-métrique | Poids | Source | Calcul |
|---|---|---|---|
| Win rate | 45% | `hs_is_closed_won` / total closed | Ratio sur la période |
| Raisons de perte documentées | 25% | `closed_lost_reason` | % non vide sur closed lost |
| Conversion Proposition → Won | 30% | `dealstage` historique | Ratio deals ayant atteint Proposition qui finissent Won |

**Graphiques :**

1. **KPI Cards** (4 cards en haut)
   - Win Rate global : XX% (gros chiffre, couleur selon seuil)
   - Deals won ce mois : X (compteur)
   - Montant moyen won : X€
   - Nombre deals dans "zone de closing" (Confirmation + Attente signature)

2. **Win rate par owner** (Bar chart)
   - Chaque barre = un owner
   - Valeur = win rate personnel
   - Ligne horizontale = win rate équipe + benchmark secteur (20%)
   - Annotation sur les écarts significatifs

3. **Funnel de conversion inter-stages** (Funnel)
   - Discovery → Diagnostic : X%
   - Diagnostic → Proposition : X%
   - Proposition → Offre envoyée : X%
   - Offre envoyée → Confirmation : X%
   - Confirmation → Attente signature : X%
   - Attente signature → Won : X%
   - Mise en évidence du "stage de décrochage" (plus grosse chute)

4. **Raisons de perte** (Horizontal bar, trié décroissant)
   - Chaque barre = une valeur de `closed_lost_reason`
   - Longueur = nombre d'occurrences
   - % affiché
   - Barre rouge pour la première raison

5. **Évolution win rate** (Line chart, 12 mois)
   - Ligne bleue = win rate mensuel
   - Zone de confiance si peu de deals (intervalle)
   - Ligne pointillée = benchmark 20%

---

### 6.4.5 Monde Revenue Health 💰 — Spécificités

**Sous-métriques :**

| Sous-métrique | Poids | Source | Calcul |
|---|---|---|---|
| Atteinte objectif | 50% | `amount` + `closedate` (won) | Revenue closé / objectif (prorata temporel) |
| Concentration client | 25% | `total_revenue` (Company) | % top 3 clients / total |
| Mix new/existing | 25% | `dealtype` (Deal won) | % new business dans le revenue |

**Graphiques :**

1. **Jauge objectif** (Gauge chart)
   - Revenue closé ce trimestre vs objectif
   - Prorata temporel : si mi-trimestre, la ligne "on track" est à 50% de l'objectif
   - Vert si on track, orange si en retard < 20%, rouge si en retard > 20%
   - Projection : "Au rythme actuel, vous atteindrez X€ d'ici fin Q1"

2. **Revenue par mois** (Stacked bar, 12 mois)
   - Segments : New Business (bleu) + Existing Business (vert)
   - Source : `amount` on closed won, `closedate` pour le mois, `dealtype` pour le split
   - Ligne de tendance

3. **Top 10 comptes** (Horizontal bar)
   - Source : `total_revenue` sur Company, top 10
   - Affichage : nom du compte + montant
   - Si top 1 > 30% : barre en orange avec annotation "Concentration risquée"

4. **Concentration** (Donut)
   - Top 3, Top 5, Top 10, Reste
   - Centre : nombre total de comptes avec revenue > 0
   - Alerte visuelle si top 3 > 40%

---

### 6.4.6 Monde Data Quality 🧹 — Spécificités

**Sous-métriques :**

| Sous-métrique | Poids | Source | Vérifie |
|---|---|---|---|
| Montants renseignés | 20% | `amount` (Deal ouvert) | Non null et > 0 |
| Close dates renseignées | 15% | `closedate` (Deal ouvert) | Non null |
| Owners assignés | 15% | `hubspot_owner_id` (Deal) | Non null |
| Raisons de perte | 20% | `closed_lost_reason` (Deal lost) | Non null |
| Lifecycle stages | 15% | `lifecyclestage` (Contact) | Non null et non vide |
| Fraîcheur activité | 15% | `notes_last_contacted` (Deal ouvert) | < 14 jours |

**Élément unique à Data Quality : Simulateur d'impact**

```
┌──────────────────────────────────────────────────────────────┐
│ 🎯 SIMULATEUR D'IMPACT                                       │
│                                                              │
│ "Si vous corrigez les données manquantes, voici l'impact :"  │
│                                                              │
│ ┌─────────────────┬──────────┬──────────┬────────────────┐  │
│ │ Action          │ Actuel   │ Après    │ Impact score   │  │
│ ├─────────────────┼──────────┼──────────┼────────────────┤  │
│ │ Remplir montants│ 77%      │ 100%     │ +6 pts DQ      │  │
│ │ (37 deals)      │          │          │ +3 pts Pipeline │  │
│ ├─────────────────┼──────────┼──────────┼────────────────┤  │
│ │ Raisons perte   │ 66%      │ 100%     │ +8 pts DQ      │  │
│ │ (23 deals)      │          │          │ +4 pts Closing  │  │
│ ├─────────────────┼──────────┼──────────┼────────────────┤  │
│ │ Lifecycle stages│ 71%      │ 100%     │ +4 pts DQ      │  │
│ │ (145 contacts)  │          │          │ +2 pts Lead     │  │
│ ├─────────────────┼──────────┼──────────┼────────────────┤  │
│ │ TOTAL           │ DQ: 55   │ DQ: 79   │ Score global:  │  │
│ │                 │          │          │ 52 → 64 (+12)  │  │
│ └─────────────────┴──────────┴──────────┴────────────────┘  │
│                                                              │
│ 📊 Si DQ passe à 79, le plafond sera largement levé et      │
│    tous les piliers afficheront leur vrai score.             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Ce simulateur est un élément différenciant majeur : il montre concrètement ROI du nettoyage de données.

---

(Suite dans les sections suivantes — Profil Agent, Leaderboard, Missions, Alertes, Settings, Rapport Hebdo identiques au détail précédent, avec en plus les états, edge cases et interactions.)

---

# 7. SYSTÈME DE GAMIFICATION

## 7.1 Philosophie

La gamification ne sert pas à fliquer. Elle sert à :
1. **Rendre visible** l'effort invisible (remplir un CRM n'a jamais de feedback positif)
2. **Créer un sentiment de progression** (les commerciaux voient leur niveau monter)
3. **Orienter les comportements** (les missions guident vers les bonnes pratiques)
4. **Renforcer la cohésion** (le leaderboard et les badges créent de la conversation)

**Règle d'or :** On ne punit jamais. On récompense les bonnes pratiques. Un commercial qui ne remplit pas le CRM ne perd pas de points — il n'en gagne simplement pas.

**Exception :** L'XP decay (décroissance lente de l'XP saisonnier en cas d'inactivité prolongée) est la seule mécanique "négative" — elle empêche quelqu'un de rester #1 sans rien faire.

## 7.2 Système d'XP

### Sources d'XP — Tableau exhaustif

| Action | Détection (champ HubSpot) | XP | Fréquence max |
|---|---|---|---|
| Deal créé | `createdate` (Deal) nouveau | +10 | Illimité |
| Deal avancé d'un stage | `hs_v2_date_entered_[stage]` change | +15 / stage | 1 par deal par jour |
| Deal closed won | `hs_is_closed_won` passe à true | +50 | Illimité |
| Bonus montant (won) | `amount` du deal closé | +1 / 100€ | Plafonné à +500 XP |
| Deal closed lost AVEC raison | `hs_is_closed_lost` + `closed_lost_reason` non vide | +5 | Illimité |
| Deal closé en < 30j | `days_to_close < 30` | +25 bonus | 1 par deal |
| Deal closé en < 15j | `days_to_close < 15` | +50 bonus (remplace le +25) | 1 par deal |
| Contact engagé | `notes_last_contacted` mis à jour | +5 | Max 10/jour |
| Lead converti en Opportunity | `lifecyclestage` → opportunity | +15 | Illimité |
| Speed to lead < 1h | `hs_time_to_first_engagement < 3600` | +10 | 1 par contact |
| Montant renseigné (correction) | `amount` passe de null à une valeur | +5 | 1 par deal |
| Semaine sans deal stallé | 0 `hs_is_stalled=true` pour cet owner pendant 7j | +30 | 1/semaine |
| Semaine sans lead non travaillé | 0 `hs_is_unworked=true` pour cet owner pendant 7j | +20 | 1/semaine |
| Mission quotidienne complétée | Logique interne | +15 à +25 | Max 4/jour |
| Mission hebdomadaire complétée | Logique interne | +30 à +75 | Max 5/semaine |
| Mission spéciale complétée | Logique interne | +100 à +200 | Événementiel |
| Badge débloqué | Logique interne | +50 | 1 par badge |

### XP Decay (décroissance)

- **Portée :** Uniquement l'XP saisonnier (pas le lifetime)
- **Déclencheur :** Aucune mise à jour de `notes_last_contacted` pendant 7 jours consécutifs pour cet owner
- **Taux :** -2% de l'XP saisonnier par semaine d'inactivité
- **Plafond de perte :** L'XP saisonnier ne peut pas descendre en dessous de 50% de son maximum atteint
- **Notification :** "⚠️ Votre XP saisonnier décroît par inactivité. Contactez un prospect pour stopper la décroissance."
- **Objectif :** Empêcher un commercial de rester #1 du leaderboard sans activité récente

### Saisons

- **Durée :** 1 trimestre (Q1 jan-mars, Q2 avr-juin, Q3 jul-sep, Q4 oct-déc)
- **Reset :** Le classement saisonnier repart à 0 au début de chaque trimestre
- **XP lifetime :** N'est JAMAIS réinitialisé. Sert au rang/niveau permanent.
- **Récompenses fin de saison :**
  - #1 : Badge "MVP Saison [QX]" (unique, doré)
  - #2-3 : Badge "Top Performer [QX]" (argent)
  - Tout agent avec > 1000 XP saisonnier : Badge "Contributeur [QX]"
- **Hall of Fame :** Section dans le Leaderboard avec les MVP de chaque saison passée

## 7.3 Niveaux & Rangs

### Table de progression complète

| Niveau | XP cumulé requis | XP pour ce niveau | Rang | Titre |
|---|---|---|---|---|
| 1 | 0 | 0 | Recrue | Recrue |
| 2 | 50 | 50 | Recrue | Recrue II |
| 3 | 120 | 70 | Recrue | Recrue III |
| 4 | 210 | 90 | Recrue | Recrue IV |
| 5 | 320 | 110 | Recrue | Recrue V |
| 6 | 500 | 180 | Caporal | Caporal |
| 7 | 700 | 200 | Caporal | Caporal II |
| 8 | 920 | 220 | Caporal | Caporal III |
| 9 | 1 160 | 240 | Caporal | Caporal IV |
| 10 | 1 500 | 340 | Caporal | Caporal V |
| 11 | 1 700 | 200 | Caporal | Caporal VI |
| 12 | 1 500 | — | Caporal | Caporal VII |
| 13 | 2 000 | 500 | Sergent | Sergent |
| ... | ... | ... | ... | ... |
| 20 | 4 000 | — | Sergent | Sergent VIII |
| 21 | 4 500 | 500 | Lieutenant | Lieutenant |
| ... | ... | ... | ... | ... |
| 30 | 9 000 | — | Lieutenant | Lieutenant X |
| 31 | 10 000 | 1 000 | Capitaine | Capitaine |
| ... | ... | ... | ... | ... |
| 40 | 18 000 | — | Capitaine | Capitaine X |
| 41 | 20 000 | 2 000 | Commandant | Commandant |
| ... | ... | ... | ... | ... |
| 48 | 30 000 | — | Commandant | Commandant VIII |
| 49 | 35 000 | 5 000 | Général | Général |
| 50 | 42 000 | 7 000 | Général | Général Suprême |

**Courbe :** Progression logarithmique. Les premiers niveaux sont rapides (gratification immédiate), les derniers sont longs (sentiment d'accomplissement). Un commercial actif devrait atteindre Caporal (Lv.6) en ~2 semaines et Sergent (Lv.13) en ~2 mois.

**Animation level-up :** Full-screen overlay pendant 3 secondes avec le nouveau rang, titre, et confettis. Son optionnel (désactivable).

## 7.4 Badges — Catalogue Complet

### Badges Lead Flow (6)

| Badge | Nom | Condition | XP bonus | Rareté |
|---|---|---|---|---|
| ⚡ | Speed Demon | Avg `hs_time_to_first_engagement` < 30 min sur 30 jours (min 10 leads) | +50 | Peu commun |
| ⚡⚡ | Speed Demon II | Avg < 15 min sur 30 jours (min 15 leads) | +75 | Rare |
| 🎯 | Zéro Gaspillage | 0 `hs_is_unworked=true` pendant 14 jours consécutifs | +50 | Commun |
| 🌐 | Multi-Canal | Leads de ≥ 4 sources différentes dans le mois | +50 | Commun |
| 🔥 | Machine à Leads | > 20 leads créés ce mois (top performer volume) | +75 | Peu commun |
| 🎓 | Convertisseur | Taux conversion Lead→Opp > 25% sur 30j (min 10 leads) | +75 | Rare |

### Badges Pipeline (6)

| Badge | Nom | Condition | XP | Rareté |
|---|---|---|---|---|
| 🏰 | Pipeline Blindé | 0 deal stallé pendant 14 jours consécutifs | +50 | Peu commun |
| 💰 | Tout Chiffré | 100% deals perso ont amount renseigné pendant 30j | +50 | Commun |
| ⚖️ | Équilibriste | Distribution des deals sur ≥ 4 stages simultanément | +50 | Peu commun |
| 📊 | Pipeline 3x | Pipeline coverage personnel > 3x l'objectif | +75 | Rare |
| 🧱 | Bâtisseur | > 10 deals actifs simultanés | +50 | Commun |
| 🏗️ | Architecte | > 200K€ de pipeline personnel | +100 | Épique |

### Badges Velocity (5)

| Badge | Nom | Condition | XP | Rareté |
|---|---|---|---|---|
| 🏎️ | Blitz | 1 deal closé en < 15 jours | +75 | Rare |
| 🏎️🏎️ | Double Blitz | 2 deals closés en < 15j dans le même mois | +100 | Épique |
| 📉 | Anti-Bottleneck | Aucun deal perso > 14j dans un même stage pendant 30j | +50 | Peu commun |
| 🔄 | Momentum | ≥ 1 changement de stage par deal actif par semaine, pendant 4 semaines | +75 | Rare |
| ⏩ | Accélérateur | `days_to_close` moyen en baisse de > 20% vs trimestre précédent | +100 | Épique |

### Badges Closing (6)

| Badge | Nom | Condition | XP | Rareté |
|---|---|---|---|---|
| 🏆 | Sniper | Win rate > 40% sur 30j (min 5 deals closed) | +100 | Épique |
| 📝 | Feedback Loop | 100% closed lost avec raison renseignée pendant 30j | +50 | Commun |
| 💎 | Gros Gibier | Deal closé > 20 000€ | +75 | Rare |
| 💎💎 | Méga Gibier | Deal closé > 50 000€ | +150 | Légendaire |
| 🔥 | Série de 3 | 3 deals closés won en 7 jours | +100 | Épique |
| 🎯 | Précision | Win rate > 30% sur 90j (min 15 deals closed) | +75 | Rare |

### Badges Revenue (4)

| Badge | Nom | Condition | XP | Rareté |
|---|---|---|---|---|
| 👑 | Revenue King | #1 revenue closé du trimestre | +150 | Légendaire |
| 🔁 | Upsell Master | > 50% du revenue perso vient d'existing business (min 5 deals) | +75 | Rare |
| 🌱 | Chasseur | > 5 new business closés dans le mois | +100 | Épique |
| 💵 | 100K Club | > 100K€ closés dans le trimestre | +200 | Légendaire |

### Badges Data Quality (4)

| Badge | Nom | Condition | XP | Rareté |
|---|---|---|---|---|
| 🧼 | Data Clean | Score data perso > 90 pendant 30 jours | +50 | Peu commun |
| ⭐ | 5 Étoiles | 100% des deals perso parfaitement remplis pendant 14j | +75 | Rare |
| 🔍 | Détective | A corrigé > 20 fiches manquantes en 7 jours | +50 | Commun |
| 🏥 | Chirurgien | A porté le score data de < 50 à > 70 en 30j | +100 | Épique |

### Badges Spéciaux / Saisonniers (5)

| Badge | Nom | Condition | XP | Rareté |
|---|---|---|---|---|
| 🏅 | MVP Saison | #1 du classement saisonnier | +200 | Légendaire |
| 🥈 | Top Performer | #2 ou #3 du classement saisonnier | +100 | Épique |
| 🎖️ | Progression Fulgurante | +5 niveaux en 30 jours | +100 | Rare |
| 🛡️ | Régulier | Activité chaque jour ouvré pendant 30 jours | +100 | Épique |
| 🌟 | Polyvalent | Score > 50 dans les 6 mondes simultanément | +150 | Légendaire |

**Niveaux de rareté :**
- Commun : ~40% des agents l'obtiennent → bordure grise
- Peu commun : ~25% → bordure verte
- Rare : ~10% → bordure bleue
- Épique : ~5% → bordure violette, animation shimmer
- Légendaire : ~1% → bordure dorée, animation glow

## 7.5 Missions — Catalogue Complet

### Missions Quotidiennes (pool de 8, 4 assignées/jour au hasard)

| Mission | Objectif | XP | Détection |
|---|---|---|---|
| Contact du jour | Contacter ≥ 3 prospects | +15 | `notes_last_contacted` mis à jour |
| Avancement | Faire avancer ≥ 1 deal de stage | +20 | `hs_v2_date_entered_*` change |
| Documentation | Renseigner le montant sur ≥ 2 deals | +10 | `amount` passe de null à valeur |
| Réactivité | Répondre à 1 nouveau lead en < 2h | +15 | `hs_time_to_first_engagement < 7200` |
| Nettoyage | Mettre à jour 3 fiches deal (notes, montant, date) | +10 | Changement détecté sur deal |
| Prospection | Créer ≥ 2 nouveaux deals | +15 | `createdate` sur Deal |
| Suivi | Mettre à jour les notes sur 2 deals actifs | +10 | `notes_last_contacted` sur Deal |
| Closing push | Envoyer ≥ 1 deal en "Offre envoyée" ou plus loin | +25 | Stage ≥ Offre envoyée |

### Missions Hebdomadaires (pool de 6, 3 assignées/semaine)

| Mission | Objectif | XP | Détection |
|---|---|---|---|
| Zéro Lead Perdu | 0 lead unworked en fin de semaine | +50 | `hs_is_unworked` samedi minuit |
| Closer | ≥ 1 deal won | +75 | `hs_is_closed_won = true` |
| Pipeline Clean | 0 deal stallé perso en fin de semaine | +40 | `hs_is_stalled` samedi minuit |
| Feedback | Raison renseignée sur 100% des closed lost de la semaine | +30 | `closed_lost_reason` non vide |
| Activité continue | Au moins 1 action scorée chaque jour ouvré (5/5) | +35 | Détection activité quotidienne |
| Full Pipeline | ≥ 5 deals actifs en simultané | +30 | Comptage deals ouverts |

### Missions Spéciales (événementielles, déclenchées par l'admin ou automatiquement)

| Mission | Durée | Objectif | XP | Badge associé |
|---|---|---|---|---|
| Sprint Fin de Mois | 5 derniers jours du mois | Closer ≥ 3 deals | +200 | "Sprint Master" |
| Opération Nettoyage | 7 jours | Corriger ≥ 30 fiches data | +100 | "Détective" |
| Challenge Velocity | 14 jours | Closer 1 deal en < 20 jours | +150 | "Lightning" |
| Objectif Revenue | Tout le mois | Atteindre X€ closé | +250 | Variable |
| Battle Royale | 7 jours | Top 1 XP gagné cette semaine | +300 | "Champion" |

---

# 8. MOTEUR DE SCORING

(Formules mathématiques complètes détaillées dans la section précédente v1 — conservées et intégrées telles quelles.)

**Ajout important — Gestion des cas limites :**

| Situation | Comportement |
|---|---|
| < 5 deals pour calculer un ratio | Afficher "N/A" + tooltip "Minimum 5 deals requis" |
| 0 deal closed (won ou lost) | Closing Power = N/A, exclu du score global (poids redistribué) |
| 0 contact récent | Lead Flow = N/A, exclu du score global |
| Objectif non renseigné | Coverage = basée sur benchmark (3x le revenue moyen des 2 derniers trimestres) |
| Multi-devises | Conversion en devise principale au taux du jour du deal |
| Deals sans montant | Exclus du calcul de pipeline value MAIS comptés comme pénalité Data Quality |

---

# 9. MOTEUR D'ALERTES

## Règles d'alertes

| ID | Niveau | Condition | Message | Cooldown |
|---|---|---|---|---|
| A01 | 🔴 | `hs_is_stalled = true` ET `amount > 10000` ET `hs_v2_time_in_current_stage > 14j` | "Deal [nom] stallé depuis [X]j — [montant]€ en jeu" | 1 par deal, re-déclenche si +7j |
| A02 | 🔴 | Win rate < 10% sur 30j (min 10 deals closed) | "Win rate à [X]% — seuil critique" | 1/semaine |
| A03 | 🔴 | Data Quality < 50 | "Data Quality à [X] — plafond activé" | 1/jour tant que < 50 |
| A04 | 🔴 | 0 deal créé depuis 10 jours (équipe) | "Aucun nouveau deal depuis 10 jours" | 1/semaine |
| A05 | 🟠 | `hs_is_unworked = true` sur > 5 contacts | "[X] leads non travaillés" | 1/jour |
| A06 | 🟠 | Pipeline coverage < 2x objectif | "Pipeline coverage à [X]x" | 1/semaine |
| A07 | 🟠 | 1 deal avec `hs_v2_time_in_current_stage > 21j` | "Deal [nom] en [stage] depuis [X]j" | 1 par deal, re-déclenche si +7j |
| A08 | 🟠 | > 20% deals sans montant | "[X]% de deals sans montant" | 1/semaine |
| A09 | 🟠 | Top client > 30% du revenue total | "Concentration : [client] = [X]% du revenue" | 1/mois |
| A10 | 🟠 | `days_to_close` moyen en hausse > 20% vs mois dernier | "Velocity en baisse : +[X]% de temps pour closer" | 1/semaine |
| A11 | 🔵 | Nouveau badge débloqué | "[Agent] a débloqué [Badge]" | Temps réel |
| A12 | 🔵 | Score pilier en hausse > 10 pts en 7j | "[Pilier] en hausse : +[X] pts" | 1/semaine par pilier |
| A13 | 🔵 | Niveau up | "[Agent] est passé niveau [X] — [Rang]" | Temps réel |
| A14 | 🔵 | Deal won | "[Agent] a closé [deal] — [montant]€" | Temps réel |

## Lifecycle d'une alerte

```
ACTIVE → [Condition résolue] → RÉSOLUE → [Archivée après 7j]
ACTIVE → [Utilisateur clique "Ignorer"] → IGNORÉE → [Réapparaît si re-déclenchée]
```

---

# 10. MODÈLE DE DONNÉES

## Schéma base de données (PostgreSQL)

```sql
-- Organisation / Tenant
CREATE TABLE organizations (
  id UUID PRIMARY KEY,
  hubspot_portal_id BIGINT UNIQUE NOT NULL,
  name VARCHAR(255),
  currency VARCHAR(3) DEFAULT 'EUR',
  timezone VARCHAR(50) DEFAULT 'Europe/Paris',
  created_at TIMESTAMP DEFAULT NOW(),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  subscription_status VARCHAR(50) DEFAULT 'active'
);

-- Configuration
CREATE TABLE org_config (
  org_id UUID REFERENCES organizations(id),
  primary_pipeline_id VARCHAR(50) NOT NULL,
  secondary_pipeline_ids TEXT[], -- array
  revenue_target_quarterly DECIMAL(12,2),
  pipeline_coverage_target DECIMAL(3,1) DEFAULT 3.0,
  winrate_target DECIMAL(5,2) DEFAULT 20.0,
  refresh_interval_minutes INT DEFAULT 15,
  gamification_enabled BOOLEAN DEFAULT TRUE,
  leaderboard_enabled BOOLEAN DEFAULT TRUE,
  pillar_weights JSONB DEFAULT '{"lead_flow":15,"pipeline":25,"velocity":20,"closing":25,"revenue":10,"data_quality":5}',
  alert_thresholds JSONB,
  PRIMARY KEY (org_id)
);

-- Agents (mappés aux owners HubSpot)
CREATE TABLE agents (
  id UUID PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  hubspot_owner_id BIGINT NOT NULL,
  name VARCHAR(255),
  email VARCHAR(255),
  role VARCHAR(50) DEFAULT 'agent', -- agent, commander, strategist
  is_tracked BOOLEAN DEFAULT TRUE,
  level INT DEFAULT 1,
  xp_lifetime BIGINT DEFAULT 0,
  xp_seasonal BIGINT DEFAULT 0,
  current_rank VARCHAR(50) DEFAULT 'recrue',
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP,
  UNIQUE(org_id, hubspot_owner_id)
);

-- Scores (snapshot périodique)
CREATE TABLE score_snapshots (
  id UUID PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  agent_id UUID REFERENCES agents(id), -- NULL = score équipe
  snapshot_date DATE NOT NULL,
  score_global DECIMAL(5,2),
  score_lead_flow DECIMAL(5,2),
  score_pipeline DECIMAL(5,2),
  score_velocity DECIMAL(5,2),
  score_closing DECIMAL(5,2),
  score_revenue DECIMAL(5,2),
  score_data_quality DECIMAL(5,2),
  data_quality_cap_active BOOLEAN DEFAULT FALSE,
  raw_data JSONB, -- toutes les métriques brutes pour audit
  created_at TIMESTAMP DEFAULT NOW()
);
-- Index: (org_id, snapshot_date), (agent_id, snapshot_date)

-- Badges
CREATE TABLE badge_definitions (
  id VARCHAR(50) PRIMARY KEY, -- 'speed_demon', 'pipeline_blinde'...
  name VARCHAR(100),
  description TEXT,
  icon VARCHAR(10),
  category VARCHAR(50), -- lead_flow, pipeline, velocity, closing, revenue, data_quality, special
  condition_description TEXT,
  xp_reward INT,
  rarity VARCHAR(20) -- common, uncommon, rare, epic, legendary
);

CREATE TABLE agent_badges (
  id UUID PRIMARY KEY,
  agent_id UUID REFERENCES agents(id),
  badge_id VARCHAR(50) REFERENCES badge_definitions(id),
  earned_at TIMESTAMP DEFAULT NOW(),
  season VARCHAR(10), -- 'Q1_2026'
  UNIQUE(agent_id, badge_id, season) -- peut regagner le même badge chaque saison
);

-- XP Log (audit trail)
CREATE TABLE xp_log (
  id UUID PRIMARY KEY,
  agent_id UUID REFERENCES agents(id),
  xp_amount INT NOT NULL,
  source VARCHAR(50), -- deal_created, deal_won, contact_engaged, mission_completed, badge_earned...
  source_id VARCHAR(100), -- hubspot deal/contact ID
  description TEXT,
  season VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW()
);
-- Index: (agent_id, created_at), (agent_id, season)

-- Missions
CREATE TABLE mission_definitions (
  id VARCHAR(50) PRIMARY KEY,
  type VARCHAR(20), -- daily, weekly, special
  name VARCHAR(200),
  description TEXT,
  objective_type VARCHAR(50), -- count_contacts, count_deals_advanced, etc.
  objective_target INT,
  xp_reward INT,
  detection_logic JSONB, -- champs HubSpot à surveiller
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE agent_missions (
  id UUID PRIMARY KEY,
  agent_id UUID REFERENCES agents(id),
  mission_id VARCHAR(50) REFERENCES mission_definitions(id),
  assigned_date DATE,
  status VARCHAR(20) DEFAULT 'active', -- active, completed, expired
  progress INT DEFAULT 0,
  completed_at TIMESTAMP,
  xp_earned INT DEFAULT 0
);
-- Index: (agent_id, assigned_date, status)

-- Alertes
CREATE TABLE alerts (
  id UUID PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  alert_rule_id VARCHAR(10), -- A01, A02...
  severity VARCHAR(10), -- critical, warning, info
  title VARCHAR(300),
  description TEXT,
  related_object_type VARCHAR(50), -- deal, contact, metric
  related_object_id VARCHAR(100),
  status VARCHAR(20) DEFAULT 'active', -- active, resolved, ignored
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  ignored_by UUID REFERENCES agents(id)
);

-- Rapport Hebdo
CREATE TABLE weekly_reports (
  id UUID PRIMARY KEY,
  org_id UUID REFERENCES organizations(id),
  week_start DATE,
  week_end DATE,
  report_data JSONB, -- contenu complet du rapport
  sent_at TIMESTAMP,
  recipients TEXT[]
);

-- Saisons
CREATE TABLE seasons (
  id VARCHAR(10) PRIMARY KEY, -- 'Q1_2026'
  org_id UUID REFERENCES organizations(id),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active', -- active, completed
  mvp_agent_id UUID REFERENCES agents(id),
  final_leaderboard JSONB
);

-- Cache HubSpot (pour éviter les appels API redondants)
CREATE TABLE hubspot_cache (
  org_id UUID REFERENCES organizations(id),
  object_type VARCHAR(50), -- deals, contacts, companies
  data JSONB,
  fetched_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (org_id, object_type)
);
```

---

# 11. ARCHITECTURE TECHNIQUE

```
┌─────────────────────────────────────────────────────────┐
│                    UTILISATEUR                           │
│                   (Navigateur)                           │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                              │
│              React + TypeScript + Tailwind               │
│              Framer Motion (animations)                  │
│              Recharts (graphiques)                       │
│              Hébergé sur Vercel                          │
└────────────────────────┬────────────────────────────────┘
                         │ REST API / WebSocket
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    BACKEND API                           │
│              Node.js (Express) ou FastAPI                │
│              Auth middleware (JWT)                       │
│              Rate limiting                               │
│              Hébergé sur Railway / Render                │
├─────────────────────────────────────────────────────────┤
│  Routes:                                                │
│  POST /auth/hubspot/callback                            │
│  GET  /api/dashboard                                    │
│  GET  /api/worlds/:worldId                              │
│  GET  /api/agents/:agentId                              │
│  GET  /api/leaderboard?period=seasonal|alltime          │
│  GET  /api/missions?agentId=X                           │
│  GET  /api/alerts?severity=critical|warning|info        │
│  GET  /api/history?period=12w|6m|12m                    │
│  GET  /api/report/weekly?week=2026-W11                  │
│  PUT  /api/settings                                     │
│  POST /api/refresh                                      │
└───────┬──────────────────────────┬──────────────────────┘
        │                          │
        ▼                          ▼
┌───────────────┐    ┌─────────────────────────────────┐
│  PostgreSQL   │    │        WORKER (Background)       │
│  (Neon / RDS) │    │  Bull Queue (Node) ou Celery     │
│               │    │                                   │
│  - scores     │    │  Jobs:                            │
│  - agents     │    │  - hubspot_sync (toutes les 15m) │
│  - badges     │    │  - score_calculation (après sync)│
│  - xp_log     │    │  - alert_evaluation (après calc) │
│  - missions   │    │  - xp_computation (après sync)   │
│  - alerts     │    │  - mission_check (toutes les 1h) │
│  - config     │    │  - weekly_report (lundi 8h)      │
│  - cache      │    │  - xp_decay (dimanche minuit)    │
│               │    │  - season_reset (1er du trimestre)│
└───────────────┘    └──────────────┬────────────────────┘
                                    │
                                    ▼
                     ┌──────────────────────────────┐
                     │      HUBSPOT API v3          │
                     │                              │
                     │  Endpoints utilisés:         │
                     │  - /crm/v3/objects/deals     │
                     │    (search + properties)     │
                     │  - /crm/v3/objects/contacts  │
                     │    (search + properties)     │
                     │  - /crm/v3/objects/companies │
                     │    (search + properties)     │
                     │  - /crm/v3/owners            │
                     │  - /crm/v3/pipelines/deals   │
                     │                              │
                     │  Rate limit: 100 req/10s     │
                     │  (Pro/Enterprise)            │
                     └──────────────────────────────┘
```

### Flux de données

```
[HubSpot API] ──(toutes les 15 min)──▶ [Worker: hubspot_sync]
                                              │
                                              ▼
                                    [Cache PostgreSQL]
                                              │
                                              ▼
                                    [Worker: score_calculation]
                                              │
                                    ┌─────────┼─────────┐
                                    ▼         ▼         ▼
                            [score_snapshots] [alerts] [xp_log]
                                    │         │         │
                                    └─────────┼─────────┘
                                              │
                                              ▼
                                    [API REST → Frontend]
```

---

# 12. SÉCURITÉ & PERMISSIONS

## Modèle de permissions

| Rôle | Dashboard | Mondes | Profil perso | Profils autres | Leaderboard | Missions | Alertes | Settings | Rapport |
|---|---|---|---|---|---|---|---|---|---|
| Agent | ✅ Lecture | ✅ Lecture | ✅ Lecture | ❌ | ✅ Lecture | ✅ Lecture | ✅ Lecture | ❌ | ❌ |
| Commandant | ✅ Lecture | ✅ Lecture | ✅ Lecture | ✅ Lecture | ✅ Lecture | ✅ Lecture | ✅ Lecture | ⚠️ Partiel | ✅ Lecture |
| Stratège (Admin) | ✅ Lecture | ✅ Lecture | ✅ Lecture | ✅ Lecture | ✅ Lecture | ✅ Gestion | ✅ Gestion | ✅ Complet | ✅ Lecture + Envoi |

## Sécurité des données

- **Lecture seule :** L'app ne modifie JAMAIS les données HubSpot. Aucun scope d'écriture.
- **Tokens :** OAuth tokens chiffrés en AES-256 en DB, jamais exposés au frontend
- **Sessions :** JWT avec expiration 24h, refresh token 30j
- **RGPD :** Les données sont celles déjà dans HubSpot. L'app ne collecte aucune donnée personnelle additionnelle. Droit à la suppression : supprimer le compte = supprimer toutes les données de l'app.
- **Isolation tenant :** Chaque organisation ne voit que ses propres données. Row-level security en DB.

---

# 13. PERFORMANCE & SCALABILITÉ

| Métrique | Cible |
|---|---|
| Temps de chargement Dashboard | < 2 secondes |
| Temps de chargement page Monde | < 1.5 secondes |
| Temps de refresh données | < 30 secondes (background) |
| Temps de calcul des scores | < 10 secondes pour 10 000 deals |
| Disponibilité | 99.5% (hors maintenance planifiée) |
| Concurrent users par tenant | Jusqu'à 50 |
| Taille max portail supporté | 100 000 deals, 500 000 contacts |

**Stratégie de cache :**
- Les données HubSpot sont cachées en DB toutes les 15 min
- Les scores sont calculés après chaque sync et stockés en snapshot
- Le frontend reçoit les scores pré-calculés, pas les données brutes
- Le refresh manuel est limité à 1 par 5 minutes par utilisateur

---

# 14. BENCHMARKS SECTORIELS

Valeurs de référence B2B SaaS pour calibrer les scores et les seuils :

| Métrique | Mauvais | Moyen | Bon | Excellent | Source |
|---|---|---|---|---|---|
| Win rate | < 10% | 15-20% | 20-30% | > 30% | HubSpot Research 2024 |
| Days to close | > 90j | 60-90j | 30-60j | < 30j | Salesforce Benchmark |
| Pipeline coverage | < 2x | 2-3x | 3-4x | > 4x | Forrester |
| Speed to lead | > 24h | 4-24h | 1-4h | < 1h | InsideSales / Drift |
| % leads non travaillés | > 30% | 15-30% | 5-15% | < 5% | MarketingSherpa |
| Conversion Lead→Opp | < 5% | 5-13% | 13-25% | > 25% | HubSpot Benchmark |
| Closed lost avec raison | < 50% | 50-70% | 70-90% | > 90% | Best practice |
| Deals sans montant | > 30% | 15-30% | 5-15% | < 5% | Best practice |
| Concentration top 3 clients | > 60% | 40-60% | 25-40% | < 25% | SaaS Capital |

Ces benchmarks sont affichés dans les tooltips et comparatifs pour donner du contexte. Ex: "Votre win rate est à 8%. Le benchmark B2B SaaS est de 20-30%."

---

# 15. MODÈLE ÉCONOMIQUE & PRICING

## Structure proposée

| Plan | Prix | Agents | Pipelines | Features |
|---|---|---|---|---|
| **Starter** | 0€/mois | 3 | 1 | Dashboard, 6 mondes, alertes basiques |
| **Pro** | 49€/mois | 10 | 3 | + Gamification complète, missions, leaderboard, rapport hebdo |
| **Business** | 149€/mois | 30 | Illimité | + Multi-équipes, export PDF, Slack integration, API, benchmarks custom |
| **Enterprise** | Sur devis | Illimité | Illimité | + SSO, SLA, support dédié, white-label |

**Logique de monétisation :**
- Le plan Starter donne accès à la valeur principale (les 6 scores) gratuitement → acquisition
- La gamification (XP, badges, leaderboard) est le feature payant le plus attractif → conversion
- Les entreprises paient pour le multi-équipe et les intégrations → expansion

**Métriques business cibles :**
- Conversion Free → Pro : > 15%
- Churn mensuel Pro : < 5%
- Time to value (onboarding → premier score) : < 5 minutes
- NPS : > 50

---

# 16. ANALYSE CONCURRENTIELLE

| Critère | RevOps CC | HubSpot Reports | Databox | Kluster | Gong Forecast |
|---|---|---|---|---|---|
| Score unique 0-100 | ✅ | ❌ | ❌ | ⚠️ Partiel | ❌ |
| Gamification | ✅ XP/Badges/Missions | ❌ | ❌ | ❌ | ❌ |
| Zero-config | ✅ | ⚠️ Config requise | ⚠️ | ⚠️ | ⚠️ |
| Data Quality comme pilier | ✅ (avec plafond) | ❌ | ❌ | ❌ | ❌ |
| Actions prioritisées | ✅ | ❌ | ❌ | ⚠️ | ⚠️ |
| Champs natifs uniquement | ✅ | ✅ | ✅ | ❌ | ❌ |
| Prix entrée | 0€ | Inclus | 72$/mois | ~500$/mois | ~1000$/mois |
| Cible | PME B2B (3-30 commerciaux) | Tous | Marketing/Sales | Enterprise Sales | Enterprise Sales |

**Avantage concurrentiel :**
1. **Unique combinaison RevOps scoring + gamification** — personne ne fait les deux
2. **Zero-config** — aucun concurrent ne fonctionne en < 5 minutes sans paramétrage
3. **Data Quality comme fondation** — concept unique du plafond qui force la discipline
4. **Prix agressif** — le Starter est gratuit, le Pro est 10x moins cher que les alternatives

---

# 17. ROADMAP DÉTAILLÉE

## Phase 1 — MVP (Semaines 1-6)

| Semaine | Livrables |
|---|---|
| S1-2 | Auth OAuth HubSpot, scan du portail, onboarding basique |
| S2-3 | Backend : sync HubSpot, cache, calcul des 6 scores |
| S3-4 | Frontend : Dashboard avec 6 jauges, score global, alertes |
| S4-5 | 6 pages Monde (graphiques + tableaux + actions) |
| S5-6 | Profil agent basique, rapport hebdo email, settings minimaux |

**Critère de validation MVP :** Un utilisateur peut connecter son HubSpot et voir ses 6 scores + détails en < 5 minutes.

## Phase 2 — Gamification (Semaines 7-10)

| Semaine | Livrables |
|---|---|
| S7 | Système XP + niveaux + rangs (backend) |
| S8 | Leaderboard, profil agent enrichi |
| S9 | Badges (top 15 badges prioritaires) |
| S10 | Missions quotidiennes et hebdomadaires |

## Phase 3 — Polish (Semaines 11-14)

| Semaine | Livrables |
|---|---|
| S11 | Saisons, XP decay, badges saisonniers |
| S12 | Missions spéciales, notifications in-app |
| S13 | Historique / tendances, export PDF |
| S14 | Intégration Slack, multi-pipeline |

## Phase 4 — Go-to-Market (Semaines 15-18)

| Semaine | Livrables |
|---|---|
| S15 | Landing page, billing Stripe, plan Starter gratuit |
| S16 | Beta privée (10 clients pilotes) |
| S17 | Itérations sur feedback beta |
| S18 | Lancement public |

---

# 18. MÉTRIQUES DE SUCCÈS DU PRODUIT

## Métriques d'acquisition

| Métrique | Cible M1 | Cible M3 | Cible M6 |
|---|---|---|---|
| Sign-ups (OAuth connect) | 50 | 200 | 500 |
| Onboarding complété | 80% | 85% | 90% |
| Time to first score | < 5 min | < 3 min | < 2 min |

## Métriques d'engagement

| Métrique | Cible |
|---|---|
| DAU/MAU (utilisateurs actifs) | > 30% |
| Sessions par utilisateur/semaine | > 3 |
| Pages vues par session | > 4 |
| Temps moyen par session | 3-8 minutes |
| Missions complétées / assignées | > 60% |
| Badges débloqués / utilisateur / mois | > 2 |

## Métriques de rétention

| Métrique | Cible |
|---|---|
| Rétention J7 | > 70% |
| Rétention J30 | > 50% |
| Churn mensuel (payants) | < 5% |
| NPS | > 50 |

## Métriques d'impact (KPI client)

L'objectif ultime est que les utilisateurs de RevOps Command Center voient leurs métriques HubSpot s'améliorer :

| Métrique client | Amélioration cible à 90 jours |
|---|---|
| Data quality (% champs remplis) | +25 pts |
| Win rate | +5 pts |
| Days to close | -15% |
| Leads non travaillés | -50% |
| Speed to lead | -30% |

---

# 19. ANNEXES

## A. Mapping complet HubSpot — Champs natifs utilisés

### Objet DEAL (19 champs)

| Champ | Type | Utilisé pour | Pilier(s) |
|---|---|---|---|
| `dealname` | string | Affichage | Tous |
| `dealstage` | enum | Stage actuel, funnel | Pipeline, Velocity, Closing |
| `amount` | number | Montant, pipeline value | Pipeline, Revenue, Data Quality |
| `pipeline` | enum | Filtre pipeline | Tous |
| `hubspot_owner_id` | number | Attribution agent | Tous |
| `createdate` | datetime | Volume, XP | Pipeline, Gamification |
| `closedate` | datetime | Revenue temporel, data quality | Revenue, Data Quality |
| `hs_is_stalled` | boolean | Deals stallés | Pipeline |
| `hs_is_closed_won` | boolean | Won count | Closing, Revenue |
| `hs_is_closed_lost` | boolean | Lost count | Closing |
| `days_to_close` | number | Velocity | Velocity |
| `hs_v2_time_in_current_stage` | number (sec) | Aging par deal | Pipeline, Velocity |
| `hs_v2_cumulative_time_in_*` | number (sec) | Durée par stage | Velocity |
| `hs_v2_date_entered_*` | datetime | Progression, XP | Velocity, Gamification |
| `hs_v2_date_exited_*` | datetime | Calcul vélocité | Velocity |
| `hs_deal_stage_probability` | number | Forecast pondéré | Closing |
| `closed_lost_reason` | string | Analyse des pertes | Closing, Data Quality |
| `dealtype` | enum | New vs existing | Revenue |
| `deal_currency_code` | string | Multi-devises | Revenue |
| `notes_last_contacted` | datetime | Fraîcheur, XP | Data Quality, Gamification |

### Objet CONTACT (10 champs)

| Champ | Type | Utilisé pour | Pilier(s) |
|---|---|---|---|
| `firstname` / `lastname` | string | Affichage | Tous |
| `lifecyclestage` | enum | Funnel, data quality | Lead Flow, Data Quality |
| `hs_lead_status` | enum | Statut lead | Lead Flow |
| `hubspot_owner_id` | number | Attribution | Lead Flow |
| `hs_analytics_source` | enum | Source d'acquisition | Lead Flow |
| `hs_is_unworked` | boolean | Leads non travaillés | Lead Flow |
| `hs_time_to_first_engagement` | number (sec) | Speed to lead | Lead Flow |
| `createdate` | datetime | Volume leads | Lead Flow |
| `notes_last_contacted` | datetime | Fraîcheur | Data Quality |
| `num_associated_deals` | number | Lien contact-deal | Lead Flow |

### Objet COMPANY (5 champs)

| Champ | Type | Utilisé pour | Pilier(s) |
|---|---|---|---|
| `name` | string | Affichage | Revenue |
| `total_revenue` | number | Revenue par compte | Revenue |
| `num_associated_deals` | number | Volume par compte | Revenue |
| `num_associated_contacts` | number | Taille compte | Revenue |
| `domain` | string | Identification | Revenue |

**Total : 34 champs natifs HubSpot. 0 propriété custom requise.**

---

## B. Glossaire

| Terme | Définition |
|---|---|
| Agent | Un commercial tracké dans l'app (mappé à un owner HubSpot) |
| Commandant | Le directeur commercial / VP Sales |
| Stratège | L'Ops / RevOps manager (admin de l'app) |
| Monde | Un des 6 piliers RevOps (Lead Flow, Pipeline, Velocity, Closing, Revenue, Data Quality) |
| XP | Points d'expérience gagnés par les actions positives dans HubSpot |
| XP Lifetime | XP total cumulé depuis la création du compte (ne décroît jamais) |
| XP Saisonnier | XP gagné pendant le trimestre en cours (reset trimestriel, sujet au decay) |
| Rang | Titre militaire associé au niveau (Recrue → Général) |
| Plafond Data Quality | Quand le score Data Quality < 50, tous les autres scores sont plafonnés à 60 |
| Deal stallé | Deal identifié par HubSpot comme n'ayant eu aucune activité significative (`hs_is_stalled = true`) |
| Pipeline coverage | Ratio entre la valeur totale du pipeline ouvert et l'objectif de revenue |
| Speed to lead | Temps entre la création d'un contact et le premier engagement commercial |

---

*Document PRD v2.0 — RevOps Command Center*
*Ceres Agency — Confidentiel*
*16 mars 2026*
