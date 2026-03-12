import { useState, useMemo } from "react";
import { RiskRow, riskData } from "@/data/riskData";
import { Package, Calendar, TrendingDown, Truck, Factory, BarChart3, Database, Table2, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line, Legend, PieChart, Pie, Cell, ComposedChart, ReferenceLine } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Theme-token chart palette for consistent contrast
const CHART_BLUE = "hsl(var(--primary))";
const CHART_GREEN = "hsl(var(--success))";
const CHART_AMBER = "hsl(var(--warning))";
const CHART_RED = "hsl(var(--destructive))";
const CHART_PURPLE = "hsl(var(--agent-utility))";
const CHART_CYAN = "hsl(var(--primary-glow))";

const sectionDefinitions: Record<string, string> = {
  ctp: "Detailed view of UNL exceptions report with both daily and weekly demand‑replenishment snapshots, including the projected DR% required to address the exception.",
  stock: "Current inventory levels, transition stock, and DR% information for the primary MRDR and any alternate MRDRs.",
  sto: "Stock Transfer Order details related to the MRDR at the site, including quantities, POs, and expected delivery timelines.",
  production: "Displays the current production plan for the at‑risk MRDR, including scheduled quantities and production dates.",
  doh: "Presents a weekly breakdown showing how many days the existing inventory can cover, along with the corresponding quantity.",
  forecast: "Compares the base forecast with promotional forecast values for the MRDR to highlight demand changes due to promotions.",
  projectedDr: "Indicates the DR% that must be achieved to bring the MRDR item out of risk status.",
  master: "Includes all key master‑data attributes related to the MRDR at risk, such as material parameters, lead times, and planning settings.",
};

const sections = [
  { id: "ctp", title: "Exception Daily/Weekly CTP", icon: Table2 },
  { id: "stock", title: "Stock Info / Inventory", icon: Package },
  { id: "doh", title: "DOH (Day & Quantity)", icon: Calendar },
  { id: "forecast", title: "Forecast / Promo Details", icon: BarChart3 },
  { id: "sto", title: "STO Data (Top 5)", icon: Truck },
  { id: "production", title: "Production Data", icon: Factory },
  { id: "master", title: "Master Data", icon: Database },
];

interface Props { row: RiskRow; }

function SectionHeader({ icon: Icon, title, badge, sectionId, rightContent }: { icon: React.ElementType; title: string; badge?: string; sectionId?: string; rightContent?: React.ReactNode }) {
  const definition = sectionId ? sectionDefinitions[sectionId] : undefined;
  return (
    <div className="flex items-center gap-3 mb-4 rounded-lg border border-border bg-secondary px-3 py-2">
      <div className="h-8 w-8 rounded-md border border-border bg-background flex items-center justify-center">
        <Icon className="h-4 w-4 text-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground leading-none">{title}</h3>
      {badge && <Badge variant="outline" className="text-[10px] ml-1 border-border bg-background text-foreground">{badge}</Badge>}
      {definition && (
        <TooltipProvider delayDuration={200}>
          <UITooltip>
            <TooltipTrigger asChild>
              <button className="ml-1 p-1 rounded-md hover:bg-primary/10 transition-colors group">
                <Eye className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs text-xs leading-relaxed">
              {definition}
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
      )}
      {rightContent && <div className="ml-auto">{rightContent}</div>}
    </div>
  );
}

