import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Agents from "./pages/Agents";
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
          <Route path="/" element={<Index />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/scenarios" element={<ComingSoon title="Scenario Workbench - Coming Soon" />} />
          <Route path="/insights" element={<ComingSoon title="Insights & Recommendations - Coming Soon" />} />
          <Route path="/approvals" element={<ComingSoon title="Approvals & Decisions - Coming Soon" />} />
          <Route path="/settings" element={<ComingSoon title="Admin & Settings - Coming Soon" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
