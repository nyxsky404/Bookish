import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WishlistProvider, useWishlist, WishlistItem } from "./WishlistContext";

// Test component to access wishlist context
function TestComponent() {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist } = useWishlist();
  
  const testItem: WishlistItem = {
    bookId: "book-1",
    title: "Test Book",
    author: "Test Author",
    price: 15,
    coverImage: "/test.jpg",
  };
  
  const anotherItem: WishlistItem = {
    bookId: "book-2",
    title: "Another Book",
    author: "Another Author",
    price: 25,
    coverImage: "/another.jpg",
  };
  
  return (
    <div>
      <span data-testid="wishlist-count">{wishlist.length}</span>
      <button onClick={() => addToWishlist(testItem)} data-testid="add-btn">Add Book 1</button>
      <button onClick={() => addToWishlist(anotherItem)} data-testid="add-btn-2">Add Book 2</button>
      <button onClick={() => removeFromWishlist("book-1")} data-testid="remove-btn">Remove Book 1</button>
      <button onClick={() => toggleWishlist(testItem)} data-testid="toggle-btn">Toggle Book 1</button>
      <span data-testid="in-wishlist">{isInWishlist("book-1").toString()}</span>
      <ul>
        {wishlist.map(item => (
          <li key={item.bookId} data-testid={`item-${item.bookId}`}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

const renderWishlist = () => {
  return render(
    <WishlistProvider>
      <TestComponent />
    </WishlistProvider>
  );
};

describe("WishlistContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("starts with empty wishlist", () => {
    renderWishlist();
    expect(screen.getByTestId("wishlist-count")).toHaveTextContent("0");
    expect(screen.getByTestId("in-wishlist")).toHaveTextContent("false");
  });

  it("adds item to wishlist", async () => {
    renderWishlist();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("wishlist-count")).toHaveTextContent("1");
      expect(screen.getByTestId("item-book-1")).toHaveTextContent("Test Book");
      expect(screen.getByTestId("in-wishlist")).toHaveTextContent("true");
    });
  });

  it("prevents duplicate items", async () => {
    renderWishlist();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("wishlist-count")).toHaveTextContent("1");
    });
  });

  it("removes item from wishlist", async () => {
    renderWishlist();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("wishlist-count")).toHaveTextContent("1");
    });
    
    fireEvent.click(screen.getByTestId("remove-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("wishlist-count")).toHaveTextContent("0");
      expect(screen.getByTestId("in-wishlist")).toHaveTextContent("false");
    });
  });

  it("toggles item - adds when not present", async () => {
    renderWishlist();
    
    fireEvent.click(screen.getByTestId("toggle-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("wishlist-count")).toHaveTextContent("1");
      expect(screen.getByTestId("item-book-1")).toBeInTheDocument();
    });
  });

  it("toggles item - removes when present", async () => {
    renderWishlist();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("wishlist-count")).toHaveTextContent("1");
    });
    
    fireEvent.click(screen.getByTestId("toggle-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("wishlist-count")).toHaveTextContent("0");
    });
  });

  it("handles multiple items", async () => {
    renderWishlist();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.click(screen.getByTestId("add-btn-2"));
    
    await waitFor(() => {
      expect(screen.getByTestId("wishlist-count")).toHaveTextContent("2");
      expect(screen.getByTestId("item-book-1")).toBeInTheDocument();
      expect(screen.getByTestId("item-book-2")).toBeInTheDocument();
    });
  });

  it("persists wishlist to localStorage", async () => {
    renderWishlist();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      const stored = localStorage.getItem("bookish_wishlist");
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.length).toBe(1);
      expect(parsed[0].bookId).toBe("book-1");
    });
  });

  it("isInWishlist returns correct boolean", async () => {
    renderWishlist();
    
    expect(screen.getByTestId("in-wishlist")).toHaveTextContent("false");
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("in-wishlist")).toHaveTextContent("true");
    });
    
    fireEvent.click(screen.getByTestId("remove-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("in-wishlist")).toHaveTextContent("false");
    });
  });
});
