import { useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function AIResponse() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [response, setResponse] = useState<string | null>(null);

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

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] misty-bg px-8 overflow-auto">
        <div className="max-w-5xl mx-auto w-full py-8">
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

          {/* Response Card */}
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
      </div>
    </MainLayout>
  );
}
