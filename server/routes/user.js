import express from 'express';
import jwt from 'jsonwebtoken';
import { getUser } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/stats', verifyToken, (req, res) => {
  try {
    const user = getUser(req.user.googleId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.getStats());
  } catch (error) {
    console.error('User stats error:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

export default router;
