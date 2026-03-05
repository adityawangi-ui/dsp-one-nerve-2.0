import { useMemo } from "react";
import { RiskRow } from "@/data/riskData";
import { Grid3X3 } from "lucide-react";

interface Props {
  data: RiskRow[];
}

const severities = ["S 1", "S 2", "S 3", "S 4", "S 5", "S 6"];
const categories = ["Personal Care", "Home Care", "Foods", "Refreshment"];

function getHeatColor(count: number, maxCount: number): string {
  if (count === 0) return "hsl(217, 33%, 17%)";
  const intensity = count / maxCount;
  if (intensity > 0.7) return "hsl(0, 72%, 40%)";
  if (intensity > 0.4) return "hsl(27, 96%, 45%)";
  if (intensity > 0.2) return "hsl(38, 92%, 45%)";
  return "hsl(199, 89%, 35%)";
}

function getTextColor(count: number, maxCount: number): string {
  if (count === 0) return "hsl(215, 20%, 35%)";
  return "hsl(210, 40%, 98%)";
}

export default function RiskHeatMatrix({ data }: Props) {
  const matrix = useMemo(() => {
    const grid: Record<string, Record<string, { count: number; totalLoss: number }>> = {};
    let maxCount = 0;

    severities.forEach(sev => {
      grid[sev] = {};
      categories.forEach(cat => {
        const matching = data.filter(r => r.severity === sev && r.category === cat);
        const count = matching.length;
        const totalLoss = matching.reduce((s, r) => s + r.expectedLossCases, 0);
        grid[sev][cat] = { count, totalLoss };
        if (count > maxCount) maxCount = count;
      });
    });

    return { grid, maxCount };
  }, [data]);

  const countBySeverity = useMemo(() => {
    return severities.map(s => data.filter(r => r.severity === s).length);
  }, [data]);

  const countByCategory = useMemo(() => {
    return categories.map(c => data.filter(r => r.category === c).length);
  }, [data]);

  return (
    <div className="section-card">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center">
          <Grid3X3 className="h-3.5 w-3.5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-foreground">Risk Heat Matrix</h3>
          <p className="text-[11px] text-muted-foreground">Severity × Category distribution</p>
        </div>
        {/* Legend */}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[9px] text-muted-foreground">Low</span>
          <div className="flex gap-0.5">
            {[
              "hsl(199, 89%, 35%)",
              "hsl(38, 92%, 45%)",
              "hsl(27, 96%, 45%)",
              "hsl(0, 72%, 40%)",
            ].map((c, i) => (
              <div key={i} className="h-3 w-6 rounded-sm" style={{ backgroundColor: c }} />
            ))}
          </div>
          <span className="text-[9px] text-muted-foreground">High</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider px-2 py-2 text-left w-20">
                Sev \ Cat
              </th>
              {categories.map((cat, i) => (
                <th key={cat} className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider px-2 py-2 text-center">
                  <div>{cat}</div>
                  <div className="text-[9px] font-mono-tech text-primary mt-0.5">{countByCategory[i]}</div>
                </th>
              ))}
              <th className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider px-2 py-2 text-center w-16">Total</th>
            </tr>
          </thead>
          <tbody>
            {severities.map((sev, si) => (
              <tr key={sev}>
                <td className="text-[11px] font-semibold text-foreground px-2 py-1.5">
                  {sev}
                </td>
                {categories.map(cat => {
                  const cell = matrix.grid[sev][cat];
                  return (
                    <td key={cat} className="px-1.5 py-1.5">
                      <div
                        className="rounded-lg px-3 py-3 text-center transition-all hover:scale-105 cursor-default"
                        style={{
                          backgroundColor: getHeatColor(cell.count, matrix.maxCount),
                          color: getTextColor(cell.count, matrix.maxCount),
                          boxShadow: cell.count > 0 ? `0 0 12px ${getHeatColor(cell.count, matrix.maxCount)}40` : "none",
                        }}
                      >
                        <span className="text-base font-bold font-mono-tech block">{cell.count}</span>
                        {cell.count > 0 && (
                          <span className="text-[8px] opacity-80 block mt-0.5">
                            {cell.totalLoss > 1000 ? `${(cell.totalLoss / 1000).toFixed(0)}K` : cell.totalLoss} cs
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
                <td className="px-2 py-1.5 text-center">
                  <span className="text-xs font-bold font-mono-tech text-foreground">{countBySeverity[si]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
