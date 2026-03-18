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
import RiskAlert from "./pages/RiskAlert";
import DeepDiveDiagnostics from "./pages/DeepDiveDiagnostics";
import ScenarioStudio from "./pages/ScenarioStudio";
import RecommendationSummary from "./pages/RecommendationSummary";
import ExecutionClosure from "./pages/ExecutionClosure";
import InsightsHome from "./pages/InsightsHome";
import DiagnosticsAnalytics from "./pages/DiagnosticsAnalytics";
import PredictiveAnalytics from "./pages/PredictiveAnalytics";
import ReportingStudio from "./pages/ReportingStudio";
import InventoryOptimizer from "./pages/InventoryOptimizer";
import WasteOptimizer from "./pages/WasteOptimizer";
import CapacityRebalancer from "./pages/CapacityRebalancer";
import LearningHub from "./pages/LearningHub";
import RiskOverview from "./pages/RiskOverview";
import RiskAnalysisWorkflow from "./pages/RiskAnalysisWorkflow";
import RiskLanding from "./pages/RiskLanding";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./components/layout/MainLayout";

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
          <Route path="/risk-alert" element={<RiskAlert />} />
          <Route path="/deep-dive-diagnostics" element={<DeepDiveDiagnostics />} />
          <Route path="/scenario-studio" element={<ScenarioStudio />} />
          <Route path="/recommendation-summary" element={<RecommendationSummary />} />
          <Route path="/execution-closure" element={<ExecutionClosure />} />
          <Route path="/insights-home" element={<InsightsHome />} />
          <Route path="/diagnostics-analytics" element={<DiagnosticsAnalytics />} />
          <Route path="/predictive-analytics" element={<PredictiveAnalytics />} />
          <Route path="/reporting-studio" element={<ReportingStudio />} />
          <Route path="/inventory-optimizer" element={<InventoryOptimizer />} />
          <Route path="/waste-optimizer" element={<WasteOptimizer />} />
          <Route path="/capacity-rebalancer" element={<CapacityRebalancer />} />
          <Route path="/learning-hub" element={<LearningHub />} />
          <Route path="/risk-landing" element={<RiskLanding />} />
          <Route path="/risk-monitor" element={<RiskOverview />} />
          <Route path="/risk-analysis" element={<RiskAnalysisWorkflow />} />
          <Route path="/risk-correlation" element={<RiskCorrelationMatrix />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
