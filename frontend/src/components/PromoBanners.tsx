import { Link } from "react-router-dom";
import booksImg from "@/assets/books-stack.jpg";

const PromoBanners = () => (
  <section className="py-14">
    <div className="container grid md:grid-cols-2 gap-6">
      <div className="bg-primary rounded-lg p-8 flex items-center gap-6 overflow-hidden">
        <div className="flex-1 space-y-3">
          <span className="text-primary-foreground/80 text-sm">Discount up to</span>
          <h3 className="text-4xl font-bold text-primary-foreground">20% off</h3>
          <Link to="/books" className="inline-block bg-primary-foreground text-primary px-6 py-2 rounded-pill text-sm font-semibold hover:opacity-90 transition-opacity">
            Shop Now
          </Link>
        </div>
        <img src={booksImg} alt="Books" className="w-32 h-32 object-cover rounded-lg hidden sm:block" />
      </div>
      <div className="bg-secondary rounded-lg p-8 flex items-center gap-6">
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl font-bold text-foreground">Books Make Great Gifts</h3>
          <p className="text-muted-foreground text-sm">Why not send the gift of a book to family & friends?</p>
          <Link to="/books" className="inline-block bg-foreground text-background px-6 py-2 rounded-pill text-sm font-semibold hover:opacity-90 transition-opacity">
            Browse Gifts
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default PromoBanners;
