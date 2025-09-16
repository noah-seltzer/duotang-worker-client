import { UKRANIAN_MARINER_DOCUMENT_LIST } from '@/data/document-list'
import { getDocumentRowType } from '@/lib/files'
import { DocumentType } from '@/types/DocumentRowType'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from '@/components/Skeleton/Select'
import { CheckIcon } from '@radix-ui/react-icons'
import { useAppSelector } from '@/store'
import { selectCurrentClient } from '@/store/clientInfoSlice'
import { selectListById, selectListItemsByIds } from '@/store/listBuilderSlice'
import { ClientInfo } from '@/types/ClientInfo'

export interface SelectOption {
    value: string
    label: string
}

interface FileTypeSelectorProps {
    currentOption: DocumentType
    onChange: (value: DocumentType) => void
}

export function FileTypeSelector({
    currentOption,
    onChange
}: FileTypeSelectorProps) {
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

    const options = items.map((docType) => ({
        value: docType.slug,
        label: docType.label
    }))

    const onSelect = (value: string) => {
        const newDocType = getDocumentRowType(value, items)
        onChange(newDocType)
    }
    return (
        <div>
            <Select value={currentOption.slug} onValueChange={onSelect}>
                <SelectTrigger>{currentOption.label}</SelectTrigger>
                <SelectContent>
                    <div>
                        {options.map((option) => {
                            return (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                    className='group relative cursor-pointer py-2 pr-9 pl-3 text-white select-none data-focus:bg-indigo-500 data-focus:outline-hidden hover:bg-gray-500'
                                >
                                    <div className='flex items-center'>
                                        <span className='ml-3 block truncate font-normal group-data-selected:font-semibold'>
                                            {option.label}
                                        </span>
                                    </div>

                                    <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-data-selected:hidden group-data-focus:text-white'>
                                        <CheckIcon
                                            aria-hidden='true'
                                            className='size-5'
                                        />
                                    </span>
                                </SelectItem>
                            )
                        })}
                    </div>
                </SelectContent>
            </Select>
        </div>
    )
}
