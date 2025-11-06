import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  RefreshCw,
  Clock,
  Paperclip,
  Mic,
  Send,
} from "lucide-react";

export default function Landing() {
  const [viewMode, setViewMode] = useState<"agentic" | "decision">("agentic");
  const [inputValue, setInputValue] = useState("");

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
          {/* View Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16 pt-8 animate-fade-in">
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

          {/* Content Based on View Mode */}
          {viewMode === "agentic" ? (
            /* Conversational UI for Agentic View */
            <div className="max-w-4xl mx-auto space-y-8 mb-12">
              {/* Header Section */}
              <div className="text-center space-y-3 animate-fade-in">
                <h1 className="text-4xl font-bold text-foreground">
                  Hi Aditya! ✳️ I'm your Planning Assistant.
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Ask me anything about your supply planning operations and I'll coordinate with active workflows to get you the latest updates.
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Supply Planner View – Live planning environment
                </p>
              </div>

              {/* Try Asking Section */}
              <div className="space-y-4 animate-fade-in">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">
                  TRY ASKING
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "What's the current supply-demand gap for next week?",
                    "Show me SKUs at risk of stockout this month.",
                    "Compare safety stock vs actual coverage for top 10 SKUs.",
                    "Which plants need rebalancing today?"
                  ].map((example, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="h-auto py-4 px-6 text-left justify-start whitespace-normal text-sm hover:bg-muted/50 transition-colors"
                      onClick={() => setInputValue(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </div>
              </div>


              {/* Chat Input Section */}
              <div className="animate-fade-in w-full">
                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-muted">
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </div>
                  <Input
                    placeholder="Message Planning Assistant"
                    className="pl-16 pr-16 h-20 text-lg rounded-3xl border-2 shadow-lg"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-muted">
                      <Mic className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Module Grid for Decision Intelligence View */
            <div className="mb-8 animate-fade-in">
              <div className="mb-8">
                <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                  <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6 text-primary mt-1" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        Decision Intelligence Platform
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Manage daily planning activities, monitor operational performance, and access comprehensive analytics for supply chain optimization.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {decisionModules.map((module, index) => (
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
            </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
}
