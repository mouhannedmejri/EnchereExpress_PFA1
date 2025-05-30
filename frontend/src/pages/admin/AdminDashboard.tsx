import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { ShoppingBag, Users, TrendingUp } from "lucide-react";

// Composant ClaimsList pour afficher les réclamations
const ClaimsList = ({ reclamations }) => (
  <table className="w-full text-left">
    <thead>
      <tr className="border-b">
        <th className="py-2">ID</th>
        <th className="py-2">Utilisateur</th>
        <th className="py-2">Demande</th>
        <th className="py-2">Problème</th>
        <th className="py-2">Statut</th>
      </tr>
    </thead>
    <tbody>
      {reclamations.length > 0 ? (
        reclamations.map((claim) => (
          <tr key={claim.id_recl} className="border-b">
            <td className="py-2">{claim.id_recl}</td>
            <td className="py-2">{claim.nom_et_prenom}</td>
            <td className="py-2">{claim.demande}</td>
            <td className="py-2">{claim.probleme}</td>
            <td className="py-2">{claim.status_recl}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="py-2 text-center">
            Aucune réclamation trouvée
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

const AdminDashboard = () => {
  // États pour les données dynamiques
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAuctions, setTotalAuctions] = useState(0);
  const [revenus, setRevenus] = useState(0);
  const [tauxConversion, setTauxConversion] = useState(0);
  const [reclamations, setReclamations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les données avec fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/api.php");
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Données reçues de l'API :", data); // Ajout du console.log pour déboguer
        setTotalUsers(data.total_utilisateurs);
        setTotalAuctions(data.total_encheres);
        setRevenus(data.total_revenus);
        setTauxConversion(data.taux_conversion);
        setReclamations(data.reclamations);
        setLoading(false);
      } catch (err) {
        console.error("Erreur dans fetchData :", err); // Log l'erreur pour plus de détails
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Exécuté une fois au montage

  return (
    <DashboardLayout isAdmin>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de bord d'administration</h1>
        <p className="text-gray-500">Gérez votre plateforme d'enchères</p>
      </div>

      {loading && <p className="text-gray-600">Chargement des données...</p>}
      {error && <p className="text-red-600">Erreur : {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Enchères actives</p>
                <h3 className="text-2xl font-bold">{totalAuctions}</h3>
                
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Utilisateurs</p>
                <h3 className="text-2xl font-bold">{totalUsers}</h3>
                
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Revenus</p>
                <h3 className="text-2xl font-bold">{revenus.toLocaleString('fr-FR')} €</h3>
                
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Taux de conversion</p>
                <h3 className="text-2xl font-bold">{tauxConversion.toFixed(1)}%</h3>
                
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Réclamations</CardTitle>
            <CardDescription>Liste des réclamations des utilisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <ClaimsList reclamations={reclamations} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;