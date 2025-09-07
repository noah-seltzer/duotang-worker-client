import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon
} from '@radix-ui/react-icons'
import {
    Root as SelectRoot,
    Trigger as SelectTrigger,
    Content as SelectContent,
    Viewport as SelectViewport,
    Portal as SelectPortal,
    Value as SelectValue,
    Item as SelectItem,
    ItemText as SelectItemText,
    ItemIndicator as SelectItemIndicator,
    ScrollUpButton as SelectScrollUpButton,
    ScrollDownButton as SelectScrollDownButton,
    Icon as SelectIcon,
    SelectTriggerProps,
    SelectItemProps,
    SelectContentProps,
    SelectProps
} from '@radix-ui/react-select'
import { forwardRef } from 'react'
import { classNames } from '../../lib/tw'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

export const Selector = forwardRef<
    HTMLButtonElement,
    SelectTriggerProps & SelectProps
>(({ children, className, onValueChange, value, ...props }, forwardedRef) => {
    return (
        <SelectRoot onValueChange={onValueChange} value={value}>
            <SelectTrigger
                className={classNames(
                    'grid w-full cursor-default grid-cols-1 rounded-md bg-gray-800/50 py-1.5 pr-2 pl-3 text-left text-white outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6',
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                <span className='col-start-1 row-start-1 flex items-center gap-3 pr-6'>
                    <span className='block truncate'>
                        <SelectValue />
                    </span>
                </span>
                <SelectIcon asChild={true}>
                    <ChevronUpDownIcon
                        aria-hidden='true'
                        className='col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4'
                    />
                </SelectIcon>
            </SelectTrigger>
            {children}
        </SelectRoot>
    )
})

export const SelectorContent = forwardRef<HTMLDivElement, SelectContentProps>(
    (
        {
            children,
            className,
            side = 'bottom',
            sideOffset = 5,
            position = 'popper',
            ...props
        },
        forwardedRef
    ) => {
        return (
            <SelectPortal>
                <>
                <SelectContent
                    position={position}
                    side={side}
                    sideOffset={5}
                    className={classNames(
                        'SelectContent absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm',
                        className
                    )}
                    {...props}
                    ref={forwardedRef}
                    >
                    <SelectScrollUpButton>
                        <ChevronUpIcon />
                    </SelectScrollUpButton>
                    <SelectViewport>{children}</SelectViewport>
                    <SelectScrollDownButton>
                        <ChevronDownIcon />
                    </SelectScrollDownButton>
                </SelectContent>
                <style>
                    {`.SelectContent {
                            width: var(--radix-select-trigger-width);
                            max-height: var(--radix-select-content-available-height);
                            }`}
                </style>
                            </>
            </SelectPortal>
        )
    }
)

export const SelectorItem = forwardRef<HTMLDivElement, SelectItemProps>(
    ({ children, className, ...props }, forwardedRef) => {
        return (
            <SelectItem
                className={classNames(
                    'group relative cursor-default py-2 pr-9 pl-3 text-white select-none data-focus:bg-indigo-500 data-focus:outline-hidden',
                    className
                )}
                {...props}
                ref={forwardedRef}
            >
                <div className='flex items-center'>
                    <span className='ml-3 block truncate font-normal group-data-selected:font-semibold'>
                        <SelectItemText>{children}</SelectItemText>
                    </span>
                </div>

                <SelectItemIndicator asChild={true}>
                    <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-data-selected:hidden group-data-focus:text-white'>
                        <CheckIcon aria-hidden='true' className='size-5' />
                    </span>
                </SelectItemIndicator>
            </SelectItem>
        )
    }
)

export const SelectorRoot = SelectRoot
