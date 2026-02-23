import { useState } from "react";
import { BookOpen, Heart, Menu, ShieldCheck, ShoppingCart, User, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Books", to: "/books" },
  { label: "Orders", to: "/orders" },
];

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-primary" />
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">BOOKISH</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {isAdmin && (
            <li>
              <NavLink to="/admin" className="text-sm font-medium text-foreground hover:text-primary">
                Admin
              </NavLink>
            </li>
          )}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/wishlist" className="relative text-foreground hover:text-primary transition-colors" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/cart" className="relative text-foreground hover:text-primary transition-colors" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {isAdmin && <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />}
          {user ? (
            <button className="text-sm rounded-md border px-3 py-1.5 hover:bg-secondary transition-colors" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="relative text-foreground hover:text-primary transition-colors" aria-label="Login">
              <User className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-4">
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 text-sm font-medium transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    Admin
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="flex items-center gap-4 pt-2 border-t">
              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="relative text-foreground hover:text-primary transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="relative text-foreground hover:text-primary transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {isAdmin && <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />}
              {user ? (
                <button
                  className="text-sm rounded-md border px-3 py-1.5 hover:bg-secondary transition-colors"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative text-foreground hover:text-primary transition-colors"
                  aria-label="Login"
                >
                  <User className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
