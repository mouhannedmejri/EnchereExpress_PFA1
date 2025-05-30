
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface AuctionItem {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  category: "vehicules" | "tables" | "articles-fonciers" | "meubles" | "autres";
  endTime: string;
  timeLeft: string;
}

interface AuctionCardProps {
  item: AuctionItem;
}

const AuctionCard = ({ item }: AuctionCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    // TODO: Implement actual favorite storage logic when Supabase is integrated
  };

  return (
    <Card className="auction-card group h-full flex flex-col">
      <div className="relative overflow-hidden pb-[56.25%]">
        <img 
          src={item.image} 
          alt={item.title}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
          {item.category === "vehicules" ? "Véhicule" : 
           item.category === "tables" ? "Table artistique" : 
           item.category === "articles-fonciers" ? "Article Foncier" : 
           item.category === "meubles" ? "Meuble" : "Autre"}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 left-2 bg-white hover:bg-white/90"
          onClick={toggleFavorite}
        >
          <Heart 
            className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </Button>
      </div>
      
      <CardContent className="py-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
        <div className="flex justify-between items-center mb-2">
          <p className="auction-price">{item.currentPrice.toLocaleString('fr-FR')} dt</p>
          <div className="countdown-timer">
            <Clock size={14} />
            <span>{item.timeLeft}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <Link to={`/encheres/${item.id}`} className="w-full">
          <Button className="w-full bg-encheres-bleu hover:bg-encheres-bleu/90 text-white">
            Enchérir
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default AuctionCard;
