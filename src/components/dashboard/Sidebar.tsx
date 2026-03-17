"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Users,
  GitBranch,
  Gauge,
  Target,
  DollarSign,
  Activity,
  Database,
  Compass,
  Settings,
  LogOut,
} from "lucide-react";

const NAV_SECTIONS = [
  {
    label: "HOME",
    items: [
      { href: "/dashboard", label: "Score", icon: LayoutDashboard },
    ],
  },
  {
    label: "ANALYSE",
    items: [
      { href: "/dashboard/lead-management", label: "Leads", icon: Users },
      { href: "/dashboard/pipeline", label: "Pipeline", icon: GitBranch },
      { href: "/dashboard/velocity", label: "Velocity", icon: Gauge },
      { href: "/dashboard/closing", label: "Closing", icon: Target },
      { href: "/dashboard/revenue", label: "Revenue", icon: DollarSign },
      { href: "/dashboard/activity", label: "Activite", icon: Activity },
      { href: "/dashboard/data-quality", label: "Data Quality", icon: Database },
    ],
  },
  {
    label: "PILOTAGE",
    items: [
      { href: "/dashboard/cockpit", label: "Cockpit", icon: Compass },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const isActive = (href: string) =>
    href === "/dashboard" ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex w-[220px] flex-col border-r border-[#F0F0F0] bg-[#FAFAFA]">
      <div className="px-4 py-4">
        <span className="text-sm font-semibold text-[#0A0A0A]">RevOps AI</span>
      </div>

      <nav className="flex-1 px-2 space-y-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#737373]">
              {section.label}
            </p>
            <div className="mt-1 space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded px-3 h-8 text-sm transition-colors ${
                      active
                        ? "bg-[#F5F5F5] font-medium text-[#0A0A0A]"
                        : "font-normal text-[#525252] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-[#F0F0F0] px-2 py-2">
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-2 rounded px-3 h-8 text-sm transition-colors ${
            pathname === "/dashboard/settings"
              ? "bg-[#F5F5F5] font-medium text-[#0A0A0A]"
              : "font-normal text-[#525252] hover:bg-[#F5F5F5]"
          }`}
        >
          <Settings size={16} strokeWidth={1.5} />
          Settings
        </Link>
      </div>

      <div className="border-t border-[#F0F0F0] px-3 py-3">
        {userEmail && (
          <p className="text-xs text-[#737373] truncate mb-2">{userEmail}</p>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded px-3 h-8 text-sm font-normal text-[#525252] hover:bg-[#F5F5F5]"
        >
          <LogOut size={16} strokeWidth={1.5} />
          Deconnexion
        </button>
      </div>
    </aside>
  );
}
