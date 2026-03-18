import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { riskData, RiskRow } from "@/data/riskData";
import { Home, ChevronRight, Shield, ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Dimension = "category" | "country" | "severity" | "riskType" | "priority" | "riskHorizon" | "site";

const dimensionLabels: Record<Dimension, string> = {
  category: "Category",
  country: "Country",
  severity: "Severity",
  riskType: "Risk Type",
  priority: "Priority",
  riskHorizon: "Horizon",
  site: "Site",
};

function getDimensionValue(row: RiskRow, dim: Dimension): string {
  switch (dim) {
    case "category": return row.category;
    case "country": return row.msoCountry;
    case "severity": return row.severity;
    case "riskType": return row.riskType;
    case "priority": return row.priority;
    case "riskHorizon": return row.riskHorizon;
    case "site": return row.site;
  }
}

function getUniqueValues(dim: Dimension): string[] {
  const vals = new Set(riskData.map(r => getDimensionValue(r, dim)));
  return Array.from(vals).sort();
}

function computeCorrelation(dimX: Dimension, dimY: Dimension) {
  const xVals = getUniqueValues(dimX);
  const yVals = getUniqueValues(dimY);
  const matrix: { x: string; y: string; count: number; totalLoss: number; avgDays: number }[] = [];

  for (const x of xVals) {
    for (const y of yVals) {
      const matching = riskData.filter(
        r => getDimensionValue(r, dimX) === x && getDimensionValue(r, dimY) === y
      );
      matrix.push({
        x,
        y,
        count: matching.length,
        totalLoss: matching.reduce((s, r) => s + r.expectedLossValue, 0),
        avgDays: matching.length > 0
          ? Math.round(matching.reduce((s, r) => s + r.riskInDays, 0) / matching.length)
          : 0,
      });
    }
  }

  const maxCount = Math.max(...matrix.map(m => m.count), 1);
  return { xVals, yVals, matrix, maxCount };
}

function getHeatColor(count: number, maxCount: number): string {
  if (count === 0) return "hsl(var(--muted) / 0.3)";
  const intensity = count / maxCount;
  if (intensity <= 0.25) return "hsl(var(--primary) / 0.15)";
  if (intensity <= 0.5) return "hsl(var(--primary) / 0.35)";
  if (intensity <= 0.75) return "hsl(var(--primary) / 0.6)";
  return "hsl(var(--primary) / 0.85)";
}

function getTextColor(count: number, maxCount: number): string {
  if (count === 0) return "hsl(var(--muted-foreground))";
  const intensity = count / maxCount;
  return intensity > 0.6 ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))";
}

