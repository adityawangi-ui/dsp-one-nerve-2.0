import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";

export default function Landing() {
  const [inputValue, setInputValue] = useState("");
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
      title: "Learning Hub",
      icon: Workflow,
      subtext: "Interactive learning, process explanations, and AI-powered tutoring.",
      footer: "Start Learning",
      link: "/learning-hub",
      status: "24 Training Modules Available",
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
      <div className="min-h-[calc(100vh-4rem)] misty-bg px-8 lg:px-16 xl:px-24 overflow-auto flex flex-col relative">
        <div className="w-full flex flex-col justify-between min-h-[calc(100vh-4rem)] py-6 md:py-8 mx-auto" style={{ maxWidth: '1400px' }}>
          <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-6">
            {/* Personal Greeting Section */}
            <div className="text-center space-y-0.5 animate-fade-in">
              <h1 className="text-3xl font-bold gradient-text" style={{ animationDuration: '0.6s' }}>
                Hello, Alex 👋
              </h1>
              <p className="text-xs text-[#7E7E7E] font-light">
                Your Intelligent Planning Companion.
              </p>
            </div>

            {/* Context Cards - 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 justify-items-center w-full"
               style={{ animation: 'fade-in 0.6s ease-out 0.2s both' }}>
            {contextCards.map((card, index) => (
              <Link 
                key={index} 
                to={card.link} 
                className="group w-full"
                style={{ 
                  animation: `fade-in 0.5s ease-out ${0.3 + index * 0.1}s both, scale-in 0.4s ease-out ${0.3 + index * 0.1}s both` 
                }}
              >
                <Card className="relative p-3 md:p-4 bg-white border border-border/30 rounded-[18px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-intense)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col min-h-[140px] md:min-h-[155px] items-center text-center card-shimmer overflow-hidden">
                  {/* Subtle gradient header strip */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-t-[18px]" />
                  
                  {/* Header */}
                  <div className="flex flex-col items-center mb-2 mt-1">
                    <div className="p-1.5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex-shrink-0 mb-2 group-hover:scale-110 transition-transform duration-300">
                      <card.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      {card.isAgent && <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />}
                      {card.title}
                    </h3>
                  </div>

                  {/* Subtext */}
                  <p className="text-[11px] text-muted-foreground mb-2 flex-1 leading-relaxed">
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
                      <Badge variant="outline" className="text-[10px] py-0.5 px-2.5 border-primary/30 text-primary/80 bg-primary/5">
                        {card.status}
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="pt-2 border-t border-border/40 flex items-center justify-center gap-2 w-full">
                    <span className="text-[11px] text-primary font-medium group-hover:underline">
                      {card.footer}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            ))}
            </div>
          </div>

          {/* Bottom Section - FAQ Chips and Prompt Box */}
          <div className="space-y-3 md:space-y-4">
            {/* FAQ Chips Section */}
            <div className="animate-fade-in w-full px-0" style={{ animationDelay: '0.45s' }}>
            <div className="flex flex-col md:flex-row gap-2 justify-between">
              {faqChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChipClick(chip)}
                  className="group relative px-3 py-2 md:py-1.5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 shadow-sm hover:shadow-[0_0_20px_rgba(111,108,246,0.3)] transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 text-left flex-1 flex items-center gap-1.5"
                >
                  <Sparkles className="h-3 w-3 text-primary flex-shrink-0 group-hover:animate-pulse" />
                  <span className="text-[11px] text-foreground/80 group-hover:text-foreground font-medium leading-tight">
                    {chip.text}
                  </span>
                </button>
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
    </div>
    </MainLayout>
  );
}
