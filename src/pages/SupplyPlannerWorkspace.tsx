import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FilterBar } from "@/components/decision-intelligence/FilterBar";
import { DecisionTable, Decision } from "@/components/decision-intelligence/DecisionTable";
import { DecisionDetailDialog } from "@/components/decision-intelligence/DecisionDetailDialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Package, 
  RefreshCw, 
  Shield, 
  Clock,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Database,
  CheckCircle,
  Settings,
  ExternalLink,
  Activity,
  Bell,
  User,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Chart data
const forecastData = [
  { week: "W40", forecast: 2400, actual: 2380 },
  { week: "W41", forecast: 2210, actual: 2300 },
  { week: "W42", forecast: 2290, actual: 2200 },
  { week: "W43", forecast: 2000, actual: 2100 },
  { week: "W44", forecast: 2181, actual: 2150 },
  { week: "W45", forecast: 2500, actual: 2400 },
];

const turnoverData = [
  { region: "North", current: 3.8, target: 4.5 },
  { region: "South", current: 4.6, target: 4.5 },
  { region: "East", current: 4.2, target: 4.5 },
  { region: "West", current: 5.1, target: 4.5 },
];

const shortageData = [
  { week: "W38", shortages: 12 },
  { week: "W39", shortages: 10 },
  { week: "W40", shortages: 8 },
  { week: "W41", shortages: 11 },
  { week: "W42", shortages: 14 },
  { week: "W43", shortages: 16 },
  { week: "W44", shortages: 17 },
  { week: "W45", shortages: 18 },
];

const adherenceData = [
  { plant: "Plant A", adherence: 95 },
  { plant: "Plant B", adherence: 78 },
  { plant: "Plant C", adherence: 92 },
  { plant: "Plant D", adherence: 85 },
];

// Mock decisions data
const mockDecisions: Decision[] = [
  {
    id: "1",
    recommendation: "Transfer 31 pallets by October 23rd",
    type: "Preventive Transfer",
    fromLocation: "L017",
    toLocation: "L002",
    inventorySavings: "$31,580",
    serviceRisk: "$60,002",
    truckNumber: "T4",
    pallets: 31,
    calendarDay: "23-Jan-2026",
  },
  {
    id: "2",
    recommendation: "Transfer 33 pallets by October 25th",
    type: "Preventive Transfer",
    fromLocation: "L017",
    toLocation: "L002",
    inventorySavings: "$33,164",
    serviceRisk: "$59,695",
    truckNumber: "T1",
    pallets: 33,
    calendarDay: "25-Jan-2026",
  },
  {
    id: "3",
    recommendation: "Transfer 53 pallets by October 28th",
    type: "Preventive Transfer",
    fromLocation: "L005",
    toLocation: "L020",
    inventorySavings: "$31,709",
    serviceRisk: "$57,016",
    truckNumber: "T9",
    pallets: 53,
    calendarDay: "28-Jan-2026",
  },
  {
    id: "4",
    recommendation: "Transfer 33 pallets by October 30th",
    type: "Preventive Transfer",
    fromLocation: "L005",
    toLocation: "L020",
    inventorySavings: "$32,837",
    serviceRisk: "$58,207",
    truckNumber: "T6",
    pallets: 33,
    calendarDay: "30-Jan-2026",
  },
  {
    id: "5",
    recommendation: "Transfer 33 pallets by November 2nd",
    type: "Preventive Transfer",
    fromLocation: "L010",
    toLocation: "L004",
    inventorySavings: "$30,785",
    serviceRisk: "$60,000",
    truckNumber: "T5",
    pallets: 33,
    calendarDay: "02-Feb-2026",
  },
  {
    id: "6",
    recommendation: "Transfer 53 pallets by November 5th",
    type: "Preventive Transfer",
    fromLocation: "L018",
    toLocation: "L005",
    inventorySavings: "$32,062",
    serviceRisk: "$0",
    truckNumber: "T2",
    pallets: 53,
    calendarDay: "05-Feb-2026",
  },
  {
    id: "7",
    recommendation: "Transfer 33 pallets by November 8th",
    type: "Preventive Transfer",
    fromLocation: "L015",
    toLocation: "L009",
    inventorySavings: "$30,223",
    serviceRisk: "$57,424",
    truckNumber: "T9",
    pallets: 33,
    calendarDay: "08-Feb-2026",
  },
  {
    id: "8",
    recommendation: "Transfer 53 pallets by November 10th",
    type: "Preventive Transfer",
    fromLocation: "L015",
    toLocation: "L009",
    inventorySavings: "$32,268",
    serviceRisk: "$61,309",
    truckNumber: "T2",
    pallets: 53,
    calendarDay: "10-Feb-2026",
  },
];

