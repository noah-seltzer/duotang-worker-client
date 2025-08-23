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

interface FilePreviewsProps {
    fileIds: string[]
}

export function FilePreviews({
    fileIds
}: FilePreviewsProps): React.JSX.Element {
    if (!fileIds) {
        return <>None</>
    }

    if (fileIds.length === 0) return <>None</>

    return (
        <div className='flex flex-row gap-2'>
            <div className='flex flex-col gap-2'>
                {fileIds.map((id) => (
                    <div key={id} className='flex flex-row items-center gap-2'>
                        <FilePreview fileId={id} />
                    </div>
                ))}
            </div>
        </div>
    )
}

interface FilePreviewProps {
    fileId: string
}

function FilePreview({ fileId }: FilePreviewProps) {
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
                <DeleteButton
                    onClick={() =>
                        dispatch(deleteFilesFromRow({ files: [fileMeta] }))
                    }
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
