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
  CheckSquare,
  ChevronRight,
} from "lucide-react";

interface Conversation {
  id: string;
  title: string;
  last_message_at: string | null;
  created_at: string;
}

type GroupedConversations = { label: string; items: Conversation[] }[];

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
    if (res.ok) { var json = await res.json(); setConversations(json.data ?? []); }
  }, []);

  useEffect(function() { fetchConversations(); }, [fetchConversations, pathname]);

  useEffect(function() {
    var supabase = createClient();
    supabase.auth.getUser().then(function({ data }) { setUserEmail(data.user?.email ?? ""); });
    fetch("/api/credits").then(function(r) { return r.json(); }).then(function(json) { if (json.data) setCredits(json.data); }).catch(function() {});
    fetch("/api/alerts").then(function(r) { return r.json(); }).then(function(json) { if (json.data?.counts) setAlertCount(json.data.counts.total); }).catch(function() {});
  }, [pathname]);

  useEffect(function() {
    if (!userMenuOpen) return;
    function handleClick(e: MouseEvent) { if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false); }
    document.addEventListener("mousedown", handleClick);
    return function() { document.removeEventListener("mousedown", handleClick); };
  }, [userMenuOpen]);

  useEffect(function() {
    function handleKeyDown(e: KeyboardEvent) { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); searchRef.current?.focus(); } }
    document.addEventListener("keydown", handleKeyDown);
    return function() { document.removeEventListener("keydown", handleKeyDown); };
  }, []);

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
    ? grouped.map(function(g) { return { label: g.label, items: g.items.filter(function(c) { return c.title.toLowerCase().includes(searchQuery.toLowerCase()); }) }; }).filter(function(g) { return g.items.length > 0; })
    : grouped;

  var userInitial = userEmail ? userEmail[0].toUpperCase() : "?";
  var userName = userEmail ? userEmail.split("@")[0] : "";
  var creditPct = credits ? credits.remaining / credits.total : 1;

  // Navigation items
  var navMain = [
    { label: "Dashboards", icon: LayoutDashboard, path: "/dashboards", match: function(p: string) { return p.startsWith("/dashboards") && p !== "/dashboards/icp"; } },
    { label: "Actions", icon: CheckSquare, path: "/actions", match: function(p: string) { return p === "/actions"; } },
    { label: "Monitoring", icon: Bell, path: "/alerts", badge: alertCount, match: function(p: string) { return p === "/alerts"; } },
    { label: "ICP", icon: Target, path: "/dashboards/icp", match: function(p: string) { return p === "/dashboards/icp"; } },
  ];

  return (
    <aside className="w-[252px] bg-white border-r border-[#E8E8E8] flex flex-col h-full shrink-0 select-none">

      {/* ── Logo ── */}
      <div className="h-[52px] flex items-center justify-between px-4 border-b border-[#E8E8E8] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[#111] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">K</span>
          </div>
          <span className="text-[14px] font-semibold text-[#111]">Kairo</span>
          {credits && (
            <span className="text-[9px] font-medium text-[#999] bg-[#F5F5F5] px-1.5 py-[2px] rounded uppercase tracking-wider leading-none">
              {credits.plan}
            </span>
          )}
        </div>
        <button
          onClick={function() { router.push("/chat"); }}
          className="h-7 w-7 rounded-md border border-[#E8E8E8] hover:bg-[#F5F5F5] flex items-center justify-center text-[#999] hover:text-[#111] transition-colors"
          title="Nouvelle conversation"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* ── Search ── */}
      <div className="px-3 py-2.5 border-b border-[#E8E8E8] shrink-0">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#CCC]" />
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={function(e) { setSearchQuery(e.target.value); }}
            onFocus={function() { setSearchFocused(true); }}
            onBlur={function() { setSearchFocused(false); }}
            placeholder="Rechercher..."
            className={"w-full h-8 pl-8 pr-8 text-[12px] rounded-md border bg-[#FAFAFA] text-[#111] placeholder:text-[#CCC] focus:outline-none focus:bg-white transition-all " + (searchFocused ? "border-[#111]" : "border-[#E8E8E8]")}
          />
          {!searchQuery && !searchFocused && (
            <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-[#CCC] border border-[#E8E8E8] rounded px-1 py-[1px] font-mono bg-white leading-none">⌘K</kbd>
          )}
          {searchQuery && (
            <button onClick={function() { setSearchQuery(""); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#CCC] hover:text-[#999]">
              <Plus size={11} className="rotate-45" />
            </button>
          )}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="px-2 py-2 border-b border-[#E8E8E8] shrink-0">
        <p className="text-[10px] font-semibold text-[#BBB] uppercase tracking-wider px-2 mb-1">Modules</p>
        {navMain.map(function(item) {
          var isActive = item.match(pathname);
          var Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={function() { router.push(item.path); }}
              className={"w-full flex items-center gap-2 px-2 h-8 rounded-md text-[13px] transition-colors " + (isActive ? "bg-[#F5F5F5] text-[#111] font-medium" : "text-[#666] hover:text-[#111] hover:bg-[#FAFAFA]")}
            >
              <Icon size={15} className={isActive ? "text-[#111]" : "text-[#BBB]"} strokeWidth={isActive ? 2 : 1.5} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && item.badge > 0 ? (
                <span className="text-[9px] font-bold text-white bg-[#EF4444] rounded-full h-[16px] min-w-[16px] flex items-center justify-center px-1 leading-none">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* ── Conversations ── */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <p className="text-[10px] font-semibold text-[#BBB] uppercase tracking-wider px-2 mb-1">Conversations</p>
        {filteredGrouped.length === 0 && !searchQuery && (
          <div className="px-2 py-6 text-center">
            <MessageSquare size={18} className="text-[#DDD] mx-auto mb-1.5" />
            <p className="text-[11px] text-[#CCC]">Aucune conversation</p>
          </div>
        )}
        {filteredGrouped.length === 0 && searchQuery && (
          <p className="px-2 py-3 text-[11px] text-[#CCC] text-center">Aucun resultat</p>
        )}
        {filteredGrouped.map(function(group) {
          return (
            <div key={group.label} className="mb-1">
              <div className="text-[10px] text-[#CCC] font-medium px-2 mt-2.5 mb-0.5">{group.label}</div>
              {group.items.map(function(conv) {
                var isActive = activeId === conv.id;
                return (
                  <div key={conv.id} className="group relative">
                    <button
                      onClick={function() { router.push("/chat/" + conv.id); }}
                      className={"w-full text-left text-[13px] truncate px-2 pr-7 h-8 flex items-center rounded-md transition-colors " + (isActive ? "bg-[#F5F5F5] text-[#111] font-medium" : "text-[#666] hover:bg-[#FAFAFA] hover:text-[#111]")}
                    >
                      <span className="block truncate">{conv.title || "Nouvelle conversation"}</span>
                    </button>
                    <button
                      onClick={function(e) { e.stopPropagation(); handleDelete(conv.id); }}
                      className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex h-5 w-5 items-center justify-center rounded text-[#CCC] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── Bottom ── */}
      <div className="border-t border-[#E8E8E8] p-3 space-y-2.5 shrink-0">
        {/* Credits */}
        {credits && (
          <button onClick={function() { router.push("/settings?tab=billing"); }} className="w-full group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-[#BBB] group-hover:text-[#666] transition-colors">
                {credits.remaining.toLocaleString()} credits
              </span>
              <span className="text-[9px] text-[#DDD] tabular-nums">{Math.round(creditPct * 100)}%</span>
            </div>
            <div className="h-[3px] bg-[#F0F0F0] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: Math.max(1, Math.round(creditPct * 100)) + "%",
                  backgroundColor: creditPct > 0.2 ? "#111" : creditPct > 0.05 ? "#F59E0B" : "#EF4444",
                }}
              />
            </div>
          </button>
        )}

        {/* User */}
        <div ref={userMenuRef} className="relative">
          <button
            onClick={function() { setUserMenuOpen(!userMenuOpen); }}
            className="w-full flex items-center gap-2 px-1 py-1 -mx-0.5 rounded-md hover:bg-[#FAFAFA] transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-[#111] flex items-center justify-center text-[10px] font-semibold text-white shrink-0">
              {userInitial}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[12px] font-medium text-[#111] truncate">{userName}</p>
            </div>
            <ChevronsUpDown size={12} className="text-[#CCC] shrink-0" />
          </button>

          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-white rounded-lg border border-[#E8E8E8] shadow-lg overflow-hidden z-50">
              <div className="px-3 py-2.5 border-b border-[#F0F0F0]">
                <p className="text-[12px] font-medium text-[#111] truncate">{userEmail}</p>
                {credits && <p className="text-[10px] text-[#999] mt-0.5 capitalize">{credits.plan}</p>}
              </div>
              <div className="p-1">
                <button
                  onClick={function() { setUserMenuOpen(false); router.push("/settings"); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12px] text-[#666] hover:bg-[#F5F5F5] hover:text-[#111] transition-colors"
                >
                  <Settings size={13} className="text-[#BBB]" /> Parametres
                </button>
                <button
                  onClick={function() { setUserMenuOpen(false); handleLogout(); }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[12px] text-[#666] hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors"
                >
                  <LogOut size={13} className="text-[#BBB]" /> Deconnexion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
