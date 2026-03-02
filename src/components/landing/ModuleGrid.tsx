import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  BarChart3,
  Package,
  Sparkles,
  ChevronRight,
  Shield,
  Workflow,
} from "lucide-react";

interface ModuleCard {
  title: string;
  icon: React.ElementType;
  subtext: string;
  footer: string;
  link: string;
  status?: string;
  chips?: string[];
  isUrgent?: boolean;
}

const modules: ModuleCard[] = [
  {
    title: "Service Risk Alerts",
    icon: AlertTriangle,
    subtext: "AI-detected supply chain risks with autonomous mitigation scenarios.",
    footer: "View Risk Alerts",
    link: "/risk-alert",
    status: "3 High Priority Alerts",
    isUrgent: true,
  },
  {
    title: "Insights & Analytics",
    icon: BarChart3,
    subtext: "Predictive analytics, diagnostics hub, and custom reporting studio.",
    footer: "Open Insights Hub",
    link: "/insights-home",
    status: "87.8% Forecast Accuracy",
  },
  {
    title: "Optimization Studios",
    icon: Package,
    subtext: "Inventory norms, waste reduction, and capacity rebalancing tools.",
    footer: "Open Optimizers",
    link: "/inventory-optimizer",
    chips: ["Inventory", "Waste", "Capacity"],
  },
  {
    title: "DAP Workspace",
    icon: Workflow,
    subtext: "Access inventory balancing, rebalancing, and safety stock optimization.",
    footer: "Open DAP Workspace",
    link: "/dap-workspace",
    chips: ["Inventory", "Supply Rebalancing"],
  },
];

export default function ModuleGrid() {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-semibold text-foreground">Command Modules</h2>
        <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{modules.length} active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {modules.map((mod, index) => (
          <Link key={index} to={mod.link} className="group w-full">
            <Card className={`relative p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col min-h-[145px] overflow-hidden ${
              mod.isUrgent
                ? "bg-gradient-to-br from-destructive/5 via-warning/5 to-card border-2 border-destructive/40 shadow-[0_4px_20px_rgba(239,68,68,0.12)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.2)] hover:border-destructive/60"
                : "bg-card border border-border/40 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)]"
            }`}>
              {/* Accent strip */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl ${
                mod.isUrgent
                  ? "bg-gradient-to-r from-destructive via-warning to-destructive animate-pulse"
                  : "bg-gradient-to-r from-primary/40 via-primary to-primary/40"
              }`} />

              {mod.isUrgent && (
                <Badge className="absolute top-2.5 right-2.5 bg-destructive text-destructive-foreground text-[9px] px-2 py-0.5 animate-pulse shadow-sm">
                  Action Required
                </Badge>
              )}

              <div className="flex items-start gap-3 mb-2 mt-0.5">
                <div className={`p-2 rounded-xl shrink-0 group-hover:scale-110 transition-transform ${
                  mod.isUrgent ? "bg-destructive/10" : "bg-primary/10"
                }`}>
                  <mod.icon className={`h-4 w-4 ${mod.isUrgent ? "text-destructive" : "text-primary"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-semibold flex items-center gap-1.5 ${mod.isUrgent ? "text-destructive" : "text-foreground"}`}>
                    <Sparkles className={`h-3 w-3 animate-pulse ${mod.isUrgent ? "text-warning" : "text-primary"}`} />
                    {mod.title}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{mod.subtext}</p>
                </div>
              </div>

              {/* Chips or Status */}
              <div className="flex-1 flex items-end mb-2">
                {mod.chips && (
                  <div className="flex flex-wrap gap-1.5">
                    {mod.chips.map((chip, idx) => (
                      <Badge key={idx} variant="secondary" className="text-[10px] py-0 px-2 bg-secondary/80">{chip}</Badge>
                    ))}
                  </div>
                )}
                {mod.status && (
                  <Badge variant="outline" className={`text-[10px] py-0.5 px-2.5 ${
                    mod.isUrgent ? "border-destructive/50 text-destructive bg-destructive/10 font-semibold" : "border-primary/30 text-primary bg-primary/5"
                  }`}>
                    {mod.status}
                  </Badge>
                )}
              </div>

              {/* Footer */}
              <div className={`pt-2 border-t flex items-center gap-2 ${mod.isUrgent ? "border-destructive/20" : "border-border/40"}`}>
                {mod.isUrgent ? (
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-xs font-medium text-destructive group-hover:underline">{mod.footer}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-destructive/60 group-hover:translate-x-1 transition-transform" />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="ml-auto text-[10px] h-6 px-2.5 rounded-lg shadow-sm"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate("/risk-monitor"); }}
                    >
                      <Shield className="h-3 w-3 mr-1" /> Risk Monitor
                    </Button>
                  </div>
                ) : (
                  <>
                    <span className="text-xs font-medium text-primary group-hover:underline">{mod.footer}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
