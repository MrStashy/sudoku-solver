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
    <div className="flex flex-col">
    {sudokuGrid.map((row, rowIndex) => {
      return (<SudokuRowLayout key={rowIndex} handleCellChange={handleCellChange} row={row} rowIndex={rowIndex} />)
    }
        
    )}
  </div>
  );
}
