import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Mail, FileText, PlayCircle, Clock, CheckCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function ExecutionClosure() {
  const { toast } = useToast();

  const activeAgents = [
    "SAP Action Agent",
    "Email Listener",
    "Notification Agent"
  ];

  const sapActions = [
    { id: 1, action: "MD04 - Stock/Requirements List Update", status: "Ready", code: "MD04_FG98342_1200" },
    { id: 2, action: "CO02 - Production Order Amendment", status: "Ready", code: "CO02_ORD_456789" },
    { id: 3, action: "VL01N - Outbound Delivery Split", status: "Ready", code: "VL01N_DEL_789012" },
    { id: 4, action: "ME57 - RFQ to Expedite Freight", status: "Ready", code: "ME57_RFQ_234567" },
  ];

  const approvalFlow = [
    { step: "Planner Review", status: "complete", user: "You", timestamp: "2025-01-15 14:23" },
    { step: "Manager Approval", status: "pending", user: "Sarah Johnson", timestamp: "-" },
    { step: "Finance Sign-off", status: "pending", user: "Finance Team", timestamp: "-" },
    { step: "Execution", status: "pending", user: "System", timestamp: "-" },
  ];

  const handleExecuteSAP = (actionId: number) => {
    toast({
      title: "SAP Action Queued",
      description: "Transaction will execute after approval workflow completes",
    });
  };

  const handleSendEmail = () => {
    toast({
      title: "Email Sent",
      description: "Approval request sent to Sarah Johnson",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Execution & Closure</h1>
            <p className="text-muted-foreground mt-2">Material: FG-98342 | Scenario: S1</p>
          </div>
          <Badge variant="default" className="bg-success text-lg px-4 py-2">
            Ready for Approval
          </Badge>
        </div>

        {/* Active Agents */}
        <Card className="p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-muted-foreground">Active Agents:</span>
            {activeAgents.map((agent) => (
              <Badge key={agent} variant="secondary" className="animate-pulse">
                {agent}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Approval Workflow */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-foreground mb-6">Approval Workflow</h3>
          <div className="space-y-4">
            {approvalFlow.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.status === "complete" 
                    ? "bg-success/20 text-success" 
                    : step.status === "pending" 
                    ? "bg-muted text-muted-foreground" 
                    : "bg-primary/20 text-primary"
                }`}>
                  {step.status === "complete" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Clock className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{step.step}</p>
                      <p className="text-sm text-muted-foreground">{step.user}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={step.status === "complete" ? "default" : "secondary"}>
                        {step.status}
                      </Badge>
                      {step.timestamp !== "-" && (
                        <p className="text-xs text-muted-foreground mt-1">{step.timestamp}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Progress value={25} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">1 of 4 steps complete</p>
          </div>
        </Card>

        {/* SAP Actions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Auto-Generated SAP Actions</h3>
              <p className="text-sm text-muted-foreground">Ready to execute after approval</p>
            </div>
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="space-y-3">
            {sapActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{action.action}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">{action.code}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary">{action.status}</Badge>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleExecuteSAP(action.id)}
                    disabled
                  >
                    <PlayCircle className="h-3 w-3 mr-1" />
                    Execute
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Email Templates */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Pre-filled Email Templates</h3>
              <p className="text-sm text-muted-foreground">Ready to send for approvals</p>
            </div>
            <Mail className="h-6 w-6 text-primary" />
          </div>
          
          <div className="space-y-4">
            {/* Manager Email */}
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">Manager Approval Request</p>
                  <p className="text-xs text-muted-foreground">To: sarah.johnson@company.com</p>
                </div>
                <Button size="sm" onClick={handleSendEmail}>
                  <Mail className="h-3 w-3 mr-1" />
                  Send
                </Button>
              </div>
              <div className="p-3 rounded bg-muted/30 text-sm text-muted-foreground">
                <p className="font-mono">
                  <strong>Subject:</strong> Urgent: Risk Mitigation Approval Required - FG-98342<br/><br/>
                  Hi Sarah,<br/><br/>
                  Our AI system has identified a critical service risk for Material FG-98342 (Plant 1200) with 48,320 customer orders at risk.<br/><br/>
                  <strong>Recommended Action:</strong> Scenario S1 - Pull-ahead Production + Split Freight<br/>
                  <strong>Service Recovery:</strong> +11% (77% → 88%)<br/>
                  <strong>Cost Impact:</strong> $43K<br/>
                  <strong>Timeline:</strong> Execute within 48 hours<br/><br/>
                  Please review the detailed analysis in the attached report and approve if aligned with our risk tolerance.<br/><br/>
                  [View Full Report] [Approve] [Reject]
                </p>
              </div>
            </div>

            {/* Finance Email */}
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">Finance Sign-off Request</p>
                  <p className="text-xs text-muted-foreground">To: finance@company.com</p>
                </div>
                <Button size="sm" variant="outline" disabled>
                  <Mail className="h-3 w-3 mr-1" />
                  Send
                </Button>
              </div>
              <div className="p-3 rounded bg-muted/30 text-sm text-muted-foreground">
                <p className="font-mono">
                  <strong>Subject:</strong> Budget Approval: $43K for Emergency Freight<br/><br/>
                  Finance Team,<br/><br/>
                  Requesting expedited approval for $43K unplanned freight cost to mitigate service risk on strategic A+ SKU.<br/><br/>
                  <strong>Cost Breakdown:</strong><br/>
                  - Split freight premium: $28K<br/>
                  - Production acceleration: $15K<br/><br/>
                  <strong>Business Impact:</strong><br/>
                  - Prevents 48,320 order shortfall<br/>
                  - Maintains 88% service level<br/>
                  - ROI: Customer retention value exceeds cost by 8x<br/><br/>
                  [Approve] [Request More Info]
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Risk Closure Dashboard */}
        <Card className="p-6 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-full bg-success/20">
              <CheckCheck className="h-8 w-8 text-success" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Risk Closure Preview</h3>
              <p className="text-sm text-muted-foreground">Post-execution status (simulated)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Final Service Level</p>
              <p className="text-3xl font-bold text-success">88%</p>
              <p className="text-xs text-muted-foreground">Target: 85% (Exceeded)</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Orders Protected</p>
              <p className="text-3xl font-bold text-success">48,320</p>
              <p className="text-xs text-muted-foreground">100% of at-risk orders</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Resolution Time</p>
              <p className="text-3xl font-bold text-primary">36 hrs</p>
              <p className="text-xs text-muted-foreground">Within 48hr window</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm text-foreground">
              <strong>Status:</strong> Upon approval completion, SAP actions will execute automatically and risk will be marked as <strong className="text-success">CLOSED</strong>. Learning Agent will capture this resolution for future optimization.
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
