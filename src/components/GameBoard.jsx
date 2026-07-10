import { useState, useEffect, useRef } from 'react';
import DraggablePiece from './DraggablePiece';
import JokeButton from './JokeButton';
import JokeGenerator from './JokeGenerator';
import './GameBoard.css';

const GameBoard = ({ onPiecePlace, gameData, socket }) => {
  const BOARD_SIZE = 8;
  const [board, setBoard] = useState(Array(64).fill(null));
  const [currentPiece, setCurrentPiece] = useState(null);
  const [showJokes, setShowJokes] = useState(false);
  const boardRef = useRef(null);
  const containerRef = useRef(null);

  const colors = [
    '#FF4444', // red
    '#FF9944', // orange
    '#CCFF00', // green
    '#BB00FF', // purple
    '#00CCFF', // blue
    '#FFDD00', // yellow
    '#FF1493'  // pink
  ];

  useEffect(() => {
    if (!gameData) return;
    setBoard(gameData.board || Array(64).fill(null));
    generateNewPiece();
  }, [gameData]);

  const generateNewPiece = () => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    setCurrentPiece({
      color,
      id: Math.random(),
      x: 0,
      y: 0
    });
  };

  const handlePieceDrop = (boardIndex) => {
    if (boardIndex >= 0 && boardIndex < 64 && board[boardIndex] === null && currentPiece) {
      const newBoard = [...board];
      newBoard[boardIndex] = currentPiece.color;
      setBoard(newBoard);
      onPiecePlace(boardIndex);
      generateNewPiece();
    }
  };

  return (
    <div className="game-board-wrapper" ref={containerRef}>
      <div className="game-board-header">
        <h3>Game Board</h3>
        <JokeButton onClick={() => setShowJokes(true)} />
      </div>

      <div className="game-board" ref={boardRef}>
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell ? 'filled' : ''}`}
            style={{
              backgroundColor: cell || 'transparent',
              ...(cell && {
                boxShadow: `0 0 20px ${cell}80, inset 0 0 10px ${cell}40`
              })
            }}
            onDrop={() => handlePieceDrop(index)}
            onDragOver={(e) => e.preventDefault()}
          />
        ))}
      </div>

      {currentPiece && (
        <DraggablePiece
          piece={currentPiece}
          onDrop={handlePieceDrop}
          boardRef={boardRef}
          containerRef={containerRef}
        />
      )}

      <div className="controls-hint">
        <p>Drag the block to place it • Tap to drop</p>
      </div>

      {showJokes && <JokeGenerator onClose={() => setShowJokes(false)} />}
    </div>
  );
};

export default GameBoard;
