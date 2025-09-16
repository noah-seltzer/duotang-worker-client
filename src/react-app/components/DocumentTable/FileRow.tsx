import { DotsVerticalIcon } from '@radix-ui/react-icons'
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
import { addFilesToRow, updateFileAsync } from '@/store/fileListThunks'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/Skeleton/Popover'
import { NewFilePreview } from '@/components/Files/NewFilePreview'
import { FilePreview } from '@/components/Files/FilePreview'
import { selectCurrentClient } from '@/store/clientInfoSlice'
import { ClientInfo } from '@/types/ClientInfo'
import { selectListById } from '@/store/listBuilderSlice'
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

    const currentClient = useAppSelector(selectCurrentClient) as ClientInfo
    const clientListType = useAppSelector((state) =>
        selectListById(state, currentClient.listTypeId as string)
    )

    const { deleteRowsFromList } = useListState(row.listId)
    const { fileIds, docType } = row
    const isComplete = fileIds.length > 0

    const onAddFile = (
        e: ChangeEvent<HTMLInputElement>,
        isMarad: boolean = false
    ) => {
        const { files } = e.target
        if (!files || files.length === 0) return
        const newFile = files[0]
        const input = {
            file: newFile,
            name: newFile.name,
            isMarad,
            rowId
        }
        dispatch(addFilesToRow([input]))
    }

    const onUpdateFile = (
        e: ChangeEvent<HTMLInputElement>,
        fileId: string,
        isMarad: boolean = false
    ) => {
        const { files } = e.target
        if (!files || files.length === 0) return
        const newFile = files[0]
        const input = {
            file: newFile,
            name: newFile.name,
            isMarad,
            rowId,
            id: fileId
        }
        dispatch(updateFileAsync(input))
    }

    const otherFiles = fileIds.filter((id) => id !== rowFile?.id)

    return (
        <TableRow
            disableHover={false}
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
            </TableCell>
            <TableCell>
                {rowFile && (
                    <Popover>
                        <PopoverTrigger>Show Files</PopoverTrigger>
                        <PopoverContent className='w-fit'>
                            <NewFilePreview fileId={rowFile.id} />
                            {otherFiles.map((id) => (
                                <div className='flex flex-col gap-2'>
                                    <NewFilePreview fileId={id} />
                                </div>
                            ))}
                        </PopoverContent>
                    </Popover>
                )}
            </TableCell>

            {/* Add File */}
            <TableCell className='space-y-2'>
                <FormFileDropZone
                    linkMessage='Add file'
                    secondaryMessage={'or drag and drop'}
                    onInput={(e) => {
                        const event = e as ChangeEvent<HTMLInputElement>
                        if (!rowFile) {
                            onAddFile(event)
                        } else {
                            onUpdateFile(event, rowFile.id)
                        }
                    }}
                    fileName={rowFile?.name}
                >
                    {rowFile && <FilePreview fileId={rowFile.id} />}
                </FormFileDropZone>
                {(!clientListType || clientListType.tags.includes('MARAD')) && (
                    <div className='flex flex-row gap-2'>
                        <FormFileDropZone
                            linkMessage='Add Marad File'
                            onInput={(e) =>
                                onAddFile(
                                    e as ChangeEvent<HTMLInputElement>,
                                    true
                                )
                            }
                        >
                            {otherFiles.length > 0 && (
                                <div className='space-y-2'>
                                    {otherFiles.map((id) => (
                                        <div key={id} className='flex flex-col'>
                                            <FilePreview fileId={id} />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FormFileDropZone>
                    </div>
                )}
            </TableCell>

            <TableCell className='align-top'>
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
