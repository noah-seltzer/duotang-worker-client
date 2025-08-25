import { classNames } from '../../lib/tw'

interface ButtonProps extends React.ComponentProps<'button'> {}

export function Button(props: ButtonProps) {
    const { className, ...rest } = props
    return (
        <button
            type='button'
            className={classNames(
                'rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20',
                className
            )}
            {...rest}
        >
            {props.children}
        </button>
    )
}

export function NakedButton(props: ButtonProps) {
    const { className, ...rest } = props
    return (
        <button
            className={classNames(
                'hover:cursor-pointer p-1 text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800',
                className
            )}
            {...rest}
        >
            {props.children}
        </button>
    )
}
