import { useState } from "react";
import { Send, MessageSquare, X, Minimize2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  agent?: string;
  actions?: Array<{
    label: string;
    variant: "default" | "secondary" | "destructive";
  }>;
}

interface AIChatPanelProps {
  isOpen: boolean;
  isMinimized: boolean;
  onToggle: () => void;
  onMinimize: () => void;
}

export const AIChatPanel = ({ isOpen, isMinimized, onToggle, onMinimize }: AIChatPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your AI orchestrator. I can help you analyze your operations, run scenarios, and coordinate with your agents. What would you like to know?",
      timestamp: new Date(),
      agent: "Orchestrator AI"
    },
    {
      id: "2",
      type: "user",
      content: "Show me the current demand trends in APAC",
      timestamp: new Date(),
    },
    {
      id: "3",
      type: "ai",
      content: "I've consulted the Demand Agent for APAC trends. There's a 15% demand increase in electronics, particularly in Southeast Asia. The Promo Agent indicates this is driven by seasonal campaigns.",
      timestamp: new Date(),
      agent: "Demand Agent",
      actions: [
        { label: "View Details", variant: "default" },
        { label: "Simulate Impact", variant: "secondary" },
        { label: "Adjust Forecast", variant: "secondary" }
      ]
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I'm analyzing that for you. Let me check with the relevant agents...",
        timestamp: new Date(),
        agent: "Orchestrator AI"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-[var(--shadow-elevated)] bg-primary hover:bg-primary/90 z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <div 
      className={cn(
        "fixed right-6 bg-card border border-border rounded-lg shadow-[var(--shadow-elevated)] z-50 transition-all duration-300",
        isMinimized ? "bottom-6 w-80 h-16" : "bottom-6 w-96 h-[600px]"
      )}
    >
      {/* Header */}
      <div className="h-16 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">AI Copilot</h3>
            <p className="text-xs text-muted-foreground">Planning Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={onMinimize}>
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 h-[480px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={cn(
                      "flex",
                      message.type === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-lg px-4 py-3",
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      {message.agent && message.type === "ai" && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {message.agent}
                          </Badge>
                        </div>
                      )}
                      <p className="text-sm">{message.content}</p>
                      
                      {message.actions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant={action.variant}
                              size="sm"
                              className="h-7 text-xs"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="h-16 border-t border-border p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about operations, scenarios, or decisions..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 h-8 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="h-8 w-8 p-0"
                disabled={!newMessage.trim()}
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};