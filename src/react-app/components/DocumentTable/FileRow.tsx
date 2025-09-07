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
    Root as AccordionRoot,
    Trigger as AccordionTrigger,
    Content as AccordionContent,
    AccordionItem
} from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Button } from '../Skeleton/Button'
import { useListState } from '../../hooks/useState'
export interface FileRowProps {
    index: number
    rowId: string
}

export function FileRow({ rowId }: FileRowProps) {
    const dispatch = useAppDispatch()

    const row = useAppSelector((state) => selectRowById(state, rowId))
    const { deleteRowsFromList } = useListState(row.listId)

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
                        onClick={() => deleteRowsFromList([rowId])}
                    >
                        <Button>Delete Row</Button>
                    </DeleteButton>
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
            <TableCell>
                {fileIds.length > 0 && (
                    <AccordionRoot
                        className='rounded-md bg-mauve6 shadow-black/5'
                        type='single'
                        collapsible
                    >
                        <AccordionItem
                            value='item-1'
                            className='"mt-px first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-mauve12"'
                        >
                            <AccordionTrigger
                                asChild={true}
                                className='group flex h-16 flex-1 gap-4 cursor-default items-center justify-between bg-mauve1 px-5 text-[15px] leading-none text-violet11 shadow-mauve6 outline-none hover:bg-mauve2'
                            >
                                <Button className='flex flex-row gap-4 items-center h-12'>
                                    <div className='group-data-[state=open]:hidden'>
                                        Show Files
                                    </div>
                                    <div className='group-data-[state=closed]:hidden'>
                                        Hide Files
                                    </div>
                                    <ChevronDownIcon
                                        className='text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180'
                                        aria-hidden
                                    />
                                </Button>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className='flex flex-col gap-2 mt-2'>
                                    {fileIds.map((id) => (
                                        <div
                                            key={id}
                                            className='flex flex-row items-center gap-1'
                                        >
                                            <FilePreview fileId={id} />
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </AccordionRoot>
                )}
            </TableCell>
        </TableRow>
    )
}
