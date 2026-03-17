# DESIGN-SYSTEM.md — RevOps AI Visual Identity

> Style: Minimaliste noir/blanc, écriture fine et petite.
> Inspirations: Attio, Linear, Claude, Vercel, Raycast.
> Principes: Clean, aéré, dense en information, zéro décoration superflue.

---

## Design Philosophy

1. **Content-first** — Aucun élément décoratif. Chaque pixel sert les données.
2. **Monochrome dominant** — Noir, blanc, gris. Couleur uniquement pour les statuts et données.
3. **Typographie fine** — Font-weight 400-500, tailles petites, tracking large.
4. **Densité contrôlée** — Beaucoup d'info visible, mais avec du breathing room.
5. **Subtle depth** — Pas de shadows lourdes. Borders ultra-fines, opacité subtile.
6. **Motion minimale** — Transitions courtes (150-200ms), ease-out. Jamais distrayant.

---

## Color Tokens

```typescript
// tailwind.config.ts — extend colors
const colors = {
  // === BASE (monochrome) ===
  background: '#FFFFFF',       // Main background
  foreground: '#0A0A0A',       // Primary text — presque noir

  muted: {
    DEFAULT: '#F5F5F5',        // Subtle backgrounds (cards, hover)
    foreground: '#737373',     // Secondary text — gris moyen
  },

  border: '#E5E5E5',           // Borders ultra-fines
  'border-subtle': '#F0F0F0',  // Borders encore plus discrètes

  input: '#E5E5E5',            // Input borders
  ring: '#0A0A0A',             // Focus rings — noir

  // === SEMANTIC (pour les données uniquement) ===
  status: {
    good: '#22C55E',           // Vert — valeurs positives
    'good-bg': '#F0FDF4',      // Vert background subtle
    warning: '#F59E0B',        // Orange — attention
    'warning-bg': '#FFFBEB',
    critical: '#EF4444',       // Rouge — problème
    'critical-bg': '#FEF2F2',
  },

  // === CHART PALETTE (monochrome-first) ===
  chart: {
    primary: '#0A0A0A',        // Noir — série principale
    secondary: '#737373',      // Gris — série secondaire
    tertiary: '#A3A3A3',       // Gris clair — série 3
    quaternary: '#D4D4D4',     // Gris très clair — série 4
    accent: '#2563EB',         // Bleu — accent unique si nécessaire
  },

  // === ACCENT (usage très limité) ===
  accent: {
    DEFAULT: '#0A0A0A',        // Noir — CTAs principaux
    foreground: '#FFFFFF',     // Texte sur accent
  },

  // === SIDEBAR ===
  sidebar: {
    background: '#FAFAFA',
    foreground: '#525252',
    border: '#F0F0F0',
    active: '#0A0A0A',
    'active-bg': '#F5F5F5',
    hover: '#F5F5F5',
  },
};
```

---

## Typography

```typescript
// Font: Inter (même que Linear, Vercel, Claude)
// Fallback: system-ui, -apple-system, sans-serif

const typography = {
  // Font family
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
  },

  // Font sizes — PETITES, comme Linear/Attio
  fontSize: {
    'xxs':  ['0.625rem', { lineHeight: '0.875rem' }],   // 10px — labels très discrets
    'xs':   ['0.6875rem', { lineHeight: '1rem' }],       // 11px — metadata, timestamps
    'sm':   ['0.75rem', { lineHeight: '1.125rem' }],     // 12px — body small, table cells
    'base': ['0.8125rem', { lineHeight: '1.25rem' }],    // 13px — body principal ⭐
    'md':   ['0.875rem', { lineHeight: '1.375rem' }],    // 14px — titres de cartes
    'lg':   ['1rem', { lineHeight: '1.5rem' }],           // 16px — titres de section
    'xl':   ['1.25rem', { lineHeight: '1.75rem' }],       // 20px — titres de page
    '2xl':  ['1.5rem', { lineHeight: '2rem' }],           // 24px — score central uniquement
    '3xl':  ['2rem', { lineHeight: '2.5rem' }],           // 32px — adoption score grand
  },

  // Font weights — fins
  fontWeight: {
    light: '300',    // Titres très légers (rarement)
    normal: '400',   // Body text ⭐
    medium: '500',   // Emphasis, labels, nav active ⭐
    semibold: '600', // Titres de cartes, KPI values
    bold: '700',     // Uniquement score central, montants importants
  },

  // Letter spacing
  letterSpacing: {
    tight: '-0.01em',     // Grands titres
    normal: '0',           // Body
    wide: '0.02em',        // Uppercase labels, categories ⭐
    wider: '0.05em',       // Section headers ultra-caps
  },
};
```

