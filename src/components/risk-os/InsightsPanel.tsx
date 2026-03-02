import { useState, useRef, useMemo } from "react";
import { RiskRow, riskData } from "@/data/riskData";
import { X, Package, Calendar, TrendingDown, Truck, Factory, BarChart3, Database, Table2, ToggleLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line, Legend, AreaChart, Area, ReferenceLine } from "recharts";
import { Badge } from "@/components/ui/badge";

const COLORS = [
  "hsl(200, 80%, 50%)", "hsl(200, 60%, 65%)", "hsl(160, 60%, 45%)", "hsl(35, 90%, 55%)",
  "hsl(0, 70%, 55%)", "hsl(270, 50%, 55%)", "hsl(200, 90%, 40%)", "hsl(120, 50%, 45%)"
];

const sections = [
  { id: "ctp", title: "Exception Daily/Weekly CTP", icon: Table2 },
  { id: "stock", title: "Stock Info / Inventory", icon: Package },
  { id: "doh", title: "DOH (Day & Quantity)", icon: Calendar },
  { id: "forecast", title: "Forecast / Promo Details", icon: BarChart3 },
  { id: "sto", title: "STO Data (Top 5)", icon: Truck },
  { id: "production", title: "Production Data", icon: Factory },
  { id: "master", title: "Master Data", icon: Database },
  { id: "dr", title: "Projected DR%", icon: TrendingDown },
];

interface Props { row: RiskRow; onClose: () => void; }

function SectionHeader({ icon: Icon, title, badge }: { icon: React.ElementType; title: string; badge?: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4 text-primary" />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {badge && <Badge variant="outline" className="text-[9px] ml-1">{badge}</Badge>}
    </div>
  );
}

