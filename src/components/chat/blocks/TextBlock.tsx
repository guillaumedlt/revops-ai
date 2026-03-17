export default function TextBlock({ text }: { text: string }) {
  // Simple markdown-like parsing
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let key = 0;

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc pl-5 space-y-1">
          {listItems.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  function formatInline(str: string): React.ReactNode {
    // Bold
    const parts = str.split(/\*\*(.+?)\*\*/g);
    if (parts.length === 1) return str;
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  }

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h3 key={key++} className="text-base font-semibold mt-3 mb-1">
          {formatInline(line.slice(3))}
        </h3>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      listItems.push(line.slice(2));
    } else if (line.trim() === "") {
      flushList();
      elements.push(<div key={key++} className="h-2" />);
    } else {
      flushList();
      elements.push(
        <p key={key++} className="leading-relaxed">
          {formatInline(line)}
        </p>
      );
    }
  }
  flushList();

  return <div className="space-y-1.5">{elements}</div>;
}
