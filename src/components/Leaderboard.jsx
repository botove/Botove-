import { useEffect, useState } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = ({ onClose }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await axios.get(`${API_URL}/leaderboard`);
      setLeaderboard(response.data.leaderboard || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
      setError('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const winRate = (player) => {
    const total = player.wins + player.losses;
    return total > 0 ? ((player.wins / total) * 100).toFixed(1) : 0;
  };

  return (
    <div className="leaderboard-modal">
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2>🏆 Global Leaderboard</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {loading && <div className="loading">Loading leaderboard...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <div className="leaderboard-content">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Wins</th>
                  <th>Losses</th>
                  <th>Win Rate</th>
                  <th>High Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((player, index) => (
                  <tr key={player.id} className={index < 3 ? `top-${index + 1}` : ''}>
                    <td className="rank">
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </td>
                    <td className="player-name">{player.name}</td>
                    <td className="wins">{player.wins}</td>
                    <td className="losses">{player.losses}</td>
                    <td className="win-rate">{winRate(player)}%</td>
                    <td className="high-score">{player.highScore || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {leaderboard.length === 0 && (
              <div className="empty-leaderboard">
                <p>No players yet. Start playing to appear on the leaderboard!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
