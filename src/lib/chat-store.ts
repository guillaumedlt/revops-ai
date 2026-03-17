// Client-side conversation cache for instant switching

interface CachedConversation {
  messages: any[];
  fetchedAt: number;
}

const cache = new Map<string, CachedConversation>();

export function getCachedMessages(conversationId: string): any[] | null {
  const entry = cache.get(conversationId);
  if (!entry) return null;
  if (Date.now() - entry.fetchedAt > 5 * 60 * 1000) {
    cache.delete(conversationId);
    return null;
  }
  return entry.messages;
}

export function setCachedMessages(conversationId: string, messages: any[]) {
  cache.set(conversationId, { messages, fetchedAt: Date.now() });
}

export function appendCachedMessage(conversationId: string, message: any) {
  const entry = cache.get(conversationId);
  if (entry) {
    entry.messages = [...entry.messages, message];
    entry.fetchedAt = Date.now();
  }
}

export function updateCachedMessage(conversationId: string, messageId: string, update: any) {
  const entry = cache.get(conversationId);
  if (entry) {
    entry.messages = entry.messages.map((m: any) =>
      m.id === messageId ? { ...m, ...update } : m
    );
  }
}

export function deleteCachedConversation(conversationId: string) {
  cache.delete(conversationId);
}

export function clearCache() {
  cache.clear();
}
