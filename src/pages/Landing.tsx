import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import {
  Bot,
  TrendingUp,
  Package,
  Target,
  AlertTriangle,
  BarChart3,
  Activity,
  Zap,
  Shield,
  Workflow,
  Database,
  Settings,
  FileText,
  ChevronRight,
} from "lucide-react";

export default function Landing() {
  const [viewMode, setViewMode] = useState<"agentic" | "decision">("agentic");

  const agenticModules = [
    {
      title: "Process Orchestration",
      description: "Monitor and manage automated process flows across agents",
      icon: Workflow,
      metric: "5 Active Processes",
      status: "healthy",
      link: "/agentic-console",
    },
    {
      title: "Agent Coordination",
      description: "Real-time coordination between demand, supply, and capacity agents",
      icon: Bot,
      metric: "12 Agents Running",
      status: "healthy",
      link: "/agentic-console",
    },
    {
      title: "Execution Monitoring",
      description: "Track execution status and agent interactions in real-time",
      icon: Activity,
      metric: "94.2% Success Rate",
      status: "healthy",
      link: "/agentic-console",
    },
    {
      title: "Exception Handling",
      description: "Automated exception detection and resolution workflows",
      icon: AlertTriangle,
      metric: "27 Pending",
      status: "warning",
      link: "/agentic-console",
    },
  ];

  const decisionModules = [
    {
      title: "Supply-Demand Balance",
      description: "Monitor and optimize supply-demand equilibrium across regions",
      icon: TrendingUp,
      metric: "94.2% Service Level",
      status: "healthy",
      link: "/dap-workspace",
    },
    {
      title: "Inventory Management",
      description: "Track inventory coverage, balancing, and aging metrics",
      icon: Package,
      metric: "45 Days Coverage",
      status: "healthy",
      link: "/dap-workspace",
    },
    {
      title: "Production Planning",
      description: "Manage production adherence and capacity optimization",
      icon: Target,
      metric: "89.6% OTIF",
      status: "warning",
      link: "/dap-workspace",
    },
    {
      title: "Performance Analytics",
      description: "Comprehensive reporting and KPI tracking",
      icon: BarChart3,
      metric: "87.8% Accuracy",
      status: "healthy",
      link: "/reports",
    },
  ];

  const currentModules = viewMode === "agentic" ? agenticModules : decisionModules;

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-surface to-muted/20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
              Unified Command Console
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Monitor, orchestrate, and optimize planning and decision workflows
            </p>
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in">
            <div className="flex items-center gap-3 bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-4">
              <span
                className={`text-sm font-medium transition-colors ${
                  viewMode === "agentic" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Agentic View
              </span>
              <Switch
                checked={viewMode === "decision"}
                onCheckedChange={(checked) => setViewMode(checked ? "decision" : "agentic")}
                className="data-[state=checked]:bg-primary"
              />
              <span
                className={`text-sm font-medium transition-colors ${
                  viewMode === "decision" ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Decision Intelligence View
              </span>
            </div>
          </div>

          {/* Context Banner */}
          <div className="mb-8 animate-fade-in">
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <div className="flex items-start gap-4">
                {viewMode === "agentic" ? (
                  <Zap className="h-6 w-6 text-primary mt-1" />
                ) : (
                  <Shield className="h-6 w-6 text-primary mt-1" />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {viewMode === "agentic"
                      ? "Agentic Process Orchestration"
                      : "Decision Intelligence Platform"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {viewMode === "agentic"
                      ? "Monitor automated process flows, agent interactions, and execution status. Manage exceptions and coordinate multi-agent workflows in real-time."
                      : "Manage daily planning activities, monitor operational performance, and access comprehensive analytics for supply chain optimization."}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
            {currentModules.map((module, index) => (
              <Link key={index} to={module.link}>
                <Card className="h-full p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        module.status === "healthy"
                          ? "bg-success/10"
                          : module.status === "warning"
                          ? "bg-warning/10"
                          : "bg-destructive/10"
                      }`}
                    >
                      <module.icon
                        className={`h-6 w-6 ${
                          module.status === "healthy"
                            ? "text-success"
                            : module.status === "warning"
                            ? "text-warning"
                            : "text-destructive"
                        }`}
                      />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{module.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
                    {module.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">Current Status</span>
                    <span className="text-sm font-semibold text-foreground">{module.metric}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Access Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            <Link to="/agentic-console">
              <Card className="p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Workflow className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Agentic Console</h4>
                    <p className="text-sm text-muted-foreground">Process orchestration</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/reports">
              <Card className="p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Reports</h4>
                    <p className="text-sm text-muted-foreground">Performance tracking</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/data-config">
              <Card className="p-6 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Configuration</h4>
                    <p className="text-sm text-muted-foreground">Data & settings</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
