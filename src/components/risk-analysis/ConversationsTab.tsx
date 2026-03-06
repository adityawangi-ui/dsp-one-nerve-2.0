import { useState, useRef, useEffect } from "react";
import { RiskRow } from "@/data/riskData";
import { riskData } from "@/data/riskData";
import { Send, Plus, Search, MessageSquare, Clock, User, Bot, Hash, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  role: "user" | "ai" | "system";
  text: string;
  timestamp: Date;
  sender?: string;
}

interface Conversation {
  id: string;
  riskId: number;
  title: string;
  messages: ChatMessage[];
  lastActivity: Date;
  unread: number;
  participants: string[];
}

const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    riskId: 1,
    title: "Supply shortage mitigation — RISK-001",
    messages: [
      { id: "m1", role: "ai", text: "Risk RISK-001 flagged: Supply shortage detected for Surf Excel 1L in India. Recommended immediate review.", timestamp: new Date(Date.now() - 3600000 * 3), sender: "Risk AI" },
      { id: "m2", role: "user", text: "Can you check if we have alternate suppliers for this?", timestamp: new Date(Date.now() - 3600000 * 2), sender: "John Smith" },
      { id: "m3", role: "ai", text: "2 alternate suppliers identified: SupplierX (lead time 5d, cost +8%) and SupplierY (lead time 7d, cost +3%). Recommend SupplierY for cost efficiency.", timestamp: new Date(Date.now() - 3600000), sender: "Risk AI" },
    ],
    lastActivity: new Date(Date.now() - 3600000),
    unread: 1,
    participants: ["John Smith", "Risk AI"],
  },
  {
    id: "conv-2",
    riskId: 5,
    title: "Forecast error resolution — RISK-005",
    messages: [
      { id: "m4", role: "user", text: "The forecast for Knorr Soup Mix seems off by 30%. Can we re-run the model?", timestamp: new Date(Date.now() - 7200000), sender: "Pierre Dupont" },
      { id: "m5", role: "ai", text: "Re-running forecast model with latest POS data. Preliminary results show 18% variance — improved from 30%. Seasonal adjustment factor was outdated.", timestamp: new Date(Date.now() - 5400000), sender: "Risk AI" },
    ],
    lastActivity: new Date(Date.now() - 5400000),
    unread: 0,
    participants: ["Pierre Dupont", "Risk AI"],
  },
  {
    id: "conv-3",
    riskId: 8,
    title: "Demand spike handling — RISK-008",
    messages: [
      { id: "m6", role: "system", text: "Conversation started for RISK-008: Demand Spike — Hellmann's Mayo 400g", timestamp: new Date(Date.now() - 86400000), sender: "System" },
      { id: "m7", role: "user", text: "This is critical. $210K exposure. What's the fastest mitigation?", timestamp: new Date(Date.now() - 82800000), sender: "Sarah Johnson" },
      { id: "m8", role: "ai", text: "Fastest option: Emergency stock transfer from Dallas DC (ETA 2 days). This covers 65% of gap. Full mitigation requires production uplift at Plant-3 (ETA 5 days).", timestamp: new Date(Date.now() - 79200000), sender: "Risk AI" },
    ],
    lastActivity: new Date(Date.now() - 79200000),
    unread: 2,
    participants: ["Sarah Johnson", "Risk AI", "John Smith"],
  },
];

function getAIResponse(text: string, riskId: number): string {
  const lower = text.toLowerCase();
  if (lower.includes("status") || lower.includes("update")) {
    return `Current status for RISK-${String(riskId).padStart(3, "0")}: Active monitoring. Last assessment 2h ago. No significant changes detected. Service level remains within threshold.`;
  }
  if (lower.includes("mitigation") || lower.includes("action")) {
    return `Recommended actions for RISK-${String(riskId).padStart(3, "0")}:\n1. Review current inventory buffer levels\n2. Contact alternate suppliers for availability\n3. Consider stock rebalancing from nearby DCs\n\nShall I generate a detailed scenario comparison?`;
  }
  return `Noted. I'll analyze this for RISK-${String(riskId).padStart(3, "0")} and provide recommendations. Based on current data, the risk trajectory is trending stable. Let me know if you need specific details.`;
}

interface Props {
  row?: RiskRow;
  initialRiskId?: number;
}

