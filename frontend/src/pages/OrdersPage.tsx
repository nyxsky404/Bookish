import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL, authHeaders } from "@/lib/api";
import { Package, ShoppingBag, ChevronRight, CheckCircle, Truck, Clock, XCircle } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Order = {
  _id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  createdAt: string;
  shippingAddress: { city: string; state: string };
  items: Array<{ title: string; quantity: number; price: number; coverImage?: string }>;
};

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true" || !import.meta.env.VITE_API_URL;

const statusConfig = {
  pending: { icon: Clock, color: "text-amber-600 bg-amber-50", label: "Pending" },
  processing: { icon: Package, color: "text-blue-600 bg-blue-50", label: "Processing" },
  shipped: { icon: Truck, color: "text-purple-600 bg-purple-50", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-green-600 bg-green-50", label: "Delivered" },
  cancelled: { icon: XCircle, color: "text-red-600 bg-red-50", label: "Cancelled" },
};

// Mock orders for demo
const mockOrders: Order[] = [
  {
    _id: "ORD-12345678",
    status: "delivered",
    totalAmount: 45.97,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: { city: "New York", state: "NY" },
    items: [
      { title: "Atomic Habits", quantity: 1, price: 16.99, coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=140&fit=crop" },
      { title: "Deep Work", quantity: 1, price: 14.99, coverImage: "https://images.unsplash.com/photo-1456513080528-8a23a3e4390a?w=100&h=140&fit=crop" },
      { title: "The Alchemist", quantity: 1, price: 13.99, coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=100&h=140&fit=crop" },
    ],
  },
  {
    _id: "ORD-87654321",
    status: "shipped",
    totalAmount: 34.98,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    shippingAddress: { city: "Los Angeles", state: "CA" },
    items: [
      { title: "Sapiens", quantity: 1, price: 19.99, coverImage: "https://images.unsplash.com/photo-1524995994636-9578e4f5c50a?w=100&h=140&fit=crop" },
      { title: "Thinking, Fast and Slow", quantity: 1, price: 14.99, coverImage: "https://images.unsplash.com/photo-1453847668862-728ff9691f48?w=100&h=140&fit=crop" },
    ],
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const successState = location.state as { success?: boolean; orderId?: string } | null;

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    if (USE_MOCK) {
      // Get orders from localStorage or use mock
      const storedOrders = localStorage.getItem("bookish_orders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders(mockOrders);
        localStorage.setItem("bookish_orders", JSON.stringify(mockOrders));
      }
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/orders/me`, { headers: authHeaders() })
      .then((response) => response.json())
      .then((data: Order[]) => setOrders(Array.isArray(data) ? data : []))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  // Save new order from checkout
  useEffect(() => {
    if (successState?.orderId && USE_MOCK) {
      const newOrder: Order = {
        _id: successState.orderId,
        status: "processing",
        totalAmount: 0,
        createdAt: new Date().toISOString(),
        shippingAddress: { city: "Your City", state: "ST" },
        items: [],
      };
      setOrders(prev => {
        const exists = prev.some(o => o._id === newOrder._id);
        if (exists) return prev;
        const updated = [newOrder, ...prev];
        localStorage.setItem("bookish_orders", JSON.stringify(updated));
        return updated;
      });
    }
  }, [successState]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <Navbar />
        <main className="flex items-center justify-center px-4">
          <div className="text-center space-y-4">
            <p className="text-lg">Please login to view your orders</p>
            <Link to="/login" className="inline-flex h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium">
              Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main className="container py-6 md:py-10 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>

        {/* Success Message */}
        {successState?.success && (
          <div className="rounded-lg bg-green-50 border border-green-200 text-green-700 p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium">Order placed successfully!</p>
              <p className="text-sm">Order ID: {successState.orderId}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-destructive/10 text-destructive p-4">
            {error}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">No orders yet</h2>
              <p className="text-muted-foreground mt-1">Start shopping to place your first order!</p>
            </div>
            <Link
              to="/books"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium"
            >
              Browse Books
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => {
              const config = statusConfig[order.status];
              const StatusIcon = config.icon;

              return (
                <article
                  key={order._id}
                  className="rounded-lg border bg-card overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-secondary/50 border-b">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold">Order #{order._id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.color}`}>
                      <StatusIcon className="h-4 w-4" />
                      {config.label}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-4 space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <img
                          src={item.coverImage || "https://via.placeholder.com/48x64/f0e9da/5c4a1e?text=Book"}
                          alt={item.title}
                          className="w-10 h-14 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-secondary/30 border-t text-sm">
                    <span className="text-muted-foreground">
                      Shipped to: {order.shippingAddress.city}, {order.shippingAddress.state}
                    </span>
                    <span className="font-semibold">Total: ${order.totalAmount.toFixed(2)}</span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
