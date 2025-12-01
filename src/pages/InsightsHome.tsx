import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Package, AlertCircle, DollarSign, ArrowLeft, ChevronRight, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

const serviceByChannelData = [
  { channel: "E-Commerce", service: 94, target: 92 },
  { channel: "Retail", service: 88, target: 90 },
  { channel: "Wholesale", service: 91, target: 88 },
  { channel: "B2B Direct", service: 85, target: 87 },
];

const forecastBiasData = [
  { week: "W-8", bias: 12 },
  { week: "W-7", bias: 8 },
  { week: "W-6", bias: -3 },
  { week: "W-5", bias: 5 },
  { week: "W-4", bias: -7 },
  { week: "W-3", bias: 2 },
  { week: "W-2", bias: -4 },
  { week: "W-1", bias: 6 },
];

const slowMoverData = [
  { name: "Active", value: 68, color: "hsl(var(--success))" },
  { name: "Slow Moving", value: 22, color: "hsl(var(--warning))" },
  { name: "Obsolete Risk", value: 10, color: "hsl(var(--destructive))" },
];

const marginRiskData = [
  { region: "APAC", risk: 15, margin: 28 },
  { region: "EMEA", risk: 8, margin: 32 },
  { region: "Americas", risk: 22, margin: 25 },
  { region: "LATAM", risk: 12, margin: 30 },
];

