import { Grid3X3, Search, MapPin } from "lucide-react";

const SearchBar = () => (
  <div className="bg-primary">
    <div className="container flex flex-col sm:flex-row items-center gap-3 py-3">
      <button className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground px-4 py-2 rounded-pill text-sm font-medium transition-colors">
        <Grid3X3 className="h-4 w-4" />
        Categories
      </button>
      <div className="flex-1 flex items-center bg-background rounded-pill overflow-hidden w-full">
        <input
          placeholder="Search products..."
          className="flex-1 px-4 py-2 text-sm text-foreground bg-transparent outline-none placeholder:text-muted-foreground"
        />
        <select className="hidden sm:block text-sm text-muted-foreground bg-transparent border-l border-border px-3 py-2 outline-none">
          <option>All Category</option>
        </select>
        <button className="bg-primary text-primary-foreground px-4 py-2 hover:bg-coral-dark transition-colors">
          <Search className="h-4 w-4" />
        </button>
      </div>
      <button className="hidden md:flex items-center gap-1.5 text-primary-foreground text-sm hover:underline">
        <MapPin className="h-4 w-4" />
        Find a Book Store
      </button>
    </div>
  </div>
);

export default SearchBar;
