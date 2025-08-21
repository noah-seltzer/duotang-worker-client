import { MouseEventHandler } from 'react'
import { classNames } from '../../lib/tw'

interface IconButtonProps {
    children: React.ReactNode
    onClick: MouseEventHandler<HTMLDivElement>
    className?: string
}

export function IconButton({ children, onClick, className }: IconButtonProps) {
    return (
        <div
            className={classNames(
                'hover:bg-red-500 p-1 rounded-md cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
