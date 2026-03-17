interface Props {
  title?: string;
  headers: string[];
  rows: string[][];
}

export default function TableBlock({ title, headers, rows }: Props) {
  if (!headers || headers.length === 0) return null;

  return (
    <div className="border border-[#E5E5E5] rounded-lg overflow-hidden bg-white">
      {title && (
        <div className="px-4 py-2.5 text-sm font-medium text-[#0A0A0A] border-b border-[#E5E5E5]">
          {title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA]">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="text-left text-xs font-medium uppercase tracking-wide text-[#737373] px-4 py-2.5"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#FAFAFA] transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2.5 text-[#0A0A0A]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
