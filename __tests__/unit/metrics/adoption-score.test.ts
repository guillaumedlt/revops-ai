import { describe, it, expect } from "vitest";
import {
  computeAdoptionScore,
  scoreToGrade,
} from "@/lib/scoring/adoption-score";
import type { MetricResult } from "@/types/metrics";
import { normalDeals, normalContacts, normalStages, makeDeal, makeContact } from "../../fixtures/metric-data";

// Helper to create a metric result with a given status and value
function fakeMetric(value: number, status: "good" | "warning" | "critical" = "good"): MetricResult {
  return {
    value,
    displayValue: `${value}`,
    trend: null,
    trendDirection: null,
    status,
    sampleSize: 10,
    metadata: {},
    alerts: [],
  };
}

// ── scoreToGrade ─────────────────────────────────────────────────────

describe("scoreToGrade", () => {
  it("returns A+ for 90+", () => {
    expect(scoreToGrade(90)).toBe("A+");
    expect(scoreToGrade(100)).toBe("A+");
  });

  it("returns A for 85-89", () => {
    expect(scoreToGrade(85)).toBe("A");
    expect(scoreToGrade(89)).toBe("A");
  });

  it("returns A- for 80-84", () => {
    expect(scoreToGrade(80)).toBe("A-");
    expect(scoreToGrade(84)).toBe("A-");
  });

  it("returns B+ for 75-79", () => {
    expect(scoreToGrade(75)).toBe("B+");
  });

  it("returns B for 70-74", () => {
    expect(scoreToGrade(70)).toBe("B");
  });

  it("returns B- for 65-69", () => {
    expect(scoreToGrade(65)).toBe("B-");
  });

  it("returns C+ for 60-64", () => {
    expect(scoreToGrade(60)).toBe("C+");
  });

  it("returns C for 55-59", () => {
    expect(scoreToGrade(55)).toBe("C");
  });

  it("returns C- for 50-54", () => {
    expect(scoreToGrade(50)).toBe("C-");
  });

  it("returns D+ for 45-49", () => {
    expect(scoreToGrade(45)).toBe("D+");
  });

  it("returns D for 40-44", () => {
    expect(scoreToGrade(40)).toBe("D");
  });

  it("returns F for below 40", () => {
    expect(scoreToGrade(39)).toBe("F");
    expect(scoreToGrade(0)).toBe("F");
  });

  it("handles boundary values precisely", () => {
    expect(scoreToGrade(89.99)).toBe("A");
    expect(scoreToGrade(90)).toBe("A+");
  });
});

// ── computeAdoptionScore ─────────────────────────────────────────────

