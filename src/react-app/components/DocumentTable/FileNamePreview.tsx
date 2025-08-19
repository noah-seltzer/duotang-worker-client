import { createFileNamePreviews } from '../../lib/files'
import type { ClientInfo } from '../../types/ClientInfo'
import type { FileInfo } from '../../types/FileInfo'

export function DisplayName({ name }: { name: string }) {
    const isOverflow = name.length > 20
    const displayName = isOverflow ? `${name.slice(0, 20)}...` : name
    return (
        <span title={name} className={isOverflow ? 'overflow' : ''}>
            {displayName}
        </span>
    )
}

interface FileNamePreviewProps {
    fileInfo: FileInfo
    clientInfo: ClientInfo
    index: number
}

/**
 * Displays the computed filenames the system will use on export of a file
 */
export function FileNamePreview({
    fileInfo,
    clientInfo,
    index
}: FileNamePreviewProps) {
    if (!fileInfo || !clientInfo) return 'None'
    const filenames = createFileNamePreviews(fileInfo, clientInfo, index)
    return (
        <div className='flex flex-col gap-1'>
            {filenames.map((name) => (
                <DisplayName key={name} name={name} />
            ))}
        </div>
    )
}