function ChartCard({ children, title, className = "" }: { children: React.ReactNode; title?: string; className?: string }) {
  return (
    <div className={`section-card h-56 flex flex-col overflow-hidden ${className}`}>
      {title && <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{title}</span>}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

function DataTable({ headers, rows, minWidth }: { headers: string[]; rows: (string | number)[][]; minWidth?: string }) {
  return (
    <div className="overflow-x-auto mt-3 border border-border/40 rounded-lg">
      <table className="w-full text-[11px]" style={{ minWidth: minWidth || `${Math.max(headers.length * 110, 600)}px` }}>
        <thead>
          <tr className="bg-gradient-to-r from-secondary to-secondary/80">
            {headers.map(h => <th key={h} className="px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-border/40 hover:bg-primary/[0.02]">
              {r.map((c, j) => <td key={j} className="px-2 py-1.5 whitespace-nowrap font-mono">{typeof c === "number" ? c.toLocaleString() : c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KpiBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="section-card px-3 py-2 flex flex-col items-center">
      <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{label}</span>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}

export default function InsightsPanel({ row, onClose }: Props) {
  const [activeSection, setActiveSection] = useState("ctp");
  const [ctpMode, setCtpMode] = useState<"daily" | "weekly">("daily");
  const contentRef = useRef<HTMLDivElement>(null);

  const mrdrLineItems = useMemo(() => riskData.filter(r => r.mrdr === row.mrdr), [row.mrdr]);
  const lineCount = mrdrLineItems.length;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`insight-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── CTP Data ──
  const ctpDailyWeeks = ["Past", "3/10", "4/10", "5/10", "6/10", "7/10", "8/10", "9/10"];
  const ctpWeeklyWeeks = ["WK-2", "WK-3", "WK-4", "WK-5", "WK-6", "WK-7"];
  const ctpColumns = ctpMode === "daily" ? ctpDailyWeeks : ctpWeeklyWeeks;
  
  const ctpRawData = {
    "Planned Demand": [0, 322, 286, 4, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "Total Supply": [3165, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "Balance (Units)": [3165, 3133, 3131, 3103, 3097, 3056, 3056, 3056, 0, 0, 0, 0, 0, 0],
    "Replenishment Stock (Units)": [0, 455, 512, 543, 537, 496, 558, 619, 0, 0, 0, 0, 0, 0],
    "Max Stock (Units)": [0, 2777, 2811, 2819, 2849, 2844, 2879, 2879, 0, 0, 0, 0, 0, 0],
    "Below RS QTY": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "OOS QTY": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "AboveMax QTY": [3165, 356, 320, 284, 248, 212, 177, 177, 0, 0, 0, 0, 0, 0],
  };
  const ctpMetrics = Object.keys(ctpRawData);
  const ctpChartData = ctpColumns.map((w, i) => ({
    week: w,
    demand: ctpRawData["Planned Demand"][i] || 0,
    supply: ctpRawData["Total Supply"][i] || 0,
    balance: ctpRawData["Balance (Units)"][i] || 0,
  }));

  // ── Stock Data (no first 4 cols, DR% at end) ──
  const stockTableHeaders = ["VF Code - Descr", "Alternate MRDR", "Alternate Stock", "Stock in Cluster", "Current Stock Unrestricted", "Current Stock Restricted", "Blocked Stock", "Quarantine Stock", "Release Date", "Transition Date", "Transition Type", "DR% MSO Level", "DR% MRDR MSO Level", "DR% MRDR Site Level"];
  const stockTableRows = mrdrLineItems.map((item, i) => [
    `SU-${item.msoCountry}-${String(i+1).padStart(2,"0")}`,
    50100 + i, Math.round(500 + Math.random() * 2000),
    Math.round(800 + Math.random() * 3000),
    Math.round(3000 + Math.random() * 5000), Math.round(200 + Math.random() * 1500),
    Math.round(50 + Math.random() * 500), Math.round(10 + Math.random() * 200),
    `2026-02-${String(5 + i).padStart(2, "0")}`,
    `2026-03-${String(10 + i).padStart(2, "0")}`,
    ["Transition", "Phase Out", "—"][i % 3],
    `${(85 + Math.random() * 10).toFixed(1)}%`,
    `${(80 + Math.random() * 15).toFixed(1)}%`,
    `${(70 + Math.random() * 25).toFixed(1)}%`,
  ]);
  
  // Stock type breakdown pie data
  const stockBreakdown = [
    { name: "Unrestricted", value: 45200, fill: COLORS[0] },
    { name: "Restricted", value: 8700, fill: COLORS[1] },
    { name: "Blocked", value: 3200, fill: COLORS[4] },
    { name: "Quarantine", value: 1500, fill: COLORS[3] },
  ];
  const stockBarData = stockBreakdown.map(s => ({ type: s.name, qty: s.value }));

  // ── DOH Data (merged graph, no table) ──
  const dohData = [
    { week: "W 06_2026", doh: 10, qty: 2030 },
    { week: "W 07_2026", doh: 20, qty: 3060 },
    { week: "W 08_2026", doh: 30, qty: 4500 },
  ];

  // ── Forecast / Promo (6 week line trend) ──
  const forecastWeeks = ["WK 1", "WK 2", "WK 3", "WK 4", "WK 5", "WK 6"];
  const forecastData = forecastWeeks.map((w, i) => ({
    week: w,
    baselineForecast: [455, 324, 548, 662, 500, 480][i],
    promoForecast: [680, 766, 545, 54, 400, 350][i],
  }));
  const forecast4WBias = 584;
  const forecast1WBias = "Fb 1";

  // ── STO Data (Top 5 table, no graph) ──
  const stoTableHeaders = ["PO No", "Open PO Qty", "Delivery Date", "Shipment No", "Delivery Number"];
  const stoTableRows = [
    ["4519202784", 1440, "10.02.2026", "15810702", "04252776966"],
    ["4519211572", 840, "05.02.2026", "15811011", "44252788232"],
    ["4519220642", 4752, "16.02.2026", "15811320", "84252799498"],
    ["4519220643", 4752, "16.02.2026", "15811630", "24252810764"],
    ["4519220644", 3200, "18.02.2026", "15811940", "64252821030"],
  ];

  // ── Production Data (2 line items, thousands qty, combined graph) ──
  const prodWeeks = ["WK-16", "WK-17", "WK-18", "WK-19", "WK-20", "WK-21"];
  const prodData = prodWeeks.map((w, i) => ({
    week: w,
    qty: Math.round(5000 + Math.random() * 15000),
    ccu: Math.round(65 + Math.random() * 30),
  }));
  const prodTableHeaders = ["Next Production Week", "Produced In", "Quantity", "CCU % (Before Risk)", "New MRDR"];
  const prodTableRows = [
    ["WK-18-2026", "ICE-UK SU Gloucester", 68102, "78%", row.mrdr],
    ["WK-20-2026", "ICE-UK SU Gloucester", 54300, "82%", 50100 + 1],
  ];

  // ── Master Data (less line items, no graphs) ──
  const masterTableHeaders = ["Material Desc.", "EAN Code", "Site", "Country", "Category", "Orig. Factory", "Type of Code", "MSO", "UOM", "Small C", "Segment", "MRP", "Repack", "Pack Size", "Pack Family", "DRP Planner", "Master Scheduler"];
  const masterTableRows = [
    [row.mrdr, row.gtin, row.site, row.msoCountry, row.category, "DM_SU", "Repack", "DK", row.uom, "AZ21Y", "VIENNETTA", "PLT", row.repackDependency, 16, "PF-100", "piecha, grzegorz", "ICE-UK SU Gloucester"],
  ];

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="ml-auto relative flex w-[95%] h-full bg-background shadow-2xl animate-slide-in-right overflow-hidden">
        {/* Left nav */}
        <div className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
          <div className="p-4 border-b border-sidebar-border shrink-0">
            <p className="text-xs font-semibold text-sidebar-primary-foreground">Insights — MRDR {row.mrdr}</p>
            <p className="text-[10px] text-sidebar-foreground mt-1 truncate">{row.mrdrDescription}</p>
            <p className="text-[10px] text-sidebar-foreground/60 mt-0.5">{lineCount} line item(s)</p>
          </div>
          <nav className="p-2 space-y-0.5 flex-1 overflow-y-auto">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-all text-left ${
                  activeSection === s.id ? "bg-primary/10 text-primary border border-primary/20" : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <s.icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{s.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="h-12 flex items-center justify-between px-5 border-b border-border shrink-0 bg-card">
            <div>
              <span className="text-sm font-semibold text-foreground">Risk Insights</span>
              <span className="text-[11px] text-muted-foreground ml-3">
                MRDR: {row.mrdr} · {row.mrdrDescription} · Site: {row.site} · {row.msoCountry} · {row.riskType}
              </span>
            </div>
            <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div ref={contentRef} className="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-8">

            {/* 1. Exception CTP View */}
            <div id="insight-ctp">
              <div className="flex items-center justify-between mb-3">
                <SectionHeader icon={Table2} title="Exception Daily / Weekly CTP with Projected DR%" />
                <div className="flex rounded-lg border border-border overflow-hidden">
                  <button onClick={() => setCtpMode("daily")} className={`px-3 py-1 text-[10px] font-semibold ${ctpMode === "daily" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>Daily</button>
                  <button onClick={() => setCtpMode("weekly")} className={`px-3 py-1 text-[10px] font-semibold ${ctpMode === "weekly" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>Weekly</button>
                </div>
              </div>
              <ChartCard title="Demand vs Supply vs Balance" className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ctpChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Bar dataKey="demand" fill={COLORS[0]} name="Planned Demand" />
                    <Bar dataKey="supply" fill={COLORS[2]} name="Total Supply" />
                    <Line type="monotone" dataKey="balance" stroke={COLORS[4]} strokeWidth={2} name="Balance" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <div className="overflow-x-auto mt-3 border border-border/40 rounded-lg">
                <table className="w-full text-[11px]" style={{ minWidth: `${(ctpColumns.length + 2) * 90}px` }}>
                  <thead>
                    <tr className="bg-gradient-to-r from-secondary to-secondary/80">
                      <th className="sticky left-0 z-10 bg-secondary px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-32">Part Name</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-bold uppercase text-muted-foreground w-16">Site</th>
                      <th className="px-2 py-1.5 text-left text-[10px] font-bold uppercase text-muted-foreground w-48">Description</th>
                      {ctpColumns.map(w => <th key={w} className="px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{w}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {ctpMetrics.map((metric, mi) => {
                      const vals = ctpRawData[metric as keyof typeof ctpRawData];
                      const sliced = ctpMode === "daily" ? vals.slice(0, 8) : vals.slice(8, 14);
                      return (
                        <tr key={metric} className={`border-b border-border/40 ${metric.includes("Balance") ? "bg-medium/5 font-semibold" : "hover:bg-primary/[0.02]"}`}>
                          {mi === 0 && (
                            <>
                              <td className="sticky left-0 z-10 bg-card px-2 py-1.5 font-mono whitespace-nowrap" rowSpan={ctpMetrics.length}>{row.mrdr}</td>
                              <td className="px-2 py-1.5 whitespace-nowrap" rowSpan={ctpMetrics.length}>A283</td>
                              <td className="px-2 py-1.5 whitespace-nowrap text-[10px]" rowSpan={ctpMetrics.length}>{row.mrdrDescription}</td>
                            </>
                          )}
                          {sliced.map((v, i) => (
                            <td key={i} className="px-2 py-1.5 text-center font-mono">{v.toLocaleString()}</td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Stock Info / Inventory */}
            <div id="insight-stock">
              <SectionHeader icon={Package} title="Stock Info / Inventory" />
              <ChartCard title="Stock Type Breakdown">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockBarData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" tick={{ fontSize: 9 }} />
                    <YAxis dataKey="type" type="category" tick={{ fontSize: 9 }} width={90} />
                    <Tooltip />
                    <Bar dataKey="qty" fill={COLORS[0]}>
                      {stockBarData.map((entry, i) => (
                        <Bar key={i} dataKey="qty" fill={stockBreakdown[i]?.fill || COLORS[0]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <DataTable headers={stockTableHeaders} rows={stockTableRows} minWidth="1800px" />
            </div>

            {/* 3. DOH (merged graph, no table) */}
            <div id="insight-doh">
              <SectionHeader icon={Calendar} title="DOH (Day & Quantity)" />
              <ChartCard title="DOH & Quantity Combined" className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dohData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 9 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Bar yAxisId="left" dataKey="doh" fill={COLORS[0]} name="DOH Days" />
                    <Line yAxisId="right" type="monotone" dataKey="qty" stroke={COLORS[4]} strokeWidth={2} name="Quantity" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>

            {/* 4. Forecast / Promo Details */}
            <div id="insight-forecast">
              <SectionHeader icon={BarChart3} title="Forecast / Promo Details" />
              <div className="grid grid-cols-4 gap-2 mb-3">
                <KpiBox label="4WL Forecast Bias" value={forecast4WBias} />
                <KpiBox label="1WL Forecast Bias" value={forecast1WBias} />
                <KpiBox label="Base Forecast 6W" value={forecastData.reduce((s, d) => s + d.baselineForecast, 0).toLocaleString()} />
                <KpiBox label="Promo Forecast 6W" value={forecastData.reduce((s, d) => s + d.promoForecast, 0).toLocaleString()} />
              </div>
              <ChartCard title="Baseline Forecast vs Promo Forecast (6 Weeks)" className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                    <YAxis tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Line type="monotone" dataKey="baselineForecast" stroke={COLORS[0]} strokeWidth={2} name="Baseline Forecast" dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="promoForecast" stroke={COLORS[3]} strokeWidth={2} name="Promo Forecast" dot={{ r: 3 }} />
                    <ReferenceLine y={forecast4WBias} stroke={COLORS[2]} strokeDasharray="5 5" label={{ value: `4W Bias: ${forecast4WBias}`, fontSize: 9, fill: COLORS[2] }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
              <DataTable
                headers={["Week", "Baseline Forecast", "Promo Forecast"]}
                rows={forecastData.map(d => [d.week, d.baselineForecast, d.promoForecast])}
              />
            </div>

            {/* 5. STO Data (Top 5 table, no graph) */}
            <div id="insight-sto">
              <SectionHeader icon={Truck} title="STO Data" badge="Top 5" />
              <DataTable headers={stoTableHeaders} rows={stoTableRows} minWidth="700px" />
            </div>

            {/* 6. Production Data */}
            <div id="insight-production">
              <SectionHeader icon={Factory} title="Production Data" />
              <ChartCard title="Production Qty & CCU % by Week" className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={prodData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="week" tick={{ fontSize: 9 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 9 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontSize: 9 }} />
                    <Bar yAxisId="left" dataKey="qty" fill={COLORS[0]} name="Production Qty" />
                    <Line yAxisId="right" type="monotone" dataKey="ccu" stroke={COLORS[3]} strokeWidth={2} name="CCU %" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <DataTable headers={prodTableHeaders} rows={prodTableRows} minWidth="700px" />
            </div>

            {/* 7. Master Data (no graphs, less items) */}
            <div id="insight-master">
              <SectionHeader icon={Database} title="Master Data" />
              <DataTable headers={masterTableHeaders} rows={masterTableRows} minWidth="1800px" />
            </div>

            {/* 8. Projected DR% — TBD */}
            <div id="insight-dr">
              <SectionHeader icon={TrendingDown} title="Projected DR%" badge="TBD" />
              <div className="section-card p-8 flex items-center justify-center text-muted-foreground text-sm">
                <span>Projected DR% module is under development — TBD</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
