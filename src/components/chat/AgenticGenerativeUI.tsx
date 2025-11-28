import { useState, useRef, useEffect } from "react";
import { Send, X, Loader2, Sparkles, Play, Bell, Zap, Download, Eye, Calendar, TrendingUp, AlertCircle, CheckCircle2, BarChart3, Settings2, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ActionButton {
  label: string;
  icon: any;
  variant: "default" | "secondary" | "outline" | "destructive";
  action: string;
}

interface GeneratedComponent {
  id: string;
  type: "insight" | "alert" | "recommendation" | "analysis" | "simulation";
  title: string;
  content: string;
  data?: any;
  actions: ActionButton[];
}

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  components?: GeneratedComponent[];
}

interface AgenticGenerativeUIProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const AgenticGenerativeUI = ({ isOpen, onClose, initialQuery }: AgenticGenerativeUIProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateAgenticResponse = (query: string): GeneratedComponent[] => {
    const lowerQuery = query.toLowerCase();
    const components: GeneratedComponent[] = [];

    // Risk and Alert Detection
    if (lowerQuery.includes("risk") || lowerQuery.includes("alert") || lowerQuery.includes("issue")) {
      components.push({
        id: Date.now().toString(),
        type: "alert",
        title: "Critical Supply Chain Risk Detected",
        content: "AI analysis identifies high-probability service disruption in FG-98342 due to line overload and supplier delay. Service level projected to drop from 92% to 77% within 48 hours affecting 48,320 orders.",
        data: {
          severity: "critical",
          impact: "48,320 orders",
          timeframe: "48 hours",
          confidence: "94%"
        },
        actions: [
          { label: "Run Mitigation Scenario", icon: Play, variant: "default", action: "simulate" },
          { label: "Notify Stakeholders", icon: Bell, variant: "secondary", action: "notify" },
          { label: "View Deep Dive", icon: Eye, variant: "outline", action: "navigate:risk-alert" }
        ]
      });
    }

    // Inventory and Stock Analysis
    if (lowerQuery.includes("stock") || lowerQuery.includes("inventory") || lowerQuery.includes("excess")) {
      components.push({
        id: Date.now().toString() + "1",
        type: "analysis",
        title: "Excess Stock Analysis - Spain",
        content: "AI detected 5.8K MT excess inventory ($3.4M) driven by 10 SKUs. Primary cause: forecast accuracy below 76% and over-ordering vs DMP recommendations.",
        data: {
          totalExcess: "5.8K MT",
          value: "$3.4M",
          topSKUs: 10,
          accuracy: "76%"
        },
        actions: [
          { label: "Generate Redistribution Plan", icon: TrendingUp, variant: "default", action: "simulate" },
          { label: "Schedule Liquidation", icon: Calendar, variant: "secondary", action: "schedule" },
          { label: "Export Report", icon: Download, variant: "outline", action: "export" },
          { label: "Open Optimizer", icon: Settings2, variant: "outline", action: "navigate:inventory-optimizer" }
        ]
      });
    }

    // Scenario and Simulation Requests
    if (lowerQuery.includes("scenario") || lowerQuery.includes("simulate") || lowerQuery.includes("what if")) {
      components.push({
        id: Date.now().toString() + "2",
        type: "simulation",
        title: "Multi-Agent Scenario Simulation Ready",
        content: "AI agents are ready to simulate impact across service, inventory, and capacity dimensions. Expected processing time: 3-5 minutes with real-time updates.",
        data: {
          agents: ["Service Agent", "Inventory Agent", "Capacity Agent", "RCCP Agent"],
          scenarios: 3,
          estimatedTime: "3-5 min"
        },
        actions: [
          { label: "Run Simulation", icon: Zap, variant: "default", action: "simulate" },
          { label: "Configure Parameters", icon: Settings2, variant: "secondary", action: "configure" },
          { label: "Open Scenario Studio", icon: Eye, variant: "outline", action: "navigate:scenario-studio" }
        ]
      });
    }

    // Performance and Insights
    if (lowerQuery.includes("performance") || lowerQuery.includes("kpi") || lowerQuery.includes("forecast")) {
      components.push({
        id: Date.now().toString() + "3",
        type: "insight",
        title: "Q2 Performance Diagnostic",
        content: "Service level at 94.1% (target: 97%). Key drivers: forecast bias in Personal Care (-6.5%), late replenishments in Italy/Poland, and missing supplier confirmations. Inventory DOH at 44 days (target: 38).",
        data: {
          serviceLevelActual: "94.1%",
          serviceLevelTarget: "97%",
          inventoryDOH: "44 days",
          gap: "-2.9%"
        },
        actions: [
          { label: "Generate Action Plan", icon: FileText, variant: "default", action: "generate" },
          { label: "Schedule Review", icon: Calendar, variant: "secondary", action: "schedule" },
          { label: "Share with Team", icon: Share2, variant: "outline", action: "share" },
          { label: "Open Analytics Hub", icon: BarChart3, variant: "outline", action: "navigate:insights-home" }
        ]
      });
    }

    // Default intelligent response
    if (components.length === 0) {
      components.push({
        id: Date.now().toString() + "4",
        type: "recommendation",
        title: "AI Analysis Complete",
        content: "Based on your query, I've analyzed current supply chain data and identified optimization opportunities. The multi-agent system recommends reviewing service levels, inventory positions, and capacity utilization.",
        data: {
          confidence: "87%",
          dataPoints: "12,450",
          agentsConsulted: 8
        },
        actions: [
          { label: "View Recommendations", icon: Eye, variant: "default", action: "view" },
          { label: "Run Deep Analysis", icon: TrendingUp, variant: "secondary", action: "analyze" },
          { label: "Schedule Follow-up", icon: Calendar, variant: "outline", action: "schedule" }
        ]
      });
    }

    return components;
  };

  const handleSendMessage = async (messageText?: string) => {
    const queryText = messageText || input;
    if (!queryText.trim() || isGenerating) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: queryText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsGenerating(true);

    // Simulate AI processing with realistic delay
    setTimeout(() => {
      const generatedComponents = generateAgenticResponse(queryText);
      
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "I've analyzed your request using the multi-agent system. Here are the actionable insights:",
        timestamp: new Date(),
        components: generatedComponents
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 1800);
  };

  const handleAction = (action: string, componentTitle: string) => {
    const [actionType, actionValue] = action.split(":");
    
    switch(actionType) {
      case "simulate":
        toast({
          title: "Simulation Started",
          description: `Running multi-agent simulation for: ${componentTitle}`,
        });
        break;
      case "notify":
        toast({
          title: "Notifications Sent",
          description: "Stakeholders have been notified via email and Teams",
        });
        break;
      case "navigate":
        navigate(`/${actionValue}`);
        onClose();
        break;
      case "schedule":
        toast({
          title: "Action Scheduled",
          description: "Added to your task queue for execution",
        });
        break;
      case "export":
        toast({
          title: "Export Started",
          description: "Report will be available in Downloads",
        });
        break;
      case "share":
        toast({
          title: "Shared Successfully",
          description: "Insights shared with team members",
        });
        break;
      default:
        toast({
          title: "Action Triggered",
          description: `Executing: ${action}`,
        });
    }
  };

  const renderComponent = (component: GeneratedComponent) => {
    const getTypeStyles = () => {
      switch(component.type) {
        case "alert":
          return "border-destructive/30 bg-gradient-to-br from-destructive/10 to-destructive/5";
        case "simulation":
          return "border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5";
        case "insight":
          return "border-success/30 bg-gradient-to-br from-success/10 to-success/5";
        case "analysis":
          return "border-warning/30 bg-gradient-to-br from-warning/10 to-warning/5";
        default:
          return "border-border bg-card";
      }
    };

    const getTypeIcon = () => {
      switch(component.type) {
        case "alert":
          return <AlertCircle className="h-5 w-5 text-destructive" />;
        case "simulation":
          return <Zap className="h-5 w-5 text-primary" />;
        case "insight":
          return <CheckCircle2 className="h-5 w-5 text-success" />;
        case "analysis":
          return <TrendingUp className="h-5 w-5 text-warning" />;
        default:
          return <Sparkles className="h-5 w-5 text-primary" />;
      }
    };

    return (
      <Card key={component.id} className={cn("p-5 border-2 animate-slide-up", getTypeStyles())}>
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-lg bg-background/50">
            {getTypeIcon()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground">{component.title}</h4>
              <Badge variant="outline" className="text-xs">
                {component.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {component.content}
            </p>
          </div>
        </div>

        {/* Data Metrics */}
        {component.data && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-3 rounded-lg bg-background/30">
            {Object.entries(component.data).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-xs text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <p className="text-sm font-semibold text-foreground">{value as string}</p>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {component.actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Button
                key={idx}
                variant={action.variant}
                size="sm"
                onClick={() => handleAction(action.action, component.title)}
                className="gap-2"
              >
                <Icon className="h-3.5 w-3.5" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </Card>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl border-primary/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-success flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Agentic AI Assistant</h3>
              <p className="text-xs text-muted-foreground">Intelligent responses with actionable components</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Ask me anything about your supply chain
                </h4>
                <p className="text-sm text-muted-foreground">
                  I'll generate interactive insights with actionable buttons
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id} className={cn(
                "flex",
                message.type === "user" ? "justify-end" : "justify-start"
              )}>
                <div className={cn(
                  "max-w-[85%] space-y-3",
                  message.type === "user" && "flex flex-col items-end"
                )}>
                  <div className={cn(
                    "rounded-xl px-4 py-3 shadow-sm",
                    message.type === "user" 
                      ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground" 
                      : "bg-muted text-foreground border border-border"
                  )}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {message.components && (
                    <div className="space-y-3 w-full">
                      {message.components.map(renderComponent)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-3 border border-border">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm text-foreground font-medium">AI is analyzing...</p>
                    <p className="text-xs text-muted-foreground">Consulting multi-agent system</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about risks, inventory, scenarios, forecasts..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={isGenerating}
              className="flex-1"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isGenerating}
              className="gap-2 bg-gradient-to-r from-primary to-success hover:opacity-90"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};