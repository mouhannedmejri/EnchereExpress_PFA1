
import AuctionCard, { AuctionItem } from "@/components/AuctionCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_MEUBLES: AuctionItem[] = [
  {
    id: "1",
    title: "Canapé Design Italien",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    currentPrice: 600,
    category: "meubles",
    endTime: "2025-05-05",
    timeLeft: "7j 4h"
  },
  {
    id: "2",
    title: "Armoire Ancienne",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013",
    currentPrice: 450,
    category: "meubles",
    endTime: "2025-05-07",
    timeLeft: "9j 6h"
  }
];

const MeublesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Enchères de Meubles</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {MOCK_MEUBLES.map((item) => (
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

export default MeublesPage;
