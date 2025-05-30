
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuctionCard, { AuctionItem } from "@/components/AuctionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Car, Table, House, Sofa } from "lucide-react";
import ReviewStars from "@/components/ReviewStars";
import ReviewForm from "@/components/ReviewForm";

const Index = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState<AuctionItem[]>([]);
  const [endingSoonAuctions, setEndingSoonAuctions] = useState<AuctionItem[]>([]);
  const [testimonials] = useState([
    {
      id: 1,
      name: "Sophie Martin",
      rating: 5,
      comment: "Une expérience d'enchères exceptionnelle ! J'ai trouvé des pièces uniques à des prix intéressants.",
      date: "2024-04-20"
    },
    {
      id: 2,
      name: "Thomas Dubois",
      rating: 4.5,
      comment: "Plateforme très intuitive et sécurisée. Le processus d'enchères est transparent et efficace.",
      date: "2024-04-19"
    },
    {
      id: 3,
      name: "Marie Laurent",
      rating: 5,
      comment: "Service client réactif et professionnel. Je recommande vivement !",
      date: "2024-04-18"
    }
  ]);

  useEffect(() => {
    const mockAuctions: AuctionItem[] = [
      {
        id: "1",
        title: "Porsche 911 Carrera S 2021",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        currentPrice: 115000,
        category: "vehicules",
        endTime: "2023-12-25T15:00:00",
        timeLeft: "2j 15h"
      },
      {
        id: "2",
        title: "Table en marbre sculpté XVIIIe",
        image: "https://images.unsplash.com/photo-1530603907829-659ab5ec057b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        currentPrice: 8500,
        category: "tables",
        endTime: "2023-12-23T10:30:00",
        timeLeft: "12h 30m"
      },
      {
        id: "3",
        title: "Villa contemporaine vue mer",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=875&q=80",
        currentPrice: 1250000,
        category: "articles-fonciers",
        endTime: "2023-12-30T18:00:00",
        timeLeft: "7j 18h"
      },
      {
        id: "4",
        title: "Canapé en cuir italien design",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        currentPrice: 3200,
        category: "meubles",
        endTime: "2023-12-24T12:15:00",
        timeLeft: "1j 12h"
      },
      {
        id: "5",
        title: "Montre de collection rare",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        currentPrice: 12500,
        category: "autres",
        endTime: "2023-12-22T09:45:00",
        timeLeft: "9h 45m"
      },
      {
        id: "6",
        title: "Mercedes-Benz AMG GT",
        image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        currentPrice: 98000,
        category: "vehicules",
        endTime: "2023-12-26T16:30:00",
        timeLeft: "3j 16h"
      },
      {
        id: "7",
        title: "Table basse Art Déco",
        image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
        currentPrice: 4800,
        category: "tables",
        endTime: "2023-12-23T14:00:00",
        timeLeft: "16h 00m"
      },
      {
        id: "8",
        title: "Appartement haussmannien Paris",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
        currentPrice: 875000,
        category: "articles-fonciers",
        endTime: "2023-12-29T11:30:00",
        timeLeft: "6j 11h"
      }
    ];
    
    setFeaturedAuctions(mockAuctions.slice(0, 4));
    setEndingSoonAuctions(mockAuctions.slice(4, 8));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative bg-encheres-bleu text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Découvrez des trésors uniques aux enchères</h1>
              <p className="text-xl mb-8 text-gray-300 animate-fade-in">
                La plateforme de référence pour les enchères en ligne. 
                Des objets d'exception vous attendent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/inscription">
                  <Button className="w-full sm:w-auto bg-encheres-or hover:bg-encheres-or/90 text-black">
                    Créer un compte
                  </Button>
                </Link>
                <Link to="/encheres">
                  <Button variant="outline" className="w-full sm:w-auto border-white text-black hover:bg-white/10">
                    Explorer les enchères
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-encheres-creme">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Catégories d'enchères</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <Link to="/categories/vehicules" className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-encheres-bleu/10 rounded-full p-4 inline-flex mb-4">
                  <Car size={32} className="text-encheres-bleu" />
                </div>
                <h3 className="text-xl font-semibold">Véhicules</h3>
                <p className="text-gray-600 mt-2">Véhicules de prestige et de collection</p>
              </Link>
              
              <Link to="/categories/tables" className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-encheres-bleu/10 rounded-full p-4 inline-flex mb-4">
                  <Table size={32} className="text-encheres-bleu" />
                </div>
                <h3 className="text-xl font-semibold">Tables artistiques</h3>
                <p className="text-gray-600 mt-2">Pièces uniques et design</p>
              </Link>
              
              <Link to="/categories/articles-fonciers" className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-encheres-bleu/10 rounded-full p-4 inline-flex mb-4">
                  <House size={32} className="text-encheres-bleu" />
                </div>
                <h3 className="text-xl font-semibold">Articles Fonciers</h3>
                <p className="text-gray-600 mt-2">Propriétés d'exception et résidences</p>
              </Link>
              
              <Link to="/categories/meubles" className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-encheres-bleu/10 rounded-full p-4 inline-flex mb-4">
                  <Sofa size={32} className="text-encheres-bleu" />
                </div>
                <h3 className="text-xl font-semibold">Meubles</h3>
                <p className="text-gray-600 mt-2">Mobilier de qualité et antiquités</p>
              </Link>
              
              <Link to="/categories/autres" className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-encheres-bleu/10 rounded-full p-4 inline-flex mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-encheres-bleu">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Autres</h3>
                <p className="text-gray-600 mt-2">Objets d'art, bijoux et curiosités</p>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Enchères à la une</h2>
              <Link to="/encheres" className="text-encheres-bleu hover:text-encheres-bleu/80 inline-flex items-center gap-1">
                Voir toutes <ArrowRight size={16} />
              </Link>
            </div>
            
            <Tabs defaultValue="featured" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="featured">À la une</TabsTrigger>
                <TabsTrigger value="ending-soon">Se terminant bientôt</TabsTrigger>
              </TabsList>
              
              <TabsContent value="featured" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredAuctions.map((auction) => (
                  <AuctionCard key={auction.id} item={auction} />
                ))}
              </TabsContent>
              
              <TabsContent value="ending-soon" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {endingSoonAuctions.map((auction) => (
                  <AuctionCard key={auction.id} item={auction} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold">Avis des clients</h2>
                  <Link to="/avis" className="text-encheres-bleu hover:text-encheres-bleu/80 inline-flex items-center gap-1">
                    Voir tous les avis <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="space-y-6">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{testimonial.name}</h3>
                          <ReviewStars rating={testimonial.rating} />
                        </div>
                        <span className="text-sm text-gray-500">{testimonial.date}</span>
                      </div>
                      <p className="text-gray-700">{testimonial.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                  <ReviewForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-10 text-center">Comment ça marche</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-encheres-or/20 text-encheres-or rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-semibold mb-3">Inscrivez-vous</h3>
                <p className="text-gray-600">Créez votre compte gratuitement en quelques clics et configurez votre profil.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-encheres-or/20 text-encheres-or rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-semibold mb-3">Explorez les enchères</h3>
                <p className="text-gray-600">Parcourez les catégories et trouvez les articles qui vous intéressent.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-encheres-or/20 text-encheres-or rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-semibold mb-3">Misez et gagnez</h3>
                <p className="text-gray-600">Placez vos enchères et suivez leur progression jusqu'à la clôture.</p>
              </div>
            </div>
            
            <div className="text-center mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/comment-ca-marche">
                <Button variant="outline" className="bg-white">
                  En savoir plus
                </Button>
              </Link>
              <Link to="/a-propos">
                <Button variant="outline" className="bg-white">
                  À propos
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