### Text Styles (classes réutilisables)

```css
/* Body principal — 13px regular */
.text-body { @apply text-base font-normal text-foreground; }

/* Body secondary — 12px gris */
.text-secondary { @apply text-sm font-normal text-muted-foreground; }

/* Label — 11px medium uppercase tracking-wide */
.text-label { @apply text-xs font-medium uppercase tracking-wide text-muted-foreground; }

/* KPI value — 24px semibold */
.text-kpi { @apply text-2xl font-semibold text-foreground tracking-tight; }

/* Card title — 13px medium */
.text-card-title { @apply text-base font-medium text-foreground; }

/* Page title — 20px medium */
.text-page-title { @apply text-xl font-medium text-foreground tracking-tight; }

/* Metric label inside charts — 11px */
.text-chart-label { @apply text-xs font-normal text-muted-foreground; }

/* Score central — 32px bold */
.text-score { @apply text-3xl font-bold text-foreground; }
```

---

## Spacing

```typescript
// Système 4px — comme Linear
const spacing = {
  'px': '1px',
  '0.5': '2px',
  '1': '4px',
  '1.5': '6px',
  '2': '8px',
  '2.5': '10px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
};

// Usage patterns:
// - Entre éléments inline: 4-8px
// - Padding de carte: 16px (p-4)
// - Gap entre cartes: 12-16px (gap-3 ou gap-4)
// - Padding de page: 24-32px (p-6 ou p-8)
// - Sections séparées: 32-48px (gap-8 ou gap-12)
```

---

## Border & Radius

```typescript
const borderRadius = {
  none: '0',
  sm: '4px',       // Inputs, badges
  DEFAULT: '6px',  // Cards, buttons ⭐
  md: '8px',       // Modals, popovers
  lg: '12px',      // Grandes cartes
  full: '9999px',  // Pills, avatars
};

// Borders: TOUJOURS 1px, couleur border ou border-subtle
// Pas de box-shadow. Jamais. Utiliser des borders uniquement.
// Exception: popover/dropdown → shadow-sm avec opacité très faible

const boxShadow = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.04)',      // Popovers uniquement
  DEFAULT: '0 1px 3px rgba(0,0,0,0.06)', // Dropdown menus
};
```

---

## Components

### KPI Card
```
┌──────────────────────────────┐
│ LABEL                   ↗ 12% │  ← text-label uppercase + trend
│ €45,200                       │  ← text-kpi
│ ▁▂▃▅▆▇ sparkline             │  ← 32px height, stroke 1.5px
└──────────────────────────────┘
```

```tsx
// Structure: border border-border rounded-md p-4
// Label: text-xs font-medium uppercase tracking-wide text-muted-foreground
// Value: text-2xl font-semibold text-foreground mt-1
// Trend: text-xs font-medium + status color (good/warning/critical)
// Sparkline: h-8 mt-2, stroke-width 1.5, fill opacity 0.05
// Hover: bg-muted/50 transition-colors duration-150
```

### Chart Card
```
┌──────────────────────────────────────┐
│ Pipeline par Stage              [⋯]  │  ← card-title + menu
│                                       │
│  ┌─────────────────────────────────┐ │
│  │         CHART AREA               │ │  ← h-[280px]
│  │                                   │ │
│  └─────────────────────────────────┘ │
│                                       │
│  Legend: ● Série A  ● Série B        │  ← text-xs
└──────────────────────────────────────┘
```

```tsx
// Structure: border border-border rounded-md p-4
// Header: flex justify-between items-center mb-4
// Title: text-base font-medium
// Menu: IconButton ghost avec icon MoreHorizontal (16px)
// Chart height: 280px standard, 200px pour grille dense
// Axes: text-xxs text-muted-foreground, grid stroke #F0F0F0
// Legend: text-xs text-muted-foreground, dot 6px
```

### Table
```
┌──────────────────────────────────────┐
│ Owner      │ Deals │ Revenue │  WR   │
├──────────────────────────────────────┤
│ Guillaume  │  12   │ €45,200 │ 34.2% │  ← text-sm, row h-10
│ Simon      │   8   │ €23,100 │ 28.5% │
│ Bruno      │   5   │ €12,800 │ 41.0% │
└──────────────────────────────────────┘
```

```tsx
// Header row: text-xs font-medium uppercase tracking-wide text-muted-foreground
//             border-b border-border bg-muted/30 h-9 px-3
// Body rows: text-sm font-normal h-10 px-3
//            border-b border-border-subtle
// Hover: bg-muted/50
// Numbers: font-mono text-right (tabular-nums)
// Status dots: inline w-2 h-2 rounded-full mr-2
```

