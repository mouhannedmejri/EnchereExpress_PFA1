import { Link } from "react-router-dom";
import { Building, CreditCard, UserCheck } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-encheres-bleu text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Enchères<span className="text-encheres-or">Express</span></h2>
            <p className="text-gray-300 mt-2">
              La référence des enchères en ligne pour les objets précieux, œuvres d'art, 
              propriétés, et bien plus encore.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/vehicules" className="text-gray-300 hover:text-encheres-or transition-colors">
                  Véhicules
                </Link>
              </li>
              <li>
                <Link to="/categories/tables" className="text-gray-300 hover:text-encheres-or transition-colors">
                  Tables artistiques
                </Link>
              </li>
              <li>
                <Link to="/categories/articles-fonciers" className="text-gray-300 hover:text-encheres-or transition-colors">
                  Articles Fonciers
                </Link>
              </li>
              <li>
                <Link to="/categories/meubles" className="text-gray-300 hover:text-encheres-or transition-colors">
                  Meubles
                </Link>
              </li>
              <li>
                <Link to="/categories/autres" className="text-gray-300 hover:text-encheres-or transition-colors">
                  Autres
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Méthodes de paiement</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span className="text-gray-300">Virement bancaire</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className="text-gray-300">Virement postal</span>
              </li>
              <li className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span className="text-gray-300">Paiement en personne</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-encheres-or transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-encheres-or transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/comment-ca-marche" className="text-gray-300 hover:text-encheres-or transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-encheres-or transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} EnchèresExpress. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
