import express from 'express';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import Order from '../models/Order.js';

const router = express.Router();

// POST /api/orders  —  create a new order
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must have at least one item' });
    }
    if (!shippingAddress?.street) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const order = new Order({ user: req.user._id, items, totalAmount, shippingAddress });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/me  —  current user's order history
router.get('/me', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.book', 'title coverImage')
      .sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders  —  all orders (admin)
router.get('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.book', 'title')
      .sort('-createdAt');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/orders/:id/status  —  update status (admin)
router.patch('/:id/status', verifyToken, requireAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
