import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Search, Filter, X, Heart, Check } from "lucide-react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GENRES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Technology",
  "Finance",
  "Psychology",
  "Fantasy",
  "Classic",
  "Self-Help",
];

export default function BooksPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(false);
  const genre = searchParams.get("genre") || "";
  const page = Number(searchParams.get("page") || 1);

  const { books, pagination, loading, error } = useBooks({ page, genre, search: searchParams.get("search") || "" });
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [cartFeedback, setCartFeedback] = useState<Record<string, boolean>>({});

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    setSearchParams(params);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setParam("search", search);
  };

  const handleAddToCart = async (bookId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart(bookId);
    setCartFeedback(prev => ({ ...prev, [bookId]: true }));
    setTimeout(() => setCartFeedback(prev => ({ ...prev, [bookId]: false })), 1500);
  };

  const handleWishlistToggle = (book: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      bookId: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      coverImage: book.coverImage,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <main className="container py-6 md:py-10 space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Browse Books</h1>
          <button
            className="md:hidden flex items-center gap-1 text-sm border rounded-md px-3 py-1.5"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title or author..."
                className="w-full h-10 md:h-11 pl-10 pr-4 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button type="submit" className="h-10 md:h-11 rounded-lg bg-primary text-primary-foreground px-4 md:px-6 font-medium hover:opacity-90 transition-opacity">
              Search
            </button>
          </form>

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-wrap gap-2">
            {GENRES.map((item) => {
              const active = item === "All" ? !genre : genre === item;
              return (
                <button
                  key={item}
                  onClick={() => setParam("genre", item === "All" ? "" : item)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="md:hidden fixed inset-0 z-50 bg-background">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-2">
                {GENRES.map((item) => {
                  const active = item === "All" ? !genre : genre === item;
                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setParam("genre", item === "All" ? "" : item);
                        setShowFilters(false);
                      }}
                      className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-foreground"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        {pagination && !loading && (
          <p className="text-sm text-muted-foreground">
            {pagination.total} book{pagination.total !== 1 ? "s" : ""} found
            {genre && ` in ${genre}`}
            {searchParams.get("search") && ` matching "${searchParams.get("search")}"`}
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-destructive bg-destructive/10 text-destructive p-4">
            {error}
          </div>
        )}

        {/* Books Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="aspect-[3/4] rounded-lg bg-secondary animate-pulse" />
                <div className="h-4 bg-secondary rounded animate-pulse" />
                <div className="h-3 bg-secondary rounded animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No books found</p>
            <button
              onClick={() => setSearchParams({})}
              className="text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {books.map((book) => (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                className="group border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow"
              >
                <div className="aspect-[3/4] overflow-hidden bg-secondary">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-2 md:p-3 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-semibold text-xs md:text-sm line-clamp-1 flex-1">{book.title}</p>
                    <button
                      onClick={(e) => handleWishlistToggle(book, e)}
                      className={`shrink-0 p-1 rounded-full transition-colors ${
                        isInWishlist(book._id)
                          ? "text-destructive"
                          : "text-muted-foreground hover:text-destructive"
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${isInWishlist(book._id) ? "fill-current" : ""}`} />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                  <div className="flex items-center justify-between pt-1">
                    <p className="text-sm md:text-base font-bold">${book.price.toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span className="text-amber-400">★</span>
                      {book.rating}
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleAddToCart(book._id, e)}
                    disabled={book.stock === 0}
                    className={`w-full h-8 md:h-9 rounded-md text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-1 ${
                      cartFeedback[book._id]
                        ? "bg-green-500 text-white"
                        : "bg-primary text-primary-foreground disabled:opacity-50 hover:opacity-90"
                    }`}
                  >
                    {cartFeedback[book._id] ? (
                      <>
                        <Check className="h-3.5 w-3.5 animate-scale-in" />
                        Added!
                      </>
                    ) : book.stock === 0 ? (
                      "Sold Out"
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-4">
            <button
              disabled={page === 1}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("page", String(page - 1));
                setSearchParams(params);
              }}
              className="h-9 px-4 rounded-md border text-sm disabled:opacity-40 hover:bg-secondary transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                let pageNum;
                if (pagination.pages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= pagination.pages - 2) {
                  pageNum = pagination.pages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams);
                      params.set("page", String(pageNum));
                      setSearchParams(params);
                    }}
                    className={`w-9 h-9 rounded-md text-sm ${
                      pageNum === page
                        ? "bg-primary text-primary-foreground"
                        : "border hover:bg-secondary"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              disabled={page === pagination.pages}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("page", String(page + 1));
                setSearchParams(params);
              }}
              className="h-9 px-4 rounded-md border text-sm disabled:opacity-40 hover:bg-secondary transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
