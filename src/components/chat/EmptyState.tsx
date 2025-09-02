import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onQuickAction: (prompt: string) => void;
}

const exampleQuestions = [
  "What's driving our forecast bias this month?",
  "Show me supply risks for Q4",
  "Compare actual vs planned inventory turns",
  "Help me understand the APAC demand spike"
];

export const EmptyState = ({ onQuickAction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Hi! I'm your AI Planning Assistant
          </h2>
          <p className="text-muted-foreground text-lg">
            Ask me anything about your operations and I'll coordinate with our specialized agents to help you.
          </p>
        </div>
      </div>

      <div className="space-y-4 w-full">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Try asking:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exampleQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              className="p-4 h-auto text-left justify-start bg-slate-50 hover:bg-slate-100 border-slate-200"
              onClick={() => onQuickAction(question)}
            >
              <span className="text-slate-600 text-sm leading-relaxed">
                "{question}"
              </span>
            </Button>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>💡 I can help you with planning analysis, scenario modeling, and operational insights</p>
        <p>🔗 I'll coordinate with specialized agents to give you comprehensive answers</p>
      </div>
    </div>
  );
};