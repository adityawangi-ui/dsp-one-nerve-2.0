import { MainLayout } from "@/components/layout/MainLayout";
import { Sparkles } from "lucide-react";
import PlanningHealthPulse from "@/components/landing/PlanningHealthPulse";
import ExecutiveSummary from "@/components/landing/ExecutiveSummary";
import ModuleGrid from "@/components/landing/ModuleGrid";
import RecentActivity from "@/components/landing/RecentActivity";
import QuickInsights from "@/components/landing/QuickInsights";
import PromptBox from "@/components/landing/PromptBox";

export default function Landing() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] misty-bg px-4 md:px-8 lg:px-12 xl:px-16 overflow-auto flex flex-col relative">
        <div className="w-full flex flex-col py-4 md:py-6 mx-auto max-w-6xl space-y-5">

          {/* Greeting */}
          <div className="text-center space-y-2 animate-fade-in">
            <div className="flex items-center justify-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text aurora-shimmer" style={{ animationDuration: "0.6s" }}>
                Welcome Back, Alex!
              </h1>
              <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse" style={{ animationDelay: "0.5s" }}>
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-light max-w-md mx-auto">
              Your Intelligent Planning Companion is ready to help
            </p>
          </div>

          {/* Planning Health Pulse KPIs */}
          <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <PlanningHealthPulse />
          </div>

          {/* Executive Summary Metrics */}
          <div className="animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <ExecutiveSummary />
          </div>

          {/* Module Grid + Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="md:col-span-2">
              <ModuleGrid />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Quick Insights */}
          <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <QuickInsights />
          </div>

          {/* Prompt Box */}
          <div className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
            <PromptBox />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
