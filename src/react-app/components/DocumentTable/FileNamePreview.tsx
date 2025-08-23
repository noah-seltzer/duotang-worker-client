import { useGetFileInfo } from '../../hooks/useGenerateNewFileName'
import { useAppSelector } from '../../store'
import { selectRowById } from '../../store/fileListSlice'
import { HoverCard } from '../Skeleton/HoverCard'

interface FileNamePreviewProps {
    fileId: string
}

export function DisplayName({ fileId }: FileNamePreviewProps) {
    const { name } = useGetFileInfo(fileId)

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

interface FileNamePreviewsProps {
    rowId: string
}

/**
 * Displays the computed filenames the system will use on export of a file
 */
export function FileNamePreviews({ rowId }: FileNamePreviewsProps) {
    const row = useAppSelector((state) => selectRowById(state, rowId))

    if (row.fileIds.length === 0) {
        return <>None</>
    }

    return (
        <div className='flex flex-col gap-1'>
            {row.fileIds.map((id) => (
                <DisplayName key={id} fileId={id} />
            ))}
        </div>
    )
}
