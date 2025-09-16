import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from '@/components/Skeleton/Command'
import { cn } from '@/lib/utils'
import { FileNameComponent } from '@/types/FileNameComponent'
import { CheckIcon } from '@radix-ui/react-icons'
interface ListItemBuilderFlyout {
    fileNameComponents: FileNameComponent[]
    activeItems: string[]
    handleSelect: (item: string) => void
    handleUnselect: (item: string) => void
    handleClear: () => void
    handleCopy: () => void
    handleDelete: () => void
}

export function ListItemBuilderFlyout({
    fileNameComponents,
    activeItems,
    handleSelect,
    handleUnselect,
    handleCopy,
    handleDelete
}: ListItemBuilderFlyout) {
    return (
        <Command>
            <CommandInput placeholder='Search ...' />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {fileNameComponents.map((item) => {
                        const isSelected = activeItems.includes(item.id)
                        return (
                            <CommandItem
                                key={item.id}
                                value={item.id}
                                onSelect={(currentValue) => {
                                    if (isSelected) {
                                        handleUnselect(currentValue)
                                    } else {
                                        handleSelect(currentValue)
                                    }
                                }}
                            >
                                <CheckIcon
                                    className={cn(
                                        'mr-2 h-4 w-4',
                                        isSelected ? 'opacity-100' : 'opacity-0'
                                    )}
                                />
                                {item.label}
                            </CommandItem>
                        )
                    })}
                </CommandGroup>
                {activeItems.length > 0 && (
                    <>
                        <CommandSeparator />
                        <CommandGroup>
                            <CommandItem onSelect={() => handleCopy()}>
                                Copy Item (not supported)
                            </CommandItem>

                            <CommandItem onSelect={() => handleDelete()}>
                                Delete Item (not supported)
                            </CommandItem>
                        </CommandGroup>
                    </>
                )}
            </CommandList>
        </Command>
    )
}
