import { useState } from "react";
import { RiskRow } from "@/data/riskData";
import { X, Database, Search, MessageSquare, ArrowLeft, Play, CheckCircle2, AlertTriangle, Clock, Package, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import InsightsDataTab from "@/components/risk-analysis/InsightsDataTab";
import ScenarioSimulatorTab, { Scenario } from "@/components/risk-analysis/ScenarioSimulatorTab";
import LastMileExecution from "@/components/risk-analysis/LastMileExecution";
import ConversationsTab from "@/components/risk-analysis/ConversationsTab";

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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      <div className="ml-auto relative flex flex-col w-[95%] h-full bg-background shadow-2xl animate-slide-in-right overflow-hidden">
        {/* Panel Header with consolidated risk context */}
        <div className="flex flex-col border-b border-border shrink-0 bg-card">
          <div className="h-12 flex items-center justify-between px-5">
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
              <div className="h-4 w-px bg-border" />
              {/* Consolidated risk context inline */}
              <div className="flex items-center gap-3 text-xs">
                <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-[10px] gap-1">
                  <AlertTriangle className="h-3 w-3" /> {row.riskType}
                </Badge>
                <span className="text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {row.msoCountry}</span>
                <span className="text-muted-foreground">MRDR {row.mrdr}</span>
                <span className="text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" /> {row.riskInDays}d</span>
                <span className="text-muted-foreground flex items-center gap-1"><Package className="h-3 w-3" /> {row.expectedLossCases.toLocaleString()} CS</span>
                <span className="font-semibold text-foreground">Impact: High</span>
              </div>
            </div>
            <button onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-5 py-4">
            {showLastMile && selectedScenario ? (
              <LastMileExecution row={row} selectedScenario={selectedScenario} />
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start h-10 bg-card border border-border rounded-xl p-1 mb-5 sticky top-0 z-10 shadow-sm">
                  <TabsTrigger value="insights-data" className="text-xs gap-1.5 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                    <Database className="h-3.5 w-3.5" /> Insights & Data
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="text-xs gap-1.5 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                    <Search className="h-3.5 w-3.5" /> Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="conversations" className="text-xs gap-1.5 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                    <MessageSquare className="h-3.5 w-3.5" /> Conversations
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="insights-data">
                  <InsightsDataTab key={row.riskId} row={row} />
                </TabsContent>

                <TabsContent value="recommendations">
                  <ScenarioSimulatorTab
                    row={row}
                    onSelectScenario={setSelectedScenario}
                    selectedScenario={selectedScenario}
                    onTriggerApproval={handleTriggerApproval}
                  />
                </TabsContent>

                <TabsContent value="conversations">
                  <ConversationsTab row={row} />
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
              <CheckCircle2 className="h-5 w-5 text-success" />
              Approval Workflow Triggered
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm text-muted-foreground mb-4">Your selected mitigation scenario has been submitted for approval and execution.</p>

          {selectedScenario && (
            <div className="border border-success/40 rounded-xl p-4 bg-success/10 space-y-2 mb-4">
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
                <span className="text-sm text-foreground"><strong>Service Level:</strong> {selectedScenario.serviceLevel}%</span>
              </div>
            </div>
          )}

          <div className="border border-primary/30 rounded-xl p-4 bg-primary/10 space-y-2 mb-4">
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
            <Button className="gap-2 bg-success hover:bg-success/90 text-success-foreground" onClick={handleProceedToWorkflow}>
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
