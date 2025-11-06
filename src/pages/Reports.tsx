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
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock data for charts
const inventoryTrendData = [
  { week: "Week 1", value: 42.5, target: 45, upper: 50, lower: 40 },
  { week: "Week 2", value: 43.8, target: 45, upper: 50, lower: 40 },
  { week: "Week 3", value: 45.2, target: 45, upper: 50, lower: 40 },
  { week: "Week 4", value: 44.1, target: 45, upper: 50, lower: 40 },
  { week: "Week 5", value: 46.3, target: 45, upper: 50, lower: 40 },
  { week: "Week 6", value: 47.2, target: 45, upper: 50, lower: 40 },
  { week: "Week 7", value: 45.8, target: 45, upper: 50, lower: 40 },
  { week: "Week 8", value: 44.5, target: 45, upper: 50, lower: 40 },
  { week: "Week 9", value: 45.2, target: 45, upper: 50, lower: 40 },
  { week: "Week 10", value: 46.8, target: 45, upper: 50, lower: 40 },
  { week: "Week 11", value: 45.9, target: 45, upper: 50, lower: 40 },
  { week: "Week 12", value: 45.2, target: 45, upper: 50, lower: 40 },
];

const abcData = [
  { name: "A Items", value: 80, skus: 20 },
  { name: "B Items", value: 15, skus: 30 },
  { name: "C Items", value: 5, skus: 50 },
];

const turnoverData = [
  { category: "A Items", turnover: 12.5 },
  { category: "B Items", turnover: 8.3 },
  { category: "C Items", turnover: 4.2 },
];

const locationData = [
  { location: "L002", coverage: 52 },
  { location: "L004", coverage: 45 },
  { location: "L005", coverage: 38 },
  { location: "L009", coverage: 42 },
  { location: "L015", coverage: 35 },
  { location: "L017", coverage: 48 },
  { location: "L018", coverage: 41 },
  { location: "L020", coverage: 39 },
];

const stockoutTrendData = [
  { week: "W1", petFood: 2, beverages: 1, snacks: 1, household: 0 },
  { week: "W2", petFood: 3, beverages: 2, snacks: 0, household: 1 },
  { week: "W3", petFood: 1, beverages: 2, snacks: 2, household: 1 },
  { week: "W4", petFood: 2, beverages: 1, snacks: 1, household: 0 },
  { week: "W5", petFood: 4, beverages: 2, snacks: 1, household: 1 },
  { week: "W6", petFood: 2, beverages: 1, snacks: 0, household: 1 },
  { week: "W7", petFood: 1, beverages: 3, snacks: 1, household: 0 },
  { week: "W8", petFood: 2, beverages: 1, snacks: 2, household: 1 },
  { week: "W9", petFood: 3, beverages: 2, snacks: 1, household: 0 },
  { week: "W10", petFood: 1, beverages: 1, snacks: 0, household: 1 },
  { week: "W11", petFood: 2, beverages: 2, snacks: 1, household: 1 },
  { week: "W12", petFood: 1, beverages: 0, snacks: 1, household: 0 },
];

const rootCauseData = [
  { name: "Demand Spike", value: 35 },
  { name: "Delayed Shipment", value: 28 },
  { name: "Inaccurate Forecast", value: 22 },
  { name: "Quality Issue", value: 15 },
];

const COLORS = {
  primary: "hsl(217 91% 60%)",
  secondary: "hsl(270 70% 65%)",
  success: "hsl(142 80% 45%)",
  warning: "hsl(38 95% 55%)",
  destructive: "hsl(0 80% 62%)",
};

const PIE_COLORS = [COLORS.primary, COLORS.warning, COLORS.success];
const DONUT_COLORS = [COLORS.primary, COLORS.warning, COLORS.secondary, COLORS.destructive];

