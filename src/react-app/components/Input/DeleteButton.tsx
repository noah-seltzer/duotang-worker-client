import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons'
import { MouseEventHandler, useState } from 'react'
import { IconButton } from '../Skeleton/IconButton'

interface DeleteButtonProps {
    onClick: MouseEventHandler<HTMLDivElement>
}

const UNCLICKED = 'UNCLICKED'
const TOCONFIRM = 'TOCONFIRM'
const LOADING = 'LOADING'

type ButtonState = typeof UNCLICKED | typeof TOCONFIRM | typeof LOADING

export function DeleteButton({ onClick }: DeleteButtonProps) {
    const [buttonState, setButtonState] = useState<ButtonState>(UNCLICKED)

    return (
        <>
            {buttonState === UNCLICKED && (
                <IconButton onClick={() => setButtonState(TOCONFIRM)}>
                    <Cross1Icon />
                </IconButton>
            )}
            {buttonState === TOCONFIRM && (
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <div>Delete File?</div>
                    <div className='flex flex-row gap-1'>
                        <IconButton onClick={() => setButtonState(UNCLICKED)}>
                            <Cross1Icon />
                        </IconButton>
                        <IconButton
                            className='hover:bg-green-500'
                            onClick={(e) => {
                                setButtonState(LOADING)
                                onClick(e)
                            }}
                        >
                            <CheckIcon />
                        </IconButton>
                    </div>
                </div>
            )}
            {buttonState === LOADING && <>Loading...</>}
        </>
    )
}
