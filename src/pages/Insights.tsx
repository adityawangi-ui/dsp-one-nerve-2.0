import { MainLayout } from "@/components/layout/MainLayout";
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Clock, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Insight {
  id: string;
  title: string;
  description: string;
  category: "optimization" | "risk" | "opportunity" | "performance";
  priority: "high" | "medium" | "low";
  impact: string;
  confidence: number;
  status: "new" | "reviewed" | "implemented";
  createdAt: string;
}

const insights: Insight[] = [
  {
    id: "1",
    title: "Inventory Optimization Opportunity",
    description: "APAC region showing 15% excess inventory in consumer electronics. Recommend redistribution to high-demand EMEA markets.",
    category: "optimization",
    priority: "high",
    impact: "$2.3M cost savings",
    confidence: 94,
    status: "new",
    createdAt: "2024-01-16"
  },
  {
    id: "2",
    title: "Supply Chain Risk Alert",
    description: "Single-source supplier dependency detected for critical components. Diversification needed to mitigate 78% supply risk.",
    category: "risk",
    priority: "high",
    impact: "Risk mitigation",
    confidence: 89,
    status: "reviewed",
    createdAt: "2024-01-15"
  },
  {
    id: "3",
    title: "Demand Pattern Shift",
    description: "Premium product segment showing 23% growth in millennial demographic. Consider capacity reallocation.",
    category: "opportunity",
    priority: "medium",
    impact: "$1.8M revenue potential",
    confidence: 82,
    status: "new",
    createdAt: "2024-01-14"
  },
  {
    id: "4",
    title: "Forecast Accuracy Improvement",
    description: "ML model performance increased to 91% accuracy after latest training. Recommend deployment to production.",
    category: "performance",
    priority: "medium",
    impact: "3% forecast improvement",
    confidence: 96,
    status: "implemented",
    createdAt: "2024-01-13"
  }
];

export const Insights = () => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "optimization": return <TrendingUp className="h-4 w-4" />;
      case "risk": return <AlertTriangle className="h-4 w-4" />;
      case "opportunity": return <Lightbulb className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "optimization": return "bg-primary/10 text-primary";
      case "risk": return "bg-destructive/10 text-destructive";
      case "opportunity": return "bg-warning/10 text-warning";
      default: return "bg-success/10 text-success";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive";
      case "medium": return "bg-warning/10 text-warning";
      default: return "bg-success/10 text-success";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "implemented": return <CheckCircle className="h-4 w-4 text-success" />;
      case "reviewed": return <Clock className="h-4 w-4 text-warning" />;
      default: return <Lightbulb className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-background">
        {/* Header */}
        <div className="border-b border-border px-6 py-4 bg-gradient-subtle">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Insights & Recommendations</h1>
              <p className="text-muted-foreground text-sm">AI-powered insights to optimize your operations</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-4">
          <Tabs defaultValue="all" className="h-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Insights</TabsTrigger>
              <TabsTrigger value="optimization">Optimization</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="opportunity">Opportunity</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              <div className="grid gap-4">
                {insights.map((insight) => (
                  <Card key={insight.id} className="hover-lift">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${getCategoryColor(insight.category)}`}>
                            {getCategoryIcon(insight.category)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{insight.title}</CardTitle>
                            <CardDescription className="mt-1">{insight.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(insight.status)}
                          <Badge className={getPriorityColor(insight.priority)} variant="secondary">
                            {insight.priority} priority
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Impact:</span>
                          <span className="font-medium">{insight.impact}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Confidence:</span>
                          <div className="flex items-center space-x-2">
                            <Progress value={insight.confidence} className="w-20" />
                            <span className="font-medium">{insight.confidence}%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{insight.createdAt}</span>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm">
                              Mark as Reviewed
                            </Button>
                            <Button size="sm">
                              Implement
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {["optimization", "risk", "opportunity", "performance"].map((category) => (
              <TabsContent key={category} value={category} className="space-y-4 mt-4">
                <div className="grid gap-4">
                  {insights
                    .filter((insight) => insight.category === category)
                    .map((insight) => (
                      <Card key={insight.id} className="hover-lift">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${getCategoryColor(insight.category)}`}>
                                {getCategoryIcon(insight.category)}
                              </div>
                              <div>
                                <CardTitle className="text-lg">{insight.title}</CardTitle>
                                <CardDescription className="mt-1">{insight.description}</CardDescription>
                              </div>
                            </div>
                            <Badge className={getPriorityColor(insight.priority)} variant="secondary">
                              {insight.priority} priority
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Impact:</span>
                              <span className="font-medium">{insight.impact}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Confidence:</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={insight.confidence} className="w-20" />
                                <span className="font-medium">{insight.confidence}%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{insight.createdAt}</span>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                                <Button size="sm">
                                  Implement
                                </Button>
                              </div>
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

export default Insights;