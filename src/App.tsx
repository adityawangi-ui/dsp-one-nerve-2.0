import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIAssistant from "./pages/AIAssistant";
import Index from "./pages/Index";
import Agents from "./pages/Agents";
import ScenarioWorkbench from "./pages/ScenarioWorkbench";
import Insights from "./pages/Insights";
import Approvals from "./pages/Approvals";
import Skills from "./pages/Skills";
import Planning from "./pages/Planning";
import Analytics from "./pages/Analytics";
import DataConfiguration from "./pages/DataConfiguration";
import NotFound from "./pages/NotFound";
import { ComingSoon } from "@/components/ui/coming-soon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AIAssistant />} />
          <Route path="/console" element={<Index />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/scenarios" element={<ScenarioWorkbench />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/data-config" element={<DataConfiguration />} />
          <Route path="/settings" element={<ComingSoon title="Admin & Settings - Coming Soon" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
