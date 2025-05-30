import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { value: "vehicules", label: "Véhicules" },
  { value: "tables", label: "Tables artistiques" },
  { value: "articles-fonciers", label: "Articles Fonciers" },
  { value: "meubles", label: "Meubles" },
  { value: "autres", label: "Autres" }
];

const ArticleSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    // Add default values
    formData.append('id_utilisateur', '4');
    formData.append('status_article', 'active');

    try {
      const response = await fetch('http://localhost/api.php?action=submit_article', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log("API response:", result);
      if (result.success) {
        setSuccess(result.success);
        (e.target as HTMLFormElement).reset();
      } else {
        setError(result.error || 'Failed to submit article');
      }
    } catch (err) {
      setError('An error occurred while submitting the article');
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Déposer un article</CardTitle>
        <div className="text-sm text-gray-500 mt-2 space-y-2 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <Info size={16} />
            <span>Commission de la plateforme: 5% du prix de vente final</span>
          </div>
          <div className="flex items-center gap-2">
            <Info size={16} />
            <span>Durée d'affichage: 30 jours</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">{success}</div>}
          
          <div className="space-y-2">
            <Label htmlFor="title">Titre de l'article</Label>
            <Input id="title" name="title" required placeholder="Ex: Porsche 911 Carrera S 2021" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description"
              required
              placeholder="Description détaillée de votre article..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialPrice">Prix initial (dt)</Label>
              <Input 
                id="initialPrice" 
                name="initialPrice"
                type="number" 
                min="0" 
                required 
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desiredPrice">Prix souhaité (dt)</Label>
              <Input 
                id="desiredPrice" 
                name="desiredPrice"
                type="number" 
                min="0" 
                required 
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Chemin de l'image</Label>
            <Input 
              id="image" 
              name="image" 
              placeholder="Ex: /uploads/image.jpg" 
              required 
            />
            <p className="text-sm text-gray-500 mt-1">
              Entrez le chemin complet de l'image (ex: /uploads/image.jpg)
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Déposer l\'article'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleSubmissionForm;