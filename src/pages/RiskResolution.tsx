import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Package,
  MapPin,
  Calendar,
  ArrowRight,
  BarChart3,
} from "lucide-react";

export default function RiskResolution() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen misty-bg p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold gradient-text">Risk Resolution Presentation</h1>
              <p className="text-sm text-muted-foreground">
                Visual storytelling of mitigation impact and business outcomes
              </p>
            </div>
            <Button onClick={() => navigate("/execution-tracker")} className="gap-2">
              Execute Solution
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Hero Summary */}
          <Card className="p-8 bg-gradient-to-br from-success/20 to-success/10 border-2 border-success/40 rounded-[18px] shadow-[var(--shadow-glow)] animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-success/30">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Scenario 1: Inter-DC Rebalance</h2>
                  <p className="text-sm text-muted-foreground">Optimal solution for OOS risk mitigation</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white/80 backdrop-blur rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="text-xs text-muted-foreground">Service Recovery</span>
                  </div>
                  <p className="text-3xl font-bold text-success">96%</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-xs text-muted-foreground">Total Cost</span>
                  </div>
                  <p className="text-3xl font-bold text-primary">₹1.3L</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-warning" />
                    <span className="text-xs text-muted-foreground">TO Saved</span>
                  </div>
                  <p className="text-3xl font-bold text-warning">₹5.4 Cr</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-success" />
                    <span className="text-xs text-muted-foreground">Execution Time</span>
                  </div>
                  <p className="text-3xl font-bold text-success">2 days</p>
                </div>
              </div>
            </div>
          </Card>

          {/* What Changed */}
          <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                What Changed
              </h3>

              <div className="grid grid-cols-2 gap-6">
                {/* Chennai Impact */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-success" />
                    <h4 className="font-semibold text-foreground">Chennai DC</h4>
                    <Badge className="text-[10px] bg-success">Receiving</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-surface rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Stock Level</span>
                        <span className="text-sm font-bold text-success">1000 → 3000 units</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-[33%] bg-destructive" />
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden mt-1">
                        <div className="h-full w-full bg-success" />
                      </div>
                    </div>

                    <div className="p-3 bg-surface rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">DOH</span>
                        <span className="text-sm font-bold text-success">5 → 16 days</span>
                      </div>
                    </div>

                    <div className="p-3 bg-surface rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Value</span>
                        <span className="text-sm font-bold text-success">₹2.3 Cr → ₹7.2 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bangalore Impact */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold text-foreground">Bangalore DC</h4>
                    <Badge className="text-[10px] bg-primary">Sending</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-surface rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground">Stock Level</span>
                        <span className="text-sm font-bold text-primary">8000 → 6000 units</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-full bg-success" />
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden mt-1">
                        <div className="h-full w-[75%] bg-success" />
                      </div>
                    </div>

                    <div className="p-3 bg-surface rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">DOH</span>
                        <span className="text-sm font-bold text-primary">38 → 24 days</span>
                      </div>
                    </div>

                    <div className="p-3 bg-surface rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Value</span>
                        <span className="text-sm font-bold text-primary">₹18.6 Cr → ₹11.4 Cr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* DOH Recovery Curve */}
          <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">DOH Recovery Curve - Chennai</h3>

              <div className="h-64 bg-gradient-to-br from-primary/5 to-surface rounded-lg p-6">
                <div className="h-full flex items-end justify-between gap-2">
                  {[
                    { week: "W1", doh: 5, after: false },
                    { week: "W2", doh: 5, after: false },
                    { week: "W3", doh: 16, after: true },
                    { week: "W4", doh: 14, after: true },
                    { week: "W5", doh: 12, after: true },
                    { week: "W6", doh: 15, after: true },
                  ].map((data, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className={`w-full rounded-t-lg transition-all ${
                          data.after
                            ? data.doh >= 10
                              ? "bg-success"
                              : "bg-warning"
                            : "bg-destructive"
                        }`}
                        style={{ height: `${(data.doh / 20) * 100}%` }}
                      />
                      <div className="text-center">
                        <p className="text-xs font-bold text-foreground">{data.doh}d</p>
                        <p className="text-[10px] text-muted-foreground">{data.week}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-destructive" />
                  <span className="text-muted-foreground">Before (Critical)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-success" />
                  <span className="text-muted-foreground">After (Healthy)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Cost Breakdown */}
          <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Cost Breakdown
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-surface rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Transport Cost</p>
                  <p className="text-2xl font-bold text-foreground">₹0.8L</p>
                </div>
                <div className="p-4 bg-surface rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Handling Charges</p>
                  <p className="text-2xl font-bold text-foreground">₹0.3L</p>
                </div>
                <div className="p-4 bg-surface rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Admin & Others</p>
                  <p className="text-2xl font-bold text-foreground">₹0.2L</p>
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Total Investment</span>
                  <span className="text-2xl font-bold text-primary">₹1.3L</span>
                </div>
                <div className="mt-2 pt-2 border-t border-border/30">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Trade Order Saved</span>
                    <span className="font-bold text-success">₹5.4 Cr</span>
                  </div>
                  <p className="text-[10px] text-success mt-1">ROI: 4,154% (Averted OOS impact)</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Tradeoff Summary */}
          <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/30 rounded-[18px] animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">⚠️ Trade-off Summary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bangalore DOH reduces from 38 to 24 days but remains within healthy range. No production changes required. Minimal planning disruption. Expected TO saved: ₹5.4 Cr with 96% service recovery. Recommended for immediate execution.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
