import { RiskRow } from "@/data/riskData";
import { Scenario } from "./ScenarioSimulatorTab";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Play } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Props {
  row: RiskRow;
  selectedScenario: Scenario | null;
  onTriggerApproval: () => void;
}

function KpiCard({ label, value, subtitle, color = "text-primary" }: { label: string; value: string; subtitle?: string; color?: string }) {
  return (
    <div className="border border-border rounded-xl p-4 bg-card">
      <span className={`text-xs font-semibold ${color}`}>{label}</span>
      <p className="text-xl font-bold text-foreground mt-1">{value}</p>
      {subtitle && <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>}
    </div>
  );
}

export default function OutcomeEvaluationTab({ row, selectedScenario, onTriggerApproval }: Props) {
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const scenario = selectedScenario || { id: 3, name: "Rescheduling + Short-Term Labor + Stock Rebalancing", serviceLevel: 98, feasibility: 92, historicalSuccess: 89, cost: 16000, recommended: true };

  const handleExecute = () => setShowApprovalDialog(true);

  return (
    <div className="space-y-6">
      {/* Scenario Header */}
      <div className="border border-border rounded-xl p-5 bg-primary/[0.03]">
        <div className="flex items-center gap-2 mb-1">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Scenario {scenario.id}</Badge>
          <h3 className="text-base font-bold text-foreground">{scenario.name}</h3>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs">Service Level</Badge>
          <span className="text-lg font-bold text-primary">{scenario.serviceLevel}%</span>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <h4 className="text-sm font-bold text-foreground mb-4">Primary KPIs</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <KpiCard label="Demand Variability" value="±18%" subtitle="Forecast Accuracy Impact" />
          <KpiCard label="Cross-SKU Impact" value="4 SKUs" subtitle="affected by mitigation" />
          <KpiCard label="PTF Flexibility" value="92%" subtitle="flexibility utilized" />
          <KpiCard label="Capacity Constraints" value="35%" subtitle="PU2 line capacity" />
          <KpiCard label="RMPM Availability" value="88%" subtitle="required material available" />
        </div>
      </div>

      {/* Impact Evaluation KPIs */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <h4 className="text-sm font-bold text-foreground mb-4">Impact Evaluation KPIs</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard label="Service Level" value="96%" subtitle="Post-Mitigation for MRDR-B" color="text-emerald-600" />
          <KpiCard label="TO Impact" value="€260K" subtitle="TO Preserved or Gained" color="text-emerald-600" />
          <KpiCard label="OSA Improvement" value="+6%" subtitle="increase" color="text-emerald-600" />
          <KpiCard label="OOS Reduction" value="-2%" subtitle="decrease in Out of Stock" color="text-emerald-600" />
        </div>
      </div>

      {/* SC Cost Calculation */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <h4 className="text-sm font-bold text-foreground mb-4">SC Cost Calculation</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Flex labor:</span><span className="font-semibold text-foreground">€10,000</span></div>
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Stock rebalancing logistics:</span><span className="font-semibold text-foreground">€6,000</span></div>
          <p className="text-xs text-muted-foreground italic">No strategic costs for this scenario</p>
          <div className="border-t border-border pt-3 flex justify-between">
            <span className="text-sm font-bold text-foreground">Total SC Cost:</span>
            <span className="text-lg font-bold text-emerald-600">€{scenario.cost.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Selected for Implementation */}
      <div className="flex justify-center">
        <Button variant="default" size="lg" className="gap-2 px-8 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => {}}>
          <CheckCircle2 className="h-4 w-4" /> Selected for Implementation
        </Button>
      </div>

      {/* Recommendation Banner */}
      <div className="border-2 border-emerald-500/30 rounded-xl p-4 bg-emerald-50/50">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <h4 className="text-sm font-bold text-emerald-800">Recommendation: {scenario.name}</h4>
        </div>
        <p className="text-xs text-emerald-700">
          Offers the best balance of success probability ({scenario.successProbability}%), cost efficiency (€{(scenario.cost / 1000).toFixed(0)}K), and resource optimization. Leverages flex labor pool and production rescheduling for optimal capacity utilization.
        </p>
      </div>

      {/* Execute */}
      <div className="flex justify-center">
        <Button onClick={handleExecute} size="lg" className="gap-2 px-8 bg-emerald-600 hover:bg-emerald-700 text-white">
          <Play className="h-4 w-4" /> Execute Selected Mitigation Plan
        </Button>
      </div>

      {/* Approval Workflow Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-foreground">Approval Workflow Triggered</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Your selected mitigation scenario has been submitted for approval and execution.</p>

          <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/50 space-y-2 mb-4">
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-sm font-semibold text-primary">Scenario Selected:</span></div>
            <p className="text-xs text-primary/80 ml-3.5">{scenario.name}</p>
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-sm text-foreground"><strong>Expected Cost:</strong> €{scenario.cost.toLocaleString()}</span></div>
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /><span className="text-sm text-foreground"><strong>Success Probability:</strong> {scenario.successProbability}%</span></div>
          </div>

          <div className="border border-primary/20 rounded-xl p-4 bg-primary/[0.03] space-y-2 mb-4">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-primary"><RefreshIcon /> Next Steps:</div>
            <ul className="text-xs text-muted-foreground space-y-1 ml-5">
              <li>• L1 Planner approval required</li>
              <li>• Operations Manager review</li>
              <li>• Finance approval (if cost &gt; €15K)</li>
              <li>• Final Supply Chain Director sign-off</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>Stay Here</Button>
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { setShowApprovalDialog(false); onTriggerApproval(); }}>
              <Play className="h-4 w-4" /> Proceed to Approval Workflow
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}
