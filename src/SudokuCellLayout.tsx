import { SudokuCell } from "./types"

interface SudokuCellLayoutProps {
    number: SudokuCell
}

export default function SudokuCellLayout({number}: SudokuCellLayoutProps) {
    return (
        <p className="border h-14 w-14 grid place-items-center">{number}</p>
    )
}