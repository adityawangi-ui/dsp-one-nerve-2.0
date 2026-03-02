import { useState, useCallback } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { AgenticGenerativeUI } from "@/components/chat/AgenticGenerativeUI";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertTriangle,
  BarChart3,
  Workflow,
  Mic,
  Sparkles,
  Package,
  ChevronRight,
  Send,
  Plus,
  Settings,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Shield,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Settings2,
  GripVertical,
} from "lucide-react";

interface KpiItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  target?: string;
  trendValue: string;
  trendDir: "up" | "down";
  trendColor: "success" | "destructive";
  badgeLabel: string;
  badgeColor: "success" | "warning" | "destructive";
  insight: string;
  link: string;
  visible: boolean;
  isCustom?: boolean;
}

const defaultKpis: KpiItem[] = [
  {
    id: "service-level",
    label: "Service Level",
    value: "92.3%",
    target: "/ 95%",
    trendValue: "-1.8%",
    trendDir: "down",
    trendColor: "destructive",
    badgeLabel: "Amber",
    badgeColor: "warning",
    insight: "APAC fill rate at 89%",
    link: "/diagnostics-analytics",
    visible: true,
  },
  {
    id: "inventory",
    label: "Inventory",
    value: "€285M",
    trendValue: "-3.2%",
    trendDir: "down",
    trendColor: "success",
    badgeLabel: "Green",
    badgeColor: "success",
    insight: "SLOB: €38M (-8%)",
    link: "/inventory-optimizer",
    visible: true,
  },
  {
    id: "capacity",
    label: "Capacity",
    value: "78%",
    suffix: "util.",
    trendValue: "+2.4%",
    trendDir: "up",
    trendColor: "success",
    badgeLabel: "Green",
    badgeColor: "success",
    insight: "Plan adherence: 94%",
    link: "/capacity-rebalancer",
    visible: true,
  },
  {
    id: "forecast",
    label: "Forecast",
    value: "82.4%",
    suffix: "MAPE",
    trendValue: "-3.1%",
    trendDir: "down",
    trendColor: "destructive",
    badgeLabel: "Amber",
    badgeColor: "warning",
    insight: "Bias: +6% over-fcst",
    link: "/predictive-analytics",
    visible: true,
  },
  {
    id: "dr-compliance",
    label: "DR Compliance",
    value: "94%",
    target: "/ 98%",
    trendValue: "+1.2%",
    trendDir: "up",
    trendColor: "success",
    badgeLabel: "Amber",
    badgeColor: "warning",
    insight: "12 lane violations",
    link: "/execution-tracker",
    visible: true,
  },
];

const badgeIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  destructive: XCircle,
};

const badgeStyles = {
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  destructive: "bg-destructive/20 text-destructive",
};

