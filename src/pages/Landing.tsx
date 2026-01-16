import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { AgenticGenerativeUI } from "@/components/chat/AgenticGenerativeUI";
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
} from "lucide-react";

export default function Landing() {
  const [inputValue, setInputValue] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const navigate = useNavigate();

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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 w-full animate-fade-in" style={{ animationDelay: '0.15s' }}>
              {/* KPI 1: Service Level */}
              <Card className="p-3 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer" onClick={() => navigate('/diagnostics-analytics')}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-[10px] font-medium text-muted-foreground">Service Level</p>
                    <Badge variant="secondary" className="bg-warning/20 text-warning text-[9px] px-1.5 py-0">
                      <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                      Amber
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl font-bold text-foreground">92.3%</h3>
                    <span className="text-[9px] text-muted-foreground">/ 95%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-destructive" />
                    <span className="text-[9px] text-destructive font-medium">-1.8%</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-tight pt-1 border-t border-border">
                    APAC fill rate at 89%
                  </p>
                </div>
              </Card>

              {/* KPI 2: Inventory Health */}
              <Card className="p-3 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer" onClick={() => navigate('/inventory-optimizer')}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-[10px] font-medium text-muted-foreground">Inventory</p>
                    <Badge variant="secondary" className="bg-success/20 text-success text-[9px] px-1.5 py-0">
                      <CheckCircle className="h-2.5 w-2.5 mr-0.5" />
                      Green
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl font-bold text-foreground">€285M</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-success" />
                    <span className="text-[9px] text-success font-medium">-3.2%</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-tight pt-1 border-t border-border">
                    SLOB: €38M (-8%)
                  </p>
                </div>
              </Card>

              {/* KPI 3: Capacity Health */}
              <Card className="p-3 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer" onClick={() => navigate('/capacity-rebalancer')}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-[10px] font-medium text-muted-foreground">Capacity</p>
                    <Badge variant="secondary" className="bg-success/20 text-success text-[9px] px-1.5 py-0">
                      <CheckCircle className="h-2.5 w-2.5 mr-0.5" />
                      Green
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl font-bold text-foreground">78%</h3>
                    <span className="text-[9px] text-muted-foreground">util.</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-[9px] text-success font-medium">+2.4%</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-tight pt-1 border-t border-border">
                    Plan adherence: 94%
                  </p>
                </div>
              </Card>

              {/* KPI 4: Forecast Accuracy */}
              <Card className="p-3 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer" onClick={() => navigate('/predictive-analytics')}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-[10px] font-medium text-muted-foreground">Forecast</p>
                    <Badge variant="secondary" className="bg-warning/20 text-warning text-[9px] px-1.5 py-0">
                      <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                      Amber
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl font-bold text-foreground">82.4%</h3>
                    <span className="text-[9px] text-muted-foreground">MAPE</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingDown className="h-3 w-3 text-destructive" />
                    <span className="text-[9px] text-destructive font-medium">-3.1%</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-tight pt-1 border-t border-border">
                    Bias: +6% over-fcst
                  </p>
                </div>
              </Card>

              {/* KPI 5: DR Compliance */}
              <Card className="p-3 hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer" onClick={() => navigate('/execution-tracker')}>
                <div className="space-y-2">
                  <div className="flex items-start justify-between mb-1">
                    <p className="text-[10px] font-medium text-muted-foreground">DR Compliance</p>
                    <Badge variant="secondary" className="bg-warning/20 text-warning text-[9px] px-1.5 py-0">
                      <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                      Amber
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-xl font-bold text-foreground">94%</h3>
                    <span className="text-[9px] text-muted-foreground">/ 98%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-[9px] text-success font-medium">+1.2%</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground italic leading-tight pt-1 border-t border-border">
                    12 lane violations
                  </p>
                </div>
              </Card>
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
                      <span className={`text-xs font-medium group-hover:underline ${isActionItem ? 'text-destructive' : 'text-primary'}`}>
                        {card.footer}
                      </span>
                      <ChevronRight className={`h-3.5 w-3.5 group-hover:translate-x-1 transition-all ${
                        isActionItem ? 'text-destructive/60 group-hover:text-destructive' : 'text-muted-foreground group-hover:text-primary'
                      }`} />
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
