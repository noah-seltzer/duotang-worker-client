import { Header, HeaderCell } from '../Table/TableComponents'

export interface TableProps {
    rowNames: string[]
    rows: React.JSX.Element[]
}

export function Table({ rowNames, rows }: TableProps): React.JSX.Element {
    return (
        <table className='table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <Header>
                {rowNames.map((name, index) => (
                    <HeaderCell key={index}>{name}</HeaderCell>
                ))}
            </Header>
            <tbody>{rows}</tbody>
        </table>
    )
}
