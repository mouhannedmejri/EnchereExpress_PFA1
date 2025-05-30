
import AuctionCard, { AuctionItem } from "@/components/AuctionCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_ARTICLES_FONCIERS: AuctionItem[] = [
  {
    id: "1",
    title: "Villa Moderne",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    currentPrice: 450000,
    category: "articles-fonciers",
    endTime: "2025-05-10",
    timeLeft: "12j 5h"
  },
  {
    id: "2",
    title: "Maison de Campagne",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    currentPrice: 320000,
    category: "articles-fonciers",
    endTime: "2025-05-15",
    timeLeft: "17j 9h"
  }
];

const MaisonsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Enchères d'Articles Fonciers</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {MOCK_ARTICLES_FONCIERS.map((item) => (
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

export default MaisonsPage;
