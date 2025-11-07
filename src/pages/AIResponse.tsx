import { useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Mic, Plus, Settings, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function AIResponse() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [response, setResponse] = useState<string | null>(null);
  const [followUpInput, setFollowUpInput] = useState("");
  const [conversationHistory, setConversationHistory] = useState<Array<{ query: string; response: string }>>([]);

  const query = location.state?.query || "";
  const responseText = location.state?.response || "";

  useEffect(() => {
    if (!query || !responseText) {
      navigate("/");
      return;
    }

    // Simulate AI processing
    const timer = setTimeout(() => {
      setResponse(responseText);
      setIsProcessing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [query, responseText, navigate]);

  const handleFollowUp = async () => {
    if (!followUpInput.trim()) {
      toast({
        title: "Empty question",
        description: "Please enter a follow-up question",
        variant: "destructive"
      });
      return;
    }

    // Add current response to history before processing new question
    if (response && query) {
      setConversationHistory(prev => [...prev, { query, response }]);
    }

    setIsProcessing(true);
    setResponse(null);

    // Simulate AI processing for follow-up
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generic follow-up response
    const followUpResponse = `Thank you for your follow-up question: "${followUpInput}"

**Analysis Update:**

Based on your inquiry, here are additional insights:

• The system has analyzed your follow-up question in the context of the previous analysis
• Cross-referencing data across multiple dimensions and time periods
• Applying advanced analytics to provide deeper insights

**Key Observations:**
• This is a simulated follow-up response demonstrating the conversation flow
• In production, this would connect to real AI models for dynamic responses
• The system maintains context from previous questions for coherent dialogue

**Recommendations:**
→ Continue exploring specific aspects by asking more targeted questions
→ Use the navigation to access detailed dashboards for deeper analysis
→ Contact the planning team for customized reports on this topic`;

    setResponse(followUpResponse);
    setIsProcessing(false);
    setFollowUpInput("");
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] misty-bg px-8 lg:px-16 xl:px-24 overflow-auto pb-32">
        <div className="w-full py-8 mx-auto" style={{ maxWidth: '1400px' }}>
          {/* Header */}
          <div className="mb-6 animate-fade-in">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mb-4 hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-2xl font-bold gradient-text mb-2">AI Analysis</h1>
            <p className="text-sm text-muted-foreground">{query}</p>
          </div>

          {/* Conversation History */}
          {conversationHistory.map((item, idx) => (
            <div key={idx} className="mb-6 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                {item.query}
              </p>
              <Card className="p-6 bg-white border-l-4 border-l-muted shadow-sm">
                <div className="prose prose-sm max-w-none">
                  {item.response.split('\n').map((line, lineIdx) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <h3 key={lineIdx} className="text-base font-semibold text-foreground mt-6 mb-3 first:mt-0">{line.replace(/\*\*/g, '')}</h3>;
                    }
                    if (line.startsWith('•')) {
                      return <p key={lineIdx} className="text-sm text-foreground/80 ml-4 mb-1.5">{line}</p>;
                    }
                    if (line.match(/^\d+\./)) {
                      return <p key={lineIdx} className="text-sm text-foreground/80 ml-4 mb-1.5">{line}</p>;
                    }
                    if (line.startsWith('→')) {
                      return <p key={lineIdx} className="text-sm text-primary font-medium ml-4 mb-2">{line}</p>;
                    }
                    if (line.match(/^[✅🇪🇸📊]/)) {
                      return <h2 key={lineIdx} className="text-lg font-bold text-foreground mb-4 mt-2 first:mt-0">{line}</h2>;
                    }
                    return line ? <p key={lineIdx} className="text-sm text-foreground/80 mb-2">{line}</p> : <br key={lineIdx} />;
                  })}
                </div>
              </Card>
            </div>
          ))}

          {/* Current Response Card */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="p-8 bg-white border-l-4 border-l-primary shadow-[var(--shadow-card)]">
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-sm text-muted-foreground">Analyzing data...</span>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  {response?.split('\n').map((line, idx) => {
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return <h3 key={idx} className="text-base font-semibold text-foreground mt-6 mb-3 first:mt-0">{line.replace(/\*\*/g, '')}</h3>;
                    }
                    if (line.startsWith('•')) {
                      return <p key={idx} className="text-sm text-foreground/80 ml-4 mb-1.5">{line}</p>;
                    }
                    if (line.match(/^\d+\./)) {
                      return <p key={idx} className="text-sm text-foreground/80 ml-4 mb-1.5">{line}</p>;
                    }
                    if (line.startsWith('→')) {
                      return <p key={idx} className="text-sm text-primary font-medium ml-4 mb-2">{line}</p>;
                    }
                    if (line.match(/^[✅🇪🇸📊]/)) {
                      return <h2 key={idx} className="text-lg font-bold text-foreground mb-4 mt-2 first:mt-0">{line}</h2>;
                    }
                    return line ? <p key={idx} className="text-sm text-foreground/80 mb-2">{line}</p> : <br key={idx} />;
                  })}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Fixed Follow-up Prompt Box */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-background/50 backdrop-blur-sm border-t border-border/40 py-4 px-8 lg:px-16 xl:px-24">
          <div className="mx-auto" style={{ maxWidth: '1400px' }}>
            <div className="frosted-glass breathing-border rounded-2xl border-2 border-primary/30 shadow-[var(--shadow-glow)]">
              <div className="flex items-center gap-3 pl-4 pr-3 py-2.5">
                {/* Left Icons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                    title="Quick Actions"
                  >
                    <Plus className="h-4 w-4 text-primary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                    title="Settings"
                  >
                    <Settings className="h-4 w-4 text-primary" />
                  </Button>
                </div>

                {/* Input */}
                <Input
                  placeholder="Ask a follow-up question..."
                  className="flex-1 h-10 text-sm border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                  value={followUpInput}
                  onChange={(e) => setFollowUpInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleFollowUp();
                    }
                  }}
                />

                {/* Right Icons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
                    title="Voice Input"
                  >
                    <Mic className="h-4 w-4 text-primary" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                    onClick={handleFollowUp}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
