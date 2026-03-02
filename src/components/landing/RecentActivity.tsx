import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle, RefreshCw, Zap } from "lucide-react";

interface ActivityItem {
  icon: React.ElementType;
  text: string;
  time: string;
  type: "alert" | "resolved" | "update" | "ai";
}

const activities: ActivityItem[] = [
  { icon: AlertTriangle, text: "3 new OOS risks detected in DE region", time: "12 min ago", type: "alert" },
  { icon: Zap, text: "AI recommended rebalance for Dove Body Wash", time: "28 min ago", type: "ai" },
  { icon: CheckCircle, text: "Hellmann's Mayo supply recovery confirmed", time: "1h ago", type: "resolved" },
  { icon: RefreshCw, text: "MEIO norms recalculated for 1,240 SKUs", time: "2h ago", type: "update" },
  { icon: AlertTriangle, text: "Forecast bias alert: Home Care +6.2%", time: "3h ago", type: "alert" },
];

const typeStyles = {
  alert: "text-destructive bg-destructive/10",
  resolved: "text-success bg-success/10",
  update: "text-primary bg-primary/10",
  ai: "text-warning bg-warning/10",
};

export default function RecentActivity() {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <h3 className="text-xs font-semibold text-foreground">Recent Activity</h3>
        </div>
        <Badge variant="secondary" className="text-[9px] px-1.5 py-0">Live</Badge>
      </div>

      <div className="space-y-1">
        {activities.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-secondary/40 transition-colors cursor-default">
            <div className={`p-1 rounded-md shrink-0 mt-0.5 ${typeStyles[item.type]}`}>
              <item.icon className="h-3 w-3" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-foreground leading-tight">{item.text}</p>
              <p className="text-[9px] text-muted-foreground mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
