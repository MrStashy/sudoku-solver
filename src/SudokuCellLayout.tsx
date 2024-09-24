import { SudokuCell } from "./types"

interface SudokuCellLayoutProps {
    number: SudokuCell;
    rowIndex: number;
    colIndex: number;
}

export default function SudokuCellLayout({number, rowIndex, colIndex}: SudokuCellLayoutProps) {
    console.log(rowIndex)
    return (
        <p id={`${rowIndex}-${colIndex}`} className="border h-14 w-14 grid place-items-center">{number}</p>
    )
}