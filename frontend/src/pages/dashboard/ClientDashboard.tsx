import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/DashboardLayout";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, ArrowUp, ArrowDown, Banknote, Timer, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import AuctionCard from "@/components/AuctionCard";
import { useEffect, useState } from "react";
import ArticleSubmissionForm from "@/components/ArticleSubmissionForm";
import SubmittedArticles from "@/components/SubmittedArticles";

const ClientDashboard = () => {
  const [totalactive, setTotalactive] = useState(0);
  const [totalremporté, setTotalremporté] = useState(0);
  const [total, settotal] = useState(0);
  const [depose, setdepose] = useState([]);
  const [won, setWon] = useState([]);
  const [submitted, setSubmitted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost/api.php");
        const respons = await fetch("http://localhost/api.php?action=get_active_auctions");
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const dict = await respons.json();
        const fetchedWon = Array.isArray(dict.won) ? dict.won : [];
        const fetchedSubmitted = Array.isArray(dict.submitted) ? dict.submitted : [];
        console.log("Données reçues de l'API :", data);
        setdepose(dict.depose || []);
        setWon(fetchedWon);
        setSubmitted(fetchedSubmitted);
        setTotalactive(data.total_active);
        setTotalremporté(data.total_remporté); 
        settotal(data.total);
        setLoading(false);
      } catch (err) {
        console.error("Erreur dans fetchData :", err);
        setError(err.message);
        setLoading(false);
      }
    };
    useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteAuction = async (id) => {
    try {
      const response = await fetch(`http://localhost/api.php?action=delete_auction&id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      if (result.success) {
        await fetchData(); // Refetch all data to sync with database
      } else {
        console.error("Failed to delete auction from database:", result);
      }
    } catch (err) {
      console.error("Error deleting auction:", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-gray-500">Bienvenue Mouhanned, voici un aperçu de vos activités</p>
        </div>
        <Link to="/admin">
          <Button variant="outline" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Admin</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Enchères actives</p>
                <h3 className="text-2xl font-bold">{totalactive}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-encheres-bleu" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Enchères remportées</p>
                <h3 className="text-2xl font-bold">{totalremporté}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <ArrowUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Enchères perdues</p>
                <h3 className="text-2xl font-bold">{total - totalremporté}</h3>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <ArrowDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Dépenses totales</p>
                <h3 className="text-2xl font-bold">12 500 dt</h3>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Banknote className="h-6 w-6 text-encheres-or" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Activité d'enchères</CardTitle>
            <CardDescription>Suivi de vos offres récentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">Porsche 911 Carrera S 2021</h4>
                    <p className="text-sm text-gray-500">Votre enchère: 115 000 dt</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="text-sm font-medium">Leader</span>
                    <Timer size={16} />
                    <span className="text-sm">2j 15h</span>
                  </div>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">Table basse Art Déco</h4>
                    <p className="text-sm text-gray-500">Votre enchère: 4 800 dt</p>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-600">
                    <span className="text-sm font-medium">2ème</span>
                    <Timer size={16} />
                    <span className="text-sm">16h 00m</span>
                  </div>
                </div>
                <Progress value={40} className="h-2" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">Montre de collection rare</h4>
                    <p className="text-sm text-gray-500">Votre enchère: 12 500 dt</p>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <span className="text-sm font-medium">Remporté</span>
                  </div>
                </div>
                <Progress value={100} className="h-2 bg-green-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Résumé du compte</CardTitle>
            <CardDescription>État de votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Solde disponible</span>
                <span className="font-medium">50 000 dt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Enchères en cours</span>
                <span className="font-medium">119 800 dt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Limite d'enchères</span>
                <span className="font-medium">200 000 dt</span>
              </div>
              <div className="pt-4 mt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Utilisation de la limite</span>
                  <span className="font-medium">59.9%</span>
                </div>
                <Progress value={59.9} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <SubmittedArticles articles={submitted} onRefetch={fetchData} />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Déposer un nouvel article</h2>
        <ArticleSubmissionForm />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Mes enchères</h2>

        <Tabs defaultValue="active">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Enchères actives</TabsTrigger>
            <TabsTrigger value="won">Enchères remportées</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : depose.length > 0 ? (
              depose.map((auction) => (
                <div key={auction.id || Math.random()} className="relative group">
                  <AuctionCard item={auction} />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteAuction(auction.id)}
                  >
                    Retirer
                  </Button>
                </div>
              ))
            ) : (
              <p>No active auctions available</p>
            )}
          </TabsContent>
          <TabsContent value="won" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : won.length > 0 ? (
              won.map((auction) => (
                <div key={auction.id || Math.random()} className="relative group">
                  <AuctionCard item={auction} />
                </div>
              ))
            ) : (
              <p>No won auctions yet.</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;