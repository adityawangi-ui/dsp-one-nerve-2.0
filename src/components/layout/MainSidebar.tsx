import { NavLink } from "react-router-dom";
import { 
  Home,
  Workflow,
  Target,
  FileText,
  Database,
  Menu,
  ChevronLeft,
  ChevronRight,
  
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
              "hover:bg-accent hover:text-accent-foreground",
              "relative overflow-hidden group",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
              collapsed && "justify-center px-2"
            )
          }
...
    <aside 
      className={cn(
        "bg-card border-r border-border flex flex-col transition-all duration-300 z-40 shadow-sm",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header with Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-border">
        {!collapsed && (
          <h2 className="text-sm font-bold text-foreground tracking-wide">
            COMMAND CONSOLE
          </h2>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="hover:bg-accent transition-all duration-200 h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {renderNavItems(mainNavItems)}
      </nav>
    </aside>
  );
};
