import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { riskData } from "@/data/riskData";
import { ArrowLeft, Search, Settings as SettingsIcon, RefreshCw, Download, User, Database, MessageSquare, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsightsTab from "@/components/risk-analysis/InsightsTab";
import InsightsDataTab from "@/components/risk-analysis/InsightsDataTab";
import ScenarioSimulatorTab, { Scenario } from "@/components/risk-analysis/ScenarioSimulatorTab";
import PlannerInputTab from "@/components/risk-analysis/PlannerInputTab";
import OutcomeEvaluationTab from "@/components/risk-analysis/OutcomeEvaluationTab";
import ApprovalWorkflowTab from "@/components/risk-analysis/ApprovalWorkflowTab";

export default function RiskAnalysisWorkflow() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const riskId = Number(searchParams.get("riskId")) || riskData[0].riskId;
  const row = riskData.find(r => r.riskId === riskId) || riskData[0];

  const [activeTab, setActiveTab] = useState("recommendations");
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

          {/* 5 Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start h-11 bg-card border border-border rounded-xl p-1 mb-6">
              <TabsTrigger value="recommendations" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                <Search className="h-3.5 w-3.5" /> Recommendations
              </TabsTrigger>
              <TabsTrigger value="insights-data" className="text-xs gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4">
                <Database className="h-3.5 w-3.5" /> Insights & Data
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

            {/* Tab 1: Recommendations */}
            <TabsContent value="recommendations">
              <InsightsTab row={row} />
              <div className="mt-8">
                <ScenarioSimulatorTab row={row} onSelectScenario={setSelectedScenario} selectedScenario={selectedScenario} />
              </div>
              <div className="mt-8">
                <PlannerInputTab row={row} />
              </div>
              <div className="mt-8">
                <OutcomeEvaluationTab row={row} selectedScenario={selectedScenario} onTriggerApproval={() => {}} />
              </div>
              <div className="mt-8">
                <ApprovalWorkflowTab row={row} selectedScenario={selectedScenario} />
              </div>
            </TabsContent>

            {/* Tab 2: Insights & Data — original tables and charts */}
            <TabsContent value="insights-data">
              <InsightsDataTab row={row} />
            </TabsContent>

            {/* Tab 3: Workflow Management — placeholder */}
            <TabsContent value="workflow">
              <div className="border border-border rounded-xl p-12 bg-card text-center">
                <SettingsIcon className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-1">Workflow Management</h3>
                <p className="text-sm text-muted-foreground">Workflow management features are coming soon.</p>
              </div>
            </TabsContent>

            {/* Tab 4: POC Communication — placeholder */}
            <TabsContent value="poc">
              <div className="border border-border rounded-xl p-12 bg-card text-center">
                <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-1">POC Communication</h3>
                <p className="text-sm text-muted-foreground">Point of contact communication features are coming soon.</p>
              </div>
            </TabsContent>

            {/* Tab 5: Chat History — placeholder */}
            <TabsContent value="chat-history">
              <div className="border border-border rounded-xl p-12 bg-card text-center">
                <Clock className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-1">Chat History</h3>
                <p className="text-sm text-muted-foreground">Chat history and communication logs will appear here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
