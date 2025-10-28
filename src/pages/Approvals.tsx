import { MainLayout } from "@/components/layout/MainLayout";
import { CheckSquare, Clock, CheckCircle, XCircle, AlertCircle, User, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Approval {
  id: string;
  title: string;
  description: string;
  type: "plan_change" | "resource_allocation" | "supplier_change" | "forecast_override";
  priority: "urgent" | "high" | "medium" | "low";
  status: "pending" | "approved" | "rejected" | "expired";
  requester: string;
  requestedAt: string;
  dueDate: string;
  impact: string;
  details: string;
}

const approvals: Approval[] = [
  {
    id: "1",
    title: "Q4 Production Plan Override",
    description: "Request to increase production capacity by 20% for holiday demand surge in APAC region",
    type: "plan_change",
    priority: "urgent",
    status: "pending",
    requester: "Sarah Chen",
    requestedAt: "2024-01-16",
    dueDate: "2024-01-18",
    impact: "$3.2M revenue opportunity",
    details: "Demand forecast shows 25% increase vs original plan. Requires additional shift scheduling and raw material procurement."
  },
  {
    id: "2",
    title: "Supplier Diversification Approval",
    description: "Add secondary supplier for critical semiconductor components to reduce supply risk",
    type: "supplier_change",
    priority: "high",
    status: "pending",
    requester: "Michael Torres",
    requestedAt: "2024-01-15",
    dueDate: "2024-01-20",
    impact: "Risk mitigation + 5% cost reduction",
    details: "Current single-source dependency poses 78% supply risk. New supplier offers 5% cost advantage with equivalent quality."
  },
  {
    id: "3",
    title: "Emergency Resource Reallocation",
    description: "Redirect 15% of European capacity to address supply shortage in North America",
    type: "resource_allocation",
    priority: "high",
    status: "approved",
    requester: "Emma Rodriguez",
    requestedAt: "2024-01-14",
    dueDate: "2024-01-16",
    impact: "Prevent $1.8M in lost sales",
    details: "Approved by Regional Director. Implementation in progress."
  },
  {
    id: "4",
    title: "Forecast Model Update",
    description: "Deploy new ML forecast model with 12% accuracy improvement",
    type: "forecast_override",
    priority: "medium",
    status: "approved",
    requester: "David Kim",
    requestedAt: "2024-01-12",
    dueDate: "2024-01-19",
    impact: "12% forecast accuracy improvement",
    details: "Model validated against historical data. Ready for production deployment."
  }
];

export const Approvals = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "plan_change": return <Calendar className="h-4 w-4" />;
      case "resource_allocation": return <CheckSquare className="h-4 w-4" />;
      case "supplier_change": return <User className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "plan_change": return "bg-primary/10 text-primary";
      case "resource_allocation": return "bg-warning/10 text-warning";
      case "supplier_change": return "bg-success/10 text-success";
      default: return "bg-secondary/10 text-secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning/10 text-warning";
      case "medium": return "bg-primary/10 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <CheckCircle className="h-4 w-4 text-success" />;
      case "rejected": return <XCircle className="h-4 w-4 text-destructive" />;
      case "expired": return <Clock className="h-4 w-4 text-muted-foreground" />;
      default: return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-success/10 text-success";
      case "rejected": return "bg-destructive/10 text-destructive";
      case "expired": return "bg-muted text-muted-foreground";
      default: return "bg-warning/10 text-warning";
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-br from-background via-success/5 to-primary/5">
        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <Tabs defaultValue="pending" className="h-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">Pending (3)</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="all">All Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4 mt-4">
              <div className="grid gap-4">
                {approvals
                  .filter((approval) => approval.status === "pending")
                  .map((approval) => (
                    <Card key={approval.id} className="hover-lift border-l-4 border-l-warning">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${getTypeColor(approval.type)}`}>
                              {getTypeIcon(approval.type)}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{approval.title}</CardTitle>
                              <CardDescription className="mt-1">{approval.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(approval.priority)}>
                              {approval.priority}
                            </Badge>
                            <Badge className={getStatusColor(approval.status)} variant="secondary">
                              {getStatusIcon(approval.status)}
                              {approval.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Impact:</span>
                            <span className="font-medium">{approval.impact}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Requested by:</span>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {approval.requester.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{approval.requester}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Due Date:</span>
                            <span className="font-medium text-warning">{approval.dueDate}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>{approval.details}</p>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs text-muted-foreground">
                              Requested on {approval.requestedAt}
                            </span>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                              <Button size="sm">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            {["approved", "rejected", "all"].map((tabValue) => (
              <TabsContent key={tabValue} value={tabValue} className="space-y-4 mt-4">
                <div className="grid gap-4">
                  {approvals
                    .filter((approval) => 
                      tabValue === "all" || approval.status === tabValue
                    )
                    .map((approval) => (
                      <Card key={approval.id} className="hover-lift">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${getTypeColor(approval.type)}`}>
                                {getTypeIcon(approval.type)}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{approval.title}</CardTitle>
                                <CardDescription className="mt-1">{approval.description}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(approval.priority)}>
                                {approval.priority}
                              </Badge>
                              <Badge className={getStatusColor(approval.status)} variant="secondary">
                                {getStatusIcon(approval.status)}
                                {approval.status}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Impact:</span>
                              <span className="font-medium">{approval.impact}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Requested by:</span>
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {approval.requester.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{approval.requester}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                Requested on {approval.requestedAt}
                              </span>
                              <Button variant="ghost" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Approvals;