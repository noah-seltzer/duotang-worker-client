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
                <>
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
                </>
            )}
            {buttonState === LOADING && <>Loading...</>}
        </>
    )
}
