import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Decision } from "./DecisionTable";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Truck,
  Package,
  AlertTriangle,
  Clock,
  DollarSign,
  MapPin,
  BarChart3,
  Calendar,
  Target,
  Lightbulb,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

interface DecisionDetailDialogProps {
  decision: Decision | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (decisionId: string) => void;
  onDismiss: (decisionId: string) => void;
  onModify: (decisionId: string) => void;
}

// Mock data for SKU details
const mockSKUData = [
  {
    materialNumber: "1009",
    materialDescription: "PET CARE 1009",
    recommendedPallets: 33,
    recommendedUnits: 990,
    serviceRisk: "Yes",
    shortageDay: "12-Dec-2025",
  },
  {
    materialNumber: "2045",
    materialDescription: "HOME SUPPLIES 2045",
    recommendedPallets: 15,
    recommendedUnits: 450,
    serviceRisk: "No",
    shortageDay: "18-Dec-2025",
  },
  {
    materialNumber: "3078",
    materialDescription: "PERSONAL CARE 3078",
    recommendedPallets: 22,
    recommendedUnits: 660,
    serviceRisk: "Yes",
    shortageDay: "15-Dec-2025",
  },
];

// Mock data for stock projection chart
const stockProjectionData = [
  { date: "Oct 16", dismiss: 4800, accept: 4800, days: 11 },
  { date: "Oct 20", dismiss: 4500, accept: 3200, days: 10 },
  { date: "Oct 24", dismiss: 4200, accept: 2900, days: 9 },
  { date: "Oct 28", dismiss: 3900, accept: 2600, days: 8 },
  { date: "Nov 1", dismiss: 3600, accept: 2300, days: 7 },
  { date: "Nov 5", dismiss: 3300, accept: 2000, days: 6 },
  { date: "Nov 9", dismiss: 3000, accept: 1700, days: 5 },
];

// Mock data for impact analysis
const impactData = {
  sourceLocation: {
    current: 4800,
    afterTransfer: 3200,
    optimalLevel: 3500,
    reorderPoint: 2000,
  },
  destinationLocation: {
    current: 1500,
    afterTransfer: 2490,
    optimalLevel: 2200,
    reorderPoint: 1200,
  },
};

// Mock data for alternative options
const alternativeOptions = [
  {
    id: 1,
    name: "Recommended Transfer (33 pallets)",
    savings: "$33,164",
    riskReduction: "$59,695",
    cost: "$4,200",
    leadTime: "22 hours",
    score: 95,
  },
  {
    id: 2,
    name: "Partial Transfer (20 pallets)",
    savings: "$20,100",
    riskReduction: "$35,800",
    cost: "$2,800",
    leadTime: "22 hours",
    score: 72,
  },
  {
    id: 3,
    name: "Delayed Transfer (33 pallets - 3 days)",
    savings: "$31,500",
    riskReduction: "$45,200",
    cost: "$3,900",
    leadTime: "4 days",
    score: 68,
  },
  {
    id: 4,
    name: "No Action",
    savings: "$0",
    riskReduction: "$0",
    cost: "$0",
    leadTime: "N/A",
    score: 35,
  },
];

// Mock data for learning insights
const historicalPerformance = [
  { month: "Apr", accuracy: 88, savings: 28000 },
  { month: "May", accuracy: 91, savings: 31000 },
  { month: "Jun", accuracy: 89, savings: 29500 },
  { month: "Jul", accuracy: 93, savings: 34000 },
  { month: "Aug", accuracy: 94, savings: 35500 },
  { month: "Sep", accuracy: 92, savings: 33000 },
];

