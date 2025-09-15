import { FormInputProps } from '@/components/Form/FormTextInput'
import { cn } from '@/lib/utils'

export interface FormCheckboxInputProps extends FormInputProps {
    label: string
    subLabel?: string
    checkedLabelStyles?: string
}

export function FormCheckboxInput(props: FormCheckboxInputProps) {
    const { label, subLabel, checked, checkedLabelStyles, ...rest } = props
    return (
        <div className='flex gap-3'>
            <div className='flex h-6 shrink-0 items-center'>
                <div className='group grid size-4 grid-cols-1'>
                    <input
                        checked={checked}
                        id='comments'
                        name='comments'
                        type='checkbox'
                        aria-describedby='comments-description'
                        className='col-start-1 row-start-1 appearance-none rounded-sm border border-white/10 bg-white/5 checked:border-indigo-500 checked:bg-indigo-500 indeterminate:border-indigo-500 indeterminate:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:border-white/5 disabled:bg-white/10 disabled:checked:bg-white/10 forced-colors:appearance-auto'
                        {...rest}
                    />
                    <svg
                        fill='none'
                        viewBox='0 0 14 14'
                        className='pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-white/25'
                    >
                        <path
                            d='M3 8L6 11L11 3.5'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-checked:opacity-100'
                        />
                        <path
                            d='M3 7H11'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='opacity-0 group-has-indeterminate:opacity-100'
                        />
                    </svg>
                </div>
            </div>
            <div className='text-sm/6'>
                <label
                    htmlFor='comments'
                    className={cn('font-medium text-white', checkedLabelStyles)}
                >
                    {label}
                </label>
                {subLabel && (
                    <p id='comments-description' className='text-gray-400'>
                        {subLabel}
                    </p>
                )}
            </div>
        </div>
    )
}
