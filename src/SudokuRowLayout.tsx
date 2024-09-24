import { SudokuRowColQuad } from "./types"
import SudokuCellLayout from "./SudokuCellLayout"

interface SudokoRowLayoutProps {
    row: SudokuRowColQuad;
    rowIndex: number;
}

export default function SudokuRowLayout({ row, rowIndex }: SudokoRowLayoutProps) {
    return (
        <div className="flex flex-row">
            {row.map((number, colIndex) => {
                return (<SudokuCellLayout key={colIndex} number={number} rowIndex={rowIndex} colIndex={colIndex+1} />)
            })}
        </div>
    )
}