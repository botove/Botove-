import './ScoreBoard.css'

const ScoreBoard = ({ playerScore, rivalScore, timeRemaining }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="scoreboard">
      <div className="score-section you-section">
        <div className="label">YOU</div>
        <div className="score">{playerScore}</div>
      </div>

      <div className="timer-section">
        <div className="time-display">{formatTime(timeRemaining)}</div>
        <div className="time-label">RIVAL — LIVE</div>
      </div>

      <div className="score-section rival-section">
        <div className="label">RIVAL</div>
        <div className="score">{rivalScore}</div>
      </div>
    </div>
  )
}

export default ScoreBoard
