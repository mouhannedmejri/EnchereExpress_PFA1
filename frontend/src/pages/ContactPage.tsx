
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MessageSquare } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-encheres-bleu text-center">Contactez-nous</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-encheres-or/10 rounded-full p-4">
                  <Phone className="w-8 h-8 text-encheres-or" />
                </div>
                <h2 className="text-xl font-semibold">Par téléphone</h2>
                <div className="space-y-2">
                  <p className="text-lg">+216 71 211 900</p>
                  <p className="text-lg">+216 50 100 300</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-encheres-or/10 rounded-full p-4">
                  <Mail className="w-8 h-8 text-encheres-or" />
                </div>
                <h2 className="text-xl font-semibold">Par email</h2>
                <p className="text-lg">service.client@EnchereExpress.com</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-encheres-or/10 rounded-full p-4">
                  <MessageSquare className="w-8 h-8 text-encheres-or" />
                </div>
                <h2 className="text-xl font-semibold">Par WhatsApp</h2>
                <p className="text-lg">+216 50 100 300</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <h2 className="text-xl font-semibold">Heures d'ouverture</h2>
                <p className="text-lg">Du Lundi au Samedi</p>
                <p className="text-lg font-medium">9H - 19H</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
