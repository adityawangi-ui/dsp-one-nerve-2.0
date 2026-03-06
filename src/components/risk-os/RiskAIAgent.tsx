import { useState, useRef, useEffect } from "react";
import { riskData, RiskRow } from "@/data/riskData";
import { Bot, X, Sparkles, ChevronRight, Send, Zap, BarChart3, RefreshCw, Brain, Shield, MessageSquare, History, Trash2, Share2, Plus, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

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
    return `**Demand Spike Analysis:**\n\n**AI Confidence: 94%** · Based on 38 historical patterns\n\n**Key Drivers Identified:**\n1. **Promotional uplift** — W3 campaign driving +35% expected volume\n2. **Seasonal pattern** — Historical Feb-Mar surge (+18% YoY)\n3. **Competitor stockout** — Market intel shows competitor OOS in 2 regions`;
  }
  if (lower.includes("rebalance") || lower.includes("warehouse")) {
    return `**Warehouse Rebalance Simulation:**\n\n**AI Confidence: 87%** · 12 simulations run\n\n**Optimal Rebalance:**\n• DC-North → DC-Central: 1,200 cases\n• DC-South → DC-Central: 800 cases\n• Estimated cost: €4,200\n• Service level improvement: +6%`;
  }
  if (lower.includes("compare") && lower.includes("scenario")) {
    return `**Scenario Comparison Summary:**\n\n**AI Confidence: 91%**\n\n| Metric | S1 | S2 | S3 (Rec) |\n|--------|-----|-----|----------|\n| Success | 85% | 89% | **91%** |\n| Cost | €26K | €16K | **€16K** |\n| SL Impact | +6% | +8% | **+11%** |`;
  }
  if (lower.includes("explain") && lower.includes("risk")) {
    const topRisk = riskData[0];
    return `**Risk Explanation — RISK-${String(topRisk.riskId).padStart(3, "0")}:**\n\n**AI Confidence: 96%**\n\n**What happened:**\nSupplier capacity constraint for ${topRisk.mrdrDescription}. Raw material delayed by 5 days.\n\n**Why it matters:**\n• ${topRisk.expectedLossCases.toLocaleString()} cases at risk\n• Revenue impact: €${topRisk.expectedLossValue.toLocaleString()}`;
  }
  if (lower.includes("top") && lower.includes("loss")) {
    const sorted = [...riskData].sort((a, b) => b.expectedLossCases - a.expectedLossCases).slice(0, 5);
    return `**Top 5 Risks by Expected Loss:**\n\n**AI Confidence: 98%**\n\n${sorted.map((r, i) => `${i + 1}. **${r.mrdrDescription}** (${r.msoCountry})\n   → ${r.expectedLossCases.toLocaleString()} cases · €${r.expectedLossValue.toLocaleString()}`).join("\n\n")}`;
  }
  if (lower.includes("total value") || lower.includes("value at risk")) {
    const totalVal = riskData.reduce((s, r) => s + r.expectedLossValue, 0);
    const totalCases = riskData.reduce((s, r) => s + r.expectedLossCases, 0);
    return `**Value at Risk Summary:**\n\n**AI Confidence: 99%**\n\n- **Total Expected Loss Value:** €${totalVal.toLocaleString()}\n- **Total Expected Loss Cases:** ${totalCases.toLocaleString()}\n- **Open Items:** ${riskData.filter(r => r.status === "Open").length}`;
  }
  if (lower.includes("critical risk") || (lower.includes("next week") && lower.includes("action"))) {
    const critical = [...riskData].sort((a, b) => b.expectedLossCases - a.expectedLossCases).slice(0, 3);
    return `**Critical Risks Identified for Next Week (Plant Level)**\n\n**Risk 1 — Raw Material Shortage (High)**\nLinear Alkyl Benzene (LAB) arriving 2 days late due to transporter backlog.\n→ Impacts: 4 production lines (Home Care), 18% capacity at risk.\n→ MRDR: ${critical[0]?.mrdrDescription || "N/A"} · ${critical[0]?.expectedLossCases.toLocaleString() || 0} cases at risk\n\n**Risk 2 — Packaging Material Variance (Medium)**\nFoil supplier dispatch at 72% of plan; lead time spike from 4 to 7 days.\n→ Impacts: Shampoo sachet output.\n→ MRDR: ${critical[1]?.mrdrDescription || "N/A"} · ${critical[1]?.expectedLossCases.toLocaleString() || 0} cases at risk\n\n**Risk 3 — Manpower Availability Dip (Medium)**\n11% absenteeism predicted for Night Shift due to festival period.\n→ Impacts: Pick–Pack–Dispatch lag of ~6–8 hours.\n→ MRDR: ${critical[2]?.mrdrDescription || "N/A"} · ${critical[2]?.expectedLossCases.toLocaleString() || 0} cases at risk\n\n---\n\n**Why These Risks Were Selected (Transparent Agentic Reasoning)**\n\n• Cross-checked production plan vs. confirmed inbound supply → shortage patterns detected.\n• Simulated next week's line loading → predicted 14% scheduling conflict due to LAB delay.\n• Ran supplier reliability model → anomaly spotted in packaging vendor's cycle time.\n• Mapped staffing forecast + past absentee trends → manpower spike predicted.\n• System surfaced these 3 risks because they hit highest combined score of: **business impact + probability + recovery time.**\n\n---\n\n**Recommended Actions (Prescriptive + Prioritized)**\n\n**Action 1 — Trigger alternate sourcing for LAB** (Immediate)\n• Swap 12 MT from the East region buffer.\n• Expedite with 24-hr SLA (already pre-validated with logistics partner).\n\n**Action 2 — Re-balance shampoo production sequence** (Within 3 hours)\n• Move SKUs relying on foil packaging to end of cycle.\n• Switch to HDPE lines first to avoid idle time.\n\n**Action 3 — Pre-approve overtime + temp workforce** (Within today)\n• Add 14 temporary workers via registered agency.\n• Overtime band is still within compliance.`;
  }
  const open = riskData.filter(r => r.status === "Open").length;
  const totalVal = riskData.reduce((s, r) => s + r.expectedLossValue, 0);
  return `**Risk Overview:**\n\n**AI Confidence: 95%**\n\n- **Total Risks:** ${riskData.length}\n- **Open:** ${open}\n- **Total Value at Risk:** €${totalVal.toLocaleString()}\n\nTry one of the suggested actions below.`;
}

