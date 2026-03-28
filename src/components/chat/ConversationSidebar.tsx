"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Search,
  Settings,
  LogOut,
  Trash2,
  LayoutDashboard,
  Target,
  Bell,
  MessageSquare,
  ChevronsUpDown,
  Sparkles,
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
    { label: "Aujourd'hui", items: [] },
    { label: "Hier", items: [] },
    { label: "7 derniers jours", items: [] },
    { label: "Plus ancien", items: [] },
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

var NAV_ITEMS = [
  { id: "dashboards", label: "Dashboards", icon: LayoutDashboard, path: "/dashboards" },
  { id: "icp", label: "ICP", icon: Target, path: "/dashboards/icp" },
  { id: "alerts", label: "Monitoring", icon: Bell, path: "/alerts" },
];

export default function ConversationSidebar() {
  var [conversations, setConversations] = useState<Conversation[]>([]);
  var [userEmail, setUserEmail] = useState("");
  var [searchQuery, setSearchQuery] = useState("");
  var [searchFocused, setSearchFocused] = useState(false);
  var [credits, setCredits] = useState<{ used: number; total: number; remaining: number; plan: string } | null>(null);
  var [alertCount, setAlertCount] = useState(0);
  var [userMenuOpen, setUserMenuOpen] = useState(false);
  var searchRef = useRef<HTMLInputElement>(null);
  var userMenuRef = useRef<HTMLDivElement>(null);
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
    fetch("/api/credits").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data) setCredits(json.data);
    }).catch(function() {});
    fetch("/api/alerts").then(function(r) { return r.json(); }).then(function(json) {
      if (json.data?.counts) setAlertCount(json.data.counts.total);
    }).catch(function() {});
  }, [pathname]);

  // Close user menu on outside click
  useEffect(function() {
    if (!userMenuOpen) return;
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return function() { document.removeEventListener("mousedown", handleClick); };
  }, [userMenuOpen]);

  // Keyboard shortcut: Cmd+K for search
  useEffect(function() {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return function() { document.removeEventListener("keydown", handleKeyDown); };
  }, []);

  function handleNew() {
    router.push("/chat");
  }

  async function handleDelete(id: string) {
    setConversations(function(prev) { return prev.filter(function(c) { return c.id !== id; }); });
    await fetch("/api/conversations/" + id, { method: "DELETE" });
    if (pathname === "/chat/" + id) router.push("/chat");
  }

  async function handleLogout() {
    var supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  var grouped = groupByDate(conversations);

  var filteredGrouped = searchQuery
    ? grouped
        .map(function(g) {
          return { label: g.label, items: g.items.filter(function(c) { return c.title.toLowerCase().includes(searchQuery.toLowerCase()); }) };
        })
        .filter(function(g) { return g.items.length > 0; })
    : grouped;

  var userInitial = userEmail ? userEmail[0].toUpperCase() : "?";
  var userName = userEmail ? userEmail.split("@")[0] : "";
  var creditPct = credits ? credits.remaining / credits.total : 1;

  return (
    <aside className="w-[260px] bg-[#FAFAFA] border-r border-[#EBEBEB] flex flex-col h-full shrink-0">

      {/* ── Header ── */}
      <div className="px-3 pt-3.5 pb-1">
        {/* Logo + New Chat */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[#0A0A0A] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold tracking-tight">K</span>
            </div>
            <span className="text-[13px] font-semibold text-[#0A0A0A]">Kairo</span>
            {credits && (
              <span className="text-[9px] font-medium text-[#A3A3A3] bg-[#F0F0F0] px-1.5 py-0.5 rounded uppercase tracking-wider">
                {credits.plan}
              </span>
            )}
          </div>
          <button
            onClick={handleNew}
            className="h-7 w-7 rounded-lg bg-[#0A0A0A] hover:bg-[#333] text-white flex items-center justify-center transition-colors"
            title="Nouvelle conversation"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#B0B0B0]" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={function(e) { setSearchQuery(e.target.value); }}
            onFocus={function() { setSearchFocused(true); }}
            onBlur={function() { setSearchFocused(false); }}
            placeholder="Rechercher..."
            className={"w-full h-8 pl-8 pr-8 text-[12px] rounded-lg border bg-white text-[#0A0A0A] placeholder:text-[#C0C0C0] focus:outline-none transition-all " + (searchFocused ? "border-[#D4D4D4] ring-1 ring-[#E5E5E5]" : "border-[#EBEBEB]")}
          />
          {!searchQuery && !searchFocused && (
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-[#C0C0C0] bg-[#F5F5F5] border border-[#E5E5E5] rounded px-1 py-0.5 font-mono">
              ⌘K
            </kbd>
          )}
          {searchQuery && (
            <button
              onClick={function() { setSearchQuery(""); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C0C0C0] hover:text-[#737373]"
            >
              <Plus size={12} className="rotate-45" />
            </button>
          )}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="px-2 space-y-0.5">
        {NAV_ITEMS.map(function(item) {
          var isActive = item.path === "/dashboards"
            ? pathname.startsWith("/dashboards") && pathname !== "/dashboards/icp"
            : pathname === item.path;
          var Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={function() { router.push(item.path); }}
              className={"w-full flex items-center gap-2.5 px-3 h-8 rounded-lg text-[13px] transition-all " + (isActive ? "bg-white text-[#0A0A0A] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#EBEBEB]" : "text-[#737373] hover:text-[#0A0A0A] hover:bg-white/60")}
            >
              <Icon size={15} className={isActive ? "text-[#0A0A0A]" : "text-[#A3A3A3]"} strokeWidth={isActive ? 2 : 1.75} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === "alerts" && alertCount > 0 && (
                <span className="text-[9px] font-bold text-white bg-[#EF4444] rounded-full h-[18px] min-w-[18px] flex items-center justify-center px-1 leading-none">
                  {alertCount > 9 ? "9+" : alertCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Separator ── */}
      <div className="mx-3 my-2.5 border-t border-[#EBEBEB]" />

      {/* ── Conversation list ── */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        {filteredGrouped.length === 0 && !searchQuery && (
          <div className="px-3 py-8 text-center">
            <MessageSquare size={20} className="text-[#D4D4D4] mx-auto mb-2" />
            <p className="text-[11px] text-[#B0B0B0]">Aucune conversation</p>
          </div>
        )}
        {filteredGrouped.length === 0 && searchQuery && (
          <p className="px-3 py-4 text-[11px] text-[#B0B0B0] text-center">Aucun resultat pour &ldquo;{searchQuery}&rdquo;</p>
        )}
        {filteredGrouped.map(function(group) {
          return (
            <div key={group.label} className="mb-1">
              <div className="text-[10px] uppercase tracking-wider text-[#B0B0B0] font-medium px-3 mt-3 mb-1 select-none">
                {group.label}
              </div>
              {group.items.map(function(conv) {
                var isActive = activeId === conv.id;
                return (
                  <div key={conv.id} className="group relative">
                    <button
                      onClick={function() { router.push("/chat/" + conv.id); }}
                      className={"w-full text-left text-[13px] truncate px-3 pr-8 h-8 flex items-center rounded-lg transition-all " + (isActive ? "bg-white text-[#0A0A0A] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#EBEBEB]" : "text-[#737373] hover:text-[#0A0A0A] hover:bg-white/60")}
                    >
                      <span className="block truncate">{conv.title || "Nouvelle conversation"}</span>
                    </button>
                    <button
                      onClick={function(e) { e.stopPropagation(); handleDelete(conv.id); }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 hidden group-hover:flex h-6 w-6 items-center justify-center rounded-md text-[#C0C0C0] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── Bottom ── */}
      <div className="border-t border-[#EBEBEB] p-3 space-y-3">
        {/* Credits */}
        {credits && (
          <button
            onClick={function() { router.push("/settings?tab=billing"); }}
            className="w-full group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#A3A3A3] group-hover:text-[#6366F1] transition-colors" />
                <span className="text-[10px] font-medium text-[#A3A3A3] group-hover:text-[#525252] transition-colors">
                  {credits.remaining.toLocaleString()} credits
                </span>
              </div>
              <span className="text-[9px] text-[#C0C0C0] tabular-nums">
                {Math.round(creditPct * 100)}%
              </span>
            </div>
            <div className="h-1 bg-[#EBEBEB] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: Math.max(1, Math.round(creditPct * 100)) + "%",
                  backgroundColor: creditPct > 0.2 ? "#0A0A0A" : creditPct > 0.05 ? "#F59E0B" : "#EF4444",
                }}
              />
            </div>
          </button>
        )}

        {/* User */}
        <div ref={userMenuRef} className="relative">
          <button
            onClick={function() { setUserMenuOpen(!userMenuOpen); }}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 -mx-0.5 rounded-lg hover:bg-white transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#0A0A0A] to-[#525252] flex items-center justify-center text-[10px] font-semibold text-white shrink-0">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[12px] font-medium text-[#0A0A0A] truncate">{userName}</p>
            </div>
            <ChevronsUpDown size={13} className="text-[#C0C0C0] shrink-0" />
          </button>

          {/* User menu popover */}
          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-white rounded-xl border border-[#EBEBEB] shadow-lg overflow-hidden z-50">
              <div className="px-3 py-2.5 border-b border-[#F5F5F5]">
                <p className="text-[12px] font-medium text-[#0A0A0A] truncate">{userEmail}</p>
                {credits && (
                  <p className="text-[10px] text-[#A3A3A3] mt-0.5 capitalize">{credits.plan} plan</p>
                )}
              </div>
              <div className="p-1">
                <button
                  onClick={function() { setUserMenuOpen(false); router.push("/settings"); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] text-[#525252] hover:bg-[#F5F5F5] transition-colors"
                >
                  <Settings size={13} className="text-[#A3A3A3]" />
                  Parametres
                </button>
                <button
                  onClick={function() { setUserMenuOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] text-[#525252] hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors"
                >
                  <LogOut size={13} className="text-[#A3A3A3]" />
                  Deconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
