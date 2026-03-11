import { useNavigate } from "react-router-dom";
import { ShieldAlert, Activity, BarChart3, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RiskOSHome() {
  const navigate = useNavigate();

  const features = [
    { icon: Activity, title: "Real-time Monitoring", desc: "Track risk events as they happen with live severity scoring and automatic escalation." },
    { icon: BarChart3, title: "Analytics & Insights", desc: "Deep-dive into risk trends with 9-section drill-down panels and AI-powered analysis." },
    { icon: Globe, title: "European Coverage", desc: "Full supply chain visibility across DE, FR, IT, ES, NL, PL with site-level granularity." },
  ];

  return (
    <div className="gradient-mesh min-h-full flex items-center justify-center p-8">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center tech-glow">
          <ShieldAlert className="h-10 w-10 text-primary-foreground" />
        </div>
        <div>
           <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Risk AI</h1>
          <p className="text-muted-foreground mt-2 text-base max-w-md mx-auto">
            Enterprise supply chain risk intelligence with AI-powered monitoring, real-time alerts, and actionable insights.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="section-card text-left space-y-2">
              <f.icon className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <Button
          size="lg"
          className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground font-semibold px-8 shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate("/risk-monitor/risk-overview")}
        >
          Open Risk Overview
        </Button>
      </div>
    </div>
  );
}
