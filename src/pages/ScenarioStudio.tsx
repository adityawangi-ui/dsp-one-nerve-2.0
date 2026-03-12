import { MainLayout } from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, CheckCircle2, TrendingUp, DollarSign, Clock, ArrowLeft } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const scenarios = [
  {
    id: "S1",
    name: "Pull-ahead Production + Split Freight",
    description: "Accelerate production schedule and use multiple freight modes",
    serviceLevel: "96.2%",
    costImpact: "+$43K",
    leadTimeDelta: "-5 days",
    recommended: true,
    metrics: {
      service: 88,
      cost: 65,
      speed: 85,
      risk: 45,
      quality: 92,
    }
  },
  {
    id: "S2",
    name: "Interplant Transfer from DC-45",
    description: "Leverage existing inventory from Distribution Center 45",
    serviceLevel: "93.8%",
    costImpact: "+$12K",
    leadTimeDelta: "-3 days",
    recommended: false,
    metrics: {
      service: 75,
      cost: 88,
      speed: 65,
      risk: 35,
      quality: 78,
    }
  },
  {
    id: "S3",
    name: "Expedite Vendor + Shift MRP Buckets",
    description: "Fast-track supplier delivery and adjust planning horizons",
    serviceLevel: "98.1%",
    costImpact: "+$65K",
    leadTimeDelta: "-8 days",
    recommended: false,
    metrics: {
      service: 95,
      cost: 52,
      speed: 95,
      risk: 62,
      quality: 85,
    }
  },
];

const comparisonData = [
  { metric: "Service Level (%)", S1: 96.2, S2: 93.8, S3: 98.1 },
  { metric: "Cost (K$)", S1: 43, S2: 12, S3: 65 },
  { metric: "Lead Time (days saved)", S1: 5, S2: 3, S3: 8 },
  { metric: "Risk Score", S1: 45, S2: 35, S3: 62 },
];

export default function ScenarioStudio() {
  const navigate = useNavigate();
  const [selectedScenario, setSelectedScenario] = useState("S1");

  const activeAgents = [
    "Target Simulator",
    "Capacity Optimizer",
    "Distribution Optimizer",
    "Cost Optimizer",
    "Orders Cleaner"
  ];

  const selected = scenarios.find(s => s.id === selectedScenario);

  return (
    <MainLayout>
      <div className="space-y-6 p-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Scenario Studio</h1>
              <p className="text-muted-foreground mt-2">AI-generated optimization pathways</p>
            </div>
          </div>
          <Button onClick={() => navigate("/recommendation-summary")} size="lg" className="gap-2">
            Review Recommendation <ChevronRight className="h-4 w-4" />
          </Button>
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

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <Card 
              key={scenario.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                selectedScenario === scenario.id 
                  ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-[var(--shadow-glow)]" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                    selectedScenario === scenario.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {scenario.id}
                  </div>
                  {scenario.recommended && (
                    <Badge variant="default" className="bg-success text-success-foreground">
                      Recommended
                    </Badge>
                  )}
                </div>
                {selectedScenario === scenario.id && (
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                )}
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{scenario.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{scenario.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" /> Service Level
                  </span>
                  <span className="text-sm font-bold text-success">{scenario.serviceLevel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <DollarSign className="h-3 w-3" /> Cost Impact
                  </span>
                  <span className="text-sm font-bold text-warning">{scenario.costImpact}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Lead-time Δ
                  </span>
                  <span className="text-sm font-bold text-primary">{scenario.leadTimeDelta}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Selected Scenario Details */}
        {selected && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {selected.id} Performance Profile
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={[
                  { metric: "Service", value: selected.metrics.service },
                  { metric: "Cost Efficiency", value: selected.metrics.cost },
                  { metric: "Speed", value: selected.metrics.speed },
                  { metric: "Low Risk", value: selected.metrics.risk },
                  { metric: "Quality", value: selected.metrics.quality },
                ]}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                  <Radar name={selected.id} dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            {/* Comparison Chart */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Scenario Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="S1" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="S2" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="S3" fill="hsl(var(--warning))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
