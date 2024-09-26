import { SudokuCell } from "./types"

interface SudokuCellLayoutProps {
    number: SudokuCell;
    rowIndex: number;
    colIndex: number;
    handleCellChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SudokuCellLayout({number, rowIndex, colIndex, handleCellChange}: SudokuCellLayoutProps) {

    let style="h-14 w-14 grid text-center border"

    if(colIndex+1 === 3 || colIndex+1 === 6) {
        style += " border-r-4"
    } 
    if (rowIndex+1 === 3 || rowIndex+1 === 6) {
        style += " border-b-4"
    }

    return (
        <input id={`${rowIndex}-${colIndex}`} className={style} onChange={handleCellChange} value={number}/>
    )
}