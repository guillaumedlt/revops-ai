"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, Search, Download, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  title?: string;
  headers: string[];
  rows: string[][];
  sortable?: boolean;
  searchable?: boolean;
  pageSize?: number;
}

function detectNumeric(val: string): number | null {
  var cleaned = val.replace(/[€$%,\s]/g, "").replace(/K$/i, "000").replace(/M$/i, "000000");
  var num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function getCellStyle(val: string): string {
  // Color-code percentages and trends
  if (val.match(/^[+-]?\d+(\.\d+)?%$/)) {
    var n = parseFloat(val);
    if (n > 0) return "text-[#22C55E] font-medium";
    if (n < 0) return "text-[#EF4444] font-medium";
  }
  if (val.startsWith("+")) return "text-[#22C55E] font-medium";
  if (val.startsWith("-") && detectNumeric(val) !== null) return "text-[#EF4444] font-medium";
  return "";
}

export default function TableBlock({ title, headers, rows, sortable = true, searchable = true, pageSize = 10 }: Props) {
  var [sortCol, setSortCol] = useState<number | null>(null);
  var [sortAsc, setSortAsc] = useState(true);
  var [search, setSearch] = useState("");
  var [page, setPage] = useState(0);

  if (!headers || headers.length === 0) return null;

  var filtered = useMemo(function() {
    if (!search.trim()) return rows;
    var q = search.toLowerCase();
    return rows.filter(function(row) {
      return row.some(function(cell) { return cell.toLowerCase().includes(q); });
    });
  }, [rows, search]);

  var sorted = useMemo(function() {
    if (sortCol === null) return filtered;
    return [...filtered].sort(function(a, b) {
      var aVal = a[sortCol!] || "";
      var bVal = b[sortCol!] || "";
      var aNum = detectNumeric(aVal);
      var bNum = detectNumeric(bVal);
      if (aNum !== null && bNum !== null) {
        return sortAsc ? aNum - bNum : bNum - aNum;
      }
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });
  }, [filtered, sortCol, sortAsc]);

  var totalPages = Math.ceil(sorted.length / pageSize);
  var paginated = sorted.length > pageSize ? sorted.slice(page * pageSize, (page + 1) * pageSize) : sorted;
  var showPagination = sorted.length > pageSize;

  function handleSort(col: number) {
    if (!sortable) return;
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  }

  function handleSearch(val: string) {
    setSearch(val);
    setPage(0);
  }

  function exportCSV() {
    var csvHeaders = headers.join(",");
    var csvRows = rows.map(function(row) {
      return row.map(function(cell) {
        return '"' + cell.replace(/"/g, '""') + '"';
      }).join(",");
    });
    var csv = csvHeaders + "\n" + csvRows.join("\n");
    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = (title || "export") + ".csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-lg border border-[#EAEAEA] overflow-hidden bg-white">
      {/* Header bar */}
      <div className="px-4 py-2.5 bg-[#FAFAFA] border-b border-[#EAEAEA] flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[#111] truncate">{title || "Data"}</p>
        <div className="flex items-center gap-1.5 shrink-0">
          {searchable && rows.length > 5 && (
            <div className="relative">
              <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-[#BBB]" />
              <input
                type="text"
                value={search}
                onChange={function(e) { handleSearch(e.target.value); }}
                placeholder="Filter..."
                className="h-7 w-32 pl-7 pr-2 text-[11px] rounded-lg border border-[#EAEAEA] bg-white text-[#111] placeholder:text-[#C0C0C0] focus:outline-none focus:ring-1 focus:ring-[#D4D4D4]"
              />
            </div>
          )}
          <button
            onClick={exportCSV}
            className="h-7 px-2 flex items-center gap-1 rounded-lg text-[11px] text-[#999] hover:text-[#111] hover:bg-[#F0F0F0] transition-colors"
            title="Export CSV"
          >
            <Download size={12} />
            <span className="hidden sm:inline">CSV</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA]/50">
              {headers.map(function(h, i) {
                var isSorted = sortCol === i;
                return (
                  <th
                    key={i}
                    onClick={function() { handleSort(i); }}
                    className={"text-left text-[11px] font-semibold uppercase tracking-wider text-[#999] px-4 py-2.5 " + (sortable ? "cursor-pointer hover:text-[#111] select-none" : "")}
                  >
                    <div className="flex items-center gap-1">
                      {h}
                      {sortable && isSorted && (
                        sortAsc
                          ? <ChevronUp size={12} className="text-[#111]" />
                          : <ChevronDown size={12} className="text-[#111]" />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan={headers.length} className="px-4 py-6 text-center text-xs text-[#BBB]">No results</td></tr>
            ) : paginated.map(function(row, i) {
              return (
                <tr key={i} className={"border-b border-[#F5F5F5] last:border-0 hover:bg-[#FAFAFA] transition-colors " + (i % 2 === 1 ? "bg-[#FAFAFA]/30" : "bg-white")}>
                  {row.map(function(cell, j) {
                    var style = getCellStyle(cell);
                    return (
                      <td key={j} className={"px-4 py-2.5 text-[#111] " + (j === 0 ? "font-medium " : "") + style}>
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer with pagination */}
      <div className="px-4 py-2 bg-[#FAFAFA] border-t border-[#EAEAEA] flex items-center justify-between">
        <p className="text-[10px] text-[#BBB]">
          {search ? filtered.length + " of " + rows.length + " rows" : rows.length + " row" + (rows.length !== 1 ? "s" : "")}
        </p>
        {showPagination && (
          <div className="flex items-center gap-1">
            <button onClick={function() { setPage(Math.max(0, page - 1)); }} disabled={page === 0}
              className="h-6 w-6 flex items-center justify-center rounded text-[#555] hover:bg-[#F0F0F0] disabled:opacity-30">
              <ChevronLeft size={14} />
            </button>
            <span className="text-[10px] text-[#999] min-w-[40px] text-center">
              {(page + 1) + " / " + totalPages}
            </span>
            <button onClick={function() { setPage(Math.min(totalPages - 1, page + 1)); }} disabled={page >= totalPages - 1}
              className="h-6 w-6 flex items-center justify-center rounded text-[#555] hover:bg-[#F0F0F0] disabled:opacity-30">
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
