'use client'
import { Suspense, use } from 'react'
import type { FileInfo } from '../../types/FileInfo'
import { getFileExtensionFromName } from '../../lib/files'
import { HoverCard } from '../Skeleton/HoverCard'
import { FileFrame } from './FileFrame'
import { DeleteButton } from '../Input/DeleteButton'
import { useAppDispatch } from '../../store'
import { loadFromLocalCache } from '../../lib/cache'
import { deleteFileFromCache } from '../../store/fileListThunks'

interface FilePreviewsProps {
    row: FileInfo
}

export function FilePreviews({ row }: FilePreviewsProps): React.JSX.Element {
    const fileIds = [...(row?.fileIds?.map((f) => f.id) || [])]
    const dispatch = useAppDispatch()

    if (fileIds.length === 0) return <>None</>

    function deleteFile(fileId: string) {
        dispatch(deleteFileFromCache({ fileId: fileId, row }))
    }
    return (
        <div className='flex flex-row gap-2'>
            <div className='flex flex-col gap-2'>
                {fileIds.map((file) => (
                    <div
                        key={file}
                        className='flex flex-row items-center gap-2'
                    >
                        <Suspense fallback={<div>Loading...</div>}>
                            <FilePreview
                                filePromise={loadFromLocalCache(file)}
                                key={file}
                            />
                            <DeleteButton onClick={() => deleteFile(file)} />
                        </Suspense>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface FilePreviewProps {
    filePromise: Promise<File | null>
}

function FilePreview({ filePromise }: FilePreviewProps) {
    const file = use(filePromise)
    if (!file) return <div>No File</div>

    const ext = getFileExtensionFromName(file.name)
    if (ext !== 'pdf' && ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png')
        return 'Cannot Display'

    const url = URL.createObjectURL(file)

    const trigger = (
        <div className='h-8 overflow-hidden'>
            <FileFrame url={url} />
        </div>
    )

    return (
        <div className='flex flex-row items-center gap-2'>
            <HoverCard trigger={trigger}>
                <div className='bg-black p-2 flex flex-col items-center gap-2 rounded-md'>
                    <FileFrame url={url} width={200} height={200} />
                    {file.name}
                </div>
            </HoverCard>
        </div>
    )
}
