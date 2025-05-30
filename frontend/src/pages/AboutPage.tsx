import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const rules = [
  {
    title: "Commission de la plateforme",
    description: "EnchèresExpress prélève une commission de 5% sur chaque vente réalisée sur la plateforme. Cette commission est automatiquement déduite du montant final de la vente.",
  },
  {
    title: "Durée des annonces",
    description: "Chaque article mis en vente est affiché pour une durée de 30 jours. Après cette période, l'annonce expire automatiquement si l'article n'a pas été vendu.",
  },
  {
    title: "Respect des offres",
    description: "Chaque offre faite durant une enchère est irrévocable. Toute soumission d'offre engage l'utilisateur à payer si son offre est la plus élevée à la clôture de l'enchère.",
  },
  {
    title: "Vérification des comptes",
    description: "Les utilisateurs doivent fournir des informations exactes (nom, prénom, email, téléphone, adresse, CIN ou passeport). La vérification de l'identité est obligatoire avant toute validation d'achat ou de vente.",
  },
  {
    title: "Sécurité des paiements",
    description: "Tous les paiements doivent être effectués via les moyens sécurisés proposés par la plateforme pour garantir la protection des droits des acheteurs et vendeurs.",
  },
  {
    title: "Respect et courtoisie",
    description: "Tout propos diffamatoire ou irrespectueux envers d'autres utilisateurs entraînera la suspension immédiate du compte.",
  },
  {
    title: "Transparence des transactions",
    description: "Chaque transaction est traçable, et toute tentative de fraude sera sanctionnée par la suppression définitive du compte.",
  },
  {
    title: "Protection des données",
    description: "Vos informations personnelles sont protégées et ne seront jamais partagées avec des tiers sans consentement.",
  },
  {
    title: "Transparence des Enchères",
    description: "Toutes les enchères et leurs offres seront publiques, permettant à tous les utilisateurs de suivre et de vérifier l'évolution des mises.",
  }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6 text-encheres-bleu">À propos de la plateforme</h1>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-encheres-or">Notre fonctionnement</h2>
          <p className="mb-4 text-lg">
            EnchèresExpress est une plateforme d'enchères en ligne dédiée à la sécurité, à la transparence et au respect des droits de chaque utilisateur. Notre objectif est d'offrir un espace de vente et d'achat équitable pour tous, grâce à un règlement strict et une technologie fiable.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-encheres-or">Règles de la plateforme</h2>
          <ul className="space-y-5">
            {rules.map((rule, idx) => (
              <li key={idx} className="bg-gray-50 border-l-4 border-encheres-bleu p-4 rounded shadow flex flex-col">
                <span className="font-semibold text-encheres-bleu mb-1">{rule.title}</span>
                <span className="text-gray-700">{rule.description}</span>
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-10 text-gray-500 text-sm">
          Pour toute question concernant le règlement, veuillez nous contacter via la page "Contact".
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/comment-ca-marche" className="inline-block bg-encheres-or text-encheres-bleu font-semibold px-6 py-2 rounded hover:bg-encheres-or/90 transition-colors">
            Voir comment ça marche
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
