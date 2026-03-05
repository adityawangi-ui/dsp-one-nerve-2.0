import { useState, useRef, useEffect } from "react";
import { riskData, RiskRow } from "@/data/riskData";
import { Bot, X, Sparkles, ChevronRight, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const suggestedQuestions = [
  "What are the top 5 risks by expected loss?",
  "How many Out Of Stock risks are there?",
  "Which country has the most critical risks?",
  "What is the total value at risk?",
  "Show risks with severity S1 and P1 priority",
  "Which GTINs have the longest risk duration?",
];

function getAnswer(q: string): string {
  const lower = q.toLowerCase();

  if (lower.includes("top") && lower.includes("loss")) {
    const sorted = [...riskData].sort((a, b) => b.expectedLossCases - a.expectedLossCases).slice(0, 5);
    return `**Top 5 Risks by Expected Loss Cases:**\n\n${sorted.map((r, i) => `${i + 1}. **${r.mrdrDescription}** (${r.msoCountry}) — ${r.expectedLossCases.toLocaleString()} cases, €${r.expectedLossValue.toLocaleString()}, Severity: ${r.severity}`).join("\n")}`;
  }

  if (lower.includes("out of stock") || lower.includes("oos")) {
    const oos = riskData.filter(r => r.riskType === "Out Of Stock");
    const countries = [...new Set(oos.map(r => r.msoCountry))];
    const totalLoss = oos.reduce((s, r) => s + r.expectedLossValue, 0);
    const avgDays = Math.round(oos.reduce((s, r) => s + r.riskInDays, 0) / oos.length);
    return `**Out Of Stock Summary:**\n\n- **Count:** ${oos.length} items\n- **Countries:** ${countries.join(", ")}\n- **Total Loss Value:** $${totalLoss.toLocaleString()}\n- **Avg Duration:** ${avgDays} days`;
  }

  if (lower.includes("country") && (lower.includes("critical") || lower.includes("most"))) {
    const s1 = riskData.filter(r => r.severity === "S 1");
    const byCountry: Record<string, number> = {};
    s1.forEach(r => { byCountry[r.msoCountry] = (byCountry[r.msoCountry] || 0) + 1; });
    const ranked = Object.entries(byCountry).sort((a, b) => b[1] - a[1]);
    return `**Critical Risks (S 1) by Country:**\n\n${ranked.map(([c, n], i) => `${i + 1}. **${c}** — ${n} critical risk(s)`).join("\n")}\n\nTotal S 1 risks: ${s1.length}`;
  }

  if (lower.includes("total value") || lower.includes("value at risk")) {
    const totalVal = riskData.reduce((s, r) => s + r.expectedLossValue, 0);
    const totalCases = riskData.reduce((s, r) => s + r.expectedLossCases, 0);
    return `**Value at Risk Summary:**\n\n- **Total Expected Loss Value:** $${totalVal.toLocaleString()}\n- **Total Expected Loss Cases:** ${totalCases.toLocaleString()}\n- **Open Items:** ${riskData.filter(r => r.status === "Open").length}\n- **Avg Loss per Item:** $${Math.round(totalVal / riskData.length).toLocaleString()}`;
  }

  if ((lower.includes("s1") || lower.includes("s 1") || lower.includes("severity")) && lower.includes("p1") || lower.includes("p 1")) {
    const filtered = riskData.filter(r => r.severity === "S 1" && r.priority === "P 1");
    return `**S 1 + P 1 Risks (${filtered.length} items):**\n\n${filtered.map(r => `- **${r.mrdrDescription}** (${r.msoCountry}, ${r.site}) — ${r.expectedLossCases.toLocaleString()} cases, $${r.expectedLossValue.toLocaleString()}`).join("\n")}`;
  }

  if (lower.includes("gtin") && (lower.includes("longest") || lower.includes("duration"))) {
    const sorted = [...riskData].sort((a, b) => b.riskInDays - a.riskInDays).slice(0, 5);
    return `**Top 5 Longest Risk Durations:**\n\n${sorted.map((r, i) => `${i + 1}. GTIN **${r.gtin}** — ${r.riskInDays} days (${r.mrdrDescription}, ${r.msoCountry})`).join("\n")}`;
  }

  const open = riskData.filter(r => r.status === "Open").length;
  const totalVal = riskData.reduce((s, r) => s + r.expectedLossValue, 0);
  return `**Risk Overview:**\n\n- **Total Risks:** ${riskData.length}\n- **Open:** ${open}\n- **Total Value at Risk:** $${totalVal.toLocaleString()}\n\nTry asking:\n- "Top 5 risks by expected loss"\n- "Which country has the most critical risks?"`;
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
    }, 800);
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />;
    });
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-gradient-to-b from-primary to-primary-glow text-primary-foreground rounded-l-xl px-2 py-4 flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all hover:px-3"
      >
        <Bot className="h-5 w-5" />
        <span className="text-[10px] font-semibold tracking-wider" style={{ writingMode: "vertical-rl" }}>Risk Champ</span>
      </button>
    );
  }

  return (
    <div className="fixed right-0 top-0 bottom-0 z-50 w-[380px] bg-card border-l border-border shadow-2xl flex flex-col animate-slide-in-right">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-primary-glow/3 to-transparent px-4 py-3 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground">Risk Champ</span>
            <p className="text-[10px] text-muted-foreground">AI-powered risk intelligence</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-secondary">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !typing && (
          <div className="text-center space-y-4 pt-8">
            <div className="mx-auto h-12 w-12 rounded-xl bg-primary/5 tech-glow flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Ask me anything about your risks</p>
            <div className="space-y-1.5">
              {suggestedQuestions.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="w-full text-left text-[11px] px-3 py-2 rounded-lg border border-border/60 hover:bg-secondary/50 text-foreground transition-colors flex items-center gap-2"
                >
                  <ChevronRight className="h-3 w-3 text-primary shrink-0" />
                  <span className="flex-1">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[12px] ${
              m.role === "user"
                ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-br-sm"
                : "bg-secondary/70 text-foreground rounded-bl-sm border border-border/60"
            }`}>
              {m.role === "assistant" ? renderMarkdown(m.text) : m.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="bg-secondary/70 rounded-xl rounded-bl-sm px-4 py-3 border border-border/60 flex gap-1">
              {[0, 1, 2].map(i => (
                <span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send(input)}
            placeholder="Ask about risks..."
            className="flex-1 text-xs h-9"
          />
          <button
            onClick={() => send(input)}
            className="h-9 w-9 shrink-0 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-primary-foreground flex items-center justify-center hover:shadow-lg transition-all"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}
