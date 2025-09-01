import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Bot, 
  FlaskConical, 
  Lightbulb, 
  CheckSquare, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarItem {
  id: string;
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const sidebarItems: SidebarItem[] = [
  {
    id: "console",
    title: "Orchestration Console",
    icon: Home,
    href: "/",
  },
  {
    id: "agents",
    title: "Agent Directory",
    icon: Bot,
    href: "/agents",
  },
  {
    id: "scenarios",
    title: "Scenario Workbench",
    icon: FlaskConical,
    href: "/scenarios",
  },
  {
    id: "insights",
    title: "Insights & Recommendations",
    icon: Lightbulb,
    href: "/insights",
    badge: 7,
  },
  {
    id: "approvals",
    title: "Approvals & Decisions",
    icon: CheckSquare,
    href: "/approvals",
    badge: 3,
  },
  {
    id: "settings",
    title: "Admin & Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface MainSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const MainSidebar = ({ collapsed, onToggle }: MainSidebarProps) => {
  return (
    <aside 
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <div className="h-16 flex items-center justify-end px-4 border-b border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground",
                  collapsed && "justify-center"
                )
              }
            >
              <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
              {!collapsed && (
                <span className="flex-1">{item.title}</span>
              )}
              {!collapsed && item.badge && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
              {collapsed && item.badge && (
                <span className="absolute left-8 top-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};