export default function InsightsHome() {
  const navigate = useNavigate();

  const activeAgents = [
    "Insights Generator",
    "Predictive Analytics Agent",
    "MD Cleaner",
    "MD Error Identifier"
  ];

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hello, Alex 👋</h1>
            <p className="text-base text-muted-foreground mt-1">Here's your planning health dashboard for today</p>
          </div>
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>

        {/* Real-Time Planning Health KPIs */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Planning Health Pulse</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* KPI 1: Service Level */}
            <Card className="p-5 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Service Level (OTIF)</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-foreground">92.3%</h3>
                      <span className="text-sm text-muted-foreground">/ 95%</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-warning/20 text-warning">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Amber
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="text-destructive font-medium">-1.8% vs last week</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Top Exceptions:</p>
                  <div className="space-y-1">
                    <p className="text-xs text-foreground leading-relaxed">• APAC fill rate dropped to 89%</p>
                    <p className="text-xs text-foreground leading-relaxed">• E-comm orders delayed by 2 days</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    Customer promises at risk. Expedite high-velocity SKUs in APAC.
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate("/diagnostics-analytics")}>
                  View Full Analysis <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>

            {/* KPI 2: Inventory Health */}
            <Card className="p-5 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Inventory Health</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-foreground">€285M</h3>
                  </div>
                  </div>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Green
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-success" />
                  <span className="text-success font-medium">-3.2% vs last week</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Breakdown:</p>
                  <div className="space-y-1">
                    <p className="text-xs text-foreground leading-relaxed">• Cycle: €180M | Safety: €42M</p>
                    <p className="text-xs text-foreground leading-relaxed">• Prebuild: €25M | SLOB: €38M</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    SLOB reduced by 8% this week. Continue clearance push for slow movers.
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate("/inventory-optimizer")}>
                  View Optimizer <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>

            {/* KPI 3: Capacity & Production Health */}
            <Card className="p-5 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Capacity Health</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-foreground">78%</h3>
                      <span className="text-sm text-muted-foreground">util.</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Green
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-success font-medium">+2.4% vs last week</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Key Metrics:</p>
                  <div className="space-y-1">
                    <p className="text-xs text-foreground leading-relaxed">• Plan adherence: 94%</p>
                    <p className="text-xs text-foreground leading-relaxed">• Bottleneck: Line 3 (92% util.)</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    Production running smoothly. Monitor Line 3 for potential constraints.
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate("/capacity-rebalancer")}>
                  View Details <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>

            {/* KPI 4: Forecast Variability & Accuracy */}
            <Card className="p-5 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Forecast Accuracy</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-foreground">82.4%</h3>
                      <span className="text-sm text-muted-foreground">MAPE</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-warning/20 text-warning">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Amber
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  <span className="text-destructive font-medium">-3.1% vs last week</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Issues:</p>
                  <div className="space-y-1">
                    <p className="text-xs text-foreground leading-relaxed">• Bias: +6% (over-forecasting)</p>
                    <p className="text-xs text-foreground leading-relaxed">• Volatility spike in Electronics</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    Over-forecast causing excess build. Recalibrate demand signals for Electronics.
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate("/predictive-analytics")}>
                  View Analytics <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>

            {/* KPI 5: Deployment / DR Compliance */}
            <Card className="p-5 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">DR Compliance</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-3xl font-bold text-foreground">94%</h3>
                      <span className="text-sm text-muted-foreground">/ 98%</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-warning/20 text-warning">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Amber
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-success font-medium">+1.2% vs last week</span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Violations:</p>
                  <div className="space-y-1">
                    <p className="text-xs text-foreground leading-relaxed">• 12 lane overload violations</p>
                    <p className="text-xs text-foreground leading-relaxed">• 8 rule breaches in EMEA</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground italic leading-relaxed">
                    Deployment rules mostly followed. Rebalance EMEA lanes to reduce violations.
                  </p>
                </div>

                <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => navigate("/execution-tracker")}>
                  View Tracker <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Planner Summary */}
          <Card className="p-6 bg-muted/30">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-2">Today's Planning Summary</h3>
                <p className="text-sm text-foreground leading-relaxed">
                  Service levels are under pressure (-1.8% WoW) due to APAC fulfillment delays and e-commerce backlog. 
                  Inventory health is improving with SLOB reduction continuing strong. Capacity utilization is healthy at 78% 
                  with no immediate constraints. However, forecast accuracy has dipped to 82.4% with a consistent over-forecast bias, 
                  causing excess prebuild in Electronics. Deployment compliance is improving but EMEA lanes remain overloaded. 
                  <strong className="text-foreground"> Overall: Focus on expediting APAC replenishment and recalibrating Electronics forecast to prevent further inventory build-up.</strong>
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground mb-3">Recommended Actions (from Agents)</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <Badge variant="secondary" className="mt-0.5">Inventory Agent</Badge>
                    <p className="text-sm text-foreground flex-1 leading-relaxed">
                      Prioritize clearance of SLOB SKUs in Retail channel. Consider promo push for slow movers identified in last week's analysis.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <Badge variant="secondary" className="mt-0.5">Insights Agent</Badge>
                    <p className="text-sm text-foreground flex-1 leading-relaxed">
                      Recalibrate demand forecast for Electronics category. Current over-forecast bias is driving unnecessary prebuild.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border">
                    <Badge variant="secondary" className="mt-0.5">Deployment Agent</Badge>
                    <p className="text-sm text-foreground flex-1 leading-relaxed">
                      Rebalance EMEA distribution lanes to resolve 8 active rule violations. Suggest routing adjustments for high-volume SKUs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span>Auto-refresh: Every 15 minutes</span>
                <span>Last updated: Just now</span>
              </div>
            </div>
          </Card>
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

        {/* Historical KPI Summary - Secondary Metrics */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Historical Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate("/diagnostics-analytics")}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success text-sm">+3.2%</Badge>
              </div>
              <h3 className="text-3xl font-bold text-foreground">89.4%</h3>
              <p className="text-base text-muted-foreground mt-2">Avg Service Level</p>
            </Card>

            <Card className="p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate("/diagnostics-analytics")}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-warning/10">
                  <Package className="h-6 w-6 text-warning" />
                </div>
                <Badge variant="secondary" className="bg-warning/20 text-warning text-sm">-2.1 days</Badge>
              </div>
              <h3 className="text-3xl font-bold text-foreground">18.3</h3>
              <p className="text-base text-muted-foreground mt-2">Inventory DOS</p>
            </Card>

            <Card className="p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate("/diagnostics-analytics")}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-destructive/10">
                  <AlertCircle className="h-6 w-6 text-destructive" />
                </div>
                <Badge variant="secondary" className="bg-destructive/20 text-destructive text-sm">+8.4%</Badge>
              </div>
              <h3 className="text-3xl font-bold text-foreground">€58 M</h3>
              <p className="text-base text-muted-foreground mt-2">SLOB Exposure</p>
            </Card>

            <Card className="p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate("/diagnostics-analytics")}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="secondary" className="bg-success/20 text-success text-sm">+5.1%</Badge>
              </div>
              <h3 className="text-3xl font-bold text-foreground">28.4%</h3>
              <p className="text-base text-muted-foreground mt-2">Gross Margin</p>
            </Card>
          </div>
        </div>

        {/* Service Breakdown by Channel */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Service Breakdown by Channel</h3>
            <p className="text-base text-muted-foreground">Current vs Target performance across channels</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={serviceByChannelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="channel" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="service" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Actual" />
              <Bar dataKey="target" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forecast Bias */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Forecast Bias Last 8 Weeks</h3>
              <p className="text-base text-muted-foreground">Positive = Over-forecast, Negative = Under-forecast</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={forecastBiasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line type="monotone" dataKey="bias" stroke="hsl(var(--primary))" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Slow Movers */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Slow Movers & Obsolescence Forecast</h3>
              <p className="text-base text-muted-foreground">SKU movement classification</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={slowMoverData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {slowMoverData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* WITLOP / DITLOP Trends */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">WITLOP / DITLOP Trends</h3>
            <p className="text-base text-muted-foreground">Weekly Inventory Turns & Days Inventory analysis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <p className="text-base text-muted-foreground mb-2">WITLOP (Weeks Inventory)</p>
              <p className="text-3xl font-bold text-foreground mb-1">2.6 weeks</p>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-success">-0.3 weeks vs last month</span>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <p className="text-base text-muted-foreground mb-2">DITLOP (Days Inventory)</p>
              <p className="text-3xl font-bold text-foreground mb-1">18.3 days</p>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-success">-2.1 days vs target</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Margin at Risk Heatmap */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Margin-at-Risk Heatmap</h3>
            <p className="text-base text-muted-foreground">Regional margin performance and risk exposure</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={marginRiskData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="margin" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} name="Margin %" />
              <Bar dataKey="risk" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} name="Risk %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </MainLayout>
  );
}
