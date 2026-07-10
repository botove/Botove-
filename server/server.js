import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import leaderboardRoutes from './routes/leaderboard.js'
import userRoutes from './routes/user.js'
import { updateUserStats } from './models/User.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000', process.env.FRONTEND_URL],
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3000

// Routes
app.use('/auth', authRoutes)
app.use('/leaderboard', leaderboardRoutes)
app.use('/user', userRoutes)

// Store game sessions and waiting players
const waitingPlayers = []
const gameSessions = new Map()

// Player class to manage player data
class Player {
  constructor(socketId, userId = null) {
    this.socketId = socketId
    this.userId = userId
    this.score = 0
    this.board = Array(64).fill(null)
  }
}

// Game session class
class GameSession {
  constructor(player1Id, player2Id, user1Id = null, user2Id = null) {
    this.id = `game_${Date.now()}_${Math.random()}`
    this.player1 = new Player(player1Id, user1Id)
    this.player2 = new Player(player2Id, user2Id)
    this.startTime = Date.now()
    this.duration = 60000 // 60 seconds
  }

  getWinner() {
    if (this.player1.score > this.player2.score) return this.player1.socketId
    if (this.player2.score > this.player1.score) return this.player2.socketId
    return 'tie'
  }

  isActive() {
    return Date.now() - this.startTime < this.duration
  }
}

io.on('connection', (socket) => {
  console.log(`⚡ Player connected: ${socket.id}`)

  socket.on('findMatch', (data) => {
    const userId = data?.userId
    console.log(`🔍 ${socket.id} searching for match...`)

    if (waitingPlayers.length > 0) {
      // Match found
      const opponent = waitingPlayers.pop()
      const gameSession = new GameSession(socket.id, opponent.socketId, userId, opponent.userId)
      gameSessions.set(gameSession.id, gameSession)

      console.log(`🎮 Match found! ${socket.id} vs ${opponent.socketId}`)

      // Notify both players
      socket.emit('gameStart', {
        gameId: gameSession.id,
        board: gameSession.player1.board,
        opponentId: opponent.socketId
      })

      opponent.emit('gameStart', {
        gameId: gameSession.id,
        board: gameSession.player2.board,
        opponentId: socket.id
      })

      socket.join(gameSession.id)
      opponent.join(gameSession.id)

      // Start game timer
      const gameTimer = setInterval(() => {
        const game = gameSessions.get(gameSession.id)
        if (!game || !game.isActive()) {
          clearInterval(gameTimer)
          // Game ended
          if (game) {
            const winner = game.getWinner()
            console.log(`🏆 Game ${gameSession.id} ended. Winner: ${winner}`)

            // Update user stats if available
            if (game.player1.userId) {
              updateUserStats(game.player1.userId, winner === game.player1.socketId, game.player1.score)
            }
            if (game.player2.userId) {
              updateUserStats(game.player2.userId, winner === game.player2.socketId, game.player2.score)
            }

            io.to(gameSession.id).emit('gameEnd', {
              winner: winner,
              player1Score: game.player1.score,
              player2Score: game.player2.score
            })
            gameSessions.delete(gameSession.id)
          }
          return
        }

        // Emit time update
        const timeRemaining = Math.ceil((game.duration - (Date.now() - game.startTime)) / 1000)
        io.to(gameSession.id).emit('timeUpdate', { timeRemaining })
      }, 500)
    } else {
      // Add to waiting queue
      waitingPlayers.push({ socketId: socket.id, userId: userId })
      console.log(`⏳ ${socket.id} added to queue. Waiting players: ${waitingPlayers.length}`)
    }
  })

  socket.on('placePiece', (data) => {
    // Find the game session this player is in
    let playerGame = null
    let isPlayer1 = false

    for (const [gameId, game] of gameSessions.entries()) {
      if (game.player1.socketId === socket.id) {
        playerGame = game
        isPlayer1 = true
        break
      } else if (game.player2.socketId === socket.id) {
        playerGame = game
        isPlayer1 = false
        break
      }
    }

    if (playerGame) {
      const player = isPlayer1 ? playerGame.player1 : playerGame.player2
      player.score = data.score
      player.board[data.boardIndex] = true

      // Broadcast score update
      io.to(playerGame.id).emit('scoreUpdate', {
        playerScore: playerGame.player1.score,
        rivalScore: playerGame.player2.score
      })
    }
  })

  socket.on('disconnect', () => {
    console.log(`❌ Player disconnected: ${socket.id}`)

    // Remove from waiting queue
    const index = waitingPlayers.findIndex(p => p.socketId === socket.id)
    if (index !== -1) {
      waitingPlayers.splice(index, 1)
    }

    // Handle active games
    for (const [gameId, game] of gameSessions.entries()) {
      if (game.player1.socketId === socket.id || game.player2.socketId === socket.id) {
        // Award win to remaining player or end game
        io.to(gameId).emit('opponentDisconnected')
        gameSessions.delete(gameId)
      }
    }
  })
})

httpServer.listen(PORT, () => {
  console.log(`🎮 JellyBlock server running on port ${PORT}`)
  console.log(`🔗 Connect via: http://localhost:${PORT}`)
})
