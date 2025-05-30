
import { Star, StarHalf, StarOff } from "lucide-react";

interface ReviewStarsProps {
  rating: number;
}

const ReviewStars = ({ rating }: ReviewStarsProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 fill-encheres-or text-encheres-or" />
      ))}
      {hasHalfStar && (
        <StarHalf className="h-5 w-5 text-encheres-or" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
      ))}
    </div>
  );
};

export default ReviewStars;
