interface StatusBadgeProps {
  status: "good" | "warning" | "critical";
  label?: string;
}

const statusStyles: Record<string, { bg: string; text: string }> = {
  good: { bg: "bg-status-good-bg", text: "text-status-good" },
  warning: { bg: "bg-status-warning-bg", text: "text-status-warning" },
  critical: { bg: "bg-status-critical-bg", text: "text-status-critical" },
};

const dotColors: Record<string, string> = {
  good: "bg-status-good",
  warning: "bg-status-warning",
  critical: "bg-status-critical",
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = statusStyles[status];

  if (!label) {
    return (
      <span
        className={`inline-flex items-center justify-center h-5 px-1.5 rounded-sm ${style.bg}`}
      >
        <span className={`w-2 h-2 rounded-full ${dotColors[status]}`} />
      </span>
    );
  }

  return (
    <span
      className={`h-5 px-1.5 text-[10px] font-medium rounded-sm inline-flex items-center ${style.bg} ${style.text}`}
    >
      {label}
    </span>
  );
}
