import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center space-y-6">
          <BookOpen className="h-20 w-20 mx-auto text-muted-foreground/30" />
          <div className="space-y-2">
            <h1 className="text-7xl font-bold text-primary">404</h1>
            <p className="text-xl font-semibold">Page not found</p>
            <p className="text-muted-foreground max-w-sm mx-auto">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