export default function SupplyPlannerWorkspace() {
  const [showInventoryDetail, setShowInventoryDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleDecisionClick = (decision: Decision) => {
    setSelectedDecision(decision);
    setDialogOpen(true);
  };

  const handleAccept = (decisionId: string) => {
    toast({
      title: "Decision Accepted",
      description: "The transfer recommendation has been accepted and scheduled.",
    });
  };

  const handleDismiss = (decisionId: string) => {
    toast({
      title: "Decision Dismissed",
      description: "The transfer recommendation has been dismissed.",
      variant: "destructive",
    });
  };

  const handleModify = (decisionId: string) => {
    toast({
      title: "Modify Decision",
      description: "Opening decision editor...",
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setLocation("all");
    setType("all");
  };

  const filteredDecisions = mockDecisions.filter((decision) => {
    const matchesSearch =
      searchQuery === "" ||
      decision.recommendation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      location === "all" ||
      decision.fromLocation === location ||
      decision.toLocation === location;
    const matchesType = type === "all" || decision.type === type;

    return matchesSearch && matchesLocation && matchesType;
  });

  const upcomingDecisions = [
    { id: 1, title: "Transfer 31 pallets from L017 to L002", dueDate: "23-Jan-2026", priority: "high" },
    { id: 2, title: "Transfer 33 pallets from L017 to L002", dueDate: "25-Jan-2026", priority: "medium" },
    { id: 3, title: "Transfer 53 pallets from L005 to L020", dueDate: "28-Jan-2026", priority: "high" },
  ];

  if (showInventoryDetail) {
    return (
      <MainLayout>
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-surface/30 to-muted/20 p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Personalized Greeting Banner */}
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 shadow-[var(--shadow-glow)] animate-fade-in overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary backdrop-blur-sm">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Hello, Aditya!</h2>
                        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground">Supply Planner</p>
                      <p className="text-sm text-muted-foreground mt-1">Welcome back to your Inventory Decision Intelligence workspace</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowInventoryDetail(false)}
                    className="hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Workspace
                  </Button>
                </div>
              </div>
            </Card>

            {/* Page Title */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
                Inventory Transfer Decisions
              </h1>
              <p className="text-sm text-muted-foreground">
                Home &gt; Supply Planner Workspace &gt; Inventory Balancing
              </p>
            </div>

            {/* Filters */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              location={location}
              onLocationChange={setLocation}
              type={type}
              onTypeChange={setType}
              onClearFilters={handleClearFilters}
              resultCount={filteredDecisions.length}
              totalCount={mockDecisions.length}
            />

            {/* Decision Table */}
            <DecisionTable
              decisions={filteredDecisions}
              onDecisionClick={handleDecisionClick}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
              onModify={handleModify}
            />

            {/* Decision Detail Dialog */}
            <DecisionDetailDialog
              decision={selectedDecision}
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
              onModify={handleModify}
            />

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page 1 of 1
              </div>
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-surface/30 to-muted/20 p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="animate-fade-in">
            <Card className="bg-gradient-to-r from-primary/5 via-muted/30 to-muted/50 border-primary/10 mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-1">
                      Hello Aditya!
                    </h1>
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                      Supply Planning View
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Manage supply balance, stock levels, and production readiness across your network.
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="px-3 py-1.5 text-xs bg-card/80 backdrop-blur-sm border-primary/20">
                      <Calendar className="h-3 w-3 mr-1.5" />
                      Data Last Synced: 15 mins ago
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1.5 text-xs bg-card/80 backdrop-blur-sm border-destructive/20 text-destructive">
                      <Bell className="h-3 w-3 mr-1.5" />
                      Active Alerts: 3
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1.5 text-xs bg-card/80 backdrop-blur-sm border-primary/20">
                      <Activity className="h-3 w-3 mr-1.5" />
                      Current Week: W45 FY25
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overview Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              
              {/* Supply-Demand Balance */}
              <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Supply–Demand Balance</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">93</span>
                      <span className="text-lg text-muted-foreground">% matched</span>
                    </div>
                    <p className="text-xs text-muted-foreground">7 SKUs under review for shortfall</p>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Coverage */}
              <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Inventory Coverage</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">26</span>
                      <span className="text-lg text-muted-foreground">days avg</span>
                    </div>
                    <p className="text-xs text-muted-foreground">4 materials below safety stock</p>
                  </div>
                </CardContent>
              </Card>

              {/* Production Plan Adherence */}
              <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Production Plan Adherence</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">88</span>
                      <span className="text-lg text-muted-foreground">%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">2 plants missed schedule last week</p>
                  </div>
                </CardContent>
              </Card>

              {/* Open Exceptions */}
              <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground">Open Exceptions</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-foreground">5</span>
                      <span className="text-lg text-muted-foreground">active</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Pending replans or approvals</p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Modules Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Inventory Balancing */}
              <Card 
                onClick={() => setShowInventoryDetail(true)}
                className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 border border-border/50 cursor-pointer backdrop-blur-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Package className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Inventory Balancing</h3>
                        <span className="text-lg">✅</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Optimize inventory distribution across locations
                      </p>
                      <div className="text-xs text-primary font-medium">
                        12 SKUs pending balance review
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Supply Rebalancing */}
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 border border-border/50 cursor-pointer backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <RefreshCw className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Supply Rebalancing</h3>
                        <span className="text-lg">⚠️</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Real-time supply and demand optimization
                      </p>
                      <div className="text-xs text-primary font-medium">
                        8 supply adjustments pending review
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Dynamic Safety Stock */}
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 border border-border/50 cursor-pointer backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Dynamic Safety Stock</h3>
                        <span className="text-lg">✅</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Adaptive safety stock calculations and alerts
                      </p>
                      <div className="text-xs text-primary font-medium">
                        3 safety stock rules updated this week
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Aging Management */}
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 border border-border/50 cursor-pointer backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Inventory Aging Management</h3>
                        <span className="text-lg">⛔</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Track and optimize inventory aging patterns
                      </p>
                      <div className="text-xs text-primary font-medium">
                        23 items exceeding 90-day threshold
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Analytics Snapshot Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Analytics Snapshot</h2>
              <Link to="/analytics">
                <Button variant="outline" size="sm" className="gap-2 hover:bg-primary/10 transition-all">
                  View Full Analytics
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Forecast vs Actual Trend */}
              <Card className="bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Forecast vs Actual Trend
                    </span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                      Within Target
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">96%</span>
                      <span className="text-sm text-muted-foreground">accuracy</span>
                    </div>
                    <ResponsiveContainer width="100%" height={120}>
                      <LineChart data={forecastData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                        <Line type="monotone" dataKey="forecast" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="actual" stroke="hsl(var(--success))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Turnover by Region */}
              <Card className="bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-primary" />
                      Inventory Turnover by Region
                    </span>
                    <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 text-xs">
                      Needs Attention
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">4.2×</span>
                      <span className="text-sm text-muted-foreground">average turns</span>
                    </div>
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={turnoverData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="region" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                        <Bar dataKey="current" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="target" fill="hsl(var(--muted))" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Shortage Alert Trend */}
              <Card className="bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      Shortage Alert Trend
                    </span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                      Rising
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">18</span>
                      <span className="text-sm text-muted-foreground">this week</span>
                    </div>
                    <ResponsiveContainer width="100%" height={120}>
                      <AreaChart data={shortageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                        <Area type="monotone" dataKey="shortages" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Production Plan Adherence */}
              <Card className="bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Production Plan Adherence
                    </span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                      On Track
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">87%</span>
                      <span className="text-sm text-muted-foreground">overall</span>
                    </div>
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={adherenceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                        <XAxis dataKey="plant" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                        <Bar dataKey="adherence" fill="hsl(var(--success))" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Upcoming Decisions Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Upcoming Decisions</h2>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {upcomingDecisions.map((decision) => (
                    <div key={decision.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${decision.priority === 'high' ? 'bg-destructive' : 'bg-warning'}`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{decision.title}</p>
                          <p className="text-xs text-muted-foreground">Due: {decision.dueDate}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
