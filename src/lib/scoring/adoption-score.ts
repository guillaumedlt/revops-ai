// Adoption Score — composite score from all metric domains

import type { MetricResult, DealRow, ContactRow, PipelineStageRow } from "@/types/metrics";

export interface AdoptionScoreResult {
  overall: number; // 0-100
  grade: string; // A+ to F
  dataDiscipline: number;
  pipelineRigor: number;
  activityLogging: number;
  processAdherence: number;
  toolUsage: number;
}

export function scoreToGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 80) return "A-";
  if (score >= 75) return "B+";
  if (score >= 70) return "B";
  if (score >= 65) return "B-";
  if (score >= 60) return "C+";
  if (score >= 55) return "C";
  if (score >= 50) return "C-";
  if (score >= 45) return "D+";
  if (score >= 40) return "D";
  return "F";
}

// Convert a metric status to a score 0-100
function statusToScore(status: "good" | "warning" | "critical"): number {
  if (status === "good") return 90;
  if (status === "warning") return 55;
  return 25;
}

// Data Discipline (30%): based on D1, D2, D4, D5, D6
// Pipeline Rigor (25%): based on P9, P10, P11, D3, D7
// Activity Logging (20%): based on A1, A2, L7
// Process Adherence (15%): based on V6, C10 stage conversion quality
// Tool Usage (10%): based on login frequency (default 50 if no data)

export function computeAdoptionScore(
  _deals: DealRow[],
  _contacts: ContactRow[],
  _stages: PipelineStageRow[],
  metricResults: Record<string, MetricResult>,
): AdoptionScoreResult {
  // Extract scores from metric statuses
  const s = (id: string) => metricResults[id] ? statusToScore(metricResults[id].status) : 50;
  // Or use raw value if it's already 0-100
  const v = (id: string) => metricResults[id]?.value ?? 50;

  // Data Discipline: D1(score), D2, D4, D5, D6
  const dataDiscipline = (
    v("data_quality_score") * 0.3 +
    (100 - (metricResults["deals_no_amount"]?.value ?? 0)) * 0.25 +
    (100 - (metricResults["deals_no_contact"]?.value ?? 0)) * 0.2 +
    (100 - (metricResults["deals_no_company"]?.value ?? 0)) * 0.1 +
    (metricResults["field_completeness"]?.value ?? 50) * 0.15
  );

  // Pipeline Rigor: P9(stalled), P10(inactive), P11(age), D3(overdue), D7(hygiene)
  const pipelineRigor = (
    (100 - (metricResults["stalled_deals"]?.value ?? 0)) * 0.25 +
    (100 - (metricResults["inactive_deals"]?.value ?? 0)) * 0.2 +
    s("pipeline_age") * 0.15 +
    (100 - (metricResults["overdue_deals"]?.value ?? 0)) * 0.2 +
    (metricResults["pipeline_hygiene"]?.value ?? 50) * 0.2
  );

  // Activity Logging: A1(volume), A2(unworked deals), L7(unworked leads)
  const activityLogging = (
    s("activity_volume") * 0.4 +
    (100 - (metricResults["unworked_deals"]?.value ?? 0)) * 0.35 +
    (100 - (metricResults["unworked_leads"]?.value ?? 0)) * 0.25
  );

  // Process Adherence: V6(stage conversion), C10(close rate by stage)
  const processAdherence = (
    s("stage_conversion") * 0.5 +
    s("close_rate_by_stage_reached") * 0.5
  );

  // Tool Usage: default 50 (tracked server-side later)
  const toolUsage = 50;

  const overall = (
    dataDiscipline * 0.30 +
    pipelineRigor * 0.25 +
    activityLogging * 0.20 +
    processAdherence * 0.15 +
    toolUsage * 0.10
  );

  const clamped = Math.max(0, Math.min(100, Math.round(overall)));

  return {
    overall: clamped,
    grade: scoreToGrade(clamped),
    dataDiscipline: Math.round(Math.max(0, Math.min(100, dataDiscipline))),
    pipelineRigor: Math.round(Math.max(0, Math.min(100, pipelineRigor))),
    activityLogging: Math.round(Math.max(0, Math.min(100, activityLogging))),
    processAdherence: Math.round(Math.max(0, Math.min(100, processAdherence))),
    toolUsage: Math.round(toolUsage),
  };
}
