
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuctionCard, { AuctionItem } from "@/components/AuctionCard";
import { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<AuctionItem[]>([]);
  
  useEffect(() => {
    // Mock data for now - will be replaced with actual data from Supabase
    const mockFavorites: AuctionItem[] = [
      {
        id: "1",
        title: "Porsche 911 Carrera S 2021",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        currentPrice: 115000,
        category: "vehicules",
        endTime: "2025-05-01",
        timeLeft: "3j 2h"
      }
    ];
    
    setFavorites(mockFavorites);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mes Favoris</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            Aucun favori pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default FavoritesPage;
