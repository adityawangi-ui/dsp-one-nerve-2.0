import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
} from "lucide-react";

interface KPIData {
  label: string;
  value: string;
  suffix?: string;
  target?: string;
  trend: string;
  trendUp: boolean;
  trendPositive: boolean;
  status: "green" | "amber" | "red";
  insight: string;
  link: string;
}

const kpis: KPIData[] = [
  {
    label: "Service Level",
    value: "92.3%",
    target: "95%",
    trend: "-1.8%",
    trendUp: false,
    trendPositive: false,
    status: "amber",
    insight: "APAC fill rate at 89% — 3 markets below threshold",
    link: "/diagnostics-analytics",
  },
  {
    label: "Inventory Health",
    value: "€285M",
    trend: "-3.2%",
    trendUp: false,
    trendPositive: true,
    status: "green",
    insight: "SLOB reduced to €38M (−8% MoM)",
    link: "/inventory-optimizer",
  },
  {
    label: "Capacity Utilization",
    value: "78%",
    suffix: "util.",
    trend: "+2.4%",
    trendUp: true,
    trendPositive: true,
    status: "green",
    insight: "Plan adherence: 94% across 12 sites",
    link: "/capacity-rebalancer",
  },
  {
    label: "Forecast Accuracy",
    value: "82.4%",
    suffix: "MAPE",
    trend: "-3.1%",
    trendUp: false,
    trendPositive: false,
    status: "amber",
    insight: "Bias: +6% over-forecast in Home Care",
    link: "/predictive-analytics",
  },
  {
    label: "DR Compliance",
    value: "94%",
    target: "98%",
    trend: "+1.2%",
    trendUp: true,
    trendPositive: true,
    status: "amber",
    insight: "12 lane violations in DACH region",
    link: "/execution-tracker",
  },
];

const statusConfig = {
  green: {
    badge: "bg-success/15 text-success border-success/20",
    icon: CheckCircle,
    label: "On Track",
  },
  amber: {
    badge: "bg-warning/15 text-warning border-warning/20",
    icon: AlertTriangle,
    label: "Monitor",
  },
  red: {
    badge: "bg-destructive/15 text-destructive border-destructive/20",
    icon: AlertTriangle,
    label: "Critical",
  },
};

export default function PlanningHealthPulse() {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Planning Health Pulse</h2>
            <p className="text-[10px] text-muted-foreground">Real-time KPI overview · Last refreshed 2 min ago</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <Target className="h-3 w-3" />
          <span>3 of 5 KPIs on target</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
        {kpis.map((kpi) => {
          const config = statusConfig[kpi.status];
          const StatusIcon = config.icon;
          return (
            <Card
              key={kpi.label}
              className="group p-3 hover:shadow-[var(--shadow-elevated)] transition-all duration-300 cursor-pointer hover:-translate-y-0.5 relative overflow-hidden"
              onClick={() => navigate(kpi.link)}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${
                kpi.status === "green" ? "bg-success" : kpi.status === "amber" ? "bg-warning" : "bg-destructive"
              }`} />

              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
                  <Badge variant="outline" className={`text-[8px] px-1.5 py-0 border ${config.badge}`}>
                    <StatusIcon className="h-2 w-2 mr-0.5" />
                    {config.label}
                  </Badge>
                </div>

                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-xl font-bold text-foreground font-mono-tech">{kpi.value}</h3>
                  {kpi.target && <span className="text-[9px] text-muted-foreground">/ {kpi.target}</span>}
                  {kpi.suffix && <span className="text-[9px] text-muted-foreground">{kpi.suffix}</span>}
                </div>

                <div className="flex items-center gap-1">
                  {kpi.trendUp ? (
                    <TrendingUp className={`h-3 w-3 ${kpi.trendPositive ? "text-success" : "text-destructive"}`} />
                  ) : (
                    <TrendingDown className={`h-3 w-3 ${kpi.trendPositive ? "text-success" : "text-destructive"}`} />
                  )}
                  <span className={`text-[10px] font-semibold ${kpi.trendPositive ? "text-success" : "text-destructive"}`}>
                    {kpi.trend}
                  </span>
                  <span className="text-[9px] text-muted-foreground ml-0.5">vs prev.</span>
                </div>

                <p className="text-[9px] text-muted-foreground italic leading-tight pt-1.5 border-t border-border/60">
                  {kpi.insight}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
