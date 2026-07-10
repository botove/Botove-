import './GameLobby.css'

const GameLobby = ({ onPlay }) => {
  return (
    <div className="lobby">
      <div className="lobby-content">
        <div className="logo">
          <h1>JELLY</h1>
          <h1>BLOCK</h1>
        </div>
        
        <div className="description">
          <p>Multiplayer Puzzle Game</p>
          <p>Battle rivals for 60 seconds</p>
        </div>

        <button className="play-btn" onClick={onPlay}>
          Find a Match
        </button>

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
