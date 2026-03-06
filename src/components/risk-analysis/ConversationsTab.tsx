import { useState, useRef, useEffect } from "react";
import { RiskRow } from "@/data/riskData";
import { riskData } from "@/data/riskData";
import { Send, Plus, Search, MessageSquare, Clock, User, Bot, Hash, ArrowLeft, Trash2, Users, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
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
  isGroup?: boolean;
  status: "in-progress" | "completed";
}

const teamMembers = ["Sarah Johnson", "Pierre Dupont", "Maria Garcia", "James Wilson", "Anna Mueller", "Carlos Ruiz"];

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
    status: "in-progress",
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
    status: "completed",
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
    isGroup: true,
    status: "in-progress",
  },
];

function getAIResponse(text: string, riskId: number): string {
  const lower = text.toLowerCase();
  if (lower.includes("status") || lower.includes("update")) {
    return `Current status for RISK-${String(riskId).padStart(3, "0")}: Active monitoring. Last assessment 2h ago. No significant changes detected.`;
  }
  if (lower.includes("mitigation") || lower.includes("action")) {
    return `Recommended actions for RISK-${String(riskId).padStart(3, "0")}:\n1. Review current inventory buffer levels\n2. Contact alternate suppliers for availability\n3. Consider stock rebalancing from nearby DCs`;
  }
  return `Noted. I'll analyze this for RISK-${String(riskId).padStart(3, "0")} and provide recommendations. The risk trajectory is trending stable.`;
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
  const [newChatUser, setNewChatUser] = useState("");
  const [newChatRiskId, setNewChatRiskId] = useState("");
  const [newChatStep, setNewChatStep] = useState<"user" | "risk">("user");
  const [selectedNewChatUser, setSelectedNewChatUser] = useState("");
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [groupRiskId, setGroupRiskId] = useState(row ? String(row.riskId) : "");
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConvId);
  const currentRiskId = row?.riskId ?? riskData[0].riskId;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [activeConv?.messages]);

  // Filter team members by search
  const filteredMembers = newChatUser
    ? teamMembers.filter(m => m.toLowerCase().includes(newChatUser.toLowerCase()))
    : teamMembers;

  const filteredConvs = conversations.filter(c => {
    if (!searchQuery) return true;
    return c.title.toLowerCase().includes(searchQuery.toLowerCase()) || String(c.riskId).includes(searchQuery);
  });

  const handleSend = () => {
    if (!input.trim() || !activeConv) return;
    const newMsg: ChatMessage = { id: `m-${Date.now()}`, role: "user", text: input, timestamp: new Date(), sender: "John Smith" };
    setConversations(prev => prev.map(c => c.id === activeConv.id ? { ...c, messages: [...c.messages, newMsg], lastActivity: new Date() } : c));
    setInput("");
    setTimeout(() => {
      const aiMsg: ChatMessage = { id: `m-${Date.now() + 1}`, role: "ai", text: getAIResponse(input, activeConv.riskId), timestamp: new Date(), sender: "Risk AI" };
      setConversations(prev => prev.map(c => c.id === activeConv.id ? { ...c, messages: [...c.messages, aiMsg], lastActivity: new Date() } : c));
    }, 1000);
  };

  // Get risk IDs for the current MRDR context
  const mrdrRiskIds = useMemo(() => {
    if (!row) return riskData.map(r => r.riskId);
    return riskData.filter(r => r.mrdr === row.mrdr).map(r => r.riskId);
  }, [row]);

  const handleSelectUser = (memberName: string) => {
    setSelectedNewChatUser(memberName);
    setNewChatStep("risk");
    setNewChatUser("");
  };

  const handleNewConversation = (riskId: number) => {
    const risk = riskData.find(r => r.riskId === riskId);
    const conv: Conversation = {
      id: `conv-${Date.now()}`, riskId,
      title: `Chat with ${selectedNewChatUser} — RISK-${String(riskId).padStart(3, "0")}`,
      messages: [{ id: `m-${Date.now()}`, role: "system", text: `Conversation started with ${selectedNewChatUser} for RISK-${String(riskId).padStart(3, "0")}${risk ? `: ${risk.mrdrDescription}` : ""}`, timestamp: new Date(), sender: "System" }],
      lastActivity: new Date(), unread: 0, participants: ["John Smith", selectedNewChatUser, "Risk AI"],
      status: "in-progress",
    };
    setConversations(prev => [conv, ...prev]);
    setActiveConvId(conv.id);
    setShowNewChat(false);
    setNewChatUser("");
    setNewChatRiskId("");
    setNewChatStep("user");
    setSelectedNewChatUser("");
  };

  const handleDeleteConversation = (convId: string) => {
    setDeleteConfirm(convId);
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    setConversations(prev => prev.filter(c => c.id !== deleteConfirm));
    if (activeConvId === deleteConfirm) setActiveConvId(null);
    setDeleteConfirm(null);
  };

  const handleCreateGroup = () => {
    if (selectedMembers.size === 0) return;
    const riskId = parseInt(groupRiskId) || currentRiskId;
    const risk = riskData.find(r => r.riskId === riskId);
    const members = Array.from(selectedMembers);
    const conv: Conversation = {
      id: `conv-${Date.now()}`, riskId,
      title: groupName || `Group: RISK-${String(riskId).padStart(3, "0")}`,
      messages: [{ id: `m-${Date.now()}`, role: "system", text: `Group created for RISK-${String(riskId).padStart(3, "0")} with ${members.join(", ")}`, timestamp: new Date(), sender: "System" }],
      lastActivity: new Date(), unread: 0, participants: ["John Smith", "Risk AI", ...members], isGroup: true, status: "in-progress",
    };
    setConversations(prev => [conv, ...prev]);
    setActiveConvId(conv.id);
    setShowGroupDialog(false);
    setGroupRiskId(row ? String(row.riskId) : ""); setGroupName(""); setSelectedMembers(new Set());
  };

  const formatTime = (d: Date) => {
    const diff = Date.now() - d.getTime();
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  return (
    <div className="border border-border rounded-xl bg-card overflow-hidden" style={{ height: "600px" }}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className={cn("w-80 border-r border-border flex flex-col shrink-0", activeConvId && "hidden md:flex")}>
          <div className="p-3 border-b border-border space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Conversations</h3>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={() => setShowGroupDialog(true)}>
                  <Users className="h-3 w-3" /> Group
                </Button>
                <Button size="sm" className="h-7 text-xs gap-1" onClick={() => setShowNewChat(true)}>
                  <Plus className="h-3 w-3" /> New
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input placeholder="Search by risk ID or topic..." className="pl-8 h-7 text-xs" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>

          {/* New Chat — step 1: select user, step 2: select risk ID */}
          {showNewChat && (
            <div className="p-3 border-b border-border bg-primary/5 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-foreground">
                  {newChatStep === "user" ? "1. Select Team Member" : `2. Select Risk ID (for ${selectedNewChatUser})`}
                </p>
                <div className="flex gap-1">
                  {newChatStep === "risk" && (
                    <Button size="sm" variant="ghost" className="h-5 text-[9px] px-1" onClick={() => { setNewChatStep("user"); setSelectedNewChatUser(""); }}>Back</Button>
                  )}
                  <Button size="sm" variant="ghost" className="h-5 text-[9px] px-1" onClick={() => { setShowNewChat(false); setNewChatStep("user"); setSelectedNewChatUser(""); }}>Cancel</Button>
                </div>
              </div>

              {newChatStep === "user" ? (
                <>
                  <Input
                    placeholder="Search team member..."
                    className="h-7 text-xs"
                    value={newChatUser}
                    onChange={e => setNewChatUser(e.target.value)}
                  />
                  <div className="space-y-0.5 max-h-32 overflow-y-auto">
                    {filteredMembers.map(member => (
                      <button
                        key={member}
                        onClick={() => handleSelectUser(member)}
                        className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 transition-colors"
                      >
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-xs text-foreground">{member}</span>
                      </button>
                    ))}
                    {filteredMembers.length === 0 && (
                      <p className="text-[10px] text-muted-foreground text-center py-2">No members found</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Input
                    placeholder="Search risk ID..."
                    className="h-7 text-xs"
                    value={newChatRiskId}
                    onChange={e => setNewChatRiskId(e.target.value)}
                  />
                  <div className="space-y-0.5 max-h-40 overflow-y-auto">
                    {mrdrRiskIds
                      .filter(id => !newChatRiskId || String(id).includes(newChatRiskId))
                      .map(riskId => {
                        const risk = riskData.find(r => r.riskId === riskId);
                        return (
                          <button
                            key={riskId}
                            onClick={() => handleNewConversation(riskId)}
                            className="w-full text-left flex items-center gap-2 px-2 py-1.5 rounded hover:bg-muted/50 transition-colors"
                          >
                            <div className="h-5 w-5 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                              <AlertTriangle className="h-3 w-3 text-warning" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-medium text-foreground">RISK-{String(riskId).padStart(3, "0")}</span>
                              {risk && <span className="text-[10px] text-muted-foreground ml-1.5">{risk.mrdrDescription}</span>}
                            </div>
                            <Badge variant="outline" className="text-[9px]">{risk?.severity}</Badge>
                          </button>
                        );
                      })}
                  </div>
                  {row && (
                    <p className="text-[9px] text-muted-foreground">MRDR {row.mrdr}: {row.mrdrDescription}</p>
                  )}
                </>
              )}
            </div>
          )}

          <ScrollArea className="flex-1">
            {filteredConvs.map(conv => (
              <div key={conv.id} className={cn("w-full text-left px-3 py-3 border-b border-border/50 hover:bg-muted/50 transition-colors group relative", activeConvId === conv.id && "bg-primary/5 border-l-2 border-l-primary")}>
                <button onClick={() => { setActiveConvId(conv.id); setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c)); }} className="w-full text-left">
                  <div className="flex items-start gap-2">
                    {conv.isGroup ? <Users className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" /> : <Hash className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground truncate">{conv.title}</span>
                        {conv.unread > 0 && <Badge className="bg-primary text-primary-foreground text-[9px] h-4 min-w-4 px-1">{conv.unread}</Badge>}
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate mt-0.5">{conv.messages[conv.messages.length - 1]?.text.slice(0, 60)}...</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" /> {formatTime(conv.lastActivity)}</span>
                        <span className="text-[9px] text-muted-foreground">{conv.participants.length} participants</span>
                        <Badge
                          variant="outline"
                          className={`text-[8px] cursor-pointer ${conv.status === "completed" ? "bg-success/10 text-success border-success/30" : "bg-warning/10 text-warning border-warning/30"}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, status: c.status === "completed" ? "in-progress" : "completed" } : c));
                          }}
                        >
                          {conv.status === "completed" ? "Completed" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteConversation(conv.id); }} className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center rounded hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity" title="Delete conversation">
                  <Trash2 className="h-3 w-3 text-destructive" />
                </button>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {activeConv ? (
            <>
              <div className="px-4 py-2.5 border-b border-border flex items-center justify-between bg-card">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 md:hidden" onClick={() => setActiveConvId(null)}><ArrowLeft className="h-3.5 w-3.5" /></Button>
                  {activeConv.isGroup ? <Users className="h-3.5 w-3.5 text-primary" /> : <Hash className="h-3.5 w-3.5 text-primary" />}
                  <div>
                    <span className="text-xs font-semibold text-foreground">{activeConv.title}</span>
                    <p className="text-[10px] text-muted-foreground">{activeConv.participants.join(", ")}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-[10px] gap-1 text-destructive border-destructive/30 hover:bg-destructive/10" onClick={() => handleDeleteConversation(activeConv.id)}>
                  <Trash2 className="h-3 w-3" /> Delete
                </Button>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeConv.messages.map(msg => (
                  <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : msg.role === "system" ? "justify-center" : "justify-start")}>
                    {msg.role === "system" ? (
                      <div className="text-[10px] text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">{msg.text}</div>
                    ) : (
                      <div className="max-w-[75%] space-y-0.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {msg.role === "ai" ? <Bot className="h-3 w-3 text-primary" /> : <User className="h-3 w-3 text-muted-foreground" />}
                          <span className="text-[10px] font-medium text-foreground">{msg.sender}</span>
                          <span className="text-[9px] text-muted-foreground">{formatTime(msg.timestamp)}</span>
                        </div>
                        <div className={cn("rounded-xl px-3 py-2 text-xs leading-relaxed", msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-foreground border border-border/50")}>{msg.text}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-border">
                <div className="flex gap-2">
                  <Input placeholder={`Message RISK-${String(activeConv.riskId).padStart(3, "0")}...`} className="flex-1 h-8 text-xs" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} />
                  <Button size="sm" className="h-8 w-8 p-0" onClick={handleSend} disabled={!input.trim()}><Send className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-3">
                <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto" />
                <h3 className="text-sm font-semibold text-foreground">Select a conversation</h3>
                <p className="text-xs text-muted-foreground">Choose from the list or start a new one</p>
                <Button size="sm" className="gap-1 text-xs" onClick={() => setShowNewChat(true)}><Plus className="h-3 w-3" /> New Conversation</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Group Dialog */}
      <Dialog open={showGroupDialog} onOpenChange={setShowGroupDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle className="text-sm">Create Group Conversation</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground">Group Name (optional)</label>
              <Input placeholder="e.g., Supply Chain Team" className="h-8 text-xs mt-1" value={groupName} onChange={e => setGroupName(e.target.value)} />
            </div>
            {row && (
              <p className="text-[10px] text-muted-foreground">For RISK-{String(currentRiskId).padStart(3, "0")}: {row.mrdrDescription}</p>
            )}
            <div>
              <label className="text-xs font-medium text-foreground mb-2 block">Select Members</label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto">
                {teamMembers.map(member => (
                  <label key={member} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-muted/50 px-2 py-1 rounded">
                    <Checkbox checked={selectedMembers.has(member)} onCheckedChange={(c) => { const next = new Set(selectedMembers); if (c) next.add(member); else next.delete(member); setSelectedMembers(next); }} />
                    {member}
                  </label>
                ))}
              </div>
            </div>
            <Button size="sm" className="w-full text-xs" onClick={handleCreateGroup} disabled={selectedMembers.size === 0}>Create Group ({selectedMembers.size} members)</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => { if (!open) setDeleteConfirm(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" /> Delete Conversation
            </DialogTitle>
            <DialogDescription className="text-xs">
              Are you sure you want to delete this conversation? This action cannot be undone and all messages will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" size="sm" className="text-xs gap-1" onClick={confirmDelete}>
              <Trash2 className="h-3 w-3" /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { mockConversations, type Conversation, type ChatMessage };