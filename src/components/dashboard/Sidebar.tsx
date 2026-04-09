"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const homeItems: NavItem[] = [
  { href: "/dashboard", label: "Score", icon: LayoutDashboard },
];

const analyseItems: NavItem[] = [
  { href: "/dashboard/lead-management", label: "Leads", icon: Users },
  { href: "/dashboard/pipeline", label: "Pipeline", icon: GitBranch },
  { href: "/dashboard/velocity", label: "Velocity", icon: Gauge },
  { href: "/dashboard/closing", label: "Closing", icon: Target },
  { href: "/dashboard/revenue", label: "Revenue", icon: DollarSign },
  { href: "/dashboard/activity", label: "Activit\u00e9", icon: Activity },
  { href: "/dashboard/data-quality", label: "Data Quality", icon: Database },
];

const pilotageItems: NavItem[] = [
  { href: "/dashboard/cockpit", label: "Cockpit", icon: Compass },
];

function NavSection({ label, items }: { label: string; items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <div className="mb-3">
      <div className="px-3 mb-1">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 h-8 px-3 rounded text-sm ${
                isActive
                  ? "text-sidebar-active font-medium bg-sidebar-active-bg"
                  : "font-normal text-sidebar-foreground hover:bg-sidebar-hover"
              }`}
            >
              <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isSettingsActive = pathname === "/settings";

  return (
    <aside className="w-[220px] bg-sidebar-background border-r border-sidebar-border flex flex-col h-full shrink-0">
      <div className="px-4 py-4">
        <span className="text-sm font-semibold text-foreground">RevOps AI</span>
      </div>

      <div className="border-b border-sidebar-border" />

      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        <NavSection label="HOME" items={homeItems} />
        <NavSection label="ANALYSE" items={analyseItems} />
        <NavSection label="PILOTAGE" items={pilotageItems} />
      </nav>

      <div className="border-t border-sidebar-border" />

      <div className="px-2 py-3">
        <Link
          href="/settings"
          className={`flex items-center gap-2 h-8 px-3 rounded text-sm ${
            isSettingsActive
              ? "text-sidebar-active font-medium bg-sidebar-active-bg"
              : "font-normal text-sidebar-foreground hover:bg-sidebar-hover"
          }`}
        >
          <Settings size={15} strokeWidth={isSettingsActive ? 2 : 1.5} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
