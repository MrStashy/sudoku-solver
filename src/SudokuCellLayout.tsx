import { SudokuCell } from "./types"

interface SudokuCellLayoutProps {
    number: SudokuCell;
    rowIndex: number;
    colIndex: number;
    handleCellChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SudokuCellLayout({number, rowIndex, colIndex, handleCellChange}: SudokuCellLayoutProps) {


    return (
        <input id={`${rowIndex}-${colIndex}`} className="border h-14 w-14 grid place-items-center" onChange={handleCellChange} value={number}/>
    )
}