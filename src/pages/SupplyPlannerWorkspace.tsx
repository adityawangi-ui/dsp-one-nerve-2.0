import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Bell
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

export default function SupplyPlannerWorkspace() {
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
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-1">
                      Hello Aditya!
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                      Supply Planning View
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground">
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
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 border border-border/50 cursor-pointer backdrop-blur-sm">
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
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="week" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Line type="monotone" dataKey="forecast" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))' }} />
                        <Line type="monotone" dataKey="actual" stroke="hsl(var(--success))" strokeWidth={2} dot={{ fill: 'hsl(var(--success))' }} />
                      </LineChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-muted-foreground">Demand tracking closely with forecast</p>
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
                      Attention
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">4.2x</span>
                      <span className="text-sm text-muted-foreground">avg turns</span>
                    </div>
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={turnoverData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="region" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Bar dataKey="current" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="target" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-muted-foreground">North region below target turnover</p>
                  </div>
                </CardContent>
              </Card>

              {/* Material Shortage Trend */}
              <Card className="bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Material Shortage Trend
                    </span>
                    <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                      Off-Target
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">18</span>
                      <span className="text-sm text-muted-foreground">shortages</span>
                    </div>
                    <ResponsiveContainer width="100%" height={120}>
                      <AreaChart data={shortageData}>
                        <defs>
                          <linearGradient id="shortageGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="week" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Area type="monotone" dataKey="shortages" stroke="hsl(var(--destructive))" strokeWidth={2} fillOpacity={1} fill="url(#shortageGradient)" />
                      </AreaChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-muted-foreground">Increasing trend over last 3 weeks</p>
                  </div>
                </CardContent>
              </Card>

              {/* Production Adherence */}
              <Card className="bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      Production Adherence
                    </span>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                      Within Target
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">88%</span>
                      <span className="text-sm text-muted-foreground">adherence</span>
                    </div>
                    <ResponsiveContainer width="100%" height={120}>
                      <BarChart data={adherenceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="plant" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                        />
                        <Bar dataKey="adherence" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-muted-foreground">Plant A & C performing well, Plant B needs attention</p>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Data & Configuration Summary Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Data & Configuration Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <Link to="/data-config">
                <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-card to-surface/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-success/10 text-success">
                        <Database className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-foreground mb-1">Data Health</h3>
                        <p className="text-xs text-muted-foreground">Last sync: 2 mins ago</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-success">Healthy</span>
                      <span className="text-xs text-muted-foreground">98.7% quality</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/data-config">
                <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-card to-surface/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Settings className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-foreground mb-1">Active Planning Parameters</h3>
                        <p className="text-xs text-muted-foreground">Last updated: Today</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">47 parameters</span>
                      <span className="text-xs text-muted-foreground">2 pending review</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/data-config">
                <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-card to-surface/50">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-foreground mb-1">Master Data Status</h3>
                        <p className="text-xs text-muted-foreground">Last validation: 1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">Valid</span>
                      <span className="text-xs text-muted-foreground">1,247 SKUs</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