export default function Landing() {
  const [inputValue, setInputValue] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [kpis, setKpis] = useState<KpiItem[]>(defaultKpis);
  const [manageOpen, setManageOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  // New KPI form state
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newTarget, setNewTarget] = useState("");
  const [newTrend, setNewTrend] = useState("");
  const [newTrendDir, setNewTrendDir] = useState<"up" | "down">("up");
  const [newBadge, setNewBadge] = useState<"success" | "warning" | "destructive">("success");
  const [newInsight, setNewInsight] = useState("");

  const navigate = useNavigate();

  const visibleKpis = kpis.filter(k => k.visible);

  const toggleKpi = (id: string) => {
    setKpis(prev => prev.map(k => k.id === id ? { ...k, visible: !k.visible } : k));
  };

  const deleteKpi = (id: string) => {
    setKpis(prev => prev.filter(k => k.id !== id));
  };

  const handleCreateKpi = () => {
    if (!newLabel.trim() || !newValue.trim()) return;
    const newKpi: KpiItem = {
      id: `custom-${Date.now()}`,
      label: newLabel,
      value: newValue,
      target: newTarget || undefined,
      trendValue: newTrend || "0%",
      trendDir: newTrendDir,
      trendColor: newTrendDir === "up" ? "success" : "destructive",
      badgeLabel: newBadge === "success" ? "Green" : newBadge === "warning" ? "Amber" : "Red",
      badgeColor: newBadge,
      insight: newInsight || "Custom KPI",
      link: "/",
      visible: true,
      isCustom: true,
    };
    setKpis(prev => [...prev, newKpi]);
    setNewLabel(""); setNewValue(""); setNewTarget(""); setNewTrend(""); setNewInsight("");
    setNewTrendDir("up"); setNewBadge("success");
    setCreateOpen(false);
  };

  const contextCards = [
    {
      title: "Service Risk Alerts",
      icon: AlertTriangle,
      subtext: "AI-detected supply chain risks with autonomous mitigation scenarios.",
      footer: "View Risk Alerts",
      link: "/risk-alert",
      status: "3 High Priority Alerts",
      isAgent: true,
    },
    {
      title: "Insights & Analytics",
      icon: BarChart3,
      subtext: "Predictive analytics, diagnostics hub, and custom reporting studio.",
      footer: "Open Insights Hub",
      link: "/insights-home",
      status: "87.8% Forecast Accuracy",
      isAgent: true,
    },
    {
      title: "Optimization Studios",
      icon: Package,
      subtext: "Inventory norms, waste reduction, and capacity rebalancing tools.",
      footer: "Open Optimizers",
      link: "/inventory-optimizer",
      chips: ["Inventory", "Waste", "Capacity"],
      isAgent: true,
    },
    {
      title: "DAP Workspace",
      icon: Package,
      subtext: "Access inventory balancing, rebalancing, and safety stock optimization.",
      footer: "Open DAP Workspace",
      link: "/dap-workspace",
      chips: ["Inventory", "Supply Rebalancing"],
      isAgent: true,
    },
  ];

  const faqChips = [
    {
      text: "Compare MEIO norms vs actual safety stocks and identify where we are over-buffered.",
      response: `✅ MEIO Norm vs Actual Safety Stock Comparison – November 2025

**System-level Summary:**
• Total SKUs analyzed: 3,426
• % SKUs within tolerance band (±10%): 78%
• Over-buffered SKUs (> +20% deviation): 312 (9%)
• Under-buffered SKUs (< -20% deviation): 188 (5%)

**Top 5 Over-buffered Product Families:**
1. Detergents – +38% above MEIO norms (Spain & Italy DCs)
2. Fabric Softeners – +27%
3. Dishwashing – +24%
4. Personal Wash – +21%
5. Deodorants – +19%

**Key Insights:**
• Over-buffering mainly in low-variability SKUs with high safety lead times.
• Common cause: outdated lead time settings in DMP master data.
• Recommendation: recalibrate lead time parameters in Azure SQL tables → resync with MEIO optimizer.`
    },
    {
      text: "What are the top 10 SKUs driving excess stock in Spain?",
      response: `🇪🇸 Excess Stock Analysis – Spain Distribution Centers (Nov 2025)

**Summary:**
• Total Inventory: 41.2K MT
• Identified Excess: 5.8K MT (14.1% of total)
• Financial Value: $3.4M tied up in slow movers

**Top 10 SKUs Driving Excess Stock:**
1. SKU D1234 – Surf 1L Detergent → 820 MT → 14.2%
2. SKU D1456 – Comfort Blue 500ml → 690 MT → 11.8%
3. SKU H8745 – Domestos Lemon 750ml → 540 MT → 9.2%
4. SKU F5622 – Axe Bodywash → 510 MT → 8.8%
5. SKU S7844 – Dove Shampoo 200ml → 490 MT → 8.4%
6. SKU R3215 – OMO Liquid → 460 MT → 7.9%
7. SKU P4512 – Vaseline Lotion → 420 MT → 7.2%
8. SKU K8811 – Sunsilk Conditioner → 390 MT → 6.8%
9. SKU X2349 – Signal Toothpaste → 370 MT → 6.4%
10. SKU Z8890 – Dove Soap Bar → 350 MT → 6.1%

**Root Causes:**
• Low regional demand forecast accuracy (MAPE > 24%)
• Over-ordering in SAP vs. DMP recommendations
• Pending clearance plan in Madrid & Seville warehouses

**Recommendation:**
→ Use Azure Data Explorer to tag SKUs for liquidation or redistribution to Portugal DC.`
    },
    {
      text: "Summarize key drivers of underperformance in service and inventory for Q2.",
      response: `📊 Service & Inventory Diagnostic Summary – Q2 FY25

**Service Level:**
• Target: 97% | Actual: 94.1%
• Gap: -2.9% driven by 4 key clusters:
   - Late replenishments in Italy & Poland
   - Forecast bias in Personal Care (Bias: -6.5%)
   - Missing supplier confirmations (12 vendors, avg. delay 2.3 days)
   - Inter-Division replenishment lag from DMP

**Inventory Performance:**
• Target DOH: 38 days | Actual: 44 days (+16%)
• Over-buffering and poor demand visibility contributed 63% of excess
• Raw materials (RM Class B & C) drove most of the variance.

**Key Drivers:**
1. Incomplete MEIO adoption (coverage only 74% SKUs)
2. Safety stock overrides in SAP not aligned with optimizer
3. Service recovery buffers not recalibrated post-network redesign.

**Actions Recommended:**
• Sync MEIO & ADF refresh cadence (currently offset by 12 hrs)
• Run Forecast Bias Correction (Azure ML retrain)
• Trigger alert workflow to planners in DAP Workspace → Service Risk Module.`
    },
    {
      text: "Can we achieve the €18M inventory reduction target without compromising service?",
      response: "INVENTORY_OPTIMIZATION_DETAILED",
      isDetailed: true
    }
  ];

  const handleChipClick = (chip: typeof faqChips[0]) => {
    navigate('/ai-response', { 
      state: { 
        query: chip.text, 
        response: chip.response 
      } 
    });
  };

  const KpiCard = ({ kpi }: { kpi: KpiItem }) => {
    const BadgeIcon = badgeIcons[kpi.badgeColor];
    const TrendIcon = kpi.trendDir === "up" ? TrendingUp : TrendingDown;
    return (
      <Card
        className="p-3 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer"
        onClick={() => kpi.link !== "/" && navigate(kpi.link)}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between mb-1">
            <p className="text-[10px] font-medium text-muted-foreground">{kpi.label}</p>
            <Badge variant="secondary" className={`${badgeStyles[kpi.badgeColor]} text-[9px] px-1.5 py-0`}>
              <BadgeIcon className="h-2.5 w-2.5 mr-0.5" />
              {kpi.badgeLabel}
            </Badge>
          </div>
          <div className="flex items-baseline gap-1">
            <h3 className="text-xl font-bold text-foreground">{kpi.value}</h3>
            {(kpi.target || kpi.suffix) && (
              <span className="text-[9px] text-muted-foreground">{kpi.target || kpi.suffix}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-3 w-3 text-${kpi.trendColor}`} />
            <span className={`text-[9px] text-${kpi.trendColor} font-medium`}>{kpi.trendValue}</span>
          </div>
          <p className="text-[9px] text-muted-foreground italic leading-tight pt-1 border-t border-border">
            {kpi.insight}
          </p>
        </div>
      </Card>
    );
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] misty-bg px-4 md:px-8 lg:px-12 xl:px-16 overflow-auto flex flex-col relative">
        <div className="w-full flex flex-col py-4 md:py-6 mx-auto max-w-6xl">
          <div className="flex flex-col space-y-4 md:space-y-5">
            {/* Personal Greeting Section - Centered */}
            <div className="text-center space-y-3 animate-fade-in">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text aurora-shimmer" style={{ animationDuration: '0.6s' }}>
                  Welcome Back, Alex!
                </h1>
                <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm md:text-base text-muted-foreground font-light max-w-md mx-auto">
                Your Intelligent Planning Companion is ready to help
              </p>
            </div>

            {/* Planning Health KPI Cards */}
            <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Planning Health Pulse</p>
                <div className="flex items-center gap-1.5">
                  {/* Create new KPI */}
                  <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground hover:text-primary">
                        <Plus className="h-3 w-3" /> Add KPI
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-base">Create Custom KPI</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3 pt-2">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">KPI Name *</Label>
                            <Input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. Fill Rate" className="h-8 text-sm mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs">Value *</Label>
                            <Input value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="e.g. 96.5%" className="h-8 text-sm mt-1" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Target / Suffix</Label>
                            <Input value={newTarget} onChange={e => setNewTarget(e.target.value)} placeholder="e.g. / 98%" className="h-8 text-sm mt-1" />
                          </div>
                          <div>
                            <Label className="text-xs">Trend</Label>
                            <Input value={newTrend} onChange={e => setNewTrend(e.target.value)} placeholder="e.g. +1.5%" className="h-8 text-sm mt-1" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs">Trend Direction</Label>
                            <Select value={newTrendDir} onValueChange={(v: "up" | "down") => setNewTrendDir(v)}>
                              <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="up">↑ Up</SelectItem>
                                <SelectItem value="down">↓ Down</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-xs">Status</Label>
                            <Select value={newBadge} onValueChange={(v: "success" | "warning" | "destructive") => setNewBadge(v)}>
                              <SelectTrigger className="h-8 text-sm mt-1"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="success">🟢 Green</SelectItem>
                                <SelectItem value="warning">🟡 Amber</SelectItem>
                                <SelectItem value="destructive">🔴 Red</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Insight note</Label>
                          <Input value={newInsight} onChange={e => setNewInsight(e.target.value)} placeholder="e.g. Trending positive WoW" className="h-8 text-sm mt-1" />
                        </div>
                        <Button onClick={handleCreateKpi} disabled={!newLabel.trim() || !newValue.trim()} className="w-full h-8 text-sm">
                          <Plus className="h-3.5 w-3.5 mr-1.5" /> Create KPI
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Manage visibility */}
                  <Dialog open={manageOpen} onOpenChange={setManageOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs text-muted-foreground hover:text-primary">
                        <Settings2 className="h-3 w-3" /> Manage
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="text-base">Manage KPIs</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-1 pt-2 max-h-[50vh] overflow-auto">
                        {kpis.map(kpi => (
                          <div key={kpi.id} className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-secondary/50 group">
                            <label className="flex items-center gap-2.5 cursor-pointer flex-1">
                              <Checkbox checked={kpi.visible} onCheckedChange={() => toggleKpi(kpi.id)} />
                              <span className="text-sm text-foreground">{kpi.label}</span>
                              {kpi.isCustom && (
                                <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-muted-foreground">Custom</Badge>
                              )}
                            </label>
                            {kpi.isCustom && (
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive" onClick={() => deleteKpi(kpi.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className={`grid gap-2 md:gap-3 w-full`} style={{ gridTemplateColumns: `repeat(${Math.min(visibleKpis.length, 5)}, minmax(0, 1fr))` }}>
                {visibleKpis.map(kpi => (
                  <KpiCard key={kpi.id} kpi={kpi} />
                ))}
              </div>
            </div>

            {/* Context Cards - 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 justify-items-center w-full"
               style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}>
            {contextCards.map((card, index) => {
              const isActionItem = card.title === "Service Risk Alerts";
              
              return (
                <Link 
                  key={index} 
                  to={card.link} 
                  className="group w-full"
                  style={{ 
                    animation: `fade-in 0.5s ease-out ${0.3 + index * 0.1}s both, scale-in 0.4s ease-out ${0.3 + index * 0.1}s both` 
                  }}
                >
                  <Card className={`relative p-3 md:p-4 rounded-[18px] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col min-h-[140px] md:min-h-[155px] items-center text-center overflow-hidden ${
                    isActionItem 
                      ? 'bg-gradient-to-br from-destructive/5 via-warning/5 to-background border-2 border-destructive/40 shadow-[0_4px_20px_rgba(239,68,68,0.15)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.25)] hover:border-destructive/60' 
                      : 'bg-white border border-border/30 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] card-shimmer'
                  }`}>
                    {/* Gradient header strip - action items get attention-grabbing colors */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-[18px] ${
                      isActionItem 
                        ? 'bg-gradient-to-r from-destructive via-warning to-destructive animate-pulse' 
                        : 'bg-gradient-to-r from-primary/50 via-primary to-primary/50'
                    }`} />
                    
                    {/* Action Required Badge for urgent items */}
                    {isActionItem && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-destructive text-destructive-foreground text-[9px] px-2 py-0.5 animate-pulse shadow-sm">
                          Action Required
                        </Badge>
                      </div>
                    )}
                    
                    {/* Header */}
                    <div className="flex flex-col items-center mb-2 mt-1">
                      <div className={`p-1.5 rounded-xl flex-shrink-0 mb-2 group-hover:scale-110 transition-transform duration-300 ${
                        isActionItem 
                          ? 'bg-gradient-to-br from-destructive/20 to-warning/10' 
                          : 'bg-gradient-to-br from-primary/10 to-primary/5'
                      }`}>
                        <card.icon className={`h-4 w-4 ${isActionItem ? 'text-destructive' : 'text-primary'}`} />
                      </div>
                      <h3 className={`text-sm font-semibold flex items-center gap-2 ${isActionItem ? 'text-destructive' : 'text-foreground'}`}>
                        {card.isAgent && <Sparkles className={`h-3.5 w-3.5 animate-pulse ${isActionItem ? 'text-warning' : 'text-primary'}`} />}
                        {card.title}
                      </h3>
                    </div>

                     {/* Subtext */}
                    <p className="text-xs text-muted-foreground mb-2 flex-1 leading-relaxed">
                      {card.subtext}
                    </p>

                    {/* Chips or Status */}
                    <div className="mb-2">
                      {card.chips && (
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {card.chips.map((chip, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px] py-0.5 px-2.5 bg-secondary/80 text-secondary-foreground hover:bg-secondary">
                              {chip}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {card.status && (
                        <Badge variant="outline" className={`text-[10px] py-0.5 px-2.5 ${
                          isActionItem 
                            ? 'border-destructive/50 text-destructive bg-destructive/10 font-semibold' 
                            : 'border-primary/30 text-primary/80 bg-primary/5'
                        }`}>
                          {card.status}
                        </Badge>
                      )}
                    </div>

                     {/* Footer */}
                    <div className={`pt-2 border-t flex items-center justify-center gap-2 w-full ${
                      isActionItem ? 'border-destructive/20' : 'border-border/40'
                    }`}>
                      {isActionItem ? (
                        <div className="flex items-center gap-2 w-full justify-center">
                          <span className="text-xs font-medium group-hover:underline text-destructive">
                            {card.footer}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 text-destructive/60 group-hover:text-destructive group-hover:translate-x-1 transition-all" />
                          <Button
                            size="sm"
                            variant="destructive"
                            className="ml-auto text-[10px] h-6 px-2.5 rounded-lg shadow-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              navigate('/risk-monitor');
                            }}
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            Risk Monitor
                          </Button>
                        </div>
                      ) : (
                        <>
                          <span className="text-xs font-medium group-hover:underline text-primary">
                            {card.footer}
                          </span>
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
            </div>
          </div>

          {/* Bottom Section - FAQ Chips and Prompt Box */}
          <div className="space-y-3 md:space-y-4 mt-4">
            {/* FAQ Chips Section - Improved Cards */}
            <div className="animate-fade-in w-full" style={{ animationDelay: '0.45s' }}>
              <p className="text-xs font-medium text-muted-foreground mb-2 text-center">Quick insights you can ask</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {faqChips.map((chip, idx) => (
                  <Card
                    key={idx}
                    onClick={() => handleChipClick(chip)}
                    className="group relative p-3 rounded-xl bg-gradient-to-br from-card via-card to-primary/5 border border-border/60 shadow-sm hover:shadow-[var(--shadow-elevated)] hover:border-primary/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div className="p-1.5 rounded-lg bg-primary/10 flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Sparkles className="h-3 w-3 text-primary group-hover:animate-pulse" />
                      </div>
                      <p className="text-xs text-foreground/80 group-hover:text-foreground leading-relaxed line-clamp-2">
                        {chip.text}
                      </p>
                    </div>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="h-3.5 w-3.5 text-primary" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Conversational Prompt Box - Gemini Style */}
            <div className="animate-fade-in w-full" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <div className="frosted-glass breathing-border rounded-2xl border-2 border-primary/30 shadow-[var(--shadow-glow)]">
                <div className="flex items-center gap-3 pl-4 pr-3 py-2.5">
                  {/* Left Icons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                      title="Quick Actions"
                    >
                      <Plus className="h-4 w-4 text-primary" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                      title="Settings"
                    >
                      <Settings className="h-4 w-4 text-primary" />
                    </Button>
                  </div>

                  {/* Input */}
                  <Input
                    placeholder="Hi, How can I help you?…"
                    className="flex-1 h-10 text-sm border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && inputValue.trim()) {
                        setChatOpen(true);
                      }
                    }}
                  />

                  {/* Right Icons */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                      title="Voice Input"
                    >
                      <Mic className="h-4 w-4 text-primary" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                      onClick={() => {
                        if (inputValue.trim()) {
                          setChatOpen(true);
                        }
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agentic Generative UI */}
      <AgenticGenerativeUI
        isOpen={chatOpen}
        onClose={() => {
          setChatOpen(false);
          setInputValue("");
        }}
        initialQuery={inputValue}
      />
    </div>
    </MainLayout>
  );
}
