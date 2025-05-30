import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ClipboardList } from "lucide-react";

const steps = [
  {
    title: "Inscription et vérification",
    description: "Créez votre compte gratuitement en renseignant des informations exactes. Pour participer ou vendre, la vérification de votre identité sera demandée afin de garantir un espace sécurisé pour tous."
  },
  {
    title: "Explorer les enchères",
    description: "Naviguez parmi les catégories proposées (voitures, maisons, art, etc.) ou utilisez la recherche pour trouver le bien qui vous intéresse. Chaque lot présente des photos, une description détaillée et le temps restant."
  },
  {
    title: "Participer à une enchère",
    description: "Placez une offre en indiquant le montant que vous souhaitez proposer. Toute offre est engageante : si votre proposition est la plus haute à la clôture, vous êtes tenu de payer."
  },
  {
    title: "Paiement et sécurité",
    description: "Réalisez le paiement via les moyens sécurisés proposés par la plateforme. Les transactions sont tracées, et les paiements protégés tant pour les acheteurs que les vendeurs."
  },
  {
    title: "Livraison ou retrait du lot",
    description: "En cas de vente terminée, vous serez contacté pour organiser la livraison ou le retrait en toute transparence."
  }
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12 px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="bg-encheres-or/10 rounded-full p-6">
            <ClipboardList size={54} className="text-encheres-or" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-encheres-bleu">Comment ça marche ?</h1>
            <p className="text-lg text-gray-700">
              Notre plateforme facilite les enchères en ligne de façon sécurisée et transparente. Découvrez le déroulement complet, du premier clic à la réception de votre achat.
            </p>
          </div>
        </div>
        <section>
          <ol className="space-y-8 border-l-2 border-encheres-or pl-8">
            {steps.map((step, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-6 top-0 w-8 h-8 bg-encheres-or text-white rounded-full flex items-center justify-center font-bold text-lg shadow">{i+1}</span>
                <h2 className="text-xl font-semibold text-encheres-or mb-2">{step.title}</h2>
                <p className="text-gray-700">{step.description}</p>
              </li>
            ))}
          </ol>
        </section>
        <div className="mt-12 flex justify-center">
          <Link to="/a-propos" className="inline-block bg-encheres-bleu text-white font-semibold px-6 py-2 rounded hover:bg-encheres-bleu/90 transition-colors">
            Voir les règles et le règlement
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
