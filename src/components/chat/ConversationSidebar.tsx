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
  Target,
} from "lucide-react";

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
  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var yesterday = new Date(today.getTime() - 86400000);
  var weekAgo = new Date(today.getTime() - 7 * 86400000);

  var groups: GroupedConversations = [
    { label: "Today", items: [] },
    { label: "Yesterday", items: [] },
    { label: "Previous 7 days", items: [] },
    { label: "Older", items: [] },
  ];

  for (var i = 0; i < conversations.length; i++) {
    var conv = conversations[i];
    var d = new Date(conv.last_message_at || conv.created_at);
    if (d >= today) groups[0].items.push(conv);
    else if (d >= yesterday) groups[1].items.push(conv);
    else if (d >= weekAgo) groups[2].items.push(conv);
    else groups[3].items.push(conv);
  }

  return groups.filter(function(g) { return g.items.length > 0; });
}

export default function ConversationSidebar() {
  var [conversations, setConversations] = useState<Conversation[]>([]);
  var [userEmail, setUserEmail] = useState("");
  var [searchOpen, setSearchOpen] = useState(false);
  var [searchQuery, setSearchQuery] = useState("");
  var pathname = usePathname();
  var router = useRouter();

  var activeId = pathname.startsWith("/chat/") ? pathname.split("/")[2] : null;

  var fetchConversations = useCallback(async function() {
    var res = await fetch("/api/conversations");
    if (res.ok) {
      var json = await res.json();
      setConversations(json.data ?? []);
    }
  }, []);

  useEffect(function() {
    fetchConversations();
  }, [fetchConversations, pathname]);

  useEffect(function() {
    var supabase = createClient();
    supabase.auth.getUser().then(function({ data }) {
      setUserEmail(data.user?.email ?? "");
    });
  }, []);

  function handleNew() {
    router.push("/chat");
  }

  async function handleDelete(id: string) {
    setConversations(function(prev) { return prev.filter(function(c) { return c.id !== id; }); });
    
    await fetch("/api/conversations/" + id, { method: "DELETE" });
    if (pathname === "/chat/" + id) {
      router.push("/chat");
    }
  }

  async function handleLogout() {
    var supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  function handleHover(id: string) {
    // Prefetch handled by Next.js
  }

  var grouped = groupByDate(conversations);

  var filteredGrouped = searchQuery
    ? grouped
        .map(function(g) {
          return {
            label: g.label,
            items: g.items.filter(function(c) {
              return c.title.toLowerCase().includes(searchQuery.toLowerCase());
            }),
          };
        })
        .filter(function(g) { return g.items.length > 0; })
    : grouped;

  var userInitial = userEmail ? userEmail[0].toUpperCase() : "?";

  return (
    <aside className="w-[240px] bg-white border-r border-[#E5E5E5] flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="px-3 pt-4 pb-2 flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-[#F0F0F0] text-[#0A0A0A] flex items-center justify-center text-xs font-bold">
          K
        </div>
        <span className="text-sm font-semibold text-[#0A0A0A]">Kairo</span>
      </div>

      {/* Action buttons */}
      <div className="px-2 space-y-0.5 mt-1">
        <button
          onClick={handleNew}
          className="w-full flex items-center gap-2 px-3 h-9 rounded-lg text-sm text-[#525252] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
        >
          <MessageSquarePlus size={16} className="text-[#A3A3A3]" />
          New Chat
        </button>
        <button
          onClick={function() { router.push("/dashboards"); }}
          className={"w-full flex items-center gap-2 px-3 h-9 rounded-lg text-sm transition-colors " + (pathname.startsWith("/dashboards") ? "bg-[#F0F0F0] text-[#0A0A0A] font-medium" : "text-[#525252] hover:bg-[#F5F5F5] hover:text-[#0A0A0A]")}
        >
          <LayoutDashboard size={16} className={pathname.startsWith("/dashboards") ? "text-[#0A0A0A]" : "text-[#A3A3A3]"} />
          Dashboards
        </button>
        <button
          onClick={function() { router.push("/dashboards/icp"); }}
          className={"w-full flex items-center gap-2 px-3 h-9 rounded-lg text-sm transition-colors " + (pathname === "/dashboards/icp" ? "bg-[#F0F0F0] text-[#0A0A0A] font-medium" : "text-[#525252] hover:bg-[#F5F5F5] hover:text-[#0A0A0A]")}
        >
          <Target size={16} className={pathname === "/dashboards/icp" ? "text-[#0A0A0A]" : "text-[#A3A3A3]"} />
          ICP
        </button>
        <button
          onClick={function() { setSearchOpen(!searchOpen); }}
          className="w-full flex items-center gap-2 px-3 h-9 rounded-lg text-sm text-[#525252] hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-colors"
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
            onChange={function(e) { setSearchQuery(e.target.value); }}
            placeholder="Search conversations..."
            autoFocus
            className="w-full h-8 px-2.5 text-xs rounded-lg border border-[#E5E5E5] bg-[#FAFAFA] text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-white/20"
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
        {filteredGrouped.map(function(group) {
          return (
            <div key={group.label} className="mb-2">
              <div className="text-[10px] uppercase tracking-wider text-[#A3A3A3] font-medium px-3 mt-3 mb-1">
                {group.label}
              </div>
              {group.items.map(function(conv) {
                return (
                  <div key={conv.id} className="group relative">
                    <button
                      onMouseEnter={function() { handleHover(conv.id); }}
                      onClick={function() { router.push("/chat/" + conv.id); }}
                      className={"w-full text-left text-sm truncate px-3 pr-8 h-8 flex items-center rounded-lg transition-colors " + (activeId === conv.id ? "bg-[#F0F0F0] text-[#0A0A0A] font-medium" : "text-[#525252] hover:bg-[#F5F5F5]")}
                    >
                      <span className="block truncate max-w-[140px]">{conv.title || "New Chat"}</span>
                    </button>
                    <button
                      onClick={function(e) {
                        e.stopPropagation();
                        handleDelete(conv.id);
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex h-6 w-6 items-center justify-center rounded text-[#A3A3A3] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#E5E5E5] px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#F0F0F0] flex items-center justify-center text-xs font-medium text-[#0A0A0A] shrink-0">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0A0A0A] truncate">{userEmail}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <button
            onClick={function() { router.push("/settings"); }}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
          >
            <Settings size={14} />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs text-[#A3A3A3] hover:bg-[#F5F5F5] hover:text-[#525252] transition-colors"
          >
            <LogOut size={14} />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
