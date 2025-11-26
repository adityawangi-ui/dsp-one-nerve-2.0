import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Send,
  Truck,
  Factory,
  PackageX,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function MitigationScenarios() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [showScenarios, setShowScenarios] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowScenarios(true);
    }, 2500);
  };

  const scenarios = [
    {
      id: 1,
      title: "Scenario 1: Inter-DC Stock Rebalance (ITST)",
      icon: Truck,
      color: "primary",
      summary: "Move stock from Bangalore → Chennai",
      cost: "₹1.3L",
      service: "96%",
      tradeoff: "Lower DOH in Bangalore",
      details: [
        { location: "Chennai", currentStock: "1000", projected: "3000", dohBefore: "5", dohAfter: "16", valueBefore: "2.3 Cr", valueAfter: "7.2 Cr" },
        { location: "Bangalore", currentStock: "8000", projected: "6000", dohBefore: "38", dohAfter: "24", valueBefore: "18.6 Cr", valueAfter: "11.4 Cr" },
      ],
    },
    {
      id: 2,
      title: "Scenario 2: Pull Forward Production",
      icon: Factory,
      color: "warning",
      summary: "Bring Week 4 batch to Week 2",
      cost: "₹6L",
      service: "98%",
      tradeoff: "Slight overstock in Week 5",
      details: [
        { metric: "Production Qty W2", before: "0", after: "2000" },
        { metric: "DOH", before: "5", after: "15" },
        { metric: "Value", before: "2.3 Cr", after: "7.2 Cr" },
        { metric: "Service W3", before: "Risk of OOS", after: "98%" },
      ],
    },
    {
      id: 3,
      title: "Scenario 3: Temporary SKU Substitution",
      icon: PackageX,
      color: "success",
      summary: "Substitute with 380ml variant",
      cost: "₹2.6L",
      service: "94%",
      tradeoff: "TO loss ₹40L",
      details: [
        { metric: "Substitute SKU", value: "Clear 380ml" },
        { metric: "Availability", value: "8000 units" },
        { metric: "Customer Acceptance", value: "Medium" },
        { metric: "Brand Impact", value: "Low" },
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen misty-bg p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Agentic Workspace</h1>
            <p className="text-sm text-muted-foreground">
              Autonomous scenario generation with real-time agent collaboration
            </p>
          </div>

          {/* Conversation Box */}
          <Card className="p-6 bg-white border-2 border-primary/30 rounded-[18px] shadow-[var(--shadow-glow)]">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Risk Mitigation Agent</h3>
                  <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                    Ready to Generate
                  </Badge>
                </div>
              </div>

              <div className="frosted-glass rounded-xl border border-primary/20 p-4">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Type 'Generate mitigation options' or ask a question..."
                    className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isGenerating) {
                        handleGenerate();
                      }
                    }}
                  />
                  <Button size="icon" className="rounded-xl" onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Agent Processing Animation */}
          {isGenerating && (
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-[18px] animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  <p className="text-sm font-medium text-foreground">
                    Processing inputs from Inventory Agent, Capacity Agent, Cost Agent, Master Data...
                  </p>
                </div>
                <div className="space-y-2">
                  {["Inventory Agent", "Capacity Agent", "Cost Agent", "Master Data Agent"].map((agent, idx) => (
                    <div key={idx} className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: `${idx * 0.2}s` }}>
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <span className="text-xs text-muted-foreground">{agent} data retrieved</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Scenarios */}
          {showScenarios && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Generated Mitigation Scenarios</h2>
                <Button onClick={() => navigate("/scenario-comparison")} className="gap-2">
                  Compare Scenarios
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {scenarios.map((scenario, idx) => (
                  <Card
                    key={scenario.id}
                    className="p-6 bg-gradient-to-br from-card to-surface border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.15}s` }}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-${scenario.color}/20`}>
                            <scenario.icon className={`h-5 w-5 text-${scenario.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{scenario.title}</h3>
                            <p className="text-sm text-muted-foreground">{scenario.summary}</p>
                          </div>
                        </div>
                      </div>

                      {/* KPIs */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-white/60 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="h-4 w-4 text-warning" />
                            <span className="text-xs text-muted-foreground">Cost</span>
                          </div>
                          <p className="text-lg font-bold text-foreground">{scenario.cost}</p>
                        </div>
                        <div className="p-3 bg-white/60 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-success" />
                            <span className="text-xs text-muted-foreground">Service</span>
                          </div>
                          <p className="text-lg font-bold text-success">{scenario.service}</p>
                        </div>
                        <div className="p-3 bg-white/60 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground">Trade-off</span>
                          </div>
                          <p className="text-xs font-semibold text-warning">{scenario.tradeoff}</p>
                        </div>
                      </div>

                      {/* Details Table */}
                      <div className="bg-white/40 rounded-lg p-4">
                        <div className="overflow-x-auto">
                          {scenario.id === 1 && (
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="border-b border-border/30">
                                  <th className="text-left py-2 font-semibold text-muted-foreground">Location</th>
                                  <th className="text-right py-2 font-semibold text-muted-foreground">Current</th>
                                  <th className="text-right py-2 font-semibold text-muted-foreground">Projected</th>
                                  <th className="text-right py-2 font-semibold text-muted-foreground">DOH Before</th>
                                  <th className="text-right py-2 font-semibold text-muted-foreground">DOH After</th>
                                  <th className="text-right py-2 font-semibold text-muted-foreground">Value Before</th>
                                  <th className="text-right py-2 font-semibold text-muted-foreground">Value After</th>
                                </tr>
                              </thead>
                              <tbody>
                                {scenario.details.map((row, i) => (
                                  <tr key={i} className="border-b border-border/20">
                                    <td className="py-2 font-medium text-foreground">{row.location}</td>
                                    <td className="text-right py-2 text-foreground">{row.currentStock}</td>
                                    <td className="text-right py-2 text-foreground">{row.projected}</td>
                                    <td className="text-right py-2 text-foreground">{row.dohBefore}</td>
                                    <td className="text-right py-2 font-semibold text-success">{row.dohAfter}</td>
                                    <td className="text-right py-2 text-foreground">{row.valueBefore}</td>
                                    <td className="text-right py-2 font-semibold text-success">{row.valueAfter}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                          {scenario.id !== 1 && (
                            <div className="space-y-2">
                              {scenario.details.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-1">
                                  <span className="text-muted-foreground">{item.metric || item.value}</span>
                                  <span className="font-semibold text-foreground">
                                    {item.before && item.after ? `${item.before} → ${item.after}` : item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
