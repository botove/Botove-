import express from 'express';
import { getAllUsers } from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const users = getAllUsers();
    const leaderboard = users.slice(0, 100).map((user, index) => ({
      rank: index + 1,
      id: user.id,
      name: user.name,
      wins: user.wins,
      losses: user.losses,
      highScore: user.highScore,
      winRate: user.wins + user.losses > 0
        ? ((user.wins / (user.wins + user.losses)) * 100).toFixed(1)
        : 0
    }));

    res.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard error:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

export default router;
