
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import ReviewStars from "./ReviewStars";

const ReviewForm = () => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement review submission
    console.log({ rating, comment });
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-2xl font-semibold mb-4">Laissez votre avis</h3>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Votre note</label>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            min="0"
            max="5"
            step="0.5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-20 rounded-md border px-3 py-2"
          />
          <ReviewStars rating={rating} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Votre commentaire</label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience..."
          className="min-h-[120px]"
        />
      </div>
      <Button type="submit" className="w-full">
        Envoyer
      </Button>
    </form>
  );
};

export default ReviewForm;
