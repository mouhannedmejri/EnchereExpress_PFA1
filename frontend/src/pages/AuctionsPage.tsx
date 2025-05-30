
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import AuctionCard, { AuctionItem } from "@/components/AuctionCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MOCK_AUCTIONS: AuctionItem[] = [
  {
    id: "1",
    title: "Porsche 911 Carrera S 2021",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    currentPrice: 115000,
    category: "vehicules",
    endTime: "2025-05-01",
    timeLeft: "3j 2h"
  },
  {
    id: "2",
    title: "Villa avec piscine",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    currentPrice: 750000,
    category: "articles-fonciers",
    endTime: "2025-05-03",
    timeLeft: "5j 12h"
  },
  // Add more mock items as needed
];

const AuctionsPage = () => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredAuctions = MOCK_AUCTIONS.filter(
    auction => auction.currentPrice >= priceRange[0] && auction.currentPrice <= priceRange[1]
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAuctions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Toutes les enchères</h1>
          
          <div className="flex items-center gap-4 w-64">
            <span className="text-sm text-gray-500">Prix: {priceRange[0]} - {priceRange[1]} dt</span>
            <Slider
              defaultValue={[0, 1000000]}
              max={1000000}
              step={1000}
              value={priceRange}
              onValueChange={setPriceRange}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((item) => (
            <AuctionCard key={item.id} item={item} />
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            {Array.from({ length: Math.ceil(filteredAuctions.length / itemsPerPage) }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink 
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "bg-encheres-bleu text-white" : ""}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuctionsPage;
