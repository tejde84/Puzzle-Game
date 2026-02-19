// Helpers for RNG
function mulberry32(a) {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Shuffle array
function shuffle(array, rng) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate full valid Sudoku grid
function generateFullGrid(rng) {
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  const isValid = (row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] === num || grid[i][col] === num) return false;
    }
    const sr = Math.floor(row / 3) * 3;
    const sc = Math.floor(col / 3) * 3;
    for (let r = sr; r < sr + 3; r++) {
      for (let c = sc; c < sc + 3; c++) {
        if (grid[r][c] === num) return false;
      }
    }
    return true;
  };

  const fillCell = (row, col) => {
    if (row === 9) return true;
    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = col === 8 ? 0 : col + 1;

    const nums = shuffle([1,2,3,4,5,6,7,8,9], rng);
    for (const num of nums) {
      if (isValid(row, col, num)) {
        grid[row][col] = num;
        if (fillCell(nextRow, nextCol)) return true;
        grid[row][col] = 0;
      }
    }
    return false;
  };

  fillCell(0,0);
  return grid;
}

// Remove numbers to create puzzle
function makePuzzle(grid, rng, blanks = 40) {
  const puzzle = grid.map(row => [...row]);
  let removed = 0;
  while (removed < blanks) {
    const r = Math.floor(rng() * 9);
    const c = Math.floor(rng() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }
  return puzzle;
}

export function usePuzzleGenerator() {
  const generatePuzzle = () => {
    // Use a truly random seed each time
    const rng = mulberry32(Math.floor(Math.random() * 1000000));

    const fullGrid = generateFullGrid(rng);
    const puzzleGrid = makePuzzle(fullGrid, rng, 40); // 40 blanks

    const prefilled = puzzleGrid.map(row => row.map(num => num !== 0));

    return { data: puzzleGrid, prefilled };
  };

  return { generatePuzzle };
}