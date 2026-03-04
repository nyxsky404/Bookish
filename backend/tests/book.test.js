import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Book from '../models/Book.js';

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

beforeEach(async () => {
  await Book.deleteMany({});
});

describe('Book Model', () => {
  it('should create a book with required fields', async () => {
    const book = new Book({ title: 'Test Book', author: 'Test Author', price: 299 });
    const saved = await book.save();
    expect(saved._id).toBeDefined();
    expect(saved.title).toBe('Test Book');
    expect(saved.author).toBe('Test Author');
    expect(saved.price).toBe(299);
  });

  it('should fail validation if title is missing', async () => {
    const book = new Book({ author: 'Test Author', price: 199 });
    await expect(book.save()).rejects.toThrow();
  });

  it('should fail validation if author is missing', async () => {
    const book = new Book({ title: 'Test Book', price: 199 });
    await expect(book.save()).rejects.toThrow();
  });

  it('should fail validation if price is missing', async () => {
    const book = new Book({ title: 'Test Book', author: 'Test Author' });
    await expect(book.save()).rejects.toThrow();
  });

  it('should default stock to 0', async () => {
    const book = await Book.create({ title: 'No Stock', author: 'Author', price: 100 });
    expect(book.stock).toBe(0);
  });

  it('should default genre to Other', async () => {
    const book = await Book.create({ title: 'No Genre', author: 'Author', price: 100 });
    expect(book.genre).toBe('Other');
  });

  it('should reject negative price', async () => {
    const book = new Book({ title: 'Negative', author: 'Author', price: -10 });
    await expect(book.save()).rejects.toThrow();
  });

  it('should reject rating > 5', async () => {
    const book = new Book({ title: 'High Rating', author: 'Author', price: 100, rating: 6 });
    await expect(book.save()).rejects.toThrow();
  });
});
