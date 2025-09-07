import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { HTMLProps, MouseEventHandler } from 'react'

import {
    FloatingModalTrigger,
    FloatingModalContent,
    FloatingModalRoot,
    FloatingModalClose,
    FloatingModalTitle
} from '../Skeleton/FloatingModal'

import { Button, NakedButton } from '../Skeleton/Button'
import { FormHeading } from '../Form/FormHeading'
interface DeleteButtonProps extends HTMLProps<HTMLButtonElement> {
    onClick: MouseEventHandler<HTMLButtonElement>
    confirmTitle?: string
    confirmMessage?: string
}

export function DeleteButton({
    confirmTitle = 'Are you sure?',
    confirmMessage = undefined,
    onClick,
    children
}: DeleteButtonProps) {
    return (
        <>
            <FloatingModalRoot>
                <FloatingModalTrigger asChild={true}>
                    {children || (
                        <NakedButton>
                            <Cross1Icon />
                        </NakedButton>
                    )}
                </FloatingModalTrigger>
                <FloatingModalContent>
                    <div className='min-w-64 flex flex-col bg-gray-700 gap-3 items-center justify-center border-1 rounded-lg fixed px-6 py-2'>
                        <FloatingModalTitle className='text-2xl'>
                            <FormHeading
                                heading={confirmTitle}
                                subHeading={confirmMessage}
                            />
                        </FloatingModalTitle>
                        <div className='inline-flex rounded-md shadow-xs gap-6'>
                            <FloatingModalClose asChild={true}>
                                <Button className='bg-red-500 px-8'>
                                    <Cross1Icon className='text-stone-100' />
                                </Button>
                            </FloatingModalClose>
                            <FloatingModalClose asChild={true}>
                                <Button
                                    onClick={(e) => {
                                        onClick(e)
                                    }}
                                    className='bg-green-500 px-8'
                                >
                                    <CheckIcon className='text-stone-100 h-6 w-6' />
                                </Button>
                            </FloatingModalClose>
                        </div>
                    </div>
                </FloatingModalContent>
            </FloatingModalRoot>
        </>
    )
}
