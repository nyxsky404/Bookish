import { createContext, useContext, useCallback, useState, useEffect, ReactNode } from "react";

const WISHLIST_KEY = "bookish_wishlist";

export type WishlistItem = {
  bookId: string;
  title: string;
  author?: string;
  price: number;
  coverImage?: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => { success: boolean; message: string };
  removeFromWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  toggleWishlist: (item: WishlistItem) => { added: boolean; message: string };
};

const WishlistContext = createContext<WishlistContextType | null>(null);

function getWishlist(): WishlistItem[] {
  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  // Dispatch custom event for cross-component sync
  window.dispatchEvent(new CustomEvent("wishlist-updated"));
}

export function WishlistProvider({ children }: { children: ReactNode }) {
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

  // Listen for wishlist updates from other tabs/components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === WISHLIST_KEY) {
        setWishlist(getWishlist());
      }
    };

    const handleWishlistUpdate = () => {
      setWishlist(getWishlist());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("wishlist-updated", handleWishlistUpdate);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