### Sidebar
```
┌─────────────┐
│ ◆ RevOps AI │  ← Logo 16px + text-sm font-semibold
│             │
│ HOME        │  ← text-xs uppercase tracking-wider
│  ⊕ Score    │     text-sm font-medium
│             │
│ ANALYSE     │
│  ◦ Leads    │  ← text-sm font-normal text-muted-foreground
│  ● Pipeline │     active: text-foreground bg-sidebar-active-bg
│  ◦ Velocity │
│  ◦ Closing  │
│  ◦ Revenue  │
│  ◦ Activité │
│  ◦ Data Q.  │
│             │
│ PILOTAGE    │
│  ◦ Cockpit  │
│             │
│ ──────────  │
│  ⚙ Settings │
│  💬 Chat AI │
└─────────────┘
```

```tsx
// Width: w-[220px] — compact comme Linear
// Background: bg-sidebar-background
// Border right: border-r border-sidebar-border
// Section labels: text-xxs font-medium uppercase tracking-wider text-muted-foreground px-3 py-2
// Nav items: text-sm font-normal text-sidebar-foreground h-8 px-3 rounded-md
// Active: text-sidebar-active font-medium bg-sidebar-active-bg
// Hover: bg-sidebar-hover
// Icons: 16px, stroke-width 1.5, text-muted-foreground
// Active icon: text-foreground
```

### Button Styles

```tsx
// Primary (rare, CTAs only)
// bg-foreground text-background text-sm font-medium h-8 px-3 rounded-md
// hover: opacity-90

// Secondary (most common)
// bg-transparent text-foreground text-sm font-medium h-8 px-3 rounded-md
// border border-border
// hover: bg-muted

// Ghost (nav, toolbars)
// bg-transparent text-muted-foreground text-sm font-normal h-8 px-2 rounded-md
// hover: bg-muted text-foreground

// Sizes: sm (h-7 text-xs px-2), default (h-8 text-sm px-3), lg (h-9 text-sm px-4)
```

### Input

```tsx
// h-8 text-sm font-normal rounded-md border border-border px-3
// placeholder: text-muted-foreground
// focus: ring-1 ring-ring border-transparent
// JAMAIS de label au-dessus — utiliser placeholder ou label inline à gauche
```

### Badge / Status Pill

```tsx
// Status badges (dans les tables, cards)
// h-5 px-1.5 text-xxs font-medium rounded-sm
// good:     bg-status-good-bg text-status-good
// warning:  bg-status-warning-bg text-status-warning
// critical: bg-status-critical-bg text-status-critical
// neutral:  bg-muted text-muted-foreground
```

### Filter Bar

```
┌──────────────────────────────────────────────────────────┐
│ 📅 Last 30 days ▾ │ 👤 All Owners ▾ │ 🔍 Pipeline ▾     │
└──────────────────────────────────────────────────────────┘
```

```tsx
// Container: flex gap-2 px-6 py-3 border-b border-border
// Each filter: inline-flex items-center h-7 px-2.5 text-xs font-medium
//              border border-border rounded-md cursor-pointer
//              hover: bg-muted
// Active filter: bg-foreground text-background
// Dropdown: shadow-sm border border-border rounded-md p-1
```

---

## Chart Styling

### Recharts Configuration Globale

```typescript
const chartConfig = {
  // Axes
  axisLine: { stroke: '#E5E5E5', strokeWidth: 1 },
  tickLine: false,
  tick: { fontSize: 10, fill: '#737373', fontFamily: 'Inter' },

  // Grid
  cartesianGrid: {
    stroke: '#F0F0F0',
    strokeDasharray: '0',  // Solid, pas dashed
    horizontal: true,
    vertical: false,
  },

  // Tooltip
  tooltip: {
    contentStyle: {
      backgroundColor: '#0A0A0A',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 12px',
      fontSize: '12px',
      fontWeight: '500',
      color: '#FFFFFF',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    },
    cursor: { stroke: '#E5E5E5', strokeWidth: 1 },
  },

  // Bars
  bar: {
    radius: [3, 3, 0, 0],  // Rounded top
    maxBarSize: 40,
  },

  // Lines
  line: {
    strokeWidth: 1.5,
    dot: false,
    activeDot: { r: 3, fill: '#0A0A0A', stroke: '#FFFFFF', strokeWidth: 2 },
  },

  // Area
  area: {
    strokeWidth: 1.5,
    fillOpacity: 0.06,
  },

  // Legend
  legend: {
    iconType: 'circle',
    iconSize: 6,
    wrapperStyle: { fontSize: '11px', color: '#737373' },
  },
};
```

### Palette Séquentielle (pour un même type de données)
```
Série 1: #0A0A0A (noir)
Série 2: #525252
Série 3: #737373
Série 4: #A3A3A3
Série 5: #D4D4D4
Série 6: #E5E5E5
```

