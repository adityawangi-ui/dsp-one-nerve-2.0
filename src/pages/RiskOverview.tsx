import { useState, useMemo } from "react";
import { riskData, RiskRow } from "@/data/riskData";
import { Home, ChevronRight, Shield, Activity, Zap, Clock, RefreshCw, Download, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AlertsSection from "@/components/risk-os/AlertsSection";
import SituationPanel from "@/components/risk-os/SituationPanel";
import UnifiedFilters, { FilterState, defaultFilters } from "@/components/risk-os/UnifiedFilters";
import DetailedRiskTable from "@/components/risk-os/DetailedRiskTable";
import InsightsPanel from "@/components/risk-os/InsightsPanel";
import RiskAIAgent from "@/components/risk-os/RiskAIAgent";
import RiskAnalysisPanel from "@/components/risk-os/RiskAnalysisPanel";

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
    <div className="min-h-screen bg-[hsl(220,20%,97%)] flex flex-col">
      {/* Modern Top Header */}
      <header className="h-14 border-b border-[hsl(220,13%,91%)] bg-white flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[hsl(220,90%,54%)] flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[hsl(220,25%,10%)]">Risk Monitor</span>
            <Badge className="bg-[hsl(152,60%,94%)] text-[hsl(152,60%,32%)] border-[hsl(152,60%,84%)] text-[10px] font-semibold">Live</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-[hsl(220,10%,46%)]">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-[hsl(220,10%,46%)]">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <div className="h-6 w-px bg-[hsl(220,13%,91%)]" />
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
            <Bell className="h-4 w-4 text-[hsl(220,10%,46%)]" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[hsl(0,72%,51%)]" />
          </Button>
          <div className="flex items-center gap-2 ml-1 bg-[hsl(220,20%,97%)] rounded-lg px-3 py-1.5">
            <div className="h-6 w-6 rounded-full bg-[hsl(220,90%,54%)] flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">JS</span>
            </div>
            <span className="text-xs font-medium text-[hsl(220,25%,10%)]">John Smith</span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-[hsl(220,10%,46%)] ml-1">
            <Clock className="h-3 w-3" /> {timestamp}
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-[hsl(220,10%,46%)]">
            <a href="/" className="hover:text-[hsl(220,90%,54%)] transition-colors cursor-pointer flex items-center gap-1">
              <Home className="h-3 w-3" /> Home
            </a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[hsl(220,25%,10%)] font-medium">Risk Monitor</span>
          </nav>
          <AlertsSection />
          <UnifiedFilters filters={filters} onChange={setFilters} maxLoss={890000} />
          <DetailedRiskTable data={filteredRows} onOpenInsights={setInsightsRow} onUpdateRow={handleUpdateRow} onOpenAnalysis={handleOpenAnalysis} />
        </div>
      </main>

      {insightsRow && <InsightsPanel row={insightsRow} onClose={() => setInsightsRow(null)} />}
      {analysisRow && <RiskAnalysisPanel row={analysisRow} onClose={() => setAnalysisRow(null)} />}
      <RiskAIAgent />
    </div>
  );
}
