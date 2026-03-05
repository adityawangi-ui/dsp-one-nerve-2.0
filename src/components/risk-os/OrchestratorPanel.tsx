import { useState, useEffect } from "react";
import { Brain, Cpu, BarChart3, Package, Shield, Truck, CheckCircle2, Loader2, Clock, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Agent {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "completed" | "running" | "queued" | "idle";
  lastRun: string;
  insight?: string;
}

const initialAgents: Agent[] = [
  { id: "demand", name: "Demand Agent", icon: BarChart3, status: "completed", lastRun: "2s ago", insight: "Spike detected in W3 (+22%)" },
  { id: "inventory", name: "Inventory Agent", icon: Package, status: "completed", lastRun: "5s ago", insight: "DOH below threshold in 2 markets" },
  { id: "risk", name: "Risk Agent", icon: Shield, status: "running", lastRun: "Running…", insight: "Analyzing 3 new patterns" },
  { id: "scenario", name: "Scenario Agent", icon: Brain, status: "queued", lastRun: "Queued", insight: "Waiting for Risk Agent" },
  { id: "logistics", name: "Logistics Agent", icon: Truck, status: "idle", lastRun: "12m ago", insight: "No active disruptions" },
];

const statusConfig = {
  completed: { color: "bg-success", textColor: "text-success", label: "Done", icon: CheckCircle2, glow: "pulse-glow-green" },
  running: { color: "bg-primary", textColor: "text-primary", label: "Running", icon: Loader2, glow: "tech-glow" },
  queued: { color: "bg-warning", textColor: "text-warning", label: "Queued", icon: Clock, glow: "" },
  idle: { color: "bg-muted-foreground/50", textColor: "text-muted-foreground", label: "Idle", icon: Clock, glow: "" },
};

export default function OrchestratorPanel() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [expanded, setExpanded] = useState(false);
  const [thinkingDots, setThinkingDots] = useState(0);

  // Simulate agent progression
  useEffect(() => {
    const t1 = setTimeout(() => {
      setAgents(prev => prev.map(a =>
        a.id === "risk" ? { ...a, status: "completed", lastRun: "1s ago", insight: "3 patterns flagged — escalating" } : a
      ));
    }, 4000);
    const t2 = setTimeout(() => {
      setAgents(prev => prev.map(a =>
        a.id === "scenario" ? { ...a, status: "running", lastRun: "Running…", insight: "Generating 3 scenarios…" } : a
      ));
    }, 5000);
    const t3 = setTimeout(() => {
      setAgents(prev => prev.map(a =>
        a.id === "scenario" ? { ...a, status: "completed", lastRun: "1s ago", insight: "3 scenarios ready — S3 recommended" } : a
      ));
    }, 8000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Dots animation
  useEffect(() => {
    const t = setInterval(() => setThinkingDots(d => (d + 1) % 4), 500);
    return () => clearInterval(t);
  }, []);

  const runningAgents = agents.filter(a => a.status === "running");
  const completedCount = agents.filter(a => a.status === "completed").length;
  const isAllDone = completedCount === agents.length;

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-border/50">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-primary/[0.03] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Cpu className={`h-4 w-4 ${isAllDone ? "text-success" : "text-primary"}`} />
            {!isAllDone && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
          <span className="text-xs font-semibold text-foreground">Orchestrator</span>
          <Badge className={`text-[9px] px-1.5 py-0 ${isAllDone ? "bg-success/15 text-success border-success/30" : "bg-primary/15 text-primary border-primary/30"}`}>
            {isAllDone ? "All Complete" : `${completedCount}/${agents.length}`}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {runningAgents.length > 0 && (
            <span className="text-[10px] text-primary font-mono-tech animate-pulse">
              {runningAgents[0].name}{".".repeat(thinkingDots)}
            </span>
          )}
          {expanded ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
        </div>
      </button>

      {/* Pipeline visualization - always visible */}
      <div className="px-4 pb-2 flex items-center gap-1">
        {agents.map((agent, i) => {
          const config = statusConfig[agent.status];
          return (
            <div key={agent.id} className="flex items-center gap-1">
              <div
                className={`h-2 w-2 rounded-full ${config.color} ${agent.status === "running" ? "animate-pulse" : ""}`}
                title={`${agent.name}: ${config.label}`}
              />
              {i < agents.length - 1 && (
                <div className={`h-px w-4 ${agents[i + 1].status !== "idle" && agents[i + 1].status !== "queued" ? "bg-primary/40" : "bg-border"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Expanded agent list */}
      {expanded && (
        <div className="border-t border-border/30 px-3 py-2 space-y-1 animate-fade-in">
          {agents.map(agent => {
            const config = statusConfig[agent.status];
            const StatusIcon = config.icon;
            return (
              <div
                key={agent.id}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-primary/[0.03] transition-colors"
              >
                <agent.icon className={`h-3.5 w-3.5 ${config.textColor}`} />
                <span className="text-[11px] font-medium text-foreground flex-1">{agent.name}</span>
                <span className="text-[10px] text-muted-foreground font-mono-tech truncate max-w-[140px]">{agent.insight}</span>
                <div className="flex items-center gap-1">
                  <StatusIcon className={`h-3 w-3 ${config.textColor} ${agent.status === "running" ? "animate-spin" : ""}`} />
                  <span className={`text-[9px] font-medium ${config.textColor}`}>{config.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
