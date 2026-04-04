import { Link } from "react-router-dom";

const posts = [
  { id: 1, title: "5 Must-Read Books This Spring", date: "March 15, 2026", image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=250&fit=crop", slug: "must-read-books-spring" },
  { id: 2, title: "How Reading Changes Your Brain", date: "March 10, 2026", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop", slug: "reading-changes-brain" },
  { id: 3, title: "Best Children's Books of 2026", date: "March 5, 2026", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=250&fit=crop", slug: "best-childrens-books-2026" },
  { id: 4, title: "Building a Home Library", date: "Feb 28, 2026", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop", slug: "building-home-library" },
];

const BlogSection = () => (
  <section className="py-14 bg-secondary">
    <div className="container">
      <h2 className="text-2xl font-bold mb-8 text-foreground">Latest Blog Posts</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {posts.map((p) => (
          <article key={p.id} className="bg-card rounded-lg overflow-hidden shadow-sm border border-border card-hover group">
            <div className="aspect-video overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 space-y-2">
              <span className="text-xs text-muted-foreground">{p.date}</span>
              <h3 className="font-semibold text-sm text-card-foreground line-clamp-2">{p.title}</h3>
              <Link to={`/blog/${p.slug}`} className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
