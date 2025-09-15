import {
    Root as DialogRoot,
    Trigger as DialogTrigger,
    Content as DialogContent,
    Portal as DialogPortal,
    Close as DialogClose,
    DialogContentProps,
    DialogOverlay,
    DialogTitle
} from '@radix-ui/react-dialog'
import { forwardRef, HTMLProps } from 'react'
import { cn } from '@/lib/utils'

interface FloatingModalProps
    extends DialogContentProps,
        HTMLProps<HTMLDivElement> {}

export const FloatingModalContent = forwardRef<
    HTMLDivElement,
    FloatingModalProps
>(({ children, className, ...props }, forwardedRef) => (
    <DialogPortal>
        <DialogOverlay className='fixed inset-0 backdrop-blur-md bg-blackA6 data-[state=open]:animate-overlayShow' />
        <DialogContent
            className={cn(
                className,
                'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow'
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </DialogContent>
    </DialogPortal>
))

export const FloatingModalRoot = DialogRoot
export const FloatingModalTrigger = DialogTrigger
export const FloatingModalClose = DialogClose
export const FloatingModalTitle = DialogTitle