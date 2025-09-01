import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Agents from "./pages/Agents";
import NotFound from "./pages/NotFound";

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
          <Route path="/scenarios" element={<div className="p-6 text-center"><h1 className="text-2xl">Scenario Workbench - Coming Soon</h1></div>} />
          <Route path="/insights" element={<div className="p-6 text-center"><h1 className="text-2xl">Insights & Recommendations - Coming Soon</h1></div>} />
          <Route path="/approvals" element={<div className="p-6 text-center"><h1 className="text-2xl">Approvals & Decisions - Coming Soon</h1></div>} />
          <Route path="/settings" element={<div className="p-6 text-center"><h1 className="text-2xl">Admin & Settings - Coming Soon</h1></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