function formatLoss(v: number): string {
  if (v >= 1_000_000) return `€${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `€${(v / 1_000).toFixed(0)}K`;
  return `€${v}`;
}

export default function RiskCorrelationMatrix() {
  const navigate = useNavigate();
  const [dimX, setDimX] = useState<Dimension>("category");
  const [dimY, setDimY] = useState<Dimension>("country");
  const [hoveredCell, setHoveredCell] = useState<{ x: string; y: string } | null>(null);
  const [metric, setMetric] = useState<"count" | "loss" | "days">("count");

  const { xVals, yVals, matrix, maxCount } = useMemo(
    () => computeCorrelation(dimX, dimY),
    [dimX, dimY]
  );

  const maxLoss = useMemo(() => Math.max(...matrix.map(m => m.totalLoss), 1), [matrix]);
  const maxDays = useMemo(() => Math.max(...matrix.map(m => m.avgDays), 1), [matrix]);

  const getMetricValue = (cell: typeof matrix[0]) => {
    switch (metric) {
      case "count": return cell.count;
      case "loss": return cell.totalLoss;
      case "days": return cell.avgDays;
    }
  };

  const getMetricMax = () => {
    switch (metric) {
      case "count": return maxCount;
      case "loss": return maxLoss;
      case "days": return maxDays;
    }
  };

  const formatMetric = (cell: typeof matrix[0]) => {
    switch (metric) {
      case "count": return cell.count;
      case "loss": return formatLoss(cell.totalLoss);
      case "days": return cell.avgDays > 0 ? `${cell.avgDays}d` : "–";
    }
  };

  // Summary stats
  const totalRisks = riskData.length;
  const totalLoss = riskData.reduce((s, r) => s + r.expectedLossValue, 0);
  const hotspots = matrix.filter(m => m.count >= 2).sort((a, b) => b.count - a.count).slice(0, 5);

  const dimensionOptions = Object.entries(dimensionLabels) as [Dimension, string][];

  return (
    <div className="min-h-screen bg-background flex flex-col gradient-mesh">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigate("/risk-monitor")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center tech-glow">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">Risk Correlation Matrix</span>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="p-4 space-y-4 max-w-[1600px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <a href="/risk-monitor" className="hover:text-primary transition-colors cursor-pointer">Risk AI</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Correlation Matrix</span>
          </nav>

          {/* Controls Row */}
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">X-Axis (Columns)</label>
              <div className="flex gap-1">
                {dimensionOptions.map(([key, label]) => (
                  <Button
                    key={key}
                    variant={dimX === key ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-[11px] px-2.5"
                    onClick={() => { if (key !== dimY) setDimX(key); }}
                    disabled={key === dimY}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Y-Axis (Rows)</label>
              <div className="flex gap-1">
                {dimensionOptions.map(([key, label]) => (
                  <Button
                    key={key}
                    variant={dimY === key ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-[11px] px-2.5"
                    onClick={() => { if (key !== dimX) setDimY(key); }}
                    disabled={key === dimX}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Metric Toggle */}
          <Tabs value={metric} onValueChange={(v) => setMetric(v as typeof metric)}>
            <TabsList className="h-8">
              <TabsTrigger value="count" className="text-[11px] h-6 px-3">Risk Count</TabsTrigger>
              <TabsTrigger value="loss" className="text-[11px] h-6 px-3">Loss Value</TabsTrigger>
              <TabsTrigger value="days" className="text-[11px] h-6 px-3">Avg Duration</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Matrix */}
            <Card className="lg:col-span-3 overflow-hidden">
              <CardContent className="p-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-left min-w-[80px] border-b border-r border-border/50">
                          {dimensionLabels[dimY]} / {dimensionLabels[dimX]}
                        </th>
                        {xVals.map(x => (
                          <th key={x} className="p-2 text-[10px] font-semibold text-muted-foreground text-center min-w-[70px] border-b border-border/50">
                            {x}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {yVals.map(y => (
                        <tr key={y}>
                          <td className="p-2 text-[11px] font-medium text-foreground border-r border-border/50 whitespace-nowrap">
                            {y}
                          </td>
                          {xVals.map(x => {
                            const cell = matrix.find(m => m.x === x && m.y === y)!;
                            const val = getMetricValue(cell);
                            const max = getMetricMax();
                            const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;
                            return (
                              <td key={`${x}-${y}`} className="p-1">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div
                                      className={`
                                        relative flex items-center justify-center rounded-lg h-12 min-w-[60px]
                                        transition-all duration-200 cursor-pointer
                                        ${isHovered ? "ring-2 ring-primary scale-105 shadow-lg" : ""}
                                      `}
                                      style={{
                                        backgroundColor: getHeatColor(val, max),
                                        color: getTextColor(val, max),
                                      }}
                                      onMouseEnter={() => setHoveredCell({ x, y })}
                                      onMouseLeave={() => setHoveredCell(null)}
                                    >
                                      <span className="text-xs font-bold">
                                        {val === 0 ? "–" : formatMetric(cell)}
                                      </span>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="text-xs space-y-1">
                                    <p className="font-semibold">{x} × {y}</p>
                                    <p>Risks: {cell.count}</p>
                                    <p>Total Loss: {formatLoss(cell.totalLoss)}</p>
                                    <p>Avg Duration: {cell.avgDays}d</p>
                                  </TooltipContent>
                                </Tooltip>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-border/50">
                  <span className="text-[10px] text-muted-foreground font-medium">Intensity:</span>
                  <div className="flex items-center gap-1">
                    {[0.15, 0.35, 0.6, 0.85].map((opacity, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div
                          className="h-3 w-6 rounded"
                          style={{ backgroundColor: `hsl(var(--primary) / ${opacity})` }}
                        />
                        <span className="text-[9px] text-muted-foreground">
                          {["Low", "Med", "High", "Critical"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar - Hotspots & Summary */}
            <div className="space-y-4">
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-1.5">
                    <Info className="h-3.5 w-3.5 text-primary" />
                    Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Total Risks</span>
                    <span className="text-sm font-bold text-foreground">{totalRisks}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Total Loss</span>
                    <span className="text-sm font-bold text-foreground">{formatLoss(totalLoss)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Dimensions</span>
                    <span className="text-sm font-medium text-foreground">
                      {dimensionLabels[dimX]} × {dimensionLabels[dimY]}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] text-muted-foreground">Grid Size</span>
                    <span className="text-sm font-medium text-foreground">
                      {xVals.length} × {yVals.length}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">🔥 Risk Hotspots</CardTitle>
                  <CardDescription className="text-[10px]">
                    Top intersections by risk count
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                  {hotspots.length === 0 ? (
                    <p className="text-[11px] text-muted-foreground">No concentrated hotspots found.</p>
                  ) : (
                    hotspots.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        onMouseEnter={() => setHoveredCell({ x: h.x, y: h.y })}
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-[9px] h-5 px-1.5 bg-primary/10 text-primary border-primary/30">
                            #{i + 1}
                          </Badge>
                          <span className="text-[11px] font-medium text-foreground">{h.x} × {h.y}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] font-bold text-foreground">{h.count} risks</div>
                          <div className="text-[9px] text-muted-foreground">{formatLoss(h.totalLoss)}</div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
