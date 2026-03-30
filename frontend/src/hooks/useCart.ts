import { useCallback, useState } from "react";
import { API_BASE_URL, authHeaders, parseJson } from "@/lib/api";
import { mockBooks } from "@/lib/mockBooks";

export type CartItem = {
  bookId: string;
  title: string;
  author?: string;
  price: number;
  coverImage?: string;
  quantity: number;
};

type CartResponse = {
  items: CartItem[];
  total: number;
  message?: string;
};

type CartState = {
  items: CartItem[];
  total: number;
};

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true" || !import.meta.env.VITE_API_URL;
const MOCK_CART_KEY = "bookish_mock_cart";

function getToken() {
  return localStorage.getItem("bookish_token");
}

function getMockCart(): CartState {
  const stored = localStorage.getItem(MOCK_CART_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return { items: [], total: 0 };
}

function saveMockCart(cart: CartState) {
  localStorage.setItem(MOCK_CART_KEY, JSON.stringify(cart));
}

export function useCart() {
  const [cart, setCart] = useState<CartState>(() => USE_MOCK ? getMockCart() : { items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (USE_MOCK) {
      setCart(getMockCart());
      return;
    }

    const token = getToken();
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        headers: authHeaders(token),
      });
      const data = await parseJson<CartResponse>(response);
      setCart({ items: data.items || [], total: data.total || 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  const addToCart = useCallback(async (bookId: string, quantity = 1) => {
    if (USE_MOCK) {
      const book = mockBooks.find(b => b._id === bookId);
      if (!book) return { error: "Book not found" };

      const currentCart = getMockCart();
      const existingIndex = currentCart.items.findIndex(item => item.bookId === bookId);

      if (existingIndex >= 0) {
        currentCart.items[existingIndex].quantity += quantity;
      } else {
        currentCart.items.push({
          bookId: book._id,
          title: book.title,
          author: book.author,
          price: book.price,
          coverImage: book.coverImage,
          quantity,
        });
      }

      currentCart.total = currentCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      saveMockCart(currentCart);
      setCart({ ...currentCart });
      return { success: true };
    }

    const token = getToken();
    if (!token) return { error: "Login to add to cart" };

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(token),
        },
        body: JSON.stringify({ bookId, quantity }),
      });

      const data = await response.json();
      if (!response.ok) {
        return { error: (data as CartResponse).message || "Could not add item" };
      }

      const result = data as CartResponse;
      setCart({ items: result.items || [], total: result.total || 0 });
      return { success: true };
    } finally {
      setLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (bookId: string) => {
    if (USE_MOCK) {
      const currentCart = getMockCart();
      currentCart.items = currentCart.items.filter(item => item.bookId !== bookId);
      currentCart.total = currentCart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      saveMockCart(currentCart);
      setCart({ ...currentCart });
      return;
    }

    const token = getToken();
    if (!token) return;

    const response = await fetch(`${API_BASE_URL}/api/cart/${bookId}`, {
      method: "DELETE",
      headers: authHeaders(token),
    });

    const data = await parseJson<CartResponse>(response);
    setCart({ items: data.items || [], total: data.total || 0 });
  }, []);

  const updateQuantity = useCallback(async (bookId: string, quantity: number) => {
    if (USE_MOCK) {
      const currentCart = getMockCart();
      const item = currentCart.items.find(i => i.bookId === bookId);
      if (item) {
        if (quantity <= 0) {
          currentCart.items = currentCart.items.filter(i => i.bookId !== bookId);
        } else {
          item.quantity = quantity;
        }
        currentCart.total = currentCart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        saveMockCart(currentCart);
        setCart({ ...currentCart });
      }
      return;
    }

    const token = getToken();
    if (!token) return;

    const response = await fetch(`${API_BASE_URL}/api/cart/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(token),
      },
      body: JSON.stringify({ quantity }),
    });

    const data = await parseJson<CartResponse>(response);
    setCart({ items: data.items || [], total: data.total || 0 });
  }, []);

  const clearCart = useCallback(async () => {
    if (USE_MOCK) {
      saveMockCart({ items: [], total: 0 });
      setCart({ items: [], total: 0 });
      return;
    }

    const token = getToken();
    if (!token) return;

    await fetch(`${API_BASE_URL}/api/cart`, {
      method: "DELETE",
      headers: authHeaders(token),
    });
    setCart({ items: [], total: 0 });
  }, []);

  return { cart, loading, fetchCart, addToCart, removeFromCart, updateQuantity, clearCart };
}
