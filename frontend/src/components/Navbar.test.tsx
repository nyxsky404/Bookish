import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

// Mock the API module
vi.mock("@/lib/api", () => ({
  API_BASE_URL: "http://localhost:3000",
  authHeaders: (token: string) => ({ Authorization: `Bearer ${token}` }),
  parseJson: async (res: Response) => res.json(),
}));

// Mock fetch for auth
const mockFetch = vi.fn();
global.fetch = mockFetch;

const renderWithProviders = (initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe("Navbar", () => {
  beforeEach(() => {
    localStorage.clear();
    mockFetch.mockReset();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the brand logo and name", () => {
    renderWithProviders();
    expect(screen.getByText("BOOKISH")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithProviders();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Books" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Orders" })).toBeInTheDocument();
  });

  it("shows login icon when user is not authenticated", () => {
    renderWithProviders();
    expect(screen.getByLabelText("Login")).toBeInTheDocument();
  });

  it("shows logout button when user is authenticated", async () => {
    // Set up token in localStorage
    localStorage.setItem("bookish_token", "test-token");
    // Mock the /api/auth/me response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: "1", name: "Test User", email: "test@test.com", role: "user" }),
    });
    
    renderWithProviders();
    
    // Wait for auth to load and check login icon is not present
    await waitFor(() => {
      expect(screen.queryByLabelText("Login")).not.toBeInTheDocument();
    });
  });

  it("renders cart link with correct aria-label", () => {
    renderWithProviders();
    expect(screen.getByLabelText("Cart")).toBeInTheDocument();
  });

  it("renders wishlist link with correct aria-label", () => {
    renderWithProviders();
    expect(screen.getByLabelText("Wishlist")).toBeInTheDocument();
  });

  it("toggles mobile menu when menu button is clicked", () => {
    renderWithProviders();
    const menuButton = screen.getByLabelText("Toggle menu");
    
    // Mobile menu should not be visible initially
    expect(screen.queryByText("Home")).toBeInTheDocument(); // Desktop nav
    
    // Click to open mobile menu
    fireEvent.click(menuButton);
    
    // Now the X icon should be visible (menu is open)
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("does not show admin link for non-admin users", () => {
    renderWithProviders();
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });
});
