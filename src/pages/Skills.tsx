import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ModuleCard } from "@/components/decision-intelligence/ModuleCard";
import { FilterBar } from "@/components/decision-intelligence/FilterBar";
import { DecisionTable, Decision } from "@/components/decision-intelligence/DecisionTable";
import { DecisionDetailDialog } from "@/components/decision-intelligence/DecisionDetailDialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Package, ShoppingCart, CheckCircle, TrendingUp, Sparkles, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock decisions data
const mockDecisions: Decision[] = [
  {
    id: "1",
    recommendation: "Transfer 31 pallets by October 23rd",
    type: "Preventive Transfer",
    fromLocation: "L017",
    toLocation: "L002",
    inventorySavings: "$31,580",
    serviceRisk: "$60,002",
    truckNumber: "T4",
    pallets: 31,
    calendarDay: "23-Jan-2026",
  },
  {
    id: "2",
    recommendation: "Transfer 33 pallets by October 25th",
    type: "Preventive Transfer",
    fromLocation: "L017",
    toLocation: "L002",
    inventorySavings: "$33,164",
    serviceRisk: "$59,695",
    truckNumber: "T1",
    pallets: 33,
    calendarDay: "25-Jan-2026",
  },
  {
    id: "3",
    recommendation: "Transfer 53 pallets by October 28th",
    type: "Preventive Transfer",
    fromLocation: "L005",
    toLocation: "L020",
    inventorySavings: "$31,709",
    serviceRisk: "$57,016",
    truckNumber: "T9",
    pallets: 53,
    calendarDay: "28-Jan-2026",
  },
  {
    id: "4",
    recommendation: "Transfer 33 pallets by October 30th",
    type: "Preventive Transfer",
    fromLocation: "L005",
    toLocation: "L020",
    inventorySavings: "$32,837",
    serviceRisk: "$58,207",
    truckNumber: "T6",
    pallets: 33,
    calendarDay: "30-Jan-2026",
  },
  {
    id: "5",
    recommendation: "Transfer 33 pallets by November 2nd",
    type: "Preventive Transfer",
    fromLocation: "L010",
    toLocation: "L004",
    inventorySavings: "$30,785",
    serviceRisk: "$60,000",
    truckNumber: "T5",
    pallets: 33,
    calendarDay: "02-Feb-2026",
  },
  {
    id: "6",
    recommendation: "Transfer 53 pallets by November 5th",
    type: "Preventive Transfer",
    fromLocation: "L018",
    toLocation: "L005",
    inventorySavings: "$32,062",
    serviceRisk: "$0",
    truckNumber: "T2",
    pallets: 53,
    calendarDay: "05-Feb-2026",
  },
  {
    id: "7",
    recommendation: "Transfer 33 pallets by November 8th",
    type: "Preventive Transfer",
    fromLocation: "L015",
    toLocation: "L009",
    inventorySavings: "$30,223",
    serviceRisk: "$57,424",
    truckNumber: "T9",
    pallets: 33,
    calendarDay: "08-Feb-2026",
  },
  {
    id: "8",
    recommendation: "Transfer 53 pallets by November 10th",
    type: "Preventive Transfer",
    fromLocation: "L015",
    toLocation: "L009",
    inventorySavings: "$32,268",
    serviceRisk: "$61,309",
    truckNumber: "T2",
    pallets: 53,
    calendarDay: "10-Feb-2026",
  },
];

export default function Skills() {
  const [view, setView] = useState<"modules" | "inventory-detail">("modules");
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("all");
  const [type, setType] = useState("all");
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === "inventory") {
      setView("inventory-detail");
    }
  };

  const handleBackToModules = () => {
    setView("modules");
  };

  const handleDecisionClick = (decision: Decision) => {
    setSelectedDecision(decision);
    setDialogOpen(true);
  };

  const handleAccept = (decisionId: string) => {
    toast({
      title: "Decision Accepted",
      description: "The transfer recommendation has been accepted and scheduled.",
    });
  };

  const handleDismiss = (decisionId: string) => {
    toast({
      title: "Decision Dismissed",
      description: "The transfer recommendation has been dismissed.",
      variant: "destructive",
    });
  };

  const handleModify = (decisionId: string) => {
    toast({
      title: "Modify Decision",
      description: "Opening decision editor...",
    });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setLocation("all");
    setType("all");
  };

  const filteredDecisions = mockDecisions.filter((decision) => {
    const matchesSearch =
      searchQuery === "" ||
      decision.recommendation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      location === "all" ||
      decision.fromLocation === location ||
      decision.toLocation === location;
    const matchesType = type === "all" || decision.type === type;

    return matchesSearch && matchesLocation && matchesType;
  });

  if (view === "inventory-detail") {
    return (
      <MainLayout>
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-surface/30 to-muted/20 p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Personalized Greeting Banner */}
            <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 shadow-[var(--shadow-glow)] animate-fade-in overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
              <div className="relative p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary backdrop-blur-sm">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Hello, Aditya!</h2>
                        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                      </div>
                      <p className="text-sm md:text-base text-muted-foreground">Material Planner</p>
                      <p className="text-sm text-muted-foreground mt-1">Welcome back to your Inventory Decision Intelligence workspace</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleBackToModules}
                    className="hover:bg-primary/10 transition-all duration-300 hover:scale-105"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Modules
                  </Button>
                </div>
              </div>
            </Card>

            {/* Page Title */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
                Inventory Transfer Decisions
              </h1>
              <p className="text-sm text-muted-foreground">
                Home &gt; Decision Intelligence &gt; Module &gt; Inventory
              </p>
            </div>

            {/* Filters */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              location={location}
              onLocationChange={setLocation}
              type={type}
              onTypeChange={setType}
              onClearFilters={handleClearFilters}
              resultCount={filteredDecisions.length}
              totalCount={mockDecisions.length}
            />

            {/* Decision Table */}
            <DecisionTable
              decisions={filteredDecisions}
              onDecisionClick={handleDecisionClick}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
              onModify={handleModify}
            />

            {/* Decision Detail Dialog */}
            <DecisionDetailDialog
              decision={selectedDecision}
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              onAccept={handleAccept}
              onDismiss={handleDismiss}
              onModify={handleModify}
            />

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page 1 of 1
              </div>
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-surface/30 to-muted/20 p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Personalized Greeting Banner */}
          <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-primary/20 shadow-[var(--shadow-glow)] animate-fade-in overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
            <div className="relative p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary backdrop-blur-sm">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Hello, Aditya!</h2>
                    <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  </div>
                  <p className="text-sm md:text-base text-muted-foreground">Material Planner</p>
                  <p className="text-sm text-muted-foreground mt-1">Choose a module to view decision recommendations</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
              Decision Intelligence - Module
            </h1>
            <p className="text-muted-foreground">
              Manage and configure AI decision intelligence modules
            </p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <ModuleCard
              title="Inventory"
              subtitle="AI-powered inventory transfer recommendations"
              status="active"
              icon={Package}
              onClick={() => handleModuleClick("inventory")}
              statusCount={47}
            />
            <ModuleCard
              title="Order Management"
              subtitle="Automated order processing and fulfillment"
              status="coming-soon"
              icon={ShoppingCart}
              disabled
            />
            <ModuleCard
              title="Quality Control"
              subtitle="Predictive quality analysis and alerts"
              status="coming-soon"
              icon={CheckCircle}
              disabled
            />
            <ModuleCard
              title="Stock Rebalancing"
              subtitle="Real-time supply and demand optimization"
              status="coming-soon"
              icon={TrendingUp}
              disabled
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
