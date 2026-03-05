import { useState, useRef, useEffect } from "react";
import { riskData, RiskRow } from "@/data/riskData";
import { Bot, X, Sparkles, ChevronRight, Send, Zap, BarChart3, RefreshCw, Brain, Shield, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const suggestedActions = [
  { icon: Zap, text: "Show demand spike drivers", category: "Analysis" },
  { icon: RefreshCw, text: "Simulate warehouse rebalance", category: "Scenario" },
  { icon: BarChart3, text: "Compare mitigation scenarios", category: "Compare" },
  { icon: Brain, text: "Explain this risk", category: "Insight" },
  { icon: Shield, text: "Show top 5 risks by loss", category: "Query" },
  { icon: MessageSquare, text: "What is the total value at risk?", category: "Query" },
];

function getAnswer(q: string): string {
  const lower = q.toLowerCase();

  if (lower.includes("demand spike") || lower.includes("spike driver")) {
    return `**Demand Spike Analysis:**\n\n**AI Confidence: 94%** · Based on 38 historical patterns\n\n**Key Drivers Identified:**\n1. **Promotional uplift** — W3 campaign driving +35% expected volume\n2. **Seasonal pattern** — Historical Feb-Mar surge in this category (+18% YoY)\n3. **Competitor stockout** — Market intel shows competitor OOS in 2 regions\n\n**AI Reasoning:**\n• Pattern matches Q1 2025 disruption (91% similarity)\n• Demand forecast model confidence: High\n• Recommended action: Pre-position inventory at DC-North`;
  }

  if (lower.includes("rebalance") || lower.includes("warehouse")) {
    return `**Warehouse Rebalance Simulation:**\n\n**AI Confidence: 87%** · 12 simulations run\n\n**Optimal Rebalance:**\n• DC-North → DC-Central: 1,200 cases\n• DC-South → DC-Central: 800 cases\n• Estimated cost: €4,200\n• Service level improvement: +6%\n\n**AI Reasoning:**\n• DC-Central has lowest DOH (4 days vs target 14)\n• DC-North has excess buffer (+38% above norm)\n• Transit time: 2 days (within recovery window)`;
  }

  if (lower.includes("compare") && lower.includes("scenario")) {
    return `**Scenario Comparison Summary:**\n\n**AI Confidence: 91%** · Based on 42 historical cases\n\n| Metric | S1 | S2 | S3 (Rec) |\n|--------|-----|-----|----------|\n| Success | 85% | 89% | **91%** |\n| Cost | €26K | €16K | **€16K** |\n| SL Impact | +6% | +8% | **+11%** |\n\n**AI Reasoning:**\n• S3 scores highest on composite evaluation\n• Cost-efficiency ratio 40% better than S1\n• Historical precedent: 89% success in similar cases`;
  }

  if (lower.includes("explain") && lower.includes("risk")) {
    const topRisk = riskData[0];
    return `**Risk Explanation — RISK-${String(topRisk.riskId).padStart(3, "0")}:**\n\n**AI Confidence: 96%**\n\n**What happened:**\nSupplier capacity constraint detected for ${topRisk.mrdrDescription}. Raw material (RMPM) delayed by 5 days.\n\n**Why it matters:**\n• ${topRisk.expectedLossCases.toLocaleString()} cases at risk\n• Revenue impact: €${topRisk.expectedLossValue.toLocaleString()}\n• Promotional window in W3 at risk\n\n**AI Reasoning:**\n• Similar disruption in 2023 led to 12% SL drop\n• Supplier reliability score dropped from 92% → 78%\n• Demand forecast increased 22% for this period`;
  }

  if (lower.includes("top") && lower.includes("loss")) {
    const sorted = [...riskData].sort((a, b) => b.expectedLossCases - a.expectedLossCases).slice(0, 5);
    return `**Top 5 Risks by Expected Loss:**\n\n**AI Confidence: 98%** · Live data\n\n${sorted.map((r, i) => `${i + 1}. **${r.mrdrDescription}** (${r.msoCountry})\n   → ${r.expectedLossCases.toLocaleString()} cases · €${r.expectedLossValue.toLocaleString()} · Severity: ${r.severity}`).join("\n\n")}`;
  }

  if (lower.includes("total value") || lower.includes("value at risk")) {
    const totalVal = riskData.reduce((s, r) => s + r.expectedLossValue, 0);
    const totalCases = riskData.reduce((s, r) => s + r.expectedLossCases, 0);
    return `**Value at Risk Summary:**\n\n**AI Confidence: 99%** · Real-time calculation\n\n- **Total Expected Loss Value:** €${totalVal.toLocaleString()}\n- **Total Expected Loss Cases:** ${totalCases.toLocaleString()}\n- **Open Items:** ${riskData.filter(r => r.status === "Open").length}\n- **Avg Loss per Item:** €${Math.round(totalVal / riskData.length).toLocaleString()}\n\n**AI Reasoning:**\n• 62% of value concentrated in top 5 risks\n• Critical markets: Germany, France, Italy\n• Mitigation potential: €${Math.round(totalVal * 0.7).toLocaleString()} recoverable`;
  }

  const open = riskData.filter(r => r.status === "Open").length;
  const totalVal = riskData.reduce((s, r) => s + r.expectedLossValue, 0);
  return `**Risk Overview:**\n\n**AI Confidence: 95%**\n\n- **Total Risks:** ${riskData.length}\n- **Open:** ${open}\n- **Total Value at Risk:** €${totalVal.toLocaleString()}\n\nTry one of the suggested actions below, or ask me anything about your risks.`;
}

interface Message { role: "user" | "assistant"; text: string; }

export default function RiskAIAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", text: getAnswer(text) }]);
      setTyping(false);
    }, 1200);
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Highlight confidence scores
      processed = processed.replace(/(AI Confidence: \d+%)/g, '<span class="neon-text text-primary font-semibold">$1</span>');
      return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-b from-primary to-primary-glow text-primary-foreground rounded-l-xl px-2 py-4 flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:px-3 tech-glow"
      >
        <Bot className="h-5 w-5" />
        <span className="text-[10px] font-semibold tracking-wider" style={{ writingMode: "vertical-rl" }}>AI Copilot</span>
        <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-0 bottom-0 z-50 w-[400px] glass-panel shadow-2xl flex flex-col animate-slide-in-right border-l border-primary/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary-glow/5 to-transparent px-4 py-3 flex items-center justify-between border-b border-border/30">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center tech-glow">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground">Risk Copilot</span>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <p className="text-[10px] text-muted-foreground">AI-powered · Always analyzing</p>
            </div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !typing && (
          <div className="space-y-5 pt-4">
            {/* Welcome */}
            <div className="text-center space-y-3">
              <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 tech-glow flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">What would you like to analyze?</p>
                <p className="text-[11px] text-muted-foreground mt-1">I'm monitoring your risks in real-time</p>
              </div>
            </div>

            {/* Suggested Actions - Copilot style */}
            <div className="space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium px-1">Suggested Actions</p>
              {suggestedActions.map(action => (
                <button
                  key={action.text}
                  onClick={() => send(action.text)}
                  className="w-full text-left text-[11px] px-3 py-2.5 rounded-lg border border-border/40 hover:border-primary/30 hover:bg-primary/[0.04] text-foreground transition-all flex items-center gap-2.5 group"
                >
                  <div className="h-6 w-6 rounded-md bg-secondary/80 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                    <action.icon className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="flex-1">{action.text}</span>
                  <Badge variant="outline" className="text-[8px] px-1 py-0 text-muted-foreground border-border/50">{action.category}</Badge>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-[12px] ${
              m.role === "user"
                ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-br-sm"
                : "bg-secondary/50 text-foreground rounded-bl-sm border border-border/40"
            }`}>
              {m.role === "assistant" ? renderMarkdown(m.text) : m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-secondary/50 rounded-xl rounded-bl-sm px-4 py-3 border border-border/40 flex items-center gap-2">
              <Brain className="h-3.5 w-3.5 text-primary animate-pulse" />
              <span className="text-[11px] text-muted-foreground">Analyzing</span>
              {[0, 1, 2].map(i => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}

        {/* Show suggested actions after assistant response */}
        {messages.length > 0 && !typing && messages[messages.length - 1].role === "assistant" && (
          <div className="space-y-1 pt-2">
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">Follow-up</p>
            <div className="flex flex-wrap gap-1.5">
              {suggestedActions.slice(0, 3).map(action => (
                <button
                  key={action.text}
                  onClick={() => send(action.text)}
                  className="text-[10px] px-2.5 py-1.5 rounded-lg border border-border/40 hover:border-primary/30 hover:bg-primary/[0.04] text-muted-foreground hover:text-foreground transition-all"
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/30 bg-card/30 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about risks, scenarios, actions..."
            className="flex-1 text-xs h-9 bg-secondary/50 border-border/50"
          />
          <button
            onClick={() => send(input)}
            className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-primary-foreground flex items-center justify-center hover:shadow-lg tech-glow transition-all"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
