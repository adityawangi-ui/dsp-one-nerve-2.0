import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AgenticConsole from "./pages/AgenticConsole";
import DAPWorkspace from "./pages/DAPWorkspace";
import Reports from "./pages/Reports";
import DataConfiguration from "./pages/DataConfiguration";
import AIResponse from "./pages/AIResponse";
import RiskLanding from "./pages/RiskLanding";
import RiskDetail from "./pages/RiskDetail";
import MitigationScenarios from "./pages/MitigationScenarios";
import ScenarioComparison from "./pages/ScenarioComparison";
import RiskResolution from "./pages/RiskResolution";
import ExecutionTracker from "./pages/ExecutionTracker";
import LearningFeedback from "./pages/LearningFeedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/agentic-console" element={<AgenticConsole />} />
          <Route path="/dap-workspace" element={<DAPWorkspace />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/data-config" element={<DataConfiguration />} />
          <Route path="/ai-response" element={<AIResponse />} />
          <Route path="/risk-landing" element={<RiskLanding />} />
          <Route path="/risk-detail" element={<RiskDetail />} />
          <Route path="/mitigation-scenarios" element={<MitigationScenarios />} />
          <Route path="/scenario-comparison" element={<ScenarioComparison />} />
          <Route path="/risk-resolution" element={<RiskResolution />} />
          <Route path="/execution-tracker" element={<ExecutionTracker />} />
          <Route path="/learning-feedback" element={<LearningFeedback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
