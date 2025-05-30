
import AuctionCard, { AuctionItem } from "@/components/AuctionCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_AUTRES: AuctionItem[] = [
  {
    id: "1",
    title: "Collection de Timbres Rares",
    image: "https://images.unsplash.com/photo-1530968033775-2c92736b131e",
    currentPrice: 250,
    category: "autres",
    endTime: "2025-05-06",
    timeLeft: "8j 7h"
  },
  {
    id: "2",
    title: "Montre Vintage",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    currentPrice: 1500,
    category: "autres",
    endTime: "2025-05-08",
    timeLeft: "10j 3h"
  }
];

const AutresPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Autres Enchères</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {MOCK_AUTRES.map((item) => (
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

export default AutresPage;
