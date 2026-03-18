import { useState, useRef, DragEvent } from "react";
import { RiskRow } from "@/data/riskData";
import { AlertTriangle, Clock, MapPin, Package, GripVertical, User, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type KanbanStatus = "Open" | "In Progress" | "Mitigated" | "Closed";

const columns: { key: KanbanStatus; label: string; color: string; dotColor: string }[] = [
  { key: "Open", label: "Open", color: "border-t-destructive", dotColor: "bg-destructive" },
  { key: "In Progress", label: "In Progress", color: "border-t-warning", dotColor: "bg-warning" },
  { key: "Mitigated", label: "Mitigated", color: "border-t-primary", dotColor: "bg-primary" },
  { key: "Closed", label: "Closed", color: "border-t-success", dotColor: "bg-success" },
];

function mapStatus(status: string): KanbanStatus {
  if (status === "Closed") return "Closed";
  return "Open";
}

const severityColor: Record<string, string> = {
  "S 1": "bg-destructive/15 text-destructive border-destructive/30",
  "S 2": "bg-warning/15 text-warning border-warning/30",
  "S 3": "bg-primary/15 text-primary border-primary/30",
  "S 4": "bg-muted text-muted-foreground border-border",
};

interface Props {
  data: RiskRow[];
  onUpdateRow: (idx: number, updates: Partial<RiskRow>) => void;
  onOpenAnalysis: (row: RiskRow) => void;
}

export default function RiskKanban({ data, onUpdateRow, onOpenAnalysis }: Props) {
  const [kanbanStatuses, setKanbanStatuses] = useState<Record<number, KanbanStatus>>(() => {
    const map: Record<number, KanbanStatus> = {};
    data.forEach(r => { map[r.riskId] = mapStatus(r.status); });
    return map;
  });
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dropTarget, setDropTarget] = useState<KanbanStatus | null>(null);

  const getColumnItems = (col: KanbanStatus) =>
    data.filter(r => (kanbanStatuses[r.riskId] || mapStatus(r.status)) === col);

  const handleDragStart = (e: DragEvent, riskId: number) => {
    setDraggedId(riskId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(riskId));
  };

  const handleDragOver = (e: DragEvent, col: KanbanStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTarget(col);
  };

  const handleDragLeave = () => setDropTarget(null);

  const handleDrop = (e: DragEvent, col: KanbanStatus) => {
    e.preventDefault();
    const riskId = Number(e.dataTransfer.getData("text/plain"));
    if (!riskId) return;
    setKanbanStatuses(prev => ({ ...prev, [riskId]: col }));
    setDropTarget(null);
    setDraggedId(null);

    // Update actual row status for "Closed"
    if (col === "Closed" || col === "Open") {
      const idx = data.findIndex(r => r.riskId === riskId);
      if (idx !== -1) {
        onUpdateRow(idx, { status: col === "Closed" ? "Closed" : "Open" });
      }
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDropTarget(null);
  };

  return (
    <div className="grid grid-cols-4 gap-3 min-h-[500px]">
      {columns.map(col => {
        const items = getColumnItems(col.key);
        const isOver = dropTarget === col.key;
        return (
          <div
            key={col.key}
            className={`flex flex-col rounded-xl border-t-[3px] ${col.color} bg-card/50 border border-border/50 transition-all duration-200 ${isOver ? "ring-2 ring-primary/40 bg-primary/[0.03] scale-[1.01]" : ""}`}
            onDragOver={(e) => handleDragOver(e, col.key)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.key)}
          >
            {/* Column Header */}
            <div className="px-3 py-2.5 border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${col.dotColor}`} />
                <span className="text-xs font-bold text-foreground uppercase tracking-wide">{col.label}</span>
              </div>
              <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-mono">
                {items.length}
              </Badge>
            </div>

            {/* Cards */}
            <div className="flex-1 p-2 space-y-2 overflow-y-auto max-h-[600px] scrollbar-thin">
              {items.length === 0 && (
                <div className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center text-xs text-muted-foreground transition-colors ${isOver ? "border-primary/50 bg-primary/5" : "border-border/40"}`}>
                  Drop risks here
                </div>
              )}
              {items.map(row => (
                <div
                  key={row.riskId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, row.riskId)}
                  onDragEnd={handleDragEnd}
                  className={`group relative rounded-lg border bg-card p-3 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md hover:border-primary/30 ${draggedId === row.riskId ? "opacity-40 scale-95 rotate-1" : "opacity-100"}`}
                >
                  {/* Grip indicator */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-50 transition-opacity">
                    <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>

                  {/* Risk ID + Severity */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <Badge variant="outline" className="text-[9px] font-mono h-4 px-1">
                      RISK-{String(row.riskId).padStart(3, "0")}
                    </Badge>
                    <Badge className={`text-[9px] h-4 px-1.5 border ${severityColor[row.severity] || severityColor["S 4"]}`}>
                      {row.severity}
                    </Badge>
                    {row.priority === "P 1" && (
                      <Badge className="text-[9px] h-4 px-1.5 bg-destructive/10 text-destructive border-destructive/20">
                        {row.priority}
                      </Badge>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-[11px] font-semibold text-foreground leading-tight mb-2 line-clamp-2">
                    {row.mrdrDescription}
                  </p>

                  {/* Risk Type */}
                  <div className="flex items-center gap-1 mb-2">
                    <AlertTriangle className="h-3 w-3 text-destructive/70" />
                    <span className="text-[10px] text-destructive/80 font-medium">{row.riskType}</span>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" />{row.msoCountry}</span>
                    <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />{row.riskInDays}d</span>
                    <span className="flex items-center gap-0.5"><Package className="h-2.5 w-2.5" />{(row.expectedLossCases / 1000).toFixed(0)}K</span>
                  </div>

                  {/* Assignee + Action */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <User className="h-2.5 w-2.5" /> {row.assignedTo.split(" ")[0]}
                    </span>
                    <button
                      onClick={() => onOpenAnalysis(row)}
                      className="flex items-center gap-0.5 text-[10px] text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Analyze <ArrowRight className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
