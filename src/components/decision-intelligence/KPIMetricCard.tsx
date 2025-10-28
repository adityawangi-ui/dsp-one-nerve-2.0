import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIMetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  chartComponent?: React.ReactNode;
}

export const KPIMetricCard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  chartComponent,
}: KPIMetricCardProps) => {
  const isPositive = trend === "up";

  return (
    <Card className="p-6 transition-all duration-300 bg-gradient-to-br from-card to-surface border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        {change && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg",
              isPositive
                ? "text-success bg-success/10"
                : "text-destructive bg-destructive/10"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {change}
          </div>
        )}
      </div>

      <div className="space-y-1 mb-3">
        <h3 className="text-3xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      {chartComponent && <div className="mt-4">{chartComponent}</div>}
    </Card>
  );
};
