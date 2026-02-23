import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = {
  "Important Links": [
    { label: "Cart", to: "/cart" },
    { label: "Log In", to: "/login" },
    { label: "Sign Up", to: "/register" },
    { label: "Find My Books", to: "/books" },
  ],
  "Support": [
    { label: "FAQ", to: "/faq" },
    { label: "Help Center", to: "/help" },
    { label: "Contact Us", to: "/contact" },
  ],
  "About": [
    { label: "About Us", to: "/about" },
    { label: "Shipping Policy", to: "/shipping" },
    { label: "Return Policy", to: "/returns" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
  ],
};

const Footer = () => (
  <footer className="bg-foreground text-background/80 pt-14 pb-6">
    <div className="container">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div className="space-y-3">
          <Link to="/" className="flex items-center gap-2 text-background">
            <BookOpen className="h-5 w-5" />
            <span className="font-heading font-bold text-lg">BOOKISH</span>
          </Link>
          <p className="text-sm leading-relaxed">Dhaka Chittagong Highway road, Dhamoapur, Chauddagram, Comilla 3510</p>
        </div>
        {Object.entries(footerLinks).map(([title, items]) => (
          <div key={title}>
            <h4 className="font-heading font-semibold text-background mb-3">{title}</h4>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-sm hover:text-background transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-background/20 pt-6 text-center text-xs">
        © 2026 Bookish. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
