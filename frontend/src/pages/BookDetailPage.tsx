import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useBook } from "@/hooks/useBooks";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ShoppingCart, Star, ChevronLeft, Heart, Check } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BookDetailPage() {
  const { id } = useParams();
  const { book, loading, error } = useBook(id);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [wishlistFeedback, setWishlistFeedback] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  if (loading) {
    return (
      <main className="container py-8 md:py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-secondary rounded w-32" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-[3/4] bg-secondary rounded-lg" />
            <div className="space-y-4">
              <div className="h-4 bg-secondary rounded w-20" />
              <div className="h-8 bg-secondary rounded w-3/4" />
              <div className="h-4 bg-secondary rounded w-1/2" />
              <div className="h-20 bg-secondary rounded" />
              <div className="h-6 bg-secondary rounded w-24" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) return <main className="container py-16 text-center text-destructive">{error}</main>;
  if (!book) return null;

  const handleAdd = async () => {
    setIsAddingToCart(true);
    const result = await addToCart(book._id, quantity);
    setFeedback(result?.error || "Added to cart!");
    setTimeout(() => {
      setFeedback(null);
      setIsAddingToCart(false);
    }, 2000);
  };

  const handleWishlistToggle = () => {
    const result = toggleWishlist({
      bookId: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage,
    });
    setWishlistFeedback(result.message);
    setTimeout(() => setWishlistFeedback(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main className="container py-4 md:py-10 space-y-4 md:space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/books" className="flex items-center gap-1 hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </nav>

        <section className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Book Image */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary shadow-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            {book.stock === 0 && (
              <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-medium">
                Sold Out
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <Link
                to={`/books?genre=${book.genre}`}
                className="text-xs md:text-sm uppercase tracking-wide text-primary font-medium hover:underline"
              >
                {book.genre}
              </Link>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">{book.title}</h1>
              <p className="text-base md:text-lg text-muted-foreground mt-1">by {book.author}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 md:h-5 md:w-5 ${
                      i < Math.floor(book.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {book.rating} ({book.numReviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <p className="text-2xl md:text-3xl font-bold text-primary">${book.price.toFixed(2)}</p>
              {book.publishedYear && (
                <span className="text-sm text-muted-foreground">• {book.publishedYear}</span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm md:prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {book.description || "No description available for this book."}
              </p>
            </div>

            {/* Stock Info */}
            <p className="text-sm">
              <span className="text-muted-foreground">Availability: </span>
              <span className={book.stock > 0 ? "text-green-600 font-medium" : "text-destructive font-medium"}>
                {book.stock > 0 ? `${book.stock} in stock` : "Out of stock"}
              </span>
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className={`w-full h-10 md:h-11 px-6 rounded-lg border font-medium flex items-center justify-center gap-2 transition-all ${
                  isInWishlist(book._id)
                    ? "bg-destructive/10 border-destructive text-destructive"
                    : "border-border hover:border-primary hover:text-primary"
                }`}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(book._id) ? "fill-current" : ""}`} />
                {isInWishlist(book._id) ? "In Wishlist" : "Add to Wishlist"}
              </button>
              {wishlistFeedback && (
                <p className="text-sm text-primary font-medium animate-bounce">{wishlistFeedback}</p>
              )}

              {/* Add to Cart */}
              {book.stock > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 md:h-11 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={book.stock}
                      value={quantity}
                      onChange={(event) => setQuantity(Math.max(1, Math.min(book.stock, Number(event.target.value))))}
                      className="w-12 h-10 md:h-11 text-center border-x focus:outline-none"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                      className="w-10 h-10 md:h-11 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    disabled={isAddingToCart}
                    className={`flex-1 h-10 md:h-11 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                      isAddingToCart
                        ? "bg-green-500 text-white"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    {isAddingToCart ? (
                      <>
                        <Check className="h-4 w-4 animate-scale-in" />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              )}

              {feedback && !isAddingToCart && (
                <p className="text-sm text-green-600 font-medium animate-bounce">{feedback}</p>
              )}
            </div>

            {/* Additional Info */}
            <div className="border-t pt-4 space-y-2 text-sm">
              {book.isbn && (
                <p><span className="text-muted-foreground">ISBN:</span> {book.isbn}</p>
              )}
              <p><span className="text-muted-foreground">Genre:</span> {book.genre}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
