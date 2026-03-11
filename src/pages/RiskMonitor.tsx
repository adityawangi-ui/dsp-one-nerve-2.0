import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import NotificationBell from "@/components/risk-os/NotificationBell";
import {
  AlertTriangle,
  Shield,
  Clock,
  MessageSquare,
  UserCheck,
  ListChecks,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Bot,
  Send,
  X,
  ChevronUp,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from "recharts";

// ── Mock Data ──────────────────────────────────────────
const alertRows = [
  { label: "Total Risks", value: "1,281", icon: Shield, severity: "info", tooltip: "All tracked risk items across all categories and regions." },
  { label: "No Next Avail.", value: "156", icon: Clock, severity: "critical", tooltip: "Items with no next available supply date. Immediate action needed for 42 SKUs." },
  { label: "Missing Reason", value: "89", icon: AlertTriangle, severity: "medium", tooltip: "Risk items without a root cause assigned. Top categories: Logistics (34), Demand (28)." },
  { label: "Missing Comments", value: "45", icon: MessageSquare, severity: "low", tooltip: "Items requiring planner commentary for audit compliance." },
  { label: "Past Due", value: "234", icon: ListChecks, severity: "critical", tooltip: "Overdue risk items. 67% are >7 days past due. APAC region leads with 98 items." },
  { label: "Assigned to Me", value: "67", icon: UserCheck, severity: "new", tooltip: "Your personal queue. 12 are high priority, 8 added today." },
];

const donutData = [
  { name: "Critical", value: 47, color: "hsl(0, 72%, 51%)" },
  { name: "Medium", value: 156, color: "hsl(27, 96%, 54%)" },
  { name: "Low", value: 89, color: "hsl(152, 60%, 42%)" },
];

const weeklyData = [
  { week: "W1", critical: 12, medium: 45, low: 30 },
  { week: "W2", critical: 18, medium: 52, low: 28 },
  { week: "W3", critical: 9, medium: 38, low: 35 },
  { week: "W4", critical: 15, medium: 48, low: 22 },
  { week: "W5", critical: 47, medium: 56, low: 29 },
];

const riskTableData = [
  { sku: "SKU-A1024", desc: "Surf Excel 1L", country: "India", category: "Home Care", riskType: "Supply Shortage", status: "Open", loss: "$124K", planner: "John Smith", severity: "critical" },
  { sku: "SKU-B2048", desc: "Dove Shampoo 200ml", country: "Brazil", category: "Personal Care", riskType: "Demand Spike", status: "In Progress", loss: "$89K", planner: "Maria Garcia", severity: "medium" },
  { sku: "SKU-C3072", desc: "Lipton Tea 100pk", country: "UK", category: "Foods", riskType: "Quality Hold", status: "Open", loss: "$67K", planner: "James Wilson", severity: "critical" },
  { sku: "SKU-D4096", desc: "Axe Deodorant 150ml", country: "Germany", category: "Personal Care", riskType: "Logistics Delay", status: "Resolved", loss: "$45K", planner: "Anna Mueller", severity: "low" },
  { sku: "SKU-E5120", desc: "Knorr Soup Mix", country: "France", category: "Foods", riskType: "Forecast Error", status: "Open", loss: "$156K", planner: "Pierre Dupont", severity: "critical" },
  { sku: "SKU-F6144", desc: "Comfort Fabric 500ml", country: "Spain", category: "Home Care", riskType: "Supply Shortage", status: "In Progress", loss: "$78K", planner: "Carlos Ruiz", severity: "medium" },
  { sku: "SKU-G7168", desc: "Vaseline Lotion 200ml", country: "India", category: "Personal Care", riskType: "Expiry Risk", status: "Open", loss: "$34K", planner: "John Smith", severity: "low" },
  { sku: "SKU-H8192", desc: "Hellmann's Mayo 400g", country: "US", category: "Foods", riskType: "Demand Spike", status: "Open", loss: "$210K", planner: "Sarah Johnson", severity: "critical" },
];

const severityColor: Record<string, string> = {
  critical: "bg-[hsl(0,72%,51%)]",
  medium: "bg-[hsl(27,96%,54%)]",
  low: "bg-[hsl(152,60%,42%)]",
  info: "bg-primary",
  new: "bg-[hsl(45,93%,50%)]",
};

const severityBadge: Record<string, string> = {
  critical: "bg-[hsl(0,72%,51%)]/15 text-[hsl(0,72%,51%)] border-[hsl(0,72%,51%)]/30",
  medium: "bg-[hsl(27,96%,54%)]/15 text-[hsl(27,96%,54%)] border-[hsl(27,96%,54%)]/30",
  low: "bg-[hsl(152,60%,42%)]/15 text-[hsl(152,60%,42%)] border-[hsl(152,60%,42%)]/30",
};

const statusBadge: Record<string, string> = {
  "Open": "bg-destructive/10 text-destructive border-destructive/20",
  "In Progress": "bg-warning/10 text-warning border-warning/20",
  "Resolved": "bg-success/10 text-success border-success/20",
};

// ── Filters ────────────────────────────────────────────
type Filters = {
  country: string;
  category: string;
  riskType: string;
  status: string;
  planner: string;
  lossRange: number[];
};

const defaultFilters: Filters = {
  country: "all",
  category: "all",
  riskType: "all",
  status: "all",
  planner: "all",
  lossRange: [0, 250],
};

// ── Component ──────────────────────────────────────────
export default function RiskMonitor() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);

  const parseLoss = (s: string) => parseInt(s.replace(/[$K,]/g, "")) || 0;

  const filteredData = riskTableData.filter((r) => {
    if (filters.country !== "all" && r.country !== filters.country) return false;
    if (filters.category !== "all" && r.category !== filters.category) return false;
    if (filters.riskType !== "all" && r.riskType !== filters.riskType) return false;
    if (filters.status !== "all" && r.status !== filters.status) return false;
    if (filters.planner !== "all" && r.planner !== filters.planner) return false;
    const loss = parseLoss(r.loss);
    if (loss < filters.lossRange[0] || loss > filters.lossRange[1]) return false;
    return true;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortCol) return 0;
    const va = (a as any)[sortCol] ?? "";
    const vb = (b as any)[sortCol] ?? "";
    if (sortCol === "loss") return sortDir === "asc" ? parseLoss(va) - parseLoss(vb) : parseLoss(vb) - parseLoss(va);
    return sortDir === "asc" ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
  });

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: string }) =>
    sortCol === col ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3 inline ml-1" /> : <ChevronDown className="h-3 w-3 inline ml-1" />) : null;

  const handleChat = () => {
    if (!chatInput.trim()) return;
    setMessages((p) => [...p, { role: "user", text: chatInput }]);
    const reply = "Based on current risk data, I recommend prioritizing the 47 critical items — especially SKU-H8192 (Hellmann's Mayo) with $210K expected loss. The supply shortage cluster in India and France accounts for 62% of total exposure. Shall I generate a mitigation scenario?";
    setTimeout(() => setMessages((p) => [...p, { role: "ai", text: reply }]), 800);
    setChatInput("");
  };

  const unique = (key: keyof typeof riskTableData[0]) => [...new Set(riskTableData.map((r) => r[key]))];

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-background px-4 md:px-6 lg:px-8 py-6 space-y-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
               Risk AI
             </h1>
             <p className="text-sm text-muted-foreground mt-1">Enterprise risk intelligence & AI-powered mitigation</p>
          </div>
          <div className="flex items-center gap-3">
            <NotificationBell onNavigateToConversations={() => navigate('/risk-analysis?tab=conversations')} />
            <Badge className="bg-success/15 text-success border border-success/30 text-xs px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-success inline-block mr-1.5 animate-pulse" />
              Connected
            </Badge>
            <span className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Alerts & Risk Summary — Compact */}
        <Card className="p-4 border border-border/60 shadow-[var(--shadow-card)]">
          <h2 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-2">
            <BarChart3 className="h-3.5 w-3.5 text-primary" /> Alerts & Risk Summary
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left - Alert Rows */}
            <div className="lg:col-span-4 space-y-0.5">
              {alertRows.map((row) => {
                const Icon = row.icon;
                const barWidth = row.label === "Total Risks" ? 100 : (parseInt(row.value.replace(",", "")) / 1281) * 100;
                return (
                  <Tooltip key={row.label}>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-default">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${severityColor[row.severity]}`} />
                        <Icon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="text-[11px] text-foreground flex-1">{row.label}</span>
                        <span className="text-xs font-bold font-mono text-foreground">{row.value}</span>
                        <div className="w-12 h-1 bg-muted rounded-full overflow-hidden flex-shrink-0">
                          <div className={`h-full rounded-full ${severityColor[row.severity]}`} style={{ width: `${barWidth}%` }} />
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-xs text-xs">
                      {row.tooltip}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            {/* Center - Donut */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
               <ResponsiveContainer width="100%" height={180}>
                 <PieChart>
                   <Pie data={donutData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                     {donutData.map((entry, i) => (
                       <Cell key={i} fill={entry.color} />
                     ))}
                   </Pie>
                   <RechartsTooltip formatter={(value: number, name: string) => [`${value} items`, name]} />
                   <Legend wrapperStyle={{ fontSize: 10 }} iconType="circle" iconSize={8} formatter={(v: string) => <span style={{ color: "hsl(var(--foreground))" }}>{v}</span>} />
                 </PieChart>
               </ResponsiveContainer>
              <div className="mt-2 text-center">
                <span className="text-[10px] text-muted-foreground">Value at Risk</span>
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-lg font-bold font-mono text-foreground">$2.4M</span>
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[9px]">
                    <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> +8%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right - Weekly Bar Chart */}
            <div className="lg:col-span-4">
              <p className="text-[10px] font-medium text-muted-foreground mb-1">5-Week Trend</p>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <RechartsTooltip />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="critical" stackId="a" fill="hsl(0, 72%, 51%)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="medium" stackId="a" fill="hsl(27, 96%, 54%)" />
                  <Bar dataKey="low" stackId="a" fill="hsl(152, 60%, 42%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card className="p-4 border border-border/60 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <FilterSelect label="Country" value={filters.country} options={unique("country")} onChange={(v) => setFilters({ ...filters, country: v })} />
            <FilterSelect label="Category" value={filters.category} options={unique("category")} onChange={(v) => setFilters({ ...filters, category: v })} />
            <FilterSelect label="Risk Type" value={filters.riskType} options={unique("riskType")} onChange={(v) => setFilters({ ...filters, riskType: v })} />
            <FilterSelect label="Status" value={filters.status} options={unique("status")} onChange={(v) => setFilters({ ...filters, status: v })} />
            <FilterSelect label="Planner" value={filters.planner} options={unique("planner")} onChange={(v) => setFilters({ ...filters, planner: v })} />
            <div className="flex items-center gap-2 min-w-[180px]">
              <span className="text-xs text-muted-foreground whitespace-nowrap">Loss ($K)</span>
              <Slider value={filters.lossRange} onValueChange={(v) => setFilters({ ...filters, lossRange: v })} min={0} max={250} step={10} className="flex-1" />
              <span className="text-xs font-mono text-foreground">{filters.lossRange[0]}-{filters.lossRange[1]}</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setFilters(defaultFilters)} className="gap-1.5">
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          </div>
        </Card>

        {/* Risk Table */}
        <Card className="border border-border/60 shadow-[var(--shadow-card)] overflow-hidden">
          <div className="p-4 border-b border-border/40">
            <h2 className="text-sm font-semibold text-foreground">Detailed Risk Items</h2>
            <p className="text-xs text-muted-foreground">{sortedData.length} of {riskTableData.length} items</p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  {[
                    { key: "sku", label: "SKU" },
                    { key: "desc", label: "Description" },
                    { key: "country", label: "Country" },
                    { key: "category", label: "Category" },
                    { key: "riskType", label: "Risk Type" },
                    { key: "status", label: "Status" },
                    { key: "loss", label: "Exp. Loss" },
                    { key: "planner", label: "Planner" },
                  ].map((col) => (
                    <TableHead key={col.key} className="text-xs cursor-pointer hover:text-foreground select-none" onClick={() => toggleSort(col.key)}>
                      {col.label}<SortIcon col={col.key} />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((row, i) => (
                  <TableRow key={i} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-mono text-xs font-medium">{row.sku}</TableCell>
                    <TableCell className="text-xs">{row.desc}</TableCell>
                    <TableCell className="text-xs">{row.country}</TableCell>
                    <TableCell className="text-xs">{row.category}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${severityBadge[row.severity] || ""}`}>{row.riskType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-[10px] ${statusBadge[row.status] || ""}`}>{row.status}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold">{row.loss}</TableCell>
                    <TableCell className="text-xs">{row.planner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* AI Chat FAB */}
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-primary-muted shadow-[var(--shadow-glow)] flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Bot className="h-6 w-6 text-primary-foreground" />
          </button>
        )}

        {/* AI Chat Panel */}
        {chatOpen && (
          <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[480px] rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-intense)] flex flex-col overflow-hidden animate-slide-up">
            {/* Chat Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-primary to-primary-muted flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground">Risk Champ</span>
                <Badge className="bg-primary-foreground/20 text-primary-foreground text-[9px] border-0">AI</Badge>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-primary-foreground/80 hover:text-primary-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center space-y-3 pt-6">
                  <Bot className="h-10 w-10 text-primary/40 mx-auto" />
                  <p className="text-xs text-muted-foreground">Ask me anything about your risk portfolio</p>
                  <div className="space-y-1.5">
                    {["What are the top critical risks?", "Summarize APAC exposure", "Generate mitigation plan"].map((q) => (
                      <button
                        key={q}
                        onClick={() => { setChatInput(q); }}
                        className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted text-foreground transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/40">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask Risk Champ..."
                  className="flex-1 text-xs h-9"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleChat()}
                />
                <Button size="sm" className="h-9 w-9 p-0" onClick={handleChat}>
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

// ── Filter Select Helper ───────────────────────────────
function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px] h-8 text-xs">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All {label}s</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>{o}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
