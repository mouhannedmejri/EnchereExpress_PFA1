
import AuctionCard, { AuctionItem } from "@/components/AuctionCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_VEHICULES: AuctionItem[] = [
  {
    id: "1",
    title: "Mercedes-Benz Classe C",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    currentPrice: 25000,
    category: "vehicules",
    endTime: "2025-05-01",
    timeLeft: "3j 2h"
  },
  {
    id: "2",
    title: "BMW Série 5",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98",
    currentPrice: 35000,
    category: "vehicules",
    endTime: "2025-05-03",
    timeLeft: "5j 12h"
  }
];

const VoituresPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Enchères de Véhicules</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {MOCK_VEHICULES.map((item) => (
              <AuctionCard key={item.id} item={item} />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VoituresPage;