function ChartCard({ children, title, className = "", contentClassName = "h-52" }: { children: React.ReactNode; title?: string; className?: string; contentClassName?: string }) {
  return (
    <div className={`bg-card rounded-xl border border-border p-4 overflow-hidden ${className}`}>
      {title && <span className="text-xs text-foreground uppercase tracking-widest font-semibold mb-2 block">{title}</span>}
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

function DataTable({ headers, rows, minWidth, highlightRows }: { headers: string[]; rows: (string | number)[][]; minWidth?: string; highlightRows?: number[] }) {
  return (
    <div className="overflow-x-auto mt-4 rounded-xl border border-border bg-card">
      <table className="w-full text-[11px]" style={{ minWidth: minWidth || `${Math.max(headers.length * 110, 600)}px` }}>
        <thead>
          <tr className="bg-secondary border-b border-border">
            {headers.map(h => (
              <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-foreground whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-border/50 hover:bg-secondary/40 ${highlightRows?.includes(i) ? "bg-destructive/10" : ""}`}>
              {r.map((c, j) => (
                <td key={j} className="px-3 py-2 whitespace-nowrap font-sans text-foreground">
                  {typeof c === "number" ? c.toLocaleString() : c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KpiBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 flex flex-col items-center text-center">
      <span className="text-[9px] text-foreground uppercase tracking-wider font-medium">{label}</span>
      <span className="text-base font-bold text-foreground mt-0.5">{value}</span>
    </div>
  );
}

const customTooltipStyle = {
  contentStyle: {
    backgroundColor: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '10px',
    color: 'hsl(var(--popover-foreground))',
    fontSize: '11px',
    padding: '8px 12px',
    boxShadow: 'var(--shadow-card)',
  },
  labelStyle: { color: 'hsl(var(--foreground))', fontWeight: 600, marginBottom: '4px' },
  itemStyle: { color: 'hsl(var(--foreground))', padding: '1px 0' },
};

const axisTickStyle = { fontSize: 10, fill: 'hsl(var(--muted-foreground))' };
const legendStyle = { fontSize: 10, paddingTop: 8 };

export default function InsightsDataTab({ row }: Props) {
  const [activeSection, setActiveSection] = useState("ctp");
  const [ctpMode, setCtpMode] = useState<"daily" | "weekly">("daily");

  const mrdrLineItems = useMemo(() => riskData.filter(r => r.mrdr === row.mrdr), [row.mrdr]);
  const lineCount = mrdrLineItems.length;

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`tab-insight-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ── CTP Data ──
  const ctpDailyWeeks = ["Past", "09-02-26", "10-02-26", "11-02-26", "12-02-26", "13-02-26", "14-02-26", "15-02-26"];
  const ctpWeeklyWeeks = ["WK 8", "WK 9", "WK 10", "WK 11", "WK 12", "WK 13", "WK 14", "WK 15", "WK 16", "WK 17", "WK 18", "WK 19"];
  const ctpColumns = ctpMode === "daily" ? ctpDailyWeeks : ctpWeeklyWeeks;
  
  // Values: daily (8 cols) then weekly (12 cols) = 20 total per metric
  // "OOS" represented as string marker in Below RS row
  const ctpRawData = {
    "Planned Demand":       [0, 3157, 0, 0, 0, 0, 0, 0,   1172, 2676, 2089, 2067, 1255, 1795, 1305, 959, 1620, 1972, 958, 798],
    "Total Supply":         [1680, 0, 0, 336, 0, 0, 0, 0,   6384, 13104, 0, 0, 0, 0, 6384, 0, 0, 0, 0, 0],
    "Balance (Units)":      [1680, -1477, -1477, -1141, -1141, -1141, -1141, -1141,   -2313, 1395, 12410, 10343, 9088, 7293, 5988, 11413, 9793, 7821, 6863, 6065],
    "Replenishment Stock":  [0, 4076, 4303, 4531, 4759, 5937, 5937, 5937,   6408, 6041, 5515, 4722, 4186, 3822, 4265, 4535, 4197, 3388, 3016, 3221],
    "Max Stock":            [0, 29937, 29937, 30653, 30653, 30653, 30653, 30653,   30438, 29222, 31294, 31123, 30782, 30188, 29773, 30390, 30121, 29286, 30403, 31798],
    "Below RS QTY":         [0, "OOS", "OOS", "OOS", "OOS", "OOS", "OOS", "OOS",   4016, 1436, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "OOS QTY":              [0, -1477, 0, 0, 0, 0, 0, 0,   -1172, -2082, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "AboveMax QTY":         [1680, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };
  const ctpMetrics = Object.keys(ctpRawData);
  const ctpChartData = ctpColumns.map((w, i) => {
    const offset = ctpMode === "daily" ? 0 : 8;
    return {
      week: w,
      demand: Number(ctpRawData["Planned Demand"][offset + i]) || 0,
      supply: Number(ctpRawData["Total Supply"][offset + i]) || 0,
    };
  });

  // ── Stock Data ──
  const stockTableHeaders = ["VF Code", "Alt MRDR", "Alt Stock", "Cluster Stock", "Unrestricted", "Restricted", "Blocked", "Quarantine", "Release Date", "Transition Date", "Type", "DR% MSO", "DR% MRDR MSO", "DR% MRDR Site"];
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
  
  const stockBreakdown = [
    { name: "Unrestricted", value: 77, fill: CHART_BLUE },
    { name: "Restricted", value: 15, fill: CHART_CYAN },
    { name: "Blocked", value: 5, fill: CHART_RED },
    { name: "Quarantine", value: 3, fill: CHART_AMBER },
  ];

  // ── DOH Data (correlates with CTP weeks W8-W19) ──
  const dohData = [
    { week: "W08", doh: 0, qty: 1680 },
    { week: "W09", doh: 0, qty: 0 },
    { week: "W10", doh: 5, qty: 1395 },
    { week: "W11", doh: 35, qty: 12410 },
    { week: "W12", doh: 31, qty: 10343 },
    { week: "W13", doh: 26, qty: 9088 },
    { week: "W14", doh: 21, qty: 7293 },
    { week: "W15", doh: 17, qty: 5988 },
    { week: "W16", doh: 33, qty: 11413 },
    { week: "W17", doh: 28, qty: 9793 },
    { week: "W18", doh: 22, qty: 7821 },
    { week: "W19", doh: 20, qty: 6863 },
  ];

  // ── Forecast / Promo ──
  const forecastWeeks = ["WK 1", "WK 2", "WK 3", "WK 4", "WK 5", "WK 6"];
  const forecastData = forecastWeeks.map((w, i) => ({
    week: w,
    baselineForecast: [455, 324, 548, 662, 500, 480][i],
    promoForecast: [680, 766, 545, 54, 400, 350][i],
  }));
  const forecast4WBias = 584;
  const forecast1WBias = "Fb 1";

  // ── STO Data ──
  const stoTableHeaders = ["PO No", "Open PO Qty", "Delivery Date", "Shipment No", "Delivery Number"];
  const stoTableRows = [
    ["4519202784", 1440, "10.02.2026", "15810702", "04252776966"],
    ["4519211572", 840, "05.02.2026", "15811011", "44252788232"],
    ["4519220642", 4752, "16.02.2026", "15811320", "84252799498"],
    ["4519220643", 4752, "16.02.2026", "15811630", "24252810764"],
    ["4519220644", 3200, "18.02.2026", "15811940", "64252821030"],
  ];

  // ── Production Data ──
  const prodWeeks = ["WK-16", "WK-17", "WK-18", "WK-19", "WK-20", "WK-21"];
  const prodData = prodWeeks.map((w) => ({
    week: w,
    qty: Math.round(5000 + Math.random() * 15000),
    ccu: Math.round(65 + Math.random() * 30),
  }));
  const prodTableHeaders = ["Next Production Week", "Produced In", "Quantity", "CCU % (Before Risk)", "New MRDR"];
  const prodTableRows = [
    ["WK-18-2026", "ICE-UK SU Gloucester", 68102, "78%", row.mrdr],
    ["WK-20-2026", "ICE-UK SU Gloucester", 54300, "82%", 50100 + 1],
  ];

  // ── Master Data ──
  const masterTableHeaders = ["Material Desc.", "EAN Code", "Site", "Country", "Category", "Orig. Factory", "Type", "MSO", "UOM", "Small C", "Segment", "MRP", "Repack", "Pack Size", "Pack Family", "DRP Planner", "Master Scheduler"];
  const masterTableRows = [
    [String(row.mrdr), row.gtin, row.site, row.msoCountry, row.category, "DM_SU", "Repack", "DK", row.uom, "AZ21Y", "VIENNETTA", "PLT", row.repackDependency, 16, "PF-100", "piecha, grzegorz", "ICE-UK SU Gloucester"],
  ];

  return (
    <div className="flex gap-6">
      {/* Left nav - clean sidebar */}
      <div className="w-52 shrink-0">
        <div className="sticky top-0 rounded-xl bg-card border border-border overflow-hidden">
          <div className="px-4 py-3 bg-secondary border-b border-border">
            <p className="text-xs font-bold text-foreground">MRDR {row.mrdr}</p>
            <p className="text-[10px] text-foreground/90 truncate mt-0.5">{row.mrdrDescription}</p>
            <p className="text-[10px] text-foreground/80 mt-0.5">{lineCount} line item(s)</p>
          </div>
          <nav className="p-2 space-y-1">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium transition-all text-left ${
                  activeSection === s.id
                    ? "bg-primary text-primary-foreground border border-primary/40 shadow-sm"
                    : "text-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <s.icon className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{s.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content - clean continuous flow */}
      <div className="flex-1 min-w-0 space-y-10">

        {/* 1. CTP */}
        <section id="tab-insight-ctp">
          <SectionHeader icon={Table2} title="Exception Daily / Weekly CTP" sectionId="ctp" rightContent={
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button onClick={() => setCtpMode("daily")} className={`px-3 py-1.5 text-[10px] font-semibold transition-colors ${ctpMode === "daily" ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-secondary/80"}`}>Daily</button>
              <button onClick={() => setCtpMode("weekly")} className={`px-3 py-1.5 text-[10px] font-semibold transition-colors ${ctpMode === "weekly" ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-secondary/80"}`}>Weekly</button>
            </div>
          } />
          <ChartCard title="Planned Demand vs Total Supply">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ctpChartData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="week" tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <YAxis tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <Tooltip {...customTooltipStyle} />
                <Legend wrapperStyle={legendStyle} formatter={(value: string) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>} />
                <Bar dataKey="demand" fill={CHART_BLUE} name="Planned Demand" radius={[4, 4, 0, 0]} />
                <Bar dataKey="supply" fill={CHART_GREEN} name="Total Supply" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <div className="overflow-x-auto mt-4 rounded-xl border border-border bg-card">
            <table className="w-full text-[11px]" style={{ minWidth: `${(ctpColumns.length + 3) * 90}px` }}>
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="sticky left-0 z-10 bg-secondary px-3 py-2.5 text-left text-[10px] font-bold uppercase tracking-wider text-foreground w-32">Part Name</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase text-foreground w-16">Site</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-bold uppercase text-foreground w-48">Description</th>
                  {ctpColumns.map(w => <th key={w} className="px-3 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-foreground whitespace-nowrap">{w}</th>)}
                </tr>
              </thead>
              <tbody>
                {ctpMetrics.map((metric, mi) => {
                  const vals = ctpRawData[metric as keyof typeof ctpRawData];
                  const sliced = ctpMode === "daily" ? vals.slice(0, 8) : vals.slice(8, 14);
                  const isBalance = metric.includes("Balance");
                  const isBelowRS = metric.includes("Below RS");
                  return (
                    <tr key={metric} className={`border-b border-border/50 ${isBalance ? "bg-primary/10 font-semibold" : isBelowRS ? "bg-destructive/10" : "hover:bg-secondary/40"}`}>
                      {mi === 0 && (
                        <>
                          <td className="sticky left-0 z-10 bg-card px-3 py-2 font-sans text-foreground whitespace-nowrap" rowSpan={ctpMetrics.length}>{row.mrdr}</td>
                          <td className="px-3 py-2 text-foreground whitespace-nowrap" rowSpan={ctpMetrics.length}>A283</td>
                          <td className="px-3 py-2 text-foreground whitespace-nowrap text-[10px]" rowSpan={ctpMetrics.length}>{row.mrdrDescription}</td>
                        </>
                      )}
                      {sliced.map((v, i) => {
                        const isNegative = isBelowRS && v > 0;
                        return (
                          <td key={i} className={`px-3 py-2 text-center font-sans ${isNegative ? "text-destructive font-bold" : "text-foreground"}`}>
                            {v.toLocaleString()}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Stock Info */}
        <section id="tab-insight-stock">
          <SectionHeader icon={Package} title="Stock Info / Inventory" sectionId="stock" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard title="Stock Type Breakdown" contentClassName="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockBreakdown}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="45%"
                    outerRadius={82}
                    innerRadius={36}
                    label={false}
                    labelLine={false}
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  >
                    {stockBreakdown.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip {...customTooltipStyle} />
                  <Legend verticalAlign="bottom" iconType="circle" iconSize={8} wrapperStyle={legendStyle} formatter={(value: string) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <div className="grid grid-cols-2 gap-3 content-start">
              <KpiBox label="Total Unrestricted" value="4,230" />
              <KpiBox label="Total Restricted" value="824" />
              <KpiBox label="Blocked Stock" value="287" />
              <KpiBox label="Quarantine" value="56" />
            </div>
          </div>
          <DataTable headers={stockTableHeaders} rows={stockTableRows} minWidth="1600px" />
        </section>

        {/* 3. DOH */}
        <section id="tab-insight-doh">
          <SectionHeader icon={Calendar} title="DOH (Day & Quantity)" sectionId="doh" />
          <ChartCard title="DOH & Quantity Combined">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dohData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="week" tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <YAxis yAxisId="left" tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} label={{ value: 'DOH Days', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: 'hsl(var(--muted-foreground))' } }} />
                <YAxis yAxisId="right" orientation="right" tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} label={{ value: 'Quantity', angle: 90, position: 'insideRight', style: { fontSize: 9, fill: 'hsl(var(--muted-foreground))' } }} />
                <Tooltip {...customTooltipStyle} />
                <Legend wrapperStyle={legendStyle} formatter={(value: string) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>} />
                <Bar yAxisId="left" dataKey="doh" fill={CHART_BLUE} name="DOH Days" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="qty" stroke={CHART_AMBER} strokeWidth={2.5} name="Quantity" dot={{ r: 4, fill: CHART_AMBER, stroke: 'hsl(var(--background))', strokeWidth: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        {/* 4. Forecast */}
        <section id="tab-insight-forecast">
          <SectionHeader icon={BarChart3} title="Forecast / Promo Details" sectionId="forecast" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <KpiBox label="4WL Forecast Bias" value={forecast4WBias} />
            <KpiBox label="1WL Forecast Bias" value={forecast1WBias} />
            <KpiBox label="Base Forecast 6W" value={forecastData.reduce((s, d) => s + d.baselineForecast, 0).toLocaleString()} />
            <KpiBox label="Promo Forecast 6W" value={forecastData.reduce((s, d) => s + d.promoForecast, 0).toLocaleString()} />
          </div>
          <ChartCard title="Baseline Forecast vs Promo Forecast (6 Weeks)">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="week" tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <YAxis tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <Tooltip {...customTooltipStyle} />
                <Legend wrapperStyle={legendStyle} formatter={(value: string) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>} />
                <Line type="monotone" dataKey="baselineForecast" stroke={CHART_BLUE} strokeWidth={2.5} name="Baseline Forecast" dot={{ r: 4, fill: CHART_BLUE, stroke: 'hsl(var(--background))', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="promoForecast" stroke={CHART_AMBER} strokeWidth={2.5} name="Promo Forecast" dot={{ r: 4, fill: CHART_AMBER, stroke: 'hsl(var(--background))', strokeWidth: 2 }} />
                <ReferenceLine y={forecast4WBias} stroke={CHART_GREEN} strokeDasharray="5 5" label={{ value: `4W Bias: ${forecast4WBias}`, fontSize: 9, fill: CHART_GREEN }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          
        </section>


        {/* 5. STO */}
        <section id="tab-insight-sto">
          <SectionHeader icon={Truck} title="STO Data" badge="Top 5" sectionId="sto" />
          <DataTable headers={stoTableHeaders} rows={stoTableRows} minWidth="700px" />
        </section>

        {/* 6. Production */}
        <section id="tab-insight-production">
          <SectionHeader icon={Factory} title="Production Data" sectionId="production" />
          <ChartCard title="Production Qty & CCU % by Week">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={prodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="week" tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <YAxis yAxisId="left" tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={axisTickStyle} axisLine={{ stroke: 'hsl(var(--border))' }} />
                <Tooltip {...customTooltipStyle} />
                <Legend wrapperStyle={legendStyle} formatter={(value: string) => <span style={{ color: 'hsl(var(--foreground))' }}>{value}</span>} />
                <Bar yAxisId="left" dataKey="qty" fill={CHART_BLUE} name="Production Qty" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="ccu" stroke={CHART_AMBER} strokeWidth={2.5} name="CCU %" dot={{ r: 4, fill: CHART_AMBER, stroke: 'hsl(var(--background))', strokeWidth: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
          <DataTable headers={prodTableHeaders} rows={prodTableRows} minWidth="700px" />
        </section>

        {/* 7. Master Data */}
        <section id="tab-insight-master">
          <SectionHeader icon={Database} title="Master Data" sectionId="master" />
          <DataTable headers={masterTableHeaders} rows={masterTableRows} minWidth="1800px" />
        </section>

      </div>
    </div>
  );
}
