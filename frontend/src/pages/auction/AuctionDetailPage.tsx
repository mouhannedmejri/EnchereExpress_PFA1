
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BiddingZone from "@/components/auction/BiddingZone";

const AuctionDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-8">
        <BiddingZone id={id} />
      </main>
      <Footer />
    </div>
  );
};

export default AuctionDetailPage;
