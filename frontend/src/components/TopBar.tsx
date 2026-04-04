import { Phone, Mail, MapPin } from "lucide-react";

const TopBar = () => (
  <div className="bg-primary text-primary-foreground hidden sm:block">
    <div className="container flex items-center justify-between py-2 text-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          <span>support@bookish.com</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs">Free shipping on orders over $50</span>
        <div className="flex items-center gap-3">
          {["facebook", "twitter", "instagram"].map((s) => (
            <a key={s} href="#" className="hover:opacity-80 transition-opacity" aria-label={s}>
              <span className="inline-block w-4 h-4 rounded-full bg-primary-foreground/30" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TopBar;
