import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // === FONT FAMILY ===
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "monospace"],
      },

      // === FONT SIZE — Petites, comme Linear/Attio ===
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "0.875rem" }],     // 10px
        xs: ["0.6875rem", { lineHeight: "1rem" }],          // 11px
        sm: ["0.75rem", { lineHeight: "1.125rem" }],        // 12px
        base: ["0.8125rem", { lineHeight: "1.25rem" }],     // 13px ⭐
        md: ["0.875rem", { lineHeight: "1.375rem" }],       // 14px
        lg: ["1rem", { lineHeight: "1.5rem" }],              // 16px
        xl: ["1.25rem", { lineHeight: "1.75rem" }],          // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }],           // 24px
        "3xl": ["2rem", { lineHeight: "2.5rem" }],           // 32px
      },

      // === LETTER SPACING ===
      letterSpacing: {
        tight: "-0.01em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
      },

      // === COLORS — Monochrome dominant ===
      colors: {
        background: "#FFFFFF",
        foreground: "#0A0A0A",

        muted: {
          DEFAULT: "#F5F5F5",
          foreground: "#737373",
        },

        border: "#E5E5E5",
        "border-subtle": "#F0F0F0",

        input: "#E5E5E5",
        ring: "#0A0A0A",

        // Semantic — pour les données uniquement
        status: {
          good: "#22C55E",
          "good-bg": "#F0FDF4",
          warning: "#F59E0B",
          "warning-bg": "#FFFBEB",
          critical: "#EF4444",
          "critical-bg": "#FEF2F2",
        },

        // Chart palette — monochrome-first
        chart: {
          primary: "#0A0A0A",
          secondary: "#737373",
          tertiary: "#A3A3A3",
          quaternary: "#D4D4D4",
          accent: "#2563EB",
        },

        // Accent — usage très limité
        accent: {
          DEFAULT: "#0A0A0A",
          foreground: "#FFFFFF",
        },

        // Sidebar
        sidebar: {
          background: "#FAFAFA",
          foreground: "#525252",
          border: "#F0F0F0",
          active: "#0A0A0A",
          "active-bg": "#F5F5F5",
          hover: "#F5F5F5",
        },

        // shadcn/ui compatibility
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0A0A0A",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0A0A0A",
        },
        primary: {
          DEFAULT: "#0A0A0A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F5F5F5",
          foreground: "#0A0A0A",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
      },

      // === BORDER RADIUS ===
      borderRadius: {
        none: "0",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        full: "9999px",
      },

      // === BOX SHADOW — Minimal ===
      boxShadow: {
        none: "none",
        sm: "0 1px 2px rgba(0,0,0,0.04)",
        DEFAULT: "0 1px 3px rgba(0,0,0,0.06)",
      },

      // === SPACING — Système 4px ===
      spacing: {
        px: "1px",
        "0.5": "2px",
        "1": "4px",
        "1.5": "6px",
        "2": "8px",
        "2.5": "10px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
      },

      // === SCREENS ===
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
