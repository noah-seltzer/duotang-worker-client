import {
    DetailedHTMLProps,
    FormHTMLAttributes,
    InputHTMLAttributes,
    useId
} from 'react'
import { classNames } from '../../lib/tw'

interface FormRootProps
    extends DetailedHTMLProps<
        FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    > {}
export function FormRoot(props: FormRootProps) {
    const { className, children, ...rest } = props
    return (
        <form {...rest}>
            <div className={classNames('space-y-12', className)}>
                {props.children}
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                <div className='sm:col-span-4'>
                    <label
                        htmlFor='username'
                        className='block text-sm/6 font-medium text-white'
                    >
                        Username
                    </label>
                    <div className='mt-2'>
                        <div className='flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500'>
                            <div className='shrink-0 text-base text-gray-400 select-none sm:text-sm/6'>
                                workcation.com/
                            </div>
                            <input
                                id='username'
                                name='username'
                                type='text'
                                placeholder='janesmith'
                                className='block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

interface FormInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {}

interface FormTextInputProps extends FormInputProps {
    label?: string
    labelClassNames?: string
    prefix?: string
    id?: string
    formName?: string
    placeHolder?: string
}
export function FormTextInput(props: FormTextInputProps) {
    const {
        label = undefined,
        placeHolder = '',
        labelClassNames = undefined,
        prefix = undefined,
        formName = undefined,
        className = undefined,
        ...rest
    } = props
    const id = useId() + !!formName ? `-${formName}` : ''
    return (
        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
                {label && (
                    <label
                        htmlFor={id}
                        className='block text-sm/6 font-medium text-white'
                    >
                        {label}
                    </label>
                )}
                <div className='mt-2'>
                    <div className='flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500'>
                        {prefix && (
                            <div className='shrink-0 text-base text-gray-400 select-none sm:text-sm/6'>
                                {prefix}
                            </div>
                        )}
                        <input
                            id={id}
                            name={formName || id}
                            type='text'
                            placeholder={placeHolder}
                            className={classNames(
                                'block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6',
                                className
                            )}
                            {...rest}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
