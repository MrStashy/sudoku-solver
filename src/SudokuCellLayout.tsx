import { SudokuCell } from "./types"

interface SudokuCellLayoutProps {
    number: SudokuCell;
    rowIndex: number;
    colIndex: number;
    handleCellChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SudokuCellLayout({number, rowIndex, colIndex, handleCellChange}: SudokuCellLayoutProps) {


    return (
        <input id={`${rowIndex}-${colIndex}`} className="border h-14 w-14 grid text-center" onChange={handleCellChange} value={number}/>
    )
}