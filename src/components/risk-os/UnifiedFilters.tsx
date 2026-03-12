import { useState, useMemo } from "react";
import { Filter, RotateCcw, Search, SlidersHorizontal, Settings2, Save, BookmarkCheck, RefreshCw, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { filterOptions } from "@/data/riskData";
import { toast } from "sonner";

export interface FilterState {
  market: string;
  category: string;
  smallC: string;
  mrpController: string;
  plant: string;
  riskType: string;
  severity: string;
  priority: string;
  status: string;
  country: string;
  assignedTo: string;
  lossRange: number[];
  search: string;
}

export const defaultFilters: FilterState = {
  market: "all",
  category: "all",
  smallC: "all",
  mrpController: "all",
  plant: "all",
  riskType: "all",
  severity: "all",
  priority: "all",
  status: "all",
  country: "all",
  assignedTo: "all",
  lossRange: [0, 60000000],
  search: "",
};

interface SavedFilterView {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: number;
}

const allFilterKeys = [
  { key: "market", label: "Market" },
  { key: "category", label: "Category" },
  { key: "smallC", label: "Small C" },
  { key: "mrpController", label: "MRP Controller" },
  { key: "plant", label: "Plant" },
  { key: "riskType", label: "Risk Type" },
  { key: "severity", label: "Severity" },
  { key: "priority", label: "Priority" },
  { key: "status", label: "Status" },
  { key: "country", label: "Country" },
  { key: "assignedTo", label: "Assigned To" },
  { key: "lossRange", label: "Expected Loss Cases" },
  { key: "search", label: "Search" },
] as const;

const defaultVisible = ["market", "category", "riskType", "severity", "priority", "status", "search", "lossRange"];

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  maxLoss: number;
}

const STORAGE_KEY = "risk-ai-saved-filter-views";

