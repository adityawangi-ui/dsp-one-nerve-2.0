import { useState } from "react";
import { X, Sparkles, Pin, MoreVertical, BarChart3, Trash2, Share2, Edit3, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
  query: string;
}

const mockChartTemplates: Omit<GeneratedChart, "query">[] = [
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
  const [chartType, setChartType] = useState("auto");
  const [charts, setCharts] = useState<GeneratedChart[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedChart, setSelectedChart] = useState<GeneratedChart | null>(null);
  const [editQuery, setEditQuery] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareTo, setShareTo] = useState("");
  const [shareMsg, setShareMsg] = useState("");
  const [shareChartId, setShareChartId] = useState<number | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast.error("Please enter a query to generate visuals");
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      const count = 2 + Math.floor(Math.random() * 3);
      const shuffled = [...mockChartTemplates].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, count).map((c, i) => ({ ...c, id: Date.now() + i, query: prompt }));
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
    if (selectedChart?.id === id) setSelectedChart(null);
    toast.success("Chart removed");
  };

  const handleEditChart = (chart: GeneratedChart) => {
    setSelectedChart(chart);
    setEditQuery(chart.query);
    setEditDialogOpen(true);
  };

  const handleApplyEdit = () => {
    if (!selectedChart || !editQuery.trim()) return;
    setEditDialogOpen(false);
    toast.info("Regenerating chart...");
    setTimeout(() => {
      setCharts(prev => prev.map(c => {
        if (c.id !== selectedChart.id) return c;
        // Simulate updated data
        return {
          ...c,
          query: editQuery,
          data: c.data.map(d => {
            const updated = { ...d };
            Object.keys(updated).forEach(k => {
              if (typeof updated[k] === "number") {
                updated[k] = Math.round(updated[k] * (0.8 + Math.random() * 0.4));
              }
            });
            return updated;
          }),
        };
      }));
      toast.success("Chart updated");
    }, 1200);
  };

  const handleShareChart = (id: number) => {
    setShareChartId(id);
    setShareTo("");
    setShareMsg("");
    setShareDialogOpen(true);
  };

  const handleSendShare = () => {
    setShareDialogOpen(false);
    toast.success(`Chart shared to ${shareTo || "team"}`);
  };

  const handleSelectCard = (chart: GeneratedChart) => {
    setSelectedChart(selectedChart?.id === chart.id ? null : chart);
  };

  const renderChart = (chart: GeneratedChart, height = 200) => {
    const axisStyle = { fontSize: 10, fill: "hsl(var(--muted-foreground))" };

    if (chart.type === "bar") {
      return (
        <ResponsiveContainer width="100%" height={height}>
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
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie data={chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={Math.min(75, height / 3)} innerRadius={Math.min(35, height / 6)} strokeWidth={2} stroke="hsl(var(--background))">
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
        <ResponsiveContainer width="100%" height={height}>
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
          <span className="text-sm font-bold text-foreground">Visual Centre</span>
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
              placeholder="Describe the graph or chart you need..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <Select value={chartType} onValueChange={setChartType}>
              <SelectTrigger className="h-8 w-[120px] text-[11px] border-border/50 bg-secondary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto Detect</SelectItem>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
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

          {/* Loading State */}
          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 animate-pulse">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Generating visuals from your query...</p>
            </div>
          )}

          {/* Empty State */}
          {charts.length === 0 && !isGenerating && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary-glow/20 border border-primary/20 flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Generate Visuals</h3>
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

          {/* Selected Chart - Editable Panel */}
          {selectedChart && (
            <div className="mb-6 border-2 border-primary/30 rounded-xl bg-card overflow-hidden">
              <div className="bg-primary/5 px-5 py-3 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/15 text-primary border-primary/30 text-[10px]">Selected</Badge>
                  <h3 className="text-sm font-bold text-foreground">{selectedChart.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1" onClick={() => handleEditChart(selectedChart)}>
                    <Edit3 className="h-3 w-3" /> Edit Query
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1" onClick={() => handleShareChart(selectedChart.id)}>
                    <Share2 className="h-3 w-3" /> Share
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => removeChart(selectedChart.id)}>
                    <Trash2 className="h-3 w-3" /> Delete
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setSelectedChart(null)}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div className="p-5">
                <p className="text-xs text-muted-foreground mb-1">Query: <span className="text-foreground italic">"{selectedChart.query}"</span></p>
                <p className="text-[10px] text-muted-foreground mb-4">{selectedChart.description}</p>
                {renderChart(selectedChart, 280)}
              </div>
            </div>
          )}

          {/* Results Grid - Saved at bottom */}
          {charts.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-foreground">
                  Results <span className="text-xs text-muted-foreground font-normal ml-1">({charts.length} charts)</span>
                </h2>
                <span className="text-[10px] text-muted-foreground">Click a card to select & edit</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {charts.map(chart => {
                  const isSelected = selectedChart?.id === chart.id;
                  return (
                    <div
                      key={chart.id}
                      className={`bg-card border-2 rounded-xl overflow-hidden transition-all cursor-pointer ${
                        isSelected ? "border-primary shadow-[var(--shadow-neon)]" : "border-border hover:border-primary/30 hover:shadow-md"
                      }`}
                      onClick={() => handleSelectCard(chart)}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-[10px] font-medium text-muted-foreground border-border">
                            {chart.type === "bar" ? "Bar Chart" : chart.type === "pie" ? "Pie Chart" : "Line Chart"}
                          </Badge>
                          <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-6 w-6 p-0 ${chart.pinned ? "text-primary" : "text-muted-foreground"}`}
                              onClick={() => togglePin(chart.id)}
                            >
                              <Pin className={`h-3 w-3 ${chart.pinned ? "fill-primary" : ""}`} />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-muted-foreground">
                                  <MoreVertical className="h-3 w-3" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditChart(chart)}>
                                  <Edit3 className="h-3.5 w-3.5 mr-2" /> Edit Query
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShareChart(chart.id)}>
                                  <Share2 className="h-3.5 w-3.5 mr-2" /> Share
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.success("Chart downloaded")}>
                                  <Download className="h-3.5 w-3.5 mr-2" /> Download
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive" onClick={() => removeChart(chart.id)}>
                                  <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <h4 className="text-xs font-semibold text-primary mb-1 leading-relaxed">{chart.title}</h4>
                        <p className="text-[10px] text-muted-foreground line-clamp-2 mb-3">{chart.description}</p>
                        {renderChart(chart)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Edit Query Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-primary" /> Edit Chart Query
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">Current chart: <span className="text-foreground font-medium">{selectedChart?.title}</span></p>
              <Textarea
                value={editQuery}
                onChange={e => setEditQuery(e.target.value)}
                placeholder="Modify your query to regenerate the chart..."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleApplyEdit} className="gap-2">
                <Sparkles className="h-4 w-4" /> Regenerate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-primary" /> Share Chart
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground">To (email)</label>
              <Input value={shareTo} onChange={e => setShareTo(e.target.value)} placeholder="recipient@company.com" className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Message (optional)</label>
              <Textarea value={shareMsg} onChange={e => setShareMsg(e.target.value)} placeholder="Add a note..." className="mt-1 min-h-[60px]" />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShareDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSendShare} className="gap-2 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                <Share2 className="h-4 w-4" /> Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
