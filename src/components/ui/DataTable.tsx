"use client";

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right";
  mono?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "Aucune donn\u00e9e",
}: DataTableProps<T>) {
  return (
    <div className="border border-border rounded overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/30">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-xs font-medium uppercase tracking-wide text-muted-foreground border-b border-border h-9 px-3 ${
                  col.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-sm text-muted-foreground py-8 text-center"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-[#F0F0F0] hover:bg-muted/50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`text-sm font-normal h-10 px-3 ${
                      col.align === "right" ? "text-right" : "text-left"
                    } ${col.mono ? "font-mono tabular-nums" : ""}`}
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key] as React.ReactNode) ?? "-"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