function loadSavedViews(): SavedFilterView[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function persistViews(views: SavedFilterView[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
}

export default function UnifiedFilters({ filters, onChange, maxLoss }: Props) {
  const [visibleFilters, setVisibleFilters] = useState<Set<string>>(new Set(defaultVisible));
  const [savedViews, setSavedViews] = useState<SavedFilterView[]>(loadSavedViews);
  const [activeViewId, setActiveViewId] = useState<string | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [viewName, setViewName] = useState("");

  const activeCount = useMemo(() => {
    let c = 0;
    for (const [k, v] of Object.entries(filters)) {
      if (k === "lossRange") { if ((v as number[])[0] !== 0 || (v as number[])[1] !== 60000000) c++; }
      else if (k === "search") { if (v) c++; }
      else if (v !== "all") c++;
    }
    return c;
  }, [filters, maxLoss]);

  const formatK = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n);
  const sliderMax = 60000000;
  const sliderStep = 1000;

  const dropdownFilters = allFilterKeys.filter(f => f.key !== "lossRange" && f.key !== "search" && visibleFilters.has(f.key));

  const handleSaveView = () => {
    if (!viewName.trim()) return;
    const newView: SavedFilterView = {
      id: `view-${Date.now()}`,
      name: viewName.trim(),
      filters: { ...filters },
      createdAt: Date.now(),
    };
    const updated = [...savedViews, newView];
    setSavedViews(updated);
    persistViews(updated);
    setActiveViewId(newView.id);
    setViewName("");
    setSaveDialogOpen(false);
    toast.success(`Filter view "${newView.name}" saved`);
  };

  const handleLoadView = (view: SavedFilterView) => {
    onChange({ ...view.filters });
    setActiveViewId(view.id);
    toast.info(`Loaded filter view "${view.name}"`);
  };

  const handleRefreshView = () => {
    if (!activeViewId) return;
    const view = savedViews.find(v => v.id === activeViewId);
    if (view) {
      // Re-apply the saved filters so new data matching the criteria is captured
      onChange({ ...view.filters });
      toast.success(`Refreshed "${view.name}" — new matching data will appear`);
    }
  };

  const handleDeleteView = (id: string) => {
    const updated = savedViews.filter(v => v.id !== id);
    setSavedViews(updated);
    persistViews(updated);
    if (activeViewId === id) setActiveViewId(null);
    toast.success("Filter view deleted");
  };

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Filters</span>
          {activeCount > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] px-1.5">{activeCount}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Saved Views Dropdown */}
          {savedViews.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs h-7 gap-1">
                  <BookmarkCheck className="h-3 w-3" /> Saved Views
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1 ml-0.5">{savedViews.length}</Badge>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2" align="end">
                <p className="text-xs font-semibold text-foreground mb-2 px-1">Saved Filter Views</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {savedViews.map(view => (
                    <div key={view.id} className={`flex items-center justify-between px-2 py-1.5 rounded-lg cursor-pointer text-xs transition-colors ${
                      activeViewId === view.id ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary/60'
                    }`}>
                      <button className="flex-1 text-left font-medium text-foreground truncate" onClick={() => handleLoadView(view)}>
                        {view.name}
                      </button>
                      <button onClick={() => handleDeleteView(view.id)} className="text-muted-foreground hover:text-destructive ml-2 shrink-0">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}

          {/* Save Current Filter */}
          {activeCount > 0 && (
            <Button variant="outline" size="sm" className="text-xs h-7 gap-1" onClick={() => setSaveDialogOpen(true)}>
              <Save className="h-3 w-3" /> Save View
            </Button>
          )}

          {/* Refresh active view */}
          {activeViewId && (
            <Button variant="outline" size="sm" className="text-xs h-7 gap-1 text-primary" onClick={handleRefreshView} title="Refresh saved view to capture new data">
              <RefreshCw className="h-3 w-3" /> Refresh
            </Button>
          )}

          <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 text-muted-foreground" onClick={() => { onChange({ ...defaultFilters, lossRange: [0, maxLoss] }); setActiveViewId(null); }}>
            <RotateCcw className="h-3 w-3" /> Reset All
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs h-7 gap-1">
                <Settings2 className="h-3 w-3" /> Manage
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="end">
              <p className="text-xs font-semibold text-foreground mb-2">Visible Filters</p>
              <div className="space-y-1.5">
                {allFilterKeys.map(f => (
                  <label key={f.key} className="flex items-center gap-2 text-xs text-foreground cursor-pointer">
                    <Checkbox
                      checked={visibleFilters.has(f.key)}
                      onCheckedChange={(checked) => {
                        const next = new Set(visibleFilters);
                        if (checked) next.add(f.key); else next.delete(f.key);
                        setVisibleFilters(next);
                      }}
                    />
                    {f.label}
                  </label>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Active saved view indicator */}
      {activeViewId && (
        <div className="flex items-center gap-2 mb-3 px-2 py-1.5 rounded-lg bg-primary/5 border border-primary/15">
          <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-primary font-medium">
            Active: {savedViews.find(v => v.id === activeViewId)?.name}
          </span>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {dropdownFilters.map(f => {
          const options = (filterOptions as any)[f.key] || [];
          const val = (filters as any)[f.key] || "all";
          return (
            <div key={f.key}>
              <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-1 block">{f.label}</label>
              <Select value={val} onValueChange={(v) => onChange({ ...filters, [f.key]: v })}>
                <SelectTrigger className="bg-secondary/60 border-border/60 h-9 text-[13px]">
                  <SelectValue placeholder={`All ${f.label}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All {f.label}</SelectItem>
                  {options.map((o: string) => (
                    <SelectItem key={o} value={o}>{o}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        })}

        {visibleFilters.has("lossRange") && (
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-1 flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" /> Loss Range
            </label>
            <div className="flex items-center gap-2">
              <Slider
                value={filters.lossRange}
                onValueChange={(v) => onChange({ ...filters, lossRange: v })}
                min={0}
                max={sliderMax}
                step={sliderStep}
                className="flex-1"
              />
              <span className="text-[11px] font-mono-tech text-foreground whitespace-nowrap">{formatK(filters.lossRange[0])}–{formatK(filters.lossRange[1])}</span>
            </div>
          </div>
        )}

        {visibleFilters.has("search") && (
          <div>
            <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-1 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={filters.search}
                onChange={(e) => onChange({ ...filters, search: e.target.value })}
                placeholder="Search risks…"
                className="pl-9 h-9 text-[13px] bg-secondary/60 border-border/60"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Filter Dialog */}
      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base">
              <Save className="h-4 w-4 text-primary" />
              Save Filter View
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground mb-1 block">View Name</label>
              <Input
                value={viewName}
                onChange={(e) => setViewName(e.target.value)}
                placeholder="e.g. Critical APAC Risks"
                className="h-9 text-sm"
                onKeyDown={(e) => e.key === "Enter" && handleSaveView()}
              />
            </div>
            <div className="bg-secondary/50 rounded-lg p-2.5 space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Active Filters</p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(filters).map(([k, v]) => {
                  if (k === "lossRange") {
                    const lr = v as number[];
                    if (lr[0] === 0 && lr[1] === 60000000) return null;
                    return <Badge key={k} variant="secondary" className="text-[9px]">Loss: {formatK(lr[0])}–{formatK(lr[1])}</Badge>;
                  }
                  if (k === "search" && v) return <Badge key={k} variant="secondary" className="text-[9px]">Search: {v as string}</Badge>;
                  if (v !== "all" && v) return <Badge key={k} variant="secondary" className="text-[9px]">{k}: {v as string}</Badge>;
                  return null;
                })}
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={handleSaveView} disabled={!viewName.trim()}>Save View</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}