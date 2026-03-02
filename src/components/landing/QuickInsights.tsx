import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Sparkles, ChevronRight, MessageSquare } from "lucide-react";

interface FAQChip {
  text: string;
  response: string;
  isDetailed?: boolean;
}

const faqChips: FAQChip[] = [
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
• Recommendation: recalibrate lead time parameters in Azure SQL tables → resync with MEIO optimizer.`,
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

**Recommendation:**
→ Use Azure Data Explorer to tag SKUs for liquidation or redistribution to Portugal DC.`,
  },
  {
    text: "Summarize key drivers of underperformance in service and inventory for Q2.",
    response: `📊 Service & Inventory Diagnostic Summary – Q2 FY25

**Service Level:**
• Target: 97% | Actual: 94.1%
• Gap: -2.9% driven by 4 key clusters

**Inventory Performance:**
• Target DOH: 38 days | Actual: 44 days (+16%)
• Over-buffering and poor demand visibility contributed 63% of excess

**Actions Recommended:**
• Sync MEIO & ADF refresh cadence
• Run Forecast Bias Correction
• Trigger alert workflow to planners in DAP Workspace → Service Risk Module.`,
  },
  {
    text: "Can we achieve the €18M inventory reduction target without compromising service?",
    response: "INVENTORY_OPTIMIZATION_DETAILED",
    isDetailed: true,
  },
];

export default function QuickInsights() {
  const navigate = useNavigate();

  const handleChipClick = (chip: FAQChip) => {
    navigate("/ai-response", { state: { query: chip.text, response: chip.response } });
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-3.5 w-3.5 text-primary" />
        <p className="text-xs font-semibold text-foreground">Quick Insights</p>
        <span className="text-[10px] text-muted-foreground">· Ask anything about your supply chain</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {faqChips.map((chip, idx) => (
          <Card
            key={idx}
            onClick={() => handleChipClick(chip)}
            className="group relative p-3 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-[var(--shadow-elevated)] hover:border-primary/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-primary/8 shrink-0 group-hover:bg-primary/15 transition-colors">
                <Sparkles className="h-3 w-3 text-primary group-hover:animate-pulse" />
              </div>
              <p className="text-[11px] text-foreground/80 group-hover:text-foreground leading-relaxed line-clamp-2">
                {chip.text}
              </p>
            </div>
            <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="h-3 w-3 text-primary" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
