import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Target, TrendingUp, DollarSign, PlayCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, Radar } from "recharts";
import { useToast } from "@/hooks/use-toast";

const normsComparisonData = [
  { sku: "FG-101", current: 27, simulated: 21, target: 21 },
  { sku: "FG-202", current: 32, simulated: 24, target: 23 },
  { sku: "FG-303", current: 18, simulated: 19, target: 19 },
  { sku: "FG-404", current: 29, simulated: 22, target: 21 },
  { sku: "FG-505", current: 24, simulated: 20, target: 20 },
];

const workingCapitalData = [
  { category: "Current State", amount: 852, locked: 32 },
  { category: "Optimized State", amount: 820, locked: 0 },
  { category: "Target State", amount: 805, locked: 0 },
];

const serviceLiftData = [
  { week: "W1", current: 88.2, optimized: 88.2 },
  { week: "W2", current: 88.5, optimized: 89.8 },
  { week: "W3", current: 87.9, optimized: 90.5 },
  { week: "W4", current: 88.8, optimized: 91.2 },
  { week: "W5", current: 89.1, optimized: 91.8 },
  { week: "W6", current: 88.6, optimized: 92.4 },
];

const impactRadarData = [
  { metric: "Service Level", current: 88, optimized: 92 },
  { metric: "Working Capital", current: 65, optimized: 85 },
  { metric: "Inventory Turns", current: 72, optimized: 88 },
  { metric: "DOS Target", current: 58, optimized: 95 },
  { metric: "SLOB Risk", current: 45, optimized: 78 },
];

export default function InventoryOptimizer() {
  const { toast } = useToast();

  const activeAgents = [
    "Target Agent",
    "Pre-MEIO",
    "Post-MEIO",
    "E2E Inv Optimizer"
  ];

  const handleRunSimulation = () => {
    toast({
      title: "Simulation Started",
      description: "Optimization engine is recalculating inventory norms...",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Inventory Norms & Target Simulator</h1>
            <p className="text-muted-foreground mt-2">Multi-Echelon Inventory Optimization</p>
          </div>
          <Button size="lg" onClick={handleRunSimulation} className="gap-2">
            <PlayCircle className="h-5 w-5" />
            Run Simulation
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

        {/* Key Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Target DOS Achievement</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-foreground">27</p>
                <p className="text-xl text-muted-foreground">→</p>
                <p className="text-3xl font-bold text-primary">21</p>
              </div>
              <p className="text-xs text-muted-foreground">Current vs Optimized DOS</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-8 w-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Working Capital Impact</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-destructive">+₹3.2 Cr</p>
              </div>
              <p className="text-xs text-muted-foreground">Currently locked in excess inventory</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Service Lift (if corrected)</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-success">+4.2%</p>
              </div>
              <p className="text-xs text-muted-foreground">Predicted service level improvement</p>
            </div>
          </Card>
        </div>

        {/* Current vs Simulated Norms */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Inventory Norms Comparison</h3>
            <p className="text-sm text-muted-foreground">Current DOS vs Simulated Optimal vs Target (Top 5 SKUs)</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={normsComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="sku" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" label={{ value: 'Days of Supply', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="current" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} name="Current DOS" />
              <Bar dataKey="simulated" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Simulated DOS" />
              <Bar dataKey="target" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} name="Target DOS" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Working Capital Impact */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Working Capital Analysis</h3>
              <p className="text-sm text-muted-foreground">Inventory value across states (₹ Crores)</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={workingCapitalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Total Value" />
                <Bar dataKey="locked" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} name="Locked Capital" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Service Level Projection */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Service Level Lift Projection</h3>
              <p className="text-sm text-muted-foreground">6-week forecast with optimization</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={serviceLiftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[85, 95]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line type="monotone" dataKey="current" stroke="hsl(var(--muted))" strokeWidth={2} strokeDasharray="5 5" name="Current Trajectory" />
                <Line type="monotone" dataKey="optimized" stroke="hsl(var(--success))" strokeWidth={3} name="With Optimization" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Multi-dimensional Impact */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Multi-Dimensional Impact Radar</h3>
            <p className="text-sm text-muted-foreground">Current state vs Optimized state across key metrics</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={impactRadarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
              <Radar name="Current State" dataKey="current" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.3} />
              <Radar name="Optimized State" dataKey="optimized" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.5} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Optimization Actions */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start gap-4">
            <Package className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-3">Recommended Optimization Actions</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">SKU FG-202: Reduce Safety Stock</p>
                    <Badge variant="secondary" className="bg-success/20 text-success">High Impact</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Current: 32 DOS → Target: 24 DOS. Saves ₹0.8 Cr working capital with minimal service risk.</p>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">SKU FG-101: Adjust Reorder Point</p>
                    <Badge variant="secondary" className="bg-primary/20 text-primary">Medium Impact</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Current: 27 DOS → Target: 21 DOS. Improves inventory turns by 0.8x while maintaining 95% service level.</p>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">SKU FG-404: Optimize Order Frequency</p>
                    <Badge variant="secondary" className="bg-warning/20 text-warning">Low Impact</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Increase order frequency from monthly to bi-weekly. Reduces DOS from 29 to 22 days.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
