import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Calendar,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
} from "lucide-react";

export default function RiskDetail() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen misty-bg p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold gradient-text">Risk 360° View</h1>
              <p className="text-sm text-muted-foreground">Clear Shampoo 400ml – OOS Risk at Customer DC Chennai</p>
            </div>
            <Button onClick={() => navigate("/mitigation-scenarios")} className="gap-2">
              Generate Mitigation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Agent Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analytics Agent Message */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-[18px] shadow-[var(--shadow-glow)] animate-fade-in">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/20">
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Analytics Agent</h3>
                    <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">
                      Detection Complete
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-white/60 backdrop-blur rounded-lg">
                    <p className="text-sm text-foreground leading-relaxed">
                      <strong>Demand surge detected</strong> for Clear Shampoo 400ml in South region.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/60 backdrop-blur rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-warning" />
                        <span className="text-xs text-muted-foreground">Sell-out Trend</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">+23%</p>
                      <p className="text-[10px] text-muted-foreground">vs forecast</p>
                    </div>

                    <div className="p-3 bg-white/60 backdrop-blur rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="h-4 w-4 text-destructive" />
                        <span className="text-xs text-muted-foreground">Current DOH</span>
                      </div>
                      <p className="text-lg font-bold text-destructive">5 days</p>
                      <p className="text-[10px] text-muted-foreground">OOS in 5 days</p>
                    </div>
                  </div>

                  <div className="p-3 bg-destructive/10 backdrop-blur rounded-lg border border-destructive/30">
                    <p className="text-sm font-semibold text-destructive">⚠️ Projected OOS in 5 days</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Risk Identification Agent Panel */}
            <Card className="p-6 bg-gradient-to-br from-card to-surface border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-warning/20">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Risk Identification Agent</h3>
                    <Badge variant="outline" className="text-[10px] border-warning/30 text-warning">
                      Risk Assessed
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Risk Scorecard */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-lg border border-destructive/20">
                      <p className="text-xs text-muted-foreground mb-1">Severity</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full w-[85%] bg-destructive" />
                        </div>
                        <span className="text-sm font-bold text-destructive">High</span>
                      </div>
                    </div>

                    <div className="p-3 bg-gradient-to-br from-destructive/10 to-destructive/5 rounded-lg border border-destructive/20">
                      <p className="text-xs text-muted-foreground mb-1">Probability</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full w-[90%] bg-destructive" />
                        </div>
                        <span className="text-sm font-bold text-destructive">High</span>
                      </div>
                    </div>
                  </div>

                  {/* Business Impact */}
                  <div className="p-4 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-lg border-2 border-destructive/30">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-destructive" />
                      <span className="text-sm font-semibold text-foreground">Business Impact</span>
                    </div>
                    <p className="text-3xl font-bold text-destructive">₹5.4 Cr</p>
                    <p className="text-xs text-muted-foreground mt-1">Trade Order at risk</p>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                      <Users className="h-3 w-3 text-primary" />
                      <div>
                        <p className="text-muted-foreground">Customer</p>
                        <p className="font-semibold text-foreground">Key Account</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                      <Calendar className="h-3 w-3 text-primary" />
                      <div>
                        <p className="text-muted-foreground">Recurrence</p>
                        <p className="font-semibold text-foreground">2 in 90 days</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                      <Target className="h-3 w-3 text-primary" />
                      <div>
                        <p className="text-muted-foreground">Segment</p>
                        <p className="font-semibold text-foreground">High Visibility</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white/60 rounded-lg">
                      <BarChart3 className="h-3 w-3 text-primary" />
                      <div>
                        <p className="text-muted-foreground">KNX Status</p>
                        <p className="font-semibold text-destructive">OOS Alert</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* KNX Projection Graph */}
          <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                DOH Projection & Historical Pattern
              </h3>

              <div className="h-48 bg-gradient-to-br from-primary/5 to-surface rounded-lg p-4 flex items-end justify-between gap-2">
                {[22, 18, 15, 12, 8, 5, 3, 2, 0].map((doh, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        doh <= 5 ? "bg-destructive" : doh <= 10 ? "bg-warning" : "bg-success"
                      }`}
                      style={{ height: `${(doh / 22) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">W{idx + 1}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-success" />
                  <span className="text-muted-foreground">Healthy (10+ days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-warning" />
                  <span className="text-muted-foreground">Warning (5-10 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-destructive" />
                  <span className="text-muted-foreground">Critical (&lt;5 days)</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
