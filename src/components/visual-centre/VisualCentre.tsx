import { useState } from "react";
import { X, Sparkles, Pin, MoreVertical, BarChart3, PieChart as PieChartIcon, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

const chartPalette = [
  "hsl(var(--primary))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
  "hsl(var(--agent-utility))",
  "hsl(var(--primary-glow))",
];

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "hsl(var(--popover))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "10px",
    color: "hsl(var(--popover-foreground))",
    fontSize: "11px",
    padding: "8px 12px",
  },
};

interface GeneratedChart {
  id: number;
  type: "bar" | "pie" | "line";
  title: string;
  description: string;
  data: any[];
  pinned: boolean;
}

const mockChartTemplates: GeneratedChart[] = [
  {
    id: 1, type: "bar", pinned: false,
    title: "Risk Distribution by Country",
    description: "Bar chart displaying the count of active risks across all MSO countries. Germany leads with the highest concentration...",
    data: [
      { name: "DE", value: 42, secondary: 12 },
      { name: "FR", value: 28, secondary: 8 },
      { name: "IT", value: 35, secondary: 15 },
      { name: "ES", value: 22, secondary: 6 },
      { name: "NL", value: 18, secondary: 4 },
      { name: "PL", value: 31, secondary: 10 },
    ],
  },
  {
    id: 2, type: "bar", pinned: false,
    title: "Expected Loss Cases by Category",
    description: "Comparison of expected loss cases across product categories. Personal Care shows the highest exposure...",
    data: [
      { name: "Personal Care", value: 48500, secondary: 32000 },
      { name: "Home Care", value: 28000, secondary: 18500 },
      { name: "Foods", value: 35200, secondary: 22000 },
      { name: "Refreshment", value: 12800, secondary: 8600 },
    ],
  },
  {
    id: 3, type: "pie", pinned: false,
    title: "Risk Severity Split",
    description: "Pie chart representing the severity distribution across all active risks. S1 critical risks account for 38%...",
    data: [
      { name: "S1 - Critical", value: 38 },
      { name: "S2 - High", value: 28 },
      { name: "S3 - Medium", value: 20 },
      { name: "S4 - Low", value: 10 },
      { name: "S5 - Info", value: 4 },
    ],
  },
  {
    id: 4, type: "line", pinned: false,
    title: "Risk Trend Over 8 Weeks",
    description: "Line chart showing risk count trend over the last 8 weeks with resolution rate improving...",
    data: [
      { week: "W36", open: 45, resolved: 12 },
      { week: "W37", open: 52, resolved: 18 },
      { week: "W38", open: 48, resolved: 22 },
      { week: "W39", open: 55, resolved: 28 },
      { week: "W40", open: 42, resolved: 35 },
      { week: "W41", open: 38, resolved: 30 },
      { week: "W42", open: 44, resolved: 26 },
      { week: "W43", open: 36, resolved: 32 },
    ],
  },
];

