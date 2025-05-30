import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

// Align the interface with the API response
interface Article {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  category: string;
  status: string; // Use string to accommodate API values like "active", "won", etc.
  timeLeft?: string; // Optional, for display consistency with AuctionCard
}

interface SubmittedArticlesProps {
  articles: Article[];
  onRefetch: () => void; // Callback to notify parent to refetch data
}

const SubmittedArticles = ({ articles, onRefetch }: SubmittedArticlesProps) => {
  const [localArticles, setLocalArticles] = useState<Article[]>(articles);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost/api.php?action=delete_article&id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      if (result.success) {
        setLocalArticles((prev) => prev.filter((article) => article.id !== id));
        onRefetch(); // Notify parent to refetch data
      } else {
        console.error("Failed to delete article from database:", result);
      }
    } catch (err) {
      console.error("Error deleting article:", err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes articles déposés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {localArticles.length > 0 ? (
            localArticles.map((article) => (
              <div 
                key={article.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/64"; // Fallback image
                    }}
                  />
                  <div>
                    <h3 className="font-semibold">{article.title}</h3>
                    <p className="text-sm text-gray-500">
                      Prix actuel: {article.currentPrice} dt
                    </p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      article.status === "active" ? "bg-green-100 text-green-700" :
                      article.status === "won" ? "bg-blue-100 text-blue-700" :
                      article.status === "expired" ? "bg-gray-100 text-gray-700" :
                      "bg-gray-200 text-gray-800"
                    }`}>
                      {article.status === "active" ? "Actif" :
                       article.status === "won" ? "Vendu" :
                       article.status === "expired" ? "Expiré" :
                       article.status}
                    </span>
                    {article.timeLeft && (
                      <p className="text-sm text-gray-500">
                        Temps restant: {article.timeLeft}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled // Placeholder for future Edit functionality
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p>No submitted articles yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubmittedArticles;