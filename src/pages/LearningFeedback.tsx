import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  TrendingUp,
  Brain,
  Target,
  AlertTriangle,
  BarChart3,
  Clock,
  Home,
} from "lucide-react";

export default function LearningFeedback() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen misty-bg p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Learning & Feedback Loop</h1>
            <p className="text-sm text-muted-foreground">
              Continuous improvement through AI-powered pattern recognition
            </p>
          </div>

          {/* Success Summary */}
          <Card className="p-8 bg-gradient-to-br from-success/20 to-success/10 border-2 border-success/40 rounded-[18px] shadow-[var(--shadow-glow)] animate-fade-in">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-success/30">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">OOS Risk Successfully Avoided</h2>
                  <p className="text-sm text-muted-foreground">Clear Shampoo 400ml - Chennai DC</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-white/80 backdrop-blur rounded-xl text-center">
                  <p className="text-xs text-muted-foreground mb-1">Service Achieved</p>
                  <p className="text-2xl font-bold text-success">96%</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur rounded-xl text-center">
                  <p className="text-xs text-muted-foreground mb-1">TO Saved</p>
                  <p className="text-2xl font-bold text-success">₹5.4 Cr</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur rounded-xl text-center">
                  <p className="text-xs text-muted-foreground mb-1">Cost Impact</p>
                  <p className="text-2xl font-bold text-primary">₹1.3L</p>
                </div>
                <div className="p-4 bg-white/80 backdrop-blur rounded-xl text-center">
                  <p className="text-xs text-muted-foreground mb-1">Execution Time</p>
                  <p className="text-2xl font-bold text-primary">2 days</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Root Cause Learning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/20">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Root Cause Learning</h3>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Primary Cause</p>
                    <p className="text-sm font-semibold text-foreground">Demand surge (+23%) not captured in forecast</p>
                  </div>

                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-1">Contributing Factors</p>
                    <ul className="text-sm text-foreground space-y-1 mt-2">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Social media campaign increased visibility</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Regional competition promotional activity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>Low DOH buffer for high-velocity SKU</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-success/10 rounded-lg border border-success/30">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <p className="text-xs font-semibold text-success">Learning Stored</p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Pattern added to Analytics Agent knowledge base for future detection
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-warning/20">
                    <Target className="h-5 w-5 text-warning" />
                  </div>
                  <h3 className="font-semibold text-foreground">Model Updates</h3>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-surface rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Probability Model</span>
                      <Badge className="text-[10px] bg-success">Updated</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Demand surge probability increased for similar SKU-location pairs during promotional periods
                    </p>
                  </div>

                  <div className="p-3 bg-surface rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Risk Scoring</span>
                      <Badge className="text-[10px] bg-success">Updated</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Social sentiment indicators now weighted higher in risk severity calculation
                    </p>
                  </div>

                  <div className="p-3 bg-surface rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Buffer Optimization</span>
                      <Badge className="text-[10px] bg-success">Updated</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Safety stock recommendations adjusted for high-visibility SKUs in South region
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Similar Patterns Dashboard */}
          <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/20">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Similar Pattern Analysis</h3>
                </div>
                <Badge variant="outline" className="text-xs">
                  Last 90 Days
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg border border-warning/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-xs text-muted-foreground">Similar Risks Detected</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">2</p>
                  <p className="text-xs text-muted-foreground">Same SKU family, different locations</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg border border-success/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-xs text-muted-foreground">Successfully Mitigated</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">2</p>
                  <p className="text-xs text-muted-foreground">100% success rate</p>
                </div>

                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Avg. Response Time</span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">2.5</p>
                  <p className="text-xs text-muted-foreground">Days from detection to resolution</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recommendation Engine */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-[18px] animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/20">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Proactive Recommendations</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/60 backdrop-blur rounded-lg">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    📊 Review Forecast Bias Correction
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Consider retraining Azure ML model with latest demand patterns for Personal Care category in South region
                  </p>
                </div>

                <div className="p-4 bg-white/60 backdrop-blur rounded-lg">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    🎯 Optimize Safety Stock Norms
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MEIO recalibration suggested for high-visibility SKUs to prevent similar OOS patterns
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Detailed Pattern Analysis Report
              </Button>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="outline" size="lg" onClick={() => navigate("/risk-landing")} className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Back to Risk Inbox
            </Button>
            <Button size="lg" onClick={() => navigate("/")} className="gap-2">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
