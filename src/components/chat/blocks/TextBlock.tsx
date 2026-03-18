import React from "react";

function formatInline(str: string): React.ReactNode {
  var parts = str.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map(function(part, i) {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-[#0A0A0A]">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={i} className="px-1 py-0.5 rounded bg-[#F5F5F5] text-[12px] font-mono">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default function TextBlock({ text }: { text: string }) {
  if (!text) return null;
  var lines = text.split("\n");
  var elements: React.ReactNode[] = [];
  var listItems: Array<{ text: string; ordered: boolean }> = [];
  var key = 0;

  function flushList() {
    if (listItems.length === 0) return;
    if (listItems[0].ordered) {
      elements.push(
        <ol key={key++} className="list-decimal pl-5 space-y-1 text-[#333]">
          {listItems.map(function(item, i) { return <li key={i}>{formatInline(item.text)}</li>; })}
        </ol>
      );
    } else {
      elements.push(
        <ul key={key++} className="list-disc pl-5 space-y-1 text-[#333]">
          {listItems.map(function(item, i) { return <li key={i}>{formatInline(item.text)}</li>; })}
        </ul>
      );
    }
    listItems = [];
  }

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var numMatch = line.match(/^(\d+)\.\s+(.+)/);

    if (line.startsWith("# ") && !line.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={key++} className="text-lg font-bold text-[#0A0A0A] mt-4 mb-2">{formatInline(line.slice(2))}</h2>);
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(<h3 key={key++} className="text-base font-semibold text-[#0A0A0A] mt-3 mb-1.5">{formatInline(line.slice(3))}</h3>);
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(<h4 key={key++} className="text-sm font-semibold text-[#0A0A0A] mt-2 mb-1">{formatInline(line.slice(4))}</h4>);
    } else if (line.trim() === "---") {
      flushList();
      elements.push(<hr key={key++} className="border-[#E5E5E5] my-3" />);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (listItems.length > 0 && listItems[0].ordered) flushList();
      listItems.push({ text: line.slice(2), ordered: false });
    } else if (numMatch) {
      if (listItems.length > 0 && !listItems[0].ordered) flushList();
      listItems.push({ text: numMatch[2], ordered: true });
    } else if (line.trim() === "") {
      flushList();
      elements.push(<div key={key++} className="h-1.5" />);
    } else {
      flushList();
      elements.push(<p key={key++} className="text-[#333] leading-relaxed">{formatInline(line)}</p>);
    }
  }
  flushList();

  return <div className="space-y-1">{elements}</div>;
}
