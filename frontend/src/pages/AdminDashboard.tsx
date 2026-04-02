import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Book } from "@/hooks/useBooks";
import { API_BASE_URL, authHeaders } from "@/lib/api";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type AdminOrder = {
  _id: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  totalAmount: number;
  user?: { name?: string };
};

const EMPTY_FORM = {
  title: "",
  author: "",
  genre: "Fiction",
  price: "",
  stock: "",
  description: "",
};

export default function AdminDashboard() {
  const { token } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [booksRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/books?limit=100`, { headers: authHeaders(token) }).then((res) => res.json()),
        fetch(`${API_BASE_URL}/api/orders`, { headers: authHeaders(token) }).then((res) => res.json()),
      ]);

      setBooks((booksRes?.data || []) as Book[]);
      setOrders(Array.isArray(ordersRes) ? (ordersRes as AdminOrder[]) : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const totalRevenue = useMemo(
    () => orders.filter((order) => order.status !== "cancelled").reduce((sum, order) => sum + order.totalAmount, 0),
    [orders]
  );

  const handleBookSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!token) return;

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_BASE_URL}/api/books/${editId}` : `${API_BASE_URL}/api/books`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(token),
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    setEditId(null);
    setForm(EMPTY_FORM);
    fetchData();
  };

  const handleDeleteBook = async (id: string) => {
    if (!token) return;
    await fetch(`${API_BASE_URL}/api/books/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    fetchData();
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    if (!token) return;
    await fetch(`${API_BASE_URL}/api/orders/${orderId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(token),
      },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main className="container py-10 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <section className="grid sm:grid-cols-3 gap-3">
        <article className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Books</p><p className="text-2xl font-bold">{books.length}</p></article>
        <article className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Orders</p><p className="text-2xl font-bold">{orders.length}</p></article>
        <article className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Revenue</p><p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p></article>
      </section>

      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="text-xl font-semibold">{editId ? "Edit Book" : "Add Book"}</h2>
        <form onSubmit={handleBookSubmit} className="grid md:grid-cols-2 gap-3">
          <input className="h-10 rounded-md border px-3" placeholder="Title" value={form.title} onChange={(event) => setForm((v) => ({ ...v, title: event.target.value }))} required />
          <input className="h-10 rounded-md border px-3" placeholder="Author" value={form.author} onChange={(event) => setForm((v) => ({ ...v, author: event.target.value }))} required />
          <input className="h-10 rounded-md border px-3" placeholder="Price" type="number" value={form.price} onChange={(event) => setForm((v) => ({ ...v, price: event.target.value }))} required />
          <input className="h-10 rounded-md border px-3" placeholder="Stock" type="number" value={form.stock} onChange={(event) => setForm((v) => ({ ...v, stock: event.target.value }))} required />
          <select className="h-10 rounded-md border px-3" value={form.genre} onChange={(event) => setForm((v) => ({ ...v, genre: event.target.value }))}>
            {["Fiction", "Non-Fiction", "Technology", "Finance", "Psychology", "Fantasy", "Classic", "Self-Help"].map((genre) => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
          <textarea className="rounded-md border px-3 py-2 md:col-span-2" placeholder="Description" value={form.description} onChange={(event) => setForm((v) => ({ ...v, description: event.target.value }))} />
          <div className="md:col-span-2 flex gap-2">
            <button className="h-10 px-4 rounded-md bg-primary text-primary-foreground">{editId ? "Update" : "Create"}</button>
            {editId && <button type="button" className="h-10 px-4 rounded-md border" onClick={() => { setEditId(null); setForm(EMPTY_FORM); }}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="text-xl font-semibold">Books</h2>
        {loading && <p>Loading...</p>}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Title</th><th>Author</th><th>Genre</th><th>Price</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-b">
                  <td className="py-2">{book.title}</td><td>{book.author}</td><td>{book.genre}</td><td>${book.price}</td><td>{book.stock}</td>
                  <td className="space-x-2">
                    <button className="underline" onClick={() => { setEditId(book._id); setForm({ title: book.title, author: book.author, genre: book.genre, price: String(book.price), stock: String(book.stock), description: book.description || "" }); }}>Edit</button>
                    <button className="underline text-destructive" onClick={() => handleDeleteBook(book._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="text-xl font-semibold">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b"><th className="py-2">Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {orders.slice(0, 20).map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2">#{order._id.slice(-8).toUpperCase()}</td>
                  <td>{order.user?.name || "-"}</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <select className="h-8 rounded-md border px-2" value={order.status} onChange={(event) => handleStatusChange(order._id, event.target.value)}>
                      {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
