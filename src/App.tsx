import SudokoGridLayout from "./SudokuGridLayout";
import { SudokuCell, SudokuGridArray, SudokuRowColQuad} from "./types"

function App() {
  
  class SudokuGrid {
    private grid: SudokuGridArray;
    
    constructor() {
      this.grid = Array(9)
      .fill(null)       
      .map(() => Array(9).fill(null));  
    }

    public getGrid(): SudokuGridArray {
      return this.grid.map(row => [...row])
    }

    public getCell(row: number, column: number): SudokuCell {
      return this.grid[row - 1][column - 1]
    }

    public getrow(number: number): SudokuRowColQuad {
      return this.grid[number-1]
    }

    public getCol(number: number): SudokuRowColQuad {
      const colArr: SudokuCell[] = []
      
      for(let i = 0; i < this.grid.length; i++) {
        colArr.push(this.grid[i][number-1])
      }

      return colArr
    }

    public populateGridWithNumbers() {
      for (let i = 0; i < this.grid.length; i++) {
        const currentRow = this.grid[i]
        for (let j = 0; j < currentRow.length; j++) {
          currentRow[j] = (i*10) + (j-i+1)
        }
      }
    }
  }

  const testGrid = new SudokuGrid()


  return (
    <div className="text-red-500">
      <SudokoGridLayout sudokuGrid={testGrid.getGrid()}/>
    </div>
  )
}




export default App
