import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AccessGate from "./components/AccessGate.tsx";
import AdminPanel from "./pages/AdminPanel.tsx";
import NameCorrection from "./pages/NameCorrection.tsx";
import MatchMaking from "./pages/MatchMaking.tsx";

const queryClient = new QueryClient();

const App = () => {
  const [hasAccess, setHasAccess] = useState(
    () => localStorage.getItem("app_access") === "granted"
  );

  // Admin panel is always accessible (has its own PIN gate inside)
  if (window.location.pathname === "/admin-panel") {
    return <AdminPanel />;
  }

  if (!hasAccess) {
    return <AccessGate onAccessGranted={() => setHasAccess(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/name-correction" element={<NameCorrection />} />
            <Route path="/match-making" element={<MatchMaking />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
