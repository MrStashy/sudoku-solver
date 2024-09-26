import SudokoGridLayout from "./SudokuGridLayout";
import { SudokuGridArray, SudokuRowColQuad, SudokuCell } from "./types";
import { useState } from "react";

function App() {
  const [grid, setGrid] = useState<SudokuGridArray>(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill(""))
  );
  const [invalidGrid, setInvalidGrid] = useState<boolean>(false);

  function handleCellChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newGrid: SudokuGridArray = grid.map((row) => [...row]);
    const { id, value } = e.target;
    const col = Number(id[0]) - 1;
    const row = Number(id[2]) - 1;

    if (value === "" || /^[1-9]?$/.test(value)) {
      newGrid[col][row] = value === "" ? "" : value;
      setGrid(newGrid);
    }
  }

  function getRow(grid: SudokuGridArray, number: number): SudokuRowColQuad {
    return grid[number];
  }

  function getCol(grid: SudokuGridArray, number: number): SudokuRowColQuad {
    const colArr: SudokuCell[] = [];
    for (let i = 0; i < grid.length; i++) {
      colArr.push(grid[i][number]);
    }
    return colArr;
  }

  function getQuad(grid: SudokuGridArray, number: number): SudokuRowColQuad {
    const startRow = Math.floor(number / 3) * 3; 
    const startCol = (number % 3) * 3;   
    const result: SudokuRowColQuad = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        result.push(grid[startRow + i][startCol + j]);
      }
    }
    return result;
  }

  function checkDuplicates(area: SudokuRowColQuad): boolean {
    const valuesAlreadySeen = [];

    for (let i = 0; i < area.length; i++) {
      const value: SudokuCell = area[i];
      if (value === "") {
        continue;
      }
      if (valuesAlreadySeen.indexOf(value) !== -1) {
        return true;
      }
      valuesAlreadySeen.push(value);
    }
    return false;
  }

  function verifyGrid(testGrid: SudokuGridArray = grid): boolean {
    setInvalidGrid(false);
    for (let i = 0; i < 9; i++) {
      const quad: SudokuRowColQuad = getQuad(testGrid, i);
      const row: SudokuRowColQuad = getRow(testGrid, i);
      const col: SudokuRowColQuad = getCol(testGrid, i);

      if (
        checkDuplicates(row) ||
        checkDuplicates(col) ||
        checkDuplicates(quad)
      ) {
        setInvalidGrid(true);
        return false;
      }
    }
    return true;
  }

  function getRandomNum(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  function setCell(
    grid: SudokuGridArray,
    row: number,
    col: number,
    value: number
  ) {
    grid[row][col] = value.toString();
  }

  function getCandidates (grid: SudokuGridArray, row: number, col: number): number[] {
    const result: number[] = []
    const quadNumber: number = (Math.floor(col / 3) * 3) + Math.floor(row / 3)
    const rowArr: SudokuRowColQuad = getRow(grid, row)
    const colArr: SudokuRowColQuad = getCol(grid, col)
    const quadArr: SudokuRowColQuad = getQuad(grid, quadNumber)
    const appendedArr = rowArr.concat(colArr, quadArr)

    
    for (let i = 1; i < 10; i++) {
      if(appendedArr.indexOf(i.toString()) === -1) {
        result.push(i)
      }
    }

    console.log(result)

    return result
  }

  

  function handleSolveGrid() {
    const newGrid: SudokuGridArray = grid.map((row) => [...row]);
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          const candidates: number[] = getCandidates(newGrid, i, j)
          if (candidates.length === 0) {
            console.log("Cell impossible")
          }

          setCell(newGrid, i, j, getRandomNum())
      }
    }
    setGrid(newGrid);
  }

  function handleCheckGrid() {
    verifyGrid();
  }

  return (
    <>
      <div className="text-red-500">
        <SudokoGridLayout
          sudokuGrid={grid}
          handleCellChange={handleCellChange}
        />
      </div>
      <button onClick={handleCheckGrid}>Check Grid</button>
      <button onClick={handleSolveGrid}>Solve Grid</button>
      {invalidGrid && <p className="text-red-500">This Grid Has An Error</p>}
    </>
  );
}

export default App;

// function populateGridWithNumbers() {
//   const newGrid: SudokuGridArray = grid.map((row) => [...row]);
//   for (let i = 0; i < newGrid.length; i++) {
//     for (let j = 0; j < newGrid[i].length; j++) {
//       newGrid[i][j] = (i * 10 + (j - i + 1)).toString();
//     }
//   }
//   setGrid(newGrid);
// }

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
