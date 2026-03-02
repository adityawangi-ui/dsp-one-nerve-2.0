import { useState, useMemo } from "react";
import { Filter, RotateCcw, Search, SlidersHorizontal, Settings2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { filterOptions } from "@/data/riskData";

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
  lossRange: [0, 890000],
  search: "",
};

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
  { key: "lossRange", label: "Loss Range" },
  { key: "search", label: "Search" },
] as const;

const defaultVisible = ["market", "category", "riskType", "severity", "priority", "status", "search", "lossRange"];

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  maxLoss: number;
}

export default function UnifiedFilters({ filters, onChange, maxLoss }: Props) {
  const [visibleFilters, setVisibleFilters] = useState<Set<string>>(new Set(defaultVisible));

  const activeCount = useMemo(() => {
    let c = 0;
    for (const [k, v] of Object.entries(filters)) {
      if (k === "lossRange") { if ((v as number[])[0] !== 0 || (v as number[])[1] !== 890000) c++; }
      else if (k === "search") { if (v) c++; }
      else if (v !== "all") c++;
    }
    return c;
  }, [filters, maxLoss]);

  const formatK = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}K` : String(n);
  const sliderMax = 890000;
  const sliderStep = 1000;

  const dropdownFilters = allFilterKeys.filter(f => f.key !== "lossRange" && f.key !== "search" && visibleFilters.has(f.key));

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
          <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 text-muted-foreground" onClick={() => onChange({ ...defaultFilters, lossRange: [0, maxLoss] })}>
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
    </div>
  );
}
