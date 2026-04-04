import { Mail, Check } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="bg-newsletter py-14">
      <div className="container text-center space-y-4">
        <Mail className="h-10 w-10 mx-auto text-newsletter-foreground/80" />
        <h2 className="text-3xl font-bold text-newsletter-foreground">Get 10% Off Your Order!</h2>
        <p className="text-newsletter-foreground/80 max-w-md mx-auto text-sm">
          Enter your email and receive a 10% discount on your next order!
        </p>
        <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 rounded-l-pill text-sm bg-background text-foreground outline-none"
          />
          <button 
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-r-pill font-semibold text-sm hover:bg-coral-dark transition-colors flex items-center gap-2"
          >
            {submitted ? (
              <>
                <Check className="h-4 w-4" />
                Subscribed!
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
        {submitted && (
          <p className="text-sm text-newsletter-foreground/90 animate-pulse">
            Thank you! Check your inbox for your discount code.
          </p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
