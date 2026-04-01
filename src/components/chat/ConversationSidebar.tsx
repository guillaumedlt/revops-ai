"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getStreamingIds } from "@/lib/streaming-tracker";
import {
  Plus, Search, Settings, LogOut, Trash2, LayoutDashboard, Target, Shield,
  Bell, MessageSquare, ChevronsUpDown, CheckSquare, HelpCircle, Archive, GraduationCap,
} from "lucide-react";

interface Conversation { id: string; title: string; last_message_at: string | null; created_at: string; }
type GroupedConversations = { label: string; items: Conversation[] }[];

function groupByDate(convs: Conversation[]): GroupedConversations {
  var now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var yesterday = new Date(today.getTime() - 86400000), weekAgo = new Date(today.getTime() - 7 * 86400000);
  var g: GroupedConversations = [{ label: "Today", items: [] }, { label: "Yesterday", items: [] }, { label: "Last 7 days", items: [] }, { label: "Older", items: [] }];
  convs.forEach(function(c) { var d = new Date(c.last_message_at || c.created_at); if (d >= today) g[0].items.push(c); else if (d >= yesterday) g[1].items.push(c); else if (d >= weekAgo) g[2].items.push(c); else g[3].items.push(c); });
  return g.filter(function(x) { return x.items.length > 0; });
}

