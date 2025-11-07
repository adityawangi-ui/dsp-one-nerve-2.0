import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  BarChart3,
  Workflow,
  Mic,
  Sparkles,
  Package,
  ChevronRight,
  Send,
  Plus,
  Settings,
} from "lucide-react";

export default function Landing() {
  const [inputValue, setInputValue] = useState("");

  const contextCards = [
    {
      title: "DAP Workspace",
      icon: Package,
      subtext: "Access inventory balancing, rebalancing, and safety stock optimization.",
      footer: "Open DAP Workspace",
      link: "/dap-workspace",
      chips: ["Inventory", "Supply", "Rebalancing"],
      isAgent: false,
    },
    {
      title: "DAP Reports & Insights",
      icon: BarChart3,
      subtext: "View forecast accuracy, service levels, and performance dashboards.",
      footer: "Open Reports Center",
      link: "/reports",
      status: "87.8% Forecast Accuracy",
      isAgent: false,
    },
    {
      title: "Service Risks",
      icon: AlertTriangle,
      subtext: "Identify and mitigate upcoming service or stock risks.",
      footer: "View all Risks",
      link: "/agentic-console",
      status: "3 High Priority Alerts",
      isAgent: true,
    },
    {
      title: "Process Console",
      icon: Workflow,
      subtext: "Monitor autonomous workflows and active process executions.",
      footer: "View All Processes",
      link: "/agentic-console",
      status: "3 Processes Running | 1 Pending Approval",
      isAgent: true,
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
      <div className="h-[calc(100vh-4rem)] misty-bg px-8 overflow-hidden flex flex-col relative">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full justify-center py-4">
          {/* Personal Greeting Section */}
          <div className="text-center space-y-0.5 animate-fade-in mb-5">
            <h1 className="text-3xl font-bold gradient-text" style={{ animationDuration: '0.6s' }}>
              Hello, Alex 👋
            </h1>
            <p className="text-xs text-[#7E7E7E] font-light">
              Your Intelligent Planning Companion.
            </p>
          </div>

          {/* Context Cards - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 justify-items-center max-w-3xl mx-auto w-full"
               style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}>
            {contextCards.map((card, index) => (
              <Link 
                key={index} 
                to={card.link} 
                className="group w-full"
                style={{ 
                  animation: `fade-in 0.5s ease-out ${0.3 + index * 0.1}s both, scale-in 0.4s ease-out ${0.3 + index * 0.1}s both` 
                }}
              >
                <Card className="relative p-4 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col min-h-[155px] items-center text-center card-shimmer overflow-hidden">
                  {/* Subtle gradient header strip */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-t-[18px]" />
                  
                  {/* Header */}
                  <div className="flex flex-col items-center mb-2 mt-1">
                    <div className="p-1.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <card.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      {card.isAgent && <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />}
                      {card.title}
                    </h3>
                  </div>

                  {/* Subtext */}
                  <p className="text-[11px] text-muted-foreground mb-2 flex-1 leading-relaxed">
                    {card.subtext}
                  </p>

                  {/* Chips or Status */}
                  <div className="mb-2">
                    {card.chips && (
                      <div className="flex flex-wrap gap-1.5 justify-center">
                        {card.chips.map((chip, idx) => (
                          <Badge key={idx} variant="secondary" className="text-[10px] py-0.5 px-2.5 bg-secondary/80 text-secondary-foreground hover:bg-secondary">
                            {chip}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {card.status && (
                      <Badge variant="outline" className="text-[10px] py-0.5 px-2.5 border-primary/30 text-primary/80 bg-primary/5">
                        {card.status}
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-2 border-t border-border/40 flex items-center justify-center gap-2 w-full">
                    <span className="text-[11px] text-primary font-medium group-hover:underline">
                      {card.footer}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Conversational Prompt Box - Gemini Style */}
          <div className="animate-fade-in max-w-3xl mx-auto w-full" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <div className="frosted-glass breathing-border rounded-2xl border-2 border-primary/30 shadow-[var(--shadow-glow)]">
                <div className="flex items-center gap-3 pl-4 pr-3 py-2.5">
                  {/* Left Icons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                      title="Quick Actions"
                    >
                      <Plus className="h-4 w-4 text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                      title="Settings"
                    >
                      <Settings className="h-4 w-4 text-primary" />
                    </Button>
                  </div>

                  {/* Input */}
                  <Input
                    placeholder="Hi, How can I help you?…"
                    className="flex-1 h-10 text-sm border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />

                  {/* Right Icons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                      title="Voice Input"
                    >
                      <Mic className="h-4 w-4 text-primary" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
