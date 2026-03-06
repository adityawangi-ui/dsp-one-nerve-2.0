import { RiskRow } from "@/data/riskData";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props { row: RiskRow; }

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
