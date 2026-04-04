import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (bookId: string) => {
    await addToCart(bookId);
    removeFromWishlist(bookId);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main className="container py-6 md:py-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">My Wishlist</h1>
          <span className="text-sm text-muted-foreground">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""}
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground/50" />
            <p className="text-muted-foreground">Your wishlist is empty</p>
            <Link to="/books" className="text-primary hover:underline">
              Browse books to add to your wishlist
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <div key={item.bookId} className="border rounded-lg overflow-hidden bg-card group">
                <Link to={`/books/${item.bookId}`} className="block">
                  <div className="aspect-[3/4] overflow-hidden bg-secondary">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-3 space-y-2">
                  <Link to={`/books/${item.bookId}`}>
                    <h3 className="font-semibold text-sm line-clamp-1 hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-1">{item.author}</p>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item.bookId)}
                      className="flex-1 h-8 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.bookId)}
                      className="h-8 w-8 rounded-md border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
