import { TrendingUp, TrendingDown, Target, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: {
    direction: "up" | "down";
    value: number;
    period: string;
  };
  target?: {
    value: number;
    status: "above" | "below" | "on-track";
  };
  status?: "healthy" | "warning" | "critical";
  subtitle?: string;
}

export const KPICard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  target, 
  status = "healthy", 
  subtitle 
}: KPICardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "warning":
        return "text-warning";
      case "critical":
        return "text-destructive";
      default:
        return "text-success";
    }
  };

  const getTargetStatusColor = () => {
    if (!target) return "";
    switch (target.status) {
      case "above":
        return "text-success";
      case "below":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-surface border border-border rounded-3xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-base text-muted-foreground">{unit}</span>}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {status !== "healthy" && (
          <div className={cn("p-2 rounded-xl", getStatusColor())}>
            <AlertTriangle className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        {trend && (
          <div className="flex items-center space-x-2">
            {trend.direction === "up" ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <span className={cn(
              "text-sm font-medium",
              trend.direction === "up" ? "text-success" : "text-destructive"
            )}>
              {trend.direction === "up" ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">{trend.period}</span>
          </div>
        )}

        {target && (
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Target:</span>
            <span className={cn("text-xs font-medium", getTargetStatusColor())}>
              {target.value}{unit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};