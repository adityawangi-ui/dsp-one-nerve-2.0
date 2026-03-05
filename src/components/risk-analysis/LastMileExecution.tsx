import { RiskRow } from "@/data/riskData";
import { Scenario } from "./ScenarioSimulatorTab";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Clock, XCircle, FileText, MessageSquare, Truck, Factory, Package, Users, Play } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  row: RiskRow;
  selectedScenario: Scenario;
}

interface ApprovalStep {
  level: string;
  title: string;
  person: string;
  role: string;
  status: "pending" | "approved" | "rejected";
  comments: string;
  required: string;
  timestamp?: string;
}

const executionTasks = [
  { id: 1, task: "Reschedule non-critical SKUs from W2–W3 to W5–W6", owner: "Production Team", icon: Factory, status: "ready" },
  { id: 2, task: "Activate flex labor pool (15 operators)", owner: "HR & Operations", icon: Users, status: "ready" },
  { id: 3, task: "Initiate stock rebalancing: DC-North → DC-Central", owner: "Logistics Team", icon: Truck, status: "ready" },
  { id: 4, task: "Update inventory allocation in WMS", owner: "Warehouse Ops", icon: Package, status: "ready" },
];

export default function LastMileExecution({ row, selectedScenario }: Props) {
  const scenario = selectedScenario;

  const [steps, setSteps] = useState<ApprovalStep[]>([
    { level: "L1", title: "Planner Approval", person: "John Smith", role: "Senior Planner", status: "pending", comments: "", required: "All mitigation scenarios requiring resource reallocation" },
    { level: "L2", title: "Operations Manager", person: "Sarah Johnson", role: "Operations Manager", status: "pending", comments: "", required: "Scenarios impacting production schedules or logistics" },
    { level: "L3", title: "Finance Approval", person: "Mike Chen", role: "Finance Director", status: "pending", comments: "", required: "Scenarios with cost impact >€15K" },
    { level: "L4", title: "Supply Chain Director", person: "Emma Rodriguez", role: "SC Director", status: "pending", comments: "", required: "Cross-functional scenarios" },
  ]);

  const [executionStarted, setExecutionStarted] = useState(false);
  const [executionComplete, setExecutionComplete] = useState(false);

  const handleApprove = (index: number) => {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, status: "approved", timestamp: new Date().toLocaleString(), comments: s.comments || "Approved – no objections." } : s));
    toast.success(`${steps[index].level} approved`);
  };

  const handleReject = (index: number) => {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, status: "rejected", timestamp: new Date().toLocaleString() } : s));
    toast.error(`${steps[index].level} rejected`);
  };

  const allApproved = steps.every(s => s.status === "approved");
  const approvedCount = steps.filter(s => s.status === "approved").length;
  const progress = Math.round((approvedCount / steps.length) * 100);

  const handleExecute = () => {
    setExecutionStarted(true);
    setTimeout(() => {
      setExecutionComplete(true);
      toast.success("Mitigation plan executed successfully");
    }, 2000);
  };

  const statusIcon = (status: string) => {
    if (status === "approved") return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    if (status === "rejected") return <XCircle className="h-5 w-5 text-destructive" />;
    return <Clock className="h-5 w-5 text-amber-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Last Mile Execution Header */}
      <div className="border-2 border-primary/20 rounded-xl p-5 bg-primary/[0.03]">
        <div className="flex items-center gap-2 mb-3">
          <Play className="h-5 w-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">Last Mile Execution</h3>
          <Badge className="ml-auto bg-primary/10 text-primary border-primary/20 text-xs">Scenario {scenario.id}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{scenario.name}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div><span className="text-xs text-primary font-semibold">Risk ID:</span><p className="text-sm font-bold">RISK-{String(row.riskId).padStart(3, "0")}</p></div>
          <div><span className="text-xs text-primary font-semibold">Total Cost:</span><p className="text-sm font-bold">€{scenario.cost.toLocaleString()}</p></div>
          <div><span className="text-xs text-primary font-semibold">Success Probability:</span><p className="text-sm font-bold">{scenario.successProbability}%</p></div>
          <div><span className="text-xs text-primary font-semibold">Expected Service Level:</span><p className="text-sm font-bold">96%</p></div>
        </div>
      </div>

      {/* Execution Tasks */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Execution Tasks</h3>
        </div>
        <div className="space-y-3">
          {executionTasks.map(task => (
            <div key={task.id} className="flex items-center gap-3 border border-border rounded-lg p-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <task.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-foreground">{task.task}</p>
                <p className="text-[10px] text-muted-foreground">{task.owner}</p>
              </div>
              <Badge variant="outline" className={`text-[10px] ${
                executionComplete ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                executionStarted ? "bg-amber-50 text-amber-700 border-amber-200" :
                "bg-muted text-muted-foreground"
              }`}>
                {executionComplete ? "Complete" : executionStarted ? "In Progress" : "Ready"}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Approval Workflow Progress */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-bold text-foreground">Approval Workflow Progress</h3>
          <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 border-amber-200 text-[10px]">
            <Clock className="h-3 w-3 mr-1" /> {progress}% Complete
          </Badge>
        </div>
        <Progress value={progress} className="h-2 mb-4" />

        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className={`border rounded-xl p-4 transition-all ${
              step.status === "approved" ? "border-emerald-200 bg-emerald-50/30" :
              step.status === "rejected" ? "border-destructive/30 bg-destructive/5" :
              "border-border bg-card"
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {statusIcon(step.status)}
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{step.level} - {step.title}</h4>
                    <p className="text-[10px] text-muted-foreground">{step.person} - {step.role}</p>
                  </div>
                </div>
                {step.status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] h-7 px-3" onClick={() => handleApprove(i)}>Approve</Button>
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/30 text-[10px] h-7 px-3" onClick={() => handleReject(i)}>Reject</Button>
                  </div>
                )}
                {step.timestamp && <span className="text-[10px] text-muted-foreground">{step.timestamp}</span>}
              </div>
              {step.comments && (
                <div className="mt-2 ml-8 bg-secondary/50 rounded-lg p-2">
                  <p className="text-[10px] text-foreground">{step.comments}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Execute Button */}
      {allApproved && !executionComplete && (
        <div className="flex justify-center">
          <Button onClick={handleExecute} size="lg" className="gap-2 px-8 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Play className="h-4 w-4" /> Execute Mitigation Plan
          </Button>
        </div>
      )}

      {/* Execution Results */}
      {executionComplete && (
        <div className="border-2 border-emerald-500/30 rounded-xl p-5 bg-emerald-50/50">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <h4 className="text-base font-bold text-emerald-800">Execution Complete</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="border border-emerald-200 rounded-xl p-3 text-center bg-white/50">
              <span className="text-xl font-bold text-emerald-700">97%</span>
              <p className="text-[10px] text-emerald-600">Actual Service Level</p>
            </div>
            <div className="border border-emerald-200 rounded-xl p-3 text-center bg-white/50">
              <span className="text-xl font-bold text-emerald-700">€15,369</span>
              <p className="text-[10px] text-emerald-600">Actual Cost</p>
            </div>
            <div className="border border-emerald-200 rounded-xl p-3 text-center bg-white/50">
              <span className="text-xl font-bold text-emerald-700">96%</span>
              <p className="text-[10px] text-emerald-600">Success Rate</p>
            </div>
            <div className="border border-emerald-200 rounded-xl p-3 text-center bg-white/50">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-[10px] text-emerald-600">Completed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