export default function ConversationSidebar() {
  var [conversations, setConversations] = useState<Conversation[]>([]);
  var [userEmail, setUserEmail] = useState("");
  var [isAdmin, setIsAdmin] = useState(false);
  var [searchQuery, setSearchQuery] = useState("");
  var [credits, setCredits] = useState<{ used: number; total: number; remaining: number; plan: string } | null>(null);
  var [alertCount, setAlertCount] = useState(0);
  var [streamingConvs, setStreamingConvs] = useState<Set<string>>(new Set());

  // Poll streaming status every 500ms
  useEffect(function() {
    var interval = setInterval(function() {
      var ids = getStreamingIds();
      setStreamingConvs(function(prev) {
        if (ids.length === 0 && prev.size === 0) return prev;
        return new Set(ids);
      });
    }, 500);
    return function() { clearInterval(interval); };
  }, []);
  var [userMenuOpen, setUserMenuOpen] = useState(false);
  var searchRef = useRef<HTMLInputElement>(null);
  var userMenuRef = useRef<HTMLDivElement>(null);
  var pathname = usePathname();
  var router = useRouter();
  var activeId = pathname.startsWith("/chat/") ? pathname.split("/")[2] : null;

  var fetchConversations = useCallback(async function() { var res = await fetch("/api/conversations"); if (res.ok) { var json = await res.json(); setConversations(json.data ?? []); } }, []);

  // Load conversations only when navigating to/from chat pages
  var prevPathRef = useRef(pathname);
  useEffect(function() {
    var prev = prevPathRef.current;
    prevPathRef.current = pathname;
    // Refresh conversations only when entering chat or leaving a conversation
    if (pathname.startsWith("/chat") || prev.startsWith("/chat/")) {
      fetchConversations();
    }
  }, [fetchConversations, pathname]);

  // Load user, credits, alerts ONCE on mount + refresh credits every 60s
  useEffect(function() {
    var supabase = createClient(); supabase.auth.getUser().then(function({ data }) { setUserEmail(data.user?.email ?? ""); });
    fetch("/api/admin/stats").then(function(r) { if (r.ok) setIsAdmin(true); }).catch(function() {});
    fetch("/api/credits").then(function(r) { return r.json(); }).then(function(json) { if (json.data) setCredits(json.data); }).catch(function() {});
    fetch("/api/alerts").then(function(r) { return r.json(); }).then(function(json) { if (json.data?.counts) setAlertCount(json.data.counts.total); }).catch(function() {});
    fetchConversations();
    // Refresh credits + alerts every 60s
    var interval = setInterval(function() {
      fetch("/api/credits").then(function(r) { return r.json(); }).then(function(json) { if (json.data) setCredits(json.data); }).catch(function() {});
      fetch("/api/alerts").then(function(r) { return r.json(); }).then(function(json) { if (json.data?.counts) setAlertCount(json.data.counts.total); }).catch(function() {});
    }, 60000);
    return function() { clearInterval(interval); };
  }, [fetchConversations]);
  useEffect(function() { if (!userMenuOpen) return; function h(e: MouseEvent) { if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false); } document.addEventListener("mousedown", h); return function() { document.removeEventListener("mousedown", h); }; }, [userMenuOpen]);
  useEffect(function() { function h(e: KeyboardEvent) { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); searchRef.current?.focus(); } } document.addEventListener("keydown", h); return function() { document.removeEventListener("keydown", h); }; }, []);

  // Prefetch main pages for instant navigation
  useEffect(function() {
    router.prefetch("/chat");
    router.prefetch("/dashboards");
    router.prefetch("/actions");
    router.prefetch("/alerts");
    router.prefetch("/settings");
  }, [router]);

  async function handleDelete(id: string) { setConversations(function(p) { return p.filter(function(c) { return c.id !== id; }); }); await fetch("/api/conversations/" + id, { method: "DELETE" }); if (pathname === "/chat/" + id) router.push("/chat"); }
  async function handleLogout() { var s = createClient(); await s.auth.signOut(); router.push("/login"); }

  var grouped = groupByDate(conversations);
  var filtered = searchQuery ? grouped.map(function(g) { return { label: g.label, items: g.items.filter(function(c) { return c.title.toLowerCase().includes(searchQuery.toLowerCase()); }) }; }).filter(function(g) { return g.items.length > 0; }) : grouped;
  var userInitial = userEmail ? userEmail[0].toUpperCase() : "?";
  var creditPct = credits ? credits.remaining / credits.total : 1;

  function navItem(label: string, Icon: any, path: string, isActive: boolean, badge?: number) {
    return (
      <button key={path} onClick={function() { router.push(path); }}
        className={"w-full flex items-center gap-2.5 px-3 h-[34px] rounded text-[13px] transition-colors " + (isActive ? "bg-[#F5F5F5] text-[#111] font-medium" : "text-[#555] hover:bg-[#FAFAFA] hover:text-[#111]")}>
        <Icon size={16} className={isActive ? "text-[#111]" : "text-[#BBB]"} strokeWidth={1.5} />
        <span className="flex-1 text-left truncate">{label}</span>
        {badge && badge > 0 ? <span className="text-[9px] font-bold text-white bg-[#EF4444] rounded-full h-4 min-w-[16px] flex items-center justify-center px-1">{badge > 9 ? "9+" : badge}</span> : null}
      </button>
    );
  }

  return (
    <aside className="w-[240px] bg-white border-r border-[#EAEAEA] flex flex-col h-full shrink-0">
      {/* Logo */}
      <div className="h-[49px] flex items-center gap-2.5 px-4 border-b border-[#EAEAEA] shrink-0">
        <div className="h-6 w-6 rounded bg-[#111] flex items-center justify-center"><span className="text-white text-[9px] font-bold">K</span></div>
        <span className="text-[14px] font-semibold text-[#111]">Kairo</span>
        {credits && <span className="text-[9px] text-[#AAA] bg-[#F5F5F5] px-1.5 py-[1px] rounded font-medium uppercase tracking-wider">{credits.plan}</span>}
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-1.5">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#CCC]" />
          <input ref={searchRef} type="text" value={searchQuery} onChange={function(e) { setSearchQuery(e.target.value); }} placeholder="Search..." className="w-full h-[30px] pl-8 pr-8 text-[12px] rounded border border-[#EAEAEA] bg-white text-[#111] placeholder:text-[#CCC] focus:outline-none focus:border-[#111] transition-colors" />
          {!searchQuery && <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[8px] text-[#CCC] border border-[#EAEAEA] rounded px-1 py-[1px] font-mono bg-[#FAFAFA]">⌘K</kbd>}
          {searchQuery && <button onClick={function() { setSearchQuery(""); }} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#CCC] hover:text-[#999]"><Plus size={10} className="rotate-45" /></button>}
        </div>
      </div>

      {/* Top nav */}
      <div className="px-2 pb-1.5 space-y-[1px]">
        {navItem("Dashboards", LayoutDashboard, "/dashboards", pathname.startsWith("/dashboards") && pathname !== "/dashboards/icp")}
        {navItem("Actions", CheckSquare, "/actions", pathname === "/actions")}
        {navItem("Monitoring", Bell, "/alerts", pathname === "/alerts", alertCount)}
        {navItem("Training", GraduationCap, "/training", pathname === "/training")}
        {navItem("ICP", Target, "/dashboards/icp", pathname === "/dashboards/icp")}
      </div>

      {/* Separator + conversations label */}
      <div className="px-3 pt-2 pb-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold text-[#BBB] uppercase tracking-wider">Conversations</span>
          <button onClick={function() { router.push("/chat"); }} className="h-5 w-5 rounded flex items-center justify-center text-[#CCC] hover:text-[#111] hover:bg-[#F5F5F5] transition-colors"><Plus size={12} /></button>
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-2">
        {filtered.length === 0 && !searchQuery && <div className="px-2 py-8 text-center"><MessageSquare size={16} className="text-[#DDD] mx-auto mb-1" /><p className="text-[11px] text-[#CCC]">No conversations yet</p></div>}
        {filtered.length === 0 && searchQuery && <p className="px-2 py-4 text-[11px] text-[#CCC] text-center">No results</p>}
        {filtered.map(function(group) {
          return (
            <div key={group.label} className="mb-0.5">
              <div className="text-[10px] text-[#CCC] font-medium px-2 mt-2 mb-0.5">{group.label}</div>
              {group.items.map(function(conv) {
                var isActive = activeId === conv.id;
                return (
                  <div key={conv.id} className="group relative">
                    <button onClick={function() { router.push("/chat/" + conv.id); }}
                      className={"w-full text-left text-[13px] truncate px-2 pr-7 h-[30px] flex items-center rounded transition-colors " + (isActive ? "bg-[#F5F5F5] text-[#111] font-medium" : "text-[#555] hover:bg-[#FAFAFA] hover:text-[#111]")}>
                      <span className="block truncate">{conv.title || "New conversation"}</span>
                    </button>
                    {streamingConvs.has(conv.id) ? (
                      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 h-4 w-4 border-[1.5px] border-[#EAEAEA] border-t-[#6366F1] rounded-full animate-spin" />
                    ) : (
                      <button onClick={function(e) { e.stopPropagation(); handleDelete(conv.id); }}
                        className="absolute right-1 top-1/2 -translate-y-1/2 hidden group-hover:flex h-5 w-5 items-center justify-center rounded text-[#DDD] hover:text-[#EF4444] hover:bg-[#FEF2F2] transition-colors">
                        <Trash2 size={11} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom */}
      <div className="border-t border-[#EAEAEA] px-3 py-2.5 space-y-2 shrink-0">
        {credits && (
          <button onClick={function() { router.push("/settings?tab=billing"); }} className="w-full">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] text-[#BBB]">{credits.remaining.toLocaleString()} credits</span>
              <span className="text-[9px] text-[#DDD] tabular-nums">{Math.round(creditPct * 100)}%</span>
            </div>
            <div className="h-[2px] bg-[#F0F0F0] rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: Math.max(1, Math.round(creditPct * 100)) + "%", backgroundColor: creditPct > 0.2 ? "#111" : creditPct > 0.05 ? "#F59E0B" : "#EF4444" }} />
            </div>
          </button>
        )}

        {/* Bottom links */}
        <div className="space-y-[1px]">
          <button onClick={function() { router.push("/guide"); }}
            className={"w-full flex items-center gap-2.5 px-1 h-[30px] rounded text-[12px] transition-colors " + (pathname === "/guide" ? "text-[#111] bg-[#F5F5F5]" : "text-[#999] hover:text-[#111] hover:bg-[#FAFAFA]")}>
            <HelpCircle size={14} className={pathname === "/guide" ? "text-[#111]" : "text-[#CCC]"} /> Guide
          </button>
          <button onClick={function() { router.push("/settings"); }}
            className={"w-full flex items-center gap-2.5 px-1 h-[30px] rounded text-[12px] transition-colors " + (pathname === "/settings" ? "text-[#111] bg-[#F5F5F5]" : "text-[#999] hover:text-[#111] hover:bg-[#FAFAFA]")}>
            <Settings size={14} className={pathname === "/settings" ? "text-[#111]" : "text-[#CCC]"} /> Settings
          </button>
          {isAdmin && (
            <button onClick={function() { router.push("/admin"); }}
              className={"w-full flex items-center gap-2.5 px-1 h-[30px] rounded text-[12px] transition-colors " + (pathname === "/admin" ? "text-[#6366F1] bg-[#EEF2FF]" : "text-[#999] hover:text-[#6366F1] hover:bg-[#EEF2FF]")}>
              <Shield size={14} className={pathname === "/admin" ? "text-[#6366F1]" : "text-[#CCC]"} /> Admin
            </button>
          )}
        </div>

        {/* User */}
        <div ref={userMenuRef} className="relative">
          <button onClick={function() { setUserMenuOpen(!userMenuOpen); }} className="w-full flex items-center gap-2 px-1 py-1 rounded hover:bg-[#FAFAFA] transition-colors">
            <div className="h-6 w-6 rounded-full bg-[#111] flex items-center justify-center text-[9px] font-semibold text-white shrink-0">{userInitial}</div>
            <span className="flex-1 text-left text-[12px] text-[#111] truncate">{userEmail}</span>
            <ChevronsUpDown size={11} className="text-[#CCC] shrink-0" />
          </button>
          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-lg border border-[#EAEAEA] shadow-lg overflow-hidden z-50">
              <div className="px-3 py-2 border-b border-[#F0F0F0]">
                <p className="text-[12px] font-medium text-[#111] truncate">{userEmail}</p>
                {credits && <p className="text-[10px] text-[#999] capitalize">{credits.plan}</p>}
              </div>
              <div className="p-1">
                <button onClick={function() { setUserMenuOpen(false); handleLogout(); }} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[12px] text-[#555] hover:bg-[#FEF2F2] hover:text-[#EF4444] transition-colors">
                  <LogOut size={13} className="text-[#CCC]" /> Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
