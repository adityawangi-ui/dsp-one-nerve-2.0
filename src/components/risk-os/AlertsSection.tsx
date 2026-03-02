import { alertRows, donutData, weeklyTrendData } from "@/data/riskData";
import { AlertTriangle, Clock, Shield, MessageSquare, UserCheck, Activity, TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { useState } from "react";

const iconMap: Record<string, React.ElementType> = {
  "Total Risks": Shield,
  "No Next Avail.": Clock,
  "Missing Reason": AlertTriangle,
  "Missing Comments": MessageSquare,
  "Past Due": AlertCircle,
  "Assigned to Me": UserCheck,
};

const severityDotColor: Record<string, string> = {
  critical: "bg-critical",
  medium: "bg-medium",
  low: "bg-low",
  info: "bg-info",
  assigned: "bg-assigned",
  new: "bg-new-sev",
};

const severityBarColor: Record<string, string> = {
  critical: "bg-critical",
  medium: "bg-medium",
  low: "bg-low",
  info: "bg-info",
  assigned: "bg-assigned",
  new: "bg-new-sev",
};

const donutTrends = [
  { name: "Critical", trend: "+12", up: true },
  { name: "Medium", trend: "-5", up: false },
  { name: "Low", trend: "+3", up: true },
];

export default function AlertsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const total = donutData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="section-card relative overflow-hidden">
      {/* Decorative blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2 relative">
        <Activity className="h-4 w-4 text-primary" /> Alerts & Risk Summary
      </h2>

      <div className="flex gap-0 relative">
        {/* Left column — Alert rows */}
        <div className="w-[30%] pr-4 border-r border-border/40 space-y-1">
          {alertRows.map((row, idx) => {
            const Icon = iconMap[row.label] || Shield;
            return (
              <div
                key={row.label}
                className="relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-default"
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

                {/* Tooltip */}
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

        {/* Center column — Donut + legend + VAR */}
        <div className="w-[35%] px-4 border-r border-border/40 flex flex-col items-center justify-center">
          <div className="relative">
            <ResponsiveContainer width={140} height={120}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={32} outerRadius={48} paddingAngle={4} cornerRadius={3} dataKey="value">
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: number, name: string) => [`${value}`, name]} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-lg font-extrabold font-mono-tech text-foreground">{total}</span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">TOTAL</span>
            </div>
          </div>

          {/* Legend with trends */}
          <div className="space-y-1 mt-2 w-full">
            {donutData.map((d, i) => {
              const trend = donutTrends[i];
              return (
                <div key={d.name} className="flex items-center gap-2 text-[11px]">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                  <span className="text-muted-foreground flex-1">{d.name}</span>
                  <span className="font-mono-tech font-bold text-foreground">{d.value}</span>
                  <span className={`flex items-center gap-0.5 text-[10px] ${trend.up ? "text-critical" : "text-low"}`}>
                    {trend.up ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                    {trend.trend}
                  </span>
                </div>
              );
            })}
          </div>

          {/* VAR hero metric */}
          <div className="mt-3 pt-3 border-t border-border/40 w-full text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider">
              <DollarSign className="h-3 w-3" /> VAR
            </div>
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="text-[15px] font-extrabold font-mono-tech text-primary">$2.4M</span>
              <span className="text-[10px] text-critical font-semibold flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" /> +8%
              </span>
            </div>
          </div>
        </div>

        {/* Right column — 5-Week Trend */}
        <div className="w-[35%] pl-4">
          <span className="text-[11px] font-medium text-muted-foreground">5-Week Trend</span>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={weeklyTrendData} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <RechartsTooltip />
              <Bar dataKey="low" stackId="a" fill="hsl(var(--low))" />
              <Bar dataKey="medium" stackId="a" fill="hsl(var(--medium))" />
              <Bar dataKey="critical" stackId="a" fill="hsl(var(--critical))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
