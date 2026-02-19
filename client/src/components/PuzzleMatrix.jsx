import React, { useState } from "react";

export default function PuzzleMatrix({ puzzle, onWin }) {
  const [grid, setGrid] = useState(puzzle.data);

  const isValidMove = (row, col, num) => {
    if (num === 0) return true;

    // Check row
    for (let c = 0; c < 9; c++) {
      if (c !== col && grid[row][c] === num) return false;
    }
    // Check column
    for (let r = 0; r < 9; r++) {
      if (r !== row && grid[r][col] === num) return false;
    }
    // Check 3x3 subgrid
    const sr = Math.floor(row / 3) * 3;
    const sc = Math.floor(col / 3) * 3;
    for (let r = sr; r < sr + 3; r++) {
      for (let c = sc; c < sc + 3; c++) {
        if ((r !== row || c !== col) && grid[r][c] === num) return false;
      }
    }
    return true;
  };

  const handleChange = (row, col, value) => {
    const val = parseInt(value, 10);
    const newGrid = grid.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? (isNaN(val) ? 0 : val) : c))
    );
    setGrid(newGrid);

    if (checkWin(newGrid)) {
      onWin();
    }
  };

  const checkWin = (grid) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (!isValidMove(r, c, grid[r][c]) || grid[r][c] === 0) return false;
      }
    }
    return true;
  };

  return (
    <div className="grid grid-cols-9 gap-0 p-4 bg-gradient-to-br from-brandGray to-white rounded-xl shadow-lg">
      {grid.map((row, ri) =>
        row.map((num, ci) => {
          const isPrefilled = puzzle.prefilled[ri][ci];
          const isError = num !== 0 && !isValidMove(ri, ci, num);

          return (
            <input
              key={`${ri}-${ci}`}
              type="text"
              maxLength={1}
              value={num === 0 ? "" : num}
              onChange={(e) => handleChange(ri, ci, e.target.value)}
              className={`w-12 h-12 text-center text-xl font-bold transition-transform transform hover:scale-105
                border ${isPrefilled ? "bg-brandBlue text-white" : "bg-white text-brandBlue focus:ring-2 focus:ring-brandGreen"}
                ${isError ? "bg-red-200 border-red-500 text-red-700" : ""}
                ${ri % 3 === 0 ? "border-t-4" : ""}
                ${ci % 3 === 0 ? "border-l-4" : ""}
                ${ri === 8 ? "border-b-4" : ""}
                ${ci === 8 ? "border-r-4" : ""}
              `}
              disabled={isPrefilled}
            />
          );
        })
      )}
    </div>
  );
}