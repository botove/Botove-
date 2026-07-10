import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import GameBoard from './components/GameBoard'
import GameLobby from './components/GameLobby'
import ScoreBoard from './components/ScoreBoard'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [gameState, setGameState] = useState('lobby') // 'lobby', 'playing', 'results'
  const [playerScore, setPlayerScore] = useState(0)
  const [rivalScore, setRivalScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(60)
  const [gameData, setGameData] = useState(null)
  const [gameId, setGameId] = useState(null)

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    })

    newSocket.on('connect', () => {
      console.log('Connected to server')
    })

    newSocket.on('gameStart', (data) => {
      console.log('Game started:', data)
      setGameId(data.gameId)
      setGameState('playing')
      setTimeRemaining(60)
      setPlayerScore(0)
      setRivalScore(0)
      setGameData(data)
    })

    newSocket.on('scoreUpdate', (data) => {
      setPlayerScore(data.playerScore)
      setRivalScore(data.rivalScore)
    })

    newSocket.on('gameEnd', (data) => {
      console.log('Game ended:', data)
      setGameState('results')
    })

    newSocket.on('timeUpdate', (data) => {
      setTimeRemaining(data.timeRemaining)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server')
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const handlePlayGame = () => {
    if (socket) {
      socket.emit('findMatch')
    }
  }

  const handlePiecePlace = (boardIndex) => {
    if (socket && gameId) {
      setPlayerScore(prev => prev + 10) // Award points for placing
      socket.emit('placePiece', {
        gameId,
        boardIndex,
        score: playerScore + 10
      })
    }
  }

  const handlePlayAgain = () => {
    setGameState('lobby')
  }

  return (
    <div className="app">
      {gameState === 'lobby' && (
        <GameLobby onPlay={handlePlayGame} />
      )}
      {gameState === 'playing' && (
        <div className="game-container">
          <ScoreBoard 
            playerScore={playerScore}
            rivalScore={rivalScore}
            timeRemaining={timeRemaining}
          />
          <GameBoard 
            onPiecePlace={handlePiecePlace}
            gameData={gameData}
            socket={socket}
          />
        </div>
      )}
      {gameState === 'results' && (
        <div className="results-screen">
          <h1>Game Over!</h1>
          <div className="results-scores">
            <div className="result-item">
              <span>Your Score</span>
              <span className="score">{playerScore}</span>
            </div>
            <div className="result-item">
              <span>Rival Score</span>
              <span className="score">{rivalScore}</span>
            </div>
          </div>
          <div className="winner-text">
            {playerScore > rivalScore ? '🎉 You Won! 🎉' : playerScore < rivalScore ? '😢 You Lost' : "It's a Tie!"}
          </div>
          <button onClick={handlePlayAgain} className="play-again-btn">
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default App
