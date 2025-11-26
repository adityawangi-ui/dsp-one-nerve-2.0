import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, TrendingDown, Package, ArrowRight, Calendar, DollarSign } from "lucide-react";

export default function RiskLanding() {
  const navigate = useNavigate();

  const risks = [
    {
      id: 1,
      sku: "Clear Shampoo 400ml",
      location: "Customer DC Chennai",
      type: "OOS",
      probability: "High",
      severity: "High",
      businessImpact: "₹5.4 Cr",
      dateDetected: "Week 3",
      status: "Active",
      doh: 5,
      sentiment: "Trending Up",
      highlight: true,
    },
    {
      id: 2,
      sku: "Dove Soap Bar 100g",
      location: "Customer DC Mumbai",
      type: "Below RS",
      probability: "Medium",
      severity: "Medium",
      businessImpact: "₹2.1 Cr",
      dateDetected: "Week 2",
      status: "Monitoring",
      doh: 8,
      sentiment: "Stable",
      highlight: false,
    },
    {
      id: 3,
      sku: "Surf Excel 1kg",
      location: "Customer DC Delhi",
      type: "OOS",
      probability: "Low",
      severity: "Low",
      businessImpact: "₹0.8 Cr",
      dateDetected: "Week 4",
      status: "Resolved",
      doh: 12,
      sentiment: "Stable",
      highlight: false,
    },
  ];

  const selectedRisk = risks[0];

  return (
    <MainLayout>
      <div className="min-h-screen misty-bg p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Risk Intelligence Center</h1>
            <p className="text-sm text-muted-foreground">
              Real-time supply chain risk detection and autonomous mitigation
            </p>
          </div>

          {/* Risk Inbox */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Risk List */}
            <div className="lg:col-span-2">
              <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Risk Inbox</h2>
                  <Badge variant="outline" className="text-xs border-destructive/30 text-destructive bg-destructive/5">
                    3 Active Risks
                  </Badge>
                </div>

                {/* Table */}
                <div className="space-y-3">
                  {risks.map((risk) => (
                    <div
                      key={risk.id}
                      onClick={() => navigate("/risk-detail")}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                        risk.highlight
                          ? "border-destructive/50 bg-destructive/5 hover:border-destructive"
                          : "border-border/30 bg-background hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${risk.highlight ? "text-destructive" : "text-warning"}`} />
                            <h3 className="font-semibold text-foreground">{risk.sku}</h3>
                            <Badge variant="secondary" className="text-[10px]">
                              {risk.location}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Type:</span>
                              <Badge variant="outline" className={`text-[10px] ${risk.type === "OOS" ? "border-destructive/30 text-destructive" : "border-warning/30 text-warning"}`}>
                                {risk.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Probability:</span>
                              <span className="font-medium text-foreground">{risk.probability}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Severity:</span>
                              <span className="font-medium text-foreground">{risk.severity}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3 text-muted-foreground" />
                              <span className="font-semibold text-destructive">{risk.businessImpact}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge className={`text-[10px] ${risk.status === "Active" ? "bg-destructive" : risk.status === "Monitoring" ? "bg-warning" : "bg-success"}`}>
                            {risk.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <span className="text-xs">View</span>
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Panel - Mini Insights */}
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-to-br from-card to-surface border border-border/30 rounded-[18px] shadow-[var(--shadow-card)]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">DOH Projection</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Current DOH</span>
                      <span className="font-bold text-destructive">{selectedRisk.doh} days</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-destructive to-warning transition-all"
                        style={{ width: `${(selectedRisk.doh / 20) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">Projected OOS in 5 days</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-card to-surface border border-border/30 rounded-[18px] shadow-[var(--shadow-card)]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-warning" />
                    <h3 className="text-sm font-semibold text-foreground">Social Sentiment</h3>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-xs border-warning/30 text-warning bg-warning/10">
                      Demand Surge Detected
                    </Badge>
                    <p className="text-[10px] text-muted-foreground">+23% sell-out vs forecast</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-[18px] shadow-[var(--shadow-glow)]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <h3 className="text-sm font-semibold text-foreground">Analytics Agent</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    "Demand surge detected. Inventory projection shows OOS risk in 5 days. Sell-out trend and social sentiment indicate high customer demand."
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
