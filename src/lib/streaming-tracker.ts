// Global tracker for active streaming conversations
// Persists across page navigation (lives on window object)

var KEY = "__kairo_streaming";

export function markStreaming(conversationId: string) {
  if (typeof window === "undefined") return;
  var set = getStreamingSet();
  set.add(conversationId);
  (window as any)[KEY] = set;
}

export function unmarkStreaming(conversationId: string) {
  if (typeof window === "undefined") return;
  var set = getStreamingSet();
  set.delete(conversationId);
  (window as any)[KEY] = set;
}

export function isStreaming(conversationId: string): boolean {
  return getStreamingSet().has(conversationId);
}

export function getStreamingIds(): string[] {
  return Array.from(getStreamingSet());
}

function getStreamingSet(): Set<string> {
  if (typeof window === "undefined") return new Set();
  return (window as any)[KEY] || new Set();
}
