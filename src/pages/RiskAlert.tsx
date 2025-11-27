import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Package, TrendingDown, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { useNavigate } from "react-router-dom";

const serviceDropData = [
  { hour: "0h", service: 92 },
  { hour: "6h", service: 89 },
  { hour: "12h", service: 85 },
  { hour: "18h", service: 82 },
  { hour: "24h", service: 79 },
  { hour: "30h", service: 77 },
  { hour: "36h", service: 77 },
  { hour: "42h", service: 77 },
  { hour: "48h", service: 77 },
];

const rootCauseData = [
  { cause: "Line Overload", probability: 76 },
  { cause: "Supplier Delay", probability: 32 },
  { cause: "DRP Mismatch", probability: 28 },
  { cause: "Capacity Squeeze", probability: 19 },
  { cause: "Inventory Gap", probability: 12 },
];

export default function RiskAlert() {
  const navigate = useNavigate();

  const activeAgents = [
    "Service Agent",
    "Risk Identification Agent",
    "Risk Mitigation Agent",
    "E2E Inv Agent",
    "RCCP Agent",
    "DRP Agent"
  ];

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">High Risk Alert</h1>
            <p className="text-muted-foreground mt-2">Critical service disruption detected</p>
          </div>
          <Button onClick={() => navigate("/deep-dive-diagnostics")} size="lg" className="gap-2">
            Investigate <ChevronRight className="h-4 w-4" />
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

        {/* Critical Alert Card */}
        <Card className="p-8 border-destructive bg-destructive/5 shadow-[var(--shadow-glow)]">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-full bg-destructive/20">
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-destructive mb-2">Critical Service Risk</h2>
                <p className="text-muted-foreground">
                  Immediate action required to prevent customer order failures
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Material</p>
                  <p className="text-lg font-bold text-foreground">FG-98342</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Plant</p>
                  <p className="text-lg font-bold text-foreground">1200</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">SKU Class</p>
                  <p className="text-lg font-bold text-primary">A+</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Orders at Risk</p>
                  <p className="text-lg font-bold text-destructive">48,320</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Service Drop</p>
                  <p className="text-lg font-bold text-destructive">92% → 77%</p>
                </div>
                <div className="space-y-1 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-destructive" />
                  <div>
                    <p className="text-xs text-muted-foreground">Time to Act</p>
                    <p className="text-lg font-bold text-destructive">48 hrs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Drop Curve */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Service Drop Forecast</h3>
                <p className="text-sm text-muted-foreground">Hour-by-hour projection</p>
              </div>
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={serviceDropData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[70, 95]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="service" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--destructive))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Root Cause Waterfall */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Root Cause Analysis</h3>
                <p className="text-sm text-muted-foreground">Probability waterfall</p>
              </div>
              <Package className="h-5 w-5 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={rootCauseData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
                <YAxis dataKey="cause" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="probability" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Simulation Preview */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">Simulation Preview</h3>
              <p className="text-sm text-muted-foreground">
                3 optimization scenarios available - potential service recovery: 8-14%
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span className="text-sm text-foreground">Best Case: +14%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-sm text-foreground">Moderate: +11%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">Conservative: +8%</span>
                </div>
              </div>
            </div>
            <Button size="lg" onClick={() => navigate("/scenario-studio")} className="gap-2">
              Run Scenarios <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
