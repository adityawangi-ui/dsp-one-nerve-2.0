import { useState } from "react";
import { RiskRow } from "@/data/riskData";
import { X, Database, Search, Settings as SettingsIcon, MessageSquare, Clock, ArrowLeft, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import InsightsDataTab from "@/components/risk-analysis/InsightsDataTab";
import InsightsTab from "@/components/risk-analysis/InsightsTab";
import ScenarioSimulatorTab, { Scenario } from "@/components/risk-analysis/ScenarioSimulatorTab";
import LastMileExecution from "@/components/risk-analysis/LastMileExecution";

interface Props {
  row: RiskRow;
  onClose: () => void;
}

export default function RiskAnalysisPanel({ row, onClose }: Props) {
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
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* Panel sliding from right - 95% width */}
      <div className="ml-auto relative flex flex-col w-[95%] h-full bg-background shadow-2xl animate-slide-in-right overflow-hidden">
        {/* Panel Header */}
        <div className="h-12 flex items-center justify-between px-5 border-b border-border shrink-0 bg-card">
          <div className="flex items-center gap-3">
            {showLastMile ? (
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-7 text-foreground hover:bg-secondary" onClick={() => setShowLastMile(false)}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Analysis
              </Button>
            ) : (
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs h-7 text-foreground hover:bg-secondary" onClick={onClose}>
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Risk Overview
              </Button>
            )}
            <div className="h-4 w-px bg-border" />
            <span className="text-sm font-bold text-foreground">
              {showLastMile ? "Last Mile Execution & Approval" : "Risk Analysis & Mitigation"}
            </span>
            <Badge variant="outline" className="text-[10px] font-mono">RISK-{String(row.riskId).padStart(3, "0")}</Badge>
          </div>
          <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-5 py-4">
            {showLastMile && selectedScenario ? (
              <LastMileExecution row={row} selectedScenario={selectedScenario} />
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                {/* Always-visible tabs */}
                <TabsList className="w-full justify-start h-10 bg-card border border-border rounded-xl p-1 mb-5 sticky top-0 z-10 shadow-sm">
                  <TabsTrigger value="insights-data" className="text-xs gap-1.5 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                    <Database className="h-3.5 w-3.5" /> Insights & Data
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="text-xs gap-1.5 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                    <Search className="h-3.5 w-3.5" /> Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="workflow" className="text-xs gap-1.5 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                    <SettingsIcon className="h-3.5 w-3.5" /> Workflow Management
                  </TabsTrigger>
                  <TabsTrigger value="poc" className="text-xs gap-1.5 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                    <MessageSquare className="h-3.5 w-3.5" /> POC Communication
                  </TabsTrigger>
                  <TabsTrigger value="chat-history" className="text-xs gap-1.5 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                    <Clock className="h-3.5 w-3.5" /> Chat History
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="insights-data">
                  <InsightsDataTab row={row} />
                </TabsContent>

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

                <TabsContent value="workflow">
                  <div className="border border-[hsl(220,13%,91%)] rounded-xl p-12 bg-white text-center">
                    <SettingsIcon className="h-10 w-10 text-[hsl(220,10%,80%)] mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-[hsl(220,25%,10%)] mb-1">Workflow Management</h3>
                    <p className="text-sm text-[hsl(220,10%,46%)]">Workflow management features are coming soon.</p>
                  </div>
                </TabsContent>

                <TabsContent value="poc">
                  <div className="border border-[hsl(220,13%,91%)] rounded-xl p-12 bg-white text-center">
                    <MessageSquare className="h-10 w-10 text-[hsl(220,10%,80%)] mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-[hsl(220,25%,10%)] mb-1">POC Communication</h3>
                    <p className="text-sm text-[hsl(220,10%,46%)]">Point of contact communication features are coming soon.</p>
                  </div>
                </TabsContent>

                <TabsContent value="chat-history">
                  <div className="border border-[hsl(220,13%,91%)] rounded-xl p-12 bg-white text-center">
                    <Clock className="h-10 w-10 text-[hsl(220,10%,80%)] mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-[hsl(220,25%,10%)] mb-1">Chat History</h3>
                    <p className="text-sm text-[hsl(220,10%,46%)]">Chat history and communication logs will appear here.</p>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </div>

      {/* Approval Workflow Triggered Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[hsl(152,60%,42%)]" />
              Approval Workflow Triggered
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-[hsl(220,10%,46%)] mb-4">Your selected mitigation scenario has been submitted for approval and execution.</p>

          {selectedScenario && (
            <div className="border border-[hsl(152,60%,84%)] rounded-xl p-4 bg-[hsl(152,55%,96%)] space-y-2 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[hsl(220,90%,54%)]" />
                <span className="text-sm font-semibold text-[hsl(220,90%,54%)]">Scenario {selectedScenario.id} Selected</span>
              </div>
              <p className="text-xs text-[hsl(220,10%,46%)] ml-3.5">{selectedScenario.name}</p>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[hsl(220,90%,54%)]" />
                <span className="text-sm text-[hsl(220,25%,10%)]"><strong>Cost:</strong> €{selectedScenario.cost.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[hsl(220,90%,54%)]" />
                <span className="text-sm text-[hsl(220,25%,10%)]"><strong>Success:</strong> {selectedScenario.successProbability}%</span>
              </div>
            </div>
          )}

          <div className="border border-[hsl(220,90%,54%)/0.2] rounded-xl p-4 bg-[hsl(220,90%,54%)/0.03] space-y-2 mb-4">
            <p className="text-sm font-semibold text-[hsl(220,90%,54%)]">Next Steps:</p>
            <ul className="text-xs text-[hsl(220,10%,46%)] space-y-1 ml-2">
              <li>• L1 Planner approval required</li>
              <li>• Operations Manager review</li>
              <li>• Finance approval (if cost &gt; €15K)</li>
              <li>• Final Supply Chain Director sign-off</li>
            </ul>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>Stay Here</Button>
            <Button className="gap-2 bg-[hsl(152,60%,42%)] hover:bg-[hsl(152,60%,36%)] text-white" onClick={handleProceedToWorkflow}>
              <Play className="h-4 w-4" /> Proceed to Workflow
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
