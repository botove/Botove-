# JellyBlock

A vibrant, multiplayer Tetris-like game where you compete against other players in 60-second rounds on an 8x8 board.

## Features
- **Multiplayer Matchmaking**: Play against rivals in real-time
- **60-Second Rounds**: Fast-paced gameplay
- **8x8 Board**: Strategic placement mechanics
- **Drag-to-Place**: Drag pieces from center to board location
- **Mobile-Optimized**: Touch-friendly controls
- **Live Scoring**: Real-time score updates
- **Colorful UI**: Vibrant jelly-block aesthetic

## Tech Stack
- **Frontend**: React + Vite
- **Real-time Communication**: Socket.io
- **Backend**: Node.js + Express + Socket.io

## Getting Started

### Install Dependencies
```bash
npm install
cd server && npm install && cd ..
```

### Development
```bash
# Start dev server (in one terminal)
npm run dev

# Start backend server (in another terminal)
node server/server.js
```

### Build
```bash
npm run build
```

## Gameplay
- A jelly block appears in the center of the screen
- **Drag** the block to move it around the board
- **Drop** (release) to place it on the board
- Collect matching colors and pieces to score points
- Highest score in 60 seconds wins!

## Project Structure
```
├── src/
│   ├── components/
│   │   ├── GameBoard.jsx      # Main game board (8x8)
│   │   ├── DraggablePiece.jsx  # Draggable center piece
│   │   ├── GameLobby.jsx       # Matchmaking screen
│   │   └── ScoreBoard.jsx      # Score & timer display
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── server/
│   ├── server.js               # WebSocket server
│   └── package.json
└── index.html
```
