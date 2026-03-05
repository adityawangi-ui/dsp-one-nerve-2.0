import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Factory, Warehouse, Store, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface Node {
  id: string;
  label: string;
  type: "factory" | "dc" | "market";
  x: number;
  y: number;
  status: "healthy" | "at-risk" | "disrupted";
  details: string;
}

interface Edge {
  from: string;
  to: string;
  status: "active" | "delayed" | "blocked";
  volume?: string;
}

const nodes: Node[] = [
  { id: "f1", label: "ICE-UK Factory", type: "factory", x: 120, y: 80, status: "at-risk", details: "PU2 at 35% capacity" },
  { id: "f2", label: "DM-SU Repack", type: "factory", x: 120, y: 220, status: "healthy", details: "Operating normally" },
  { id: "f3", label: "ICE-NL Plant", type: "factory", x: 120, y: 360, status: "healthy", details: "Full capacity" },
  { id: "dc1", label: "DC-North", type: "dc", x: 380, y: 60, status: "at-risk", details: "+38% excess stock" },
  { id: "dc2", label: "DC-Central", type: "dc", x: 380, y: 200, status: "disrupted", details: "DOH: 4 days (target 14)" },
  { id: "dc3", label: "DC-South", type: "dc", x: 380, y: 340, status: "healthy", details: "Balanced inventory" },
  { id: "m1", label: "DE Market", type: "market", x: 640, y: 50, status: "at-risk", details: "OOS risk: 78%" },
  { id: "m2", label: "FR Market", type: "market", x: 640, y: 140, status: "disrupted", details: "3 SKUs at risk" },
  { id: "m3", label: "IT Market", type: "market", x: 640, y: 230, status: "healthy", details: "Stable supply" },
  { id: "m4", label: "ES Market", type: "market", x: 640, y: 320, status: "at-risk", details: "New risk detected" },
  { id: "m5", label: "NL Market", type: "market", x: 640, y: 400, status: "healthy", details: "Monitoring" },
];

const edges: Edge[] = [
  { from: "f1", to: "dc1", status: "delayed", volume: "1,200 CS" },
  { from: "f1", to: "dc2", status: "blocked", volume: "0 CS" },
  { from: "f2", to: "dc2", status: "active", volume: "3,400 CS" },
  { from: "f2", to: "dc3", status: "active", volume: "2,100 CS" },
  { from: "f3", to: "dc1", status: "active", volume: "4,500 CS" },
  { from: "f3", to: "dc3", status: "active", volume: "1,800 CS" },
  { from: "dc1", to: "m1", status: "delayed", volume: "800 CS" },
  { from: "dc1", to: "m4", status: "active", volume: "600 CS" },
  { from: "dc2", to: "m1", status: "blocked", volume: "0 CS" },
  { from: "dc2", to: "m2", status: "delayed", volume: "450 CS" },
  { from: "dc2", to: "m3", status: "active", volume: "1,200 CS" },
  { from: "dc3", to: "m3", status: "active", volume: "900 CS" },
  { from: "dc3", to: "m4", status: "active", volume: "750 CS" },
  { from: "dc3", to: "m5", status: "active", volume: "1,100 CS" },
];

const statusColors = {
  healthy: { fill: "hsl(142, 71%, 45%)", glow: "hsl(142, 71%, 45%)" },
  "at-risk": { fill: "hsl(38, 92%, 50%)", glow: "hsl(38, 92%, 50%)" },
  disrupted: { fill: "hsl(0, 72%, 51%)", glow: "hsl(0, 72%, 51%)" },
};

const edgeColors = {
  active: "hsl(142, 71%, 45%)",
  delayed: "hsl(38, 92%, 50%)",
  blocked: "hsl(0, 72%, 51%)",
};

const typeIcons = { factory: Factory, dc: Warehouse, market: Store };