export const DecisionDetailDialog = ({
  decision,
  open,
  onOpenChange,
  onAccept,
  onDismiss,
  onModify,
}: DecisionDetailDialogProps) => {
  if (!decision) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[90vh] p-0 gap-0 flex flex-col overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Decision Summary */}
          <div className="w-[400px] border-r border-border bg-surface/50 flex flex-col">
            <div className="p-6 border-b border-border shrink-0">
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {decision.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Created 12 days ago</span>
                </div>
                <DialogTitle className="text-xl font-bold">
                  {decision.type} / {decision.type}
                </DialogTitle>
              </DialogHeader>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm font-semibold text-success">
                  <Calendar className="h-4 w-4" />
                  {formatDate(decision.calendarDay)}
                </div>

                {/* Main Action */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    Transfer {decision.pallets} pallets from Location {decision.fromLocation} ({decision.fromLocation}) to Location {decision.toLocation} ({decision.toLocation}) with FTL load type Mon, Oct 20.
                  </h3>
                </div>

                {/* Reasoning */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Reasoning</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aera has identified excess inventory at location {decision.fromLocation} and shortage at location {decision.toLocation} which would allow balancing the inventory across the network to minimize excess and shortage. The lead time to transfer between is 22 hours.
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Truck Load % (Type):</span>
                    <span className="font-semibold">100% (FTL)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Truck Number:</span>
                    <span className="font-semibold">{decision.truckNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lead Time:</span>
                    <span className="font-semibold">22 hours</span>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Actions */}
            <div className="p-6 border-t border-border shrink-0">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    onDismiss(decision.id);
                    onOpenChange(false);
                  }}
                >
                  Dismiss
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    onModify(decision.id);
                  }}
                >
                  Modify
                </Button>
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => {
                    onAccept(decision.id);
                    onOpenChange(false);
                  }}
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>

          {/* Right Panel - Detailed Tabs */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Tabs defaultValue="transfer" className="flex-1 flex flex-col overflow-hidden">
              <div className="shrink-0 border-b border-border px-6 pt-4">
                <TabsList className="w-full justify-start rounded-none bg-transparent h-auto p-0 border-0">
                  <TabsTrigger value="transfer">Transfer</TabsTrigger>
                  <TabsTrigger value="impact">Impact</TabsTrigger>
                  <TabsTrigger value="logistics">Logistics</TabsTrigger>
                  <TabsTrigger value="alternative-summary">Alternative Summary</TabsTrigger>
                  <TabsTrigger value="alternative-analysis">Alternative Analysis</TabsTrigger>
                  <TabsTrigger value="learning">Learning</TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                <div className="h-full">
                  {/* Transfer Tab */}
                  <TabsContent value="transfer" className="p-6 space-y-6 m-0 h-full">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                      <div className="flex items-start justify-between mb-2">
                        <DollarSign className="h-5 w-5 text-success" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {decision.inventorySavings}
                      </h3>
                      <p className="text-sm text-muted-foreground">Inventory Savings</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Total inventory savings, considering the recommended transfer.
                      </p>
                    </Card>

                    <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                      <div className="flex items-start justify-between mb-2">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-1">
                        {decision.serviceRisk}
                      </h3>
                      <p className="text-sm text-muted-foreground">Service Risk Reduction</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Total service risk reduction, considering the recommended transfer.
                      </p>
                    </Card>
                  </div>

                  {/* SKU Table */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">
                      The following SKUs can be transferred:
                    </h3>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-3 text-xs font-medium text-muted-foreground">
                              Material Number
                            </th>
                            <th className="text-left p-3 text-xs font-medium text-muted-foreground">
                              Material Description
                            </th>
                            <th className="text-right p-3 text-xs font-medium text-muted-foreground">
                              Recommended Transfer (Pallets)
                            </th>
                            <th className="text-right p-3 text-xs font-medium text-muted-foreground">
                              Recommended Transfer (Units)
                            </th>
                            <th className="text-center p-3 text-xs font-medium text-muted-foreground">
                              Service Risk
                            </th>
                            <th className="text-right p-3 text-xs font-medium text-muted-foreground">
                              Projected Shortage Day
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockSKUData.map((sku, index) => (
                            <tr
                              key={index}
                              className="border-t border-border hover:bg-muted/30 transition-colors"
                            >
                              <td className="p-3 text-sm">{sku.materialNumber}</td>
                              <td className="p-3 text-sm">{sku.materialDescription}</td>
                              <td className="p-3 text-sm text-right font-medium">
                                {sku.recommendedPallets}
                              </td>
                              <td className="p-3 text-sm text-right">{sku.recommendedUnits}</td>
                              <td className="p-3 text-center">
                                <Badge
                                  variant={sku.serviceRisk === "Yes" ? "destructive" : "secondary"}
                                  className="text-xs"
                                >
                                  {sku.serviceRisk}
                                </Badge>
                              </td>
                              <td className="p-3 text-sm text-right">{sku.shortageDay}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Stock Projection Chart */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Stock Projection at Source</h3>
                    <div className="border border-border rounded-lg p-4 bg-card">
                      <Tabs defaultValue="dismiss" className="w-full">
                        <TabsList className="mb-4">
                          <TabsTrigger value="dismiss" className="text-xs">
                            Dismiss (No Action)
                          </TabsTrigger>
                          <TabsTrigger value="accept" className="text-xs">
                            Accept
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="dismiss">
                          <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={stockProjectionData}>
                              <defs>
                                <linearGradient id="colorDismiss" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                              <YAxis
                                yAxisId="left"
                                label={{ value: "Quantity (in Units)", angle: -90, position: "insideLeft", style: { fontSize: 12 } }}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                              />
                              <YAxis
                                yAxisId="right"
                                orientation="right"
                                label={{ value: "Days", angle: 90, position: "insideRight", style: { fontSize: 12 } }}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px",
                                }}
                              />
                              <Legend />
                              <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="dismiss"
                                stroke="hsl(var(--primary))"
                                fill="url(#colorDismiss)"
                                name="Stock Level"
                                strokeWidth={2}
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="days"
                                stroke="hsl(var(--destructive))"
                                name="Days of Inventory"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--destructive))" }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </TabsContent>
                        <TabsContent value="accept">
                          <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={stockProjectionData}>
                              <defs>
                                <linearGradient id="colorAccept" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                              <YAxis
                                yAxisId="left"
                                label={{ value: "Quantity (in Units)", angle: -90, position: "insideLeft", style: { fontSize: 12 } }}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                              />
                              <YAxis
                                yAxisId="right"
                                orientation="right"
                                label={{ value: "Days", angle: 90, position: "insideRight", style: { fontSize: 12 } }}
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                              />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  border: "1px solid hsl(var(--border))",
                                  borderRadius: "8px",
                                }}
                              />
                              <Legend />
                              <Area
                                yAxisId="left"
                                type="monotone"
                                dataKey="accept"
                                stroke="hsl(var(--success))"
                                fill="url(#colorAccept)"
                                name="Stock Level"
                                strokeWidth={2}
                              />
                              <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="days"
                                stroke="hsl(var(--primary))"
                                name="Days of Inventory"
                                strokeWidth={2}
                                dot={{ fill: "hsl(var(--primary))" }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </TabsContent>

                {/* Impact Tab */}
                <TabsContent value="impact" className="p-6 space-y-6 m-0">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Source Location Impact */}
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Source Location ({decision.fromLocation})</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm text-muted-foreground">Current Stock</span>
                          <span className="font-bold text-lg">{impactData.sourceLocation.current} units</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg border border-success/20">
                          <span className="text-sm text-muted-foreground">After Transfer</span>
                          <span className="font-bold text-lg text-success">{impactData.sourceLocation.afterTransfer} units</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm text-muted-foreground">Optimal Level</span>
                          <span className="font-semibold">{impactData.sourceLocation.optimalLevel} units</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm text-muted-foreground">Reorder Point</span>
                          <span className="font-semibold">{impactData.sourceLocation.reorderPoint} units</span>
                        </div>
                        <div className="pt-3 border-t border-border">
                          <div className="flex items-start gap-2 text-sm">
                            <TrendingDown className="h-4 w-4 text-success mt-0.5" />
                            <p className="text-muted-foreground">
                              Reduces excess inventory by{" "}
                              <span className="font-semibold text-foreground">
                                {impactData.sourceLocation.current - impactData.sourceLocation.afterTransfer} units
                              </span>
                              , bringing stock closer to optimal levels.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Destination Location Impact */}
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Destination Location ({decision.toLocation})</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm text-muted-foreground">Current Stock</span>
                          <span className="font-bold text-lg">{impactData.destinationLocation.current} units</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <span className="text-sm text-muted-foreground">After Transfer</span>
                          <span className="font-bold text-lg text-primary">{impactData.destinationLocation.afterTransfer} units</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm text-muted-foreground">Optimal Level</span>
                          <span className="font-semibold">{impactData.destinationLocation.optimalLevel} units</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <span className="text-sm text-muted-foreground">Reorder Point</span>
                          <span className="font-semibold">{impactData.destinationLocation.reorderPoint} units</span>
                        </div>
                        <div className="pt-3 border-t border-border">
                          <div className="flex items-start gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-primary mt-0.5" />
                            <p className="text-muted-foreground">
                              Increases stock by{" "}
                              <span className="font-semibold text-foreground">
                                {impactData.destinationLocation.afterTransfer - impactData.destinationLocation.current} units
                              </span>
                              , preventing potential stockouts.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Service Level Impact */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Service Level Impact</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-success/10 rounded-lg border border-success/20">
                        <p className="text-2xl font-bold text-success mb-1">-85%</p>
                        <p className="text-xs text-muted-foreground">Stockout Risk Reduction</p>
                      </div>
                      <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                        <p className="text-2xl font-bold text-primary mb-1">+12%</p>
                        <p className="text-xs text-muted-foreground">Fill Rate Improvement</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg border border-border">
                        <p className="text-2xl font-bold text-foreground mb-1">22h</p>
                        <p className="text-xs text-muted-foreground">Lead Time</p>
                      </div>
                    </div>
                  </Card>

                  {/* Cost Analysis */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Cost-Benefit Analysis</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-success/10 rounded-lg">
                        <span className="text-sm">Inventory Savings</span>
                        <span className="font-bold text-success">+{decision.inventorySavings}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                        <span className="text-sm">Service Risk Reduction Value</span>
                        <span className="font-bold text-primary">+{decision.serviceRisk}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                        <span className="text-sm">Transportation Cost</span>
                        <span className="font-bold text-destructive">-$4,200</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-success/20 to-success/10 rounded-lg border-2 border-success/30">
                        <span className="font-semibold">Net Benefit</span>
                        <span className="font-bold text-xl text-success">+$88,659</span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                {/* Logistics Tab */}
                <TabsContent value="logistics" className="p-6 space-y-6 m-0">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Transportation Details */}
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Truck className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Transportation Details</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-border">
                          <span className="text-sm text-muted-foreground">Truck Type</span>
                          <Badge>Full Truck Load (FTL)</Badge>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-border">
                          <span className="text-sm text-muted-foreground">Truck Number</span>
                          <span className="font-semibold">{decision.truckNumber}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-border">
                          <span className="text-sm text-muted-foreground">Capacity Utilization</span>
                          <span className="font-semibold text-success">100%</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-border">
                          <span className="text-sm text-muted-foreground">Load (Pallets)</span>
                          <span className="font-semibold">{decision.pallets} pallets</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-border">
                          <span className="text-sm text-muted-foreground">Estimated Weight</span>
                          <span className="font-semibold">18,500 lbs</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Pallet Dimensions</span>
                          <span className="font-semibold">48" × 40"</span>
                        </div>
                      </div>
                    </Card>

                    {/* Route & Timing */}
                    <Card className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">Route & Timing</h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MapPin className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">Origin</p>
                            <p className="font-semibold">Location {decision.fromLocation}</p>
                            <p className="text-xs text-muted-foreground mt-1">Warehouse District, Zone A</p>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="h-8 flex items-center">
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <MapPin className="h-4 w-4 text-success" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">Destination</p>
                            <p className="font-semibold">Location {decision.toLocation}</p>
                            <p className="text-xs text-muted-foreground mt-1">Distribution Center, Zone B</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-border space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Distance</span>
                            <span className="font-semibold">245 miles</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Transit Time</span>
                            <span className="font-semibold">22 hours</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Pickup Date</span>
                            <span className="font-semibold">Oct 20, 2025</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Expected Arrival</span>
                            <span className="font-semibold text-success">Oct 21, 2025</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Carrier Information */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Carrier & Cost</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Carrier</p>
                        <p className="font-semibold">Swift Logistics Inc.</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Service Level</p>
                        <Badge variant="secondary">Standard</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Transportation Cost</p>
                        <p className="font-bold text-lg">$4,200</p>
                      </div>
                    </div>
                  </Card>

                  {/* Potential Risks */}
                  <Card className="p-6 border-amber-500/20 bg-amber-500/5">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <h3 className="font-semibold text-lg">Potential Bottlenecks & Risks</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Weather conditions may affect transit time by up to 4 hours
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Destination warehouse has limited dock capacity during peak hours (2-5 PM)
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-success mt-1.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong>Mitigation:</strong> Scheduled arrival for 9 AM to avoid congestion
                        </span>
                      </li>
                    </ul>
                  </Card>
                </TabsContent>

                {/* Alternative Summary Tab */}
                <TabsContent value="alternative-summary" className="p-6 space-y-6 m-0">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Evaluated Transfer Options</h3>
                    <p className="text-sm text-muted-foreground">
                      Comparison of different transfer scenarios based on cost, savings, and operational impact.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {alternativeOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={`p-6 transition-all ${
                          option.id === 1
                            ? "border-2 border-success bg-gradient-to-r from-success/10 to-success/5"
                            : "hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            {option.id === 1 && (
                              <Badge className="bg-success hover:bg-success">Recommended</Badge>
                            )}
                            <h4 className="font-semibold text-lg">{option.name}</h4>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-1">Overall Score</p>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    option.score >= 90
                                      ? "bg-success"
                                      : option.score >= 70
                                      ? "bg-primary"
                                      : "bg-amber-500"
                                  }`}
                                  style={{ width: `${option.score}%` }}
                                />
                              </div>
                              <span className="font-bold text-sm">{option.score}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Inventory Savings</p>
                            <p className="font-bold text-success">{option.savings}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Risk Reduction</p>
                            <p className="font-bold text-primary">{option.riskReduction}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Transport Cost</p>
                            <p className="font-bold text-destructive">{option.cost}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Lead Time</p>
                            <p className="font-semibold">{option.leadTime}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Recommendation Rationale */}
                  <Card className="p-6 bg-muted/30">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Why This Recommendation?
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>Optimal balance between cost savings and risk mitigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>100% truck capacity utilization minimizes per-unit transportation cost</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>22-hour lead time ensures timely delivery before projected shortage</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <span>Highest ROI with 95/100 overall score based on multi-criteria analysis</span>
                      </li>
                    </ul>
                  </Card>
                </TabsContent>

                {/* Alternative Analysis Tab */}
                <TabsContent value="alternative-analysis" className="p-6 space-y-6 m-0">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">In-Depth Alternative Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Sensitivity analysis and scenario planning for transfer decisions.
                    </p>
                  </div>

                  {/* Sensitivity Analysis */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Sensitivity Analysis</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Impact of varying key parameters on decision outcomes
                    </p>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Demand Fluctuation Impact</span>
                          <span className="text-xs text-muted-foreground">±20% variance</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="p-2 bg-destructive/10 rounded text-center">
                            <p className="font-semibold">Low Demand (-20%)</p>
                            <p className="text-muted-foreground mt-1">Score: 78</p>
                          </div>
                          <div className="p-2 bg-success/10 rounded text-center border-2 border-success">
                            <p className="font-semibold">Base Demand</p>
                            <p className="text-muted-foreground mt-1">Score: 95</p>
                          </div>
                          <div className="p-2 bg-primary/10 rounded text-center">
                            <p className="font-semibold">High Demand (+20%)</p>
                            <p className="text-muted-foreground mt-1">Score: 89</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Transportation Cost Impact</span>
                          <span className="text-xs text-muted-foreground">±15% variance</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="p-2 bg-success/10 rounded text-center">
                            <p className="font-semibold">Lower Cost (-15%)</p>
                            <p className="text-muted-foreground mt-1">ROI: +$92,859</p>
                          </div>
                          <div className="p-2 bg-muted/50 rounded text-center border-2 border-primary">
                            <p className="font-semibold">Base Cost</p>
                            <p className="text-muted-foreground mt-1">ROI: +$88,659</p>
                          </div>
                          <div className="p-2 bg-amber-500/10 rounded text-center">
                            <p className="font-semibold">Higher Cost (+15%)</p>
                            <p className="text-muted-foreground mt-1">ROI: +$84,459</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Lead Time Sensitivity</span>
                          <span className="text-xs text-muted-foreground">Impact on service risk</span>
                        </div>
                        <ResponsiveContainer width="100%" height={200}>
                          <BarChart
                            data={[
                              { scenario: "12h", risk: 15 },
                              { scenario: "22h", risk: 8 },
                              { scenario: "48h", risk: 25 },
                              { scenario: "72h", risk: 45 },
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="scenario" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                              }}
                            />
                            <Bar dataKey="risk" fill="hsl(var(--primary))" name="Service Risk %" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Card>

                  {/* Scenario Planning */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Scenario Planning</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Scenario A: Market Surge</h4>
                          <Badge variant="secondary">High Probability</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Demand increases by 30% in destination location due to seasonal surge
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Impact on Savings:</span>
                            <span className="font-semibold text-success">+$12,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Service Improvement:</span>
                            <span className="font-semibold text-success">+18%</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Scenario B: Supply Disruption</h4>
                          <Badge variant="secondary">Medium Probability</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Source location faces temporary supply constraint
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Impact on Savings:</span>
                            <span className="font-semibold text-amber-500">-$8,200</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Risk Level:</span>
                            <span className="font-semibold text-amber-500">Moderate</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">Scenario C: Transport Delay</h4>
                          <Badge variant="secondary">Low Probability</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Weather or logistics issues extend transit time to 36 hours
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Service Risk:</span>
                            <span className="font-semibold text-destructive">+$15,000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Mitigation:</span>
                            <span className="font-semibold text-primary">Buffer stock</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Multi-Criteria Decision Matrix */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Multi-Criteria Decision Matrix</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-2 font-medium text-muted-foreground">Criteria</th>
                            <th className="text-center p-2 font-medium text-muted-foreground">Weight</th>
                            <th className="text-center p-2 font-medium text-muted-foreground">Option 1</th>
                            <th className="text-center p-2 font-medium text-muted-foreground">Option 2</th>
                            <th className="text-center p-2 font-medium text-muted-foreground">Option 3</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="p-2">Cost Savings</td>
                            <td className="text-center p-2">30%</td>
                            <td className="text-center p-2 font-semibold">95</td>
                            <td className="text-center p-2">72</td>
                            <td className="text-center p-2">68</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-2">Risk Mitigation</td>
                            <td className="text-center p-2">35%</td>
                            <td className="text-center p-2 font-semibold">98</td>
                            <td className="text-center p-2">65</td>
                            <td className="text-center p-2">58</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-2">Speed to Execute</td>
                            <td className="text-center p-2">20%</td>
                            <td className="text-center p-2 font-semibold">90</td>
                            <td className="text-center p-2">90</td>
                            <td className="text-center p-2">45</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="p-2">Operational Simplicity</td>
                            <td className="text-center p-2">15%</td>
                            <td className="text-center p-2 font-semibold">92</td>
                            <td className="text-center p-2">88</td>
                            <td className="text-center p-2">82</td>
                          </tr>
                          <tr className="bg-muted/30">
                            <td className="p-2 font-semibold">Weighted Score</td>
                            <td className="text-center p-2">100%</td>
                            <td className="text-center p-2 font-bold text-success">95</td>
                            <td className="text-center p-2 font-bold">72</td>
                            <td className="text-center p-2 font-bold">62</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </TabsContent>

                {/* Learning Tab */}
                <TabsContent value="learning" className="p-6 space-y-6 m-0">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Decision Intelligence Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn from historical performance and improve future decision-making.
                    </p>
                  </div>

                  {/* Historical Performance */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Historical Decision Performance</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Track record of AI recommendations accuracy and realized savings
                    </p>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={historicalPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis
                          yAxisId="left"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          label={{ value: "Accuracy %", angle: -90, position: "insideLeft" }}
                        />
                        <YAxis
                          yAxisId="right"
                          orientation="right"
                          stroke="hsl(var(--muted-foreground))"
                          fontSize={12}
                          label={{ value: "Savings $", angle: 90, position: "insideRight" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="accuracy" fill="hsl(var(--primary))" name="Prediction Accuracy %" />
                        <Bar yAxisId="right" dataKey="savings" fill="hsl(var(--success))" name="Realized Savings $" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Key Insights */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Key Learnings</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="h-4 w-4 text-success" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Optimal Transfer Window</h4>
                            <p className="text-sm text-muted-foreground">
                              Transfers executed 4-5 days before projected shortage yield 23% higher savings on average compared to last-minute transfers.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Truck className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">FTL Utilization Impact</h4>
                            <p className="text-sm text-muted-foreground">
                              Full truck load transfers (100% capacity) demonstrate 34% better ROI than partial loads, with reduced per-unit transportation costs.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 border border-border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="h-4 w-4 text-foreground" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">Demand Pattern Recognition</h4>
                            <p className="text-sm text-muted-foreground">
                              Transfers between locations L017 and L002 show consistent success rates (94% acceptance) due to predictable demand patterns in these zones.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Recommendations for Future */}
                  <Card className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Recommendations for Future Strategies</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2 text-sm p-3 bg-muted/30 rounded-lg">
                        <span className="font-semibold text-primary min-w-[20px]">1.</span>
                        <p className="text-muted-foreground">
                          <strong className="text-foreground">Proactive Monitoring:</strong> Implement automated alerts for locations showing early signs of imbalance to enable preventive transfers before critical shortage levels.
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-sm p-3 bg-muted/30 rounded-lg">
                        <span className="font-semibold text-primary min-w-[20px]">2.</span>
                        <p className="text-muted-foreground">
                          <strong className="text-foreground">Carrier Partnerships:</strong> Establish preferred carrier agreements for high-frequency routes (e.g., L017-L002) to secure better rates and guaranteed capacity.
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-sm p-3 bg-muted/30 rounded-lg">
                        <span className="font-semibold text-primary min-w-[20px]">3.</span>
                        <p className="text-muted-foreground">
                          <strong className="text-foreground">Buffer Stock Optimization:</strong> Adjust safety stock levels at destination locations to account for 22-hour transfer lead times, reducing emergency transfer needs by an estimated 15%.
                        </p>
                      </div>
                      <div className="flex items-start gap-2 text-sm p-3 bg-muted/30 rounded-lg">
                        <span className="font-semibold text-primary min-w-[20px]">4.</span>
                        <p className="text-muted-foreground">
                          <strong className="text-foreground">Seasonal Adjustments:</strong> Factor in seasonal demand variations when planning transfers to maximize savings during peak periods.
                        </p>
                      </div>
                    </div>
                  </Card>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4 text-center">
                      <p className="text-3xl font-bold text-success mb-1">94%</p>
                      <p className="text-xs text-muted-foreground">Average Prediction Accuracy</p>
                      <p className="text-xs text-muted-foreground mt-2">(Last 6 months)</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <p className="text-3xl font-bold text-primary mb-1">$192K</p>
                      <p className="text-xs text-muted-foreground">Total Realized Savings</p>
                      <p className="text-xs text-muted-foreground mt-2">(Last 6 months)</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <p className="text-3xl font-bold text-foreground mb-1">89%</p>
                      <p className="text-xs text-muted-foreground">Decision Acceptance Rate</p>
                      <p className="text-xs text-muted-foreground mt-2">(User adoption)</p>
                    </Card>
                  </div>
                </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
