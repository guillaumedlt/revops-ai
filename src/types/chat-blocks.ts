export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "kpi"; label: string; value: string; change?: number; trend?: "up" | "down" | "flat" }
  | { type: "kpi_grid"; items: Array<{ label: string; value: string; change?: number; trend?: "up" | "down" | "flat" }> }
  | { type: "chart"; chartType: "bar" | "line" | "area" | "donut" | "stacked_bar" | "horizontal_bar" | "combo"; title: string; data: Array<Record<string, unknown>>; xKey?: string; yKey?: string; yKeys?: string[]; colors?: string[] }
  | { type: "table"; title?: string; headers: string[]; rows: string[][]; sortable?: boolean; searchable?: boolean; pageSize?: number }
  | { type: "report"; title: string; sections: ContentBlock[][] }
  | { type: "alert"; severity: "info" | "warning" | "critical"; message: string }
  | { type: "progress"; label: string; value: number; max: number; target?: number; color?: string }
  | { type: "funnel"; title: string; steps: Array<{ label: string; value: number; rate?: number }> }
  | { type: "comparison"; title: string; items: Array<{ label: string; current: string; previous: string; change?: number; trend?: "up" | "down" | "flat" }> }
  | { type: "scorecard"; title: string; value: string; target?: string; score: number; breakdown?: Array<{ label: string; score: number; maxScore: number }> }
  | { type: "email_preview"; title: string; subject?: string; html: string }
  | { type: "clarification"; question: string; options: Array<{ label: string; value: string; description?: string }>; allowCustom?: boolean }
  | { type: "confirmation"; action: string; details?: string; confirmText?: string; cancelText?: string; severity?: "info" | "warning" | "danger" }
  | { type: "action_result"; status: "success" | "error" | "pending"; action: string; details?: string };
