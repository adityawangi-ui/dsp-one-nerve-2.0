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
      <div className="flex flex-col h-full bg-background">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">AI Assistant</h1>
              <p className="text-muted-foreground">Ask anything about your operations</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={clearChat}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear Chat
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-auto px-6 py-4">
            {messages.length === 0 ? (
              <EmptyState onQuickAction={handleQuickAction} />
            ) : (
              <div className="space-y-4 max-w-4xl mx-auto">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span>AI is thinking...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-6 pb-2">
            <QuickActions onQuickAction={handleQuickAction} />
          </div>

          {/* Chat Input */}
          <div className="px-6 pb-4">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}