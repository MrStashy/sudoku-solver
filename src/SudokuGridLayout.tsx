import { SudokuGridArray } from "./types";
import SudokuRowLayout from "./SudokuRowLayout";

interface SudokuGridLayoutProps {
  sudokuGrid: SudokuGridArray;
  handleCellChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SudokuGridLayout({
  sudokuGrid,
  handleCellChange
}: SudokuGridLayoutProps) {

  return (
    <div className="flex flex-col my-auto">
    {sudokuGrid.map((row, rowIndex) => {
      return (<SudokuRowLayout key={rowIndex} handleCellChange={handleCellChange} row={row} rowIndex={rowIndex+1} />)
    }
        
    )}
  </div>
  );
}
