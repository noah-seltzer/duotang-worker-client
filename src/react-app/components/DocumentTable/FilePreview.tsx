'use client'
import { memo, Suspense, use } from 'react'
import localforage from 'localforage'
import type { FileInfo } from '../../types/FileInfo'
import { getFileExtensionFromName } from '../../lib/files'
import { HoverCard } from '../Skeleton/HoverCard'
import { FileFrame } from './FileFrame'

interface FilePreviewsProps {
    row: FileInfo
}

export function FilePreviews({ row }: FilePreviewsProps): React.JSX.Element {
    const fileIds = [...(row?.fileIds?.map((f) => f.id) || [])]

    if (row.docType.marad)
        fileIds.push(...(row?.maradFileIds?.map((f) => f.id) || []))

    if (fileIds.length === 0) return <>None</>

    return (
        <div className='flex flex-row gap-2'>
            <MemoPreview files={fileIds} />
        </div>
    )
}

async function loadFile(fileId: string): Promise<File | null> {
    return localforage.getItem(fileId)
}

function FilePreview({ filePromise }: { filePromise: Promise<File | null> }) {
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
        <HoverCard trigger={trigger}>
            <FileFrame url={url} width={200} height={200} />
        </HoverCard>
    )
}

const MemoPreview = memo(function SuspendedPreview({
    files
}: {
    files: string[]
}) {
    return (
        <div className='flex flex-col gap-2'>
            {files.map((file) => (
                <div key={file}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <FilePreview filePromise={loadFile(file)} key={file} />
                    </Suspense>
                </div>
            ))}
        </div>
    )
})
