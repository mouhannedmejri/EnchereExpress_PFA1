
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-encheres-or/10 p-4 rounded-full">
            <Search className="w-8 h-8 text-encheres-or" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-encheres-bleu">Résultats de recherche</h1>
            <p className="text-gray-600">Pour: "{query}"</p>
          </div>
        </div>

        <div className="text-center text-gray-500 py-12">
          <p>La fonctionnalité de recherche sera bientôt disponible.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
