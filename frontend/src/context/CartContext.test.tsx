import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CartProvider, useCart, CartItem } from "./CartContext";

// Mock the API and mockBooks
vi.mock("@/lib/api", () => ({
  API_BASE_URL: "http://localhost:3000",
  authHeaders: (token: string) => ({ Authorization: `Bearer ${token}` }),
  parseJson: async (res: Response) => res.json(),
}));

vi.mock("@/lib/mockBooks", () => ({
  mockBooks: [
    { _id: "book-1", title: "Test Book", author: "Test Author", price: 10, coverImage: "/test.jpg" },
    { _id: "book-2", title: "Another Book", author: "Another Author", price: 20, coverImage: "/another.jpg" },
  ],
}));

// Test component to access cart context
function TestComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useCart();
  
  return (
    <div>
      <span data-testid="cart-count">{cart.items.length}</span>
      <span data-testid="cart-total">{cart.total}</span>
      <button onClick={() => addToCart("book-1")} data-testid="add-btn">Add Book 1</button>
      <button onClick={() => addToCart("book-2")} data-testid="add-btn-2">Add Book 2</button>
      <button onClick={() => removeFromCart("book-1")} data-testid="remove-btn">Remove Book 1</button>
      <button onClick={() => updateQuantity("book-1", 3)} data-testid="update-btn">Update Qty</button>
      <button onClick={() => updateQuantity("book-1", 0)} data-testid="remove-by-zero">Set Qty 0</button>
      <button onClick={clearCart} data-testid="clear-btn">Clear Cart</button>
      <ul>
        {cart.items.map(item => (
          <li key={item.bookId} data-testid={`item-${item.bookId}`}>
            {item.title} x {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

const renderCart = () => {
  return render(
    <CartProvider>
      <TestComponent />
    </CartProvider>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("starts with empty cart", () => {
    renderCart();
    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
    expect(screen.getByTestId("cart-total")).toHaveTextContent("0");
  });

  it("adds item to cart", async () => {
    renderCart();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
      expect(screen.getByTestId("cart-total")).toHaveTextContent("10");
      expect(screen.getByTestId("item-book-1")).toHaveTextContent("Test Book x 1");
    });
  });

  it("increments quantity when adding same item", async () => {
    renderCart();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
      expect(screen.getByTestId("item-book-1")).toHaveTextContent("Test Book x 2");
      expect(screen.getByTestId("cart-total")).toHaveTextContent("20");
    });
  });

  it("removes item from cart", async () => {
    renderCart();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    });
    
    fireEvent.click(screen.getByTestId("remove-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
      expect(screen.getByTestId("cart-total")).toHaveTextContent("0");
    });
  });

  it("updates item quantity", async () => {
    renderCart();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("item-book-1")).toHaveTextContent("Test Book x 1");
    });
    
    fireEvent.click(screen.getByTestId("update-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("item-book-1")).toHaveTextContent("Test Book x 3");
      expect(screen.getByTestId("cart-total")).toHaveTextContent("30");
    });
  });

  it("removes item when quantity set to 0", async () => {
    renderCart();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
    });
    
    fireEvent.click(screen.getByTestId("remove-by-zero"));
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
    });
  });

  it("clears entire cart", async () => {
    renderCart();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    fireEvent.click(screen.getByTestId("add-btn-2"));
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
    });
    
    fireEvent.click(screen.getByTestId("clear-btn"));
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
      expect(screen.getByTestId("cart-total")).toHaveTextContent("0");
    });
  });

  it("calculates total correctly with multiple items", async () => {
    renderCart();
    
    fireEvent.click(screen.getByTestId("add-btn")); // $10
    fireEvent.click(screen.getByTestId("add-btn-2")); // $20
    
    await waitFor(() => {
      expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
      expect(screen.getByTestId("cart-total")).toHaveTextContent("30");
    });
  });

  it("persists cart to localStorage", async () => {
    renderCart();
    
    fireEvent.click(screen.getByTestId("add-btn"));
    
    await waitFor(() => {
      const stored = localStorage.getItem("bookish_mock_cart");
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!);
      expect(parsed.items.length).toBe(1);
    });
  });
});
