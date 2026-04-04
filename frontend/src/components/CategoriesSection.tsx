import { Link } from "react-router-dom";
import { BookOpen, Brain, Code, DollarSign, Heart, Sparkles, TrendingUp, User } from "lucide-react";

const categories = [
  { name: "Fiction", icon: BookOpen, bg: "bg-cat-lavender", genre: "Fiction" },
  { name: "Non-Fiction", icon: BookOpen, bg: "bg-cat-peach", genre: "Non-Fiction" },
  { name: "Technology", icon: Code, bg: "bg-cat-blue", genre: "Technology" },
  { name: "Finance", icon: DollarSign, bg: "bg-cat-mint", genre: "Finance" },
  { name: "Psychology", icon: Brain, bg: "bg-cat-pink", genre: "Psychology" },
  { name: "Fantasy", icon: Sparkles, bg: "bg-cat-lavender", genre: "Fantasy" },
  { name: "Classic", icon: Heart, bg: "bg-cat-peach", genre: "Classic" },
  { name: "Self-Help", icon: TrendingUp, bg: "bg-cat-mint", genre: "Self-Help" },
];

const CategoriesSection = () => (
  <section className="py-10 md:py-14">
    <div className="container">
      <h2 className="text-2xl font-bold mb-6 md:mb-8 text-foreground">Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5">
        {categories.map((c) => (
          <Link
            key={c.name}
            to={`/books?genre=${c.genre}`}
            className={`${c.bg} rounded-lg p-4 md:p-6 text-center card-hover cursor-pointer transition-transform hover:scale-105`}
          >
            <c.icon className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-2 md:mb-3 text-foreground/70" />
            <h3 className="font-semibold text-sm md:text-base text-foreground mb-1">{c.name}</h3>
            <span className="text-xs text-primary font-medium">Shop Now →</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
