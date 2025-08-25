import { ReactNode } from 'react'
import { Header, HeaderCell } from '../Table/TableComponents'

export interface TableProps {
    rowNames: string[]
    children: ReactNode
}

export function Table({ rowNames, children }: TableProps) {
    return (
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-y-visible'>
            <Header>
                {rowNames.map((name, index) => (
                    <HeaderCell key={index}>{name}</HeaderCell>
                ))}
            </Header>
            <tbody>{children}</tbody>
        </table>
    )
}
