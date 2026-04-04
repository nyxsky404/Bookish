import { useState, useCallback } from "react";

const WISHLIST_KEY = "bookish_wishlist";

export type WishlistItem = {
  bookId: string;
  title: string;
  author?: string;
  price: number;
  coverImage?: string;
};

function getWishlist(): WishlistItem[] {
  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(getWishlist);

  const addToWishlist = useCallback((item: WishlistItem) => {
    const current = getWishlist();
    const exists = current.some(i => i.bookId === item.bookId);
    if (!exists) {
      const updated = [...current, item];
      saveWishlist(updated);
      setWishlist(updated);
      return { success: true, message: "Added to wishlist!" };
    }
    return { success: false, message: "Already in wishlist" };
  }, []);

  const removeFromWishlist = useCallback((bookId: string) => {
    const current = getWishlist();
    const updated = current.filter(i => i.bookId !== bookId);
    saveWishlist(updated);
    setWishlist(updated);
  }, []);

  const isInWishlist = useCallback((bookId: string) => {
    return wishlist.some(i => i.bookId === bookId);
  }, [wishlist]);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    if (isInWishlist(item.bookId)) {
      removeFromWishlist(item.bookId);
      return { added: false, message: "Removed from wishlist" };
    } else {
      addToWishlist(item);
      return { added: true, message: "Added to wishlist!" };
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };
}
