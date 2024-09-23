import { SudokuRowColQuad } from "./types"
import SudokuCellLayout from "./SudokuCellLayout"

interface SudokoRowLayoutProps {
    row: SudokuRowColQuad
}

export default function SudokuRowLayout({ row }: SudokoRowLayoutProps) {
    return (
        <div className="flex flex-row">
            {row.map((number, index) => {
                return (<SudokuCellLayout key={index} number={number}/>)
            })}
        </div>
    )
}