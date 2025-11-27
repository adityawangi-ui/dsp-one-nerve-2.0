import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Package, Truck, Factory } from "lucide-react";
import { Sankey, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from "recharts";
import { useNavigate } from "react-router-dom";

const sankeyData = {
  nodes: [
    { name: "Total Demand" },
    { name: "Forecast Error" },
    { name: "Inventory Gap" },
    { name: "Capacity Constraint" },
    { name: "Supplier Delay" },
    { name: "Logistics Issue" },
    { name: "Service Loss" },
  ],
  links: [
    { source: 0, target: 1, value: 32 },
    { source: 0, target: 2, value: 28 },
    { source: 0, target: 3, value: 18 },
    { source: 0, target: 4, value: 15 },
    { source: 0, target: 5, value: 7 },
    { source: 1, target: 6, value: 32 },
    { source: 2, target: 6, value: 28 },
    { source: 3, target: 6, value: 18 },
    { source: 4, target: 6, value: 15 },
    { source: 5, target: 6, value: 7 },
  ],
};

const inventoryTurnsData = [
  { month: "Jan", turns: 5.8, target: 6.0 },
  { month: "Feb", turns: 6.2, target: 6.0 },
  { month: "Mar", turns: 5.9, target: 6.0 },
  { month: "Apr", turns: 6.4, target: 6.0 },
  { month: "May", turns: 6.1, target: 6.0 },
  { month: "Jun", turns: 6.3, target: 6.0 },
];

const witlopData = [
  { week: "W1", witlop: 2.8, ditlop: 19.6 },
  { week: "W2", witlop: 2.7, ditlop: 18.9 },
  { week: "W3", witlop: 2.9, ditlop: 20.3 },
  { week: "W4", witlop: 2.5, ditlop: 17.5 },
  { week: "W5", witlop: 2.6, ditlop: 18.2 },
  { week: "W6", witlop: 2.4, ditlop: 16.8 },
];

const drilldownData = [
  { category: "Forecast Accuracy", impact: 32, color: "hsl(var(--destructive))" },
  { category: "Inventory Position", impact: 28, color: "hsl(var(--warning))" },
  { category: "Capacity Utilization", impact: 18, color: "hsl(var(--primary))" },
  { category: "Supplier OTIF", impact: 15, color: "hsl(var(--success))" },
  { category: "Logistics Performance", impact: 7, color: "hsl(var(--muted))" },
];

export default function DiagnosticsAnalytics() {
  const navigate = useNavigate();

  const activeAgents = [
    "Risk Identification Agent",
    "Target Agent",
    "E2E Inv Agent",
    "N/W Cost Agent"
  ];

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Diagnostics Analytics Hub</h1>
          <p className="text-muted-foreground mt-2">Deep-dive root cause analysis</p>
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

        {/* Service Loss Sankey */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Service Loss Flow Analysis</h3>
            <p className="text-sm text-muted-foreground">End-to-end impact pathway from root causes to service degradation</p>
          </div>
          <div className="bg-muted/20 rounded-lg p-8 border border-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-32 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary-foreground">Total Demand</span>
                  </div>
                  <div className="text-2xl text-muted-foreground">→</div>
                </div>
                <div className="w-32 h-12 bg-destructive rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-destructive-foreground">Service Loss</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-20 bg-destructive/80 rounded flex items-center justify-center text-center p-2">
                    <span className="text-xs font-medium text-white">Forecast Error<br/>32%</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-20 bg-warning/80 rounded flex items-center justify-center text-center p-2">
                    <span className="text-xs font-medium text-white">Inventory Gap<br/>28%</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-20 bg-primary/80 rounded flex items-center justify-center text-center p-2">
                    <span className="text-xs font-medium text-white">Capacity<br/>18%</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-20 bg-success/80 rounded flex items-center justify-center text-center p-2">
                    <span className="text-xs font-medium text-white">Supplier<br/>15%</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-20 bg-muted rounded flex items-center justify-center text-center p-2">
                    <span className="text-xs font-medium text-foreground">Logistics<br/>7%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Drilldown Tree */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Impact Attribution Drilldown</h3>
            <p className="text-sm text-muted-foreground">Weighted contribution analysis across supply chain dimensions</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={drilldownData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 35]} />
              <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" width={150} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="impact" radius={[0, 8, 8, 0]}>
                {drilldownData.map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="impact" fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Turns Trend */}
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">Inventory Turns Trend</h3>
                <p className="text-sm text-muted-foreground">6-month rolling performance</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={inventoryTurnsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[5, 7]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line type="monotone" dataKey="turns" stroke="hsl(var(--primary))" strokeWidth={3} name="Actual" />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* WITLOP / DITLOP */}
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <TrendingDown className="h-5 w-5 text-success" />
              <div>
                <h3 className="text-xl font-semibold text-foreground">WITLOP / DITLOP Analysis</h3>
                <p className="text-sm text-muted-foreground">6-week inventory velocity</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={witlopData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" domain={[0, 5]} />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" domain={[0, 25]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line yAxisId="left" type="monotone" dataKey="witlop" stroke="hsl(var(--primary))" strokeWidth={3} name="WITLOP (weeks)" />
                <Line yAxisId="right" type="monotone" dataKey="ditlop" stroke="hsl(var(--success))" strokeWidth={3} name="DITLOP (days)" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Key Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingDown className="h-6 w-6 text-destructive" />
              <h3 className="text-lg font-semibold text-foreground">Top Risk Driver</h3>
            </div>
            <p className="text-3xl font-bold text-destructive mb-2">32%</p>
            <p className="text-sm text-muted-foreground">Service loss attributed to forecast accuracy issues</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Factory className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Capacity Utilization</h3>
            </div>
            <p className="text-3xl font-bold text-primary mb-2">78%</p>
            <p className="text-sm text-muted-foreground">Average across all production lines - target: 85%</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="h-6 w-6 text-warning" />
              <h3 className="text-lg font-semibold text-foreground">Supplier OTIF</h3>
            </div>
            <p className="text-3xl font-bold text-warning mb-2">68%</p>
            <p className="text-sm text-muted-foreground">On-time in-full delivery - below 85% target</p>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
