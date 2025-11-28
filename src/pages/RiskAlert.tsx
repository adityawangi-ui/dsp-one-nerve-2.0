import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Package, TrendingDown, ChevronRight, AlertCircle, PackageX, Truck, Zap, Factory, ArrowRightLeft, Timer, ArrowLeft } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ScatterChart, Scatter, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  { cause: "Line Overload", probability: 76, agent: "Capacity Agent" },
  { cause: "Supplier Delay", probability: 32, agent: "Supplier Agent" },
  { cause: "DRP Mismatch", probability: 28, agent: "DRP Agent" },
  { cause: "Capacity Squeeze", probability: 19, agent: "RCCP Agent" },
  { cause: "Inventory Gap", probability: 12, agent: "Inventory Agent" },
];

const impactHeatmapData = [
  { sku: "FG-98342", dc: "DC-33", impact: 12450, severity: "critical" },
  { sku: "FG-98342", dc: "DC-45", impact: 8200, severity: "high" },
  { sku: "FG-98342", dc: "DC-12", impact: 6800, severity: "high" },
  { sku: "FG-98342", dc: "DC-28", impact: 3200, severity: "medium" },
  { sku: "FG-87231", dc: "DC-33", impact: 2100, severity: "medium" },
  { sku: "FG-76543", dc: "DC-45", impact: 1800, severity: "low" },
];

const allAlerts = [
  {
    id: 1,
    severity: "critical",
    title: "High Service Drop Predicted",
    material: "FG-98342",
    plant: "1200",
    skuClass: "A+",
    impact: "48,320 orders at risk",
    driver: "Line Overload + Supplier Delay",
    timeToFailure: "48 hrs",
    serviceDrop: "92% → 77%",
    agents: ["Service Agent", "Risk Identification Agent", "Predictive Analytics Agent"],
    icon: AlertTriangle,
  },
  {
    id: 2,
    severity: "high",
    title: "Inventory Norm Violation",
    material: "32 SKUs",
    plant: "Multiple",
    skuClass: "A/A+",
    impact: "₹3.2 Cr WC locked",
    driver: "DOS: 27 vs Target: 21",
    timeToFailure: "72 hrs",
    serviceDrop: "N/A",
    agents: ["Inventory Agent", "Target Agent", "E2E Inv Agent"],
    icon: Package,
  },
  {
    id: 3,
    severity: "high",
    title: "Forecast Spike Detected",
    material: "FG-23456",
    plant: "1400",
    skuClass: "A",
    impact: "Promo leakage 18%",
    driver: "North/West channel surge",
    timeToFailure: "96 hrs",
    serviceDrop: "Potential +12%",
    agents: ["MD Error Identifier", "Predictive Analytics Agent"],
    icon: TrendingDown,
  },
  {
    id: 4,
    severity: "high",
    title: "Supplier Delay Risk",
    material: "RM-882",
    plant: "1200",
    skuClass: "Critical RM",
    impact: "Impacts 12 FG SKUs",
    driver: "Palson Chemicals ETA+5d",
    timeToFailure: "120 hrs",
    serviceDrop: "Cascading risk",
    agents: ["Supplier Agent", "3P Agent", "Risk Mitigation Agent"],
    icon: Truck,
  },
  {
    id: 5,
    severity: "medium",
    title: "Capacity Overload",
    material: "Line L23",
    plant: "1200",
    skuClass: "Production",
    impact: "134% load detected",
    driver: "Pull-forward demand",
    timeToFailure: "168 hrs",
    serviceDrop: "N/A",
    agents: ["RCCP Agent", "Capacity Agent", "Factory Run Strategy Agent"],
    icon: Factory,
  },
  {
    id: 6,
    severity: "medium",
    title: "DRP Ripple Detected",
    material: "DC-33 → DC-45",
    plant: "Network",
    skuClass: "Distribution",
    impact: "6,450 unit gap",
    driver: "Allocation mismatch",
    timeToFailure: "144 hrs",
    serviceDrop: "Regional -4%",
    agents: ["DRP Agent", "X-Border DRP Agent", "Distribution Optimizer"],
    icon: ArrowRightLeft,
  },
  {
    id: 7,
    severity: "medium",
    title: "Batch Expiry Risk",
    material: "FG-65432",
    plant: "2401",
    skuClass: "B",
    impact: "₹28L write-off risk",
    driver: "85% shelf-life reached",
    timeToFailure: "240 hrs",
    serviceDrop: "N/A",
    agents: ["SLOB+BW Agent", "Waste Agent", "Innovation Agent"],
    icon: Timer,
  },
  {
    id: 8,
    severity: "low",
    title: "Channel OTIF Risk",
    material: "MT Channel",
    plant: "Network",
    skuClass: "Multiple",
    impact: "OTIF: 89% vs 93%",
    driver: "Transit time variance",
    timeToFailure: "336 hrs",
    serviceDrop: "Channel specific",
    agents: ["N/W Cost Agent", "Service Agent"],
    icon: PackageX,
  },
];

