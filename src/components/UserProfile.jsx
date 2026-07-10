import { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = ({ user, onLogout }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await axios.get(`${API_URL}/user/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const winRate = stats ? ((stats.wins / (stats.wins + stats.losses)) * 100).toFixed(1) : 0;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user?.picture} alt={user?.name} className="profile-picture" />
        <div className="profile-info">
          <h2>{user?.name}</h2>
          <p className="profile-email">{user?.email}</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      {loading ? (
        <div className="loading">Loading stats...</div>
      ) : (
        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-value">{stats?.wins || 0}</div>
            <div className="stat-label">Wins</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats?.losses || 0}</div>
            <div className="stat-label">Losses</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{winRate}%</div>
            <div className="stat-label">Win Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats?.highScore || 0}</div>
            <div className="stat-label">High Score</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
