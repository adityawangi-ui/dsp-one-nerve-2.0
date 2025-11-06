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
  History,
  EuroIcon,
} from "lucide-react";

export default function Landing() {
  const [inputValue, setInputValue] = useState("");

  const contextCards = [
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
      title: "DAP Reports",
      icon: BarChart3,
      subtext: "View forecast accuracy, service levels, and performance dashboards.",
      footer: "Open Reports Center",
      link: "/reports",
      status: "87.8% Forecast Accuracy",
      isAgent: false,
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
      <div className="min-h-screen misty-bg px-8 py-6 overflow-hidden flex flex-col relative">
        {/* Top Right Value Meter & Chat History */}
        <div className="absolute top-6 right-8 flex items-center gap-4 z-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm shadow-md">
            <EuroIcon className="h-4 w-4 text-primary" />
            <div className="text-right">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Saved This Quarter</div>
              <div className="text-lg font-bold gradient-text">€12.4M</div>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-xl bg-white/80 backdrop-blur-sm border-border/50 hover:bg-white hover:shadow-md transition-all"
            title="Chat History"
          >
            <History className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-w-7xl mx-auto w-full flex flex-col h-full pt-8">
          {/* Personal Greeting Section */}
          <div className="text-center space-y-1 animate-fade-in mb-6">
            <h1 className="text-4xl font-bold gradient-text" style={{ animationDuration: '0.6s' }}>
              Hello, Aditya 👋
            </h1>
            <p className="text-sm text-[#7E7E7E] font-light">
              Your Intelligent Planning Companion.
            </p>
          </div>

          {/* Context Cards - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 justify-items-center max-w-3xl mx-auto w-full"
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
                <Card className="relative p-5 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col min-h-[170px] items-center text-center card-shimmer overflow-hidden">
                  {/* Subtle gradient header strip */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-t-[18px]" />
                  
                  {/* Header */}
                  <div className="flex flex-col items-center mb-3 mt-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0 mb-2.5 group-hover:scale-110 transition-transform duration-300">
                      <card.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      {card.isAgent && <Sparkles className="h-4 w-4 text-primary animate-pulse" />}
                      {card.title}
                    </h3>
                  </div>

                  {/* Subtext */}
                  <p className="text-xs text-muted-foreground mb-3 flex-1 leading-relaxed">
                    {card.subtext}
                  </p>

                  {/* Chips or Status */}
                  <div className="mb-3">
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
                  <div className="pt-3 border-t border-border/40 flex items-center justify-center gap-2 w-full">
                    <span className="text-xs text-primary font-medium group-hover:underline">
                      {card.footer}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Conversational Prompt Box - Gemini Style */}
          <div className="animate-fade-in max-w-3xl mx-auto w-full" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <div className="frosted-glass breathing-border rounded-2xl border-2 border-primary/30 shadow-[var(--shadow-glow)]">
                <div className="flex items-center gap-3 pl-4 pr-3 py-3">
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
                    className="flex-1 h-12 text-base border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
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
