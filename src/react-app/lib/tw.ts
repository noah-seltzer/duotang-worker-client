import { twMerge } from 'tailwind-merge'

export const classNames = (...classNames: (string | undefined)[]) =>
    twMerge([...classNames])
