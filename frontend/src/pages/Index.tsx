import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import DailyDeals from "@/components/DailyDeals";
import PromoBanners from "@/components/PromoBanners";
import TrendingSection from "@/components/TrendingSection";
import BlogSection from "@/components/BlogSection";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <TopBar />
    <Navbar />
    <SearchBar />
    <HeroSection />
    <CategoriesSection />
    <DailyDeals />
    <PromoBanners />
    <TrendingSection />
    <BlogSection />
    <Newsletter />
    <Footer />
  </div>
);

export default Index;
