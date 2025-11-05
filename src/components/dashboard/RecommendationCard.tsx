import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RecommendationCardProps {
  title: string;
  description: string;
  impact?: {
    metric: string;
    value: string;
    direction: "positive" | "negative" | "neutral";
  };
  confidence: number;
  urgency: "low" | "medium" | "high";
  source: string;
  actions: Array<{
    label: string;
    variant: "default" | "secondary" | "outline";
    onClick?: () => void;
  }>;
}

export const RecommendationCard = ({
  title,
  description,
  impact,
  confidence,
  urgency,
  source,
  actions
}: RecommendationCardProps) => {
  const getUrgencyColor = () => {
    switch (urgency) {
      case "high":
        return "text-destructive bg-destructive/10";
      case "medium":
        return "text-warning bg-warning/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getImpactIcon = () => {
    if (!impact) return null;
    
    switch (impact.direction) {
      case "positive":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "negative":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br from-card to-surface border border-border rounded-2xl p-8 hover-lift shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all duration-300">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mt-1 shadow-sm">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-2 text-base">{title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
        
        <Badge className={cn("text-xs", getUrgencyColor())}>
          {urgency.toUpperCase()}
        </Badge>
      </div>

      {impact && (
        <div className="flex items-center space-x-2 mb-5 p-4 bg-muted/50 rounded-xl border border-border/50">
          {getImpactIcon()}
          <span className="text-sm font-medium">
            {impact.metric}: {impact.value}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-xs text-muted-foreground">
            Source: <span className="font-medium">{source}</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Confidence: <span className="font-medium">{confidence}%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            size="sm"
            onClick={action.onClick}
            className="h-8 text-xs"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};