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
    console.log(e)
    const newGrid: SudokuGridArray = grid.map((row) => [...row]);
    const { id, value } = e.target;
    const col = Number(id[0]);
    const row = Number(id[2]);

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

  function setCell(
    grid: SudokuGridArray,
    row: number,
    col: number,
    value: number | ""
  ) {
    grid[row][col] = value.toString();
  }

  function getCandidates(
    grid: SudokuGridArray,
    row: number,
    col: number
  ): number[] {
    const result: number[] = [];
    const quadNumber: number = Math.floor(row / 3) * 3 + Math.floor(col / 3);
    const rowArr: SudokuRowColQuad = getRow(grid, row);
    const colArr: SudokuRowColQuad = getCol(grid, col);
    const quadArr: SudokuRowColQuad = getQuad(grid, quadNumber);
    const appendedArr = rowArr.concat(colArr, quadArr);

    for (let i = 1; i < 10; i++) {
      if (!appendedArr.includes(i.toString())) {
        result.push(i);
      }
    }

    return result;
  }

  function handleSolveGrid() {
    const newGrid: SudokuGridArray = grid.map((row) => [...row]);

    function solve(i: number, j: number): boolean {
      if (i === 9) return true;
      if (j === 9) return solve(i + 1, 0);

      if (newGrid[i][j] !== "") return solve(i, j + 1);

      const candidates: number[] = getCandidates(newGrid, i, j);
      for (const candidate of candidates) {
        setCell(newGrid, i, j, candidate);

        if (verifyGrid(newGrid)) {
          if (solve(i, j + 1)) return true;
        }

        setCell(newGrid, i, j, "");
      }

      return false;
    }

    solve(0, 0);
    setGrid(newGrid);
  }

  return (
    <main className="flex flex-col place-items-center gap-6 h-screen bg-black">
      <h1 className="text-4xl mt-8 mb-4 font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient bg-300%">Sudoku Solver</h1>
      <div>
        <SudokoGridLayout
          sudokuGrid={grid}
          handleCellChange={handleCellChange}
        />
      </div>
      <button onClick={handleSolveGrid} className="bg-slate-500 p-2 px-4 rounded-full text-white text-sm hover:bg-slate-400 border">Solve Grid</button>
      {invalidGrid && <p className="text-red-500">This grid is invalid</p>}
    </main>
  );
}

export default App;

