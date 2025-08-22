import {
    Root,
    Trigger,
    Portal,
    Anchor,
    Content,
    Arrow,
    Close
} from '@radix-ui/react-popover'
import { Cross1Icon } from '@radix-ui/react-icons'
import { ReactNode, useState } from 'react'

type SIDE = 'right' | 'top' | 'bottom' | 'left' | undefined

interface PopoverProps {
    children: ReactNode
    trigger: ReactNode
    side?: SIDE
    open?: boolean
    onOpenChange?: (isOpen: boolean) => void
}

export function Popover({
    children,
    trigger,
    side = 'right',
    open = undefined,
    onOpenChange = () => {}
}: PopoverProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const shouldUseParentOpen = open === undefined

    return (
        <Root
            open={shouldUseParentOpen ? open : isOpen}
            onOpenChange={shouldUseParentOpen ? setIsOpen : onOpenChange}
        >
            <Trigger asChild={true}>{trigger}</Trigger>
            <Anchor />
            <Portal>
                <Content side={side} className='bg-black rounded-md py-4 px-2'>
                    <Close>
                        <Cross1Icon />
                    </Close>
                    {children}
                    <Arrow />
                </Content>
            </Portal>
        </Root>
    )
}
