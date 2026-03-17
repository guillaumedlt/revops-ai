"use client";

import { useState } from "react";

interface FilterBarProps {
  dateRange: { start: string; end: string };
  onDateRangeChange: (range: { start: string; end: string }) => void;
  owners?: Array<{ id: string; name: string }>;
  selectedOwnerIds?: string[];
  onOwnerChange?: (ids: string[]) => void;
}

type DatePreset = "7d" | "30d" | "quarter" | "custom";

const presetLabels: Record<DatePreset, string> = {
  "7d": "7 jours",
  "30d": "30 jours",
  quarter: "Ce trimestre",
  custom: "Custom",
};

function getPresetRange(preset: DatePreset): { start: string; end: string } | null {
  const now = new Date();
  const end = now.toISOString().split("T")[0];

  if (preset === "7d") {
    const start = new Date(now);
    start.setDate(start.getDate() - 7);
    return { start: start.toISOString().split("T")[0], end };
  }
  if (preset === "30d") {
    const start = new Date(now);
    start.setDate(start.getDate() - 30);
    return { start: start.toISOString().split("T")[0], end };
  }
  if (preset === "quarter") {
    const quarterMonth = Math.floor(now.getMonth() / 3) * 3;
    const start = new Date(now.getFullYear(), quarterMonth, 1);
    return { start: start.toISOString().split("T")[0], end };
  }
  return null;
}

export default function FilterBar({
  dateRange,
  onDateRangeChange,
  owners,
  selectedOwnerIds = [],
  onOwnerChange,
}: FilterBarProps) {
  const [activePreset, setActivePreset] = useState<DatePreset>("30d");

  function handlePresetClick(preset: DatePreset) {
    setActivePreset(preset);
    const range = getPresetRange(preset);
    if (range) {
      onDateRangeChange(range);
    }
  }

  function toggleOwner(id: string) {
    if (!onOwnerChange) return;
    const next = selectedOwnerIds.includes(id)
      ? selectedOwnerIds.filter((oid) => oid !== id)
      : [...selectedOwnerIds, id];
    onOwnerChange(next);
  }

  return (
    <div className="flex items-center gap-2 border-b border-border px-6 py-3">
      {(Object.keys(presetLabels) as DatePreset[]).map((preset) => (
        <button
          key={preset}
          onClick={() => handlePresetClick(preset)}
          className={`inline-flex items-center h-7 px-2.5 text-xs font-medium border rounded cursor-pointer transition-colors ${
            activePreset === preset
              ? "border-foreground bg-foreground text-background"
              : "border-border text-foreground hover:bg-muted"
          }`}
        >
          {presetLabels[preset]}
        </button>
      ))}

      {activePreset === "custom" && (
        <div className="flex items-center gap-1 ml-1">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
            className="h-7 px-2 text-xs border border-border rounded bg-background text-foreground"
          />
          <span className="text-xs text-muted-foreground">-</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
            className="h-7 px-2 text-xs border border-border rounded bg-background text-foreground"
          />
        </div>
      )}

      {owners && owners.length > 0 && (
        <>
          <div className="w-px h-5 bg-border mx-1" />
          {owners.map((owner) => (
            <button
              key={owner.id}
              onClick={() => toggleOwner(owner.id)}
              className={`inline-flex items-center h-7 px-2.5 text-xs font-medium border rounded cursor-pointer transition-colors ${
                selectedOwnerIds.includes(owner.id)
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-foreground hover:bg-muted"
              }`}
            >
              {owner.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