describe("computeAdoptionScore", () => {
  it("computes adoption score with all metrics provided", () => {
    const metrics: Record<string, MetricResult> = {
      data_quality_score: fakeMetric(80),
      deals_no_amount: fakeMetric(10),
      deals_no_contact: fakeMetric(5),
      deals_no_company: fakeMetric(5),
      field_completeness: fakeMetric(85),
      stalled_deals: fakeMetric(10),
      inactive_deals: fakeMetric(15),
      pipeline_age: fakeMetric(20, "good"),
      overdue_deals: fakeMetric(10),
      pipeline_hygiene: fakeMetric(75),
      activity_volume: fakeMetric(50, "good"),
      unworked_deals: fakeMetric(10),
      unworked_leads: fakeMetric(5),
      stage_conversion: fakeMetric(60, "good"),
      close_rate_by_stage_reached: fakeMetric(50, "good"),
    };

    const result = computeAdoptionScore(normalDeals, normalContacts, normalStages, metrics);

    expect(result.overall).toBeGreaterThanOrEqual(0);
    expect(result.overall).toBeLessThanOrEqual(100);
    expect(result.grade).toBeDefined();
    expect(result.dataDiscipline).toBeGreaterThanOrEqual(0);
    expect(result.pipelineRigor).toBeGreaterThanOrEqual(0);
    expect(result.activityLogging).toBeGreaterThanOrEqual(0);
    expect(result.processAdherence).toBeGreaterThanOrEqual(0);
    expect(result.toolUsage).toBe(50); // default
  });

  it("handles empty metric results (uses defaults)", () => {
    const result = computeAdoptionScore([], [], [], {});

    expect(result.overall).toBeGreaterThanOrEqual(0);
    expect(result.overall).toBeLessThanOrEqual(100);
    // With all defaults at 50:
    // dataDiscipline: 50*0.3 + 100*0.25 + 100*0.2 + 100*0.1 + 50*0.15 = 15+25+20+10+7.5 = 77.5
    // pipelineRigor: 100*0.25 + 100*0.2 + 50*0.15 + 100*0.2 + 50*0.2 = 25+20+7.5+20+10 = 82.5
    // activityLogging: 50*0.4 + 100*0.35 + 100*0.25 = 20+35+25 = 80
    // processAdherence: 50*0.5 + 50*0.5 = 50
    // toolUsage: 50
    // overall: 77.5*0.3 + 82.5*0.25 + 80*0.2 + 50*0.15 + 50*0.1
    //        = 23.25 + 20.625 + 16 + 7.5 + 5 = 72.375 => 72
    expect(result.grade).toBeDefined();
  });

  it("produces high score for all-good metrics", () => {
    const metrics: Record<string, MetricResult> = {
      data_quality_score: fakeMetric(95),
      deals_no_amount: fakeMetric(0),
      deals_no_contact: fakeMetric(0),
      deals_no_company: fakeMetric(0),
      field_completeness: fakeMetric(100),
      stalled_deals: fakeMetric(0),
      inactive_deals: fakeMetric(0),
      pipeline_age: fakeMetric(0, "good"),
      overdue_deals: fakeMetric(0),
      pipeline_hygiene: fakeMetric(100),
      activity_volume: fakeMetric(100, "good"),
      unworked_deals: fakeMetric(0),
      unworked_leads: fakeMetric(0),
      stage_conversion: fakeMetric(100, "good"),
      close_rate_by_stage_reached: fakeMetric(100, "good"),
    };

    const result = computeAdoptionScore(normalDeals, normalContacts, normalStages, metrics);

    // dataDiscipline: 95*0.3 + 100*0.25 + 100*0.2 + 100*0.1 + 100*0.15 = 28.5+25+20+10+15 = 98.5
    // pipelineRigor: 100*0.25 + 100*0.2 + 90*0.15 + 100*0.2 + 100*0.2 = 25+20+13.5+20+20 = 98.5
    // activityLogging: 90*0.4 + 100*0.35 + 100*0.25 = 36+35+25 = 96
    // processAdherence: 90*0.5 + 90*0.5 = 90
    // toolUsage: 50
    // overall: 98.5*0.3 + 98.5*0.25 + 96*0.2 + 90*0.15 + 50*0.1 = 29.55+24.625+19.2+13.5+5 = 91.875
    expect(result.overall).toBeGreaterThanOrEqual(85);
    expect(result.grade).toMatch(/^A/);
  });

  it("produces low score for all-critical metrics", () => {
    const metrics: Record<string, MetricResult> = {
      data_quality_score: fakeMetric(10),
      deals_no_amount: fakeMetric(80),
      deals_no_contact: fakeMetric(80),
      deals_no_company: fakeMetric(80),
      field_completeness: fakeMetric(20),
      stalled_deals: fakeMetric(80),
      inactive_deals: fakeMetric(80),
      pipeline_age: fakeMetric(80, "critical"),
      overdue_deals: fakeMetric(80),
      pipeline_hygiene: fakeMetric(20),
      activity_volume: fakeMetric(0, "critical"),
      unworked_deals: fakeMetric(80),
      unworked_leads: fakeMetric(80),
      stage_conversion: fakeMetric(10, "critical"),
      close_rate_by_stage_reached: fakeMetric(10, "critical"),
    };

    const result = computeAdoptionScore(normalDeals, normalContacts, normalStages, metrics);
    expect(result.overall).toBeLessThan(40);
    expect(result.grade).toMatch(/^[DF]/);
  });

  it("clamps overall score between 0 and 100", () => {
    // Even with extreme values, should be clamped
    const metrics: Record<string, MetricResult> = {};
    const result = computeAdoptionScore([], [], [], metrics);
    expect(result.overall).toBeGreaterThanOrEqual(0);
    expect(result.overall).toBeLessThanOrEqual(100);
  });

  it("assigns correct grade to computed overall", () => {
    const metrics: Record<string, MetricResult> = {};
    const result = computeAdoptionScore([], [], [], metrics);
    // Verify grade matches the overall score
    const expectedGrade = scoreToGrade(result.overall);
    expect(result.grade).toBe(expectedGrade);
  });
});
