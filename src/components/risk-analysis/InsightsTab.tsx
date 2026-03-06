import { RiskRow } from "@/data/riskData";
import { AlertTriangle, TrendingUp, Package, Truck, Factory, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line, Legend, AreaChart, Area } from "recharts";

interface Props { row: RiskRow; }

const demandSupplyData = [
  { week: "W1", demand: 2800, supply: 3200, gap: 400 },
  { week: "W2", demand: 3500, supply: 2100, gap: -1400 },
  { week: "W3", demand: 4200, supply: 1800, gap: -2400 },
  { week: "W4", demand: 3800, supply: 2500, gap: -1300 },
  { week: "W5", demand: 3200, supply: 3100, gap: -100 },
  { week: "W6", demand: 2900, supply: 3400, gap: 500 },
];

const inventoryCoverage = [
  { week: "W1", coverage: 12, target: 14 },
  { week: "W2", coverage: 8, target: 14 },
  { week: "W3", coverage: 4, target: 14 },
  { week: "W4", coverage: 6, target: 14 },
  { week: "W5", coverage: 10, target: 14 },
  { week: "W6", coverage: 13, target: 14 },
];

const oosTimeline = [
  { week: "W1", probability: 15 },
  { week: "W2", probability: 45 },
  { week: "W3", probability: 78 },
  { week: "W4", probability: 65 },
  { week: "W5", probability: 30 },
  { week: "W6", probability: 12 },
];

const historicalSuccess = [
  { method: "Transship", rate: 82 },
  { method: "Reschedule", rate: 91 },
  { method: "Extra Shift", rate: 76 },
  { method: "SKU Sub", rate: 68 },
  { method: "Stock Rebal.", rate: 88 },
];

function InsightCard({ icon: Icon, title, items, color }: { icon: React.ElementType; title: string; items: string[]; color: string }) {
  return (
    <div className="border border-border rounded-xl p-4 bg-card hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
            <span className="text-primary mt-0.5">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChartCard({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="border border-border rounded-xl p-4 bg-card">
      <h4 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wider">{title}</h4>
      <div className="h-52">{children}</div>
    </div>
  );
}

export default function InsightsTab({ row }: Props) {
  return (
    <div className="space-y-6">
      {/* Critical Risk Focus */}
      <div className="border-2 border-destructive/30 rounded-xl p-5 bg-destructive/5">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          <h3 className="text-base font-bold text-destructive">Critical Risk Focus: RISK-{String(row.riskId).padStart(3, "0")}</h3>
        </div>
        <p className="text-sm text-destructive/80 mb-3">
          Critical {row.riskType} risk in weeks W2–W4. Prioritized due to key promotional role in W3. RMPM availability constrained due to delayed inbound shipments.
        </p>
        <div className="flex gap-2 mb-3">
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-xs">{row.riskType}</Badge>
          <Badge variant="outline" className="text-xs">MRDR-{String.fromCharCode(65 + (row.mrdr % 5))}</Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-3">Supplier capacity issues</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-xs text-muted-foreground">Volume at Risk:</span><p className="text-sm font-bold">2,500</p></div>
          <div><span className="text-xs text-muted-foreground">Duration:</span><p className="text-sm font-bold">{row.riskInDays} days</p></div>
          <div><span className="text-xs text-muted-foreground">Business Impact:</span><p className="text-sm font-bold">High</p></div>
          <div><span className="text-xs text-muted-foreground">Risk Score:</span><p className="text-sm font-bold">96</p></div>
        </div>
      </div>

    </div>
  );
}
