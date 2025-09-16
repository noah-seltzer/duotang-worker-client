import { DotsVerticalIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useAppDispatch, useAppSelector } from '@/store'
import {
    selectFileById,
    selectRowById,
    updateFileRow
} from '@/store/fileListSlice'
import { FileTypeSelector } from '@/components/Files/FileTypeSelector'
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
import { FormFileDropZone } from '@/components/Form/FormFileDropZone'
import { ChangeEvent } from 'react'
import { addFilesToRow, deleteFilesFromRow } from '@/store/fileListThunks'
import { setListHoverIndex } from '@/store/appearanceSlice'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/Skeleton/Popover'
import { NewFilePreview } from '@/components/Files/NewFilePreview'
import { useGetFileInfo } from '@/hooks/useGenerateNewFileName'
import { replaceSpaceWithUnderscore } from '@/lib/string'
export interface FileRowProps {
    index: number
    rowId: string
}

export function FileRow({ rowId }: FileRowProps) {
    const dispatch = useAppDispatch()
    const row = useAppSelector((state) => selectRowById(state, rowId))
    const rowFile = useAppSelector((state) =>
        selectFileById(state, row.fileIds[0])
    )
    const { name } = useGetFileInfo(rowFile?.id)

    const { deleteRowsFromList } = useListState(row.listId)
    const { fileIds, docType } = row
    const isComplete = fileIds.length > 0

    const addFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (fileIds.length > 0) dispatch(deleteFilesFromRow([rowFile]))
        const { files } = e.target
        if (!files || files.length === 0) return
        const newFile = files[0]
        const input = {
            file: newFile,
            name: newFile.name,
            isMarad: false,
            rowId
        }
        dispatch(addFilesToRow([input]))
    }

    return (
        <TableRow
            disableHover={false}
            onMouseEnter={() => dispatch(setListHoverIndex(rowId))}
            onMouseLeave={() => dispatch(setListHoverIndex(undefined))}
        >
            {/* Status */}
            <TableCell>
                <Badge variant={isComplete ? 'secondary' : 'destructive'}>
                    {isComplete ? 'Complete' : 'Incomplete'}
                </Badge>
            </TableCell>

            {/* Document Type */}
            <TableCell>
                <FileTypeSelector
                    currentOption={docType}
                    onChange={(value) => {
                        dispatch(updateFileRow({ ...row, docType: value }))
                    }}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className='mt-2 py-1 px-2 h-6'>
                            <PlusCircledIcon /> Add Related File
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Add Marad</DropdownMenuItem>
                        <DropdownMenuItem>Add Other</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
            <TableCell>
                {rowFile && (
                    <Popover>
                        <PopoverTrigger>Show File</PopoverTrigger>
                        <PopoverContent className='w-fit'>
                            <NewFilePreview fileId={rowFile.id} />
                        </PopoverContent>
                    </Popover>
                )}
            </TableCell>

            {/* Add File */}
            <TableCell>
                <FormFileDropZone
                    linkMessage='Add file'
                    secondaryMessage={'or drag and drop'}
                    onInput={addFile}
                    fileName={rowFile?.name}
                />
                {rowFile && replaceSpaceWithUnderscore(name)}
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
