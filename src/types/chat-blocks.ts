export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "kpi"; label: string; value: string; change?: number; trend?: "up" | "down" | "flat" }
  | { type: "kpi_grid"; items: Array<{ label: string; value: string; change?: number; trend?: "up" | "down" | "flat" }> }
  | { type: "chart"; chartType: "bar" | "line" | "area" | "donut"; title: string; data: Array<Record<string, unknown>>; xKey?: string; yKey?: string }
  | { type: "table"; title?: string; headers: string[]; rows: string[][] }
  | { type: "report"; title: string; sections: ContentBlock[][] }
  | { type: "alert"; severity: "info" | "warning" | "critical"; message: string };
