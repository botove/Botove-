import './PlacementIndicator.css';

const PlacementIndicator = ({ position, shape, boardRef, color, isValid }) => {
  if (!position || !shape || !boardRef.current) {
    return null;
  }

  const boardRect = boardRef.current.getBoundingClientRect();
  const cellSize = boardRect.width / 8;

  const indicators = [];
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const row = position.row + r;
        const col = position.col + c;
        
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
          indicators.push({
            row,
            col,
            x: col * cellSize,
            y: row * cellSize
          });
        }
      }
    }
  }

  return (
    <div className="placement-indicators">
      {indicators.map((indicator, idx) => (
        <div
          key={idx}
          className={`indicator ${isValid ? 'valid' : 'invalid'}`}
          style={{
            left: `${indicator.x + boardRect.left - boardRef.current.parentElement.getBoundingClientRect().left}px`,
            top: `${indicator.y + boardRect.top - boardRef.current.parentElement.getBoundingClientRect().top}px`,
            width: cellSize,
            height: cellSize,
            backgroundColor: isValid ? color : 'transparent',
            borderColor: isValid ? color : '#ff6b6b',
            opacity: 0.4
          }}
        />
      ))}
    </div>
  );
};

export default PlacementIndicator;