interface Message { role: "user" | "assistant"; text: string; }

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function RiskAIAgent() {
  const [open, setOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: "s1", title: "Demand spike analysis", messages: [{ role: "user", text: "Show demand spike drivers" }, { role: "assistant", text: getAnswer("Show demand spike drivers") }], createdAt: new Date(Date.now() - 86400000) },
    { id: "s2", title: "Value at risk overview", messages: [{ role: "user", text: "What is the total value at risk?" }, { role: "assistant", text: getAnswer("What is the total value at risk?") }], createdAt: new Date(Date.now() - 172800000) },
  ]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);
  const [shareDialog, setShareDialog] = useState<string | null>(null);
  const [shareTo, setShareTo] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { role: "user" as const, text }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const answer = getAnswer(text);
      const finalMessages = [...newMessages, { role: "assistant" as const, text: answer }];
      setMessages(finalMessages);
      setTyping(false);

      // Auto-save to session
      if (activeSessionId) {
        setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: finalMessages } : s));
      } else {
        const newSession: ChatSession = {
          id: `s-${Date.now()}`,
          title: text.slice(0, 40),
          messages: finalMessages,
          createdAt: new Date(),
        };
        setSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newSession.id);
      }
    }, 1200);
  };

  const startNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
    setShowHistory(false);
  };

  const loadSession = (session: ChatSession) => {
    setActiveSessionId(session.id);
    setMessages(session.messages);
    setShowHistory(false);
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) { setActiveSessionId(null); setMessages([]); }
    setDeleteDialog(null);
    toast.success("Chat deleted");
  };

  const handleShare = () => {
    if (!shareTo.trim()) return;
    toast.success(`Chat shared with ${shareTo}`);
    setShareDialog(null);
    setShareTo("");
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, i) => {
      let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      processed = processed.replace(/(AI Confidence: \d+%)/g, '<span class="neon-text text-primary font-semibold">$1</span>');
      return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />;
    });
  };

  const formatTime = (d: Date) => {
    const diff = Date.now() - d.getTime();
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
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
    <div className="fixed right-0 top-0 bottom-0 z-50 w-[480px] glass-panel shadow-2xl flex flex-col animate-slide-in-right border-l border-primary/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary-glow/5 to-transparent px-4 py-3 flex items-center justify-between border-b border-border/30">
        <div className="flex items-center gap-2.5">
          {showHistory && (
            <button onClick={() => setShowHistory(false)} className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors mr-1">
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center tech-glow">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-semibold text-foreground">{showHistory ? "Chat History" : "Risk Copilot"}</span>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <p className="text-[10px] text-muted-foreground">{showHistory ? `${sessions.length} conversations` : "AI-powered · Always analyzing"}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {!showHistory && (
            <button onClick={() => setShowHistory(true)} className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors" title="Chat history">
              <History className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          {!showHistory && (
            <button onClick={startNewChat} className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors" title="New chat">
              <Plus className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
          <button onClick={() => setOpen(false)} className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Chat History View */}
      {showHistory ? (
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          <Button variant="outline" size="sm" className="w-full h-8 text-xs gap-1.5 mb-3" onClick={startNewChat}>
            <Plus className="h-3 w-3" /> New Conversation
          </Button>
          {sessions.map(session => (
            <div
              key={session.id}
              className={`rounded-lg border border-border/50 p-3 hover:bg-secondary/50 transition-colors cursor-pointer group ${activeSessionId === session.id ? "bg-primary/5 border-primary/30" : ""}`}
              onClick={() => loadSession(session)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{session.title}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{session.messages.length} messages · {formatTime(session.createdAt)}</p>
                </div>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShareDialog(session.id); }}
                    className="h-6 w-6 flex items-center justify-center rounded hover:bg-muted transition-colors"
                    title="Share"
                  >
                    <Share2 className="h-3 w-3 text-muted-foreground" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteDialog(session.id); }}
                    className="h-6 w-6 flex items-center justify-center rounded hover:bg-destructive/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="text-center py-8">
              <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No chat history yet</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && !typing && (
              <div className="space-y-5 pt-4">
                <div className="text-center space-y-3">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 tech-glow flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">What would you like to analyze?</p>
                    <p className="text-[11px] text-muted-foreground mt-1">I'm monitoring your risks in real-time</p>
                  </div>
                </div>
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
        </>
      )}

      {/* Delete Confirmation */}
      <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Delete chat?</DialogTitle></DialogHeader>
          <p className="text-sm text-muted-foreground">This conversation will be permanently deleted.</p>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setDeleteDialog(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={() => deleteDialog && deleteSession(deleteDialog)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={!!shareDialog} onOpenChange={() => setShareDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Share chat</DialogTitle></DialogHeader>
          <Input placeholder="Enter name or email..." value={shareTo} onChange={(e) => setShareTo(e.target.value)} className="text-sm" />
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setShareDialog(null)}>Cancel</Button>
            <Button size="sm" onClick={handleShare} disabled={!shareTo.trim()}>Share</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
