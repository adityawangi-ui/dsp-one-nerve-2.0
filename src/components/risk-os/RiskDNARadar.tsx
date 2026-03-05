import { RiskRow } from "@/data/riskData";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Dna } from "lucide-react";

interface Props {
  row: RiskRow;
}

export default function RiskDNARadar({ row }: Props) {
  // Generate risk dimensions based on row data
  const sevScore = Math.max(0, 100 - (parseInt(row.severity.replace("S ", "")) - 1) * 18);
  const priScore = row.priority === "P 1" ? 95 : row.priority === "P 2" ? 65 : 35;
  const durationScore = Math.min(100, (row.riskInDays / 30) * 100);
  const lossScore = Math.min(100, (row.expectedLossCases / 900000) * 100);
  const stockScore = row.stockCS === 0 ? 100 : Math.max(0, 100 - (row.stockCS / 1500) * 100);
  const promoScore = row.promoFlag === "Y" ? 85 : 30;

  const radarData = [
    { dimension: "Severity", current: sevScore, benchmark: 50 },
    { dimension: "Priority", current: priScore, benchmark: 50 },
    { dimension: "Duration", current: durationScore, benchmark: 40 },
    { dimension: "Loss Impact", current: lossScore, benchmark: 35 },
    { dimension: "Stock Risk", current: stockScore, benchmark: 45 },
    { dimension: "Promo Impact", current: promoScore, benchmark: 30 },
  ];

  const overallScore = Math.round(radarData.reduce((s, d) => s + d.current, 0) / radarData.length);

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/15 flex items-center justify-center">
            <Dna className="h-3.5 w-3.5 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Risk DNA Profile</h4>
            <p className="text-[10px] text-muted-foreground">Multi-dimensional risk analysis</p>
          </div>
        </div>
        <div className="text-center">
          <span className={`text-2xl font-bold font-mono-tech ${
            overallScore >= 70 ? "text-destructive neon-text-red" :
            overallScore >= 45 ? "text-warning neon-text-amber" :
            "text-success neon-text-green"
          }`}>
            {overallScore}
          </span>
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Risk Score</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="hsl(217, 24%, 25%)" strokeOpacity={0.6} />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{ fontSize: 10, fill: "hsl(215, 20%, 65%)", fontFamily: "Inter" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 8, fill: "hsl(215, 20%, 45%)" }}
              axisLine={false}
            />
            <Radar
              name="Benchmark"
              dataKey="benchmark"
              stroke="hsl(215, 20%, 45%)"
              fill="hsl(215, 20%, 45%)"
              fillOpacity={0.1}
              strokeDasharray="4 4"
              strokeWidth={1}
            />
            <Radar
              name="Current Risk"
              dataKey="current"
              stroke="hsl(199, 89%, 48%)"
              fill="hsl(199, 89%, 48%)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Legend
              wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
              formatter={(value: string) => <span style={{ color: "hsl(215, 20%, 75%)" }}>{value}</span>}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Dimension breakdown */}
      <div className="grid grid-cols-3 gap-2 mt-3">
        {radarData.map(d => (
          <div key={d.dimension} className="bg-secondary/50 rounded-lg px-3 py-2 text-center">
            <span className={`text-sm font-bold font-mono-tech ${
              d.current >= 70 ? "text-destructive" : d.current >= 45 ? "text-warning" : "text-success"
            }`}>
              {d.current}%
            </span>
            <p className="text-[9px] text-muted-foreground mt-0.5">{d.dimension}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
