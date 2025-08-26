'use client'
import { Suspense, use } from 'react'
import { getFileExtensionFromName } from '../../lib/files'
import { HoverCard } from '../Skeleton/HoverCard'
import { FileFrame } from './FileFrame'
import { DeleteButton } from '../Input/DeleteButton'
import { useAppDispatch, useAppSelector } from '../../store'
import { fileSelectors, selectFileById } from '../../store/fileListSlice'
import localforage from 'localforage'
import { deleteFilesFromRow } from '../../store/fileListThunks'
import { DisplayName } from './FileNamePreview'

interface FilePreviewProps {
    fileId: string
}

export function FilePreview({ fileId }: FilePreviewProps) {
    const fileMeta = useAppSelector((state) => selectFileById(state, fileId))
    const dispatch = useAppDispatch()
    const ext = getFileExtensionFromName(fileMeta.name)

    if (ext !== 'pdf' && ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png')
        return 'Cannot Display'

    const promise = localforage.getItem(fileId) as Promise<File>

    return (
        <div className='flex flex-row items-center gap-2'>
            <Suspense fallback={<div className='h-8 w-32'>Loading...</div>}>
                <FileLoader fileId={fileId} filePromise={promise} />
                <DisplayName fileId={fileId} />
                <DeleteButton
                    confirmMessage='Delete File? This cannot be undone.'
                    onClick={() => dispatch(deleteFilesFromRow([fileMeta]))}
                />
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
    const fileMeta = useAppSelector((state) =>
        fileSelectors.selectById(state, fileId)
    )

    const file = use(filePromise)

    const url = URL.createObjectURL(file as File)

    const trigger = (
        <div className='h-8 overflow-hidden'>
            <FileFrame url={url} />
        </div>
    )
    return (
        <HoverCard trigger={trigger}>
            <div className='bg-black p-2 flex flex-col items-center gap-2 rounded-md'>
                <FileFrame url={url} width={200} height={200} />
                {fileMeta.name}
            </div>
        </HoverCard>
    )
}
