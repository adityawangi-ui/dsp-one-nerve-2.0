import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, TrendingDown, Factory, PlayCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";

const slobTrendData = [
  { month: "Jul", amount: 42, count: 245 },
  { month: "Aug", amount: 46, count: 268 },
  { month: "Sep", amount: 51, count: 289 },
  { month: "Oct", amount: 54, count: 305 },
  { month: "Nov", amount: 56, count: 318 },
  { month: "Dec", amount: 58, count: 322 },
];

const batchAgeingData = [
  { age: "0-3 months", value: 45, count: 145, color: "hsl(var(--success))" },
  { age: "3-6 months", value: 28, count: 89, color: "hsl(var(--warning))" },
  { age: "6-12 months", value: 18, count: 58, color: "hsl(var(--destructive))" },
  { age: ">12 months", value: 9, count: 30, color: "hsl(var(--muted))" },
];

const writeOffHotspotsData = [
  { plant: "Plant 2401", exposure: 18.5, skus: 98 },
  { plant: "Plant 1200", exposure: 12.2, skus: 65 },
  { plant: "Plant 3105", exposure: 9.8, skus: 52 },
  { plant: "Plant 1850", exposure: 8.3, skus: 45 },
  { plant: "Plant 2709", exposure: 6.4, skus: 38 },
  { plant: "Others", exposure: 2.8, skus: 24 },
];

const ageingByPlantData = [
  { plant: "2401", "0-3m": 8, "3-6m": 5, "6-12m": 3, ">12m": 2.5 },
  { plant: "1200", "0-3m": 5, "3-6m": 4, "6-12m": 2, ">12m": 1.2 },
  { plant: "3105", "0-3m": 4, "3-6m": 3, "6-12m": 1.8, ">12m": 1 },
];

export default function WasteOptimizer() {
  const { toast } = useToast();

  const activeAgents = [
    "SLOB+BW Agent",
    "Innovation Agent (FG+RM)"
  ];

  const handleRunOptimization = () => {
    toast({
      title: "Optimization Started",
      description: "Analyzing SLOB exposure and generating mitigation actions...",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Waste Optimization Studio</h1>
            <p className="text-muted-foreground mt-2">SLOB & Batch Write-off Management</p>
          </div>
          <Button size="lg" onClick={handleRunOptimization} className="gap-2">
            <PlayCircle className="h-5 w-5" />
            Run Optimization
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
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total SLOB Exposure</p>
              <p className="text-4xl font-bold text-foreground">₹58 Cr</p>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-destructive" />
                <span className="text-destructive">+8.4% vs last quarter</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <div className="flex items-center gap-3 mb-4">
              <Factory className="h-8 w-8 text-warning" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Hotspot Plant</p>
              <p className="text-4xl font-bold text-foreground">2401</p>
              <p className="text-sm text-muted-foreground">₹18.5 Cr exposure (32% of total)</p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Package className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">SKU Count at Risk</p>
              <p className="text-4xl font-bold text-foreground">322</p>
              <p className="text-sm text-muted-foreground">Up from 305 last month</p>
            </div>
          </Card>
        </div>

        {/* SLOB Trending */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">SLOB Exposure Trend</h3>
            <p className="text-sm text-muted-foreground">6-month trajectory (Slow, Low, Obsolete, Blocked inventory)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={slobTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" label={{ value: 'Amount (₹ Cr)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" label={{ value: 'SKU Count', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Line yAxisId="left" type="monotone" dataKey="amount" stroke="hsl(var(--destructive))" strokeWidth={3} name="Exposure (₹ Cr)" />
              <Line yAxisId="right" type="monotone" dataKey="count" stroke="hsl(var(--warning))" strokeWidth={3} name="SKU Count" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Batch-level Ageing */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Batch-Level Ageing Distribution</h3>
              <p className="text-sm text-muted-foreground">Inventory age breakdown (₹ Cr)</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={batchAgeingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ age, value }) => `${age}: ₹${value}Cr`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {batchAgeingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {batchAgeingData.map((item) => (
                <div key={item.age} className="p-2 rounded-lg border border-border bg-muted/20">
                  <p className="text-xs text-muted-foreground">{item.age}</p>
                  <p className="text-sm font-bold text-foreground">{item.count} batches</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Write-off Hotspots */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Write-off Hotspots by Plant</h3>
              <p className="text-sm text-muted-foreground">Exposure concentration (₹ Cr)</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={writeOffHotspotsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="plant" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="exposure" radius={[0, 8, 8, 0]}>
                  {writeOffHotspotsData.map((entry, index) => (
                    <Bar 
                      key={`bar-${index}`} 
                      dataKey="exposure" 
                      fill={index === 0 ? "hsl(var(--destructive))" : index === 1 ? "hsl(var(--warning))" : "hsl(var(--primary))"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Ageing by Plant Stacked */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Age Distribution by Top 3 Plants</h3>
            <p className="text-sm text-muted-foreground">Stacked view of inventory ageing (₹ Cr)</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageingByPlantData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="plant" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="0-3m" stackId="a" fill="hsl(var(--success))" radius={[0, 0, 0, 0]} name="0-3 months" />
              <Bar dataKey="3-6m" stackId="a" fill="hsl(var(--warning))" radius={[0, 0, 0, 0]} name="3-6 months" />
              <Bar dataKey="6-12m" stackId="a" fill="hsl(var(--destructive))" radius={[0, 0, 0, 0]} name="6-12 months" />
              <Bar dataKey=">12m" stackId="a" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} name=">12 months" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Mitigation Actions */}
        <Card className="p-6 bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-3">AI-Recommended Mitigation Actions</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">Plant 2401: Immediate Clearance Sale</p>
                    <Badge variant="secondary" className="bg-destructive/20 text-destructive">Urgent</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    98 SKUs with ₹18.5 Cr exposure. 42 SKUs aged &gt;12 months.
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    Action: Launch 20% discount campaign for aged inventory. Estimated recovery: ₹12.8 Cr.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">Batch Write-off Acceleration</p>
                    <Badge variant="secondary" className="bg-warning/20 text-warning">High Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    30 batches aged &gt;12 months totaling ₹9 Cr. Quality risk increasing.
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    Action: Initiate write-off process for batches beyond recovery. Free up warehouse space.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-foreground">Production Mix Adjustment</p>
                    <Badge variant="secondary" className="bg-primary/20 text-primary">Medium Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Forecast indicates 18 SKUs will enter SLOB status in next 2 months.
                  </p>
                  <p className="text-sm text-foreground font-medium">
                    Action: Reduce production run size by 30% for these SKUs. Coordinate with MD Agent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
