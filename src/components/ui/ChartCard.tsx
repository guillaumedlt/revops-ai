interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

export default function ChartCard({ title, children, className = "", action }: ChartCardProps) {
  return (
    <div className={`border border-border rounded p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        {action && <div>{action}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}
