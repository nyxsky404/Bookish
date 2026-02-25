import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import Book from '../models/Book.js';

const router = express.Router();

// In-memory cart store keyed by userId
// In production this would persist to MongoDB or Redis
const carts = {};

// GET /api/cart
router.get('/', verifyToken, (req, res) => {
  const userId = req.user._id.toString();
  const items = carts[userId] || [];
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ items, total });
});

// POST /api/cart  —  add or increment item
router.post('/', verifyToken, async (req, res) => {
  try {
    const { bookId, quantity = 1 } = req.body;
    if (!bookId) return res.status(400).json({ message: 'bookId is required' });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const userId = req.user._id.toString();
    if (!carts[userId]) carts[userId] = [];

    const idx = carts[userId].findIndex((i) => i.bookId === bookId);
    if (idx >= 0) {
      carts[userId][idx].quantity += Number(quantity);
    } else {
      carts[userId].push({
        bookId,
        title: book.title,
        author: book.author,
        price: book.price,
        coverImage: book.coverImage,
        quantity: Number(quantity),
      });
    }

    const total = carts[userId].reduce((sum, i) => sum + i.price * i.quantity, 0);
    res.json({ items: carts[userId], total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/cart/:bookId  —  update quantity
router.patch('/:bookId', verifyToken, (req, res) => {
  const userId = req.user._id.toString();
  const { quantity } = req.body;
  carts[userId] = carts[userId] || [];

  const idx = carts[userId].findIndex((i) => i.bookId === req.params.bookId);
  if (idx < 0) return res.status(404).json({ message: 'Item not in cart' });

  if (quantity <= 0) {
    carts[userId].splice(idx, 1);
  } else {
    carts[userId][idx].quantity = Number(quantity);
  }

  const total = carts[userId].reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ items: carts[userId], total });
});

// DELETE /api/cart/:bookId  —  remove item
router.delete('/:bookId', verifyToken, (req, res) => {
  const userId = req.user._id.toString();
  carts[userId] = (carts[userId] || []).filter((i) => i.bookId !== req.params.bookId);
  const total = carts[userId].reduce((sum, i) => sum + i.price * i.quantity, 0);
  res.json({ items: carts[userId], total });
});

// DELETE /api/cart  —  clear cart
router.delete('/', verifyToken, (req, res) => {
  const userId = req.user._id.toString();
  carts[userId] = [];
  res.json({ items: [], total: 0 });
});

export default router;
