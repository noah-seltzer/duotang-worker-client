'use client'
import { Suspense, use } from 'react'
import localforage from 'localforage'
import { Button } from '@/components/Skeleton/Button'
import { DeleteButton } from '@/components/Input/DeleteButton'
import { FileFrame } from '@/components/Files/FileFrame'
import { useAppDispatch, useAppSelector } from '@/store'
import { fileSelectors, selectFileById } from '@/store/fileListSlice'
import { deleteFilesFromRow } from '@/store/fileListThunks'
import { getFileExtensionFromName } from '@/lib/files'
import { HoverTruncatedText } from '@/components/Hover/HoverTruncatedText'
import { useGetFileInfo } from '@/hooks/useGenerateNewFileName'
import { replaceSpaceWithUnderscore } from '@/lib/string'

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
    filePromise,
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

    const file = use(filePromise)

    const url = URL.createObjectURL(file as File)

    return (
        <div className='inset-ring inset-ring-white/5 flex flex-col items-center gap-2 rounded-md'>
            <FileFrame url={url} width={200} height={200} />
            <HoverTruncatedText
                text={'Old: ' + fileMeta.name}
                underline={false}
            />
            <HoverTruncatedText
                text={'New: ' + replaceSpaceWithUnderscore(name)}
                underline={true}
            />
            <DeleteButton
                confirmMessage='Delete File? This cannot be undone.'
                onClick={() => dispatch(deleteFilesFromRow([fileMeta]))}
            >
                <Button variant='destructive'>Delete File</Button>
            </DeleteButton>
        </div>
    )
}
