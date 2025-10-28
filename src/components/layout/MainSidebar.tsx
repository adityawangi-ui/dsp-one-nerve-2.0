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
  {
    id: "agents",
    title: "Agent Directory",
    icon: Bot,
    href: "/agents",
  },
  {
    id: "settings",
    title: "Admin & Settings",
    icon: Settings,
    href: "/settings",
  },
];

const decisionIntelligenceItems: SidebarItem[] = [
  {
    id: "skills",
    title: "Skills",
    icon: Zap,
    href: "/skills",
  },
  {
    id: "planning",
    title: "Planning",
    icon: TrendingUp,
    href: "/planning",
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
              "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:scale-[1.02] hover:shadow-lg hover:translate-x-1",
              "relative overflow-hidden group",
              isActive
                ? "bg-gradient-to-r from-sidebar-primary to-sidebar-primary/90 text-sidebar-primary-foreground shadow-lg scale-[1.02] before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                : "text-sidebar-foreground",
              collapsed && "justify-center px-2"
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
    });
  };

  return (
    <aside 
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 z-40",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="hover:bg-sidebar-accent hover:scale-105 transition-all duration-200"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* AI Cockpit Section */}
        <Collapsible open={aiCockpitOpen} onOpenChange={setAiCockpitOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
            {!collapsed && <span>AI COCKPIT</span>}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              aiCockpitOpen && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1.5 mt-2">
            {renderNavItems(aiCockpitItems)}
          </CollapsibleContent>
        </Collapsible>

        {/* Decision Intelligence Section */}
        <Collapsible open={decisionIntelligenceOpen} onOpenChange={setDecisionIntelligenceOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors">
            {!collapsed && <span>DECISION INTELLIGENCE</span>}
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform duration-200",
              decisionIntelligenceOpen && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1.5 mt-2">
            {renderNavItems(decisionIntelligenceItems)}
          </CollapsibleContent>
        </Collapsible>
      </nav>
    </aside>
  );
};