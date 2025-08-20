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

interface PopoverProps {
    children: ReactNode
    trigger: ReactNode
}

export function Popover({ children, trigger }: PopoverProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <Root open={isOpen} onOpenChange={setIsOpen}>
            <Trigger asChild={true}>{trigger}</Trigger>
            <Anchor />
            <Portal>
                <Content side='right' className='bg-black rounded-md py-4 px-2'>
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