export default function ConversationsTab({ row, initialRiskId }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatRiskId, setNewChatRiskId] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConvId);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeConv?.messages]);

  // Filter conversations
  const filteredConvs = conversations.filter(c => {
    if (!searchQuery) return true;
    return c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(c.riskId).includes(searchQuery);
  });

  const handleSend = () => {
    if (!input.trim() || !activeConv) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      role: "user",
      text: input,
      timestamp: new Date(),
      sender: "John Smith",
    };
    setConversations(prev => prev.map(c =>
      c.id === activeConv.id
        ? { ...c, messages: [...c.messages, newMsg], lastActivity: new Date() }
        : c
    ));
    setInput("");

    // AI response
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        role: "ai",
        text: getAIResponse(input, activeConv.riskId),
        timestamp: new Date(),
        sender: "Risk AI",
      };
      setConversations(prev => prev.map(c =>
        c.id === activeConv.id
          ? { ...c, messages: [...c.messages, aiMsg], lastActivity: new Date() }
          : c
      ));
    }, 1000);
  };

  const handleNewConversation = () => {
    const riskId = parseInt(newChatRiskId) || (row?.riskId ?? riskData[0].riskId);
    const risk = riskData.find(r => r.riskId === riskId);
    const conv: Conversation = {
      id: `conv-${Date.now()}`,
      riskId,
      title: `${risk?.mrdrDescription || "New discussion"} — RISK-${String(riskId).padStart(3, "0")}`,
      messages: [
        {
          id: `m-${Date.now()}`,
          role: "system",
          text: `Conversation started for RISK-${String(riskId).padStart(3, "0")}${risk ? `: ${risk.mrdrDescription}` : ""}`,
          timestamp: new Date(),
          sender: "System",
        },
      ],
      lastActivity: new Date(),
      unread: 0,
      participants: ["John Smith", "Risk AI"],
    };
    setConversations(prev => [conv, ...prev]);
    setActiveConvId(conv.id);
    setShowNewChat(false);
    setNewChatRiskId("");
  };

  const handleRestartConversation = () => {
    if (!activeConv) return;
    const restarted: Conversation = {
      ...activeConv,
      id: `conv-${Date.now()}`,
      messages: [
        {
          id: `m-${Date.now()}`,
          role: "system",
          text: `Conversation restarted for RISK-${String(activeConv.riskId).padStart(3, "0")}`,
          timestamp: new Date(),
          sender: "System",
        },
      ],
      lastActivity: new Date(),
      unread: 0,
    };
    setConversations(prev => [restarted, ...prev]);
    setActiveConvId(restarted.id);
  };

  const formatTime = (d: Date) => {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden" style={{ height: "600px" }}>
      <div className="flex h-full">
        {/* Sidebar — Conversation List */}
        <div className={cn("w-80 border-r border-border flex flex-col shrink-0", activeConvId && "hidden md:flex")}>
          {/* Header */}
          <div className="p-3 border-b border-border space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Conversations</h3>
              <Button size="sm" className="h-7 text-xs gap-1" onClick={() => setShowNewChat(true)}>
                <Plus className="h-3 w-3" /> New
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input
                placeholder="Search by risk ID or topic..."
                className="pl-8 h-7 text-xs"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* New Chat Dialog */}
          {showNewChat && (
            <div className="p-3 border-b border-border bg-primary/5 space-y-2">
              <p className="text-xs font-medium text-foreground">Start New Conversation</p>
              <Input
                placeholder="Enter Risk ID (e.g., 1, 5, 8)"
                className="h-7 text-xs"
                value={newChatRiskId}
                onChange={e => setNewChatRiskId(e.target.value)}
              />
              <div className="flex gap-2">
                <Button size="sm" className="h-6 text-[10px] flex-1" onClick={handleNewConversation}>Create</Button>
                <Button size="sm" variant="outline" className="h-6 text-[10px]" onClick={() => setShowNewChat(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {/* List */}
          <ScrollArea className="flex-1">
            {filteredConvs.map(conv => (
              <button
                key={conv.id}
                onClick={() => { setActiveConvId(conv.id); setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c)); }}
                className={cn(
                  "w-full text-left px-3 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors",
                  activeConvId === conv.id && "bg-primary/5 border-l-2 border-l-primary"
                )}
              >
                <div className="flex items-start gap-2">
                  <Hash className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground truncate">{conv.title}</span>
                      {conv.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-[9px] h-4 min-w-4 px-1">{conv.unread}</Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {conv.messages[conv.messages.length - 1]?.text.slice(0, 60)}...
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] text-muted-foreground flex items-center gap-0.5">
                        <Clock className="h-2.5 w-2.5" /> {formatTime(conv.lastActivity)}
                      </span>
                      <span className="text-[9px] text-muted-foreground">
                        {conv.participants.length} participants
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between bg-card">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 md:hidden" onClick={() => setActiveConvId(null)}>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Button>
                  <Hash className="h-3.5 w-3.5 text-primary" />
                  <div>
                    <span className="text-xs font-semibold text-foreground">{activeConv.title}</span>
                    <p className="text-[10px] text-muted-foreground">{activeConv.participants.join(", ")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1" onClick={handleRestartConversation}>
                  <Plus className="h-3 w-3" /> Restart
                </Button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeConv.messages.map(msg => (
                  <div key={msg.id} className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : msg.role === "system" ? "justify-center" : "justify-start"
                  )}>
                    {msg.role === "system" ? (
                      <div className="text-[10px] text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                        {msg.text}
                      </div>
                    ) : (
                      <div className="max-w-[75%] space-y-0.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {msg.role === "ai" ? (
                            <Bot className="h-3 w-3 text-primary" />
                          ) : (
                            <User className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className="text-[10px] font-medium text-foreground">{msg.sender}</span>
                          <span className="text-[9px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
                        </div>
                        <div className={cn(
                          "rounded-xl px-3 py-2 text-xs leading-relaxed",
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 text-foreground border border-border/50"
                        )}>
                          {msg.text}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder={`Message RISK-${String(activeConv.riskId).padStart(3, "0")}...`}
                    className="flex-1 h-8 text-xs"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                  />
                  <Button size="sm" className="h-8 w-8 p-0" onClick={handleSend} disabled={!input.trim()}>
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                <h3 className="text-sm font-semibold text-foreground">Select a conversation</h3>
                <p className="text-xs text-muted-foreground">Choose from the list or start a new one</p>
                <Button size="sm" className="gap-1 text-xs" onClick={() => setShowNewChat(true)}>
                  <Plus className="h-3 w-3" /> New Conversation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export for use in notifications
export { mockConversations, type Conversation, type ChatMessage };
