import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Package, AlertCircle, DollarSign, ArrowLeft } from "lucide-react";
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
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Supply Planning Insights</h1>
            <p className="text-muted-foreground mt-2">Real-time analytics and diagnostics</p>
          </div>
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

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate("/diagnostics-analytics")}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success">+3.2%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">89.4%</h3>
            <p className="text-sm text-muted-foreground">Avg Service Level</p>
          </Card>

          <Card className="p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate("/diagnostics-analytics")}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-warning/10">
                <Package className="h-6 w-6 text-warning" />
              </div>
              <Badge variant="secondary" className="bg-warning/20 text-warning">-2.1 days</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">18.3</h3>
            <p className="text-sm text-muted-foreground">Inventory DOS</p>
          </Card>

          <Card className="p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate("/diagnostics-analytics")}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <Badge variant="secondary" className="bg-destructive/20 text-destructive">+8.4%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">₹58 Cr</h3>
            <p className="text-sm text-muted-foreground">SLOB Exposure</p>
          </Card>

          <Card className="p-6 hover:scale-[1.02] transition-all cursor-pointer" onClick={() => navigate("/diagnostics-analytics")}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success">+5.1%</Badge>
            </div>
            <h3 className="text-2xl font-bold text-foreground">28.4%</h3>
            <p className="text-sm text-muted-foreground">Gross Margin</p>
          </Card>
        </div>

        {/* Service Breakdown by Channel */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Service Breakdown by Channel</h3>
            <p className="text-sm text-muted-foreground">Current vs Target performance across channels</p>
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
              <p className="text-sm text-muted-foreground">Positive = Over-forecast, Negative = Under-forecast</p>
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
              <p className="text-sm text-muted-foreground">SKU movement classification</p>
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
            <p className="text-sm text-muted-foreground">Weekly Inventory Turns & Days Inventory analysis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <p className="text-sm text-muted-foreground mb-2">WITLOP (Weeks Inventory)</p>
              <p className="text-3xl font-bold text-foreground mb-1">2.6 weeks</p>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-success">-0.3 weeks vs last month</span>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border bg-muted/20">
              <p className="text-sm text-muted-foreground mb-2">DITLOP (Days Inventory)</p>
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
            <p className="text-sm text-muted-foreground">Regional margin performance and risk exposure</p>
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
