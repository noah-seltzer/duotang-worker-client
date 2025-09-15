import { MouseEventHandler } from 'react'
import { cn } from '@/lib/utils'

interface IconButtonProps {
    children: React.ReactNode
    onClick: MouseEventHandler<HTMLDivElement>
    className?: string
}

export function IconButton({ children, onClick, className }: IconButtonProps) {
    return (
        <div
            className={cn(
                'hover:bg-red-500 p-1 rounded-md cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
