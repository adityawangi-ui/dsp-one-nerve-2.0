import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, TrendingUp, DollarSign, Clock, AlertTriangle, Target, Zap, Trophy } from "lucide-react";

export default function ScenarioComparison() {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);

  const scenarios = [
    {
      id: 1,
      name: "Inter-DC Rebalance",
      service: 96,
      cost: 1.3,
      toImpact: 5.4,
      osaImpact: "+2.5%",
      speed: 2,
      disruption: "Low",
      success: 92,
      recommended: true,
    },
    {
      id: 2,
      name: "Pull Forward Production",
      service: 98,
      cost: 6.0,
      toImpact: 5.4,
      osaImpact: "+3.2%",
      speed: 4,
      disruption: "Medium",
      success: 85,
      recommended: false,
    },
    {
      id: 3,
      name: "SKU Substitution",
      service: 94,
      cost: 2.6,
      toImpact: 5.0,
      osaImpact: "+1.8%",
      speed: 1,
      disruption: "Low",
      success: 78,
      recommended: false,
    },
  ];

  const kpis = [
    { label: "Service Recovery", icon: TrendingUp, key: "service", unit: "%" },
    { label: "Cost", icon: DollarSign, key: "cost", unit: "₹L" },
    { label: "TO Impact", icon: Trophy, key: "toImpact", unit: "₹Cr" },
    { label: "OSA Impact", icon: Target, key: "osaImpact", unit: "" },
    { label: "Execution Speed", icon: Clock, key: "speed", unit: " days" },
    { label: "Disruption Level", icon: AlertTriangle, key: "disruption", unit: "" },
    { label: "Success Probability", icon: Zap, key: "success", unit: "%" },
  ];

  const getScoreColor = (key: string, value: any, scenarioId: number) => {
    const numValue = typeof value === "number" ? value : 0;
    if (key === "service" || key === "success") {
      return numValue >= 95 ? "text-success" : numValue >= 90 ? "text-primary" : "text-warning";
    }
    if (key === "cost") {
      return numValue <= 2 ? "text-success" : numValue <= 4 ? "text-primary" : "text-warning";
    }
    if (key === "speed") {
      return numValue <= 2 ? "text-success" : numValue <= 3 ? "text-primary" : "text-warning";
    }
    return "text-foreground";
  };

  const getBarWidth = (key: string, value: any) => {
    const numValue = typeof value === "number" ? value : 0;
    if (key === "service" || key === "success") return `${numValue}%`;
    if (key === "cost") return `${Math.min((numValue / 6) * 100, 100)}%`;
    if (key === "speed") return `${Math.min((numValue / 5) * 100, 100)}%`;
    return "50%";
  };

  return (
    <MainLayout>
      <div className="min-h-screen misty-bg p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold gradient-text">Scenario Comparison</h1>
              <p className="text-sm text-muted-foreground">
                Side-by-side analysis with AI-powered recommendations
              </p>
            </div>
            <Button
              onClick={() => navigate("/risk-resolution")}
              disabled={selectedScenario === null}
              className="gap-2"
            >
              {selectedScenario ? `Approve Scenario ${selectedScenario}` : "Select a Scenario"}
              {selectedScenario && <CheckCircle2 className="h-4 w-4" />}
            </Button>
          </div>

          {/* Comparison Table */}
          <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)]">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4 font-semibold text-foreground">KPI</th>
                    {scenarios.map((scenario) => (
                      <th key={scenario.id} className="text-center py-4 px-4">
                        <div className="space-y-2">
                          <div className="font-semibold text-foreground">{scenario.name}</div>
                          {scenario.recommended && (
                            <Badge className="bg-success text-white text-[10px]">AI Recommended</Badge>
                          )}
                          <Button
                            variant={selectedScenario === scenario.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedScenario(scenario.id)}
                            className="w-full"
                          >
                            {selectedScenario === scenario.id ? "Selected" : "Select"}
                          </Button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {kpis.map((kpi, idx) => (
                    <tr key={idx} className="border-b border-border/30 hover:bg-surface/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <kpi.icon className="h-4 w-4 text-primary" />
                          <span className="font-medium text-foreground">{kpi.label}</span>
                        </div>
                      </td>
                      {scenarios.map((scenario) => (
                        <td key={scenario.id} className="py-4 px-4">
                          <div className="flex flex-col items-center gap-2">
                            <span
                              className={`text-lg font-bold ${getScoreColor(
                                kpi.key,
                                scenario[kpi.key as keyof typeof scenario],
                                scenario.id
                              )}`}
                            >
                              {scenario[kpi.key as keyof typeof scenario]}
                              {kpi.unit}
                            </span>
                            {typeof scenario[kpi.key as keyof typeof scenario] === "number" &&
                              kpi.key !== "toImpact" && (
                                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${
                                      (typeof scenario[kpi.key as keyof typeof scenario] === "number" &&
                                        ((kpi.key === "service" || kpi.key === "success") && (scenario[kpi.key as keyof typeof scenario] as number) >= 95)) ||
                                      (kpi.key === "cost" && typeof scenario[kpi.key as keyof typeof scenario] === "number" && (scenario[kpi.key as keyof typeof scenario] as number) <= 2) ||
                                      (kpi.key === "speed" && typeof scenario[kpi.key as keyof typeof scenario] === "number" && (scenario[kpi.key as keyof typeof scenario] as number) <= 2)
                                        ? "bg-success"
                                        : "bg-primary"
                                    } transition-all`}
                                    style={{
                                      width: getBarWidth(kpi.key, scenario[kpi.key as keyof typeof scenario]),
                                    }}
                                  />
                                </div>
                              )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* AI Recommendation Panel */}
          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-[18px] shadow-[var(--shadow-glow)] animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-success/20">
                  <Trophy className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Recommendation</h3>
                  <Badge variant="outline" className="text-[10px] border-success/30 text-success">
                    Optimal Solution
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-white/60 backdrop-blur rounded-lg">
                <p className="text-sm text-foreground leading-relaxed">
                  <strong>Scenario 1 (Inter-DC Rebalance)</strong> is recommended based on:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    Lowest cost impact (₹1.3L) with high service recovery (96%)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    Fastest execution (2 days) with minimal disruption
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    Bangalore DOH remains healthy (24 days) after transfer
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                    High probability of success (92%) with established process
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                <p className="text-xs text-warning font-medium">
                  ⚠️ Note: Monitor Bangalore DOH closely in Week 4 to avoid secondary risks
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
