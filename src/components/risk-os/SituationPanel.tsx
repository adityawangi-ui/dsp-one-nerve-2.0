import { useState, useEffect } from "react";
import { riskData } from "@/data/riskData";
import { Shield, AlertTriangle, TrendingUp, Activity, Zap, Target, Radio } from "lucide-react";

const metrics = (() => {
  const total = riskData.length;
  const critical = riskData.filter(r => r.severity === "S 1").length;
  const open = riskData.filter(r => r.status === "Open").length;
  const totalLoss = riskData.reduce((s, r) => s + r.expectedLossValue, 0);
  const criticalMarkets = new Set(riskData.filter(r => r.severity === "S 1").map(r => r.msoCountry)).size;
  const mitigationRate = 87;
  return [
    { label: "Global Risk Level", value: critical > 3 ? "HIGH" : "MODERATE", color: critical > 3 ? "destructive" : "warning", icon: Shield, glow: "pulse-glow-red" },
    { label: "Active Risks", value: String(total), color: "primary", icon: Activity, glow: "pulse-glow-green" },
    { label: "Revenue at Risk", value: `€${(totalLoss / 1000000).toFixed(1)}M`, color: "destructive", icon: TrendingUp, glow: "pulse-glow-red" },
    { label: "Critical Markets", value: String(criticalMarkets), color: "warning", icon: AlertTriangle, glow: "pulse-glow-amber" },
    { label: "Open Items", value: String(open), color: "primary", icon: Target, glow: "pulse-glow-green" },
    { label: "Mitigation Rate", value: `${mitigationRate}%`, color: "success", icon: Zap, glow: "pulse-glow-green" },
  ];
})();

const tickerMessages = [
  "⚡ Demand spike detected in Germany — +22% WoW",
  "🔴 Supplier delay: IT-Milano warehouse — 3 day lag",
  "🟡 Inventory below threshold: France DC — DOH 8",
  "⚡ New risk flagged: Out Of Stock — SKU D1234 (Spain)",
  "✅ Scenario S2 approved by SC Manager — executing",
  "🔵 AI Agent analyzing 3 new patterns",
  "🟢 Mitigation success: UK rebalance complete — SL restored to 96%",
];

export default function SituationPanel() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % metrics.length), 3000);
    return () => clearInterval(t);
  }, []);

  const colorMap: Record<string, string> = {
    destructive: "text-destructive neon-text-red",
    warning: "text-warning neon-text-amber",
    primary: "text-primary neon-text",
    success: "text-success neon-text-green",
  };

  const dotColorMap: Record<string, string> = {
    destructive: "bg-destructive",
    warning: "bg-warning",
    primary: "bg-primary",
    success: "bg-success",
  };

  return (
    <div className="relative overflow-hidden">
      {/* Main metrics strip */}
      <div className="relative glass-panel rounded-xl p-0.5">
        {/* Scan line effect */}
        <div className="absolute inset-0 scan-line rounded-xl" />
        
        <div className="relative grid grid-cols-6 divide-x divide-border/30">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="relative px-4 py-3 flex flex-col items-center gap-1 group cursor-default transition-all duration-300 hover:bg-primary/[0.04]"
            >
              {/* Indicator dot */}
              <div className="absolute top-2 right-2">
                <span className={`block h-1.5 w-1.5 rounded-full ${dotColorMap[m.color]} animate-pulse`} />
              </div>
              
              <div className="flex items-center gap-1.5">
                <m.icon className={`h-3.5 w-3.5 ${colorMap[m.color]} opacity-70`} />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{m.label}</span>
              </div>
              
              <span className={`text-lg font-extrabold font-mono-tech ${colorMap[m.color]} transition-all duration-300`}>
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live ticker */}
      <div className="mt-2 relative overflow-hidden h-7 glass-panel rounded-lg flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center z-10 bg-gradient-to-r from-card to-transparent">
          <Radio className="h-3 w-3 text-success animate-pulse" />
        </div>
        <div className="flex whitespace-nowrap ticker-scroll pl-10">
          {[...tickerMessages, ...tickerMessages].map((msg, i) => (
            <span key={i} className="inline-block text-[11px] text-muted-foreground font-mono-tech mx-8">
              {msg}
            </span>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-card to-transparent z-10" />
      </div>
    </div>
  );
}
