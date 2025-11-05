import { MainLayout } from "@/components/layout/MainLayout";
import { Bot, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentCard } from "@/components/dashboard/AgentCard";

export const Agents = () => {
  return (
    <MainLayout>
      <div className="p-8 space-y-8 bg-gradient-to-br from-background via-surface to-muted/20 min-h-screen">
        <div className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Agent Directory</h1>
            <p className="text-muted-foreground mt-2">Manage and monitor your AI agents</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Agent</span>
          </Button>
        </div>

        <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <Input placeholder="Search agents..." className="max-w-sm" />
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <div className="text-center py-24 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="bg-card rounded-3xl border border-border p-16 shadow-[var(--shadow-card)] max-w-2xl mx-auto">
            <Bot className="h-20 w-20 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Agent Directory Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto text-base">
              This section will provide a comprehensive view of all your AI agents, their health, and performance metrics.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Agents;