import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  Workflow,
  Clock,
  Paperclip,
  Mic,
  Sparkles,
  TrendingUp,
  Package,
  FileText,
  ChevronRight,
} from "lucide-react";

export default function Landing() {
  const [inputValue, setInputValue] = useState("");

  const contextCards = [
    {
      title: "Service Risks",
      source: "Agent AI",
      icon: Sparkles,
      subtext: "Identify and mitigate upcoming service or stock risks.",
      footer: "View in Process Console",
      link: "/agentic-console",
      status: "3 High Priority Alerts",
    },
    {
      title: "Process Console",
      source: "Agent AI",
      icon: Workflow,
      subtext: "Monitor autonomous workflows and active process executions.",
      footer: "View All Processes",
      link: "/agentic-console",
      status: "3 Processes Running | 1 Pending Approval",
    },
    {
      title: "DAP Modules",
      source: "Decision Intelligence",
      icon: Package,
      subtext: "Access inventory balancing, rebalancing, and safety stock optimization.",
      footer: "Open DAP Workspace",
      link: "/dap-workspace",
      chips: ["Inventory", "Supply", "Rebalancing"],
    },
    {
      title: "DAP Reports",
      source: "Decision Intelligence",
      icon: BarChart3,
      subtext: "View forecast accuracy, service levels, and performance dashboards.",
      footer: "Open Reports Center",
      link: "/reports",
      status: "87.8% Forecast Accuracy",
    },
  ];

  const suggestedQuestions = [
    "Show me SKUs at highest service risk this week.",
    "Compare actual vs forecasted demand for APAC region.",
    "Which production lines need rebalancing today?",
    "How much value did we save this month?",
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface to-muted/20 p-8">
        <div className="container mx-auto max-w-7xl space-y-12">
          {/* Personal Greeting Section */}
          <div className="text-center space-y-3 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground">
              Welcome back, Aditya! 👋
            </h2>
            <p className="text-xl text-muted-foreground">
              How can I help you today?
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto">
              Your live planning assistant is ready with today's insights, risks, and recommendations.
            </p>
          </div>

          {/* Context Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {contextCards.map((card, index) => (
              <Link key={index} to={card.link}>
                <Card className="h-full p-6 border-2 border-border rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:scale-[1.02] cursor-pointer group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <card.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
                      <p className="text-xs text-muted-foreground">{card.source}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                {/* Subtext */}
                <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
                  {card.subtext}
                </p>

                {/* Chips or Status */}
                {card.chips && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.chips.map((chip, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {chip}
                      </Badge>
                    ))}
                  </div>
                )}
                {card.status && (
                  <div className="mb-4">
                    <Badge variant="outline" className="text-xs">
                      {card.status}
                    </Badge>
                  </div>
                )}

                  {/* Footer */}
                  <div className="pt-4 border-t border-border">
                    <span className="text-xs text-primary font-medium group-hover:underline">
                      {card.footer} →
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="max-w-4xl mx-auto space-y-4 animate-fade-in">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide text-center">
              TRY ASKING
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-auto py-4 px-6 text-left justify-start whitespace-normal text-sm hover:bg-muted/50 transition-colors"
                  onClick={() => setInputValue(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Conversational Prompt Box */}
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-muted">
                  <Paperclip className="h-5 w-5" />
                </Button>
              </div>
              <Input
                placeholder="Ask about your planning operations or type '/' for quick actions…"
                className="pl-16 pr-24 h-20 text-lg rounded-2xl border-2 shadow-lg focus-visible:ring-primary/20"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex gap-1">
                <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl hover:bg-muted">
                  <Mic className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
