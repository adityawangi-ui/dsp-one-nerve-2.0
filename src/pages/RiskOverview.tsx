import { useState, useMemo } from "react";
import { riskData, RiskRow } from "@/data/riskData";
import { Home, ChevronRight } from "lucide-react";
import AlertsSection from "@/components/risk-os/AlertsSection";
import UnifiedFilters, { FilterState, defaultFilters } from "@/components/risk-os/UnifiedFilters";
import DetailedRiskTable from "@/components/risk-os/DetailedRiskTable";
import InsightsPanel from "@/components/risk-os/InsightsPanel";
import RiskAIAgent from "@/components/risk-os/RiskAIAgent";

export default function RiskOverview() {
  const [rows, setRows] = useState<RiskRow[]>([...riskData]);
  const maxLoss = useMemo(() => Math.max(...rows.map(r => r.expectedLossCases)), [rows]);
  const [filters, setFilters] = useState<FilterState>(() => ({ ...defaultFilters, lossRange: [0, Math.max(...riskData.map(r => r.expectedLossCases))] }));
  const [insightsRow, setInsightsRow] = useState<RiskRow | null>(null);

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

  return (
    <div className="gradient-mesh p-6 space-y-5 min-h-full">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <a href="/" className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
          <Home className="h-3 w-3" />
          Home
        </a>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">Risk Monitor</span>
      </nav>
      <AlertsSection />
      <UnifiedFilters filters={filters} onChange={setFilters} maxLoss={maxLoss} />
      <DetailedRiskTable data={filteredRows} onOpenInsights={setInsightsRow} onUpdateRow={handleUpdateRow} />
      {insightsRow && <InsightsPanel row={insightsRow} onClose={() => setInsightsRow(null)} />}
      <RiskAIAgent />
    </div>
  );
}
