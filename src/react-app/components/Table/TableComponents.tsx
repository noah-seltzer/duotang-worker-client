import { ReactNode, type PropsWithChildren } from 'react'
import { classNames } from '../../lib/tw'

export interface GenericComponentProps {
    className?: string
    children?: ReactNode
}

export function HeaderCell({ children }: PropsWithChildren) {
    return (
        <th scope='col' className='px-auto py-3 px-6'>
            {children}
        </th>
    )
}

export function Header({ children }: PropsWithChildren) {
    return (
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>{children}</tr>
        </thead>
    )
}

export function TableRow({ children, className }: GenericComponentProps) {
    return (
        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
            {children}
        </tr>
    )
}

export function TableCell({
    children,
    className
}: PropsWithChildren<GenericComponentProps>) {
    return <td className={classNames('px-6 py-3', className)}>{children}</td>
}
