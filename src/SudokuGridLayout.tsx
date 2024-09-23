import { SudokuGridArray } from "./types";
import SudokuRowLayout from "./SudokuRowLayout";

interface SudokuGridLayoutProps {
  sudokuGrid: SudokuGridArray;
}

export default function SudokuGridLayout({
  sudokuGrid,
}: SudokuGridLayoutProps) {
  return (
    <div className="flex flex-col">
    {sudokuGrid.map((row, index) => {
        return (
            <SudokuRowLayout key={index} row={row} />
        )
    })}
    </div>
  );
}
