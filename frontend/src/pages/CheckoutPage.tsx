import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { API_BASE_URL, authHeaders, parseJson } from "@/lib/api";
import { MapPin, CreditCard, ChevronLeft, CheckCircle } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true" || !import.meta.env.VITE_API_URL;

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <main className="flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <p className="text-lg">Please login to checkout</p>
            <Link to="/login" className="inline-flex h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium">
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <main className="flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <p className="text-lg">Your cart is empty</p>
            <Link to="/books" className="inline-flex h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium">
              Browse Books
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shipping = cart.total > 50 ? 0 : 4.99;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Mock checkout
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await clearCart();
      navigate("/orders", { state: { success: true, orderId: "ORD-" + String(Date.now()).slice(-8).toUpperCase() } });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            book: item.bookId,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingAddress: form,
        }),
      });

      const data = await parseJson<{ _id: string }>(response);
      await clearCart();
      navigate("/orders", { state: { success: true, orderId: data._id } });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main className="container py-6 md:py-10">
        {/* Back Link */}
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
          {/* Checkout Form */}
          <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div className="rounded-lg border bg-card p-4 md:p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Shipping Address</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-sm font-medium">Street Address</label>
                    <input
                      required
                      placeholder="123 Main Street"
                      value={form.street}
                      onChange={(e) => setForm((v) => ({ ...v, street: e.target.value }))}
                      className="w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">City</label>
                    <input
                      required
                      placeholder="New York"
                      value={form.city}
                      onChange={(e) => setForm((v) => ({ ...v, city: e.target.value }))}
                      className="w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">State</label>
                    <input
                      required
                      placeholder="NY"
                      value={form.state}
                      onChange={(e) => setForm((v) => ({ ...v, state: e.target.value }))}
                      className="w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">ZIP Code</label>
                    <input
                      required
                      placeholder="10001"
                      value={form.zip}
                      onChange={(e) => setForm((v) => ({ ...v, zip: e.target.value }))}
                      className="w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium">Country</label>
                    <input
                      required
                      placeholder="United States"
                      value={form.country}
                      onChange={(e) => setForm((v) => ({ ...v, country: e.target.value }))}
                      className="w-full h-11 px-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method (Mock) */}
              <div className="rounded-lg border bg-card p-4 md:p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Payment Method</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is a demo. No real payment will be processed.
                </p>
                <div className="flex items-center gap-2 p-3 rounded-lg border bg-secondary">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Demo Payment (No Charge)</span>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-destructive/10 text-destructive text-sm p-4">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <aside className="rounded-lg border bg-card p-4 md:p-6 space-y-4 sticky top-20">
            <h2 className="text-lg font-semibold">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.items.map((item) => (
                <div key={item.bookId} className="flex gap-3">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${(cart.total + shipping).toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
