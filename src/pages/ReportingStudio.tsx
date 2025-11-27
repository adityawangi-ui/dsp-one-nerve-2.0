import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp, Package, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useToast } from "@/hooks/use-toast";

const mbrData = [
  { metric: "Service Level", actual: 89.4, target: 90.0, variance: -0.6 },
  { metric: "Inventory DOS", actual: 18.3, target: 21.0, variance: -2.7 },
  { metric: "Forecast Accuracy", actual: 86.2, target: 88.0, variance: -1.8 },
  { metric: "OTIF", actual: 94.1, target: 93.0, variance: 1.1 },
];

const witlopData = [
  { week: "W1", current: 2.8, target: 2.5 },
  { week: "W2", current: 2.7, target: 2.5 },
  { week: "W3", current: 2.9, target: 2.5 },
  { week: "W4", current: 2.5, target: 2.5 },
  { week: "W5", current: 2.6, target: 2.5 },
  { week: "W6", current: 2.4, target: 2.5 },
  { week: "W7", current: 2.3, target: 2.5 },
  { week: "W8", current: 2.5, target: 2.5 },
  { week: "W9", current: 2.7, target: 2.5 },
  { week: "W10", current: 2.6, target: 2.5 },
  { week: "W11", current: 2.4, target: 2.5 },
  { week: "W12", current: 2.5, target: 2.5 },
];

const inventoryNormsData = [
  { category: "Raw Material", achievement: 92, target: 95 },
  { category: "WIP", achievement: 88, target: 90 },
  { category: "Finished Goods", achievement: 85, target: 88 },
  { category: "MRO", achievement: 94, target: 92 },
];

export default function ReportingStudio() {
  const { toast } = useToast();

  const activeAgents = [
    "Reports Generator",
    "RCA Builder",
    "Document Extractor/Reader"
  ];

  const handleDownload = (reportType: string) => {
    toast({
      title: "Report Downloaded",
      description: `${reportType} has been generated and saved`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Reporting Studio</h1>
            <p className="text-muted-foreground mt-2">Pre-built reports and dashboards</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Calendar className="h-3 w-3" />
              Last updated: Today, 14:32
            </Badge>
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

        {/* Quick Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 cursor-pointer hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
              <FileText className="h-6 w-6 text-primary" />
              <Button size="sm" variant="outline" onClick={() => handleDownload("MBR Pack")}>
                <Download className="h-3 w-3" />
              </Button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">MBR Pack</h3>
            <p className="text-xs text-muted-foreground">Monthly Business Review</p>
          </Card>

          <Card className="p-6 cursor-pointer hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-6 w-6 text-success" />
              <Button size="sm" variant="outline" onClick={() => handleDownload("ARM Dashboard")}>
                <Download className="h-3 w-3" />
              </Button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">ARM Dashboard</h3>
            <p className="text-xs text-muted-foreground">Availability Risk Metrics</p>
          </Card>

          <Card className="p-6 cursor-pointer hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
              <Package className="h-6 w-6 text-warning" />
              <Button size="sm" variant="outline" onClick={() => handleDownload("DRM Report")}>
                <Download className="h-3 w-3" />
              </Button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">DRM Report</h3>
            <p className="text-xs text-muted-foreground">Demand Review Meeting</p>
          </Card>

          <Card className="p-6 cursor-pointer hover:scale-[1.02] transition-all">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <Button size="sm" variant="outline" onClick={() => handleDownload("DSR Report")}>
                <Download className="h-3 w-3" />
              </Button>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">DSR Report</h3>
            <p className="text-xs text-muted-foreground">Daily Service Review</p>
          </Card>
        </div>

        {/* MBR Pack Preview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">MBR Pack - Key Metrics</h3>
              <p className="text-sm text-muted-foreground">Month: January 2025</p>
            </div>
            <Button onClick={() => handleDownload("MBR Pack")}>
              <Download className="h-4 w-4 mr-2" />
              Export Full Report
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mbrData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="actual" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Actual" />
              <Bar dataKey="target" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {mbrData.map((item) => (
              <div key={item.metric} className="p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-xs text-muted-foreground mb-1">{item.metric}</p>
                <p className="text-lg font-bold text-foreground">{item.actual}</p>
                <p className={`text-xs ${item.variance >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {item.variance >= 0 ? '+' : ''}{item.variance} vs target
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* WITLOP 12-Week View */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">WITLOP 12-Week View</h3>
              <p className="text-sm text-muted-foreground">Weeks Inventory Trends On Production</p>
            </div>
            <Button onClick={() => handleDownload("WITLOP Report")} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={witlopData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[2, 3.5]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Line type="monotone" dataKey="current" stroke="hsl(var(--primary))" strokeWidth={3} name="Current" />
              <Line type="monotone" dataKey="target" stroke="hsl(var(--success))" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Inventory Norms Achievement */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Inventory Norms Achievement</h3>
              <p className="text-sm text-muted-foreground">Target vs actual across inventory categories</p>
            </div>
            <Button onClick={() => handleDownload("Inventory Norms")} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={inventoryNormsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
              <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" width={120} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Bar dataKey="achievement" fill="hsl(var(--primary))" radius={[0, 8, 8, 0]} name="Achievement %" />
              <Bar dataKey="target" fill="hsl(var(--success))" radius={[0, 8, 8, 0]} name="Target %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">Achievement Gap Analysis</h4>
                <p className="text-xs text-muted-foreground">
                  Finished Goods category shows 3% gap to target. Root cause: demand forecast bias in APAC region. 
                  Target Agent recommends safety stock adjustment for Q2.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Report Schedule */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start gap-4">
            <Calendar className="h-6 w-6 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-3">Automated Report Schedule</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 rounded bg-card">
                  <span className="text-foreground">Daily Service Review (DSR)</span>
                  <Badge variant="secondary">Every day, 8:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-card">
                  <span className="text-foreground">Weekly ARM Dashboard</span>
                  <Badge variant="secondary">Every Monday, 9:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-card">
                  <span className="text-foreground">Monthly Business Review (MBR)</span>
                  <Badge variant="secondary">1st of month, 10:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-card">
                  <span className="text-foreground">Demand Review Meeting (DRM)</span>
                  <Badge variant="secondary">Every Wednesday, 2:00 PM</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
