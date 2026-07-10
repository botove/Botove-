# JellyBlock - Enhanced Edition

A vibrant, multiplayer Tetris-like game with all 7 Tetris block shapes, smooth placement mechanics, and user tracking via Google Login.

## ✨ Features

### Gameplay
- **All 7 Tetris Blocks**: I, O, T, S, Z, J, L pieces with authentic shapes
- **Smooth Placement**: Easing animations for block placement
- **Placement Indicator**: Visual preview showing where blocks will land
- **Block Rotation**: Click or press R to rotate pieces
- **8x8 Board**: Strategic gameplay on compact board
- **60-Second Rounds**: Fast-paced competitive matches

### User Features
- **Google OAuth Login**: Sign in with your Google account
- **Win/Loss Tracking**: Automatic game result recording
- **User Profile**: View your stats and performance
- **Global Leaderboard**: Compete with other players
- **High Score Tracking**: Track your best scores

### Technical
- **Multiplayer Matchmaking**: Real-time player matching
- **Live Score Updates**: Socket.io powered real-time sync
- **Mobile Optimized**: Touch-friendly controls
- **Responsive UI**: Works on all screen sizes

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Real-time**: Socket.io
- **Authentication**: Google OAuth 2.0
- **Backend**: Node.js + Express
- **Database**: In-memory (ready for PostgreSQL integration)

## 📋 Prerequisites

- Node.js 16+
- Google OAuth credentials (get from [Google Cloud Console](https://console.cloud.google.com/))

## 🚀 Getting Started

### Installation

```bash
# Install frontend dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### Environment Setup

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

Create a `.env` file in the server directory:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
```

### Development

Terminal 1 - Start frontend dev server:
```bash
npm run dev
```

Terminal 2 - Start backend server:
```bash
cd server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

## 🎮 Gameplay

1. **Login**: Sign in with your Google account
2. **Choose Mode**: Select Multiplayer or Practice
3. **Play**: 
   - Drag blocks to position them on the board
   - Click or press R to rotate pieces
   - Watch the placement indicator to see where blocks will land
4. **Win**: Highest score in 60 seconds wins!
5. **Check Leaderboard**: View global rankings and your stats

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── GameBoard.jsx          # Main game board
│   │   ├── TetrisBlock.jsx        # Tetris piece renderer
│   │   ├── DraggablePiece.jsx     # Draggable block logic
│   │   ├── PlacementIndicator.jsx # Visual placement preview
│   │   ├── GameLobby.jsx          # Matchmaking screen
│   │   ├── ScoreBoard.jsx         # Score & timer
│   │   ├── GoogleLoginButton.jsx  # OAuth login
│   │   ├── UserProfile.jsx        # User stats display
│   │   └── Leaderboard.jsx        # Global rankings
│   ├── utils/
│   │   ├── tetrisBlocks.js        # Block definitions
│   │   └── googleAuth.js          # Auth utilities
│   ├── App.jsx
│   └── styles/
├── server/
│   ├── models/
│   │   └── User.js                # User data model
│   ├── routes/
│   │   ├── auth.js                # Authentication endpoints
│   │   ├── leaderboard.js         # Leaderboard API
│   │   └── user.js                # User stats endpoints
│   └── server.js                  # Socket.io server
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/google` - Verify Google token and get JWT

### User
- `GET /user/stats` - Get current user statistics (requires auth)

### Leaderboard
- `GET /leaderboard` - Get top 100 players globally

## 🎨 Customization

### Block Colors
Edit `src/utils/tetrisBlocks.js` to change block colors

### Board Size
Modify `BOARD_SIZE` constant in `src/components/GameBoard.jsx`

### Game Duration
Adjust `duration` in game session classes (frontend & backend)

## 📱 Mobile Support
- Touch drag and drop for piece placement
- Responsive grid layout
- Mobile-optimized UI

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy build/ directory to Vercel
```

### Backend (Heroku/Railway)
```bash
cd server
# Deploy to your hosting platform
```

## 🐛 Troubleshooting

### Google Login not working
- Ensure `VITE_GOOGLE_CLIENT_ID` is set correctly
- Check Google Cloud Console for valid callback URLs
- Allow `http://localhost:5173` for local development

### Leaderboard not updating
- Verify backend is running on correct port
- Check browser console for API errors
- Ensure JWT token is valid

### Pieces not placing
- Verify board coordinates are within 0-7 range
- Check for collision detection issues
- Clear browser cache and reload

## 📈 Future Enhancements

- [ ] PostgreSQL database integration
- [ ] Advanced AI opponent
- [ ] Seasonal leaderboards
- [ ] Achievement system
- [ ] Replay system
- [ ] Custom themes
- [ ] Sound effects
- [ ] Multiplayer lobby chat

## 📄 License

MIT License - feel free to use this project!

## 🙏 Contributing

Contributions welcome! Feel free to submit PRs or open issues.
