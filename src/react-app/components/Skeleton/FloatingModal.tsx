import {
    Root as DialogRoot,
    Trigger as DialogTrigger,
    Content as DialogContent,
    Portal as DialogPortal,
    Close as DialogClose,
    DialogTriggerProps,
    DialogContentProps,
    DialogProps,
    DialogCloseProps,
    DialogOverlay,
    DialogTitleProps,
    DialogTitle
} from '@radix-ui/react-dialog'
import { ReactElement, Children } from 'react'
import { getChildrenOfType } from '../../lib/component-children'
import { classNames } from '../../lib/tw'

interface FloatingModalTriggerProps extends DialogTriggerProps {}
export function FloatingModalTrigger(props: FloatingModalTriggerProps) {
    return <DialogTrigger {...props} />
}

interface FloatingModalContentProps extends DialogContentProps {}
export function FloatingModalContent(props: FloatingModalContentProps) {
    const { className, ...rest } = props
    return (
        <DialogContent
            className={classNames(
                className,
                'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray1 p-[25px] shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow'
            )}
            {...rest}
        />
    )
}

interface FloatingModalTitleProps extends DialogTitleProps {}
export function FloatingModalTitle(props: FloatingModalTitleProps) {
    return <DialogTitle {...props} />
}

interface FloatingModalCloseProps extends DialogCloseProps {}
export function FloatingModalClose(props: FloatingModalCloseProps) {
    return <DialogClose {...props} />
}

interface FloatingModalProps extends DialogProps {}

export function FloatingModalRoot(props: FloatingModalProps) {
    const { children, ..._props } = props
    const childArray = Children.toArray(children) as ReactElement[]
    const button = getChildrenOfType(childArray, FloatingModalTrigger)
    const content = getChildrenOfType(childArray, FloatingModalContent)
    const title = getChildrenOfType(childArray, FloatingModalTitle)
    return (
        <DialogRoot {..._props}>
            {button}
            <DialogPortal>
                <DialogOverlay className='fixed inset-0 backdrop-blur-md bg-blackA6 data-[state=open]:animate-overlayShow' />
                {title}
                {content}
            </DialogPortal>
        </DialogRoot>
    )
}

export const FloatingModal = {
    Root: FloatingModalRoot,
    Trigger: FloatingModalContent,
    Content: FloatingModalTrigger,
    Title: FloatingModalTitle
}
