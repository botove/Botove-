import { useState } from 'react';
import axios from 'axios';
import './JokeGenerator.css';

const JokeGenerator = ({ onClose }) => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jokeHistory, setJokeHistory] = useState([]);

  const fetchJoke = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Using JokeAPI - https://jokeapi.dev/
      const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');
      
      const newJoke = {
        id: Date.now(),
        content: response.data.joke,
        category: response.data.category,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setJoke(newJoke);
      setJokeHistory([newJoke, ...jokeHistory.slice(0, 9)]);
    } catch (err) {
      console.error('Failed to fetch joke:', err);
      setError('Failed to load joke. Try again!');
    } finally {
      setLoading(false);
    }
  };

  const getJokeByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`https://v2.jokeapi.dev/joke/${category}?type=single`);
      
      const newJoke = {
        id: Date.now(),
        content: response.data.joke,
        category: response.data.category,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setJoke(newJoke);
      setJokeHistory([newJoke, ...jokeHistory.slice(0, 9)]);
    } catch (err) {
      console.error('Failed to fetch joke:', err);
      setError('Failed to load joke for this category!');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (joke) {
      navigator.clipboard.writeText(joke.content);
      alert('Joke copied to clipboard!');
    }
  };

  return (
    <div className="joke-modal">
      <div className="joke-container">
        <div className="joke-header">
          <h2>😂 Random Joke Generator</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="joke-categories">
          <button 
            className="category-btn"
            onClick={() => getJokeByCategory('Programming')}
            disabled={loading}
          >
            💻 Programming
          </button>
          <button 
            className="category-btn"
            onClick={() => getJokeByCategory('Knock-Knock')}
            disabled={loading}
          >
            🚪 Knock-Knock
          </button>
          <button 
            className="category-btn"
            onClick={() => getJokeByCategory('General')}
            disabled={loading}
          >
            😄 General
          </button>
          <button 
            className="category-btn random-btn"
            onClick={fetchJoke}
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '🎲 Random'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {joke && (
          <div className="joke-display">
            <div className="joke-badge">{joke.category}</div>
            <p className="joke-text">{joke.content}</p>
            <div className="joke-actions">
              <button className="action-btn" onClick={copyToClipboard}>
                📋 Copy
              </button>
              <button className="action-btn" onClick={fetchJoke}>
                🔄 Another
              </button>
            </div>
          </div>
        )}

        {!joke && !loading && (
          <div className="joke-placeholder">
            <p>Click a category or random to get started! 🎭</p>
          </div>
        )}

        {jokeHistory.length > 0 && (
          <div className="joke-history">
            <h3>📜 Recent Jokes</h3>
            <div className="history-list">
              {jokeHistory.map((h) => (
                <div key={h.id} className="history-item">
                  <span className="history-time">{h.timestamp}</span>
                  <span className="history-category">{h.category}</span>
                  <p>{h.content.substring(0, 60)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JokeGenerator;
