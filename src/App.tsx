import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Symptoms from "./pages/Symptoms";
import Appointments from "./pages/Appointments";
import MedicineScanner from "./pages/MedicineScanner";
import Auth from "./pages/Auth";
import AIDoctor from "./pages/AIDoctor";
import Telemedicine from "./pages/Telemedicine";
import MentalWellness from "./pages/MentalWellness";
import PreventiveCare from "./pages/PreventiveCare";
import EmergencyResponse from "./pages/EmergencyResponse";
import ElderlyCare from "./pages/ElderlyCare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/medicine-scanner" element={<MedicineScanner />} />
          <Route path="/ai-doctor" element={<AIDoctor />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/mental-wellness" element={<MentalWellness />} />
          <Route path="/preventive-care" element={<PreventiveCare />} />
          <Route path="/emergency" element={<EmergencyResponse />} />
          <Route path="/elderly-care" element={<ElderlyCare />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
