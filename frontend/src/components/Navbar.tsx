import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, Heart, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const navigate = useNavigate();
  // Temporaire: simulation d'état de connexion
  const isLoggedIn = window.location.pathname.includes('dashboard');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search")?.toString() || "";
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-encheres-bleu">Enchères<span className="text-encheres-or">Express</span></h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/categories/vehicules" className="text-gray-600 hover:text-encheres-bleu transition-colors">
                Véhicules
              </Link>
              <Link to="/categories/tables" className="text-gray-600 hover:text-encheres-bleu transition-colors">
                Tables artistiques
              </Link>
              <Link to="/categories/articles-fonciers" className="text-gray-600 hover:text-encheres-bleu transition-colors">
                Articles Fonciers
              </Link>
              <Link to="/categories/meubles" className="text-gray-600 hover:text-encheres-bleu transition-colors">
                Meubles
              </Link>
              <Link to="/categories/autres" className="text-gray-600 hover:text-encheres-bleu transition-colors">
                Autres
              </Link>
              <Link to="/a-propos" className="text-gray-600 hover:text-encheres-or transition-colors">
                À propos
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-64">
              <Input 
                name="search"
                placeholder="Rechercher une enchère..." 
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </form>
            <Link to="/favoris">
              <Button variant="outline" size="icon">
                <Heart size={20} />
              </Button>
            </Link>
            <Link to="/tableau-de-bord">
              <Button variant="outline" size="icon">
                <User size={20} />
              </Button>
            </Link>
            {isLoggedIn ? (
              <Link to="/">
                <Button 
                  variant="outline"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </Link>
            ) : (
              <Link to="/connexion">
                <Button className="bg-encheres-bleu hover:bg-encheres-bleu/90">
                  Connexion
                </Button>
              </Link>
            )}
          </div>
          <Button className="md:hidden" variant="outline" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
