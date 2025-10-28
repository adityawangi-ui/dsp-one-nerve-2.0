import { MainLayout } from "@/components/layout/MainLayout";
import { KPIMetricCard } from "@/components/decision-intelligence/KPIMetricCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  Calendar,
  AlertTriangle,
  Package,
  RefreshCw,
  Download,
} from "lucide-react";

export default function Analytics() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              Inventory Analytics & Insights
            </h1>
            <p className="text-muted-foreground">
              Home &gt; Decision Intelligence &gt; Analytics
            </p>
          </div>

          {/* Top Control Bar */}
          <div className="flex flex-wrap gap-4 mb-6 items-center justify-between bg-card rounded-2xl border border-border shadow-[var(--shadow-card)] p-4">
            <div className="flex gap-3">
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 90 days</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="l002">L002</SelectItem>
                  <SelectItem value="l005">L005</SelectItem>
                  <SelectItem value="l017">L017</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Product Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="petfood">Pet Food</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* KPI Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6 animate-fade-in">
            <KPIMetricCard
              title="Total Inventory Value"
              value="$45.2M"
              change="↑ 3.2%"
              trend="up"
              icon={DollarSign}
            />
            <KPIMetricCard
              title="Average Coverage Days"
              value="42 days"
              change="↓ 2 days"
              trend="down"
              icon={Calendar}
            />
            <KPIMetricCard
              title="Stockout Incidents"
              value="12"
              change="↓ 40%"
              trend="up"
              icon={AlertTriangle}
            />
            <KPIMetricCard
              title="Excess Inventory"
              value="$8.3M"
              change="↓ 15%"
              trend="up"
              icon={Package}
            />
            <KPIMetricCard
              title="Inventory Turns"
              value="8.5x"
              change="↑ 0.5x"
              trend="up"
              icon={RefreshCw}
            />
          </div>

          {/* Charts Section */}
          <div className="space-y-6">
            {/* Inventory Trends */}
            <Card className="p-6 border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Inventory Value Over Time</h3>
                <div className="flex gap-2 bg-muted p-1 rounded-lg">
                  <Button variant="ghost" size="sm" className="bg-background h-8 text-xs">
                    Value
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Units
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Coverage
                  </Button>
                </div>
              </div>
              <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground text-sm">Line chart visualization</p>
              </div>
            </Card>

            {/* ABC Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 border border-border shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-semibold text-foreground mb-4">ABC Classification</h3>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground text-sm">Pie chart visualization</p>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span>A Items - 80% value</span>
                    </div>
                    <span className="font-semibold">20% SKUs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning"></div>
                      <span>B Items - 15% value</span>
                    </div>
                    <span className="font-semibold">30% SKUs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success"></div>
                      <span>C Items - 5% value</span>
                    </div>
                    <span className="font-semibold">50% SKUs</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border border-border shadow-[var(--shadow-card)]">
                <h3 className="text-lg font-semibold text-foreground mb-4">Turnover Analysis</h3>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground text-sm">Horizontal bar chart</p>
                </div>
              </Card>
            </div>

            {/* Location Performance */}
            <Card className="p-6 border border-border shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Performance by Location</h3>
                <Select defaultValue="coverage">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coverage">Coverage Days</SelectItem>
                    <SelectItem value="service">Service Levels</SelectItem>
                    <SelectItem value="accuracy">Inventory Accuracy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
                <p className="text-muted-foreground text-sm">
                  Location performance bar chart visualization
                </p>
              </div>
            </Card>

            {/* Stockout Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <Card className="p-6 border border-border shadow-[var(--shadow-card)] lg:col-span-3">
                <h3 className="text-lg font-semibold text-foreground mb-4">Stockout Trend</h3>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground text-sm">Area chart visualization</p>
                </div>
              </Card>

              <Card className="p-6 border border-border shadow-[var(--shadow-card)] lg:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">Root Causes</h3>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <p className="text-muted-foreground text-sm">Donut chart</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
