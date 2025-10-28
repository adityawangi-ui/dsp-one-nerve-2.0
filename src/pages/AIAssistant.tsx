import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { QuickActions } from "@/components/chat/QuickActions";
import { ChatInput } from "@/components/chat/ChatInput";
import { EmptyState } from "@/components/chat/EmptyState";
import { Button } from "@/components/ui/button";
import { RotateCcw, Download } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
  timestamp: Date;
  agents?: string[];
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${content}". Let me analyze your planning data and coordinate with the relevant agents to provide you with comprehensive insights.`,
        role: "ai",
        timestamp: new Date(),
        agents: ["Demand Agent", "Supply Agent"],
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20">
        {/* Chat Container */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-auto px-6 py-4">
            {messages.length === 0 ? (
              <EmptyState onQuickAction={handleQuickAction} />
            ) : (
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((message, index) => (
                  <div 
                    key={message.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <MessageBubble message={message} />
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-3 text-muted-foreground animate-fade-in ml-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-sm">Orchestrator is thinking...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-6 py-2">
            <QuickActions onQuickAction={handleQuickAction} />
          </div>

          {/* Chat Input */}
          <div className="px-6 py-3 bg-gradient-subtle">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}