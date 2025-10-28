import { MainLayout } from "@/components/layout/MainLayout";
import { FlaskConical, Plus, Play, Save, Copy, Trash2, Calendar, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Scenario {
  id: string;
  name: string;
  description: string;
  status: "draft" | "running" | "completed";
  createdAt: string;
  impact: string;
  confidence: number;
}

const scenarios: Scenario[] = [
  {
    id: "1",
    name: "Q4 Demand Surge Planning",
    description: "Test 25% demand increase across APAC region for holiday season",
    status: "running",
    createdAt: "2024-01-15",
    impact: "High",
    confidence: 87
  },
  {
    id: "2", 
    name: "Supply Chain Disruption",
    description: "Simulate 3-week port closure in key European shipping routes",
    status: "completed",
    createdAt: "2024-01-10",
    impact: "Critical",
    confidence: 92
  },
  {
    id: "3",
    name: "New Product Launch",
    description: "Model capacity requirements for premium product line rollout",
    status: "draft",
    createdAt: "2024-01-12",
    impact: "Medium",
    confidence: 76
  }
];

export const ScenarioWorkbench = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running": return "bg-warning/10 text-warning";
      case "completed": return "bg-success/10 text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "bg-destructive/10 text-destructive";
      case "High": return "bg-warning/10 text-warning";
      default: return "bg-primary/10 text-primary";
    }
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-gradient-to-br from-background via-muted/10 to-primary/5">
        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-6">
          <Tabs defaultValue="scenarios" className="h-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scenarios">Active Scenarios</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="scenarios" className="space-y-4 mt-4">
              <div className="flex items-center space-x-4 mb-4">
                <Input placeholder="Search scenarios..." className="max-w-sm" />
                <Button variant="outline" size="sm">
                  Filter by Status
                </Button>
              </div>

              <div className="grid gap-4">
                {scenarios.map((scenario) => (
                  <Card key={scenario.id} className="hover-lift">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{scenario.name}</CardTitle>
                          <CardDescription className="mt-1">{scenario.description}</CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(scenario.status)} variant="secondary">
                            {scenario.status}
                          </Badge>
                          <Badge className={getImpactColor(scenario.impact)} variant="secondary">
                            {scenario.impact}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{scenario.createdAt}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="h-4 w-4" />
                            <span>Confidence: {scenario.confidence}%</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            View Results
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Play className="h-4 w-4 mr-1" />
                            Run
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Demand Forecast Testing", description: "Test demand variations and seasonality" },
                  { name: "Supply Disruption Impact", description: "Model supply chain interruptions" },
                  { name: "Capacity Planning", description: "Optimize production and inventory capacity" },
                  { name: "Market Entry Analysis", description: "Evaluate new market opportunities" },
                  { name: "Cost Optimization", description: "Identify cost reduction opportunities" },
                  { name: "Risk Assessment", description: "Evaluate operational risks and mitigation" }
                ].map((template, index) => (
                  <Card key={index} className="hover-lift cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button size="sm" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <FlaskConical className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Results Dashboard</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  View comprehensive analysis and insights from your completed scenarios.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ScenarioWorkbench;