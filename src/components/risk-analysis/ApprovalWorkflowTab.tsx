import { useState } from "react";
import { RiskRow } from "@/data/riskData";
import { Scenario } from "./ScenarioSimulatorTab";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clock, CheckCircle2, XCircle, FileText, MessageSquare, AlertTriangle, CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Props {
  row: RiskRow;
  selectedScenario: Scenario | null;
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

export default function ApprovalWorkflowTab({ row, selectedScenario }: Props) {
  const scenario = selectedScenario || { id: 3, name: "Rescheduling + Short-Term Labor + Stock Rebalancing", serviceLevel: 98, cost: 16000 };
  const requestDate = new Date();
  
  const [steps, setSteps] = useState<ApprovalStep[]>([
    { level: "L1", title: "Planner Approval", person: "John Smith", role: "Senior Planner", status: "pending", comments: "", required: "All mitigation scenarios requiring resource reallocation" },
    { level: "L2", title: "Operations Manager", person: "Sarah Johnson", role: "Operations Manager", status: "pending", comments: "", required: "Scenarios impacting production schedules or logistics" },
    { level: "L3", title: "Finance Approval", person: "Mike Chen", role: "Finance Director", status: "pending", comments: "", required: "Scenarios with cost impact >€15K or strategic resource reallocation" },
    { level: "L4", title: "Supply Chain Director", person: "Emma Rodriguez", role: "SC Director", status: "pending", comments: "", required: "Cross-functional scenarios affecting multiple departments" },
  ]);

  const [executionComplete, setExecutionComplete] = useState(false);
  const [commentDialog, setCommentDialog] = useState<{ open: boolean; index: number; action: "approve" | "reject" }>({ open: false, index: 0, action: "approve" });
  const [commentText, setCommentText] = useState("");

  const handleOpenCommentDialog = (index: number, action: "approve" | "reject") => {
    setCommentDialog({ open: true, index, action });
    setCommentText("");
  };

  const handleSubmitWithComment = () => {
    const { index, action } = commentDialog;
    const status = action === "approve" ? "approved" : "rejected";
    const defaultComment = action === "approve" ? "Approved – no objections." : "Rejected – requires revision.";
    
    setSteps(prev => prev.map((s, i) => i === index ? {
      ...s,
      status: status as "approved" | "rejected",
      timestamp: new Date().toLocaleString(),
      comments: commentText.trim() || defaultComment,
    } : s));

    if (action === "approve") {
      toast.success(`${steps[index].level} - ${steps[index].title} approved`);
    } else {
      toast.error(`${steps[index].level} - ${steps[index].title} rejected`);
    }
    setCommentDialog({ open: false, index: 0, action: "approve" });
    setCommentText("");
  };

  const allApproved = steps.every(s => s.status === "approved");
  const approvedCount = steps.filter(s => s.status === "approved").length;
  const progress = Math.round((approvedCount / steps.length) * 100);

  const executeplan = () => {
    setExecutionComplete(true);
    toast.success("Mitigation plan executed successfully");
  };

  const statusIcon = (status: string) => {
    if (status === "approved") return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
    if (status === "rejected") return <XCircle className="h-5 w-5 text-destructive" />;
    return <Clock className="h-5 w-5 text-amber-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Execution Request Summary */}
      <div className="border border-border rounded-xl p-5 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-5 w-5 text-primary" />
          <h3 className="text-base font-bold text-foreground">Execution Request Summary</h3>
          <Badge variant="outline" className="ml-auto bg-amber-50 text-amber-700 border-amber-200">
            <Clock className="h-3 w-3 mr-1" /> IN APPROVAL
          </Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div><span className="text-xs text-primary font-semibold">Risk ID:</span><p className="text-sm font-bold">RISK-{String(row.riskId).padStart(3, "0")}</p></div>
          <div><span className="text-xs text-primary font-semibold">Total Cost:</span><p className="text-sm font-bold">€{scenario.cost.toLocaleString()}</p></div>
          <div><span className="text-xs text-primary font-semibold">Requested By:</span><p className="text-sm font-bold">John Smith</p></div>
          <div><span className="text-xs text-primary font-semibold">Expected Service Level:</span><p className="text-sm font-bold">96%</p></div>
          <div className="flex items-start gap-2">
            <CalendarDays className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-primary font-semibold">Request Date & Time:</span>
              <p className="text-sm font-bold">{requestDate.toLocaleDateString()} {requestDate.toLocaleTimeString()}</p>
            </div>
          </div>
          <div><span className="text-xs text-primary font-semibold">Business Impact:</span><p className="text-sm font-bold">Risk mitigation execution</p></div>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <div>
              <span className="text-xs text-primary font-semibold">Urgency:</span>
              <div><Badge className="bg-destructive/10 text-destructive border-destructive/30 text-xs mt-0.5">High</Badge></div>
            </div>
          </div>
          <div>
            <span className="text-xs text-primary font-semibold">Current Progress:</span>
            <Progress value={progress} className="mt-2 h-2" />
            <p className="text-[10px] text-muted-foreground mt-1">{progress}% Complete</p>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <span className="text-xs text-primary font-semibold">Mitigation Summary:</span>
          <div className="bg-secondary rounded-lg p-3 mt-2 text-xs text-muted-foreground leading-relaxed">
            Reschedules non-critical SKUs from W2–W3 to W5–W6, freeing PU2 capacity for MRDR-B and MRDR-A. Activates flex labor pool for extended Line 2 hours during W2–W4. Overproduces MRDR-C in W3–W4 with stock rebalancing across DCs. Flex labor €10K, rebalancing logistics €6K. Service projections: MRDR-B 98%, MRDR-A 96%, MRDR-C 94%. TO Saved: €235K.
          </div>
        </div>
      </div>

      {/* Approval Steps */}
      <div className="space-y-4">
        {steps.map((step, i) => (
          <div key={i} className={`border rounded-xl p-5 transition-all ${step.status === "approved" ? "border-emerald-200 bg-emerald-50/30" : step.status === "rejected" ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {statusIcon(step.status)}
                <div>
                  <h4 className="text-sm font-bold text-foreground">{step.level} - {step.title}</h4>
                  <p className="text-xs text-muted-foreground">{step.person} - {step.role}</p>
                </div>
              </div>
              {step.status === "pending" && (
                <div className="flex gap-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs" onClick={() => handleOpenCommentDialog(i, "approve")}>Approve</Button>
                  <Button size="sm" variant="outline" className="text-destructive border-destructive/30 text-xs" onClick={() => handleOpenCommentDialog(i, "reject")}>Reject</Button>
                </div>
              )}
              {step.timestamp && <span className="text-[10px] text-muted-foreground">{step.timestamp}</span>}
            </div>
            {step.comments && (
              <div className="mt-3 ml-8 border border-border rounded-lg p-3 bg-secondary/50">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><MessageSquare className="h-3 w-3" /> Comments</div>
                <p className="text-xs text-foreground">{step.comments}</p>
              </div>
            )}
            <p className="text-[10px] text-muted-foreground mt-2 ml-8">Required for: {step.required}</p>
          </div>
        ))}
      </div>

      {/* Execute Button */}
      {allApproved && !executionComplete && (
        <div className="flex justify-center">
          <Button onClick={executeplan} size="lg" className="gap-2 px-8 bg-emerald-600 hover:bg-emerald-700 text-white">
            <CheckCircle2 className="h-4 w-4" /> Execute Mitigation Plan
          </Button>
        </div>
      )}

      {/* Execution Results */}
      {executionComplete && (
        <div className="border-2 border-primary/20 rounded-xl p-5 bg-primary/[0.03]">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h4 className="text-base font-bold text-foreground">Execution Results</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Mitigation plan executed successfully on {new Date().toLocaleString()}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <div className="border border-border rounded-xl p-3 text-center bg-card">
              <span className="text-xl font-bold text-primary">97%</span>
              <p className="text-xs text-muted-foreground">Actual Service Level</p>
            </div>
            <div className="border border-border rounded-xl p-3 text-center bg-card">
              <span className="text-xl font-bold text-primary">€15,369</span>
              <p className="text-xs text-muted-foreground">Actual Cost</p>
            </div>
            <div className="border border-border rounded-xl p-3 text-center bg-card">
              <span className="text-xl font-bold text-primary">96%</span>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
            <div className="border border-border rounded-xl p-3 text-center bg-card">
              <CheckCircle2 className="h-5 w-5 text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
      )}

      {/* Comment Dialog */}
      <Dialog open={commentDialog.open} onOpenChange={(open) => setCommentDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {commentDialog.action === "approve" ? (
                <><CheckCircle2 className="h-5 w-5 text-emerald-600" /> Approve – {steps[commentDialog.index]?.level}</>
              ) : (
                <><XCircle className="h-5 w-5 text-destructive" /> Reject – {steps[commentDialog.index]?.level}</>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-2">
                {commentDialog.action === "approve" 
                  ? "Add any comments or notes for this approval (optional):" 
                  : "Please provide a reason for rejection:"}
              </p>
              <Textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder={commentDialog.action === "approve" ? "Optional comments..." : "Reason for rejection..."}
                className="min-h-[80px]"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setCommentDialog(prev => ({ ...prev, open: false }))}>Cancel</Button>
              <Button
                className={`gap-2 ${commentDialog.action === "approve" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-destructive hover:bg-destructive/90 text-destructive-foreground"}`}
                onClick={handleSubmitWithComment}
              >
                {commentDialog.action === "approve" ? (
                  <><CheckCircle2 className="h-4 w-4" /> Confirm Approval</>
                ) : (
                  <><XCircle className="h-4 w-4" /> Confirm Rejection</>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
