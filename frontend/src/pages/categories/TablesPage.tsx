
import AuctionCard, { AuctionItem } from "@/components/AuctionCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_TABLES: AuctionItem[] = [
  {
    id: "1",
    title: "Table Art Déco",
    image: "https://images.unsplash.com/photo-1577140917160-b3276d7c6920",
    currentPrice: 1200,
    category: "tables",
    endTime: "2025-05-02",
    timeLeft: "4j 8h"
  },
  {
    id: "2",
    title: "Table Design Modern",
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc",
    currentPrice: 800,
    category: "tables",
    endTime: "2025-05-04",
    timeLeft: "6j 3h"
  }
];

const TablesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Tables Artistiques</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {MOCK_TABLES.map((item) => (
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

export default TablesPage;
