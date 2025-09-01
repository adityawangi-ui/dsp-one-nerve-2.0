import { MainLayout } from "@/components/layout/MainLayout";
import { Bot, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AgentCard } from "@/components/dashboard/AgentCard";

export const Agents = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Agent Directory</h1>
            <p className="text-muted-foreground mt-1">Manage and monitor your AI agents</p>
          </div>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add New Agent</span>
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <Input placeholder="Search agents..." className="max-w-sm" />
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>

        <div className="text-center py-20">
          <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Agent Directory Coming Soon</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            This section will provide a comprehensive view of all your AI agents, their health, and performance metrics.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Agents;