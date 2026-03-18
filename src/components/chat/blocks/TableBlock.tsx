interface Props {
  title?: string;
  headers: string[];
  rows: string[][];
}

export default function TableBlock({ title, headers, rows }: Props) {
  if (!headers || headers.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#E5E5E5] overflow-hidden">
      {title && (
        <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#E5E5E5]">
          <p className="text-sm font-semibold text-[#0A0A0A]">{title}</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
              {headers.map(function(h, i) {
                return <th key={i} className="text-left text-[11px] font-semibold uppercase tracking-wider text-[#737373] px-4 py-2.5">{h}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(function(row, i) {
              return (
                <tr key={i} className={"border-b border-[#F5F5F5] last:border-0 " + (i % 2 === 1 ? "bg-[#FAFAFA]/50" : "bg-white")}>
                  {row.map(function(cell, j) {
                    return <td key={j} className={"px-4 py-2.5 text-[#0A0A0A] " + (j === 0 ? "font-medium" : "")}>{cell}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {rows.length > 0 && (
        <div className="px-4 py-2 bg-[#FAFAFA] border-t border-[#E5E5E5]">
          <p className="text-[10px] text-[#A3A3A3]">{rows.length + " row" + (rows.length !== 1 ? "s" : "")}</p>
        </div>
      )}
    </div>
  );
}
