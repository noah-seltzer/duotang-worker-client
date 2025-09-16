'use client'
import { Suspense } from 'react'
import localforage from 'localforage'
import { Button } from '@/components/Skeleton/Button'
import { DeleteButton } from '@/components/Input/DeleteButton'
import { useAppDispatch, useAppSelector } from '@/store'
import { fileSelectors, selectFileById } from '@/store/fileListSlice'
import { deleteFilesFromRow } from '@/store/fileListThunks'
import { getFileExtensionFromName } from '@/lib/files'
import { HoverTruncatedText } from '@/components/Hover/HoverTruncatedText'
import { useGetFileInfo } from '@/hooks/useGenerateNewFileName'
import { replaceSpaceWithUnderscore } from '@/lib/string'
import { Card, CardContent } from '@/components/Skeleton/card'

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

    return (
        <div>
            <Card className='px-4 py-2'>
                <CardContent className='flex flex-row items-center gap-4 py-0 px-0'>
                    <div className='flex flex-col items-start'>
                        <HoverTruncatedText
                            text={'Old: ' + fileMeta.name}
                            underline={false}
                        />
                        <HoverTruncatedText
                            text={'New: ' + replaceSpaceWithUnderscore(name)}
                            underline={true}
                        />
                    </div>
                    <DeleteButton
                        confirmMessage='Delete File? This cannot be undone.'
                        onClick={() => dispatch(deleteFilesFromRow([fileMeta]))}
                    >
                        <Button variant='destructive'>Delete File</Button>
                    </DeleteButton>
                </CardContent>
            </Card>
        </div>
    )
}
