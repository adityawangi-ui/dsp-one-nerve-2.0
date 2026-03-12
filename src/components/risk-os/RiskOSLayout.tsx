import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Activity, Home, ShieldAlert, ChevronLeft, ChevronRight, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { title: "Home", icon: Home, href: "/risk-monitor" },
  { title: "Risk Overview", icon: ShieldAlert, href: "/risk-monitor/risk-overview" },
];

export default function RiskOSLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const now = new Date();
  const timestamp = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) + ", " + now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "bg-card flex flex-col border-r border-border transition-all duration-300 z-40 shrink-0",
        collapsed ? "w-16" : "w-60"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shrink-0">
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-wide">RiskOS</span>
              <span className="text-[10px] text-muted-foreground">Enterprise</span>
            </div>
          )}
          {!collapsed && (
            <span className="ml-auto text-[9px] font-mono-tech bg-accent text-accent-foreground px-1.5 py-0.5 rounded">v2.4</span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/risk-monitor"}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 py-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full h-8 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center relative">
              <Activity className="h-3.5 w-3.5 text-primary-foreground" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-low animate-pulse border border-card" />
            </div>
            <span className="text-sm font-semibold text-foreground">Risk AI v2.4 • <span className="text-muted-foreground font-normal">Live</span></span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium bg-primary/5 text-primary px-3 py-1.5 rounded-full border border-primary/10">
              <Zap className="h-3 w-3" /> Connected
            </span>
            <span className="text-xs font-medium bg-secondary text-foreground px-3 py-1.5 rounded-full">John Smith</span>
            <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
              <Clock className="h-3 w-3" /> Last updated: {timestamp}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
