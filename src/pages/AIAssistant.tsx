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
        <div className="border-b border-border px-8 py-6 bg-gradient-subtle backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent">
                Orchestrator
              </h1>
              <p className="text-muted-foreground mt-1">Ask anything about your operations</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearChat}
                className="hover-lift hover:bg-muted transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear Chat
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="hover-lift hover:bg-muted transition-all duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-auto px-8 py-6">
            {messages.length === 0 ? (
              <EmptyState onQuickAction={handleQuickAction} />
            ) : (
              <div className="space-y-6 max-w-5xl mx-auto">
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
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-sm">Orchestrator is thinking...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="px-8 pb-4">
            <QuickActions onQuickAction={handleQuickAction} />
          </div>

          {/* Chat Input */}
          <div className="px-8 pb-6 bg-gradient-subtle">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}