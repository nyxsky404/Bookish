import { Star } from "lucide-react";

interface ProductCardProps {
  title: string;
  author: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
}

const ProductCard = ({ title, author, price, oldPrice, rating, image }: ProductCardProps) => (
  <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden card-hover group">
    <div className="aspect-[3/4] overflow-hidden bg-secondary">
      <img src={image} alt={title} className="w-full h-full object-cover img-zoom" />
    </div>
    <div className="p-3 space-y-1">
      <h3 className="font-semibold text-sm text-card-foreground line-clamp-1">{title}</h3>
      <p className="text-xs text-muted-foreground">{author}</p>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
        ))}
        <span className="text-xs text-muted-foreground ml-1">{rating}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-foreground">${price.toFixed(2)}</span>
        {oldPrice && <span className="text-xs text-muted-foreground line-through">${oldPrice.toFixed(2)}</span>}
      </div>
    </div>
  </div>
);

export default ProductCard;
