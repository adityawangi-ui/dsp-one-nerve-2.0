import { NavLink } from "react-router-dom";
import { 
  Home,
  Workflow,
  Target,
  FileText,
  Database,
  Menu,
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
}

const mainNavItems: SidebarItem[] = [
  {
    id: "landing",
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    id: "agentic-console",
    title: "Agentic Process Console",
    icon: Workflow,
    href: "/agentic-console",
  },
  {
    id: "dap-workspace",
    title: "DAP Workspace",
    icon: Target,
    href: "/dap-workspace",
  },
  {
    id: "reports",
    title: "Reports & Insights",
    icon: FileText,
    href: "/reports",
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
  const renderNavItems = (items: SidebarItem[]) => {
    return items.map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.id}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "relative overflow-hidden group",
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                : "text-sidebar-foreground/80 hover:text-sidebar-foreground",
              collapsed && "justify-center px-2"
            )
          }
        >
          <Icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
          {!collapsed && (
            <span className="flex-1">{item.title}</span>
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
      <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border bg-sidebar">
        {!collapsed && (
          <h2 className="text-sm font-bold text-sidebar-foreground tracking-wide">
            COMMAND CONSOLE
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="hover:bg-sidebar-accent/50 transition-all duration-200 h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto bg-sidebar">
        {renderNavItems(mainNavItems)}
      </nav>
    </aside>
  );
};
