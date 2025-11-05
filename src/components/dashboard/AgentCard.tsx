import { ArrowRight, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  name: string;
  type: "process" | "utility" | "foundation";
  status: "healthy" | "warning" | "error";
  insight: string;
  lastUpdate: string;
  exceptionCount?: number;
  icon?: React.ReactNode;
  onDrillDown?: () => void;
}

export const AgentCard = ({
  name,
  type,
  status,
  insight,
  lastUpdate,
  exceptionCount = 0,
  icon,
  onDrillDown
}: AgentCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "error":
        return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "healthy":
        return <Badge className="agent-status healthy">OK</Badge>;
      case "warning":
        return <Badge className="agent-status warning">Attention</Badge>;
      case "error":
        return <Badge className="agent-status error">Exception</Badge>;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case "process":
        return "agent-process";
      case "utility":
        return "agent-utility";
      case "foundation":
        return "agent-foundation";
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-surface border border-border rounded-2xl p-6 hover-lift min-w-[300px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg", getTypeColor())}>
            {icon || <div className="w-4 h-4 bg-current rounded-sm" />}
          </div>
          <div>
            <h4 className="font-semibold text-sm">{name}</h4>
            <p className="text-xs text-muted-foreground capitalize">{type} Agent</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          {exceptionCount > 0 && (
            <Badge variant="destructive" className="h-5 text-xs">
              {exceptionCount}
            </Badge>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-foreground leading-relaxed">{insight}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusBadge()}
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{lastUpdate}</span>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onDrillDown}
          className="text-primary hover:text-primary hover:bg-primary/10"
        >
          Drill Down
          <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};