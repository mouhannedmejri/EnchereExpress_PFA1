
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  isAdmin?: boolean;
}

const DashboardLayout = ({ children, isAdmin = false }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="sticky top-0 left-0 right-0 z-30">
        <Navbar />
      </div>
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
