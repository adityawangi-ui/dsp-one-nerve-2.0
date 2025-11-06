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
      icon: AlertTriangle,
      subtext: "Identify and mitigate upcoming service or stock risks.",
      footer: "View in Process Console",
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
      title: "DAP Modules",
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
      <div className="h-screen bg-background px-8 py-6 overflow-hidden flex flex-col">
        <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
          {/* Personal Greeting Section */}
          <div className="text-center space-y-1 animate-fade-in mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, Aditya! 👋
            </h1>
            <p className="text-sm text-gray-500">
              Your live planning assistant is ready with today's insights, risks, and recommendations.
            </p>
          </div>

          {/* Context Cards - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in flex-1">
            {contextCards.map((card, index) => (
              <Link key={index} to={card.link} className="group">
                <Card className="h-full p-5 bg-card border border-border/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 rounded-xl bg-primary/10 flex-shrink-0">
                        <card.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                          {card.isAgent && <Sparkles className="h-5 w-5 text-primary" />}
                          {card.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Subtext */}
                  <p className="text-sm text-gray-600 mb-3 flex-1">
                    {card.subtext}
                  </p>

                  {/* Chips or Status */}
                  <div className="mb-3">
                    {card.chips && (
                      <div className="flex flex-wrap gap-2">
                        {card.chips.map((chip, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                            {chip}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {card.status && (
                      <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                        {card.status}
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs text-primary font-medium group-hover:underline">
                      {card.footer}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="space-y-3 animate-fade-in mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide text-center">
              Try Asking
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((question, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-auto py-2 px-4 rounded-full text-sm text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:scale-102 transition-all duration-200"
                  onClick={() => setInputValue(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Conversational Prompt Box */}
          <div className="animate-fade-in mt-4 mb-4">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-gray-100">
                  <Paperclip className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              <Input
                placeholder="Ask about your planning operations or type '/' for quick actions…"
                className="pl-14 pr-14 h-12 text-sm rounded-2xl border-2 border-gray-200 bg-card shadow-md hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-gray-100">
                  <Mic className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