export default function Analytics() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] misty-bg p-8">
        <div className="max-w-7xl mx-auto">
          {/* Personal Greeting */}
          <div className="space-y-1 animate-fade-in mb-4">
            <h1 className="text-2xl md:text-3xl font-bold gradient-text" style={{ animationDuration: '0.6s' }}>
              Hello Alex! 👋
            </h1>
            <p className="text-sm text-[#7E7E7E] font-light">
              Your Intelligent Planning Companion.
            </p>
          </div>

          <div className="mb-6 animate-fade-in">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
              Reports & Insights
            </h2>
            <p className="text-muted-foreground">
              Track planning metrics and performance indicators
            </p>
          </div>

          {/* Top Control Bar */}
          <div className="flex flex-wrap gap-4 mb-6 items-center justify-between bg-white/80 backdrop-blur-sm rounded-[18px] border border-border/30 shadow-[var(--shadow-card)] p-4">
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
            <Card className="p-8 bg-white/80 backdrop-blur-sm border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
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
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={inventoryTrendData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 92%)" />
                  <XAxis
                    dataKey="week"
                    stroke="hsl(220 15% 50%)"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="hsl(220 15% 50%)"
                    fontSize={12}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}M`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(220 15% 92%)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke={COLORS.success}
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                    name="Target Level"
                  />
                  <Line
                    type="monotone"
                    dataKey="upper"
                    stroke={COLORS.destructive}
                    strokeDasharray="3 3"
                    strokeWidth={1}
                    dot={false}
                    name="Upper Limit"
                  />
                  <Line
                    type="monotone"
                    dataKey="lower"
                    stroke={COLORS.warning}
                    strokeDasharray="3 3"
                    strokeWidth={1}
                    dot={false}
                    name="Lower Limit"
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.primary}
                    strokeWidth={3}
                    fill="url(#colorValue)"
                    name="Total Inventory"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* ABC Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-foreground mb-6">ABC Classification</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={abcData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                    >
                      {abcData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={PIE_COLORS[index % PIE_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 100%)",
                        border: "1px solid hsl(220 15% 92%)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[0] }}></div>
                      <span className="text-muted-foreground">A Items - 80% value</span>
                    </div>
                    <span className="font-semibold text-foreground">20% SKUs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[1] }}></div>
                      <span className="text-muted-foreground">B Items - 15% value</span>
                    </div>
                    <span className="font-semibold text-foreground">30% SKUs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: PIE_COLORS[2] }}></div>
                      <span className="text-muted-foreground">C Items - 5% value</span>
                    </div>
                    <span className="font-semibold text-foreground">50% SKUs</span>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white/80 backdrop-blur-sm border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-foreground mb-6">Turnover Analysis</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={turnoverData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 92%)" />
                    <XAxis type="number" stroke="hsl(220 15% 50%)" fontSize={12} tickLine={false} />
                    <YAxis
                      dataKey="category"
                      type="category"
                      stroke="hsl(220 15% 50%)"
                      fontSize={12}
                      tickLine={false}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 100%)",
                        border: "1px solid hsl(220 15% 92%)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar
                      dataKey="turnover"
                      fill={COLORS.primary}
                      radius={[0, 8, 8, 0]}
                      animationDuration={1200}
                    >
                      {turnoverData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.turnover > 10
                              ? COLORS.success
                              : entry.turnover > 7
                              ? COLORS.warning
                              : COLORS.destructive
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Location Performance */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-300 hover:-translate-y-1 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
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
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={locationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 92%)" />
                  <XAxis type="number" stroke="hsl(220 15% 50%)" fontSize={12} tickLine={false} />
                  <YAxis
                    dataKey="location"
                    type="category"
                    stroke="hsl(220 15% 50%)"
                    fontSize={12}
                    tickLine={false}
                    width={60}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(220 15% 92%)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="coverage"
                    radius={[0, 8, 8, 0]}
                    animationDuration={1200}
                  >
                    {locationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.coverage >= 45
                            ? COLORS.success
                            : entry.coverage >= 35
                            ? COLORS.warning
                            : COLORS.destructive
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Stockout Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
              <Card className="p-8 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 lg:col-span-3">
                <h3 className="text-lg font-semibold text-foreground mb-6">Stockout Trend</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={stockoutTrendData}>
                    <defs>
                      <linearGradient id="petFood" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="beverages" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="snacks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={COLORS.success} stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="household" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.warning} stopOpacity={0.6} />
                        <stop offset="95%" stopColor={COLORS.warning} stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 92%)" />
                    <XAxis dataKey="week" stroke="hsl(220 15% 50%)" fontSize={12} tickLine={false} />
                    <YAxis stroke="hsl(220 15% 50%)" fontSize={12} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 100%)",
                        border: "1px solid hsl(220 15% 92%)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="petFood"
                      stackId="1"
                      stroke={COLORS.primary}
                      fill="url(#petFood)"
                      name="Pet Food"
                      animationDuration={1500}
                    />
                    <Area
                      type="monotone"
                      dataKey="beverages"
                      stackId="1"
                      stroke={COLORS.secondary}
                      fill="url(#beverages)"
                      name="Beverages"
                      animationDuration={1500}
                    />
                    <Area
                      type="monotone"
                      dataKey="snacks"
                      stackId="1"
                      stroke={COLORS.success}
                      fill="url(#snacks)"
                      name="Snacks"
                      animationDuration={1500}
                    />
                    <Area
                      type="monotone"
                      dataKey="household"
                      stackId="1"
                      stroke={COLORS.warning}
                      fill="url(#household)"
                      name="Household"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-8 border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 lg:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-6">Root Causes</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={rootCauseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                    >
                      {rootCauseData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={DONUT_COLORS[index % DONUT_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 100%)",
                        border: "1px solid hsl(220 15% 92%)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-6 space-y-3">
                  {rootCauseData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: DONUT_COLORS[index] }}
                        ></div>
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-semibold text-foreground">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
