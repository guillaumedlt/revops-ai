export default function TextBlock({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: { text: string; ordered: boolean; num?: number }[] = [];
  let key = 0;

  function flushList() {
    if (listItems.length === 0) return;
    if (listItems[0].ordered) {
      elements.push(
        <ol key={key++} className="list-decimal pl-5 space-y-1 text-[#333]">
          {listItems.map((item, i) => <li key={i}>{formatInline(item.text)}</li>)}
        </ol>
      );
    } else {
      elements.push(
        <ul key={key++} className="list-disc pl-5 space-y-1 text-[#333]">
          {listItems.map((item, i) => <li key={i}>{formatInline(item.text)}</li>)}
        </ul>
      );
    }
    listItems = [];
  }

  function formatInline(str: string): React.ReactNode {
    // Process bold, inline code, and links
    const parts: React.ReactNode[] = [];
    let remaining = str;
    let idx = 0;

    while (remaining.length > 0) {
      // Check for inline code `code`
      const codeMatch = remaining.match(/^(.*?)`([^`]+)`/);
      // Check for bold **text**
      const boldMatch = remaining.match(/^(.*?)\*\*(.+?)\*\*/);
      // Check for link [text](url)
      const linkMatch = remaining.match(/^(.*?)\[([^\]]+)\]\(([^)]+)\)/);

      let firstMatch: { type: string; index: number; match: RegExpMatchArray } | null = null;

      if (codeMatch && codeMatch[1] !== undefined) {
        const i = codeMatch[1].length;
        if (!firstMatch || i < firstMatch.index) firstMatch = { type: "code", index: i, match: codeMatch };
      }
      if (boldMatch && boldMatch[1] !== undefined) {
        const i = boldMatch[1].length;
        if (!firstMatch || i < firstMatch.index) firstMatch = { type: "bold", index: i, match: boldMatch };
      }
      if (linkMatch && linkMatch[1] !== undefined) {
        const i = linkMatch[1].length;
        if (!firstMatch || i < firstMatch.index) firstMatch = { type: "link", index: i, match: linkMatch };
      }

      if (!firstMatch) {
        parts.push(remaining);
        break;
      }

      if (firstMatch.match[1]) parts.push(firstMatch.match[1]);

      if (firstMatch.type === "code") {
        parts.push(<code key={idx++} className="px-1.5 py-0.5 rounded bg-[#F5F5F5] text-[#0A0A0A] text-[12px] font-mono">{firstMatch.match[2]}</code>);
        remaining = remaining.slice(firstMatch.match[0].length);
      } else if (firstMatch.type === "bold") {
        parts.push(<strong key={idx++} className="font-semibold text-[#0A0A0A]">{firstMatch.match[2]}</strong>);
        remaining = remaining.slice(firstMatch.match[0].length);
      } else if (firstMatch.type === "link") {
        parts.push(<a key={idx++} href={firstMatch.match[3]} target="_blank" rel="noopener" className="text-[#0A0A0A] underline underline-offset-2 hover:text-[#525252]">{firstMatch.match[2]}</a>);
        remaining = remaining.slice(firstMatch.match[0].length);
      }
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
  }

  for (const line of lines) {
    const numMatch = line.match(/^(\d+)\.\s+(.+)/);

    if (line.startsWith("# ") && !line.startsWith("## ")) {
      flushList();
      elements.push(<h2 key={key++} className="text-lg font-bold text-[#0A0A0A] mt-4 mb-2">{formatInline(line.slice(2))}</h2>);
    } else if (line.startsWith("## ")) {
      flushList();
      elements.push(<h3 key={key++} className="text-base font-semibold text-[#0A0A0A] mt-3 mb-1.5">{formatInline(line.slice(3))}</h3>);
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(<h4 key={key++} className="text-sm font-semibold text-[#0A0A0A] mt-2 mb-1">{formatInline(line.slice(4))}</h4>);
    } else if (line.startsWith("---") && line.trim().match(/^-{3,}$/)) {
      flushList();
      elements.push(<hr key={key++} className="border-[#E5E5E5] my-3" />);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (listItems.length > 0 && listItems[0].ordered) flushList();
      listItems.push({ text: line.slice(2), ordered: false });
    } else if (numMatch) {
      if (listItems.length > 0 && !listItems[0].ordered) flushList();
      listItems.push({ text: numMatch[2], ordered: true, num: parseInt(numMatch[1]) });
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
