import { useCallback, useEffect, useState } from "react";
import { API_BASE_URL, parseJson } from "@/lib/api";
import { mockBooks, filterMockBooks, getMockPagination } from "@/lib/mockBooks";

export type Book = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  coverImage?: string;
  price: number;
  rating: number;
  stock: number;
  numReviews?: number;
  isbn?: string;
  publishedYear?: number;
};

type BooksResponse = {
  success: boolean;
  data: Book[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

type BookResponse = {
  success: boolean;
  data: Book;
};

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true" || !import.meta.env.VITE_API_URL;

export function useBooks({ page = 1, limit = 12, genre = "", search = "" } = {}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<BooksResponse["pagination"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Use mock data if configured or no API URL
    if (USE_MOCK) {
      const filtered = filterMockBooks(genre, search);
      const start = (page - 1) * limit;
      const paginatedBooks = filtered.slice(start, start + limit);
      setBooks(paginatedBooks);
      setPagination(getMockPagination(filtered.length, page, limit));
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      if (genre) params.append("genre", genre);
      if (search) params.append("search", search);

      const response = await fetch(`${API_BASE_URL}/api/books?${params.toString()}`);
      const data = await parseJson<BooksResponse>(response);
      setBooks(data.data || []);
      setPagination(data.pagination);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [page, limit, genre, search]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { books, pagination, loading, error, refetch: fetchBooks };
}

export function useBook(id?: string) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    // Use mock data if configured or no API URL
    if (USE_MOCK) {
      const found = mockBooks.find(b => b._id === id);
      setBook(found || null);
      setLoading(false);
      return;
    }

    fetch(`${API_BASE_URL}/api/books/${id}`)
      .then((response) => parseJson<BookResponse>(response))
      .then((data) => setBook(data.data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { book, loading, error };
}
