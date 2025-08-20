import {
    Root,
    Trigger,
    Portal,
    Content,
    Arrow
} from '@radix-ui/react-hover-card'
import { ReactNode, useState } from 'react'

interface HoverCardProps {
    children: ReactNode
    trigger: ReactNode
    closeOnHover?: boolean
}

export function HoverCard({ children, trigger, closeOnHover = false }: HoverCardProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const onMouseOver = closeOnHover ? () => setIsOpen(false) : () => {}
    return (
        <Root
            open={isOpen}
            onOpenChange={setIsOpen}
            openDelay={100}
            closeDelay={50}
        >
            <Trigger asChild={true}>{trigger}</Trigger>
            <Portal>
                <Content side='top' onMouseOver={onMouseOver}>
                    {children}
                    <Arrow />
                </Content>
            </Portal>
        </Root>
    )
}
