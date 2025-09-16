import {
    CheckIcon,
} from '@radix-ui/react-icons'
import { useAppSelector } from '@/store'
import { selectRowsByIds } from '@/store/fileListSlice'
import { UKRANIAN_MARINER_DOCUMENT_LIST } from '@/data/document-list'
import {
    selectCurrentClient,
    selectDocumentListById
} from '@/store/clientInfoSlice'
import { cn } from '@/lib/utils'
import { selectListById, selectListItemsByIds } from '@/store/listBuilderSlice'
import { ClientInfo } from '@/types/ClientInfo'

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

    const currentClient = useAppSelector(selectCurrentClient) as ClientInfo

    const clientListType = useAppSelector((state) =>
        selectListById(state, currentClient.listTypeId as string)
    )

    const listItems = useAppSelector((state) =>
        selectListItemsByIds(state, clientListType?.listItemIds || [])
    )

    let items = UKRANIAN_MARINER_DOCUMENT_LIST

    if (clientListType && listItems.length > 0) {
        items = listItems.map((l) => ({
            label: l.label,
            slug: l.id,
            tags: [],
            marad: false
        }))
    }
    return (
        <div className='flex flex-col justify-start'>
            <ul
                role='list'
                className={'w-86 text-gray-300 space-y-3 text-sm/6'}
            >
                {items.map((d) => {
                    return (
                        <ListCompletionTrackerItem
                            key={d.label}
                            label={d.label}
                            checked={shouldBeChecked(d.label)}
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
        <li
            key={label}
            className='flex flex-row items-center gap-x-3 justify-start'
        >
            <CheckIcon
                aria-hidden='true'
                className={cn(
                    checked ? 'text-primary' : 'text-muted',
                    'h-6 w-5 flex-none'
                )}
            />
            {label}
        </li>
    )
}
