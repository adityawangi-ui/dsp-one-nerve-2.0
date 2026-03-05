import { useState } from "react";
import { RiskRow } from "@/data/riskData";
import { Clock, AlertTriangle, CheckCircle2, ArrowRight, Brain, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  row: RiskRow;
}

interface TimelineEvent {
  id: number;
  week: string;
  date: string;
  title: string;
  description: string;
  type: "detection" | "escalation" | "action" | "milestone" | "resolution";
  severity: "critical" | "warning" | "info" | "success";
  aiConfidence?: number;
}

export default function RiskTimeline({ row }: Props) {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const events: TimelineEvent[] = [
    {
      id: 1, week: row.startedOnWeek, date: "Day 0",
      title: "Risk Detected",
      description: `${row.riskType} risk identified for ${row.mrdrDescription} in ${row.msoCountry}. Bot reason code: ${row.botReasonCode}. Initial severity: ${row.severity}.`,
      type: "detection", severity: "critical", aiConfidence: 96,
    },
    {
      id: 2, week: row.startedOnWeek, date: "Day 1",
      title: "AI Root Cause Analysis",
      description: `Automated analysis identified supplier capacity constraint as primary driver. RMPM availability down 35%. Historical pattern match: 91% similarity to Q1 2025 incident.`,
      type: "action", severity: "info", aiConfidence: 94,
    },
    {
      id: 3, week: row.startedOnWeek, date: "Day 2",
      title: "Stakeholder Notification",
      description: `Assigned to ${row.assignedTo}. Automated alerts sent to supply chain team, regional planner, and operations manager. Priority escalated to ${row.priority}.`,
      type: "escalation", severity: "warning",
    },
    {
      id: 4, week: row.startedOnWeek, date: "Day 3",
      title: "Scenario Generation",
      description: `AI generated 3 mitigation scenarios. Scenario 3 (Rescheduling + Flex Labor + Stock Rebalancing) recommended with 91% success probability and €16K cost.`,
      type: "action", severity: "info", aiConfidence: 91,
    },
    {
      id: 5, week: row.startedOnWeek, date: "Day 5",
      title: "Mitigation Initiated",
      description: `Selected scenario approved by L1 planner. Stock rebalancing from DC-North initiated. Flex labor pool activation in progress (15 operators, 48h onboarding).`,
      type: "milestone", severity: "info",
    },
    ...(row.riskInDays > 10 ? [{
      id: 6, week: row.startedOnWeek, date: `Day ${Math.min(row.riskInDays, 10)}`,
      title: "Progress Checkpoint",
      description: `Service level recovered to 92%. Stock rebalancing 70% complete. Flex labor operational. Demand forecast accuracy improved to ±12%.`,
      type: "milestone" as const, severity: "success" as const, aiConfidence: 88,
    }] : []),
    ...(row.status === "Closed" ? [{
      id: 7, week: row.endedOnWeek || row.startedOnWeek, date: `Day ${row.riskInDays}`,
      title: "Risk Resolved",
      description: `Risk successfully mitigated. Service level restored to 98%. Total cost: €16,000. Lessons learned documented for future pattern matching.`,
      type: "resolution" as const, severity: "success" as const, aiConfidence: 98,
    }] : [{
      id: 7, week: "Current", date: `Day ${row.riskInDays}`,
      title: "Active Monitoring",
      description: `Risk remains open. Current stock: ${row.stockCS.toLocaleString()} CS. Expected loss: ${row.expectedLossCases.toLocaleString()} cases. AI continuously monitoring for changes.`,
      type: "escalation" as const, severity: "warning" as const, aiConfidence: 92,
    }]),
  ];

  const typeStyles = {
    detection: { icon: AlertTriangle, color: "bg-destructive", dotColor: "bg-destructive", lineColor: "border-destructive/30" },
    escalation: { icon: Zap, color: "bg-warning", dotColor: "bg-warning", lineColor: "border-warning/30" },
    action: { icon: Brain, color: "bg-primary", dotColor: "bg-primary", lineColor: "border-primary/30" },
    milestone: { icon: Shield, color: "bg-primary", dotColor: "bg-primary", lineColor: "border-primary/30" },
    resolution: { icon: CheckCircle2, color: "bg-success", dotColor: "bg-success", lineColor: "border-success/30" },
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <Clock className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-foreground">Risk Story Timeline</h4>
          <p className="text-[10px] text-muted-foreground">
            RISK-{String(row.riskId).padStart(3, "0")} · {row.riskInDays} days · {events.length} events
          </p>
        </div>
        <Badge variant="outline" className={`ml-auto text-[9px] ${
          row.status === "Open" 
            ? "bg-warning/10 text-warning border-warning/30" 
            : "bg-success/10 text-success border-success/30"
        }`}>
          {row.status.toUpperCase()}
        </Badge>
      </div>

      <div className="relative">
        {events.map((event, i) => {
          const style = typeStyles[event.type];
          const Icon = style.icon;
          const isExpanded = expandedEvent === event.id;
          const isLast = i === events.length - 1;

          return (
            <div key={event.id} className="flex gap-4 group">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`h-8 w-8 rounded-full ${style.color} flex items-center justify-center shadow-lg relative z-10`}
                  style={{ boxShadow: `0 0 12px ${style.dotColor === "bg-destructive" ? "hsl(0, 72%, 51%, 0.4)" : style.dotColor === "bg-warning" ? "hsl(38, 92%, 50%, 0.4)" : style.dotColor === "bg-success" ? "hsl(142, 71%, 45%, 0.4)" : "hsl(199, 89%, 48%, 0.4)"}` }}
                >
                  <Icon className="h-3.5 w-3.5 text-white" />
                </div>
                {!isLast && (
                  <div className={`w-px flex-1 min-h-[40px] border-l-2 border-dashed ${style.lineColor}`} />
                )}
              </div>

              {/* Content */}
              <div
                className={`flex-1 pb-6 cursor-pointer transition-all ${isLast ? "pb-0" : ""}`}
                onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono-tech text-muted-foreground">{event.date}</span>
                  <span className="text-[9px] text-muted-foreground/60">·</span>
                  <span className="text-[10px] text-muted-foreground">{event.week}</span>
                  {event.aiConfidence && (
                    <Badge variant="outline" className="text-[8px] border-primary/30 text-primary ml-auto">
                      <Brain className="h-2.5 w-2.5 mr-0.5" /> {event.aiConfidence}%
                    </Badge>
                  )}
                </div>
                <h5 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                  {event.title}
                </h5>
                <p className={`text-[11px] text-muted-foreground leading-relaxed mt-1 transition-all ${
                  isExpanded ? "" : "line-clamp-2"
                }`}>
                  {event.description}
                </p>
                {!isExpanded && event.description.length > 120 && (
                  <button className="text-[10px] text-primary mt-0.5 flex items-center gap-0.5 hover:underline">
                    Show more <ArrowRight className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
