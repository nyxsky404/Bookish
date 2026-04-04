import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-kids.jpg";

const HeroSection = () => (
  <section className="bg-hero">
    <div className="container flex flex-col md:flex-row items-center gap-8 py-12 md:py-20">
      <div className="flex-1 space-y-4">
        <span className="text-sm font-medium uppercase tracking-wider text-primary">Our Biggest Sale</span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground">
          Buy 2 Get 3 <span className="text-primary">Free</span>
        </h1>
        <p className="text-muted-foreground max-w-md">
          Limited Time Only. While Supplies Last! Discover thousands of titles across every genre.
        </p>
        <Link to="/books" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-pill font-semibold hover:bg-coral-dark transition-colors text-sm">
          Shop Now
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <img src={heroImg} alt="Kids reading books" className="rounded-lg max-h-[400px] object-cover" />
      </div>
    </div>
  </section>
);

export default HeroSection;
