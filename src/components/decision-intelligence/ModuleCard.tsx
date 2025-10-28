import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  subtitle: string;
  status: "active" | "coming-soon";
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  statusCount?: number;
}

export const ModuleCard = ({
  title,
  subtitle,
  status,
  icon: Icon,
  onClick,
  disabled = false,
  statusCount,
}: ModuleCardProps) => {
  const isActive = status === "active";

  return (
    <Card
      className={cn(
        "p-8 transition-all duration-300 cursor-pointer relative overflow-hidden group",
        "bg-gradient-to-br from-card to-surface border border-border",
        "shadow-[var(--shadow-card)]",
        isActive
          ? "hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] hover:translate-y-[-4px]"
          : "opacity-60 cursor-not-allowed",
        disabled && "pointer-events-none"
      )}
      onClick={isActive && !disabled ? onClick : undefined}
    >
      {/* Status indicator bar */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-1",
          isActive ? "bg-success" : "bg-muted-foreground"
        )}
      />

      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn(
              "p-4 rounded-xl transition-all duration-300",
              isActive
                ? "bg-success/10 text-success group-hover:bg-success/20"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Icon className="h-8 w-8" />
          </div>
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={cn(
              "text-xs font-medium",
              isActive
                ? "bg-success/10 text-success hover:bg-success/20"
                : "bg-muted text-muted-foreground"
            )}
          >
            {status === "active" ? "Active" : "Coming Soon"}
          </Badge>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow">{subtitle}</p>

        {statusCount !== undefined && isActive && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending Decisions</span>
              <span className="text-lg font-bold text-primary">{statusCount}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
