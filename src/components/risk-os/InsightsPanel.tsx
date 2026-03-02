import { useState, useRef } from "react";
import { RiskRow } from "@/data/riskData";
import { X, Package, Calendar, TrendingDown, Truck, Factory, BarChart3, Database, Megaphone, Table2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";

const COLORS = [
  "hsl(200, 80%, 50%)", "hsl(200, 60%, 65%)", "hsl(160, 60%, 45%)", "hsl(35, 90%, 55%)",
  "hsl(0, 70%, 55%)", "hsl(270, 50%, 55%)", "hsl(200, 90%, 40%)", "hsl(120, 50%, 45%)"
];

const sections = [
  { id: "stock", title: "Stock Info / Inventory", icon: Package },
  { id: "doh", title: "DOH (Day & Quantity)", icon: Calendar },
  { id: "dr", title: "Projected DR%, Loss 4 WL", icon: TrendingDown },
  { id: "sto", title: "STO Data", icon: Truck },
  { id: "production", title: "Production Data", icon: Factory },
  { id: "forecast", title: "Forecast Data", icon: BarChart3 },
  { id: "master", title: "Master Data", icon: Database },
  { id: "promo", title: "Promo Details", icon: Megaphone },
  { id: "ctp", title: "Exception CTP View", icon: Table2 },
];

const stockBarData = Array.from({ length: 8 }, (_, i) => ({ site: `C${400 + i * 5}`, unrestricted: Math.round(4000 + Math.random() * 5000), restricted: Math.round(500 + Math.random() * 2000), blocked: Math.round(200 + Math.random() * 800) }));
const stockPie = [{ name: "Unrestricted", value: 45200 }, { name: "Restricted", value: 8700 }, { name: "Blocked", value: 3200 }, { name: "Quarantine", value: 1500 }];
const dohData = Array.from({ length: 12 }, (_, i) => ({ week: `W${i + 1}`, doh: Math.round(8 + Math.random() * 20), qty: Math.round(1000 + Math.random() * 5000) }));
const drData = Array.from({ length: 12 }, (_, i) => ({ week: `W${i + 1}`, dr: Math.round(75 + Math.random() * 20), loss: Math.round(100 + Math.random() * 500), variance: Math.round((-5 + Math.random() * 10) * 10) / 10 }));
const stoBarData = Array.from({ length: 8 }, (_, i) => ({ id: `SH-${1000 + i}`, qty: Math.round(500 + Math.random() * 3000), leadTime: Math.round(3 + Math.random() * 12) }));
const prodData = Array.from({ length: 10 }, (_, i) => ({ week: `W${i + 1}`, qty: Math.round(2000 + Math.random() * 6000), ccu: Math.round(65 + Math.random() * 30) }));
const forecastCountries = ["DE", "FR", "IT", "ES", "NL", "PL"];
const forecastData = forecastCountries.map(c => ({ country: c, mso: Math.round(80 + Math.random() * 15), mrdrMso: Math.round(75 + Math.random() * 20), mrdrSite: Math.round(70 + Math.random() * 25) }));
const promoData = Array.from({ length: 6 }, (_, i) => ({ campaign: `PRO-${i + 1}`, volume: Math.round(5000 + Math.random() * 15000), uplift: Math.round((5 + Math.random() * 25) * 10) / 10 }));

const ctpWeeks = ["Past", "10/03", "10/04", "10/05", "10/06", "10/07", "10/08", "10/09", "WK-2", "WK-3", "WK-4", "WK-5", "WK-6", "WK-7", "WK-8"];
const ctpMetrics = ["Planned Demand", "Total Supply", "Balance", "Replenishment Stock", "Max Stock", "Below RS QTY", "OOS QTY", "AboveMax QTY"];
const ctpData = ctpMetrics.map(metric => {
  const row: Record<string, any> = { metric };
  ctpWeeks.forEach(w => { row[w] = Math.round(-500 + Math.random() * 5000); });
  return row;
});
const ctpChartData = ctpWeeks.map(w => ({ week: w, demand: Math.round(1000 + Math.random() * 3000), supply: Math.round(800 + Math.random() * 3500), balance: Math.round(-200 + Math.random() * 2000) }));

// Stock table data (15 rows, 20 columns)
const stockTableHeaders = ["MRDR", "Description", "Site", "MSO", "DR% MSO", "DR% MRDR", "Alt MRDR", "Alt Stock", "Stock>0", "Cluster", "Unrestricted", "Restricted", "Blocked", "Quarantine", "PO Inbound", "PO Number", "PO Qty", "Shipment No", "Shipment Date", "Release Date"];
const stockTableRows = Array.from({ length: 15 }, (_, i) => [
  50001 + i, `Product ${i + 1}`, `C${400 + (i % 5) * 5}`, ["DE", "FR", "IT", "ES", "NL"][i % 5],
  `${(85 + Math.random() * 10).toFixed(1)}%`, `${(80 + Math.random() * 15).toFixed(1)}%`,
  50100 + i, Math.round(500 + Math.random() * 2000), Math.round(Math.random()) ? "Y" : "N",
  ["A", "B", "C"][i % 3], Math.round(3000 + Math.random() * 5000), Math.round(200 + Math.random() * 1500),
  Math.round(50 + Math.random() * 500), Math.round(10 + Math.random() * 200), Math.round(100 + Math.random() * 800),
  `PO-${4000 + i}`, Math.round(200 + Math.random() * 1500), `SH-${2000 + i}`,
  `2025-${String(3 + (i % 6)).padStart(2, "0")}-${String(10 + i).padStart(2, "0")}`,
  `2025-${String(2 + (i % 6)).padStart(2, "0")}-${String(5 + i).padStart(2, "0")}`
]);

// DOH table (15 rows, 3 cols)
const dohTableHeaders = ["Week", "DOH Days", "Quantity"];
const dohTableRows = Array.from({ length: 15 }, (_, i) => [`W${i + 1}`, Math.round(5 + Math.random() * 25), Math.round(1000 + Math.random() * 5000)]);

// DR table (15 rows, 4 cols)
const drTableHeaders = ["Week", "DR%", "Projected Loss Units", "Variance %"];
const drTableRows = Array.from({ length: 15 }, (_, i) => [`W${i + 1}`, `${(75 + Math.random() * 20).toFixed(1)}%`, Math.round(100 + Math.random() * 500), `${(-5 + Math.random() * 10).toFixed(1)}%`]);

// STO table (15 rows, 5 cols)
const stoTableHeaders = ["Shipment No", "Delivery Date", "Open PO No", "Open PO Date", "Open PO Qty"];
const stoTableRows = Array.from({ length: 15 }, (_, i) => [`SH-${1000 + i}`, `2025-03-${String(10 + i).padStart(2, "0")}`, `PO-${3000 + i}`, `2025-02-${String(5 + i).padStart(2, "0")}`, Math.round(200 + Math.random() * 2000)]);

// Production table (15 rows, 6 cols)
const prodTableHeaders = ["Next Prod. Week", "Produced In", "Quantity", "CCU % Before Risk", "Transition Y/N", "New MRDR"];
const factories = ["Hamburg Plant", "Lyon Factory", "Milan Works", "Barcelona Unit", "Rotterdam Facility"];
const prodTableRows = Array.from({ length: 15 }, (_, i) => [`W${i + 1}`, factories[i % 5], Math.round(2000 + Math.random() * 6000), `${(65 + Math.random() * 30).toFixed(0)}%`, Math.random() > 0.5 ? "Y" : "N", 50100 + i]);

// Forecast table (15 rows, 6 cols)
const forecastTableHeaders = ["Country", "DR% MSO", "DR% MRDR MSO", "DR% MRDR Site", "4WL Forecast Bias", "1WL Forecast Bias"];
const forecastTableRows = Array.from({ length: 15 }, (_, i) => {
  const c = ["DE", "FR", "IT", "ES", "NL", "PL", "BE", "AT", "PT", "SE", "DK", "FI", "NO", "CH", "IE"][i];
  return [c, `${(80 + Math.random() * 15).toFixed(1)}%`, `${(75 + Math.random() * 20).toFixed(1)}%`, `${(70 + Math.random() * 25).toFixed(1)}%`, `${(-8 + Math.random() * 16).toFixed(1)}%`, `${(-5 + Math.random() * 10).toFixed(1)}%`];
});

// Master Data table (15 rows, 17 cols)
const masterTableHeaders = ["Material", "EAN", "Site", "Country", "Category", "Orig. Factory", "Type", "MSO", "UOM", "Small C", "Segment", "MRP", "Repack", "Pack Size", "Pack Family", "DRP Planner", "Master Scheduler"];
const masterTableRows = Array.from({ length: 15 }, (_, i) => [
  50001 + i, `11000000000${String(i + 1).padStart(2, "0")}`, `C${400 + (i % 5) * 5}`,
  ["DE", "FR", "IT", "ES", "NL"][i % 5], ["Personal Care", "Home Care", "Foods", "Refreshment"][i % 4],
  factories[i % 5], ["Standard", "Repack", "Component"][i % 3], `MSO-${["DE", "FR", "IT", "ES", "NL"][i % 5]}`,
  "CS", `SC${String(i % 3 + 1).padStart(2, "0")}`, ["A", "B", "C", "D"][i % 4],
  `MRP${String(i % 3 + 1).padStart(2, "0")}`, Math.random() > 0.5 ? "Y" : "N",
  [6, 12, 24, 48][i % 4], `PF-${100 + i}`, `planner${(i % 3) + 1}@co.com`, `sched${(i % 2) + 1}@co.com`
]);

// Promo table (15 rows, 7 cols)
const promoTableHeaders = ["Promo ID", "Start Week", "End Week", "Status", "Volume", "Uplift %", "Type"];
const promoTypes = ["Display", "BOGO", "Discount", "Bundle", "Loyalty"];
const promoTableRows = Array.from({ length: 15 }, (_, i) => [
  `PRO-${1000 + i}`, `W${i + 1}`, `W${i + 3}`, i % 2 === 0 ? "Active" : "Planned",
  Math.round(5000 + Math.random() * 15000), `${(5 + Math.random() * 25).toFixed(1)}%`, promoTypes[i % 5]
]);

interface Props { row: RiskRow; onClose: () => void; }

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <Icon className="h-4 w-4 text-primary" />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
  );
}

function ChartCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="section-card h-48 flex flex-col overflow-hidden">
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
              {r.map((c, j) => <td key={j} className="px-2 py-1.5 whitespace-nowrap font-mono-tech">{typeof c === "number" ? c.toLocaleString() : c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function InsightsPanel({ row, onClose }: Props) {
  const [activeSection, setActiveSection] = useState("stock");
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(`insight-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="ml-auto relative flex w-[95%] h-full bg-background shadow-2xl animate-slide-in-right overflow-hidden">
        {/* Left nav */}
        <div className="w-56 bg-sidebar border-r border-sidebar-border flex flex-col shrink-0">
          <div className="p-4 border-b border-sidebar-border shrink-0">
            <p className="text-xs font-semibold text-sidebar-primary-foreground">Insights for Risk #{row.riskId}</p>
            <p className="text-[10px] text-sidebar-foreground mt-1 truncate">{row.mrdrDescription}</p>
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
              <span className="text-sm font-semibold text-foreground">Risk Insights Dashboard</span>
              <span className="text-[11px] text-muted-foreground ml-3">MRDR: {row.mrdr} · Site: {row.site} · {row.msoCountry}</span>
            </div>
            <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div ref={contentRef} className="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-8">
            {/* Stock Info */}
            <div id="insight-stock">
              <SectionHeader icon={Package} title="Stock Info / Inventory" />
              <div className="grid grid-cols-2 gap-3">
                <ChartCard title="Stock by Site">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stockBarData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="site" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Bar dataKey="unrestricted" stackId="a" fill={COLORS[0]} /><Bar dataKey="restricted" stackId="a" fill={COLORS[1]} /><Bar dataKey="blocked" stackId="a" fill={COLORS[4]} /></BarChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Stock Distribution">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={stockPie} cx="50%" cy="50%" innerRadius={25} outerRadius={45} dataKey="value">{stockPie.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Tooltip /></PieChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <DataTable headers={stockTableHeaders} rows={stockTableRows} minWidth="2200px" />
            </div>

            {/* DOH */}
            <div id="insight-doh">
              <SectionHeader icon={Calendar} title="DOH (Day & Quantity)" />
              <div className="grid grid-cols-2 gap-3">
                <ChartCard title="DOH Trend">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dohData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="week" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Area type="monotone" dataKey="doh" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.2} /></AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Quantity per Week">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dohData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="week" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Bar dataKey="qty" fill={COLORS[1]} /></BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <DataTable headers={dohTableHeaders} rows={dohTableRows} />
            </div>

            {/* DR% */}
            <div id="insight-dr">
              <SectionHeader icon={TrendingDown} title="Projected DR%, Loss 4 WL" />
              <div className="grid grid-cols-2 gap-3">
                <ChartCard title="DR% Projection">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={drData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="week" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Line type="monotone" dataKey="dr" stroke={COLORS[4]} strokeWidth={2} dot={false} /></LineChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Projected Loss">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={drData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="week" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Bar dataKey="loss" fill={COLORS[3]} /></BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <DataTable headers={drTableHeaders} rows={drTableRows} />
            </div>

            {/* STO */}
            <div id="insight-sto">
              <SectionHeader icon={Truck} title="STO Data" />
              <div className="grid grid-cols-2 gap-3">
                <ChartCard title="Open PO Qty">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stoBarData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="id" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Bar dataKey="qty" fill={COLORS[2]} /></BarChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Qty vs Lead Time">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="leadTime" name="Lead Time" tick={{ fontSize: 9 }} /><YAxis dataKey="qty" name="Qty" tick={{ fontSize: 9 }} /><Tooltip /><Scatter data={stoBarData} fill={COLORS[5]} /></ScatterChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <DataTable headers={stoTableHeaders} rows={stoTableRows} />
            </div>

            {/* Production */}
            <div id="insight-production">
              <SectionHeader icon={Factory} title="Production Data" />
              <div className="grid grid-cols-2 gap-3">
                <ChartCard title="Production Quantity">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={prodData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="week" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Area type="monotone" dataKey="qty" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.15} /></AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="CCU %">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={prodData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="week" tick={{ fontSize: 9 }} /><YAxis domain={[50, 100]} tick={{ fontSize: 9 }} /><Tooltip /><Line type="monotone" dataKey="ccu" stroke={COLORS[2]} strokeWidth={2} dot={false} /></LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <DataTable headers={prodTableHeaders} rows={prodTableRows} />
            </div>

            {/* Forecast */}
            <div id="insight-forecast">
              <SectionHeader icon={BarChart3} title="Forecast Data" />
              <div className="grid grid-cols-2 gap-3">
                <ChartCard title="DR% by Country">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="country" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Legend wrapperStyle={{ fontSize: 9 }} /><Bar dataKey="mso" fill={COLORS[0]} name="MSO" /><Bar dataKey="mrdrMso" fill={COLORS[1]} name="MRDR MSO" /><Bar dataKey="mrdrSite" fill={COLORS[2]} name="MRDR Site" /></BarChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Radar">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={forecastData}><PolarGrid stroke="hsl(var(--border))" /><PolarAngleAxis dataKey="country" tick={{ fontSize: 9 }} /><PolarRadiusAxis tick={{ fontSize: 8 }} /><Radar name="MSO" dataKey="mso" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.2} /><Radar name="MRDR Site" dataKey="mrdrSite" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.2} /></RadarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <DataTable headers={forecastTableHeaders} rows={forecastTableRows} />
            </div>

            {/* Master Data */}
            <div id="insight-master">
              <SectionHeader icon={Database} title="Master Data" />
              <div className="grid grid-cols-2 gap-3">
                <ChartCard title="Type of Code">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={[{ name: "Repack", value: 5 }, { name: "Standard", value: 7 }, { name: "Component", value: 3 }]} cx="50%" cy="50%" innerRadius={20} outerRadius={40} dataKey="value" label={{ fontSize: 9 }}>{[COLORS[0], COLORS[2], COLORS[3]].map((c, i) => <Cell key={i} fill={c} />)}</Pie><Tooltip /><Legend wrapperStyle={{ fontSize: 9 }} /></PieChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Segment Distribution">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[{ seg: "A", count: 5 }, { seg: "B", count: 4 }, { seg: "C", count: 3 }, { seg: "D", count: 3 }]}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="seg" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Bar dataKey="count" fill={COLORS[0]} /></BarChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <DataTable headers={masterTableHeaders} rows={masterTableRows} minWidth="1900px" />
            </div>

            {/* Promo */}
            <div id="insight-promo">
              <SectionHeader icon={Megaphone} title="Promo Details" />
              <div className="grid grid-cols-2 gap-3">
                <ChartCard title="Volume by Campaign">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={promoData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="campaign" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Bar dataKey="volume" fill={COLORS[5]} /></BarChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Uplift %">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={promoData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="campaign" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Line type="monotone" dataKey="uplift" stroke={COLORS[3]} strokeWidth={2} /></LineChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <DataTable headers={promoTableHeaders} rows={promoTableRows} />
            </div>

            {/* Exception CTP */}
            <div id="insight-ctp">
              <SectionHeader icon={Table2} title="Exception CTP View" />
              <div className="grid grid-cols-2 gap-3 mb-3">
                <ChartCard title="Demand vs Supply">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ctpChartData.slice(0, 8)}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="week" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Legend wrapperStyle={{ fontSize: 9 }} /><Bar dataKey="demand" fill={COLORS[0]} name="Demand" /><Bar dataKey="supply" fill={COLORS[2]} name="Supply" /></BarChart>
                  </ResponsiveContainer>
                </ChartCard>
                <ChartCard title="Balance Trend">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ctpChartData}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey="week" tick={{ fontSize: 9 }} /><YAxis tick={{ fontSize: 9 }} /><Tooltip /><Area type="monotone" dataKey="balance" stroke={COLORS[3]} fill={COLORS[3]} fillOpacity={0.15} /></AreaChart>
                  </ResponsiveContainer>
                </ChartCard>
              </div>
              <div className="overflow-x-auto border border-border/40 rounded-lg">
                <table className="w-full text-[11px]" style={{ minWidth: "1200px" }}>
                  <thead>
                    <tr className="bg-gradient-to-r from-secondary to-secondary/80">
                      <th className="sticky left-0 z-10 bg-secondary px-2 py-1.5 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground w-36">Metric</th>
                      {ctpWeeks.map(w => <th key={w} className="px-2 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{w}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {ctpData.map((r, i) => (
                      <tr key={i} className={`border-b border-border/40 ${r.metric === "Balance" ? "bg-medium/5" : "hover:bg-primary/[0.02]"}`}>
                        <td className="sticky left-0 z-10 bg-card px-2 py-1.5 font-medium whitespace-nowrap">{r.metric}</td>
                        {ctpWeeks.map(w => <td key={w} className="px-2 py-1.5 text-center font-mono-tech">{r[w]?.toLocaleString()}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
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
