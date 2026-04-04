import { Link } from "react-router-dom";
import { mockBooks } from "@/lib/mockBooks";

const TrendingSection = () => {
  // Get top-rated books for trending
  const trending = [...mockBooks]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Trending Now</h2>
          <Link to="/books" className="text-sm text-primary font-medium hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-5">
          {trending.map((book) => (
            <Link
              key={book._id}
              to={`/books/${book._id}`}
              className="bg-card rounded-lg shadow-sm border border-border overflow-hidden card-hover group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2 md:p-3 space-y-1">
                <h3 className="font-semibold text-xs md:text-sm text-card-foreground line-clamp-1">{book.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                <div className="flex items-center gap-1">
                  <span className="text-amber-400">★</span>
                  <span className="text-xs text-muted-foreground">{book.rating}</span>
                </div>
                <span className="font-bold text-sm md:text-base text-foreground">${book.price.toFixed(2)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;
