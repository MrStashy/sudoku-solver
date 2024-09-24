import SudokoGridLayout from "./SudokuGridLayout";
import { SudokuGridArray } from "./types";
import { useState, useEffect } from "react";

function App() {
  const [grid, setGrid] = useState<SudokuGridArray>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(""))
  );

  function populateGridWithNumbers() {
    const newGrid: SudokuGridArray = grid.map((row) => [...row]);
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        newGrid[i][j] = (i * 10 + (j - i + 1)).toString();
      }
    }
    setGrid(newGrid);
  }

  function handleCellChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newGrid: SudokuGridArray = grid.map((row) => [...row]);
    const { id, value } = e.target;
    const col = Number(id[0]) - 1;
    const row = Number(id[2]) - 1;

    if (
      Number(value) === 0 ||
      value.toString().length > 1 ||
      isNaN(Number(value))
    ) {
      return;
    }

    newGrid[col][row] = value;

    setGrid(newGrid);
  }

  // useEffect(() => {
  //   populateGridWithNumbers()
  // }, [])

  return (
    <div className="text-red-500">
      <SudokoGridLayout sudokuGrid={grid} handleCellChange={handleCellChange} />
    </div>
  );
}

export default App;

// class SudokuGrid {
//   private grid: SudokuGridArray;

//   constructor() {
//     this.grid = Array(9)
//       .fill("")
//       .map(() => Array(9).fill(""));
//   }

//   public getGrid(): SudokuGridArray {
//     return this.grid.map((row) => [...row]);
//   }

//   public getCell(row: number, column: number): SudokuCell {
//     return this.grid[row - 1][column - 1];
//   }

//   public getrow(number: number): SudokuRowColQuad {
//     return this.grid[number - 1];
//   }

//   public getCol(number: number): SudokuRowColQuad {
//     const colArr: SudokuCell[] = [];
//     for (let i = 0; i < this.grid.length; i++) {
//       colArr.push(this.grid[i][number - 1]);
//     }
//     return colArr;
//   }

//   public getQuad(number: number): SudokuRowColQuad {
//     const startRow = Math.floor((number - 1) / 3) * 3;
//     const startCol = ((number - 1) % 3) * 3;
//     const result: SudokuCell[] = [];

//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         result.push(this.grid[startRow + i][startCol + j]);
//       }
//     }
//     return result;
//   }
// }
