import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import express from 'express';
import bookRoutes from '../../routes/bookRoutes.js';
import Book from '../../models/Book.js';

// Build a minimal express app for testing
const app = express();
app.use(express.json());
app.use('/api/books', bookRoutes);

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

describe('GET /api/books', () => {
  it('should return empty array when no books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });

  it('should return list of books', async () => {
    await Book.create({ title: 'Book One', author: 'Author A', price: 100 });
    await Book.create({ title: 'Book Two', author: 'Author B', price: 200 });
    const res = await request(app).get('/api/books');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(2);
  });

  it('should filter by genre', async () => {
    await Book.create({ title: 'Fiction Book', author: 'Author', price: 100, genre: 'Fiction' });
    await Book.create({ title: 'Tech Book', author: 'Author', price: 200, genre: 'Technology' });
    const res = await request(app).get('/api/books?genre=Fiction');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].genre).toBe('Fiction');
  });

  it('should support pagination', async () => {
    for (let i = 0; i < 15; i++) {
      await Book.create({ title: `Book ${i}`, author: 'Author', price: 100 });
    }
    const res = await request(app).get('/api/books?page=1&limit=10');
    expect(res.status).toBe(200);
    expect(res.body.data.length).toBe(10);
    expect(res.body.pagination.total).toBe(15);
  });
});

describe('GET /api/books/:id', () => {
  it('should return a book by ID', async () => {
    const book = await Book.create({ title: 'Specific Book', author: 'Author', price: 150 });
    const res = await request(app).get(`/api/books/${book._id}`);
    expect(res.status).toBe(200);
    expect(res.body.data.title).toBe('Specific Book');
  });

  it('should return 404 for non-existent book', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/books/${fakeId}`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
