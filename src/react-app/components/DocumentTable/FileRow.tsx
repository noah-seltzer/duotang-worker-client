import { ChevronDownIcon, DotsVerticalIcon } from '@radix-ui/react-icons'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectRowById, updateFileRow } from '@/store/fileListSlice'
import { FileTypeSelector } from '@/components/Files/FileTypeSelector'
import { AddFileModal } from '@/components/Files/AddFileModal'
import { FilePreview } from '@/components/Files/FilePreview'
import { Button } from '@/components/Skeleton/Button'
import { useListState } from '@/hooks/useState'
import { TableCell, TableRow } from '@/components/Skeleton/Table'
import { Badge } from '@/components/Skeleton/Badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from '@/components/Skeleton/DropdownMenu'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/Skeleton/Popover'
import { FileManager } from '@/components/Files/FileManager'
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
                <Badge variant={isComplete ? 'secondary' : 'destructive'}>
                    {isComplete ? 'Complete' : 'Incomplete'}
                </Badge>
            </TableCell>
            {/* Status */}
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
                {fileIds.length > 0 && <FileManager fileIds={fileIds} />}
            </TableCell>
            <TableCell>
                <AddFileModal rowId={rowId} />
            </TableCell>
            <TableCell>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='ghost'
                            className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
                            size='icon'
                        >
                            <DotsVerticalIcon />
                            <span className='sr-only'>Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-32'>
                        <DropdownMenuItem
                            variant='destructive'
                            onClick={() => deleteRowsFromList([rowId])}
                        >
                            Delete Row
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}
