// Core metric types for RevOps AI

// ── Row Types ─────────────────────────────────────────────────────────

export interface DealRow {
  hubspot_deal_id: string;
  dealname: string | null;
  dealstage: string | null;
  pipeline: string | null;
  amount: number | null;
  closedate: string | null;
  createdate: string | null;
  hubspot_owner_id: string | null;
  hs_is_closed_won: boolean;
  hs_is_closed: boolean;
  hs_is_stalled: boolean;
  hs_time_in_current_stage: number | null;
  days_to_close: number | null;
  closed_lost_reason: string | null;
  hs_deal_stage_probability: number | null;
  hs_analytics_source: string | null;
  hs_last_sales_activity_date: string | null;
  contact_ids: string[];
  company_ids: string[];
  stage_timestamps: Record<string, number | null | undefined>;
  cumulative_stage_times: Record<string, number | null | undefined>;
}

export interface ContactRow {
  hubspot_contact_id: string;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  company: string | null;
  lifecyclestage: string | null;
  hs_lead_status: string | null;
  hubspot_owner_id: string | null;
  createdate: string | null;
  hs_time_to_first_engagement: number | null;
  hs_is_unworked: boolean;
  hs_analytics_source: string | null;
  hs_sales_email_last_replied: string | null;
  notes_last_updated: string | null;
  num_notes: number | null;
  num_contacted_notes: number | null;
  deal_ids: string[];
  company_ids: string[];
}

export interface CompanyRow {
  hubspot_company_id: string;
  name: string | null;
  domain: string | null;
  industry: string | null;
  total_revenue: number | null;
  deal_ids: string[];
}

export interface PipelineStageRow {
  pipeline_id: string;
  stage_id: string;
  stage_label: string;
  display_order: number;
  probability: number;
  is_closed_won: boolean;
  is_closed_lost: boolean;
}

// ── Metric Result ─────────────────────────────────────────────────────

export type MetricStatus = "good" | "warning" | "critical";
export type TrendDirection = "up" | "down" | "flat" | null;

export interface MetricAlert {
  id: string;
  type: string;
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
}

export interface MetricResult {
  value: number;
  displayValue: string;
  trend: number | null;
  trendDirection: TrendDirection;
  status: MetricStatus;
  sampleSize: number;
  metadata: Record<string, unknown>;
  alerts: MetricAlert[];
}

// ── Filter ────────────────────────────────────────────────────────────

export interface MetricFilter {
  dateRange?: { start: Date; end: Date };
  ownerIds?: string[];
  pipeline?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────

export function metricResult(partial: {
  value: number;
  displayValue: string;
  trend?: number | null;
  trendDirection?: TrendDirection;
  status?: MetricStatus;
  sampleSize?: number;
  metadata?: Record<string, unknown>;
  alerts?: MetricAlert[];
}): MetricResult {
  return {
    value: partial.value,
    displayValue: partial.displayValue,
    trend: partial.trend ?? null,
    trendDirection: partial.trendDirection ?? null,
    status: partial.status ?? "good",
    sampleSize: partial.sampleSize ?? 0,
    metadata: partial.metadata ?? {},
    alerts: partial.alerts ?? [],
  };
}

export function trendDir(trend: number | null): TrendDirection {
  if (trend === null) return null;
  if (trend > 1) return "up";
  if (trend < -1) return "down";
  return "flat";
}

export function statusFromThresholds(
  value: number,
  goodThreshold: number,
  warningThreshold: number,
): MetricStatus {
  if (value >= goodThreshold) return "good";
  if (value >= warningThreshold) return "warning";
  return "critical";
}

export function statusFromThresholdsInverse(
  value: number,
  goodThreshold: number,
  warningThreshold: number,
): MetricStatus {
  if (value <= goodThreshold) return "good";
  if (value <= warningThreshold) return "warning";
  return "critical";
}
