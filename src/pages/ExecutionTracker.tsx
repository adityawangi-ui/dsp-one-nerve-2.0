import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Database,
  Package,
  Truck,
  Bell,
  ArrowRight,
} from "lucide-react";

export default function ExecutionTracker() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 1,
      system: "SAP",
      action: "STO Creation (BLR → Chennai)",
      icon: Database,
      status: "completed",
      time: "12:34 PM",
    },
    {
      id: 2,
      system: "KNX",
      action: "Plan Re-simulation",
      icon: Package,
      status: "completed",
      time: "12:35 PM",
    },
    {
      id: 3,
      system: "Transport",
      action: "Linehaul Booking",
      icon: Truck,
      status: "in-progress",
      time: "12:36 PM",
    },
    {
      id: 4,
      system: "Notifications",
      action: "Customer Service, Forecasting, Logistics",
      icon: Bell,
      status: "pending",
      time: "12:37 PM",
    },
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep, steps.length]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "in-progress";
    return "pending";
  };

  const getStatusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 className="h-5 w-5 text-success" />;
    if (status === "in-progress") return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
    return <Clock className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusBadge = (status: string) => {
    if (status === "completed")
      return (
        <Badge className="text-[10px] bg-success">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Complete
        </Badge>
      );
    if (status === "in-progress")
      return (
        <Badge className="text-[10px] bg-primary">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Processing
        </Badge>
      );
    return (
      <Badge variant="outline" className="text-[10px]">
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="min-h-screen misty-bg p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-text">Last Mile Execution</h1>
            <p className="text-sm text-muted-foreground">
              Automated system-level execution and integration orchestration
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 rounded-[18px] shadow-[var(--shadow-glow)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Execution Progress</h2>
                <Badge className="text-xs bg-primary">
                  {Math.min(currentStep, steps.length)} / {steps.length} Steps
                </Badge>
              </div>

              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                  style={{ width: `${(Math.min(currentStep, steps.length) / steps.length) * 100}%` }}
                />
              </div>

              {currentStep >= steps.length && (
                <div className="p-4 bg-success/20 border border-success/30 rounded-lg animate-fade-in">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                    <div>
                      <p className="font-semibold text-success">✔ DC transfer committed</p>
                      <p className="text-sm text-muted-foreground">OOS risk resolved for Week 3</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Execution Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              return (
                <Card
                  key={step.id}
                  className={`p-6 border rounded-[18px] transition-all duration-500 ${
                    status === "completed"
                      ? "bg-success/5 border-success/30 shadow-md"
                      : status === "in-progress"
                      ? "bg-primary/5 border-primary/30 shadow-[var(--shadow-glow)]"
                      : "bg-white border-border/30"
                  }`}
                  style={{
                    animation: `fade-in 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className={`p-3 rounded-xl ${
                        status === "completed"
                          ? "bg-success/20"
                          : status === "in-progress"
                          ? "bg-primary/20"
                          : "bg-muted"
                      }`}
                    >
                      <step.icon
                        className={`h-6 w-6 ${
                          status === "completed"
                            ? "text-success"
                            : status === "in-progress"
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{step.system}</h3>
                        {getStatusBadge(status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{step.action}</p>
                      {status !== "pending" && (
                        <p className="text-xs text-muted-foreground mt-1">Executed at {step.time}</p>
                      )}
                    </div>

                    {/* Status Icon */}
                    <div>{getStatusIcon(status)}</div>
                  </div>

                  {/* Additional Details for In-Progress */}
                  {status === "in-progress" && (
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg animate-fade-in">
                      <p className="text-xs text-primary font-medium">
                        Connecting to {step.system} API and processing transaction...
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          {/* Approval Tracker (Optional) */}
          <Card className="p-6 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)]">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Approval Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm text-foreground">Supply Chain Planner</span>
                  </div>
                  <Badge className="text-[10px] bg-success">Approved</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-success" />
                    <span className="text-sm text-foreground">Logistics Manager</span>
                  </div>
                  <Badge className="text-[10px] bg-success">Approved</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Action */}
          {currentStep >= steps.length && (
            <div className="flex justify-center animate-fade-in">
              <Button size="lg" onClick={() => navigate("/learning-feedback")} className="gap-2">
                View Learning Insights
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
