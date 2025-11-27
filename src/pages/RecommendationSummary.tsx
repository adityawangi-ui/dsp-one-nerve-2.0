import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CheckCircle2, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

const riskRecoveryData = [
  { metric: "Service Level", value: 88 },
  { metric: "Cost Efficiency", value: 65 },
  { metric: "Speed", value: 85 },
  { metric: "Risk Mitigation", value: 75 },
  { metric: "Quality", value: 92 },
  { metric: "Compliance", value: 95 },
];

const impactTimelineData = [
  { day: "Today", current: 77, projected: 77 },
  { day: "Day 1", current: 77, projected: 79 },
  { day: "Day 2", current: 77, projected: 82 },
  { day: "Day 3", current: 77, projected: 85 },
  { day: "Day 4", current: 77, projected: 87 },
  { day: "Day 5", current: 77, projected: 88 },
];

export default function RecommendationSummary() {
  const navigate = useNavigate();

  const activeAgents = [
    "Insights Generator",
    "Predictive Analytics Agent"
  ];

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Recommendation Summary</h1>
            <p className="text-muted-foreground mt-2">Optimized solution pathway</p>
          </div>
          <Button onClick={() => navigate("/execution-closure")} size="lg" className="gap-2">
            Proceed to Execution <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Active Agents */}
        <Card className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Active Agents:</span>
            {activeAgents.map((agent) => (
              <Badge key={agent} variant="secondary" className="animate-pulse">
                {agent}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Selected Solution */}
        <Card className="p-8 bg-gradient-to-br from-success/10 to-success/5 border-success/20 shadow-[var(--shadow-glow)]">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-full bg-success/20">
              <CheckCircle2 className="h-12 w-12 text-success" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-2xl font-bold text-foreground">Scenario S1: Pull-ahead Production + Split Freight</h2>
                <Badge variant="default" className="bg-success">Recommended</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Accelerate production schedule by 1 day and leverage multi-modal freight splitting to recover service levels with optimal cost-benefit ratio
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Service Recovery</p>
                  <p className="text-2xl font-bold text-success">+11%</p>
                  <p className="text-xs text-muted-foreground">77% → 88%</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Cost Impact</p>
                  <p className="text-2xl font-bold text-warning">+$43K</p>
                  <p className="text-xs text-muted-foreground">Within budget</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Lead Time</p>
                  <p className="text-2xl font-bold text-primary">-1 day</p>
                  <p className="text-xs text-muted-foreground">Faster delivery</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Waste</p>
                  <p className="text-2xl font-bold text-success">0%</p>
                  <p className="text-xs text-muted-foreground">No excess</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Justification */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3">AI Narrative: Why S1 Was Selected</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Balanced Risk-Reward:</strong> Scenario S1 offers the optimal balance between service recovery (+11%) and cost increase ($43K). While S3 provides higher service recovery (+14%), the additional cost ($65K) doesn't justify the marginal 3% improvement.
                </p>
                <p>
                  <strong className="text-foreground">Speed Advantage:</strong> The 1-day lead time reduction enables us to meet the 48-hour action window effectively. This timing is critical given the current service drop trajectory from 92% to 77%.
                </p>
                <p>
                  <strong className="text-foreground">Zero Waste:</strong> Unlike S2 which introduces 1.2% waste through interplant transfers, S1 maintains zero waste while achieving superior service recovery. This aligns with sustainability KPIs.
                </p>
                <p>
                  <strong className="text-foreground">Risk Profile:</strong> The risk score of 45 (medium) is acceptable given the mitigation controls in place. Split freight reduces dependency on single carrier, and pull-ahead production has been validated by RCCP Agent for line capacity.
                </p>
                <p>
                  <strong className="text-foreground">S&OP Alignment:</strong> This solution supports quarterly targets for A+ SKUs and maintains customer satisfaction scores above 90%, which is critical for FG-98342's strategic importance.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Recovery Radar */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Multi-Dimensional Impact Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskRecoveryData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                <Radar name="S1 Performance" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Service Recovery Timeline */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Service Level Recovery Timeline</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impactTimelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[70, 95]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line type="monotone" dataKey="current" stroke="hsl(var(--destructive))" strokeWidth={2} name="Without Action" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="projected" stroke="hsl(var(--success))" strokeWidth={3} name="With S1" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Impact on S&OP */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-warning/10">
              <TrendingUp className="h-6 w-6 text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3">Impact on S&OP Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                  <p className="text-2xl font-bold text-success">92%</p>
                  <p className="text-xs text-muted-foreground">Target: 90% (Exceeds)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Inventory Turns</p>
                  <p className="text-2xl font-bold text-primary">6.2x</p>
                  <p className="text-xs text-muted-foreground">Target: 6.0x (On track)</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">OTIF Performance</p>
                  <p className="text-2xl font-bold text-success">94%</p>
                  <p className="text-xs text-muted-foreground">Target: 93% (Exceeds)</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Caveats */}
        <Card className="p-6 bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-warning flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Implementation Considerations</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Line L23 capacity must be validated by plant controller before execution</li>
                <li>• Split freight requires coordination with 2 carriers - lead time: 6 hours</li>
                <li>• Production pull-ahead impacts next week's schedule - MD Agent notified</li>
                <li>• Cost approval required from finance for $43K expedite budget</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
