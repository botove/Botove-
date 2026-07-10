// Tetris block definitions with all 7 classic shapes
export const TETRIS_BLOCKS = {
  I: {
    name: 'I',
    color: '#00CCFF',
    shapes: [
      [[1, 1, 1, 1]],
      [[1], [1], [1], [1]]
    ]
  },
  O: {
    name: 'O',
    color: '#FFDD00',
    shapes: [
      [[1, 1], [1, 1]]
    ]
  },
  T: {
    name: 'T',
    color: '#BB00FF',
    shapes: [
      [[0, 1, 0], [1, 1, 1]],
      [[1, 0], [1, 1], [1, 0]],
      [[1, 1, 1], [0, 1, 0]],
      [[0, 1], [1, 1], [0, 1]]
    ]
  },
  S: {
    name: 'S',
    color: '#00FF00',
    shapes: [
      [[0, 1, 1], [1, 1, 0]],
      [[1, 0], [1, 1], [0, 1]]
    ]
  },
  Z: {
    name: 'Z',
    color: '#FF4444',
    shapes: [
      [[1, 1, 0], [0, 1, 1]],
      [[0, 1], [1, 1], [1, 0]]
    ]
  },
  J: {
    name: 'J',
    color: '#0033FF',
    shapes: [
      [[1, 0, 0], [1, 1, 1]],
      [[1, 1], [1, 0], [1, 0]],
      [[1, 1, 1], [0, 0, 1]],
      [[0, 1], [0, 1], [1, 1]]
    ]
  },
  L: {
    name: 'L',
    color: '#FF9944',
    shapes: [
      [[0, 0, 1], [1, 1, 1]],
      [[1, 0], [1, 0], [1, 1]],
      [[1, 1, 1], [1, 0, 0]],
      [[1, 1], [0, 1], [0, 1]]
    ]
  }
};

export function getRandomBlock() {
  const blockNames = Object.keys(TETRIS_BLOCKS);
  const randomName = blockNames[Math.floor(Math.random() * blockNames.length)];
  const block = TETRIS_BLOCKS[randomName];
  const randomShape = block.shapes[Math.floor(Math.random() * block.shapes.length)];
  
  return {
    name: randomName,
    color: block.color,
    shape: randomShape,
    rotation: 0,
    id: Math.random()
  };
}

export function rotateBlock(block) {
  const blockDef = TETRIS_BLOCKS[block.name];
  const nextRotation = (block.rotation + 1) % blockDef.shapes.length;
  
  return {
    ...block,
    shape: blockDef.shapes[nextRotation],
    rotation: nextRotation
  };
}

export function canPlaceBlock(board, shape, row, col, boardSize = 8) {
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const boardRow = row + r;
        const boardCol = col + c;
        
        if (boardRow < 0 || boardRow >= boardSize || boardCol < 0 || boardCol >= boardSize) {
          return false;
        }
        
        if (board[boardRow * boardSize + boardCol] !== null) {
          return false;
        }
      }
    }
  }
  return true;
}

export function placeBlockOnBoard(board, shape, row, col, color, boardSize = 8) {
  const newBoard = [...board];
  
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const boardRow = row + r;
        const boardCol = col + c;
        newBoard[boardRow * boardSize + boardCol] = color;
      }
    }
  }
  
  return newBoard;
}
