"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
    { label: "Aujourd\u2019hui", items: [] },
    { label: "Hier", items: [] },
    { label: "7 derniers jours", items: [] },
    { label: "Plus ancien", items: [] },
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

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const grouped = groupByDate(conversations);

  return (
    <aside className="w-[260px] bg-[#0A0A0A] text-white flex flex-col h-full shrink-0">
      {/* New conversation button */}
      <div className="p-3">
        <button
          onClick={handleNew}
          className="w-full border border-[#333] text-white text-sm rounded-lg px-3 py-2.5 text-left hover:bg-[#1A1A1A] transition-colors"
        >
          + Nouvelle conversation
        </button>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2">
        {grouped.map((group) => (
          <div key={group.label} className="mb-3">
            <div className="text-[10px] uppercase tracking-wider text-[#737373] px-2 py-1.5 font-medium">
              {group.label}
            </div>
            {group.items.map((conv) => (
              <button
                key={conv.id}
                onClick={() => router.push(`/chat/${conv.id}`)}
                className={`w-full text-left text-sm truncate px-2 py-2 rounded-lg transition-colors ${
                  activeId === conv.id
                    ? "bg-[#1A1A1A] text-white"
                    : "text-[#A3A3A3] hover:bg-[#1A1A1A] hover:text-white"
                }`}
              >
                {conv.title}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#1A1A1A] p-3 space-y-2">
        <div className="flex gap-3">
          <a href="/dashboard" className="text-xs text-[#737373] underline hover:text-white transition-colors">
            Dashboard
          </a>
          <a href="/dashboard/settings" className="text-xs text-[#737373] hover:text-white transition-colors">
            Settings
          </a>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#737373] truncate max-w-[160px]">{userEmail}</span>
          <button onClick={handleLogout} className="text-xs text-[#737373] hover:text-white transition-colors">
            Deconnexion
          </button>
        </div>
      </div>
    </aside>
  );
}
