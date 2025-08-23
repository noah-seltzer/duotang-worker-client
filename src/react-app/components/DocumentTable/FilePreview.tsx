'use client'
import { Suspense, use } from 'react'
import { getFileExtensionFromName } from '../../lib/files'
import { HoverCard } from '../Skeleton/HoverCard'
import { FileFrame } from './FileFrame'
import { DeleteButton } from '../Input/DeleteButton'
import { useAppDispatch, useAppSelector } from '../../store'
import { loadFromLocalCache } from '../../lib/cache'
import { fileSelectors } from '../../store/fileListSlice'
import localforage from 'localforage'

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
                        {/* <DeleteButton onClick={() => deleteFile(id)} /> */}
                        <DeleteButton
                            onClick={() => console.log('deleting file')}
                        />
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
    const fileMeta = useAppSelector((state) =>
        fileSelectors.selectById(state, fileId)
    )
    const ext = getFileExtensionFromName(fileMeta.name)
    if (ext !== 'pdf' && ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png')
        return 'Cannot Display'

    return (
        <div className='flex flex-row items-center gap-2'>
            <Suspense fallback={<div className='h-8 w-32'>Loading...</div>}>
                <FileLoader fileId={fileId} />
            </Suspense>
        </div>
    )
}

function FileLoader({ fileId }: { fileId: string }) {
    const fileMeta = useAppSelector((state) =>
        fileSelectors.selectById(state, fileId)
    )
    const file = use(localforage.getItem(fileId))
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
