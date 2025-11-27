import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, AlertCircle, TrendingUp, Package2, Truck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

const bottleneckData = [
  { line: "L23", load: 76, status: "Critical" },
  { line: "L18", load: 54, status: "Normal" },
  { line: "L12", load: 62, status: "Normal" },
  { line: "L09", load: 41, status: "Underused" },
  { line: "L05", load: 68, status: "Normal" },
];

const inventoryGapData = [
  { week: "W1", atp: 12450, required: 24900, gap: -12450 },
  { week: "W2", atp: 8200, required: 21250, gap: -13050 },
  { week: "W3", atp: 15800, required: 19600, gap: -3800 },
  { week: "W4", atp: 21000, required: 18400, gap: 2600 },
];

const supplierRiskData = [
  { name: "On-time", value: 68 },
  { name: "Delayed", value: 32 },
];

const COLORS = ["hsl(var(--success))", "hsl(var(--destructive))"];

export default function DeepDiveDiagnostics() {
  const navigate = useNavigate();

  const activeAgents = [
    "Risk Resolution Presenter",
    "SLOB+BW Agent",
    "Transition Agent",
    "X-Border DRP Agent"
  ];

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Deep Dive Diagnostics</h1>
            <p className="text-muted-foreground mt-2">Material: FG-98342 | Plant: 1200</p>
          </div>
          <Button onClick={() => navigate("/scenario-studio")} size="lg" className="gap-2">
            Generate Scenarios <ChevronRight className="h-4 w-4" />
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

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">12,450</h3>
            <p className="text-sm text-muted-foreground">Units Shortfall (ATP vs Required)</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <div className="flex items-center justify-between mb-4">
              <Package2 className="h-8 w-8 text-warning" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">9,200</h3>
            <p className="text-sm text-muted-foreground">Units Recovery Potential</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">32%</h3>
            <p className="text-sm text-muted-foreground">Supplier Delay Probability</p>
          </Card>
        </div>

        {/* Bottleneck Heatmap */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Production Line Bottleneck Analysis</h3>
            <p className="text-sm text-muted-foreground">Line L23 operating at 76% overload - critical constraint identified</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bottleneckData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="line" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Load %', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="load" radius={[8, 8, 0, 0]}>
                {bottleneckData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.status === "Critical" ? "hsl(var(--destructive))" : entry.status === "Underused" ? "hsl(var(--warning))" : "hsl(var(--primary))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inventory Risk Tree */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Inventory Gap Timeline</h3>
              <p className="text-sm text-muted-foreground">ATP vs Required over 4 weeks</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={inventoryGapData}>
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
                <Line type="monotone" dataKey="atp" stroke="hsl(var(--success))" strokeWidth={2} name="ATP" />
                <Line type="monotone" dataKey="required" stroke="hsl(var(--destructive))" strokeWidth={2} name="Required" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Supplier Delay Risk */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Supplier Delivery Risk</h3>
              <p className="text-sm text-muted-foreground">Historical on-time delivery probability</p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={supplierRiskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {supplierRiskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* DRP Signal Mismatch */}
        <Card className="p-6 bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                DRP Signal Mismatch Detected
              </h3>
              <p className="text-sm text-muted-foreground">
                Distribution requirements planning signal out of sync with production capacity
              </p>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <p className="text-xs text-muted-foreground">DRP Demand Signal</p>
                  <p className="text-lg font-bold text-foreground">24,900 units/week</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Production Capacity</p>
                  <p className="text-lg font-bold text-warning">18,450 units/week</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Gap</p>
                  <p className="text-lg font-bold text-destructive">-6,450 units/week</p>
                </div>
              </div>
            </div>
            <TrendingUp className="h-12 w-12 text-warning opacity-20" />
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