export default function VisualCentre({ onClose }: Props) {
  const [prompt, setPrompt] = useState("");
  const [briefingType, setBriefingType] = useState("smart");
  const [charts, setCharts] = useState<GeneratedChart[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a query to generate visuals");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      // Pick 2-4 random charts
      const count = 2 + Math.floor(Math.random() * 3);
      const shuffled = [...mockChartTemplates].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, count).map((c, i) => ({ ...c, id: Date.now() + i }));
      setCharts(prev => [...selected, ...prev]);
      setIsGenerating(false);
      setPrompt("");
      toast.success(`Generated ${count} visuals`);
    }, 1800);
  };

  const togglePin = (id: number) => {
    setCharts(prev => prev.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c));
  };

  const removeChart = (id: number) => {
    setCharts(prev => prev.filter(c => c.id !== id));
  };

  const renderChart = (chart: GeneratedChart) => {
    const axisStyle = { fontSize: 10, fill: "hsl(var(--muted-foreground))" };

    if (chart.type === "bar") {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chart.data} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
            <XAxis dataKey="name" tick={axisStyle} axisLine={{ stroke: "hsl(var(--border))" }} />
            <YAxis tick={axisStyle} axisLine={{ stroke: "hsl(var(--border))" }} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="value" fill={chartPalette[0]} name="Primary" radius={[4, 4, 0, 0]} />
            {chart.data[0]?.secondary !== undefined && (
              <Bar dataKey="secondary" fill={chartPalette[1]} name="Secondary" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (chart.type === "pie") {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={35} strokeWidth={2} stroke="hsl(var(--background))">
              {chart.data.map((_, i) => <Cell key={i} fill={chartPalette[i % chartPalette.length]} />)}
            </Pie>
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 10 }} formatter={(v: string) => <span style={{ color: "hsl(var(--foreground))" }}>{v}</span>} />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (chart.type === "line") {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
            <XAxis dataKey="week" tick={axisStyle} axisLine={{ stroke: "hsl(var(--border))" }} />
            <YAxis tick={axisStyle} axisLine={{ stroke: "hsl(var(--border))" }} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 10 }} formatter={(v: string) => <span style={{ color: "hsl(var(--foreground))" }}>{v}</span>} />
            <Line type="monotone" dataKey="open" stroke={chartPalette[0]} strokeWidth={2} name="Open" dot={{ r: 3, fill: chartPalette[0] }} />
            <Line type="monotone" dataKey="resolved" stroke={chartPalette[1]} strokeWidth={2} name="Resolved" dot={{ r: 3, fill: chartPalette[1] }} />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center tech-glow">
            <BarChart3 className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-foreground">Visual Centre</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              <span className="px-3 py-1 text-[11px] font-semibold bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">Visuals</span>
              <span className="px-3 py-1 text-[11px] font-semibold text-muted-foreground bg-card hover:bg-secondary cursor-pointer">Insights</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1200px] mx-auto px-6 py-8">
          {/* Prompt Bar */}
          <div className="flex items-center gap-3 mb-8 bg-card border border-border rounded-2xl px-5 py-3 shadow-lg">
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleGenerate()}
              placeholder="Hi, I'm your Visual Centre! Describe the graph or chart you need..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <Select value={briefingType} onValueChange={setBriefingType}>
              <SelectTrigger className="h-8 w-[130px] text-[11px] border-border/50 bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="smart">Smart Briefing</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="summary">Summary</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="gap-2 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-90 rounded-xl px-5"
            >
              {isGenerating ? "Generating..." : "Generate"}
              <Sparkles className="h-4 w-4" />
            </Button>
          </div>

          {/* Results */}
          {charts.length > 0 && (
            <>
              <h2 className="text-base font-semibold text-foreground mb-4">Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {charts.map(chart => (
                  <div key={chart.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-[var(--shadow-neon)] transition-shadow">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px] font-semibold">
                          Smart briefing
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-7 w-7 p-0 ${chart.pinned ? "text-primary" : "text-muted-foreground"}`}
                            onClick={() => togglePin(chart.id)}
                          >
                            <Pin className={`h-3.5 w-3.5 ${chart.pinned ? "fill-primary" : ""}`} />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground">
                                <MoreVertical className="h-3.5 w-3.5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.info("Edit Query — coming soon")}>Edit Query</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info("Alert added")}>Add Alert</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => removeChart(chart.id)}>Remove</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <h4 className="text-xs font-semibold text-primary mb-1 leading-relaxed">{chart.title}</h4>
                      <p className="text-[10px] text-muted-foreground line-clamp-2 mb-3">{chart.description}</p>
                      {renderChart(chart)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Empty State */}
          {charts.length === 0 && !isGenerating && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/20 border border-primary/20 flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Generate Visual Insights</h3>
              <p className="text-xs text-muted-foreground max-w-sm">
                Describe the chart or analysis you need. Try: "Show me risk distribution by country" or "Compare loss cases across categories"
              </p>
              <div className="flex gap-2 mt-4">
                {["Risk by country", "Loss by category", "Severity breakdown", "Weekly trend"].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setPrompt(suggestion)}
                    className="px-3 py-1.5 text-[11px] rounded-lg border border-border bg-secondary text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 animate-pulse">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Generating visuals from your query...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