export default function SupplyChainMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getNode = (id: string) => nodes.find(n => n.id === id)!;

  const selected = selectedNode ? getNode(selectedNode) : null;
  const connectedEdges = selectedNode ? edges.filter(e => e.from === selectedNode || e.to === selectedNode) : [];

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-foreground">Supply Chain Network</h3>
          <p className="text-[11px] text-muted-foreground">Real-time flow visualization across factories, DCs, and markets</p>
        </div>
        <div className="flex items-center gap-3">
          {(["healthy", "at-risk", "disrupted"] as const).map(s => (
            <div key={s} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: statusColors[s].fill }} />
              <span className="text-[10px] text-muted-foreground capitalize">{s.replace("-", " ")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* SVG Map */}
        <div className="flex-1 bg-background/50 rounded-xl border border-border overflow-hidden">
          <svg viewBox="0 0 780 460" className="w-full h-auto" style={{ minHeight: 320 }}>
            <defs>
              {/* Glow filters */}
              {(["healthy", "at-risk", "disrupted"] as const).map(s => (
                <filter key={s} id={`glow-${s}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor={statusColors[s].glow} floodOpacity="0.5" />
                </filter>
              ))}
              {/* Animated dash for delayed */}
              <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Column labels */}
            <text x="120" y="30" textAnchor="middle" className="text-[11px] font-semibold" fill="hsl(215, 20%, 55%)" fontFamily="Inter">FACTORIES</text>
            <text x="380" y="30" textAnchor="middle" className="text-[11px] font-semibold" fill="hsl(215, 20%, 55%)" fontFamily="Inter">DISTRIBUTION</text>
            <text x="640" y="30" textAnchor="middle" className="text-[11px] font-semibold" fill="hsl(215, 20%, 55%)" fontFamily="Inter">MARKETS</text>

            {/* Edges */}
            {edges.map((edge, i) => {
              const from = getNode(edge.from);
              const to = getNode(edge.to);
              const isHighlighted = selectedNode && (edge.from === selectedNode || edge.to === selectedNode);
              const opacity = selectedNode ? (isHighlighted ? 1 : 0.15) : 0.6;
              
              return (
                <g key={i}>
                  <line
                    x1={from.x + 30} y1={from.y}
                    x2={to.x - 30} y2={to.y}
                    stroke={edgeColors[edge.status]}
                    strokeWidth={isHighlighted ? 2.5 : 1.5}
                    opacity={opacity}
                    strokeDasharray={edge.status === "blocked" ? "6 4" : edge.status === "delayed" ? "8 4" : "none"}
                  >
                    {edge.status === "delayed" && (
                      <animate attributeName="stroke-dashoffset" values="12;0" dur="1s" repeatCount="indefinite" />
                    )}
                  </line>
                  {isHighlighted && edge.volume && (
                    <text
                      x={(from.x + to.x) / 2}
                      y={(from.y + to.y) / 2 - 8}
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fill="hsl(210, 40%, 80%)"
                      fontWeight="600"
                    >
                      {edge.volume}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map(node => {
              const isHovered = hoveredNode === node.id;
              const isSelected = selectedNode === node.id;
              const dimmed = selectedNode && !isSelected && !connectedEdges.some(e => e.from === node.id || e.to === node.id);
              const colors = statusColors[node.status];
              const r = node.type === "factory" ? 22 : node.type === "dc" ? 20 : 18;

              return (
                <g
                  key={node.id}
                  className="cursor-pointer transition-all"
                  style={{ opacity: dimmed ? 0.2 : 1 }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                >
                  {/* Pulse ring for disrupted */}
                  {node.status === "disrupted" && (
                    <circle cx={node.x} cy={node.y} r={r + 6} fill="none" stroke={colors.fill} strokeWidth="1.5" opacity="0.4">
                      <animate attributeName="r" values={`${r + 4};${r + 12}`} dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.6;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  
                  {/* Node circle */}
                  <circle
                    cx={node.x} cy={node.y} r={isHovered || isSelected ? r + 3 : r}
                    fill="hsl(217, 33%, 17%)"
                    stroke={colors.fill}
                    strokeWidth={isSelected ? 3 : 2}
                    filter={`url(#glow-${node.status})`}
                  />
                  
                  {/* Icon indicator */}
                  <circle cx={node.x} cy={node.y} r={6} fill={colors.fill} opacity="0.8" />

                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y + r + 14}
                    textAnchor="middle"
                    fontSize="9"
                    fontFamily="Inter, sans-serif"
                    fill={isSelected ? "hsl(210, 40%, 98%)" : "hsl(215, 20%, 65%)"}
                    fontWeight={isSelected ? "600" : "400"}
                  >
                    {node.label}
                  </text>

                  {/* Tooltip on hover */}
                  {isHovered && !selectedNode && (
                    <g>
                      <rect x={node.x - 60} y={node.y - r - 32} width="120" height="22" rx="6" fill="hsl(222, 47%, 11%)" stroke="hsl(217, 24%, 20%)" />
                      <text x={node.x} y={node.y - r - 17} textAnchor="middle" fontSize="9" fill="hsl(210, 40%, 90%)" fontFamily="Inter">{node.details}</text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-56 shrink-0 space-y-3">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                {(() => { const Icon = typeIcons[selected.type]; return <Icon className="h-4 w-4 text-primary" />; })()}
                <span className="text-xs font-bold text-foreground">{selected.label}</span>
              </div>
              <Badge
                variant="outline"
                className={`text-[9px] mb-3 ${
                  selected.status === "disrupted" ? "bg-destructive/10 text-destructive border-destructive/30" :
                  selected.status === "at-risk" ? "bg-warning/10 text-warning border-warning/30" :
                  "bg-success/10 text-success border-success/30"
                }`}
              >
                {selected.status === "disrupted" ? <AlertTriangle className="h-3 w-3 mr-1" /> :
                 selected.status === "at-risk" ? <Clock className="h-3 w-3 mr-1" /> :
                 <CheckCircle2 className="h-3 w-3 mr-1" />}
                {selected.status.toUpperCase()}
              </Badge>
              <p className="text-[11px] text-muted-foreground">{selected.details}</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-[10px] font-semibold text-foreground mb-2 uppercase tracking-wider">Connected Flows</p>
              <div className="space-y-2">
                {connectedEdges.map((e, i) => {
                  const other = e.from === selected.id ? getNode(e.to) : getNode(e.from);
                  const direction = e.from === selected.id ? "→" : "←";
                  return (
                    <div key={i} className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{direction} {other.label}</span>
                      <Badge variant="outline" className={`text-[8px] ${
                        e.status === "blocked" ? "text-destructive border-destructive/30" :
                        e.status === "delayed" ? "text-warning border-warning/30" :
                        "text-success border-success/30"
                      }`}>
                        {e.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
