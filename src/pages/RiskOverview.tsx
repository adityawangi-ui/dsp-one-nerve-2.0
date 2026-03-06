import { useState, useMemo } from "react";
import { riskData, RiskRow } from "@/data/riskData";
import { Home, ChevronRight, Shield, Clock, RefreshCw, Download, Bell, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AlertsSection from "@/components/risk-os/AlertsSection";
import UnifiedFilters, { FilterState, defaultFilters } from "@/components/risk-os/UnifiedFilters";
import DetailedRiskTable from "@/components/risk-os/DetailedRiskTable";
import InsightsPanel from "@/components/risk-os/InsightsPanel";
import RiskAIAgent from "@/components/risk-os/RiskAIAgent";
import RiskAnalysisPanel from "@/components/risk-os/RiskAnalysisPanel";
import VisualCentre from "@/components/visual-centre/VisualCentre";

export default function RiskOverview() {
  const [rows, setRows] = useState<RiskRow[]>([...riskData]);
  const maxLoss = 890000;
  const [filters, setFilters] = useState<FilterState>(() => ({ ...defaultFilters, lossRange: [0, 890000] }));
  const [insightsRow, setInsightsRow] = useState<RiskRow | null>(null);
  const [analysisRow, setAnalysisRow] = useState<RiskRow | null>(null);

  const now = new Date();
  const timestamp = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) + ", " + now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

  const filteredRows = useMemo(() => {
    return rows.filter(r => {
      if (filters.riskType !== "all" && r.riskType !== filters.riskType) return false;
      if (filters.severity !== "all" && r.severity !== filters.severity) return false;
      if (filters.priority !== "all" && r.priority !== filters.priority) return false;
      if (filters.status !== "all" && r.status !== filters.status) return false;
      if (filters.country !== "all" && r.msoCountry !== filters.country) return false;
      if (filters.category !== "all" && r.category !== filters.category) return false;
      if (filters.assignedTo !== "all" && r.assignedTo !== filters.assignedTo) return false;
      if (r.expectedLossCases < filters.lossRange[0] || r.expectedLossCases > filters.lossRange[1]) return false;
      if (filters.search) {
        const s = filters.search.toLowerCase();
        if (!r.mrdrDescription.toLowerCase().includes(s) && !String(r.riskId).includes(s)) return false;
      }
      return true;
    });
  }, [rows, filters]);

  const handleUpdateRow = (idx: number, updates: Partial<RiskRow>) => {
    const actualRow = filteredRows[idx];
    const globalIdx = rows.findIndex(r => r.riskId === actualRow.riskId);
    if (globalIdx === -1) return;
    setRows(prev => {
      const next = [...prev];
      next[globalIdx] = { ...next[globalIdx], ...updates };
      return next;
    });
  };

  const handleOpenAnalysis = (row: RiskRow) => {
    setAnalysisRow(row);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col gradient-mesh">
      {/* Command Center Header */}
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center tech-glow">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground">Risk Monitor</span>
            <Badge className="bg-success/15 text-success border-success/30 text-[10px] font-semibold pulse-glow-green">
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-success inline-block animate-pulse" />
              Live
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-primary">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-primary">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <div className="h-6 w-px bg-border" />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive pulse-glow-red" />
          </Button>
          <div className="flex items-center gap-2 ml-1 bg-secondary/60 rounded-lg px-3 py-1.5 border border-border/50">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary-foreground">JS</span>
            </div>
            <span className="text-xs font-medium text-foreground">John Smith</span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground ml-1">
            <Clock className="h-3 w-3" /> {timestamp}
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Risk Monitor</span>
          </nav>


          <AlertsSection />
          <UnifiedFilters filters={filters} onChange={setFilters} maxLoss={890000} />
          <DetailedRiskTable data={filteredRows} onOpenInsights={setInsightsRow} onUpdateRow={handleUpdateRow} onOpenAnalysis={handleOpenAnalysis} />
        </div>
      </main>

      {insightsRow && <InsightsPanel key={insightsRow.riskId} row={insightsRow} onClose={() => setInsightsRow(null)} />}
      {analysisRow && <RiskAnalysisPanel key={analysisRow.riskId} row={analysisRow} onClose={() => setAnalysisRow(null)} />}
      <RiskAIAgent />
    </div>
  );
}
