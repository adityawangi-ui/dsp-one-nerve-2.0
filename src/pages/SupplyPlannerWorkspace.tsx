import { MainLayout } from "@/components/layout/MainLayout";
import { ModuleCard } from "@/components/decision-intelligence/ModuleCard";
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

export default function SupplyPlannerWorkspace() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-surface/30 to-muted/20 p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="animate-fade-in">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
                  Supply Planner Workspace
                </h1>
                <p className="text-base md:text-lg text-muted-foreground">
                  Manage supply balance, stock levels, and production readiness across your network.
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="px-3 py-1.5 text-xs bg-card/80 backdrop-blur-sm border-primary/20">
                  <Calendar className="h-3 w-3 mr-1.5" />
                  Data Last Synced: 2 mins ago
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5 text-xs bg-card/80 backdrop-blur-sm border-warning/20">
                  <Bell className="h-3 w-3 mr-1.5" />
                  Active Alerts: 5
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5 text-xs bg-card/80 backdrop-blur-sm border-primary/20">
                  <Activity className="h-3 w-3 mr-1.5" />
                  Current Week: W48
                </Badge>
              </div>
            </div>
          </div>

          {/* Today's Overview Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Today's Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              
              {/* Supply-Demand Balance */}
              <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Supply-Demand Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-foreground">87%</span>
                    <span className="text-sm text-muted-foreground">matched</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-destructive">
                    <TrendingDown className="h-3 w-3" />
                    <span>23 shortfalls detected</span>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Coverage */}
              <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Inventory Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-foreground">34</span>
                    <span className="text-sm text-muted-foreground">days</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-warning">
                    <AlertTriangle className="h-3 w-3" />
                    <span>12 SKUs below safety stock</span>
                  </div>
                </CardContent>
              </Card>

              {/* Production Plan Adherence */}
              <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Production Plan Adherence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-foreground">92%</span>
                    <span className="text-sm text-muted-foreground">adherence</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-success">
                    <TrendingUp className="h-3 w-3" />
                    <span>+3% vs last week</span>
                  </div>
                </CardContent>
              </Card>

              {/* Open Exceptions */}
              <Card className="transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Open Exceptions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-foreground">18</span>
                    <span className="text-sm text-muted-foreground">active</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>5 require urgent action</span>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Modules Section */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModuleCard
                title="Inventory Balancing"
                subtitle="Optimize inventory distribution across locations"
                status="active"
                icon={Package}
                onClick={() => window.location.href = '/skills'}
                statusCount={12}
              />
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface border border-border/50 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <RefreshCw className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Supply Rebalancing</h3>
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          8 alerts
                        </Badge>
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
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface border border-border/50 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Shield className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Dynamic Safety Stock</h3>
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Adaptive safety stock calculations and alerts
                      </p>
                      <div className="text-xs text-primary font-medium">
                        15 SKUs require safety stock adjustment
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02] bg-gradient-to-br from-card to-surface border border-border/50 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Inventory Aging Management</h3>
                        <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          6 alerts
                        </Badge>
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
                <Button variant="outline" size="sm" className="gap-2">
                  View Full Analytics
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-card to-surface">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    Forecast vs Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                    Chart visualization placeholder
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-card to-surface">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-primary" />
                    Inventory Turns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                    Chart visualization placeholder
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-card to-surface">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    Shortage Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                    Chart visualization placeholder
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-card to-surface">
                <CardHeader>
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Supply Reliability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-40 flex items-center justify-center text-muted-foreground text-sm">
                    Chart visualization placeholder
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
