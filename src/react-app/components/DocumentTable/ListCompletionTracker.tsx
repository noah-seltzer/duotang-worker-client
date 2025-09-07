import {
    CheckIcon,
} from '@radix-ui/react-icons'
import { classNames } from '../../lib/tw'
import { useAppSelector } from '../../store'
import { selectRowsByIds } from '../../store/fileListSlice'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { selectDocumentListById } from '../../store/clientInfoSlice'

interface UnorderedListItemProps {
    checked: boolean
    label: string
}

export function ListCompletionTracker({ listId }: { listId: string }) {
    const list = useAppSelector((state) =>
        selectDocumentListById(state, listId)
    )
    const rowsIds = list.rows

    const rows = useAppSelector((state) => selectRowsByIds(state, rowsIds))

    const shouldBeChecked = (label: string) => {
        const row = rows.find((r) => r.docType.label === label)
        return row ? row.fileIds.length > 0 : false

    }
    return (
        <div className='flex flex-col justify-start'>
            <ul
                role='list'
                className={'w-72 text-gray-300 space-y-3 text-sm/6'}
            >
                {DOCUMENT_TYPES.map((d) => {
                    return (
                        <ListCompletionTrackerItem
                            key={d.label}
                            label={d.label}
                            checked={
                                shouldBeChecked(d.label)
                            }
                        />
                    )
                })}
            </ul>
        </div>
    )
}

export function ListCompletionTrackerItem({
    checked,
    label
}: UnorderedListItemProps) {
    return (
        <li key={label} className='flex flex-row items-center gap-x-3'>
            <CheckIcon
                aria-hidden='true'
                className={classNames(
                    checked ? 'text-indigo-400' : 'text-gray-700',
                    'h-6 w-5 flex-none'
                )}
            />
            {label}
        </li>
    )
}
