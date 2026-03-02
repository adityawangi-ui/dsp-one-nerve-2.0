import { useState, useMemo } from "react";
import { RiskRow, allColumns, frozenColumns, gtinColumns, aggregateByGtin, aggregateByMrdr, mrdrAggColumns, reasonCodes, getSeverityColor, filterOptions } from "@/data/riskData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { LayoutList, Download, Share2, Plus, Eye, ChevronRight, ChevronDown, ChevronUp, Columns3, Send } from "lucide-react";
import { toast } from "sonner";

interface Props {
  data: RiskRow[];
  onOpenInsights: (row: RiskRow) => void;
  onUpdateRow: (idx: number, updates: Partial<RiskRow>) => void;
}

const MRDR_FROZEN_KEYS = ["mrdr", "mrdrDescription", "gtin"];
const MRDR_FROZEN_WIDTHS: Record<string, number> = { mrdr: 130, mrdrDescription: 210, gtin: 150 };

export default function DetailedRiskTable({ data, onOpenInsights, onUpdateRow }: Props) {
  const [view, setView] = useState<"mrdr" | "gtin" | "uom">("mrdr");
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [visibleCols, setVisibleCols] = useState<Set<string>>(new Set(allColumns.map(c => c.key)));
  const [shareMode, setShareMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [expandedGtins, setExpandedGtins] = useState<Set<number>>(new Set());
  const [expandedMrdrs, setExpandedMrdrs] = useState<Set<number>>(new Set());
  const [shareDialog, setShareDialog] = useState(false);
  const [shareTo, setShareTo] = useState("");
  const [shareSubject, setShareSubject] = useState("Risk Data Share");
  const [shareMsg, setShareMsg] = useState("");
  const [addDialog, setAddDialog] = useState(false);

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const mrdrAggData = useMemo(() => aggregateByMrdr(data), [data]);
  const gtinData = useMemo(() => aggregateByGtin(data), [data]);

  const uomData = useMemo(() => {
    const map = new Map<string, RiskRow[]>();
    data.forEach(r => {
      if (!map.has(r.uom)) map.set(r.uom, []);
      map.get(r.uom)!.push(r);
    });
    return Array.from(map.entries()).map(([uom, items]) => ({
      uom,
      count: items.length,
      totalStockCS: items.reduce((s, r) => s + r.stockCS, 0),
      totalLossCases: items.reduce((s, r) => s + r.expectedLossCases, 0),
      totalLossValue: items.reduce((s, r) => s + r.expectedLossValue, 0),
      totalRiskDays: items.reduce((s, r) => s + r.riskInDays, 0),
      severity: items.reduce((min, r) => (r.severity < min ? r.severity : min), items[0].severity),
    }));
  }, [data]);

  const sevBadgeClass = (sev: string) => {
    const c = getSeverityColor(sev);
    if (c === "critical") return "bg-critical-bg text-critical border-critical-border";
    if (c === "medium") return "bg-medium-bg text-medium border-medium-border";
    return "bg-low-bg text-low border-low-border";
  };

  const priBadgeClass = (p: string) => p === "P 1" ? "bg-critical-bg text-critical border-critical-border font-bold" : "bg-secondary text-foreground border-border";

  // Frozen column positioning
  const getFrozenLeft = (key: string) => {
    let left = shareMode ? 40 : 0;
    for (const fk of MRDR_FROZEN_KEYS) {
      if (fk === key) return left;
      left += MRDR_FROZEN_WIDTHS[fk];
    }
    return left;
  };

  const isLastFrozen = (key: string) => key === MRDR_FROZEN_KEYS[MRDR_FROZEN_KEYS.length - 1];

  const frozenHeaderStyle = (key: string): React.CSSProperties => {
    if (!MRDR_FROZEN_KEYS.includes(key)) return {};
    return {
      position: "sticky",
      left: getFrozenLeft(key),
      zIndex: 40,
      width: MRDR_FROZEN_WIDTHS[key],
      minWidth: MRDR_FROZEN_WIDTHS[key],
      maxWidth: MRDR_FROZEN_WIDTHS[key],
      boxShadow: isLastFrozen(key) ? "2px 0 4px rgba(0,0,0,0.06)" : undefined,
      backgroundColor: "hsl(var(--secondary))",
    };
  };

  const frozenCellStyle = (key: string, variant: "normal" | "new" | "child" | "childNew" = "normal"): React.CSSProperties => {
    if (!MRDR_FROZEN_KEYS.includes(key)) return {};
    const bgMap = {
      normal: "hsl(var(--card))",
      new: "hsl(0 84% 60% / 0.08)",
      child: "hsl(var(--muted))",
      childNew: "hsl(0 84% 60% / 0.1)",
    };
    return {
      position: "sticky",
      left: getFrozenLeft(key),
      zIndex: 10,
      width: MRDR_FROZEN_WIDTHS[key],
      minWidth: MRDR_FROZEN_WIDTHS[key],
      maxWidth: MRDR_FROZEN_WIDTHS[key],
      boxShadow: isLastFrozen(key) ? "2px 0 4px rgba(0,0,0,0.06)" : undefined,
      backgroundColor: bgMap[variant],
    };
  };

  const NewBadge = () => (
    <Badge variant="outline" className="ml-1.5 text-[9px] font-bold uppercase bg-destructive/10 text-destructive border-destructive/30">NEW</Badge>
  );

  const cellCls = "text-[11px] whitespace-nowrap px-3 py-2.5";
  const childCellCls = "text-[11px] whitespace-nowrap px-3 py-2";

  return (
    <div className="section-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <LayoutList className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Detailed Risk View</span>
          <span className="text-[11px] text-muted-foreground">{data.length} items</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["mrdr", "gtin", "uom"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-[11px] font-semibold uppercase transition-all ${view === v ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground" : "bg-card text-muted-foreground hover:bg-secondary"}`}
              >{v}</button>
            ))}
          </div>

          <Dialog open={addDialog} onOpenChange={setAddDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><Plus className="h-3 w-3" /> Add Risk</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>Add New Risk</DialogTitle></DialogHeader>
              <p className="text-xs text-muted-foreground">Risk creation form — coming soon.</p>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => toast.success(`Exported ${data.length} risk items`)}>
            <Download className="h-3 w-3" /> Export
          </Button>

          <Button
            variant={shareMode ? "default" : "outline"}
            size="sm"
            className={`h-8 text-xs gap-1 ${shareMode ? "bg-primary text-primary-foreground" : ""}`}
            onClick={() => { setShareMode(!shareMode); setSelectedRows(new Set()); }}
          >
            <Share2 className="h-3 w-3" /> {shareMode ? "Cancel" : "Share"}
          </Button>

          {shareMode && selectedRows.size > 0 && (
            <Button size="sm" className="h-8 text-xs gap-1 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground" onClick={() => setShareDialog(true)}>
              <Send className="h-3 w-3" /> Send ({selectedRows.size})
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1"><Columns3 className="h-3 w-3" /> Columns</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader><SheetTitle>Manage Columns</SheetTitle></SheetHeader>
              <div className="space-y-2 mt-4">
                {allColumns.map(col => {
                  const frozen = frozenColumns.includes(col.key);
                  return (
                    <label key={col.key} className="flex items-center gap-2 text-xs">
                      <Checkbox checked={visibleCols.has(col.key)} disabled={frozen} onCheckedChange={(checked) => {
                        const next = new Set(visibleCols);
                        if (checked) next.add(col.key); else next.delete(col.key);
                        setVisibleCols(next);
                      }} />
                      {col.label} {frozen && <span className="text-muted-foreground">(frozen)</span>}
                    </label>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* MRDR View */}
      {view === "mrdr" && (
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-lg border border-border">
          <table className="w-full border-collapse text-left" style={{ minWidth: "1800px" }}>
            <thead className="sticky top-0 z-30">
              <tr>
                {shareMode && <th className="bg-secondary w-10 px-2 sticky left-0 z-40 border-b border-border" />}
                {mrdrAggColumns.map(col => (
                  <th
                    key={col.key}
                    className={`text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 cursor-pointer hover:text-foreground select-none bg-secondary border-b border-border ${isLastFrozen(col.key) ? "" : ""}`}
                    style={{ width: col.width, ...frozenHeaderStyle(col.key) }}
                    onClick={() => toggleSort(col.key)}
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      {sortCol === col.key && (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                    </span>
                  </th>
                ))}
                <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border" style={{ width: 100 }}>Insights</th>
              </tr>
            </thead>
            <tbody>
              {mrdrAggData.map((agg) => {
                const expanded = expandedMrdrs.has(agg.mrdr);
                const childRows = data.filter(r => r.mrdr === agg.mrdr);
                const hasMultiple = agg.lineCount > 1;
                
                return (
                  <>
                    <tr key={agg.mrdr} className={`border-b border-border/50 hover:bg-primary/[0.04] transition-colors ${agg.isNew ? "bg-destructive/[0.05]" : ""}`}>
                      {shareMode && (
                        <td className="px-2 sticky left-0 z-10 bg-card border-b border-border/50">
                          <Checkbox checked={selectedRows.has(agg.mrdr)} onCheckedChange={(c) => {
                            const next = new Set(selectedRows);
                            if (c) next.add(agg.mrdr); else next.delete(agg.mrdr);
                            setSelectedRows(next);
                          }} />
                        </td>
                      )}
                      <td className={cellCls} style={frozenCellStyle("mrdr", agg.isNew)}>
                        <button
                          onClick={() => { if (hasMultiple) { const n = new Set(expandedMrdrs); if (expanded) n.delete(agg.mrdr); else n.add(agg.mrdr); setExpandedMrdrs(n); } }}
                          className={`flex items-center gap-1 font-mono ${hasMultiple ? "text-primary font-semibold hover:underline cursor-pointer" : "text-foreground cursor-default"}`}
                        >
                          {hasMultiple && (expanded ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronRight className="h-3 w-3 shrink-0" />)}
                          {agg.mrdr}
                          {hasMultiple && <span className="text-[9px] text-muted-foreground ml-0.5">({agg.lineCount})</span>}
                        </button>
                        {agg.isNew && <NewBadge />}
                      </td>
                      <td className={cellCls} style={frozenCellStyle("mrdrDescription", agg.isNew)}>{agg.mrdrDescription}</td>
                      <td className={`${cellCls} font-mono`} style={frozenCellStyle("gtin", agg.isNew)}>{agg.gtin}</td>
                      <td className={cellCls}>{agg.msoCountry}</td>
                      <td className={cellCls}>{agg.site}</td>
                      <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${agg.riskType === "Out Of Stock" ? "bg-critical-bg text-critical border-critical-border" : "bg-medium-bg text-medium border-medium-border"}`}>{agg.riskType}</Badge></td>
                      <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${sevBadgeClass(agg.severity)}`}>{agg.severity}</Badge></td>
                      <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${priBadgeClass(agg.priority)}`}>{agg.priority}</Badge></td>
                      <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${agg.status === "Open" ? "bg-info-bg text-info border-info-border" : "bg-low-bg text-low border-low-border"}`}>{agg.status}</Badge></td>
                      <td className={cellCls}>{agg.uom}</td>
                      <td className={cellCls}>{agg.segmentation}</td>
                      <td className={cellCls}>{agg.category}</td>
                      <td className={cellCls}>{agg.startedOnWeek}</td>
                      <td className={`${cellCls} font-mono`}>{agg.riskInDays}</td>
                      <td className={`${cellCls} font-mono`}>{agg.stockCS.toLocaleString()}</td>
                      <td className={`${cellCls} font-mono`}>{agg.expectedLossCases.toLocaleString()}</td>
                      <td className={`${cellCls} font-mono`}>${agg.expectedLossValue.toLocaleString()}</td>
                      <td className={cellCls}>{agg.botReasonCode}</td>
                      <td className={cellCls}>{agg.plannerReasonCode}</td>
                      <td className={cellCls}>{agg.assignedTo}</td>
                      <td className={cellCls}>
                        <button onClick={() => onOpenInsights(childRows[0])} className="flex items-center gap-1 text-primary hover:underline text-[11px]">
                          <Eye className="h-3 w-3" /> View More
                        </button>
                      </td>
                    </tr>
                    {expanded && childRows.map(cr => {
                      const childBg = cr.isNew ? "bg-destructive/[0.06]" : "bg-muted/30";
                      return (
                        <tr key={cr.riskId} className={`border-b border-border/30 ${childBg}`}>
                          {shareMode && <td className="sticky left-0 z-10" />}
                          <td className={`${childCellCls} pl-8 font-mono`} style={frozenCellStyle("mrdr", cr.isNew)}>
                            <span className="text-muted-foreground">↳</span> RID-{cr.riskId}
                            {cr.isNew && <NewBadge />}
                          </td>
                          <td className={childCellCls} style={frozenCellStyle("mrdrDescription", cr.isNew)}>{cr.mrdrDescription}</td>
                          <td className={`${childCellCls} font-mono`} style={frozenCellStyle("gtin", cr.isNew)}>{cr.gtin}</td>
                          <td className={childCellCls}>{cr.msoCountry}</td>
                          <td className={childCellCls}>{cr.site}</td>
                          <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${cr.riskType === "Out Of Stock" ? "bg-critical-bg text-critical border-critical-border" : "bg-medium-bg text-medium border-medium-border"}`}>{cr.riskType}</Badge></td>
                          <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${sevBadgeClass(cr.severity)}`}>{cr.severity}</Badge></td>
                          <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${priBadgeClass(cr.priority)}`}>{cr.priority}</Badge></td>
                          <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${cr.status === "Open" ? "bg-info-bg text-info border-info-border" : "bg-low-bg text-low border-low-border"}`}>{cr.status}</Badge></td>
                          <td className={childCellCls}>{cr.uom}</td>
                          <td className={childCellCls}>{cr.segmentation}</td>
                          <td className={childCellCls}>{cr.category}</td>
                          <td className={childCellCls}>{cr.startedOnWeek}</td>
                          <td className={`${childCellCls} font-mono`}>{cr.riskInDays}</td>
                          <td className={`${childCellCls} font-mono`}>{cr.stockCS.toLocaleString()}</td>
                          <td className={`${childCellCls} font-mono`}>{cr.expectedLossCases.toLocaleString()}</td>
                          <td className={`${childCellCls} font-mono`}>${cr.expectedLossValue.toLocaleString()}</td>
                          <td className={childCellCls}>{cr.botReasonCode}</td>
                          <td className={childCellCls}>
                            <Select value={cr.plannerReasonCode || "none"} onValueChange={(v) => {
                              const idx = data.findIndex(r => r.riskId === cr.riskId);
                              if (idx !== -1) onUpdateRow(idx, { plannerReasonCode: v === "none" ? "" : v });
                            }}>
                              <SelectTrigger className="h-6 min-w-[60px] text-[10px] border-border/40"><SelectValue /></SelectTrigger>
                              <SelectContent>{reasonCodes.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                            </Select>
                          </td>
                          <td className={childCellCls}>{cr.assignedTo}</td>
                          <td className={childCellCls}>
                            <button onClick={() => onOpenInsights(cr)} className="flex items-center gap-1 text-primary hover:underline text-[11px]">
                              <Eye className="h-3 w-3" /> View
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* GTIN View */}
      {view === "gtin" && (
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-lg border border-border">
          <table className="w-full border-collapse text-left" style={{ minWidth: "1000px" }}>
            <thead className="sticky top-0 z-30">
              <tr>
                {shareMode && <th className="w-10 px-2 bg-secondary border-b border-border" />}
                {gtinColumns.map(col => (
                  <th key={col.key} className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gtinData.map((grow) => {
                const expanded = expandedGtins.has(grow.gtin);
                const childRows = data.filter(r => r.gtin === grow.gtin);
                return (
                  <>
                    <tr key={grow.gtin} className="border-b border-border/50 hover:bg-primary/[0.04]">
                      {shareMode && (
                        <td className="px-2">
                          <Checkbox checked={selectedRows.has(grow.gtin)} onCheckedChange={(c) => {
                            const next = new Set(selectedRows);
                            if (c) next.add(grow.gtin); else next.delete(grow.gtin);
                            setSelectedRows(next);
                          }} />
                        </td>
                      )}
                      <td className={`${cellCls} font-mono`}>{grow.gtin}</td>
                      <td className={cellCls}>
                        <button onClick={() => { const n = new Set(expandedGtins); if (expanded) n.delete(grow.gtin); else n.add(grow.gtin); setExpandedGtins(n); }} className="flex items-center gap-1 text-primary font-medium">
                          {expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                          {grow.mrdrCount} MRDR(s)
                        </button>
                      </td>
                      <td className={cellCls}>{grow.msoCountry}</td>
                      <td className={cellCls}>{grow.site}</td>
                      <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${grow.riskType === "Out Of Stock" ? "bg-critical-bg text-critical border-critical-border" : "bg-medium-bg text-medium border-medium-border"}`}>{grow.riskType}</Badge></td>
                      <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${sevBadgeClass(grow.severity)}`}>{grow.severity}</Badge></td>
                      <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${priBadgeClass(grow.priority)}`}>{grow.priority}</Badge></td>
                      <td className={`${cellCls} font-mono`}>{grow.riskInDays}</td>
                      <td className={`${cellCls} font-mono`}>{grow.stockCS.toLocaleString()}</td>
                      <td className={`${cellCls} font-mono`}>{grow.expectedLossCases.toLocaleString()}</td>
                      <td className={`${cellCls} font-mono`}>${grow.expectedLossValue.toLocaleString()}</td>
                    </tr>
                    {expanded && childRows.map(cr => (
                      <tr key={cr.riskId} className={`border-b border-border/30 ${cr.isNew ? "bg-destructive/[0.06]" : "bg-muted/30"}`}>
                        {shareMode && <td />}
                        <td className={`${childCellCls} pl-8 font-mono`}>
                          {cr.gtin}
                          {cr.isNew && <NewBadge />}
                        </td>
                        <td className={`${childCellCls} font-mono`}>{cr.mrdr}</td>
                        <td className={childCellCls}>{cr.msoCountry}</td>
                        <td className={childCellCls}>{cr.site}</td>
                        <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${cr.riskType === "Out Of Stock" ? "bg-critical-bg text-critical border-critical-border" : "bg-medium-bg text-medium border-medium-border"}`}>{cr.riskType}</Badge></td>
                        <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${sevBadgeClass(cr.severity)}`}>{cr.severity}</Badge></td>
                        <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${priBadgeClass(cr.priority)}`}>{cr.priority}</Badge></td>
                        <td className={`${childCellCls} font-mono`}>{cr.riskInDays}</td>
                        <td className={`${childCellCls} font-mono`}>{cr.stockCS.toLocaleString()}</td>
                        <td className={`${childCellCls} font-mono`}>{cr.expectedLossCases.toLocaleString()}</td>
                        <td className={`${childCellCls} font-mono`}>${cr.expectedLossValue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* UOM View */}
      {view === "uom" && (
        <div className="overflow-x-auto overflow-y-auto max-h-[60vh] rounded-lg border border-border">
          <table className="w-full border-collapse text-left" style={{ minWidth: "800px" }}>
            <thead className="sticky top-0 z-30">
              <tr>
                <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border" style={{ width: 80 }}>UOM</th>
                <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border" style={{ width: 90 }}>Item Count</th>
                <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border" style={{ width: 100 }}>Max Severity</th>
                <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border" style={{ width: 100 }}>Total Risk Days</th>
                <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border" style={{ width: 100 }}>Total Stock</th>
                <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border" style={{ width: 130 }}>Total Loss Cases</th>
                <th className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 bg-secondary border-b border-border" style={{ width: 140 }}>Total Loss Value ($)</th>
              </tr>
            </thead>
            <tbody>
              {uomData.map(u => (
                <tr key={u.uom} className="border-b border-border/50 hover:bg-primary/[0.04]">
                  <td className={`${cellCls} font-semibold`}>{u.uom}</td>
                  <td className={`${cellCls} font-mono`}>{u.count}</td>
                  <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${sevBadgeClass(u.severity)}`}>{u.severity}</Badge></td>
                  <td className={`${cellCls} font-mono`}>{u.totalRiskDays}</td>
                  <td className={`${cellCls} font-mono`}>{u.totalStockCS.toLocaleString()}</td>
                  <td className={`${cellCls} font-mono`}>{u.totalLossCases.toLocaleString()}</td>
                  <td className={`${cellCls} font-mono`}>${u.totalLossValue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Share Dialog */}
      <Dialog open={shareDialog} onOpenChange={setShareDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Share Risk Data</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground">To (email)</label>
              <Input value={shareTo} onChange={(e) => setShareTo(e.target.value)} placeholder="recipient@company.com" className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Subject</label>
              <Input value={shareSubject} onChange={(e) => setShareSubject(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Message</label>
              <textarea value={shareMsg} onChange={(e) => setShareMsg(e.target.value)} className="w-full mt-1 rounded-lg border border-input bg-background p-2 text-sm min-h-[80px]" placeholder="Add a message..." />
            </div>
            <p className="text-xs text-muted-foreground">📎 {selectedRows.size} risk item(s) will be attached</p>
            <Button className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground" onClick={() => { setShareDialog(false); setShareMode(false); setSelectedRows(new Set()); toast.success(`Shared ${selectedRows.size} items successfully`); }}>
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
