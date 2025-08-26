import {
    ChangeEventHandler,
    DetailedHTMLProps,
    FocusEventHandler,
    InputHTMLAttributes,
    useId
} from 'react'
import { classNames } from '../../lib/tw'
import { useField } from 'formik'
export interface FormInputProps
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {}

interface FormTextInputProps extends FormInputProps {
    label?: string
    labelClassNames?: string
    prefix?: string
    placeHolder?: string
}

export function FormTextInput(props: FormTextInputProps) {
    const {
        label = undefined,
        labelClassNames = undefined,
        prefix = undefined,
        placeHolder = '',
        className = undefined,
        onChange = () => {},
        onBlur = () => {},
        name,
        value,
        ...rest
    } = props

    const id = useId() + !!name ? `-${name}` : ''

    const [field, meta] = useField(name)
    const {
        onBlur: formikOnBlur,
        onChange: formikOnChange,
        value: formikValue
    } = field

    const onInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
        formikOnBlur(e)
        onBlur(e)
    }

    const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        formikOnChange(e)
        onChange(e)
    }

    return (
        <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
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
                            name={name}
                            type='text'
                            placeholder={placeHolder}
                            className={classNames(
                                'block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6',
                                className
                            )}
                            onBlur={onInputBlur}
                            onChange={onInputChange}
                            value={value || formikValue}
                            {...rest}
                        />
                        {meta.touched && meta.error ? (
                            <div className='text-red-500 text-xs'>
                                {meta.error}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
