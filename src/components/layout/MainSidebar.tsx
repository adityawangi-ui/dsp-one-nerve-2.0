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
  ChevronRight,
  MessageSquare,
  Zap,
  TrendingUp,
  Database,
  Wrench,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarItem {
  id: string;
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: number;
}

const aiCockpitItems: SidebarItem[] = [
  {
    id: "ai-assistant",
    title: "Orchestrator",
    icon: MessageSquare,
    href: "/",
  },
  {
    id: "console",
    title: "Process Console",
    icon: Home,
    href: "/console",
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
];

const decisionIntelligenceItems: SidebarItem[] = [
  {
    id: "workspace",
    title: "Supply Planner Workspace",
    icon: Wrench,
    href: "/workspace",
  },
  {
    id: "skills",
    title: "Module",
    icon: Zap,
    href: "/skills",
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: TrendingUp,
    href: "/analytics",
  },
  {
    id: "data-config",
    title: "Data & Configuration",
    icon: Database,
    href: "/data-config",
  },
];

interface MainSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const MainSidebar = ({ collapsed, onToggle }: MainSidebarProps) => {
  const [aiCockpitOpen, setAiCockpitOpen] = useState(true);
  const [decisionIntelligenceOpen, setDecisionIntelligenceOpen] = useState(true);

  const renderNavItems = (items: SidebarItem[]) => {
    return items.map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.id}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex items-center px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "relative overflow-hidden group",
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/80 hover:text-sidebar-foreground",
              collapsed && "justify-center px-2"
            )
          }
        >
          <Icon className={cn("h-[18px] w-[18px]", !collapsed && "mr-3")} />
          {!collapsed && (
            <span className="flex-1">{item.title}</span>
          )}
          {!collapsed && item.badge && (
            <span className="ml-auto bg-primary text-primary-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full min-w-[20px] text-center">
              {item.badge}
            </span>
          )}
          {collapsed && item.badge && (
            <span className="absolute left-8 top-1 bg-primary text-primary-foreground text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </NavLink>
      );
    });
  };

  return (
    <aside 
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
        {!collapsed && (
          <h2 className="text-sm font-bold text-sidebar-foreground tracking-wide">
            NAVIGATION
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="hover:bg-sidebar-accent transition-all duration-200 h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        {/* AI Cockpit Section */}
        <Collapsible open={aiCockpitOpen} onOpenChange={setAiCockpitOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-bold text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors uppercase tracking-wider">
            {!collapsed && <span>AI Cockpit</span>}
            <ChevronDown className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              aiCockpitOpen && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-3">
            {renderNavItems(aiCockpitItems)}
          </CollapsibleContent>
        </Collapsible>

        {/* Decision Intelligence Section */}
        <Collapsible open={decisionIntelligenceOpen} onOpenChange={setDecisionIntelligenceOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-sm font-bold text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors uppercase tracking-wider">
            {!collapsed && <span>Decision Intelligence</span>}
            <ChevronDown className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              decisionIntelligenceOpen && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-3">
            {renderNavItems(decisionIntelligenceItems)}
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </aside>
  );
};