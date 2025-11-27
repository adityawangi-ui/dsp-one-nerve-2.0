import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Users, Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, ZAxis } from "recharts";

const serviceForecastData = [
  { week: "W1", predicted: 89.2, lower: 87.1, upper: 91.3 },
  { week: "W2", predicted: 90.1, lower: 88.0, upper: 92.2 },
  { week: "W3", predicted: 88.7, lower: 86.6, upper: 90.8 },
  { week: "W4", predicted: 91.3, lower: 89.2, upper: 93.4 },
  { week: "W5", predicted: 92.5, lower: 90.4, upper: 94.6 },
  { week: "W6", predicted: 91.8, lower: 89.7, upper: 93.9 },
  { week: "W7", predicted: 93.2, lower: 91.1, upper: 95.3 },
  { week: "W8", predicted: 94.0, lower: 91.9, upper: 96.1 },
  { week: "W9", predicted: 93.6, lower: 91.5, upper: 95.7 },
  { week: "W10", predicted: 94.2, lower: 92.1, upper: 96.3 },
  { week: "W11", predicted: 93.9, lower: 91.8, upper: 96.0 },
  { week: "W12", predicted: 94.8, lower: 92.7, upper: 96.9 },
];

const driverAttributionData = [
  { driver: "Supplier Risk", probability: 42, impact: "High" },
  { driver: "Demand Volatility", probability: 28, impact: "Medium" },
  { driver: "Production Issues", probability: 18, impact: "Medium" },
  { driver: "Logistics Delays", probability: 12, impact: "Low" },
];

const seasonalLiftData = [
  { month: "Jan", lift: -8 },
  { month: "Feb", lift: -5 },
  { month: "Mar", lift: 12 },
  { month: "Apr", lift: 18 },
  { month: "May", lift: 22 },
  { month: "Jun", lift: 15 },
  { month: "Jul", lift: -3 },
  { month: "Aug", lift: -7 },
  { month: "Sep", lift: 8 },
  { month: "Oct", lift: 25 },
  { month: "Nov", lift: 32 },
  { month: "Dec", lift: 28 },
];

const customerClusterData = [
  { cluster: "High Value", customers: 145, revenue: 850, x: 850, y: 145, z: 400 },
  { cluster: "Growth", customers: 320, revenue: 520, x: 520, y: 320, z: 300 },
  { cluster: "Stable", customers: 580, revenue: 420, x: 420, y: 580, z: 250 },
  { cluster: "At Risk", customers: 210, revenue: 180, x: 180, y: 210, z: 150 },
];

export default function PredictiveAnalytics() {
  const activeAgents = [
    "Predictive Analytics Agent",
    "Self-Healing MD Agent"
  ];

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Predictive Analytics Hub</h1>
          <p className="text-muted-foreground mt-2">AI-powered forecasting and pattern recognition</p>
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

        {/* Key Predictions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="h-6 w-6 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Service Prediction</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">94.2%</p>
            <p className="text-xs text-muted-foreground mb-2">12-week horizon</p>
            <Badge variant="secondary" className="text-xs">± 2.1% confidence</Badge>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-6 w-6 text-destructive" />
              <h3 className="text-sm font-semibold text-foreground">Top Risk Driver</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">42%</p>
            <p className="text-xs text-muted-foreground mb-2">Supplier risk probability</p>
            <Badge variant="secondary" className="text-xs bg-destructive/20 text-destructive">High Impact</Badge>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="h-6 w-6 text-success" />
              <h3 className="text-sm font-semibold text-foreground">Peak Season Lift</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">+32%</p>
            <p className="text-xs text-muted-foreground mb-2">November forecast</p>
            <Badge variant="secondary" className="text-xs bg-success/20 text-success">Seasonal High</Badge>
          </Card>
        </div>

        {/* 12-Week Service Forecast */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">12-Week Service Level Forecast</h3>
            <p className="text-sm text-muted-foreground">Predictive model with confidence intervals (± 2σ)</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={serviceForecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[85, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Line type="monotone" dataKey="upper" stroke="hsl(var(--muted))" strokeWidth={1} strokeDasharray="3 3" name="Upper Bound" />
              <Line type="monotone" dataKey="predicted" stroke="hsl(var(--primary))" strokeWidth={3} name="Predicted" />
              <Line type="monotone" dataKey="lower" stroke="hsl(var(--muted))" strokeWidth={1} strokeDasharray="3 3" name="Lower Bound" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Driver Attribution */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Risk Driver Attribution</h3>
              <p className="text-sm text-muted-foreground">Probability and impact analysis</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={driverAttributionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 50]} />
                <YAxis dataKey="driver" type="category" stroke="hsl(var(--muted-foreground))" width={140} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="probability" radius={[0, 8, 8, 0]}>
                  {driverAttributionData.map((entry, index) => (
                    <Bar 
                      key={`bar-${index}`} 
                      dataKey="probability" 
                      fill={entry.impact === "High" ? "hsl(var(--destructive))" : entry.impact === "Medium" ? "hsl(var(--warning))" : "hsl(var(--success))"} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Seasonal Lift */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Seasonal Demand Lift</h3>
              <p className="text-sm text-muted-foreground">Month-over-month % change projection</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonalLiftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="lift" radius={[8, 8, 0, 0]}>
                  {seasonalLiftData.map((entry, index) => (
                    <Bar key={`bar-${index}`} dataKey="lift" fill={entry.lift > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Customer Clustering */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-2">Customer Segmentation Analysis</h3>
            <p className="text-sm text-muted-foreground">Revenue vs Volume clustering with order frequency (bubble size)</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" dataKey="x" name="Revenue" unit="M" stroke="hsl(var(--muted-foreground))" />
              <YAxis type="number" dataKey="y" name="Customers" stroke="hsl(var(--muted-foreground))" />
              <ZAxis type="number" dataKey="z" range={[100, 1000]} />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Scatter name="High Value" data={[customerClusterData[0]]} fill="hsl(var(--success))" />
              <Scatter name="Growth" data={[customerClusterData[1]]} fill="hsl(var(--primary))" />
              <Scatter name="Stable" data={[customerClusterData[2]]} fill="hsl(var(--warning))" />
              <Scatter name="At Risk" data={[customerClusterData[3]]} fill="hsl(var(--destructive))" />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {customerClusterData.map((cluster) => (
              <div key={cluster.cluster} className="p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-xs text-muted-foreground mb-1">{cluster.cluster}</p>
                <p className="text-lg font-bold text-foreground">{cluster.customers}</p>
                <p className="text-xs text-muted-foreground">₹{cluster.revenue}M revenue</p>
              </div>
            ))}
          </div>
        </Card>

        {/* AI Insights */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start gap-4">
            <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">AI-Generated Insights</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Supplier Risk Concentration:</strong> 42% of service risk is concentrated in 3 critical suppliers. Recommend diversification strategy for Q2.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">Seasonal Peak Preparation:</strong> November demand lift of +32% requires capacity planning 8 weeks ahead. Current lead time: 6 weeks (insufficient).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">High-Value Customer Focus:</strong> 145 high-value customers generate 850M revenue (68% of total). Service level for this segment: 96% (exceeds target).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span><strong className="text-foreground">At-Risk Segment Alert:</strong> 210 customers in "At Risk" cluster show 18% order decline over 3 months. Retention campaign recommended.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
