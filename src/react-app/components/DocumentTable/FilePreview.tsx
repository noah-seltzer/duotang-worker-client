'use client'
import { memo, Suspense, use } from 'react'
import localforage from 'localforage'
import type { FileInfo } from '../../types/FileInfo'
import { getFileExtensionFromName } from '../../lib/files'
import { HoverCard } from '../Skeleton/HoverCard'
import { FileFrame } from './FileFrame'
import { Cross1Icon } from '@radix-ui/react-icons'
import { DeleteButton } from '../Input/DeleteButton'
import { useAppDispatch } from '../../store'
import { updateFileRow } from '../../store/fileListSlice'

interface FilePreviewsProps {
    row: FileInfo
}

export function FilePreviews({ row }: FilePreviewsProps): React.JSX.Element {
    const fileIds = [...(row?.fileIds?.map((f) => f.id) || [])]
    const dispatch = useAppDispatch()

    if (fileIds.length === 0) return <>None</>

    function deleteFile(fileId: string) {
        localforage.removeItem(fileId)
        const newFileIds = row.fileIds.filter((file) => file.id !== fileId)
        dispatch(updateFileRow({ ...row, fileIds: newFileIds }))
    }
    return (
        <div className='flex flex-row gap-2'>
            <MemoPreview files={fileIds} onClick={deleteFile} />
        </div>
    )
}

async function loadFile(fileId: string): Promise<File | null> {
    return localforage.getItem(fileId)
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
                <FileFrame url={url} width={200} height={200} />
            </HoverCard>
        </div>
    )
}

interface MemoPreviewProps {
    files: string[]
    onClick: (file: string) => void
}

const MemoPreview = memo(function SuspendedPreview({
    files,
    onClick
}: MemoPreviewProps) {
    return (
        <div className='flex flex-col gap-2'>
            {files.map((file) => (
                <div key={file} className='flex flex-row items-center gap-2'>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FilePreview filePromise={loadFile(file)} key={file} />
                        <DeleteButton onClick={() => onClick(file)} />
                    </Suspense>
                </div>
            ))}
        </div>
    )
})
