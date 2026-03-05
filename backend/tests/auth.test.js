import { describe, it, expect, beforeAll, afterAll, beforeEach } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

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
  await User.deleteMany({});
});

describe('User Model', () => {
  it('should create a user with hashed password', async () => {
    const user = new User({ name: 'Alice', email: 'alice@test.com', password: 'secret123' });
    await user.save();
    const found = await User.findOne({ email: 'alice@test.com' }).select('+password');
    expect(found).toBeDefined();
    expect(found.password).not.toBe('secret123'); // must be hashed
  });

  it('should return true for comparePassword with correct password', async () => {
    const user = new User({ name: 'Bob', email: 'bob@test.com', password: 'mypassword' });
    await user.save();
    const found = await User.findOne({ email: 'bob@test.com' }).select('+password');
    const result = await found.comparePassword('mypassword');
    expect(result).toBe(true);
  });

  it('should return false for comparePassword with wrong password', async () => {
    const user = new User({ name: 'Carol', email: 'carol@test.com', password: 'correct' });
    await user.save();
    const found = await User.findOne({ email: 'carol@test.com' }).select('+password');
    const result = await found.comparePassword('wrong');
    expect(result).toBe(false);
  });

  it('should default role to customer', async () => {
    const user = await User.create({ name: 'Dave', email: 'dave@test.com', password: 'pass123' });
    expect(user.role).toBe('customer');
  });

  it('should not save duplicate email', async () => {
    await User.create({ name: 'Eve', email: 'eve@test.com', password: 'pass123' });
    const dup = new User({ name: 'Eve2', email: 'eve@test.com', password: 'pass456' });
    await expect(dup.save()).rejects.toThrow();
  });

  it('should fail without required fields', async () => {
    const user = new User({ name: 'Frank' });
    await expect(user.save()).rejects.toThrow();
  });
});

describe('JWT signing', () => {
  it('should sign and verify a JWT token', () => {
    const secret = 'test_secret';
    const payload = { id: 'user123', role: 'customer' };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const decoded = jwt.verify(token, secret);
    expect(decoded.id).toBe('user123');
    expect(decoded.role).toBe('customer');
  });

  it('should throw for tampered tokens', () => {
    const token = jwt.sign({ id: 'x' }, 'secret1');
    expect(() => jwt.verify(token, 'wrong_secret')).toThrow();
  });
});
