import { useState, useEffect } from 'react';
import { rotateBlock } from '../utils/tetrisBlocks';
import './TetrisBlock.css';

const TetrisBlock = ({ block, onRotate, onDrop, isDragging }) => {
  const [displayShape, setDisplayShape] = useState(block.shape);

  useEffect(() => {
    setDisplayShape(block.shape);
  }, [block.shape]);

  const handleRotateClick = () => {
    if (onRotate) {
      onRotate();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'r' || e.key === 'R') {
      handleRotateClick();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      className={`tetris-block ${isDragging ? 'dragging' : ''}`}
      onClick={handleRotateClick}
      title="Click to rotate (or press R)"
    >
      <div className="block-grid">
        {displayShape.map((row, r) => (
          <div key={r} className="grid-row">
            {row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className={`grid-cell ${cell ? 'active' : 'empty'}`}
                style={{
                  backgroundColor: cell ? block.color : 'transparent',
                  boxShadow: cell ? `0 0 10px ${block.color}, inset 0 0 5px ${block.color}40` : 'none'
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TetrisBlock;
