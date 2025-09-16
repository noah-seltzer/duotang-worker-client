import * as React from 'react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/Skeleton/Button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/Skeleton/Popover'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator
} from '@/components/Skeleton/Command'
import { Badge } from '@/components/Skeleton/Badge'
import { Label } from '@/components/Skeleton/Label'
import { useId } from 'react'
import { WidthBox } from '@/components/Layout/WidthBox'
import { Cross1Icon } from '@radix-ui/react-icons'

export type OptionType = {
    label: string
    value: string
}

interface MultiSelectProps {
    options: OptionType[]
    selected: string[]
    onSelect: (selected: string[]) => void
    className?: string
    placeholder?: string
    align?: 'center' | 'end' | 'start' | undefined
    label?: string
}

export function MultiSelect({
    options,
    selected,
    onSelect,
    className,
    align,
    label = undefined,
    ...props
}: MultiSelectProps) {
    const id = useId()
    const [open, setOpen] = React.useState(false)

    const handleUnselect = (item: string) => {
        if (onSelect) {
            onSelect(selected.filter((i) => i !== item))
        }
    }

    return (
        <WidthBox>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className='space-y-2'>
                        {label && <Label htmlFor={id}>{label}</Label>}
                        <Button
                            name={id}
                            variant='outline'
                            role='combobox'
                            aria-expanded={open}
                            className={`w-full justify-between ${
                                selected.length > 1 ? 'h-full' : 'h-10'
                            }`}
                            onClick={() => setOpen(!open)}
                        >
                            <div className='flex gap-1 flex-wrap'>
                                {selected.length > 0 ? (
                                    options
                                        .filter((option) =>
                                            selected.includes(option.value)
                                        )
                                        .map((option) => (
                                            <Badge
                                                variant='secondary'
                                                key={option.value}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleUnselect(option.value)
                                                }}
                                            >
                                                {option.label}
                                                <div
                                                    className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleUnselect(
                                                                option.value
                                                            )
                                                        }
                                                    }}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                    }}
                                                    onClick={() =>
                                                        handleUnselect(
                                                            option.value
                                                        )
                                                    }
                                                >
                                                    <Cross1Icon className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                                                </div>
                                            </Badge>
                                        ))
                                ) : (
                                    <span className='text-muted-foreground'>
                                        {props.placeholder ??
                                            'Select options...'}
                                    </span>
                                )}
                            </div>
                        </Button>
                    </div>
                </PopoverTrigger>
                <PopoverContent align={align} className='w-full p-0'>
                    <Command className={className}>
                        <CommandInput placeholder='Search ...' />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected = selected.includes(
                                        option.value
                                    )
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={(currentValue) => {
                                                if (isSelected) {
                                                    onSelect(
                                                        selected.filter(
                                                            (item) =>
                                                                item !==
                                                                currentValue
                                                        )
                                                    )
                                                } else {
                                                    onSelect([
                                                        ...selected,
                                                        currentValue
                                                    ])
                                                }
                                                setOpen(true)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    isSelected
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            {selected.length > 0 && (
                                <>
                                    <CommandSeparator />
                                    <CommandGroup>
                                        <CommandItem
                                            onSelect={() => onSelect([])}
                                            className='justify-center text-center'
                                        >
                                            Clear selection
                                        </CommandItem>
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </WidthBox>
    )
}
