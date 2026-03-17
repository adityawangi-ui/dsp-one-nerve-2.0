import { alertRows, donutData } from "@/data/riskData";
import { Shield, UserCheck, TrendingUp, DollarSign, AlertCircle, Package } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  "Total Risks": Shield,
  "Past Due": AlertCircle,
  "Assigned to Me": UserCheck,
};

const donutTrends: Record<string, { trend: string; up: boolean }> = {
  Critical: { trend: "+12", up: true },
  Medium: { trend: "-5", up: false },
  Low: { trend: "+3", up: true },
};

export type KpiFilterKey = "total" | "past-due" | "assigned" | "value-at-risk" | "volume" | null;

interface Props {
  activeKpi?: KpiFilterKey;
  onKpiClick?: (key: KpiFilterKey) => void;
}

const lhsKpis: { label: string; filterKey: KpiFilterKey }[] = [
  { label: "Total Risks", filterKey: "total" },
  { label: "Past Due", filterKey: "past-due" },
  { label: "Assigned to Me", filterKey: "assigned" },
];

const rhsKpis = [
  { label: "Total Risks", value: "1,281", icon: Shield, color: "text-primary", bgColor: "bg-primary/10", filterKey: "total" as KpiFilterKey, trend: null },
  { label: "Value at Risk", value: "€2.4M", icon: DollarSign, color: "text-destructive", bgColor: "bg-destructive/10", filterKey: "value-at-risk" as KpiFilterKey, trend: { value: "+8%", up: true } },
  { label: "Volume", value: "6,955", icon: Package, color: "text-success", bgColor: "bg-success/10", filterKey: "volume" as KpiFilterKey, trend: null },
];

export default function AlertsSection({ activeKpi, onKpiClick }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const total = donutData.reduce((s, d) => s + d.value, 0);

  const handleClick = (key: KpiFilterKey) => {
    onKpiClick?.(activeKpi === key ? null : key);
  };

  const cardClass = (key: KpiFilterKey) =>
    `relative aspect-square flex flex-col items-center justify-center gap-1.5 rounded-xl border transition-all duration-300 cursor-pointer group ${
      activeKpi === key
        ? "border-primary bg-primary/10 shadow-[var(--shadow-glow)] ring-1 ring-primary/30"
        : "border-border/50 bg-gradient-to-br from-card to-secondary/30 hover:shadow-[var(--shadow-glow)] hover:border-primary/20"
    }`;

  return (
    <div className="section-card relative overflow-hidden py-3">
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="flex gap-0 relative">
        {/* Left column — Square KPI cards */}
        <div className="w-[35%] pr-4 border-r border-border/40 grid grid-cols-3 gap-2 items-center">
          {alertRows.filter(row => ["Total Risks", "Past Due", "Assigned to Me"].includes(row.label)).map((row, idx) => {
            const Icon = iconMap[row.label] || Shield;
            const lhsColorMap: Record<string, { text: string; bg: string }> = {
              critical: { text: "text-destructive", bg: "bg-destructive/10" },
              medium: { text: "text-warning", bg: "bg-warning/10" },
              low: { text: "text-success", bg: "bg-success/10" },
              info: { text: "text-primary", bg: "bg-primary/10" },
              assigned: { text: "text-primary", bg: "bg-primary/10" },
            };
            const colors = lhsColorMap[row.severity] || lhsColorMap.info;
            const filterKey = lhsKpis[idx]?.filterKey;
            return (
              <div
                key={row.label}
                className={cardClass(filterKey)}
                onClick={() => handleClick(filterKey)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div className={`p-2 rounded-lg ${colors.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-4 w-4 ${colors.text}`} />
                </div>
                <span className="text-sm font-extrabold font-mono-tech text-foreground leading-none">{row.value.toLocaleString()}</span>
                <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-medium text-center leading-tight px-1">{row.label}</span>

                {hoveredIdx === idx && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 w-64 bg-foreground text-background text-[11px] rounded-lg p-3 shadow-xl leading-relaxed pointer-events-none">
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-foreground rotate-45" />
                    {row.tooltip}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Center column — Donut */}
        <div className="w-[30%] px-4 border-r border-border/40 flex flex-col items-center justify-center">
          <div className="relative">
            <ResponsiveContainer width={140} height={140}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={32} outerRadius={52} paddingAngle={4} cornerRadius={3} dataKey="value">
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const name = payload[0].name as string;
                    const trend = donutTrends[name];
                    return (
                      <div className="bg-foreground text-background text-[11px] rounded-md px-2.5 py-1.5 shadow-lg pointer-events-none">
                        <span className="font-semibold">{name}:</span> {payload[0].value}
                        {trend && (
                          <span className={`ml-2 font-semibold ${trend.up ? "text-red-300" : "text-green-300"}`}>
                            {trend.up ? "↑" : "↓"} {trend.trend}
                          </span>
                        )}
                      </div>
                    );
                  }}
                  wrapperStyle={{ zIndex: 60 }}
                  position={{ x: 150, y: 40 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-extrabold font-mono-tech text-foreground">{total}</span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">TOTAL</span>
            </div>
          </div>
          <div className="flex gap-3 mt-1">
            {donutData.map((d) => (
              <div key={d.name} className="flex items-center gap-1 text-[9px]">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Square KPI cards */}
        <div className="w-[35%] pl-4 grid grid-cols-3 gap-2 items-center">
          {rhsKpis.map((kpi) => (
            <div
              key={kpi.label}
              className={cardClass(kpi.filterKey)}
              onClick={() => handleClick(kpi.filterKey)}
            >
              <div className={`p-2 rounded-lg ${kpi.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </div>
              <span className="text-sm font-extrabold font-mono-tech text-foreground leading-none">{kpi.value}</span>
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-medium text-center leading-tight px-1">{kpi.label}</span>
              {kpi.trend && (
                <span className="absolute top-1.5 right-1.5 text-[8px] text-destructive font-semibold flex items-center gap-0.5">
                  <TrendingUp className="h-2 w-2" /> {kpi.trend.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
