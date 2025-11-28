import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface GeneratedComponent {
  id: string;
  type: "chart" | "card" | "table" | "alert" | "metric";
  data: any;
  prompt: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  generatedComponents?: GeneratedComponent[];
}

interface GenerativeChatProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

export const GenerativeChat = ({ isOpen, onClose, context }: GenerativeChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: `Hi! I'm your AI assistant with generative UI capabilities. ${context ? `I can help you with ${context}.` : 'Ask me anything and I\'ll generate interactive visualizations and insights for you.'}`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateUIFromPrompt = (prompt: string): GeneratedComponent[] => {
    // Simulate AI understanding and generating components
    const lowerPrompt = prompt.toLowerCase();
    const components: GeneratedComponent[] = [];

    // Generate charts for data requests
    if (lowerPrompt.includes("chart") || lowerPrompt.includes("graph") || lowerPrompt.includes("trend")) {
      components.push({
        id: Date.now().toString(),
        type: "chart",
        data: {
          title: "Generated Trend Analysis",
          points: Array.from({ length: 7 }, (_, i) => ({
            day: `Day ${i + 1}`,
            value: Math.floor(Math.random() * 100) + 50
          }))
        },
        prompt
      });
    }

    // Generate metrics for performance requests
    if (lowerPrompt.includes("metric") || lowerPrompt.includes("kpi") || lowerPrompt.includes("performance")) {
      components.push({
        id: Date.now().toString(),
        type: "metric",
        data: {
          title: "Key Performance Indicator",
          value: Math.floor(Math.random() * 100) + "%",
          change: (Math.random() > 0.5 ? "+" : "-") + Math.floor(Math.random() * 20) + "%",
          status: Math.random() > 0.5 ? "positive" : "negative"
        },
        prompt
      });
    }

    // Generate alerts for risk/issue requests
    if (lowerPrompt.includes("risk") || lowerPrompt.includes("alert") || lowerPrompt.includes("issue")) {
      components.push({
        id: Date.now().toString(),
        type: "alert",
        data: {
          severity: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)],
          title: "Generated Alert Analysis",
          description: "Based on current data patterns, here are the identified issues.",
          items: [
            "Risk factor 1 detected",
            "Anomaly in system behavior",
            "Threshold violation observed"
          ]
        },
        prompt
      });
    }

    // Generate tables for list/data requests
    if (lowerPrompt.includes("list") || lowerPrompt.includes("table") || lowerPrompt.includes("data")) {
      components.push({
        id: Date.now().toString(),
        type: "table",
        data: {
          headers: ["Item", "Status", "Value"],
          rows: Array.from({ length: 5 }, (_, i) => [
            `Item ${i + 1}`,
            ["Active", "Pending", "Complete"][Math.floor(Math.random() * 3)],
            `$${Math.floor(Math.random() * 10000)}`
          ])
        },
        prompt
      });
    }

    // Default card if no specific UI detected
    if (components.length === 0) {
      components.push({
        id: Date.now().toString(),
        type: "card",
        data: {
          title: "Generated Insight",
          content: "I've analyzed your request. Here are the key findings based on the available data.",
          metrics: [
            { label: "Confidence", value: "94%" },
            { label: "Impact", value: "High" }
          ]
        },
        prompt
      });
    }

    return components;
  };

  const handleSend = async () => {
    if (!input.trim() || isGenerating) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const generatedComponents = generateUIFromPrompt(input);
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I've generated the following visualization based on your request:",
        timestamp: new Date(),
        generatedComponents
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 1500);
  };

  const renderGeneratedComponent = (component: GeneratedComponent) => {
    switch (component.type) {
      case "chart":
        return (
          <Card key={component.id} className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <h4 className="font-semibold mb-3 text-foreground">{component.data.title}</h4>
            <div className="space-y-2">
              {component.data.points.map((point: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{point.day}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${point.value}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-12">{point.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );

      case "metric":
        return (
          <Card key={component.id} className={cn(
            "p-4 border-2 transition-all duration-300",
            component.data.status === "positive" 
              ? "bg-success/5 border-success/30" 
              : "bg-destructive/5 border-destructive/30"
          )}>
            <p className="text-sm text-muted-foreground mb-1">{component.data.title}</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-foreground">{component.data.value}</p>
              <Badge variant={component.data.status === "positive" ? "default" : "destructive"}>
                {component.data.change}
              </Badge>
            </div>
          </Card>
        );

      case "alert":
        return (
          <Card key={component.id} className={cn(
            "p-4",
            component.data.severity === "critical" && "bg-destructive/5 border-destructive/30",
            component.data.severity === "high" && "bg-warning/5 border-warning/30",
            component.data.severity === "medium" && "bg-primary/5 border-primary/30",
            component.data.severity === "low" && "bg-muted border-border"
          )}>
            <div className="flex items-start gap-3">
              <Badge variant={
                component.data.severity === "critical" ? "destructive" :
                component.data.severity === "high" ? "warning" as any :
                "default"
              }>
                {component.data.severity.toUpperCase()}
              </Badge>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{component.data.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{component.data.description}</p>
                <ul className="space-y-1">
                  {component.data.items.map((item: string, idx: number) => (
                    <li key={idx} className="text-sm text-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        );

      case "table":
        return (
          <Card key={component.id} className="p-4 bg-card border-border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    {component.data.headers.map((header: string, idx: number) => (
                      <th key={idx} className="text-left p-2 text-sm font-semibold text-foreground">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {component.data.rows.map((row: string[], idx: number) => (
                    <tr key={idx} className="border-b border-border/50">
                      {row.map((cell: string, cellIdx: number) => (
                        <td key={cellIdx} className="p-2 text-sm text-muted-foreground">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        );

      case "card":
      default:
        return (
          <Card key={component.id} className="p-4 bg-gradient-to-br from-primary/10 to-success/5 border-primary/20">
            <h4 className="font-semibold mb-2 text-foreground">{component.data.title}</h4>
            <p className="text-sm text-muted-foreground mb-3">{component.data.content}</p>
            {component.data.metrics && (
              <div className="flex gap-4">
                {component.data.metrics.map((metric: any, idx: number) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                    <span className="text-sm font-semibold text-foreground">{metric.value}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl border-primary/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-success/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Generative UI Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask anything - I'll generate interactive components</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn(
                "flex",
                message.type === "user" ? "justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "max-w-[80%] space-y-3",
                  message.type === "user" && "flex flex-col items-end"
                )}>
                  <div className={cn(
                    "rounded-lg px-4 py-3",
                    message.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-foreground"
                  )}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  
                  {message.generatedComponents && (
                    <div className="space-y-3 w-full animate-slide-up">
                      {message.generatedComponents.map(renderGeneratedComponent)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Generating UI components...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              placeholder="Ask for charts, metrics, alerts, tables... I'll generate them for you"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              disabled={isGenerating}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Try: "Show me a trend chart", "Generate risk alerts", "Create a performance table"
          </p>
        </div>
      </Card>
    </div>
  );
};