import { ClientInput } from '../ClientInput/ClientInput'
import { FileRow } from './FileRow'
import { Table } from '../Table/Table'
import { LoginOutButtons } from '../Auth/LoginOutButtons'
import { useAppDispatch, useAppSelector } from '../../store'
import { addRow, selectRowIds } from '../../store/fileListSlice'
import { Button } from '../Skeleton/Button'
import { ExportButton } from '../Input/ExportButton'
import { deleteRows } from '../../store/fileListThunks'

const rowNames = [
    // 'Delete',
    'Status',
    'Document',
    'File',
    'Marad File',
    'Filename',
    'File'
]

/**
 * Outermost parent for the spreadsheet-like document table
 */
export function DocumentTable() {
    const rowIds = useAppSelector(selectRowIds)

    const dispatch = useAppDispatch()

    return (
        <div>
            <div className='flex justify-left gap-2 mb-2'>
                <LoginOutButtons />
                <ClientInput />
            </div>
            <div className='relative overflow-x-auto overflow-y-visible'>
                <Table rowNames={rowNames}>
                    {rowIds.map((r, i) => (
                        <FileRow index={i + 1} key={r} rowId={r} />
                    ))}
                </Table>
            </div>
            <div className='w-full flex justify-left mt-2'></div>
            <div className='flex justify-between mt-2 w-full'>
                <div
                    className='inline-flex rounded-md shadow-xs gap-2'
                    role='group'
                >
                    <ExportButton />
                    <Button onClick={() => dispatch(addRow())}>Add Row</Button>
                    <Button onClick={() => dispatch(deleteRows(rowIds))}>
                        Delete All Rows
                    </Button>
                </div>
            </div>
        </div>
    )
}
