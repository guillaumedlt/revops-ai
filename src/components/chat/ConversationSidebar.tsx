"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  MessageSquarePlus,
  Search,
  Settings,
  LogOut,
  Trash2,
  LayoutDashboard,
} from "lucide-react";
import { getCachedMessages, setCachedMessages, deleteCachedConversation } from "@/lib/chat-store";

interface Conversation {
  id: string;
  title: string;
  last_message_at: string | null;
  created_at: string;
}

type GroupedConversations = {
  label: string;
  items: Conversation[];
}[];

function groupByDate(conversations: Conversation[]): GroupedConversations {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const weekAgo = new Date(today.getTime() - 7 * 86400000);

  const groups: GroupedConversations = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Previous 7 days", items: [] },
    { label: "Older", items: [] },
  ];

  for (const conv of conversations) {
    const d = new Date(conv.last_message_at || conv.created_at);
    if (d >= today) groups[0].items.push(conv);
    else if (d >= yesterday) groups[1].items.push(conv);
    else if (d >= weekAgo) groups[2].items.push(conv);
    else groups[3].items.push(conv);
  }

  return groups.filter((g) => g.items.length > 0);
}

export default function ConversationSidebar() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userEmail, setUserEmail] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const activeId = pathname.startsWith("/chat/") ? pathname.split("/")[2] : null;

  const fetchConversations = useCallback(async () => {
    const res = await fetch("/api/conversations");
    if (res.ok) {
      const json = await res.json();
      setConversations(json.data ?? []);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations, pathname]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? "");
    });
  }, []);

  const handleNew = () => {
    router.push("/chat");
  };

  const handleDelete = async (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    deleteCachedConversation(id);
    await fetch("/api/conversations/" + id, { method: "DELETE" });
    if (pathname === "/chat/" + id) {
      router.push("/chat");
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleHover = (id: string) => {
    if (!getCachedMessages(id)) {
      fetch("/api/conversations/" + id)
        .then((r) => r.json())
        .then((res) => {
          if (res.data?.messages) {
            const msgs = res.data.messages.map((m: any) => ({
              id: m.id,
              role: m.role,
              content: m.content,
              content_blocks: m.content_blocks,
            }));
            setCachedMessages(id, msgs);
          }
        })
        .catch(() => {});
    }
  };

  const grouped = groupByDate(conversations);

  const filteredGrouped = searchQuery
    ? grouped
        .map((g) => ({
          ...g,
          items: g.items.filter((c) =>
            c.title.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((g) => g.items.length > 0)
    : grouped;

  const userInitial = userEmail ? userEmail[0].toUpperCase() : "?";

  return (
    <aside className="w-[240px] bg-white border-r border-[#E5E5E5] flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="px-3 pt-4 pb-2 flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-[#0A0A0A] text-white flex items-center justify-center text-xs font-bold">
          R
        </div>
        <span className="text-sm font-semibold text-[#0A0A0A]">RevOps AI</span>
      </div>

      {/* Action buttons */}
      <div className="px-2 space-y-0.5 mt-1">
        <button
          onClick={handleNew}
          className="w-full flex items-center gap-2 px-3 h-9 rounded-lg text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
        >
          <MessageSquarePlus size={16} className="text-[#A3A3A3]" />
          New Chat
        </button>
        <button
          onClick={() => router.push("/dashboards")}
          className={"w-full flex items-center gap-2 px-3 h-9 rounded-lg text-sm transition-colors " + (pathname.startsWith("/dashboards") ? "bg-[#F0F0F0] text-[#0A0A0A] font-medium" : "text-[#525252] hover:bg-[#F5F5F5]")}
        >
          <LayoutDashboard size={16} className={pathname.startsWith("/dashboards") ? "text-[#0A0A0A]" : "text-[#A3A3A3]"} />
          Dashboards
        </button>
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="w-full flex items-center gap-2 px-3 h-9 rounded-lg text-sm text-[#525252] hover:bg-[#F5F5F5] transition-colors"
        >
          <Search size={16} className="text-[#A3A3A3]" />
          Search
        </button>
      </div>

      {/* Search input */}
      {searchOpen && (
        <div className="px-3 mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            autoFocus
            className="w-full h-8 px-2.5 text-xs rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#0A0A0A]"
          />
        </div>
      )}

      {/* Separator */}
      <div className="mx-3 my-2 border-t border-[#E5E5E5]" />

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2">
        {filteredGrouped.length === 0 && (
          <p className="px-3 py-4 text-xs text-[#A3A3A3]">No conversations yet</p>
        )}
        {filteredGrouped.map((group) => (
          <div key={group.label} className="mb-2">
            <div className="text-[10px] uppercase tracking-wider text-[#A3A3A3] font-medium px-3 mt-3 mb-1">
              {group.label}
            </div>
            {group.items.map((conv) => (
              <div key={conv.id} className="group relative">
                <button
                  onMouseEnter={() => handleHover(conv.id)}
                  onClick={() => router.push("/chat/" + conv.id)}
                  className={"w-full text-left text-sm truncate px-3 pr-8 h-8 flex items-center rounded-lg transition-colors " + (activeId === conv.id ? "bg-[#F0F0F0] text-[#0A0A0A] font-medium" : "text-[#525252] hover:bg-[#F5F5F5]")}
                >
                  {conv.title}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(conv.id);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex h-6 w-6 items-center justify-center rounded text-[#A3A3A3] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                  title="Delete conversation"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#E5E5E5] p-3 space-y-2">
        {/* Context indicator */}
        <div className="flex items-center gap-2 px-1">
          <div className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-[#A3A3A3]">Context enabled</span>
        </div>

        {/* User section */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[#F0F0F0] flex items-center justify-center text-xs font-medium text-[#525252] shrink-0">
            {userInitial}
          </div>
          <span className="text-xs text-[#525252] truncate flex-1">{userEmail}</span>
          <button
            onClick={() => router.push("/settings")}
            className="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
            title="Settings"
          >
            <Settings size={14} />
          </button>
          <button
            onClick={handleLogout}
            className="text-[#A3A3A3] hover:text-[#0A0A0A] transition-colors"
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
