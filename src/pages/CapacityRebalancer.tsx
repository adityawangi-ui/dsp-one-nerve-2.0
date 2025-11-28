import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Factory, TrendingUp, AlertCircle, PlayCircle, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const rcpcData = [
  { line: "L23", load: 134, capacity: 100, status: "Overload" },
  { line: "L18", load: 98, capacity: 100, status: "Optimal" },
  { line: "L15", load: 87, capacity: 100, status: "Optimal" },
  { line: "L11", load: 62, capacity: 100, status: "Underused" },
  { line: "L09", load: 58, capacity: 100, status: "Underused" },
];

export default function CapacityRebalancer() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const activeAgents = [
    "RCCP Agent",
    "LTCP Agent",
    "Factory Run Strategy Agent"
  ];

  const handleRebalance = () => {
    toast({
      title: "Rebalancing Started",
      description: "Optimizing production line allocation...",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Capacity Rebalancer</h1>
              <p className="text-muted-foreground mt-2">RCCP & Line Optimization</p>
            </div>
          </div>
          <Button size="lg" onClick={handleRebalance} className="gap-2">
            <PlayCircle className="h-5 w-5" />
            Run Rebalancing
          </Button>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Active Agents:</span>
            {activeAgents.map((agent) => (
              <Badge key={agent} variant="secondary" className="animate-pulse">
                {agent}
              </Badge>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
            <Factory className="h-8 w-8 text-destructive mb-4" />
            <p className="text-sm text-muted-foreground">Line L23 Overload</p>
            <p className="text-4xl font-bold text-foreground">134%</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <AlertCircle className="h-8 w-8 text-warning mb-4" />
            <p className="text-sm text-muted-foreground">Line L11 Idle</p>
            <p className="text-4xl font-bold text-foreground">62%</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
            <TrendingUp className="h-8 w-8 text-success mb-4" />
            <p className="text-sm text-muted-foreground">Potential Gain</p>
            <p className="text-4xl font-bold text-foreground">+9%</p>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">RCCP Capacity Stacking</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={rcpcData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="line" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="load" radius={[8, 8, 0, 0]}>
                {rcpcData.map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="load" fill={entry.status === "Overload" ? "hsl(var(--destructive))" : entry.status === "Underused" ? "hsl(var(--warning))" : "hsl(var(--success))"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </MainLayout>
  );
}
