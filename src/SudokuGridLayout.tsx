import { SudokuGridArray } from "./types";
import SudokuRowLayout from "./SudokuRowLayout";

interface SudokuGridLayoutProps {
  sudokuGrid: SudokuGridArray;
}

export default function SudokuGridLayout({
  sudokuGrid,
}: SudokuGridLayoutProps) {

  console.log(sudokuGrid)
  return (
    <div className="flex flex-col">
    {sudokuGrid.map((row, rowIndex) => {
      return (<SudokuRowLayout row={row} rowIndex={rowIndex+1}/>)
    }
        
    )}
  </div>
  );
}
