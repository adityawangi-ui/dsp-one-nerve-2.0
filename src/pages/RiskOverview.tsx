import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { riskData, RiskRow } from "@/data/riskData";
import { Home, ChevronRight, Shield, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AlertsSection, { KpiFilterKey } from "@/components/risk-os/AlertsSection";
import UnifiedFilters, { FilterState, defaultFilters } from "@/components/risk-os/UnifiedFilters";
import DetailedRiskTable from "@/components/risk-os/DetailedRiskTable";
import InsightsPanel from "@/components/risk-os/InsightsPanel";
import RiskAIAgent from "@/components/risk-os/RiskAIAgent";
import RiskAnalysisPanel from "@/components/risk-os/RiskAnalysisPanel";
import VisualCentre from "@/components/visual-centre/VisualCentre";
import NotificationBell from "@/components/risk-os/NotificationBell";

export default function RiskOverview() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<RiskRow[]>([...riskData]);
  const maxLoss = 60000000;
  const [filters, setFilters] = useState<FilterState>(() => ({ ...defaultFilters, lossRange: [0, 60000000] }));
  const [insightsRow, setInsightsRow] = useState<RiskRow | null>(null);
  const [analysisRow, setAnalysisRow] = useState<RiskRow | null>(null);
  const [showVisualCentre, setShowVisualCentre] = useState(false);
  const [activeKpi, setActiveKpi] = useState<KpiFilterKey>(null);

  const handleKpiClick = (key: KpiFilterKey) => {
    setActiveKpi(key);
    if (!key) {
      setFilters(prev => ({ ...prev, status: "all", assignedTo: "all", severity: "all" }));
      return;
    }
    switch (key) {
      case "total":
        setFilters(prev => ({ ...defaultFilters, lossRange: [0, 60000000] }));
        break;
      case "past-due":
        setFilters(prev => ({ ...defaultFilters, lossRange: [0, 60000000], status: "all", priority: "P 1" }));
        break;
      case "assigned":
        setFilters(prev => ({ ...defaultFilters, lossRange: [0, 60000000], assignedTo: "Hans Müller" }));
        break;
      case "open":
        setFilters(prev => ({ ...defaultFilters, lossRange: [0, 60000000], status: "Open" }));
        break;
      case "value-at-risk":
        setFilters(prev => ({ ...defaultFilters, lossRange: [10000000, 60000000], severity: "S 1" }));
        break;
      case "volume":
        setFilters(prev => ({ ...defaultFilters, lossRange: [0, 60000000] }));
        break;
    }
  };

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
    if (idx === -1) {
      setRows(prev => [updates as RiskRow, ...prev]);
      return;
    }
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

  const handleNavigateToConversationByRisk = (riskId: number) => {
    navigate(`/risk-analysis?tab=conversations&riskId=${riskId}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col gradient-mesh">
      <header className="h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center tech-glow">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">Risk AI</span>
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
            <Clock className="h-3 w-3" /> {timestamp}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-primary"
            onClick={() => navigate("/risk-correlation")}
          >
            <BarChart3 className="h-3.5 w-3.5" /> Correlation Matrix
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-primary"
            onClick={() => setShowVisualCentre(true)}
          >
            <BarChart3 className="h-3.5 w-3.5" /> Visual Centre
          </Button>
          <div className="h-6 w-px bg-border" />
          <NotificationBell
            onNavigateToConversations={() => navigate('/risk-analysis?tab=conversations')}
            onNavigateToConversationByRisk={handleNavigateToConversationByRisk}
          />
          <div className="flex items-center gap-2 ml-1 bg-secondary/60 rounded-lg px-3 py-1.5 border border-border/50">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary-foreground">JS</span>
            </div>
            <span className="text-xs font-medium text-foreground">John Smith</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="p-4 space-y-2 max-w-[1600px] mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Risk AI</span>
          </nav>

          <AlertsSection activeKpi={activeKpi} onKpiClick={handleKpiClick} />
          <UnifiedFilters filters={filters} onChange={setFilters} maxLoss={60000000} />
          <DetailedRiskTable data={filteredRows} onOpenInsights={setInsightsRow} onUpdateRow={handleUpdateRow} onOpenAnalysis={handleOpenAnalysis} />
        </div>
      </main>

      {insightsRow && <InsightsPanel key={insightsRow.riskId} row={insightsRow} onClose={() => setInsightsRow(null)} />}
      {analysisRow && <RiskAnalysisPanel key={analysisRow.riskId} row={analysisRow} onClose={() => setAnalysisRow(null)} />}
      <RiskAIAgent />
      {showVisualCentre && <VisualCentre onClose={() => setShowVisualCentre(false)} />}
    </div>
  );
}
