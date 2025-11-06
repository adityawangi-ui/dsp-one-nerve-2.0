import { MainLayout } from "@/components/layout/MainLayout";
import { Bot, TrendingUp, Package, Target, AlertTriangle, BarChart3 } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { AgentCard } from "@/components/dashboard/AgentCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AgenticConsole() {
  const kpiData = [
    {
      title: "Service Level",
      value: 94.2,
      unit: "%",
      trend: { direction: "up" as const, value: 2.1, period: "vs last month" },
      target: { value: 95, status: "below" as const },
      status: "warning" as const,
      subtitle: "North America leading"
    },
    {
      title: "Forecast Accuracy",
      value: 87.8,
      unit: "%",
      trend: { direction: "up" as const, value: 5.3, period: "vs last quarter" },
      target: { value: 85, status: "above" as const },
      status: "healthy" as const,
      subtitle: "8% bias improvement in LATAM"
    },
    {
      title: "Inventory Turns",
      value: 12.4,
      unit: "x",
      trend: { direction: "down" as const, value: 1.2, period: "vs target" },
      status: "healthy" as const,
      subtitle: "Optimized across regions"
    },
    {
      title: "OTIF Performance",
      value: 89.6,
      unit: "%",
      trend: { direction: "up" as const, value: 3.4, period: "this week" },
      target: { value: 90, status: "below" as const },
      status: "warning" as const,
      subtitle: "Supply constraints in APAC"
    },
    {
      title: "Exceptions Pending",
      value: 27,
      unit: "items",
      status: "critical" as const,
      subtitle: "14 high priority"
    }
  ];

  const agentData = [
    {
      name: "Demand Agent",
      type: "process" as const,
      status: "healthy" as const,
      insight: "Promo impact +15% demand in APAC. Electronics category showing strong seasonal growth.",
      lastUpdate: "2m ago",
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      name: "Supply Agent",
      type: "process" as const,
      status: "warning" as const,
      insight: "Raw sugar shortages detected in Brazil. Alternative sourcing options identified.",
      lastUpdate: "5m ago",
      exceptionCount: 3,
      icon: <Package className="h-4 w-4" />
    },
    {
      name: "Promo Agent",
      type: "utility" as const,
      status: "healthy" as const,
      insight: "Q4 campaigns performing 12% above target. EMEA showing unexpected uplift.",
      lastUpdate: "8m ago",
      icon: <Target className="h-4 w-4" />
    },
    {
      name: "Capacity Agent",
      type: "foundation" as const,
      status: "warning" as const,
      insight: "Plant X running at 95% capacity. May need overflow to Plant Y for demand spike.",
      lastUpdate: "3m ago",
      exceptionCount: 1,
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      name: "Cost Agent",
      type: "foundation" as const,
      status: "healthy" as const,
      insight: "Transportation costs optimized through dynamic routing. 8% savings achieved.",
      lastUpdate: "12m ago",
      icon: <AlertTriangle className="h-4 w-4" />
    }
  ];

  const recommendations = [
    {
      title: "Supply Chain Optimization",
      description: "Based on demand uplift in North America, you may need 20% more supply from Plant X to meet Q4 targets. Alternative sourcing through Plant Y could reduce costs by 5%.",
      impact: {
        metric: "Cost Reduction",
        value: "~$2.3M",
        direction: "positive" as const
      },
      confidence: 87,
      urgency: "high" as const,
      source: "Supply + Demand Agents",
      actions: [
        { label: "Simulate", variant: "default" as const },
        { label: "Apply", variant: "secondary" as const },
        { label: "Learn More", variant: "outline" as const }
      ]
    },
    {
      title: "Promotional Strategy Adjustment",
      description: "EMEA promotional campaigns are outperforming expectations by 12%. Consider reallocating budget from underperforming LATAM campaigns.",
      impact: {
        metric: "Revenue Impact",
        value: "+$1.8M",
        direction: "positive" as const
      },
      confidence: 92,
      urgency: "medium" as const,
      source: "Promo Agent",
      actions: [
        { label: "Review Details", variant: "default" as const },
        { label: "Adjust Budget", variant: "secondary" as const },
        { label: "Defer", variant: "outline" as const }
      ]
    },
    {
      title: "Inventory Rebalancing",
      description: "Forecast bias improvement in LATAM suggests opportunity to reduce safety stock by 15% without impacting service levels.",
      confidence: 78,
      urgency: "low" as const,
      source: "Demand + Inventory Agents",
      actions: [
        { label: "Analyze Risk", variant: "secondary" as const },
        { label: "Simulate", variant: "outline" as const }
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="p-8 space-y-8 misty-bg min-h-screen">
        {/* Personal Greeting */}
        <div className="text-center space-y-1 animate-fade-in mb-2">
          <h1 className="text-4xl font-bold gradient-text" style={{ animationDuration: '0.6s' }}>
            Hello, Alex 👋
          </h1>
          <p className="text-sm text-[#7E7E7E] font-light">
            Your Intelligent Planning Companion.
          </p>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Agentic Process Console</h2>
            <p className="text-muted-foreground mt-1">Monitor and manage automated process flows</p>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Process Overview */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Process Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {kpiData.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>
        </section>

        {/* Current Runs */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Current Runs</h2>
          <ScrollArea className="w-full">
            <div className="flex space-x-4 pb-4">
              {agentData.map((agent, index) => (
                <AgentCard
                  key={index}
                  {...agent}
                  onDrillDown={() => console.log(`Drill down for ${agent.name}`)}
                />
              ))}
            </div>
          </ScrollArea>
        </section>

        {/* Recent Activity Log */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity Log</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <RecommendationCard key={index} {...rec} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
