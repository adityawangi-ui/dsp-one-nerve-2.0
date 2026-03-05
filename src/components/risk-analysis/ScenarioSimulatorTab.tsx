import { useState } from "react";
import { RiskRow } from "@/data/riskData";
import { Play, CheckCircle2, ChevronDown, ChevronUp, Brain, TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

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

const scenarioDetails: Record<number, { aiInsights: string[]; actions: string[]; risks: string[]; timeline: string }> = {
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
  },
};

export default function ScenarioSimulatorTab({ row, onSelectScenario, selectedScenario, onTriggerApproval }: Props) {
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>(originalScenarios);
  const [isRefined, setIsRefined] = useState(false);

  const comparisonData = scenarios.map(s => ({
    name: `Scenario ${s.id}`,
    cost: s.cost,
    success: s.successProbability,
  }));

  const handleScenarioClick = (id: number) => {
    setExpandedScenario(expandedScenario === id ? null : id);
  };

  const handleSelectScenario = (s: Scenario) => {
    onSelectScenario(s);
  };

  const handleRefineScenarios = (targetScenarios: number[], feedback: string) => {
    // Simulate refinement by slightly adjusting values
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
  };

  return (
    <div className="space-y-6">
      {/* Cost vs Success Chart */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <h3 className="text-sm font-bold text-foreground mb-1">Cost vs Success Probability Analysis</h3>
        <p className="text-xs text-muted-foreground mb-4">Comparing the three mitigation approaches for MRDR-{String.fromCharCode(65 + (row.mrdr % 5))} (RISK-{String(row.riskId).padStart(3, "0")})</p>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar yAxisId="left" dataKey="cost" fill="hsl(var(--primary))" name="Cost (€)" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="success" fill="hsl(160, 60%, 45%)" name="Success %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revert button */}
      {isRefined && (
        <div className="flex items-center justify-between bg-amber-50/50 border border-amber-200 rounded-xl px-4 py-3">
          <p className="text-xs text-amber-700">Scenarios have been refined based on planner input</p>
          <Button variant="outline" size="sm" className="text-xs border-amber-300 text-amber-700 hover:bg-amber-100" onClick={handleRevertScenarios}>
            Revert to Original Scenarios
          </Button>
        </div>
      )}

      {/* Scenario Cards */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <h3 className="text-sm font-bold text-foreground mb-1">Scenario Comparison & Recommendation</h3>
        <p className="text-xs text-muted-foreground mb-4">Click on a scenario to see detailed AI insights and analysis</p>

        <div className="space-y-4">
          {scenarios.map(s => {
            const details = scenarioDetails[s.id];
            const isExpanded = expandedScenario === s.id;
            const isSelected = selectedScenario?.id === s.id;

            return (
              <div key={s.id} className={`border-2 rounded-xl transition-all ${
                s.recommended ? "border-emerald-500" :
                isSelected ? "border-primary" :
                isExpanded ? "border-primary/50" : "border-border"
              }`}>
                {/* Card Header - Always visible */}
                <div
                  className={`p-5 cursor-pointer hover:bg-muted/30 transition-colors rounded-t-xl ${
                    s.recommended ? "bg-emerald-50/30" : isSelected ? "bg-primary/5" : ""
                  }`}
                  onClick={() => handleScenarioClick(s.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Scenario {s.id}</Badge>
                      {s.recommended && <Badge className="bg-emerald-500 text-white border-0 text-[10px]">RECOMMENDED</Badge>}
                      {isSelected && <Badge className="bg-primary text-primary-foreground border-0 text-[10px]">SELECTED</Badge>}
                      <h4 className="text-sm font-semibold text-foreground">{s.name}</h4>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-6 text-center">
                        <div>
                          <span className="text-lg font-bold text-primary">{s.successProbability}%</span>
                          <p className="text-[10px] text-muted-foreground">Success</p>
                        </div>
                        <div>
                          <span className="text-lg font-bold text-foreground">{s.feasibility}%</span>
                          <p className="text-[10px] text-muted-foreground">Feasibility</p>
                        </div>
                        <div>
                          <span className="text-lg font-bold text-foreground">€{s.cost.toLocaleString()}</span>
                          <p className="text-[10px] text-muted-foreground">Cost</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && details && (
                  <div className="border-t border-border p-5 space-y-5 bg-muted/10">
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

                    {/* Actions & Risks side by side */}
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

                    {/* Detailed KPIs */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="bg-card border border-border rounded-lg p-3 text-center">
                        <span className="text-lg font-bold text-primary">{s.successProbability}%</span>
                        <p className="text-[10px] text-muted-foreground">Success Probability</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-3 text-center">
                        <span className="text-lg font-bold text-foreground">{s.feasibility}%</span>
                        <p className="text-[10px] text-muted-foreground">Feasibility</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-3 text-center">
                        <span className="text-lg font-bold text-foreground">{s.historicalSuccess}%</span>
                        <p className="text-[10px] text-muted-foreground">Historical Success</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-3 text-center">
                        <span className="text-lg font-bold text-foreground">€{s.cost.toLocaleString()}</span>
                        <p className="text-[10px] text-muted-foreground">Total Cost</p>
                      </div>
                      <div className="bg-card border border-border rounded-lg p-3 text-center">
                        <span className="text-lg font-bold text-emerald-600">96%</span>
                        <p className="text-[10px] text-muted-foreground">Expected Service Level</p>
                      </div>
                    </div>

                    {/* Select Scenario Button */}
                    <div className="flex justify-end pt-2">
                      <Button
                        className={`gap-2 ${isSelected ? "bg-emerald-600 hover:bg-emerald-700 text-white" : ""}`}
                        variant={isSelected ? "default" : "default"}
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
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Planner Input Refinement Button */}
      <PlannerRefinementDialog scenarios={scenarios} onRefine={handleRefineScenarios} />

      {/* Recommendation Banner */}
      <div className="border-2 border-emerald-500/30 rounded-xl p-4 bg-emerald-50/50">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <h4 className="text-sm font-bold text-emerald-800">Recommendation: {scenarios.find(s => s.recommended)?.name}</h4>
        </div>
        <p className="text-xs text-emerald-700">
          Offers the best balance of success probability, cost efficiency, and resource optimization. Leverages flex labor pool and production rescheduling for optimal capacity utilization.
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Settings, RefreshCw } from "lucide-react";
import { toast } from "sonner";

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
      <div className="flex justify-center">
        <Button variant="outline" className="gap-2" onClick={() => setOpen(true)}>
          <Settings className="h-4 w-4" /> Planner Input – Refine Scenarios
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Scenario Refinement Input
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* Scenario selection */}
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

            {/* Feedback */}
            <div>
              <Label className="text-sm font-semibold text-foreground">Refinement Feedback</Label>
              <Textarea
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                placeholder="E.g., 'Increase labor allocation for Scenario 2', 'Consider air freight for Scenario 1', 'Reduce cost of Scenario 3 by using DC-East instead'..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            {/* Actions */}
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
