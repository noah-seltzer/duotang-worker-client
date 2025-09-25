'use client'
import { Suspense } from 'react'
import localforage from 'localforage'
import { Button } from '@/components/Skeleton/Button'
import { DeleteButton } from '@/components/Input/DeleteButton'
import { useAppDispatch, useAppSelector } from '@/store'
import { fileSelectors, selectFileById } from '@/store/fileListSlice'
import { deleteFilesFromRow } from '@/store/thunks/fileList'
import { getFileExtensionFromName } from '@/lib/files'
import { HoverTruncatedText } from '@/components/Hover/HoverTruncatedText'
import { useGetFileInfo } from '@/hooks/useGenerateNewFileName'
import { replaceSpaceWithUnderscore } from '@/lib/string'
import { Card, CardContent } from '@/components/Skeleton/card'
import { Spinner } from '@/components/Skeleton/spinner'
import { Badge } from '@/components/Skeleton/Badge'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { LoaderIcon } from 'lucide-react'
import { CheckFilledIcon } from '@/components/Icon/CheckFilledIcon'
import { CrossFilledIcon } from '@/components/Icon/CrossFilledIcon'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/Skeleton/Popover'
import { NewFilePreview } from '@/components/Files/NewFilePreview'

interface FilePreviewProps {
    fileId: string
}

export function FilePreview({ fileId }: FilePreviewProps) {
    const fileMeta = useAppSelector((state) => selectFileById(state, fileId))
    const ext = getFileExtensionFromName(fileMeta.name)

    if (ext !== 'pdf' && ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png')
        return 'Cannot Display'

    const promise = localforage.getItem(fileId) as Promise<File>

    return (
        <div className='flex flex-row items-center gap-2'>
            <Suspense fallback={<div className='h-8 w-32'>Loading...</div>}>
                <FileLoader fileId={fileId} filePromise={promise} />
            </Suspense>
        </div>
    )
}

function FileLoader({
    fileId
}: {
    filePromise: Promise<File>
    fileId: string
}) {
    const dispatch = useAppDispatch()

    const { name } = useGetFileInfo(fileId)

    const fileMeta = useAppSelector((state) =>
        fileSelectors.selectById(state, fileId)
    )

    const { name: originalFileName, oneDriveSyncStatus } = fileMeta

    return (
        <div>
            <Card className='px-4 py-2'>
                <CardContent className='flex flex-row items-center gap-4 py-0 px-0'>
                    <div className='flex flex-col items-center gap-2'>
                        <Badge variant='secondary' className='px-0.5 py-0'>
                            {oneDriveSyncStatus === 'unsynced' && (
                                <>
                                    <LoaderIcon className='size-4' />
                                    Unsynced
                                </>
                            )}
                            {oneDriveSyncStatus === 'syncing' && (
                                <>
                                    <Spinner variant='circle' /> Syncing
                                </>
                            )}
                            {oneDriveSyncStatus === 'synced' && (
                                <>
                                    <CheckFilledIcon className='fill-green-500 dark:fill-green-400 size-4' />
                                    Synced
                                </>
                            )}
                            {oneDriveSyncStatus === 'error' && (
                                <>
                                    <CrossFilledIcon className='fill-red-500 dark:fill-red-400' />{' '}
                                    Error
                                </>
                            )}
                        </Badge>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant='secondary'
                                    size='sm'
                                    className='px-1 h-6 rounded-md'
                                >
                                    Show File <ChevronDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className='w-fit'>
                                <NewFilePreview fileId={fileId} />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='flex flex-col items-start'>
                        <HoverTruncatedText
                            text={'Old: ' + originalFileName}
                            underline={false}
                        />

                        <HoverTruncatedText
                            text={'New: ' + replaceSpaceWithUnderscore(name)}
                            underline={true}
                        />
                    </div>
                    <div>
                        <DeleteButton
                            confirmMessage='Delete File? This cannot be undone.'
                            onClick={() =>
                                dispatch(deleteFilesFromRow([fileMeta]))
                            }
                        >
                            <Button size='sm' variant='destructive'>
                                Delete File
                            </Button>
                        </DeleteButton>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
