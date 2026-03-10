import { alertRows, donutData } from "@/data/riskData";
import { Shield, UserCheck, Activity, TrendingUp, TrendingDown, DollarSign, AlertCircle, Package } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  "Total Risks": Shield,
  "Past Due": AlertCircle,
  "Assigned to Me": UserCheck,
};

const severityDotColor: Record<string, string> = {
  critical: "bg-critical",
  medium: "bg-medium",
  low: "bg-low",
  info: "bg-info",
  assigned: "bg-assigned",
};

const severityBarColor: Record<string, string> = {
  critical: "bg-critical",
  medium: "bg-medium",
  low: "bg-low",
  info: "bg-info",
  assigned: "bg-assigned",
};

const donutTrends: Record<string, { trend: string; up: boolean }> = {
  Critical: { trend: "+12", up: true },
  Medium: { trend: "-5", up: false },
  Low: { trend: "+3", up: true },
};

// RHS KPI data: Total Risks, Past Due, Assigned to Me with € and volume
const rhsKPIs = [
  { label: "Total Risks", value: 1281, volume: "4,820 CS", euro: "€1.8M", icon: Shield, color: "text-primary" },
  { label: "Past Due", value: 234, volume: "1,245 CS", euro: "€420K", icon: AlertCircle, color: "text-critical" },
  { label: "Assigned to Me", value: 67, volume: "890 CS", euro: "€185K", icon: UserCheck, color: "text-foreground" },
];

export default function AlertsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const total = donutData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="section-card relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2 relative">
        <Activity className="h-4 w-4 text-primary" /> Alerts & Risk Summary
      </h2>

      <div className="flex gap-0 relative">
        {/* Left column — Alert rows as mini cards */}
        <div className="w-[40%] pr-4 border-r border-border/40 space-y-1.5">
          {alertRows.filter(row => ["Total Risks", "Past Due", "Assigned to Me"].includes(row.label)).map((row, idx) => {
            const Icon = iconMap[row.label] || Shield;
            return (
              <div
                key={row.label}
                className="relative flex items-center gap-2.5 px-3 py-2 rounded-md border border-border/50 bg-secondary/30 hover:bg-secondary/60 transition-colors cursor-default"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${severityDotColor[row.severity]}`} />
                <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="text-[11px] text-foreground flex-1 truncate">{row.label}</span>
                <span className="text-[13px] font-bold font-mono-tech text-foreground">{row.value.toLocaleString()}</span>
                <div className="w-14 h-1.5 bg-border/50 rounded-full overflow-hidden shrink-0">
                  <div className={`h-full rounded-full ${severityBarColor[row.severity]}`} style={{ width: `${row.pct}%` }} />
                </div>

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

        {/* Center column — Donut with hover showing trends */}
        <div className="w-[30%] px-4 border-r border-border/40 flex flex-col items-center justify-center">
          <div className="relative">
            <ResponsiveContainer width={140} height={120}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={32} outerRadius={48} paddingAngle={4} cornerRadius={3} dataKey="value">
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
        </div>

        {/* Right column — Total Risk count, € value, volume as mini cards */}
        <div className="w-[30%] pl-4 flex flex-col justify-center space-y-1.5">
          <div className="flex items-center justify-between px-3 py-2 rounded-md border border-border/50 bg-secondary/30">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">Total Risks</span>
            </div>
            <span className="text-[15px] font-extrabold font-mono-tech text-primary">1,281</span>
          </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-md border border-border/50 bg-secondary/30">
            <div className="flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">Value at Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-extrabold font-mono-tech text-foreground">€2.4M</span>
              <span className="text-[10px] text-critical font-semibold flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" /> +8%
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2 rounded-md border border-border/50 bg-secondary/30">
            <div className="flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground">Volume</span>
            </div>
            <span className="text-[15px] font-extrabold font-mono-tech text-foreground">6,955 CS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
