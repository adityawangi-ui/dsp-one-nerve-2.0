import { useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Mic, Plus, Settings, Sparkles, FileText, CheckCircle2 } from "lucide-react";
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

    // Check if this is the detailed inventory optimization response
    if (responseText === "INVENTORY_OPTIMIZATION_DETAILED") {
      // Simulate AI processing
      const timer = setTimeout(() => {
        setResponse(getDetailedInventoryResponse());
        setIsProcessing(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Simulate AI processing
    const timer = setTimeout(() => {
      setResponse(responseText);
      setIsProcessing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [query, responseText, navigate]);

  const getDetailedInventoryResponse = () => {
    return `DETAILED_INVENTORY_OPTIMIZATION`;
  };

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
      <div className="min-h-[calc(100vh-4rem)] misty-bg px-4 md:px-8 lg:px-16 xl:px-24 overflow-auto pb-32 md:pb-36">
        <div className="w-full py-4 md:py-8 mx-auto" style={{ maxWidth: '1400px' }}>
          {/* Header */}
          <div className="mb-4 md:mb-6 animate-fade-in">
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
            <div key={idx} className="mb-4 md:mb-6 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                {item.query}
              </p>
              <Card className="p-4 md:p-6 bg-white border-l-4 border-l-muted shadow-sm">
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
            <Card className="p-4 md:p-8 bg-white border-l-4 border-l-primary shadow-[var(--shadow-card)]">
              {isProcessing ? (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-sm text-muted-foreground">Running multi-agent orchestration...</span>
                </div>
              ) : response === "DETAILED_INVENTORY_OPTIMIZATION" ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start gap-3 pb-4 border-b border-border/40">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-foreground mb-2">✅ Inventory Agent Response</h2>
                      <p className="text-sm text-foreground/80">
                        Absolutely. I've run a full end-to-end inventory optimization cycle for the Europe Home Care business, 
                        using your Q3 target of €18M reduction while protecting 98.5% service, Core SKUs and MATDOH constraints.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs bg-primary/5 border-primary/30 text-primary">
                          <FileText className="h-3 w-3 mr-1" />
                          🔵 Audit Log (12 steps, 6 agents invoked)
                        </Badge>
                        <span className="text-xs text-muted-foreground">— click to view full agent actions</span>
                      </div>
                    </div>
                  </div>

                  {/* Step 1 */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">1️⃣</Badge>
                      DATA QUERYING & INVENTORY DIAGNOSTICS
                    </h3>
                    <p className="text-sm text-muted-foreground">(Inventory Agent + Insights Agent)</p>
                    <p className="text-sm text-foreground/80">
                      I pulled your full inventory profile including: FG cycle stock, safety stock, prebuild, SLOB, in-transit, 
                      MoQs, frequencies, lead times, demand/supply variability, promotion signals, norm rules, and constrained plan outputs from Kinaxis.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                      <p className="text-sm font-medium">Key findings:</p>
                      <ul className="text-sm text-foreground/80 space-y-1 ml-4">
                        <li>• Current inventory: €144M</li>
                        <li>• Target: €126M → Gap = €18M</li>
                        <li>• Service: 98.8%</li>
                        <li>• Variability high in 2 markets</li>
                        <li>• 11 plants with excess prebuild</li>
                        <li>• 38 SKUs over-norm, 52 SKUs under-norm</li>
                        <li>• 6 supplier MoQ changes</li>
                        <li>• 3 plant capacity bottlenecks</li>
                        <li>• 3 portfolio SKUs → SLOB in 6 weeks</li>
                      </ul>
                    </div>
                    <p className="text-xs text-primary/80 italic">
                      📌 PlanGPT alone can retrieve numbers, but cannot understand system drivers. 
                      Inventory Agent interprets root causes & constraints.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">2️⃣</Badge>
                      CHECKING TARGET FEASIBILITY
                    </h3>
                    <p className="text-sm text-muted-foreground">(Inventory Agent)</p>
                    <p className="text-sm text-foreground/80">I evaluated whether the €18M reduction is realistic.</p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Potential Levers Identified</p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-foreground/80">
                        <div>• Norm correction: €7.2M</div>
                        <div>• Excess prebuild: €4.9M</div>
                        <div>• Cycle stock optimization: €3.1M</div>
                        <div>• Tail low runners: €1.4M</div>
                        <div>• DR rationalization: €2.3M</div>
                        <div>• SLOB avoidance: €0.6M</div>
                      </div>
                      <p className="text-sm text-primary font-medium mt-3">
                        ➡️ Theoretical potential = €19.5M → feasible but tight.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">3️⃣</Badge>
                      INVENTORY OPTIMIZATION MODELS
                    </h3>
                    <p className="text-sm text-muted-foreground">(Inventory Agent + Waste Agent + Cost Agent)</p>
                    
                    <div className="space-y-3">
                      <Card className="p-4 border-border/40">
                        <h4 className="text-sm font-semibold mb-2">Model A — Service-Protective</h4>
                        <p className="text-sm text-foreground/80">Reduction: €13M | Very low risk</p>
                        <p className="text-xs text-muted-foreground mt-1">Levers: Remove prebuild, correct tail items</p>
                        <Badge variant="outline" className="mt-2 text-xs">Short of €18M target</Badge>
                      </Card>

                      <Card className="p-4 border-primary/40 bg-primary/5">
                        <h4 className="text-sm font-semibold mb-2 text-primary">Model B — Balanced Model (Recommended)</h4>
                        <p className="text-sm text-foreground/80 mb-2">Reduction: €18–19M | Service ≥ 98.5%</p>
                        <div className="space-y-2">
                          <p className="text-xs font-medium">Levers:</p>
                          <ul className="text-xs text-foreground/80 space-y-1 ml-4">
                            <li>• Norm reduction (medium movers)</li>
                            <li>• DR tightening</li>
                            <li>• Prebuild alignment</li>
                            <li>• MoQ renegotiation</li>
                            <li>• Tail SKU clipping</li>
                          </ul>
                          <p className="text-xs font-medium mt-2">Trade-offs:</p>
                          <ul className="text-xs text-foreground/80 space-y-1 ml-4">
                            <li>• 0.2% service dip in Tail</li>
                            <li>• Slightly tighter production frequency constraints</li>
                          </ul>
                        </div>
                      </Card>

                      <Card className="p-4 border-amber-500/40">
                        <h4 className="text-sm font-semibold mb-2">Model C — Target-First (Aggressive)</h4>
                        <p className="text-sm text-foreground/80">Reduction: €22M | Service risk: Medium</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Levers: Deep norm cuts, no protection to medium SKUs, DR restrictions
                        </p>
                      </Card>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">4️⃣</Badge>
                      TRADE-OFF COMMUNICATION
                    </h3>
                    <p className="text-sm text-muted-foreground">(Inventory Agent + Insights Agent)</p>
                    <p className="text-sm text-primary font-medium">
                      Model B is optimal — meets the €18M target with minimal service impact, protects Core SKUs, and preserves flow.
                      Requires coordination with Production, Deployment & Procurement.
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">5️⃣</Badge>
                      SIMULATION OF MODEL B (Aug–Oct)
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      (Simulation Agent + Capacity Agent + DRP Agent + MD Agent + SLOB Agent)
                    </p>
                    <p className="text-sm text-foreground/80">
                      Simulation covered: Capacity, frequencies, transit, cross-border, MoQs, DR feasibility, 
                      portfolio timing, service targets, inventory KPIs.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Simulation Output:</p>
                      <ul className="text-sm text-foreground/80 space-y-1">
                        <li>✔ Closing inventory: €125M</li>
                        <li>✔ Service: 98.6%</li>
                        <li>⚠️ Bottleneck: PL33 → Pull back 1 SKU</li>
                        <li>⚠️ 18 SKU exceptions</li>
                        <li>⚠️ Italy → SLOB risk (demand drop)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Remaining steps collapsed for brevity */}
                  <div className="space-y-3">
                    <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">6️⃣-🔟</Badge>
                      EXECUTION & CONTINUOUS MONITORING
                    </h3>
                    <div className="space-y-2 text-sm text-foreground/80">
                      <p><strong>6️⃣ Financial Validation</strong> — Achieves €126M end-Q3, Service 98.5% maintained</p>
                      <p><strong>7️⃣ Recommendation Package</strong> — Planner Pack & Leadership Pack created</p>
                      <p><strong>8️⃣ Write to Kinaxis</strong> — Private scenario pushed with new norms, DR adjustments</p>
                      <p><strong>9️⃣ Final Writeback</strong> — Production scenario committed after planner approval</p>
                      <p><strong>🔟 Weekly Auto-Adjust</strong> — Continuous monitoring for service, variability, demand shifts</p>
                    </div>
                  </div>

                  {/* Audit Log Section */}
                  <div className="border-t border-border/40 pt-4">
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        ⭐ AUDIT LOG (Clickable Chip in UI)
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium mb-2">Agents Invoked:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              "Inventory Agent",
                              "Insights Agent",
                              "Waste Agent",
                              "Cost Agent",
                              "Simulation Agent",
                              "Capacity Agent",
                              "DRP Agent",
                              "MD Agent",
                              "SLOB Agent",
                              "Finance Agent",
                              "Kinaxis Action Agent",
                              "Notification Agent"
                            ].map((agent, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {agent}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium mb-2">12-Step Log:</p>
                          <p className="text-xs text-foreground/80">
                            Data pull → Diagnostics → Feasibility → Levers → Model Creation → Trade-offs → 
                            Simulation → Finance Validation → Recommendation Packs → Kinaxis Scenario → 
                            Writeback → Weekly Auto-Adjust.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-background/50 backdrop-blur-sm border-t border-border/40 py-3 md:py-4 px-4 md:px-8 lg:px-16 xl:px-24 z-10">
          <div className="mx-auto" style={{ maxWidth: '1400px' }}>
              <div className="frosted-glass breathing-border rounded-2xl border-2 border-primary/30 shadow-[var(--shadow-glow)]">
                <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-4 pr-2 md:pr-3 py-2 md:py-2.5">
                  {/* Left Icons */}
                  <div className="hidden md:flex items-center gap-2">
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
                  <div className="flex items-center gap-1 md:gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:flex h-9 w-9 rounded-xl hover:bg-primary/10 transition-all"
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
