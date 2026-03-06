import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { riskData } from "@/data/riskData";
import { ArrowLeft, Search, Settings as SettingsIcon, User, Database, MessageSquare, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InsightsTab from "@/components/risk-analysis/InsightsTab";
import InsightsDataTab from "@/components/risk-analysis/InsightsDataTab";
import ScenarioSimulatorTab, { Scenario } from "@/components/risk-analysis/ScenarioSimulatorTab";
import LastMileExecution from "@/components/risk-analysis/LastMileExecution";
import ConversationsTab from "@/components/risk-analysis/ConversationsTab";

export default function RiskAnalysisWorkflow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const riskId = Number(searchParams.get("riskId")) || riskData[0].riskId;
  const row = riskData.find(r => r.riskId === riskId) || riskData[0];

  const [activeTab, setActiveTab] = useState("insights-data");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showLastMile, setShowLastMile] = useState(false);

  const handleTriggerApproval = () => {
    setShowApprovalDialog(true);
  };

  const handleProceedToWorkflow = () => {
    setShowApprovalDialog(false);
    setShowLastMile(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Nav */}
      <header className="h-12 border-b border-border bg-card flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded bg-primary/10 flex items-center justify-center">
            <SettingsIcon className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="text-sm font-bold text-foreground">Risk Monitoring System</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> John Smith</span>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors"><RefreshCw className="h-3.5 w-3.5" /> Refresh</button>
          <button className="flex items-center gap-1 hover:text-foreground transition-colors"><Download className="h-3.5 w-3.5" /> Export</button>
          <button className="hover:text-foreground transition-colors"><SettingsIcon className="h-3.5 w-3.5" /></button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-5 py-5">
          {/* Back + Title */}
          <div className="flex items-center gap-3 mb-5">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => { if (showLastMile) { setShowLastMile(false); } else { navigate("/risk-monitor"); } }}>
              <ArrowLeft className="h-3.5 w-3.5" /> {showLastMile ? "Back to Analysis" : "Back to Risk Overview"}
            </Button>
            <h1 className="text-xl font-bold text-foreground">
              {showLastMile ? "Last Mile Execution & Approval" : "Risk Analysis & Mitigation Workflow"}
            </h1>
          </div>

          {showLastMile && selectedScenario ? (
            <LastMileExecution row={row} selectedScenario={selectedScenario} />
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start h-11 bg-card border border-border rounded-xl p-1 mb-6">
                <TabsTrigger value="insights-data" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                  <Database className="h-3.5 w-3.5" /> Insights & Data
                </TabsTrigger>
                <TabsTrigger value="recommendations" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                  <Search className="h-3.5 w-3.5" /> Recommendations
                </TabsTrigger>
                <TabsTrigger value="workflow" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                  <SettingsIcon className="h-3.5 w-3.5" /> Workflow Management
                </TabsTrigger>
                <TabsTrigger value="poc" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                  <MessageSquare className="h-3.5 w-3.5" /> POC Communication
                </TabsTrigger>
                <TabsTrigger value="chat-history" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                  <Clock className="h-3.5 w-3.5" /> Chat History
                </TabsTrigger>
              </TabsList>

              {/* Tab 1: Insights & Data */}
              <TabsContent value="insights-data">
                <InsightsDataTab row={row} />
              </TabsContent>

              {/* Tab 2: Recommendations */}
              <TabsContent value="recommendations">
                <InsightsTab row={row} />
                <div className="mt-8">
                  <ScenarioSimulatorTab
                    row={row}
                    onSelectScenario={setSelectedScenario}
                    selectedScenario={selectedScenario}
                    onTriggerApproval={handleTriggerApproval}
                  />
                </div>
              </TabsContent>

              {/* Tab 3-5: Placeholders */}
              <TabsContent value="workflow">
                <div className="border border-border rounded-xl p-12 bg-card text-center">
                  <SettingsIcon className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-foreground mb-1">Workflow Management</h3>
                  <p className="text-sm text-muted-foreground">Workflow management features are coming soon.</p>
                </div>
              </TabsContent>

              <TabsContent value="poc">
                <div className="border border-border rounded-xl p-12 bg-card text-center">
                  <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-foreground mb-1">POC Communication</h3>
                  <p className="text-sm text-muted-foreground">Point of contact communication features are coming soon.</p>
                </div>
              </TabsContent>

              <TabsContent value="chat-history">
                <div className="border border-border rounded-xl p-12 bg-card text-center">
                  <Clock className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                  <h3 className="text-base font-semibold text-foreground mb-1">Chat History</h3>
                  <p className="text-sm text-muted-foreground">Chat history and communication logs will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {/* Approval Workflow Triggered Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              Approval Workflow Triggered
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground mb-4">Your selected mitigation scenario has been submitted for approval and execution.</p>

          {selectedScenario && (
            <div className="border border-emerald-200 rounded-xl p-4 bg-emerald-50/50 space-y-2 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-primary">Scenario {selectedScenario.id} Selected</span>
              </div>
              <p className="text-xs text-muted-foreground ml-3.5">{selectedScenario.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground"><strong>Cost:</strong> €{selectedScenario.cost.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground"><strong>Success:</strong> {selectedScenario.successProbability}%</span>
              </div>
            </div>
          )}

          <div className="border border-primary/20 rounded-xl p-4 bg-primary/[0.03] space-y-2 mb-4">
            <p className="text-sm font-semibold text-primary">Next Steps:</p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-2">
              <li>• L1 Planner approval required</li>
              <li>• Operations Manager review</li>
              <li>• Finance approval (if cost &gt; €15K)</li>
              <li>• Final Supply Chain Director sign-off</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>Stay Here</Button>
            <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleProceedToWorkflow}>
              <Play className="h-4 w-4" /> Proceed to Workflow
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
