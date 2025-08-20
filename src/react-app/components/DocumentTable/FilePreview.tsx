'use client'
import { memo, Suspense, use } from 'react'
import localforage from 'localforage'
import type { FileInfo } from '../../types/FileInfo'
import { getFileExtensionFromName } from '../../lib/files'
import { HoverCard } from '../Skeleton/HoverCard'
import { FileFrame } from './FileFrame'
import { Cross1Icon } from '@radix-ui/react-icons'
import { DeleteButton } from '../Input/DeleteButton'

interface FilePreviewsProps {
    row: FileInfo
}

export function FilePreviews({ row }: FilePreviewsProps): React.JSX.Element {
    const fileIds = [...(row?.fileIds?.map((f) => f.id) || [])]

    if (fileIds.length === 0) return <>None</>

    return (
        <div className='flex flex-row gap-2'>
            <MemoPreview files={fileIds} onClick={() => {}} />
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
    onClick: () => void
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
                        <DeleteButton onClick={() => console.log('delete file', file)} />
                    </Suspense>
                </div>
            ))}
        </div>
    )
})
