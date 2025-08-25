import { TableCell, TableRow } from '../Table/TableComponents'
import { classNames } from '../../lib/tw'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectRowById, updateFileRow } from '../../store/fileListSlice'
import { FileTypeSelector } from '../Files/FileTypeSelector'
import { deleteRows } from '../../store/fileListThunks'
import { DeleteButton } from '../Input/DeleteButton'
import { AddFileModal } from '../Files/AddFileModal'

export interface FileRowProps {
    index: number
    rowId: string
}

export function FileRow({ rowId }: FileRowProps) {
    const dispatch = useAppDispatch()
    const row = useAppSelector((state) => selectRowById(state, rowId))

    const { fileIds, docType } = row

    const isComplete = fileIds.length > 0
    return (
        <TableRow>
            <TableCell>
                <span
                    className={classNames(
                        'flex w-10 h-6 rounded-full',
                        isComplete ? 'bg-green-500' : 'bg-red-500'
                    )}
                ></span>
            </TableCell>
            {/* Status */}
            <TableCell>
                <div className='flex flex-row items-center gap-4 space-y-0 h-full'>
                    <DeleteButton
                        confirmMessage='Files associated with this row will be deleted.'
                        onClick={() => dispatch(deleteRows([rowId]))}
                    />
                </div>
            </TableCell>
            {/* Document Type */}
            <TableCell>
                <FileTypeSelector
                    currentOption={docType}
                    onChange={(value) => {
                        dispatch(updateFileRow({ ...row, docType: value }))
                    }}
                />
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                <AddFileModal rowId={rowId} />
            </TableCell>
        </TableRow>
    )
}
