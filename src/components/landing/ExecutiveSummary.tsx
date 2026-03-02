import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, DollarSign, Package, Truck } from "lucide-react";

interface SummaryMetric {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue: string;
  change: string;
  positive: boolean;
}

const metrics: SummaryMetric[] = [
  { icon: DollarSign, label: "Value at Risk", value: "$2.4M", subValue: "across 47 critical items", change: "+8%", positive: false },
  { icon: Package, label: "Open Risks", value: "847", subValue: "of 1,281 total tracked", change: "-12", positive: true },
  { icon: Truck, label: "Avg Lead Time", value: "4.2d", subValue: "vs 3.8d target", change: "+0.4d", positive: false },
  { icon: BarChart3, label: "Resolution Rate", value: "76%", subValue: "434 closed this cycle", change: "+5%", positive: true },
];

export default function ExecutiveSummary() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
      {metrics.map((m) => (
        <Card key={m.label} className="p-3 space-y-1.5 hover:shadow-[var(--shadow-elevated)] transition-all">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/8">
              <m.icon className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">{m.label}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold font-mono-tech text-foreground">{m.value}</span>
            <Badge variant="outline" className={`text-[8px] px-1 py-0 ${m.positive ? "text-success border-success/30" : "text-destructive border-destructive/30"}`}>
              {m.change}
            </Badge>
          </div>
          <p className="text-[9px] text-muted-foreground">{m.subValue}</p>
        </Card>
      ))}
    </div>
  );
}
