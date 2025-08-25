// import Select from 'react-select'

import { DOCUMENT_TYPES } from '../../data/document-list'
import { getDocumentRowType } from '../../lib/files'
import { DocumentRowType } from '../../types/DocumentRowType'
import {
    Root as SelectRoot,
    Trigger as SelectTrigger,
    Content as SelectContent,
    Viewport as SelectViewport,
    Group as SelectGroup,
    Item as SelectItem
} from '@radix-ui/react-select'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

export interface SelectOption {
    value: string
    label: string
}

interface FileTypeSelectorProps {
    currentOption: DocumentRowType
    onChange: (value: DocumentRowType) => void
}

export function FileTypeSelector({
    currentOption,
    onChange
}: FileTypeSelectorProps) {
    const options = DOCUMENT_TYPES.map((docType) => ({
        value: docType.slug,
        label: docType.label
    }))

    const onSelect = (value: string) => {
        const newDocType = getDocumentRowType(value)
        onChange(newDocType)
    }
    return (
        <div>
            <SelectRoot onValueChange={onSelect}>
                <SelectTrigger asChild={true}>
                    <div className='grid w-full cursor-default grid-cols-1 rounded-md bg-gray-800/50 py-1.5 pr-2 pl-3 text-left text-white outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6'>
                        <span className='col-start-1 row-start-1 flex items-center gap-3 pr-6'>
                            <span className='block truncate'>
                                {currentOption.label}
                            </span>
                        </span>
                        <ChevronUpDownIcon
                            aria-hidden='true'
                            className='col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4'
                        />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectViewport className='backdrop-blur-2xl'>
                        <SelectGroup>
                            {options.map((option) => {
                                return (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                        className='group relative cursor-default py-2 pr-9 pl-3 text-white select-none data-focus:bg-indigo-500 data-focus:outline-hidden'
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
                        </SelectGroup>
                    </SelectViewport>
                </SelectContent>
            </SelectRoot>
        </div>
    )
}
