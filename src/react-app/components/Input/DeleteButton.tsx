import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { MouseEventHandler } from 'react'

import {
    FloatingModalTrigger,
    FloatingModalContent,
    FloatingModalRoot,
    FloatingModalClose,
    FloatingModalTitle
} from '../Skeleton/FloatingModal'

import { Button, NakedButton } from '../Skeleton/Button'
interface DeleteButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>
    confirmMessage?: string
}

export function DeleteButton({ confirmMessage, onClick }: DeleteButtonProps) {
    return (
        <>
            <FloatingModalRoot>
                <FloatingModalTrigger asChild={true}>
                    <NakedButton>
                        <Cross1Icon />
                    </NakedButton>
                </FloatingModalTrigger>
                <FloatingModalContent>
                    <div className=' min-w-64 flex flex-col gap-3 items-center justify-center border-1 rounded-lg fixed px-6 py-2'>
                        <FloatingModalTitle className='text-2xl'>
                            <div>{confirmMessage || 'Are you sure?'}</div>
                        </FloatingModalTitle>
                        <div className='inline-flex rounded-md shadow-xs gap-6'>
                            <FloatingModalClose asChild={true}>
                                <Button className='bg-red-500'>
                                    <Cross1Icon className='text-stone-100' />
                                </Button>
                            </FloatingModalClose>
                            <FloatingModalClose asChild={true}>
                                <Button
                                    onClick={(e) => {
                                        onClick(e)
                                    }}
                                    className='bg-green-500'
                                >
                                    <CheckIcon className='text-stone-100' />
                                </Button>
                            </FloatingModalClose>
                        </div>
                    </div>
                </FloatingModalContent>
            </FloatingModalRoot>
        </>
    )
}
