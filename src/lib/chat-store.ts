// Client-side message cache — persists across navigation within the same session
// No need for localStorage, just a module-level Map

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  content_blocks?: any[];
  created_at?: string;
}

interface CachedConversation {
  messages: Message[];
  fetchedAt: number;
}

const cache = new Map<string, CachedConversation>();

export function getCachedMessages(conversationId: string): Message[] | null {
  const entry = cache.get(conversationId);
  if (!entry) return null;
  // Cache valid for 5 minutes
  if (Date.now() - entry.fetchedAt > 5 * 60 * 1000) {
    cache.delete(conversationId);
    return null;
  }
  return entry.messages;
}

export function setCachedMessages(conversationId: string, messages: Message[]) {
  cache.set(conversationId, { messages, fetchedAt: Date.now() });
}

export function appendCachedMessage(conversationId: string, message: Message) {
  const entry = cache.get(conversationId);
  if (entry) {
    entry.messages = [...entry.messages, message];
    entry.fetchedAt = Date.now();
  }
}

export function updateCachedMessage(conversationId: string, messageId: string, update: Partial<Message>) {
  const entry = cache.get(conversationId);
  if (entry) {
    entry.messages = entry.messages.map(m =>
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
