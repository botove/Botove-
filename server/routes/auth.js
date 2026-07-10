import express from 'express';
import jwt from 'jsonwebtoken';
import { getOrCreateUser } from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

router.post('/google', async (req, res) => {
  try {
    const { token } = req.body;

    // In production, verify token with Google's API
    // For now, we'll do a simple decode
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const user = getOrCreateUser(decoded.sub, {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture
    });

    const userToken = jwt.sign(
      { googleId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token: userToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture
      }
    });
  } catch (error) {
    console.error('Auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

export default router;
