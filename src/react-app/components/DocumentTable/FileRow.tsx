import { TableCell, TableRow } from '../Table/TableComponents'
import { classNames } from '../../lib/tw'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectRowById, updateFileRow } from '../../store/fileListSlice'
import { FileTypeSelector } from '../Files/FileTypeSelector'
import { deleteRows } from '../../store/fileListThunks'
import { DeleteButton } from '../Input/DeleteButton'
import { AddFileModal } from '../Files/AddFileModal'
import { FilePreview } from '../Files/FilePreview'
import {
    Root as ScrollAreaRoot,
    Viewport as ScrollAreaViewport,
    ScrollAreaScrollbar,
    ScrollAreaThumb
} from '@radix-ui/react-scroll-area'
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
            <TableCell className='flex flex-col gap-1'>
                <ScrollAreaRoot className='h-16 overflow-hidden'>
                    <ScrollAreaViewport>
                        {fileIds.map((id) => (
                            <div
                                key={id}
                                className='flex flex-row items-center gap-1'
                            >
                                <FilePreview fileId={id} />
                            </div>
                        ))}
                    </ScrollAreaViewport>
                    <ScrollAreaScrollbar
                        className='flex touch-none select-none bg-blackA3 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col'
                        orientation='vertical'
                    >
                        <ScrollAreaThumb className='relative flex-1 rounded-[10px] bg-mauve10 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2' />
                    </ScrollAreaScrollbar>
                </ScrollAreaRoot>
            </TableCell>
        </TableRow>
    )
}
