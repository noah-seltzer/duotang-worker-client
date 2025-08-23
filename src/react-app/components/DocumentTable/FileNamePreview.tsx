import { createFileNamePreviews } from '../../lib/files'
import type { ClientInfo } from '../../types/ClientInfo'
import type { ListRow } from '../../types/ListRow'
import { HoverCard } from '../Skeleton/HoverCard'

export function DisplayName({ name }: { name: string }) {
    const isOverflow = name.length > 20
    const displayName = isOverflow ? `${name.slice(0, 20)}...` : name

    const trigger = (
        <span className={isOverflow ? 'overflow' : ''}>{displayName}</span>
    )

    return (
        <HoverCard closeOnHover={true} trigger={trigger}>
            <div className='bg-black rounded-md py-2 px-4'>{name}</div>
        </HoverCard>
    )
}

interface FileNamePreviewProps {
    fileInfo: ListRow
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
