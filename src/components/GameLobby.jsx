import './GameLobby.css'

const GameLobby = ({ onPlayMultiplayer, onPlayPractice, user, onLogout }) => {
  return (
    <div className="lobby">
      <div className="logout-btn" onClick={onLogout}>
        🚪 Logout
      </div>

      <div className="lobby-content">
        <div className="user-greeting">
          <img src={user?.picture} alt={user?.name} className="user-avatar" />
          <p>Welcome, {user?.name}!</p>
        </div>

        <div className="logo">
          <h1>JELLY</h1>
          <h1>BLOCK</h1>
        </div>
        
        <div className="description">
          <p>Multiplayer Puzzle Game</p>
          <p>Battle rivals for 60 seconds</p>
        </div>

        <div className="button-group">
          <button className="play-btn multiplayer-btn" onClick={onPlayMultiplayer}>
            🎮 Multiplayer
          </button>
          <button className="play-btn practice-btn" onClick={onPlayPractice}>
            🤖 Practice Mode
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <span className="icon">⚡</span>
            <span>60 Second Rounds</span>
          </div>
          <div className="feature">
            <span className="icon">👥</span>
            <span>Real-time Rivals</span>
          </div>
          <div className="feature">
            <span className="icon">🎯</span>
            <span>8x8 Board</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameLobby
