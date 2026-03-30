import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { user } = useAuth();
  const { cart, loading, fetchCart, removeFromCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const shipping = cart.total > 50 ? 0 : 4.99;
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main className="container py-6 md:py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Your Cart</h1>
          {itemCount > 0 && (
            <span className="text-sm text-muted-foreground">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {!loading && cart.items.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Your cart is empty</h2>
              <p className="text-muted-foreground mt-1">Add some books to get started!</p>
            </div>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Browse Books
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {!loading && cart.items.length > 0 && (
          <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
            {/* Cart Items */}
            <div className="space-y-3 md:space-y-4">
              {cart.items.map((item) => (
                <article
                  key={item.bookId}
                  className="rounded-lg border bg-card p-3 md:p-4 flex gap-3 md:gap-4"
                >
                  <Link to={`/books/${item.bookId}`} className="shrink-0">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-16 h-20 md:w-20 md:h-24 object-cover rounded"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link to={`/books/${item.bookId}`} className="font-semibold text-sm md:text-base line-clamp-1 hover:text-primary">
                        {item.title}
                      </Link>
                      <p className="font-bold text-sm md:text-base shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    {item.author && (
                      <p className="text-xs md:text-sm text-muted-foreground">{item.author}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      ${item.price.toFixed(2)} each
                    </p>

                    {/* Mobile Controls */}
                    <div className="flex items-center justify-between mt-3 md:hidden">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary"
                          onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary"
                          onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        className="text-destructive hover:text-destructive/80 p-2"
                        onClick={() => removeFromCart(item.bookId)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Desktop Controls */}
                    <div className="hidden md:flex items-center gap-4 mt-3">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          className="w-9 h-9 flex items-center justify-center hover:bg-secondary"
                          onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button
                          className="w-9 h-9 flex items-center justify-center hover:bg-secondary"
                          onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                        onClick={() => removeFromCart(item.bookId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <div className="flex justify-between items-center pt-2">
                <button
                  className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear Cart
                </button>
                <Link to="/books" className="text-sm text-primary hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <aside className="rounded-lg border bg-card p-4 md:p-6 space-y-4 sticky top-20">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ${(50 - cart.total).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${(cart.total + shipping).toFixed(2)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full h-11 rounded-lg bg-primary text-primary-foreground text-center leading-11 font-medium hover:opacity-90 transition-opacity"
              >
                Proceed to Checkout
              </Link>

              <p className="text-xs text-muted-foreground text-center">
                Secure checkout powered by Stripe
              </p>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
