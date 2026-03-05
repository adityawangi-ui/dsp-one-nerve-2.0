import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { riskData, RiskRow } from "@/data/riskData";
import { ArrowLeft, Search, Settings as SettingsIcon, RefreshCw, Download, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsightsTab from "@/components/risk-analysis/InsightsTab";
import ScenarioSimulatorTab, { Scenario } from "@/components/risk-analysis/ScenarioSimulatorTab";
import PlannerInputTab from "@/components/risk-analysis/PlannerInputTab";
import OutcomeEvaluationTab from "@/components/risk-analysis/OutcomeEvaluationTab";
import ApprovalWorkflowTab from "@/components/risk-analysis/ApprovalWorkflowTab";

export default function RiskAnalysisWorkflow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const riskId = Number(searchParams.get("riskId")) || riskData[0].riskId;
  const row = riskData.find(r => r.riskId === riskId) || riskData[0];

  const [activeTab, setActiveTab] = useState("insights");
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

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
            <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={() => navigate("/risk-monitor")}>
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Risk Overview
            </Button>
            <h1 className="text-xl font-bold text-foreground">Risk Analysis & Mitigation Workflow</h1>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start h-11 bg-card border border-border rounded-xl p-1 mb-6">
              <TabsTrigger value="insights" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-5">
                <Search className="h-3.5 w-3.5" /> Recommendations
              </TabsTrigger>
              <TabsTrigger value="scenarios" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-5">
                <SettingsIcon className="h-3.5 w-3.5" /> Workflow Management
              </TabsTrigger>
              <TabsTrigger value="planner" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-5">
                POC Communication
              </TabsTrigger>
              <TabsTrigger value="outcome" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-5">
                Chat History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="insights">
              <InsightsTab row={row} />
              {/* Scenario section below insights */}
              <div className="mt-8">
                <ScenarioSimulatorTab row={row} onSelectScenario={setSelectedScenario} selectedScenario={selectedScenario} />
              </div>
            </TabsContent>
            <TabsContent value="scenarios">
              <PlannerInputTab row={row} />
              <div className="mt-8">
                <OutcomeEvaluationTab row={row} selectedScenario={selectedScenario} onTriggerApproval={() => setActiveTab("outcome")} />
              </div>
            </TabsContent>
            <TabsContent value="planner">
              <ApprovalWorkflowTab row={row} selectedScenario={selectedScenario} />
            </TabsContent>
            <TabsContent value="outcome">
              <div className="border border-border rounded-xl p-8 bg-card text-center">
                <p className="text-muted-foreground text-sm">Chat history and communication logs will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
