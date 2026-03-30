import { Book } from "@/hooks/useBooks";

// Using placeholder book cover images
const bookCovers = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=450&fit=crop",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=450&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990cc0?w=300&h=450&fit=crop",
  "https://images.unsplash.com/photo-1516924982507-6d929e51f1b8?w=300&h=450&fit=crop",
  "https://images.unsplash.com/photo-1524995994636-9578e4f5c50a?w=300&h=450&fit=crop",
  "https://images.unsplash.com/photo-1476275462341-21b6e8d4e6d7?w=300&h=450&fit=crop",
  "https://images.unsplash.com/photo-1495640388908-0c6ba5c5a2f8?w=300&h=450&fit=crop",
];

export const mockBooks: Book[] = [
  // Fiction
  { _id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", description: "A story of the mysteriously wealthy Jay Gatsby and his love for Daisy Buchanan.", coverImage: bookCovers[0], price: 12.99, rating: 4.5, stock: 25, numReviews: 234, publishedYear: 1925 },
  { _id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", description: "A classic of modern American literature about racial injustice.", coverImage: bookCovers[1], price: 14.99, rating: 4.8, stock: 30, numReviews: 567, publishedYear: 1960 },
  { _id: "3", title: "1984", author: "George Orwell", genre: "Fiction", description: "A dystopian masterpiece about totalitarian control.", coverImage: bookCovers[2], price: 11.99, rating: 4.6, stock: 55, numReviews: 1567, publishedYear: 1949 },
  { _id: "4", title: "Pride and Prejudice", author: "Jane Austen", genre: "Fiction", description: "A romantic novel about the Bennet family and Mr. Darcy.", coverImage: bookCovers[3], price: 9.99, rating: 4.7, stock: 40, numReviews: 890, publishedYear: 1813 },
  { _id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Fiction", description: "A story of teenage angst and alienation.", coverImage: bookCovers[4], price: 13.99, rating: 4.3, stock: 22, numReviews: 345, publishedYear: 1951 },
  { _id: "6", title: "Brave New World", author: "Aldous Huxley", genre: "Fiction", description: "A dystopian novel about a genetically modified society.", coverImage: bookCovers[5], price: 12.99, rating: 4.4, stock: 35, numReviews: 456, publishedYear: 1932 },

  // Non-Fiction
  { _id: "7", title: "Sapiens", author: "Yuval Noah Harari", genre: "Non-Fiction", description: "A brief history of humankind.", coverImage: bookCovers[6], price: 19.99, rating: 4.5, stock: 28, numReviews: 789, publishedYear: 2015 },
  { _id: "8", title: "Educated", author: "Tara Westover", genre: "Non-Fiction", description: "A memoir about a woman's quest for knowledge.", coverImage: bookCovers[7], price: 16.99, rating: 4.6, stock: 33, numReviews: 567, publishedYear: 2018 },
  { _id: "9", title: "Becoming", author: "Michelle Obama", genre: "Non-Fiction", description: "An intimate memoir from the former First Lady.", coverImage: bookCovers[0], price: 18.99, rating: 4.7, stock: 45, numReviews: 1234, publishedYear: 2018 },
  { _id: "10", title: "The Diary of a Young Girl", author: "Anne Frank", genre: "Non-Fiction", description: "The diary of a Jewish girl hiding during WWII.", coverImage: bookCovers[1], price: 8.99, rating: 4.8, stock: 50, numReviews: 2345, publishedYear: 1947 },
  { _id: "11", title: "Quiet", author: "Susan Cain", genre: "Non-Fiction", description: "The power of introverts in a world that can't stop talking.", coverImage: bookCovers[2], price: 15.99, rating: 4.4, stock: 27, numReviews: 345, publishedYear: 2012 },

  // Technology
  { _id: "12", title: "Clean Code", author: "Robert C. Martin", genre: "Technology", description: "A handbook of agile software craftsmanship.", coverImage: bookCovers[3], price: 39.99, rating: 4.5, stock: 15, numReviews: 432, publishedYear: 2008 },
  { _id: "13", title: "The Pragmatic Programmer", author: "David Thomas", genre: "Technology", description: "Your journey to mastery in software development.", coverImage: bookCovers[4], price: 34.99, rating: 4.7, stock: 20, numReviews: 567, publishedYear: 2019 },
  { _id: "14", title: "Design Patterns", author: "Gang of Four", genre: "Technology", description: "Elements of reusable object-oriented software.", coverImage: bookCovers[5], price: 44.99, rating: 4.4, stock: 12, numReviews: 234, publishedYear: 1994 },
  { _id: "15", title: "Refactoring", author: "Martin Fowler", genre: "Technology", description: "Improving the design of existing code.", coverImage: bookCovers[6], price: 42.99, rating: 4.5, stock: 18, numReviews: 345, publishedYear: 2018 },
  { _id: "16", title: "Code Complete", author: "Steve McConnell", genre: "Technology", description: "A practical handbook of software construction.", coverImage: bookCovers[7], price: 38.99, rating: 4.6, stock: 14, numReviews: 456, publishedYear: 2004 },

  // Finance
  { _id: "17", title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", description: "Timeless lessons on wealth, greed, and happiness.", coverImage: bookCovers[0], price: 18.99, rating: 4.7, stock: 40, numReviews: 890, publishedYear: 2020 },
  { _id: "18", title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", genre: "Finance", description: "What the rich teach their kids about money.", coverImage: bookCovers[1], price: 15.99, rating: 4.5, stock: 55, numReviews: 1567, publishedYear: 1997 },
  { _id: "19", title: "The Intelligent Investor", author: "Benjamin Graham", genre: "Finance", description: "The definitive book on value investing.", coverImage: bookCovers[2], price: 22.99, rating: 4.6, stock: 30, numReviews: 678, publishedYear: 1949 },
  { _id: "20", title: "Think and Grow Rich", author: "Napoleon Hill", genre: "Finance", description: "Principles of success and wealth creation.", coverImage: bookCovers[3], price: 12.99, rating: 4.3, stock: 45, numReviews: 890, publishedYear: 1937 },
  { _id: "21", title: "Your Money or Your Life", author: "Vicki Robin", genre: "Finance", description: "Transforming your relationship with money.", coverImage: bookCovers[4], price: 16.99, rating: 4.4, stock: 25, numReviews: 345, publishedYear: 1992 },

  // Psychology
  { _id: "22", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "Psychology", description: "A groundbreaking tour of the mind.", coverImage: bookCovers[5], price: 17.99, rating: 4.4, stock: 20, numReviews: 345, publishedYear: 2011 },
  { _id: "23", title: "Influence", author: "Robert Cialdini", genre: "Psychology", description: "The psychology of persuasion.", coverImage: bookCovers[6], price: 15.99, rating: 4.5, stock: 35, numReviews: 567, publishedYear: 1984 },
  { _id: "24", title: "Man's Search for Meaning", author: "Viktor Frankl", genre: "Psychology", description: "Finding purpose in suffering.", coverImage: bookCovers[7], price: 11.99, rating: 4.8, stock: 40, numReviews: 1234, publishedYear: 1946 },
  { _id: "25", title: "The Power of Habit", author: "Charles Duhigg", genre: "Psychology", description: "Why we do what we do in life and business.", coverImage: bookCovers[0], price: 14.99, rating: 4.5, stock: 30, numReviews: 678, publishedYear: 2012 },
  { _id: "26", title: "Mindset", author: "Carol Dweck", genre: "Psychology", description: "The new psychology of success.", coverImage: bookCovers[1], price: 13.99, rating: 4.6, stock: 28, numReviews: 456, publishedYear: 2006 },

  // Fantasy
  { _id: "27", title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", description: "Bilbo Baggins' unexpected journey.", coverImage: bookCovers[2], price: 14.99, rating: 4.8, stock: 60, numReviews: 2345, publishedYear: 1937 },
  { _id: "28", title: "Dune", author: "Frank Herbert", genre: "Fantasy", description: "The epic tale of Paul Atreides on Arrakis.", coverImage: bookCovers[3], price: 15.99, rating: 4.7, stock: 35, numReviews: 678, publishedYear: 1965 },
  { _id: "29", title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy", description: "The legend of Kvothe the musician-magician.", coverImage: bookCovers[4], price: 16.99, rating: 4.6, stock: 25, numReviews: 456, publishedYear: 2007 },
  { _id: "30", title: "Mistborn", author: "Brandon Sanderson", genre: "Fantasy", description: "A world where ash falls from the sky.", coverImage: bookCovers[5], price: 14.99, rating: 4.5, stock: 32, numReviews: 567, publishedYear: 2006 },
  { _id: "31", title: "A Game of Thrones", author: "George R.R. Martin", genre: "Fantasy", description: "Winter is coming in the Seven Kingdoms.", coverImage: bookCovers[6], price: 18.99, rating: 4.6, stock: 45, numReviews: 1890, publishedYear: 1996 },

  // Classic
  { _id: "32", title: "Crime and Punishment", author: "Fyodor Dostoevsky", genre: "Classic", description: "A psychological study of guilt and redemption.", coverImage: bookCovers[7], price: 10.99, rating: 4.6, stock: 30, numReviews: 567, publishedYear: 1866 },
  { _id: "33", title: "War and Peace", author: "Leo Tolstoy", genre: "Classic", description: "An epic novel of Russian society during Napoleon.", coverImage: bookCovers[0], price: 14.99, rating: 4.5, stock: 25, numReviews: 345, publishedYear: 1869 },
  { _id: "34", title: "The Odyssey", author: "Homer", genre: "Classic", description: "The epic journey of Odysseus home.", coverImage: bookCovers[1], price: 8.99, rating: 4.4, stock: 40, numReviews: 234, publishedYear: -800 },
  { _id: "35", title: "Jane Eyre", author: "Charlotte Brontë", genre: "Classic", description: "A young woman's journey to independence.", coverImage: bookCovers[2], price: 9.99, rating: 4.7, stock: 35, numReviews: 678, publishedYear: 1847 },
  { _id: "36", title: "Wuthering Heights", author: "Emily Brontë", genre: "Classic", description: "A passionate tale of love and revenge.", coverImage: bookCovers[3], price: 9.99, rating: 4.5, stock: 28, numReviews: 456, publishedYear: 1847 },

  // Self-Help
  { _id: "37", title: "Atomic Habits", author: "James Clear", genre: "Self-Help", description: "Tiny changes for remarkable results.", coverImage: bookCovers[4], price: 16.99, rating: 4.8, stock: 50, numReviews: 1250, publishedYear: 2018 },
  { _id: "38", title: "Deep Work", author: "Cal Newport", genre: "Self-Help", description: "Rules for focused success.", coverImage: bookCovers[5], price: 14.99, rating: 4.6, stock: 30, numReviews: 567, publishedYear: 2016 },
  { _id: "39", title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", genre: "Self-Help", description: "Powerful lessons in personal change.", coverImage: bookCovers[6], price: 17.99, rating: 4.5, stock: 40, numReviews: 890, publishedYear: 1989 },
  { _id: "40", title: "How to Win Friends and Influence People", author: "Dale Carnegie", genre: "Self-Help", description: "Timeless principles for social success.", coverImage: bookCovers[7], price: 12.99, rating: 4.6, stock: 55, numReviews: 1567, publishedYear: 1936 },
  { _id: "41", title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", genre: "Self-Help", description: "A counterintuitive approach to living a good life.", coverImage: bookCovers[0], price: 15.99, rating: 4.3, stock: 38, numReviews: 789, publishedYear: 2016 },
  { _id: "42", title: "Can't Hurt Me", author: "David Goggins", genre: "Self-Help", description: "Master your mind and defy the odds.", coverImage: bookCovers[1], price: 18.99, rating: 4.7, stock: 42, numReviews: 934, publishedYear: 2018 },
];

export function filterMockBooks(genre: string, search: string): Book[] {
  let filtered = mockBooks;
  
  if (genre) {
    filtered = filtered.filter(book => book.genre === genre);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(book => 
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower)
    );
  }
  
  return filtered;
}

export function getMockPagination(total: number, page: number, limit: number) {
  return {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  };
}
