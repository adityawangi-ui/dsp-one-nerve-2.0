import { useState, useRef, useEffect } from "react";
import { Bell, X, Send, ExternalLink, MessageSquare, Bot, User, Hash, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface NotificationItem {
  id: string;
  riskId: number;
  title: string;
  message: string;
  sender: string;
  timestamp: Date;
  read: boolean;
}

const mockNotifications: NotificationItem[] = [
  {
    id: "n1",
    riskId: 1,
    title: "RISK-001: Supply shortage update",
    message: "2 alternate suppliers identified. Recommend SupplierY for cost efficiency.",
    sender: "Sarah Johnson",
    timestamp: new Date(Date.now() - 3600000),
    read: false,
  },
  {
    id: "n2",
    riskId: 8,
    title: "RISK-008: Demand spike — urgent",
    message: "Emergency stock transfer from Dallas DC recommended. ETA 2 days.",
    sender: "Pierre Dupont",
    timestamp: new Date(Date.now() - 7200000),
    read: false,
  },
  {
    id: "n3",
    riskId: 5,
    title: "RISK-005: Forecast model re-run",
    message: "Variance improved from 30% to 18%. Seasonal adjustment updated.",
    sender: "Maria Garcia",
    timestamp: new Date(Date.now() - 10800000),
    read: true,
  },
];

interface Props {
  onNavigateToConversations?: () => void;
}

export default function NotificationBell({ onNavigateToConversations }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [popoutChat, setPopoutChat] = useState<{ riskId: number; title: string; messages: ChatMessage[] } | null>(null);
  const [popoutPosition, setPopoutPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [popoutInput, setPopoutInput] = useState("");
  const popoutScrollRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (popoutScrollRef.current) popoutScrollRef.current.scrollTop = popoutScrollRef.current.scrollHeight;
  }, [popoutChat?.messages]);

  const handleReply = (notif: NotificationItem) => {
    const reply = replyInputs[notif.id];
    if (!reply?.trim()) return;
    setReplyInputs(prev => ({ ...prev, [notif.id]: "" }));
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true, message: `You replied: "${reply}"` } : n));
  };

  const handlePopout = (notif: NotificationItem) => {
    setPopoutChat({
      riskId: notif.riskId,
      title: notif.title,
      messages: [
        { id: "s1", role: "system", text: `Chat opened for RISK-${String(notif.riskId).padStart(3, "0")}`, timestamp: new Date(), sender: "System" },
        { id: "a1", role: "user", text: notif.message, timestamp: notif.timestamp, sender: notif.sender },
      ],
    });
    setShowDropdown(false);
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, read: true } : n));
  };

  const handlePopoutSend = () => {
    if (!popoutInput.trim() || !popoutChat) return;
    const newMsg: ChatMessage = { id: `m-${Date.now()}`, role: "user", text: popoutInput, timestamp: new Date(), sender: "John Smith" };
    setPopoutChat(prev => prev ? { ...prev, messages: [...prev.messages, newMsg] } : null);
    setPopoutInput("");
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        role: "ai",
        text: `Noted for RISK-${String(popoutChat.riskId).padStart(3, "0")}. I'll follow up on this and notify you of any changes.`,
        timestamp: new Date(),
        sender: "Risk AI",
      };
      setPopoutChat(prev => prev ? { ...prev, messages: [...prev.messages, aiMsg] } : null);
    }, 800);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = { x: e.clientX - popoutPosition.x, y: e.clientY - popoutPosition.y };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPopoutPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const formatTime = (d: Date) => {
    const diff = Date.now() - d.getTime();
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  return (
    <>
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="relative h-8 w-8 p-0"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>

        {showDropdown && (
          <div className="absolute right-0 top-10 w-96 bg-card border border-border rounded-xl shadow-[var(--shadow-elevated)] z-50 overflow-hidden flex flex-col" style={{ maxHeight: "480px" }}>
            <div className="px-4 py-2.5 border-b border-border flex items-center justify-between shrink-0">
              <h3 className="text-xs font-semibold text-foreground">Notifications</h3>
              <Badge variant="outline" className="text-[9px]">{unreadCount} new</Badge>
            </div>
            <ScrollArea className="flex-1 min-h-0">
              {notifications.map(notif => (
                <div key={notif.id} className={cn("px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors", !notif.read && "bg-primary/[0.03]")}>
                  <div className="flex items-start gap-2">
                    <Hash className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-foreground">{notif.title}</span>
                        {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-xs text-foreground/80 mt-1 leading-relaxed">{notif.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground font-medium">{notif.sender} · {formatTime(notif.timestamp)}</span>
                      </div>

                      <div className="flex gap-1.5 mt-2">
                        <Input
                          placeholder="Reply..."
                          className="h-6 text-[10px] flex-1"
                          value={replyInputs[notif.id] || ""}
                          onChange={e => setReplyInputs(prev => ({ ...prev, [notif.id]: e.target.value }))}
                          onKeyDown={e => e.key === "Enter" && handleReply(notif)}
                        />
                        <Button size="sm" className="h-6 w-6 p-0" onClick={() => handleReply(notif)} disabled={!replyInputs[notif.id]?.trim()}>
                          <Send className="h-2.5 w-2.5" />
                        </Button>
                      </div>

                      <div className="flex gap-1.5 mt-1.5">
                        <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-primary" onClick={() => handlePopout(notif)} title="Pop out chat">
                          <ExternalLink className="h-2.5 w-2.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            {/* Single persistent Go to Conversations button */}
            {onNavigateToConversations && (
              <div className="px-4 py-2.5 border-t border-border shrink-0 bg-muted/30">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-7 text-xs gap-1.5 text-primary border-primary/30 hover:bg-primary/5"
                  onClick={() => { setShowDropdown(false); onNavigateToConversations(); }}
                >
                  <MessageSquare className="h-3 w-3" /> Go to Conversations
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pop-out draggable chat */}
      {popoutChat && (
        <div
          className="fixed z-[200] w-[360px] h-[420px] bg-card border border-border rounded-xl shadow-[var(--shadow-intense)] flex flex-col overflow-hidden"
          style={{ left: popoutPosition.x, top: popoutPosition.y }}
        >
          <div
            className="px-3 py-2 bg-primary/5 border-b border-border flex items-center justify-between cursor-move select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <Move className="h-3 w-3 text-muted-foreground" />
              <Hash className="h-3 w-3 text-primary" />
              <span className="text-[11px] font-semibold text-foreground truncate">{popoutChat.title}</span>
            </div>
            <button onClick={() => setPopoutChat(null)} className="h-5 w-5 flex items-center justify-center rounded hover:bg-muted transition-colors">
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>

          <div ref={popoutScrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {popoutChat.messages.map(msg => (
              <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : msg.role === "system" ? "justify-center" : "justify-start")}>
                {msg.role === "system" ? (
                  <span className="text-[9px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">{msg.text}</span>
                ) : (
                  <div className="max-w-[80%]">
                    <div className="flex items-center gap-1 mb-0.5">
                      {msg.role === "ai" ? <Bot className="h-2.5 w-2.5 text-primary" /> : <User className="h-2.5 w-2.5 text-muted-foreground" />}
                      <span className="text-[9px] font-medium text-foreground">{msg.sender}</span>
                    </div>
                    <div className={cn(
                      "rounded-lg px-2.5 py-1.5 text-[11px] leading-relaxed",
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-foreground border border-border/50"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-border">
            <div className="flex gap-1.5">
              <Input
                placeholder="Type a message..."
                className="flex-1 h-7 text-[10px]"
                value={popoutInput}
                onChange={e => setPopoutInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handlePopoutSend()}
              />
              <Button size="sm" className="h-7 w-7 p-0" onClick={handlePopoutSend} disabled={!popoutInput.trim()}>
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}