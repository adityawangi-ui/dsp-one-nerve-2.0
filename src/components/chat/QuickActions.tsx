import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  CheckSquare, 
  FlaskConical, 
  Heart, 
  BarChart3, 
  AlertCircle, 
  TrendingUp 
} from "lucide-react";

interface QuickActionsProps {
  onQuickAction: (prompt: string) => void;
}

const quickActions = [
  {
    id: "alerts",
    icon: AlertTriangle,
    label: "Alerts",
    prompt: "Show me all critical alerts and their business impact",
    color: "text-red-500"
  },
  {
    id: "actions",
    icon: CheckSquare,
    label: "Action Items",
    prompt: "What action items need my attention today?",
    color: "text-blue-500"
  },
  {
    id: "scenarios",
    icon: FlaskConical,
    label: "Scenario Workbench",
    prompt: "Help me create a new planning scenario",
    color: "text-purple-500"
  },
  {
    id: "health",
    icon: Heart,
    label: "Health Monitoring",
    prompt: "Give me a health check of all planning processes",
    color: "text-green-500"
  },
  {
    id: "performance",
    icon: BarChart3,
    label: "Performance Review",
    prompt: "Analyze our planning performance vs targets",
    color: "text-orange-500"
  },
  {
    id: "exceptions",
    icon: AlertCircle,
    label: "Exception Handling",
    prompt: "Show me exceptions that need immediate attention",
    color: "text-yellow-500"
  },
  {
    id: "forecast",
    icon: TrendingUp,
    label: "Forecast Analysis",
    prompt: "Review forecast accuracy and bias trends",
    color: "text-cyan-500"
  }
];

export const QuickActions = ({ onQuickAction }: QuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 max-w-4xl mx-auto">
      {quickActions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            className="h-9 px-3 bg-slate-50 hover:bg-slate-100 border-slate-200"
            onClick={() => onQuickAction(action.prompt)}
          >
            <Icon className={`h-4 w-4 mr-2 ${action.color}`} />
            <span className="text-slate-600">{action.label}</span>
          </Button>
        );
      })}
    </div>
  );
};