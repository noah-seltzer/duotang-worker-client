'use client'
import { Suspense, use } from 'react'
import { getFileExtensionFromName } from '../../lib/files'
import { FileFrame } from './FileFrame'
import { DeleteButton } from '../Input/DeleteButton'
import { useAppDispatch, useAppSelector } from '../../store'
import { fileSelectors, selectFileById } from '../../store/fileListSlice'
import localforage from 'localforage'
import { deleteFilesFromRow } from '../../store/fileListThunks'
import { DisplayName } from './DisplayName'
import { Button } from '../Skeleton/Button'

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

    const fileMeta = useAppSelector((state) =>
        fileSelectors.selectById(state, fileId)
    )

    const file = use(filePromise)

    const url = URL.createObjectURL(file as File)

    return (
        <div className='p-2 inset-ring inset-ring-white/5 flex flex-col items-start gap-2 rounded-md'>
            <FileFrame url={url} width={200} height={200} />
            <div>Old: {fileMeta.name}</div>
            <div>
                <DisplayName fileId={fileId} />
            </div>
            <DeleteButton
                confirmMessage='Delete File? This cannot be undone.'
                onClick={() => dispatch(deleteFilesFromRow([fileMeta]))}
            >
                <Button>Delete File</Button>
            </DeleteButton>
        </div>
    )
}
