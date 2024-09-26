import { SudokuRowColQuad } from "./types"
import SudokuCellLayout from "./SudokuCellLayout"

interface SudokoRowLayoutProps {
    row: SudokuRowColQuad;
    rowIndex: number;
    handleCellChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SudokuRowLayout({ row, rowIndex, handleCellChange }: SudokoRowLayoutProps) {
    return (
        <div className="flex flex-row">
            {row.map((number, colIndex) => {
                return (<SudokuCellLayout key={colIndex} number={number} rowIndex={rowIndex} colIndex={colIndex} handleCellChange={handleCellChange} />)
            })}
        </div>
    )
}