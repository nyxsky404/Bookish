import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { mockBooks } from "@/lib/mockBooks";

const DailyDeals = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 16, minutes: 23, seconds: 58 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (n: number) => n.toString().padStart(2, "0");

  // Get 5 random books for deals
  const deals = mockBooks.slice(0, 5).map(book => ({
    ...book,
    oldPrice: book.price * 1.3,
  }));

  return (
    <section className="py-10 md:py-14 bg-secondary">
      <div className="container">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">Daily Deals</h2>
          <div className="flex items-center gap-2 bg-primary text-primary-foreground px-3 md:px-4 py-1.5 rounded-pill text-xs md:text-sm font-semibold">
            <Clock className="h-3 w-3 md:h-4 md:w-4" />
            <span>{formatTime(timeLeft.hours)} : {formatTime(timeLeft.minutes)} : {formatTime(timeLeft.seconds)}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-5">
          {deals.map((book) => (
            <Link
              key={book._id}
              to={`/books/${book._id}`}
              className="bg-card rounded-lg shadow-sm border border-border overflow-hidden card-hover group"
            >
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-2 md:p-3 space-y-1">
                <h3 className="font-semibold text-xs md:text-sm text-card-foreground line-clamp-1">{book.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{book.author}</p>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm md:text-base text-foreground">${book.price.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground line-through">${book.oldPrice.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DailyDeals;
