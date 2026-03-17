import React, { useState, useMemo } from "react";
import { RiskRow, allColumns, frozenColumns, gtinColumns, aggregateByGtin, aggregateByMrdr, mrdrAggColumns, reasonCodes, getSeverityColor, filterOptions } from "@/data/riskData";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { LayoutList, Download, Share2, Plus, Eye, ChevronRight, ChevronDown, ChevronUp, Columns3, Send, Search, ChevronLeft } from "lucide-react";
import insightsIcon from "@/assets/insights-analyse-icon.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Props {
  data: RiskRow[];
  onOpenInsights: (row: RiskRow) => void;
  onUpdateRow: (idx: number, updates: Partial<RiskRow>) => void;
  onOpenAnalysis?: (row: RiskRow) => void;
}

const MRDR_FROZEN_KEYS = ["riskId", "insights", "mrdr", "mrdrDescription", "msoCountry"];
const MRDR_FROZEN_WIDTHS: Record<string, number> = { riskId: 90, insights: 60, mrdr: 120, mrdrDescription: 220, msoCountry: 100 };

export default function DetailedRiskTable({ data, onOpenInsights, onUpdateRow, onOpenAnalysis }: Props) {
  const navigate = useNavigate();
  const [view, setView] = useState<"mrdr" | "gtin">("mrdr");
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
  const [uomFilter, setUomFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const ROWS_PER_PAGE = rowsPerPage;

  // UOM conversion factors relative to CS (cases)
  const uomConversionFactors: Record<string, number> = { CS: 1, EA: 12, KG: 0.5, L: 0.75, PAL: 0.02 };
  const [displayUom, setDisplayUom] = useState<string>("CS");

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const mrdrAggDataRaw = useMemo(() => {
    const agg = aggregateByMrdr(data);
    if (uomFilter === "all") return agg;
    return agg.filter(a => a.uom === uomFilter);
  }, [data, uomFilter]);

  const mrdrAggData = useMemo(() => {
    if (!sortCol) return mrdrAggDataRaw;
    return [...mrdrAggDataRaw].sort((a, b) => {
      const va = (a as any)[sortCol];
      const vb = (b as any)[sortCol];
      if (va == null && vb == null) return 0;
      if (va == null) return sortDir === "asc" ? -1 : 1;
      if (vb == null) return sortDir === "asc" ? 1 : -1;
      if (typeof va === "number" && typeof vb === "number") {
        return sortDir === "asc" ? va - vb : vb - va;
      }
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
  }, [mrdrAggDataRaw, sortCol, sortDir]);

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
      boxShadow: isLastFrozen(key) ? "2px 0 8px hsl(0 0% 0% / 0.3)" : undefined,
      backgroundColor: "hsl(var(--secondary))",
    };
  };

  const frozenCellStyle = (key: string, variant: "normal" | "new" | "child" | "childNew" = "normal"): React.CSSProperties => {
    if (!MRDR_FROZEN_KEYS.includes(key)) return {};
    const bgMap = {
      normal: "hsl(var(--card))",
      new: "hsl(var(--new-bg))",
      child: "hsl(var(--muted))",
      childNew: "hsl(var(--new-bg))",
    };
    return {
      position: "sticky",
      left: getFrozenLeft(key),
      zIndex: 10,
      width: MRDR_FROZEN_WIDTHS[key],
      minWidth: MRDR_FROZEN_WIDTHS[key],
      maxWidth: MRDR_FROZEN_WIDTHS[key],
      boxShadow: isLastFrozen(key) ? "2px 0 8px hsl(0 0% 0% / 0.3)" : undefined,
      backgroundColor: bgMap[variant],
    };
  };

  const NewBadge = () => (
    <Badge variant="outline" className="ml-1.5 text-[9px] font-bold uppercase bg-new-bg text-new border-new-border neon-text-amber animate-pulse">NEW</Badge>
  );

  const cellCls = "text-[11px] whitespace-nowrap px-3 py-2.5 font-sans";
  const childCellCls = "text-[11px] whitespace-nowrap px-3 py-2 font-sans";

  // Convert quantity from row's UOM to displayUom
  const convertQty = (value: number, fromUom: string) => {
    if (fromUom === displayUom) return value;
    const fromFactor = uomConversionFactors[fromUom] || 1;
    const toFactor = uomConversionFactors[displayUom] || 1;
    return Math.round(value * (fromFactor / toFactor));
  };

  return (
    <div className="section-card overflow-hidden py-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground">{data.length} items</span>
          <div className="flex items-center gap-1 ml-1">
            <span className="text-[10px] text-muted-foreground">UOM:</span>
            <Select value={displayUom} onValueChange={(v) => setDisplayUom(v)}>
              <SelectTrigger className="h-6 min-w-[70px] text-[10px] font-semibold border-border/40 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["CS", "EA", "KG", "L", "PAL"].map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {(["mrdr", "gtin"] as const).map(v => (
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
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader><DialogTitle>Add New Risk</DialogTitle></DialogHeader>
              <AddRiskForm onAdd={(newRow) => { onUpdateRow(-1, newRow); setAddDialog(false); toast.success("New risk added successfully"); }} onCancel={() => setAddDialog(false)} />
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
          <table className="w-full text-left" style={{ minWidth: "2800px", borderSpacing: 0 }}>
            <thead className="sticky top-0 z-30" style={{ backgroundColor: "hsl(var(--secondary))", boxShadow: "0 2px 0 hsl(var(--border))" }}>
              <tr style={{ backgroundColor: "hsl(var(--secondary))" }}>
                {shareMode && <th className="bg-secondary w-10 px-2 sticky left-0 z-40 border-b border-border" />}
                {mrdrAggColumns.map(col => (
                  <th
                    key={col.key}
                    className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-3 cursor-pointer hover:text-foreground select-none border-b border-border bg-secondary"
                    style={{ width: col.width, ...frozenHeaderStyle(col.key) }}
                    onClick={() => col.key !== "insights" && col.key !== "uom" && toggleSort(col.key)}
                  >
                    {col.key === "uom" ? (
                      <Select value={uomFilter} onValueChange={setUomFilter}>
                        <SelectTrigger className="h-6 min-w-[60px] text-[10px] font-semibold uppercase border-border/40 bg-secondary">
                          <SelectValue placeholder="UOM" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Base UOM</SelectItem>
                          {["CS", "EA", "KG", "L", "PAL"].map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    ) : col.key === "insights" ? (
                      <span className="flex items-center justify-center gap-1.5" title="Insights & Analyse">
                        <img src={insightsIcon} alt="Insights & Analyse" className="h-5 w-5 drop-shadow-md brightness-110 contrast-110" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Analyse</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        {col.label}
                        {sortCol === col.key && (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(() => {
                const totalPages = Math.ceil(mrdrAggData.length / ROWS_PER_PAGE);
                const paginatedData = mrdrAggData.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);
                return paginatedData;
              })().map((agg) => {
                const expanded = expandedMrdrs.has(agg.mrdr);
                const childRows = data.filter(r => r.mrdr === agg.mrdr);
                const hasMultiple = agg.lineCount > 1;
                const rowNewVariant = agg.isNew ? "new" : "normal";

                return (
                  <React.Fragment key={agg.mrdr}>
                    <tr className={`border-b border-border/50 data-row-hover transition-colors ${agg.isNew ? "risk-detect-pulse" : ""}`}
                        style={{ backgroundColor: agg.isNew ? "hsl(var(--new-bg))" : "hsl(var(--card))", height: "44px" }}>
                      {shareMode && (
                        <td className="px-2 border-b border-border/50" style={{ position: "sticky", left: 0, zIndex: 10, backgroundColor: agg.isNew ? "hsl(var(--new-bg))" : "hsl(var(--card))" }}>
                          <Checkbox checked={selectedRows.has(agg.mrdr)} onCheckedChange={(c) => {
                            const next = new Set(selectedRows);

                            if (c) next.add(agg.mrdr); else next.delete(agg.mrdr);
                            setSelectedRows(next);
                          }} />
                        </td>
                      )}
                      {/* Risk ID - frozen */}
                      <td className={cellCls} style={frozenCellStyle("riskId", rowNewVariant)}>
                        <span>{agg.riskId}</span>
                        {agg.isNew && <NewBadge />}
                      </td>
                      {/* Insights & Analyse - icon button - frozen */}
                      <td className={cellCls} style={frozenCellStyle("insights", rowNewVariant)}>
                        <button onClick={() => onOpenAnalysis ? onOpenAnalysis(childRows[0]) : navigate(`/risk-analysis?riskId=${childRows[0].riskId}`)} className="group/icon flex items-center justify-center p-2 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/15 hover:border-primary/40 hover:shadow-lg transition-all duration-200" title="Insights & Analyse">
                          <img src={insightsIcon} alt="Insights & Analyse" className="h-5 w-5 drop-shadow-md brightness-110 contrast-110 group-hover/icon:scale-110 transition-transform duration-200" />
                        </button>
                      </td>
                      {/* MRDR - frozen, drill-through */}
                      <td className={cellCls} style={frozenCellStyle("mrdr", rowNewVariant)}>
                        <button
                          onClick={() => { if (hasMultiple) { const n = new Set(expandedMrdrs); if (expanded) n.delete(agg.mrdr); else n.add(agg.mrdr); setExpandedMrdrs(n); } }}
                          className={`flex items-center gap-1 ${hasMultiple ? "text-primary font-semibold hover:underline cursor-pointer" : "text-foreground cursor-default"}`}
                        >
                          <span className="w-3 shrink-0 flex items-center justify-center">
                            {hasMultiple && (expanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />)}
                          </span>
                          {agg.mrdr}
                          {hasMultiple && <span className="text-[9px] text-muted-foreground ml-0.5">({agg.lineCount})</span>}
                        </button>
                      </td>
                      {/* MRDR GTIN Description - frozen */}
                      <td className={cellCls} style={frozenCellStyle("mrdrDescription", rowNewVariant)}>{agg.mrdrDescription}</td>
                      {/* MSO Country - frozen */}
                      <td className={cellCls} style={frozenCellStyle("msoCountry", rowNewVariant)}>{agg.msoCountry}</td>
                       {/* Scrollable columns */}
                       <td className={cellCls}>{agg.site}</td>
                       <td className={cellCls}>{agg.category}</td>
                       <td className={cellCls}>{agg.su}</td>
                       <td className={cellCls}><Badge variant="outline" className={`text-[10px] min-w-[90px] text-center justify-center ${agg.riskType === "Out Of Stock" ? "bg-critical-bg text-critical border-critical-border" : "bg-medium-bg text-medium border-medium-border"}`}>{agg.riskType}</Badge></td>
                       <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${sevBadgeClass(agg.severity)}`}>{agg.severity}</Badge></td>
                       <td className={cellCls}><Badge variant="outline" className={`text-[10px] ${priBadgeClass(agg.priority)}`}>{agg.priority}</Badge></td>
                       <td className={cellCls}>{agg.riskHorizon}</td>
                       <td className={cellCls}>{agg.segmentation}</td>
                       <td className={cellCls}>{agg.startedOnWeek}</td>
                       <td className={cellCls}>{agg.endedOnWeek || "—"}</td>
                       <td className={cellCls}>{agg.riskInDays}</td>
                       <td className={cellCls}>{convertQty(agg.expectedLossCases, agg.uom).toLocaleString()}</td>
                       <td className={cellCls}>{displayUom}</td>
                       <td className={cellCls}>€{agg.expectedLossValue.toLocaleString()}</td>
                       <td className={cellCls}>{agg.nextAvailableDate || "—"}</td>
                       <td className={cellCls}>{agg.botReasonCode}</td>
                       <td className={cellCls}>{agg.plannerReasonCode}</td>
                       <td className={cellCls}>{agg.comments || "—"}</td>
                       <td className={cellCls}>{agg.assignedTo}</td>
                       <td className={cellCls}>{agg.promoFlag}</td>
                       <td className={cellCls}>{agg.typeCode}</td>
                       <td className={cellCls}>{agg.repackDependency}</td>
                    </tr>
                    {expanded && childRows.map(cr => {
                      const childVariant = cr.isNew ? "childNew" : "child";
                      const childRowBg = cr.isNew ? "hsl(var(--new-bg))" : "hsl(var(--muted))";
                      return (
                        <tr key={cr.riskId} className="border-b border-border/30" style={{ backgroundColor: childRowBg, height: "40px" }}>
                          {shareMode && <td style={{ position: "sticky", left: 0, zIndex: 10, backgroundColor: childRowBg }} />}
                          <td className={`${childCellCls} pl-6`} style={frozenCellStyle("riskId", childVariant)}>
                            <span className="text-muted-foreground">↳</span> {cr.riskId}
                            {cr.isNew && <NewBadge />}
                          </td>
                          {/* Insights icon - frozen */}
                          <td className={childCellCls} style={frozenCellStyle("insights", childVariant)}>
                            <button onClick={() => onOpenAnalysis ? onOpenAnalysis(cr) : navigate(`/risk-analysis?riskId=${cr.riskId}`)} className="group/icon flex items-center justify-center p-2 rounded-lg bg-primary/5 border border-primary/20 hover:bg-primary/15 hover:border-primary/40 hover:shadow-lg transition-all duration-200" title="Analyse">
                              <img src={insightsIcon} alt="Analyse" className="h-5 w-5 drop-shadow-md brightness-110 contrast-110 group-hover/icon:scale-110 transition-transform duration-200" />
                            </button>
                          </td>
                          <td className={childCellCls} style={frozenCellStyle("mrdr", childVariant)}>
                            <span className="flex items-center gap-1"><span className="w-3 shrink-0" />{cr.mrdr}</span>
                          </td>
                          <td className={childCellCls} style={frozenCellStyle("mrdrDescription", childVariant)}>{cr.mrdrDescription}</td>
                          <td className={childCellCls} style={frozenCellStyle("msoCountry", childVariant)}>{cr.msoCountry}</td>
                           <td className={childCellCls}>{cr.site}</td>
                           <td className={childCellCls}>{cr.category}</td>
                           <td className={childCellCls}>{cr.su}</td>
                           <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${cr.riskType === "Out Of Stock" ? "bg-critical-bg text-critical border-critical-border" : "bg-medium-bg text-medium border-medium-border"}`}>{cr.riskType}</Badge></td>
                           <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${sevBadgeClass(cr.severity)}`}>{cr.severity}</Badge></td>
                           <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${priBadgeClass(cr.priority)}`}>{cr.priority}</Badge></td>
                           <td className={childCellCls}>{cr.riskHorizon}</td>
                           <td className={childCellCls}>{cr.segmentation}</td>
                           <td className={childCellCls}>{cr.startedOnWeek}</td>
                           <td className={childCellCls}>{cr.endedOnWeek || "—"}</td>
                           <td className={childCellCls}>{cr.riskInDays}</td>
                           <td className={childCellCls}>{convertQty(cr.expectedLossCases, cr.uom).toLocaleString()}</td>
                           <td className={childCellCls}>{displayUom}</td>
                           <td className={childCellCls}>€{cr.expectedLossValue.toLocaleString()}</td>
                           <td className={childCellCls}>{cr.nextAvailableDate || "—"}</td>
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
                           <td className={childCellCls}>{cr.comments || "—"}</td>
                           <td className={childCellCls}>{cr.assignedTo}</td>
                           <td className={childCellCls}>{cr.promoFlag}</td>
                           <td className={childCellCls}>{cr.typeCode}</td>
                           <td className={childCellCls}>{cr.repackDependency}</td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
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
                  <React.Fragment key={grow.gtin}>
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
                      <td className={cellCls}>{grow.gtin}</td>
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
                      <td className={cellCls}>{grow.riskInDays}</td>
                      <td className={cellCls}>{grow.stockCS.toLocaleString()}</td>
                      <td className={cellCls}>{grow.expectedLossCases.toLocaleString()}</td>
                      <td className={cellCls}>€{grow.expectedLossValue.toLocaleString()}</td>
                    </tr>
                    {expanded && childRows.map(cr => (
                      <tr key={cr.riskId} className={`border-b border-border/30 ${cr.isNew ? "bg-destructive/[0.06]" : "bg-muted/30"}`}>
                        {shareMode && <td />}
                        <td className={`${childCellCls} pl-8`}>
                          {cr.gtin}
                          {cr.isNew && <NewBadge />}
                        </td>
                        <td className={childCellCls}>{cr.mrdr}</td>
                        <td className={childCellCls}>{cr.msoCountry}</td>
                        <td className={childCellCls}>{cr.site}</td>
                        <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${cr.riskType === "Out Of Stock" ? "bg-critical-bg text-critical border-critical-border" : "bg-medium-bg text-medium border-medium-border"}`}>{cr.riskType}</Badge></td>
                        <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${sevBadgeClass(cr.severity)}`}>{cr.severity}</Badge></td>
                        <td className={childCellCls}><Badge variant="outline" className={`text-[10px] ${priBadgeClass(cr.priority)}`}>{cr.priority}</Badge></td>
                        <td className={childCellCls}>{cr.riskInDays}</td>
                        <td className={childCellCls}>{cr.stockCS.toLocaleString()}</td>
                        <td className={childCellCls}>{cr.expectedLossCases.toLocaleString()}</td>
                        <td className={childCellCls}>€{cr.expectedLossValue.toLocaleString()}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {view === "mrdr" && (() => {
        const totalPages = Math.ceil(mrdrAggData.length / ROWS_PER_PAGE);
        return (
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-muted-foreground">
                Showing {((currentPage - 1) * ROWS_PER_PAGE) + 1}–{Math.min(currentPage * ROWS_PER_PAGE, mrdrAggData.length)} of {mrdrAggData.length}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-muted-foreground">Rows:</span>
                <Select value={String(rowsPerPage)} onValueChange={(v) => { setRowsPerPage(Number(v)); setCurrentPage(1); }}>
                  <SelectTrigger className="h-7 w-[70px] text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 25, 50, 100].map(n => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
                  .reduce<number[]>((acc, page) => {
                    if (acc.length > 0 && page - acc[acc.length - 1] > 1) acc.push(-1);
                    acc.push(page);
                    return acc;
                  }, [])
                  .map((page, i) => page === -1 ? (
                    <span key={`ellipsis-${i}`} className="text-[11px] text-muted-foreground px-1">…</span>
                  ) : (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      className={`h-7 w-7 p-0 text-[11px] ${page === currentPage ? "bg-primary text-primary-foreground" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}
                <Button variant="outline" size="sm" className="h-7 w-7 p-0" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        );
      })()}

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

// ── Add Risk Form ──
function AddRiskForm({ onAdd, onCancel }: { onAdd: (row: Partial<RiskRow>) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    mrdrDescription: "",
    msoCountry: "DE",
    site: "C402",
    riskType: "Out Of Stock" as "Out Of Stock" | "Below RS",
    severity: "S 1",
    priority: "P 1",
    riskHorizon: "Short" as "Short" | "Med" | "Long",
    segmentation: "A" as "A" | "B" | "C" | "D" | "I",
    category: "Personal Care" as "Personal Care" | "Home Care" | "Foods" | "Refreshment",
    uom: "CS" as "CS" | "EA" | "KG" | "L" | "PAL",
    expectedLossCases: 0,
    expectedLossValue: 0,
    stockCS: 0,
    comments: "",
    assignedTo: "",
  });

  const handleSubmit = () => {
    if (!form.mrdrDescription.trim()) { toast.error("Description is required"); return; }
    const newRow: Partial<RiskRow> = {
      riskId: 1100 + Math.floor(Math.random() * 900),
      gtin: 1100000000000 + Math.floor(Math.random() * 100),
      mrdr: 50100 + Math.floor(Math.random() * 100),
      mrdrDescription: form.mrdrDescription,
      msoCountry: form.msoCountry,
      site: form.site,
      su: `SU-${form.msoCountry}-NEW`,
      riskType: form.riskType,
      severity: form.severity,
      priority: form.priority,
      riskHorizon: form.riskHorizon,
      segmentation: form.segmentation,
      startedOnWeek: "2026-W10",
      endedOnWeek: "",
      riskInDays: 0,
      stockCS: form.stockCS,
      expectedLossCases: form.expectedLossCases,
      expectedLossValue: form.expectedLossValue,
      nextAvailableDate: "",
      botReasonCode: "R01",
      plannerReasonCode: "",
      comments: form.comments,
      assignedTo: form.assignedTo,
      insights: "View More",
      promoFlag: "N",
      typeCode: "Standard",
      repackDependency: "N",
      category: form.category,
      status: "Open",
      uom: form.uom,
      isNew: true,
    };
    onAdd(newRow);
  };

  const fieldCls = "h-8 text-xs";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <Label className="text-xs">MRDR Description *</Label>
          <Input value={form.mrdrDescription} onChange={e => setForm(p => ({ ...p, mrdrDescription: e.target.value }))} className={fieldCls + " mt-1"} placeholder="e.g. Dove Body Wash 250ml" />
        </div>
        <div>
          <Label className="text-xs">Country</Label>
          <Select value={form.msoCountry} onValueChange={v => setForm(p => ({ ...p, msoCountry: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent>{["DE", "FR", "IT", "ES", "NL", "PL", "UK"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Site</Label>
          <Select value={form.site} onValueChange={v => setForm(p => ({ ...p, site: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent>{["C400", "C402", "C405", "C410", "C420", "C450"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Risk Type</Label>
          <Select value={form.riskType} onValueChange={(v: any) => setForm(p => ({ ...p, riskType: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="Out Of Stock">Out Of Stock</SelectItem><SelectItem value="Below RS">Below RS</SelectItem></SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Severity</Label>
          <Select value={form.severity} onValueChange={v => setForm(p => ({ ...p, severity: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent>{["S 1", "S 2", "S 3", "S 4", "S 5", "S 6"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Priority</Label>
          <Select value={form.priority} onValueChange={v => setForm(p => ({ ...p, priority: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent>{["P 1", "P 2", "P 3"].map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Category</Label>
          <Select value={form.category} onValueChange={(v: any) => setForm(p => ({ ...p, category: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent>{["Personal Care", "Home Care", "Foods", "Refreshment"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">UOM</Label>
          <Select value={form.uom} onValueChange={(v: any) => setForm(p => ({ ...p, uom: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent>{["CS", "EA", "KG", "L", "PAL"].map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Risk Horizon</Label>
          <Select value={form.riskHorizon} onValueChange={(v: any) => setForm(p => ({ ...p, riskHorizon: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="Short">Short</SelectItem><SelectItem value="Med">Med</SelectItem><SelectItem value="Long">Long</SelectItem></SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Segmentation</Label>
          <Select value={form.segmentation} onValueChange={(v: any) => setForm(p => ({ ...p, segmentation: v }))}>
            <SelectTrigger className={fieldCls + " mt-1"}><SelectValue /></SelectTrigger>
            <SelectContent>{["A", "B", "C", "D", "I"].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs">Expected Loss (Cases)</Label>
          <Input type="number" value={form.expectedLossCases} onChange={e => setForm(p => ({ ...p, expectedLossCases: Number(e.target.value) }))} className={fieldCls + " mt-1"} />
        </div>
        <div>
          <Label className="text-xs">Expected Loss (Value €)</Label>
          <Input type="number" value={form.expectedLossValue} onChange={e => setForm(p => ({ ...p, expectedLossValue: Number(e.target.value) }))} className={fieldCls + " mt-1"} />
        </div>
        <div>
          <Label className="text-xs">Stock (Cases)</Label>
          <Input type="number" value={form.stockCS} onChange={e => setForm(p => ({ ...p, stockCS: Number(e.target.value) }))} className={fieldCls + " mt-1"} />
        </div>
        <div>
          <Label className="text-xs">Assigned To</Label>
          <Input value={form.assignedTo} onChange={e => setForm(p => ({ ...p, assignedTo: e.target.value }))} className={fieldCls + " mt-1"} placeholder="e.g. John Smith" />
        </div>
        <div className="col-span-2">
          <Label className="text-xs">Comments</Label>
          <Input value={form.comments} onChange={e => setForm(p => ({ ...p, comments: e.target.value }))} className={fieldCls + " mt-1"} placeholder="Additional notes..." />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" size="sm" onClick={onCancel}>Cancel</Button>
        <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground" onClick={handleSubmit}>Add Risk</Button>
      </div>
    </div>
  );
}
