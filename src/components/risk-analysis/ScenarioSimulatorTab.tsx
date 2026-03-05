import { useState } from "react";
import { RiskRow } from "@/data/riskData";
import { Play, CheckCircle2, ChevronDown, ChevronUp, Brain, TrendingUp, Shield, Zap, ArrowRight, Settings, RefreshCw, DollarSign, BarChart3, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Props {
  row: RiskRow;
  onSelectScenario: (scenario: Scenario) => void;
  selectedScenario: Scenario | null;
  onTriggerApproval: () => void;
}

export interface Scenario {
  id: number;
  name: string;
  successProbability: number;
  feasibility: number;
  historicalSuccess: number;
  cost: number;
  recommended: boolean;
}

const originalScenarios: Scenario[] = [
  { id: 1, name: "Re-prioritize + Transship + SKU Substitution", successProbability: 85, feasibility: 82, historicalSuccess: 87, cost: 26000, recommended: false },
  { id: 2, name: "Back-Up Line PU3 + Extra Shift + Prioritize Critical SKUs", successProbability: 89, feasibility: 88, historicalSuccess: 91, cost: 16000, recommended: false },
  { id: 3, name: "Rescheduling + Short-Term Labor + Stock Rebalancing", successProbability: 91, feasibility: 92, historicalSuccess: 89, cost: 16000, recommended: true },
];

const scenarioDetails: Record<number, { aiInsights: string[]; actions: string[]; risks: string[]; timeline: string; primaryKPIs: { label: string; value: string; trend: string }[]; impactKPIs: { label: string; value: string; color: string }[]; costBreakdown: { label: string; value: number }[] }> = {
  1: {
    aiInsights: [
      "Transshipment from DC-South has 82% historical success for similar disruptions",
      "SKU substitution could recover 60% of at-risk volume within 48 hours",
      "Re-prioritization may impact 2 lower-priority MRDRs in W3",
      "Combined approach shows strong synergy based on Q4 2025 precedent",
    ],
    actions: ["Re-prioritize production schedule for critical SKUs", "Initiate transshipment from DC-South (ETA: 3 days)", "Activate SKU substitution protocol for non-critical variants"],
    risks: ["Higher cost due to express logistics", "Potential quality variance with substitute SKUs", "DC-South inventory may be insufficient for full coverage"],
    timeline: "Execution: W2–W4 | Full recovery expected by W5",
    primaryKPIs: [
      { label: "Demand Variability", value: "12%", trend: "↓ 3%" },
      { label: "Cross-SKU Impact", value: "Medium", trend: "2 SKUs" },
      { label: "Production Flexibility", value: "72%", trend: "↑ 8%" },
      { label: "Capacity Utilization", value: "88%", trend: "↑ 5%" },
      { label: "Material Availability", value: "91%", trend: "Stable" },
    ],
    impactKPIs: [
      { label: "Service Level After Mitigation", value: "94%", color: "text-emerald-600" },
      { label: "Revenue Preserved", value: "€185K", color: "text-primary" },
      { label: "OSA Improvement", value: "+6%", color: "text-emerald-600" },
      { label: "OOS Reduction", value: "-78%", color: "text-emerald-600" },
    ],
    costBreakdown: [
      { label: "Express Logistics", value: 12000 },
      { label: "SKU Substitution Setup", value: 8000 },
      { label: "Production Reprioritization", value: 6000 },
    ],
  },
  2: {
    aiInsights: [
      "Back-up line PU3 can be activated within 24 hours with 88% reliability",
      "Extra shift adds 35% capacity but increases labor cost by €8K",
      "Critical SKU prioritization preserves 95% of high-margin volume",
      "Similar scenario in Jan 2025 achieved 91% success rate",
    ],
    actions: ["Activate PU3 backup production line", "Schedule extra shift for W2–W3 (night shift)", "Re-sequence production to prioritize critical SKUs first"],
    risks: ["PU3 maintenance was last done 6 weeks ago", "Night shift may have lower yield rates (~3%)", "Non-critical SKUs delayed by 1–2 weeks"],
    timeline: "Execution: W2–W3 | Stabilization by W4",
    primaryKPIs: [
      { label: "Demand Variability", value: "10%", trend: "↓ 5%" },
      { label: "Cross-SKU Impact", value: "Low", trend: "1 SKU" },
      { label: "Production Flexibility", value: "78%", trend: "↑ 14%" },
      { label: "Capacity Utilization", value: "92%", trend: "↑ 9%" },
      { label: "Material Availability", value: "94%", trend: "↑ 3%" },
    ],
    impactKPIs: [
      { label: "Service Level After Mitigation", value: "96%", color: "text-emerald-600" },
      { label: "Revenue Preserved", value: "€210K", color: "text-primary" },
      { label: "OSA Improvement", value: "+8%", color: "text-emerald-600" },
      { label: "OOS Reduction", value: "-85%", color: "text-emerald-600" },
    ],
    costBreakdown: [
      { label: "Labor (Extra Shift)", value: 8000 },
      { label: "PU3 Activation", value: 5000 },
      { label: "Production Resequencing", value: 3000 },
    ],
  },
  3: {
    aiInsights: [
      "Rescheduling non-critical SKUs frees 40% of PU2 capacity immediately",
      "Short-term labor pool has 15 qualified operators available within 48h",
      "Stock rebalancing from DC-North covers 70% of the gap at lowest cost",
      "This approach has the highest composite score across all evaluation criteria",
    ],
    actions: ["Reschedule non-critical SKUs from W2–W3 to W5–W6", "Activate flex labor pool (15 operators, 2-week contract)", "Initiate stock rebalancing: DC-North → DC-Central"],
    risks: ["Non-critical SKU delays may affect minor accounts", "Flex labor requires 48h onboarding period", "Rebalancing logistics depend on carrier availability"],
    timeline: "Execution: W2–W4 | Full recovery by W5 | Cost-optimized",
    primaryKPIs: [
      { label: "Demand Variability", value: "8%", trend: "↓ 7%" },
      { label: "Cross-SKU Impact", value: "Low", trend: "1 SKU" },
      { label: "Production Flexibility", value: "82%", trend: "↑ 18%" },
      { label: "Capacity Utilization", value: "94%", trend: "↑ 11%" },
      { label: "Material Availability", value: "96%", trend: "↑ 5%" },
    ],
    impactKPIs: [
      { label: "Service Level After Mitigation", value: "98%", color: "text-emerald-600" },
      { label: "Revenue Preserved", value: "€235K", color: "text-primary" },
      { label: "OSA Improvement", value: "+11%", color: "text-emerald-600" },
      { label: "OOS Reduction", value: "-92%", color: "text-emerald-600" },
    ],
    costBreakdown: [
      { label: "Flex Labor", value: 10000 },
      { label: "Stock Rebalancing Logistics", value: 6000 },
    ],
  },
};

export default function ScenarioSimulatorTab({ row, onSelectScenario, selectedScenario, onTriggerApproval }: Props) {
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>(originalScenarios);
  const [isRefined, setIsRefined] = useState(false);

  const handleScenarioClick = (id: number) => {
    setExpandedScenario(expandedScenario === id ? null : id);
  };

  const handleSelectScenario = (s: Scenario) => {
    onSelectScenario(s);
  };

  const handleRefineScenarios = (targetScenarios: number[], feedback: string) => {
    setScenarios(prev => prev.map(s => {
      if (targetScenarios.includes(s.id) || targetScenarios.length === 0) {
        return {
          ...s,
          successProbability: Math.min(99, s.successProbability + Math.floor(Math.random() * 5)),
          feasibility: Math.min(99, s.feasibility + Math.floor(Math.random() * 4)),
          cost: Math.max(5000, s.cost - Math.floor(Math.random() * 3000)),
        };
      }
      return s;
    }));
    setIsRefined(true);
  };

  const handleRevertScenarios = () => {
    setScenarios(originalScenarios);
    setIsRefined(false);
    toast.success("Reverted to original scenarios");
  };

  return (
    <div className="space-y-6">
      {/* Scenario Cards - Side by side squares */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <h3 className="text-sm font-bold text-foreground mb-1">Scenario Comparison & Recommendation</h3>
        <p className="text-xs text-muted-foreground mb-4">Click on a scenario to see detailed AI insights and analysis</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map(s => {
            const isSelected = selectedScenario?.id === s.id;
            const confidence = s.id === 1 ? 82 : s.id === 2 ? 88 : 94;
            const historicalCases = s.id === 1 ? 28 : s.id === 2 ? 35 : 42;

            return (
              <div
                key={s.id}
                className={`border-2 rounded-xl cursor-pointer transition-all hover:shadow-[var(--shadow-neon)] ${
                  s.recommended ? "border-success/60" :
                  isSelected ? "border-primary" : "border-border hover:border-primary/30"
                }`}
                onClick={() => handleScenarioClick(s.id)}
              >
                <div className={`p-5 ${s.recommended ? "bg-success/[0.06]" : isSelected ? "bg-primary/5" : ""}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">S{s.id}</Badge>
                    {s.recommended && <Badge className="bg-success text-success-foreground border-0 text-[10px]">RECOMMENDED</Badge>}
                    {isSelected && <Badge className="bg-primary text-primary-foreground border-0 text-[10px]">SELECTED</Badge>}
                  </div>
                  <h4 className="text-xs font-semibold text-foreground mb-4 leading-relaxed min-h-[2.5rem]">{s.name}</h4>

                  {/* Confidence Meter */}
                  <div className="mb-4 p-3 rounded-lg bg-secondary/50 border border-border/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Brain className="h-3 w-3" /> AI Confidence
                      </span>
                      <span className={`text-sm font-bold font-mono-tech ${confidence >= 90 ? "text-success neon-text-green" : confidence >= 85 ? "text-primary neon-text" : "text-warning neon-text-amber"}`}>
                        {confidence}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${confidence >= 90 ? "bg-success" : confidence >= 85 ? "bg-primary" : "bg-warning"}`}
                        style={{ width: `${confidence}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-1">Based on {historicalCases} historical cases</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center bg-secondary/50 rounded-lg p-2">
                      <span className="text-lg font-bold text-primary">{s.successProbability}%</span>
                      <p className="text-[10px] text-muted-foreground">Success</p>
                    </div>
                    <div className="text-center bg-secondary/50 rounded-lg p-2">
                      <span className="text-lg font-bold text-foreground">{s.feasibility}%</span>
                      <p className="text-[10px] text-muted-foreground">Feasibility</p>
                    </div>
                    <div className="text-center bg-secondary/50 rounded-lg p-2">
                      <span className="text-lg font-bold text-foreground">{s.historicalSuccess}%</span>
                      <p className="text-[10px] text-muted-foreground">Historical</p>
                    </div>
                    <div className="text-center bg-secondary/50 rounded-lg p-2">
                      <span className="text-lg font-bold text-foreground">€{(s.cost / 1000).toFixed(0)}K</span>
                      <p className="text-[10px] text-muted-foreground">Cost</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Scenario Details */}
      {expandedScenario && scenarioDetails[expandedScenario] && (() => {
        const s = scenarios.find(sc => sc.id === expandedScenario)!;
        const details = scenarioDetails[expandedScenario];
        const isSelected = selectedScenario?.id === s.id;

        return (
          <div className="border-2 border-primary/30 rounded-xl bg-card overflow-hidden">
            <div className="bg-primary/5 px-5 py-3 flex items-center justify-between border-b border-border">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20">Scenario {s.id}</Badge>
                <h3 className="text-sm font-bold text-foreground">{s.name}</h3>
                {s.recommended && <Badge className="bg-emerald-500 text-white border-0 text-[10px]">RECOMMENDED</Badge>}
              </div>
              <Button variant="ghost" size="sm" onClick={() => setExpandedScenario(null)}>
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-5 space-y-5">
              {/* AI Insights */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="h-4 w-4 text-primary" />
                  <h5 className="text-sm font-semibold text-foreground">AI Insights</h5>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {details.aiInsights.map((insight, i) => (
                    <div key={i} className="flex items-start gap-2 bg-primary/5 rounded-lg p-3">
                      <Zap className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <p className="text-xs text-foreground">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions & Risks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <h5 className="text-xs font-semibold text-foreground">Mitigation Actions</h5>
                  </div>
                  <ul className="space-y-1.5">
                    {details.actions.map((a, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <CheckCircle2 className="h-3 w-3 text-emerald-500 mt-0.5 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                    <h5 className="text-xs font-semibold text-foreground">Risk Factors</h5>
                  </div>
                  <ul className="space-y-1.5">
                    {details.risks.map((r, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-amber-500 mt-0.5">⚠</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-secondary rounded-lg px-4 py-2">
                <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Timeline:</span> {details.timeline}</p>
              </div>

              {/* Primary KPIs */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <h5 className="text-sm font-semibold text-foreground">Primary KPIs</h5>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {details.primaryKPIs.map((kpi, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-3 text-center">
                      <span className="text-lg font-bold text-foreground">{kpi.value}</span>
                      <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
                      <p className="text-[10px] text-emerald-600 font-medium">{kpi.trend}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Evaluation KPIs */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-4 w-4 text-emerald-600" />
                  <h5 className="text-sm font-semibold text-foreground">Impact Evaluation</h5>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {details.impactKPIs.map((kpi, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-3 text-center">
                      <span className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</span>
                      <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Breakdown */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                  <h5 className="text-sm font-semibold text-foreground">Cost Breakdown</h5>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {details.costBreakdown.map((item, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-3 text-center">
                      <span className="text-lg font-bold text-foreground">€{item.value.toLocaleString()}</span>
                      <p className="text-[10px] text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                  <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-3 text-center">
                    <span className="text-lg font-bold text-primary">€{s.cost.toLocaleString()}</span>
                    <p className="text-[10px] text-primary font-semibold">Total Cost</p>
                  </div>
                </div>
              </div>

              {/* Select Scenario Button */}
              <div className="flex justify-end pt-2">
                <Button
                  className={`gap-2 ${isSelected ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectScenario(s);
                  }}
                >
                  {isSelected ? (
                    <><CheckCircle2 className="h-4 w-4" /> Scenario Selected</>
                  ) : (
                    <><ArrowRight className="h-4 w-4" /> Select This Scenario</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Planner Recommendation + Revert buttons */}
      <div className="flex justify-center gap-3">
        <PlannerRefinementDialog scenarios={scenarios} onRefine={handleRefineScenarios} />
        {isRefined && (
          <Button variant="outline" className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-100" onClick={handleRevertScenarios}>
            <RefreshCw className="h-4 w-4" /> Revert to Original
          </Button>
        )}
      </div>

      {/* Recommendation Banner */}
      <div className="border-2 border-emerald-500/30 rounded-xl p-4 bg-emerald-50/50">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <h4 className="text-sm font-bold text-emerald-800">Recommendation: {scenarios.find(s => s.recommended)?.name}</h4>
        </div>
        <p className="text-xs text-emerald-700">
          Offers the best balance of success probability, cost efficiency, and resource optimization.
        </p>
      </div>

      {/* Trigger Approval if scenario selected */}
      {selectedScenario && (
        <div className="flex justify-center">
          <Button onClick={onTriggerApproval} size="lg" className="gap-2 px-8 bg-emerald-600 hover:bg-emerald-700 text-white">
            <CheckCircle2 className="h-4 w-4" /> Proceed with Selected Scenario
          </Button>
        </div>
      )}
    </div>
  );
}

export { originalScenarios as scenarios };

// --- Planner Refinement Dialog ---
function PlannerRefinementDialog({
  scenarios,
  onRefine,
}: {
  scenarios: Scenario[];
  onRefine: (targetScenarios: number[], feedback: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isRefining, setIsRefining] = useState(false);

  const toggleScenario = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setSelectAll(false);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    setSelectedIds(checked ? scenarios.map(s => s.id) : []);
  };

  const handleRefine = () => {
    setIsRefining(true);
    setTimeout(() => {
      onRefine(selectedIds, feedback);
      setIsRefining(false);
      setOpen(false);
      setFeedback("");
      setSelectedIds([]);
      setSelectAll(false);
      toast.success("Scenarios refined based on your input");
    }, 1500);
  };

  return (
    <>
      <Button variant="outline" className="gap-2" onClick={() => setOpen(true)}>
        <Settings className="h-4 w-4" /> Planner Recommendation
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Scenario Refinement Input
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div>
              <Label className="text-sm font-semibold text-foreground">Select Scenarios to Refine</Label>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 border border-border rounded-lg p-3 bg-secondary/30">
                  <Checkbox id="all" checked={selectAll} onCheckedChange={(c) => handleSelectAll(!!c)} />
                  <Label htmlFor="all" className="text-xs font-medium cursor-pointer">All Scenarios</Label>
                </div>
                {scenarios.map(s => (
                  <div key={s.id} className="flex items-center gap-2 border border-border rounded-lg p-3">
                    <Checkbox
                      id={`s-${s.id}`}
                      checked={selectedIds.includes(s.id)}
                      onCheckedChange={() => toggleScenario(s.id)}
                    />
                    <Label htmlFor={`s-${s.id}`} className="text-xs cursor-pointer flex-1">
                      <span className="font-medium">Scenario {s.id}:</span> {s.name}
                    </Label>
                    {s.recommended && <Badge className="bg-emerald-500 text-white border-0 text-[9px]">REC</Badge>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-foreground">Refinement Feedback</Label>
              <Textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="E.g., 'Increase labor allocation for Scenario 2', 'Consider air freight for Scenario 1'..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={handleRefine}
                disabled={isRefining || (selectedIds.length === 0 && !selectAll)}
                className="gap-2"
              >
                {isRefining ? (
                  <><RefreshCw className="h-4 w-4 animate-spin" /> Refining...</>
                ) : (
                  <><Play className="h-4 w-4" /> Refine Scenarios</>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
