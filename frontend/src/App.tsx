import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientDashboard from "./pages/dashboard/ClientDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import VoituresPage from "./pages/categories/VoituresPage";
import TablesPage from "./pages/categories/TablesPage";
import MaisonsPage from "./pages/categories/MaisonsPage";
import MeublesPage from "./pages/categories/MeublesPage";
import AutresPage from "./pages/categories/AutresPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import AuctionDetailPage from "./pages/auction/AuctionDetailPage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import AuctionsPage from "./pages/AuctionsPage";
import ContactPage from "./pages/ContactPage";
import SearchResultsPage from "./pages/SearchResultsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inscription" element={<RegisterPage />} />
          <Route path="/categories/vehicules" element={<VoituresPage />} />
          <Route path="/categories/tables" element={<TablesPage />} />
          <Route path="/categories/articles-fonciers" element={<MaisonsPage />} />
          <Route path="/categories/meubles" element={<MeublesPage />} />
          <Route path="/categories/autres" element={<AutresPage />} />
          <Route path="/tableau-de-bord" element={<ClientDashboard />} />
          <Route path="/admin" 
            element={
              // Here we would normally check if the user is admin
              // This is just a placeholder for demonstration
              <AdminDashboard />
            } 
          />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/encheres/:id" element={<AuctionDetailPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/comment-ca-marche" element={<HowItWorksPage />} />
          <Route path="/favoris" element={<FavoritesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/recherche" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/encheres" element={<AuctionsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
