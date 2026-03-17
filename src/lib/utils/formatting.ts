// Number, date, and currency formatting utilities

export function formatCurrency(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `€${(value / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `€${Math.round(value).toLocaleString("fr-FR")}`;
  }
  return `€${Math.round(value)}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDays(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)} jours`;
}

export function formatHours(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}h`;
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("fr-FR");
}

export function formatRatio(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}x`;
}

export function msToHours(ms: number): number {
  return ms / (1000 * 60 * 60);
}

export function msToDays(ms: number): number {
  return ms / (1000 * 60 * 60 * 24);
}