export default function RiskAlert() {
  const navigate = useNavigate();
  const [expandedAlert, setExpandedAlert] = useState<number>(1);

  const activeAgents = [
    "Service Agent",
    "Risk Identification Agent",
    "Risk Mitigation Agent",
    "E2E Inv Agent",
    "RCCP Agent",
    "DRP Agent",
    "Predictive Analytics Agent",
    "Supplier Agent",
    "Inventory Agent",
    "Target Agent",
    "MD Error Identifier",
    "3P Agent",
    "Capacity Agent",
    "X-Border DRP Agent",
    "SLOB+BW Agent",
    "Waste Agent",
    "N/W Cost Agent"
  ];

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "critical": return "destructive";
      case "high": return "warning";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch(severity) {
      case "critical": return "bg-destructive/5 border-destructive/20";
      case "high": return "bg-warning/5 border-warning/20";
      case "medium": return "bg-primary/5 border-primary/20";
      case "low": return "bg-muted border-border";
      default: return "bg-muted border-border";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Multi-Agent Risk Control Center</h1>
              <p className="text-muted-foreground mt-2">AI-powered supply chain risk monitoring & mitigation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="destructive" className="text-base px-4 py-2 animate-pulse">
              1 Critical Alert
            </Badge>
            <Button onClick={() => navigate("/deep-dive-diagnostics")} size="lg" className="gap-2">
              Deep Dive Analysis <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Agents - Glowing Border */}
        <Card className="p-4 bg-gradient-to-r from-primary/5 via-success/5 to-warning/5 border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
          <div className="flex items-center gap-2 flex-wrap">
            <Zap className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">Active Agent Mesh:</span>
            {activeAgents.map((agent, idx) => (
              <Badge 
                key={agent} 
                variant="secondary" 
                className="animate-pulse border border-primary/20"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {agent}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Risk Severity Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-3xl font-bold text-destructive">1</p>
              </div>
              <AlertCircle className="h-10 w-10 text-destructive opacity-50" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High</p>
                <p className="text-3xl font-bold text-warning">3</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-warning opacity-50" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Medium</p>
                <p className="text-3xl font-bold text-primary">3</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-primary opacity-50" />
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-muted to-muted/50 border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low</p>
                <p className="text-3xl font-bold text-foreground">1</p>
              </div>
              <AlertCircle className="h-10 w-10 text-muted-foreground opacity-50" />
            </div>
          </Card>
        </div>

        {/* All Risk Alerts */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground">Active Risk Alerts</h2>
          {allAlerts.map((alert) => {
            const Icon = alert.icon;
            const isExpanded = expandedAlert === alert.id;
            
            return (
              <Card 
                key={alert.id}
                className={`p-6 cursor-pointer transition-all duration-300 ${getSeverityBg(alert.severity)} ${
                  isExpanded ? "shadow-[var(--shadow-glow)] scale-[1.01]" : "hover:scale-[1.005]"
                }`}
                onClick={() => setExpandedAlert(isExpanded ? 0 : alert.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    alert.severity === "critical" ? "bg-destructive/20" :
                    alert.severity === "high" ? "bg-warning/20" :
                    alert.severity === "medium" ? "bg-primary/20" :
                    "bg-muted"
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      alert.severity === "critical" ? "text-destructive" :
                      alert.severity === "high" ? "text-warning" :
                      alert.severity === "medium" ? "text-primary" :
                      "text-muted-foreground"
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-foreground">{alert.title}</h3>
                        <Badge variant={getSeverityColor(alert.severity) as any}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span className="font-semibold">{alert.timeToFailure}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-3">
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Material</p>
                        <p className="text-sm font-bold text-foreground">{alert.material}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Plant/Location</p>
                        <p className="text-sm font-bold text-foreground">{alert.plant}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">SKU Class</p>
                        <p className="text-sm font-bold text-primary">{alert.skuClass}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Impact</p>
                        <p className="text-sm font-bold text-destructive">{alert.impact}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Root Driver</p>
                        <p className="text-sm font-bold text-foreground">{alert.driver}</p>
                      </div>
                      {alert.serviceDrop && (
                        <div className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">Service Impact</p>
                          <p className="text-sm font-bold text-destructive">{alert.serviceDrop}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-muted-foreground">Agents Involved:</span>
                      {alert.agents.map((agent) => (
                        <Badge key={agent} variant="outline" className="text-xs">
                          {agent}
                        </Badge>
                      ))}
                    </div>

                    {isExpanded && alert.id === 1 && (
                      <div className="mt-6 space-y-4 border-t border-border pt-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Service Forecast Curve */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-3">48-Hour Service Forecast</h4>
                            <ResponsiveContainer width="100%" height={200}>
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
                            <p className="text-xs text-muted-foreground mt-2 italic">
                              <strong>Service Agent:</strong> Sharp dip predicted at Hour 28 due to capacity constraint on Line L23
                            </p>
                          </div>

                          {/* Root Cause Waterfall */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-3">Root Cause Attribution</h4>
                            <ResponsiveContainer width="100%" height={200}>
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
                                <Bar dataKey="probability" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]}>
                                  {rootCauseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={
                                      entry.probability > 70 ? "hsl(var(--destructive))" :
                                      entry.probability > 40 ? "hsl(var(--warning))" :
                                      "hsl(var(--primary))"
                                    } />
                                  ))}
                                </Bar>
                              </BarChart>
                            </ResponsiveContainer>
                            <p className="text-xs text-muted-foreground mt-2 italic">
                              <strong>Capacity Agent:</strong> Line L23 operating at 134% load - primary bottleneck identified
                            </p>
                          </div>
                        </div>

                        {/* Impact Heatmap */}
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-3">SKU × DC Impact Heatmap</h4>
                          <ResponsiveContainer width="100%" height={200}>
                            <ScatterChart>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="dc" stroke="hsl(var(--muted-foreground))" />
                              <YAxis dataKey="impact" stroke="hsl(var(--muted-foreground))" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: "hsl(var(--card))", 
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px"
                                }}
                                formatter={(value: any, name: string) => {
                                  if (name === "impact") return [value, "Impact (units)"];
                                  return [value, name];
                                }}
                              />
                              <Scatter data={impactHeatmapData} fill="hsl(var(--primary))">
                                {impactHeatmapData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={
                                    entry.severity === "critical" ? "hsl(var(--destructive))" :
                                    entry.severity === "high" ? "hsl(var(--warning))" :
                                    entry.severity === "medium" ? "hsl(var(--primary))" :
                                    "hsl(var(--success))"
                                  } />
                                ))}
                              </Scatter>
                            </ScatterChart>
                          </ResponsiveContainer>
                          <p className="text-xs text-muted-foreground mt-2 italic">
                            <strong>DRP Agent:</strong> DC-33 shows highest impact (12,450 units) - prioritize this distribution center
                          </p>
                        </div>

                        {/* Agent Attribution Table */}
                        <div className="border border-border rounded-lg overflow-hidden">
                          <div className="bg-muted/50 p-3">
                            <h4 className="text-sm font-semibold text-foreground">Agent Data Attribution</h4>
                          </div>
                          <div className="divide-y divide-border">
                            <div className="grid grid-cols-3 p-3 text-xs">
                              <span className="font-semibold text-foreground">Data Point</span>
                              <span className="font-semibold text-foreground">Value</span>
                              <span className="font-semibold text-foreground">Source Agent</span>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-xs">
                              <span className="text-muted-foreground">Service Level Projection</span>
                              <span className="text-foreground">77%</span>
                              <Badge variant="secondary" className="text-xs w-fit">Service Agent</Badge>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-xs">
                              <span className="text-muted-foreground">Line Capacity Status</span>
                              <span className="text-foreground">134% overload</span>
                              <Badge variant="secondary" className="text-xs w-fit">Capacity Agent</Badge>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-xs">
                              <span className="text-muted-foreground">Supplier ETA Delay</span>
                              <span className="text-foreground">+5 days</span>
                              <Badge variant="secondary" className="text-xs w-fit">Supplier Agent</Badge>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-xs">
                              <span className="text-muted-foreground">ATP Shortfall</span>
                              <span className="text-foreground">12,450 units</span>
                              <Badge variant="secondary" className="text-xs w-fit">Inventory Agent</Badge>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-xs">
                              <span className="text-muted-foreground">Root Cause Probability</span>
                              <span className="text-foreground">76%</span>
                              <Badge variant="secondary" className="text-xs w-fit">Risk Identification Agent</Badge>
                            </div>
                            <div className="grid grid-cols-3 p-3 text-xs">
                              <span className="text-muted-foreground">Time to Service Drop</span>
                              <span className="text-foreground">28 hours</span>
                              <Badge variant="secondary" className="text-xs w-fit">Predictive Analytics Agent</Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <p className="text-sm text-muted-foreground italic">
                            💡 <strong>Planner Notice:</strong> This alert requires immediate attention. Multi-agent consensus indicates high confidence in prediction.
                          </p>
                          <Button onClick={() => navigate("/scenario-studio")} className="gap-2">
                            View Scenario Studio <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

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

        {/* Scenario Preview - Quick Actions */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">AI Scenario Generation Ready</h3>
              <p className="text-sm text-muted-foreground">
                Multi-agent optimizer mesh has pre-generated 3 mitigation pathways - potential service recovery: 8-14%
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
                  <span className="text-sm text-foreground font-semibold">Best Case: +14% recovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-sm text-foreground">Moderate: +11% recovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-foreground">Conservative: +8% recovery</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 italic">
                <strong>Target Agent, Capacity Optimizer, Distribution Optimizer, Cost Agent</strong> have collaborated to simulate optimal pathways
              </p>
            </div>
            <Button size="lg" onClick={() => navigate("/scenario-studio")} className="gap-2 shadow-lg">
              Run Scenarios <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
