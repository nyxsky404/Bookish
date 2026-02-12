import mongoose from 'mongoose';
import Book from '../models/Book.js';
import dotenv from 'dotenv';
dotenv.config();

const SEED_BOOKS = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    isbn: '9780525559474',
    genre: 'Fiction',
    price: 499,
    description:
      'Between life and death there is a library, and within that library, the shelves go on forever.',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg',
    stock: 42,
    rating: 4.5,
    publishedYear: 2020,
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    isbn: '9780735211292',
    genre: 'Self-Help',
    price: 599,
    description: 'An easy and proven way to build good habits and break bad ones.',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    stock: 80,
    rating: 4.8,
    publishedYear: 2018,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '9780061122415',
    genre: 'Fiction',
    price: 350,
    description: 'A magical story about following your dreams.',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
    stock: 65,
    rating: 4.6,
    publishedYear: 1988,
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '9780062316097',
    genre: 'Non-Fiction',
    price: 699,
    description: 'A bold survey of the history of humankind.',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
    stock: 30,
    rating: 4.7,
    publishedYear: 2011,
  },
  {
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    isbn: '9780857197689',
    genre: 'Finance',
    price: 549,
    description: 'Timeless lessons on wealth, greed, and happiness.',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg',
    stock: 55,
    rating: 4.7,
    publishedYear: 2020,
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    isbn: '9781612681122',
    genre: 'Finance',
    price: 399,
    description:
      "What the rich teach their kids about money that the poor and middle class do not!",
    coverImage: 'https://covers.openlibrary.org/b/isbn/9781612681122-L.jpg',
    stock: 90,
    rating: 4.4,
    publishedYear: 1997,
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '9780374533557',
    genre: 'Psychology',
    price: 649,
    description: 'A groundbreaking book on the dual systems that drive the way we think.',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg',
    stock: 28,
    rating: 4.6,
    publishedYear: 2011,
  },
  {
    title: 'Harry Potter and the Philosophers Stone',
    author: 'J.K. Rowling',
    isbn: '9780439708180',
    genre: 'Fantasy',
    price: 449,
    description: "The start of Harry's magical journey at Hogwarts.",
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780439708180-L.jpg',
    stock: 100,
    rating: 4.9,
    publishedYear: 1997,
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    genre: 'Technology',
    price: 799,
    description: 'A handbook of agile software craftsmanship.',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
    stock: 20,
    rating: 4.5,
    publishedYear: 2008,
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    genre: 'Classic',
    price: 299,
    description: 'A story of wealth, love, and the American Dream in the Jazz Age.',
    coverImage: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    stock: 45,
    rating: 4.3,
    publishedYear: 1925,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookish');
    console.log('Connected to MongoDB');

    // Idempotent: only insert books that don't already exist (by ISBN)
    let inserted = 0;
    for (const bookData of SEED_BOOKS) {
      const exists = await Book.findOne({ isbn: bookData.isbn });
      if (!exists) {
        await Book.create(bookData);
        inserted++;
        console.log(`  ✔ Inserted: ${bookData.title}`);
      } else {
        console.log(`  – Skipped (exists): ${bookData.title}`);
      }
    }
    console.log(`\nSeed complete. Inserted ${inserted} new books.`);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
