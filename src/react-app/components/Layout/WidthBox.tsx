import { cn } from '@/lib/utils'
import { HTMLProps } from 'react'


export function WidthBox({
    children,
    className,
    type = 'formelement',
    ...props
}: HTMLProps<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                'grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-full',
                className
            )}
        >
            <div className='sm:col-span-4'>{children}</div>
        </div>
    )
}