### Status Colors (uniquement pour good/warning/critical)
```
Good:     stroke #22C55E, fill #22C55E opacity 0.1
Warning:  stroke #F59E0B, fill #F59E0B opacity 0.1
Critical: stroke #EF4444, fill #EF4444 opacity 0.1
```

---

## Layout

### Dashboard Layout

```
┌──────────┬───────────────────────────────────────┬──────────┐
│          │  Header (h-12)                         │          │
│          │  ┌──────────────────────────────────┐  │          │
│ Sidebar  │  │  Filter Bar (h-10, optional)     │  │  Chat    │
│ w-[220]  │  ├──────────────────────────────────┤  │  Panel   │
│          │  │                                   │  │  w-[380] │
│          │  │  Page Content                     │  │          │
│          │  │  (scroll-y, p-6)                  │  │  (slide  │
│          │  │                                   │  │   in/out)│
│          │  │  Grid: grid-cols-4 gap-3          │  │          │
│          │  │  (responsive: 1-2-4 cols)         │  │          │
│          │  │                                   │  │          │
└──────────┴──┴───────────────────────────────────┘──┴──────────┘
```

### Header
```tsx
// h-12 border-b border-border px-6
// flex items-center justify-between
// Left: breadcrumb (text-sm text-muted-foreground)
// Right: search (ghost), notifications (ghost), avatar (32px rounded-full)
```

### Grid System
```tsx
// KPI row: grid grid-cols-4 gap-3
// Chart row: grid grid-cols-2 gap-3
// Full width: col-span-2
// Responsive: sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

### Chat Panel
```tsx
// Width: w-[380px]
// Slide from right: translate-x + opacity transition
// Background: bg-background
// Border left: border-l border-border
// Header: h-12 border-b, "RevOps AI" + close button
// Messages: flex-1 overflow-y-auto p-4 gap-4
// Input: h-auto min-h-10 max-h-32 border-t border-border p-3
//        textarea auto-resize + send button
```

---

## Animations

```typescript
// Framer Motion presets
const transitions = {
  // Page enter
  pageEnter: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },

  // Card stagger (KPI cards row)
  staggerChildren: {
    transition: { staggerChildren: 0.04 },  // 40ms between cards
  },

  // Chart data load
  chartReveal: {
    initial: { opacity: 0, scaleY: 0.95 },
    animate: { opacity: 1, scaleY: 1 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  // Chat panel slide
  chatSlide: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { type: 'spring', damping: 25, stiffness: 200 },
  },

  // Number count up (KPI values)
  countUp: { duration: 0.6, ease: 'easeOut' },

  // Gauge fill
  gaugeFill: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },

  // Hover
  hover: { scale: 1.01, transition: { duration: 0.15 } },
};
```

---

## Dark Mode (Phase 2)

> Pour la V1, on reste en light mode uniquement.
> Dark mode prévu Phase 2 — la structure Tailwind est prête (dark: prefix).

```typescript
// Futur dark mode tokens:
// background: '#0A0A0A'
// foreground: '#FAFAFA'
// muted: '#1A1A1A'
// muted-foreground: '#A3A3A3'
// border: '#262626'
// border-subtle: '#1A1A1A'
```

---

## Responsive Breakpoints

```typescript
const screens = {
  sm: '640px',    // Mobile
  md: '768px',    // Tablet
  lg: '1024px',   // Small desktop
  xl: '1280px',   // Desktop ⭐ (target principal)
  '2xl': '1536px' // Wide
};

// Le dashboard est conçu pour xl (1280px+)
// En dessous de lg: sidebar collapse en overlay
// En dessous de md: single column, chat full-screen
```

---

## Do's and Don'ts

### DO ✓
- Utiliser des borders 1px fines partout
- Garder les font-sizes petites (12-13px pour le body)
- Laisser beaucoup de whitespace
- Utiliser des couleurs uniquement pour les statuts (good/warning/critical)
- Animations courtes et subtiles (< 300ms)
- Afficher les nombres en font-mono (tabular-nums)
- Tooltip dark sur fond #0A0A0A

### DON'T ✗
- Pas de box-shadow (sauf popovers)
- Pas de gradients
- Pas de couleurs vives dans l'UI (uniquement dans les données)
- Pas de borders arrondies > 12px
- Pas de font-size > 32px (sauf hero marketing)
- Pas d'icônes colorées — toujours monochrome
- Pas d'animations qui durent > 400ms
- Pas de card elevation — tout est flat avec borders
- Pas de hover effects excessifs
- Pas d'underline sur les liens dans le dashboard
