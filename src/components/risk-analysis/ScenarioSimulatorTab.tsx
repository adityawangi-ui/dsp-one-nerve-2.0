import { useState } from "react";
import { RiskRow } from "@/data/riskData";
import { Play, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Props {
  row: RiskRow;
  onSelectScenario: (scenario: Scenario) => void;
  selectedScenario: Scenario | null;
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

const scenarios: Scenario[] = [
  { id: 1, name: "Re-prioritize + Transship + SKU Substitution", successProbability: 85, feasibility: 82, historicalSuccess: 87, cost: 26000, recommended: false },
  { id: 2, name: "Back-Up Line PU3 + Extra Shift + Prioritize Critical SKUs", successProbability: 89, feasibility: 88, historicalSuccess: 91, cost: 16000, recommended: false },
  { id: 3, name: "Rescheduling + Short-Term Labor + Stock Rebalancing", successProbability: 91, feasibility: 92, historicalSuccess: 89, cost: 16000, recommended: true },
];

const comparisonData = scenarios.map(s => ({
  name: `Scenario ${s.id}`,
  cost: s.cost,
  success: s.successProbability,
}));

export default function ScenarioSimulatorTab({ row, onSelectScenario, selectedScenario }: Props) {
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);

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

      {/* Scenario Comparison */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <h3 className="text-sm font-bold text-foreground mb-1">Scenario Comparison & Recommendation</h3>
        <p className="text-xs text-muted-foreground mb-4">Comprehensive analysis of all three mitigation approaches</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {scenarios.map(s => (
            <div
              key={s.id}
              className={`border-2 rounded-xl p-5 relative transition-all cursor-pointer hover:shadow-lg ${
                s.recommended ? "border-emerald-500 bg-emerald-50/30" : 
                selectedScenario?.id === s.id ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => onSelectScenario(s)}
            >
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">Scenario {s.id}</Badge>
                <div className="flex items-center gap-2">
                  {s.recommended && <Badge className="bg-emerald-500 text-white border-0 text-[10px]">RECOMMENDED</Badge>}
                  <button
                    onClick={(e) => { e.stopPropagation(); setExpandedScenario(expandedScenario === s.id ? null : s.id); }}
                    className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5 text-primary" />
                  </button>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-4">{s.name}</h4>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-primary">{s.successProbability}%</span>
                <p className="text-xs text-muted-foreground">Success Probability</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-secondary rounded-lg px-3 py-2 text-center">
                  <span className="text-sm font-bold text-foreground">{s.feasibility}%</span>
                  <p className="text-[10px] text-muted-foreground">Feasibility</p>
                </div>
                <div className="bg-secondary rounded-lg px-3 py-2 text-center">
                  <span className="text-sm font-bold text-foreground">{s.historicalSuccess}%</span>
                  <p className="text-[10px] text-muted-foreground">Historical Success</p>
                </div>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-foreground">€{s.cost.toLocaleString()}</span>
                <p className="text-xs text-muted-foreground">Total Investment</p>
              </div>
              {selectedScenario?.id === s.id && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Planner Input Button */}
        <div className="flex justify-center mt-6">
          <Button variant="default" className="gap-2">
            <Play className="h-4 w-4" /> Planner Input
          </Button>
        </div>
      </div>

      {/* Recommendation Banner */}
      <div className="border-2 border-emerald-500/30 rounded-xl p-4 bg-emerald-50/50">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <h4 className="text-sm font-bold text-emerald-800">Recommendation: Rescheduling + Short-Term Labor + Stock Rebalancing</h4>
        </div>
        <p className="text-xs text-emerald-700">
          Offers the best balance of success probability (91%), cost efficiency (€16K), and resource optimization. Leverages flex labor pool and production rescheduling for optimal capacity utilization.
        </p>
      </div>
    </div>
  );
}

export { scenarios };
