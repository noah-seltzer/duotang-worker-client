import {
    FocusEventHandler,
    FormEventHandler,
    useId
} from 'react'
import { useField } from 'formik'
import { Input, InputProps } from '@/components/Skeleton/input'
import { Label } from '@/components/Skeleton/Label'
export interface FormInputProps extends InputProps {}
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
        onInput = () => {},
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

    const onInputChange: FormEventHandler<HTMLInputElement> = (e) => {
        formikOnChange(e)
        onInput(e)
    }

    return (
        <div className='grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-4'>
                {label && <Label htmlFor={id}>{label}</Label>}
                <div className='mt-2'>
                    {prefix && (
                        <div className='shrink-0 text-base text-gray-400 select-none sm:text-sm/6'>
                            {prefix}
                        </div>
                    )}
                    <Input
                        id={id}
                        name={name}
                        type='text'
                        placeholder={placeHolder}
                        onBlur={onInputBlur}
                        onInput={onInputChange}
                        value={value || formikValue}
                        {...rest}
                    />
                    {meta.touched && meta.error ? (
                        <div className='text-red-500 text-xs mt-2 mb-1'>
                            {meta.error}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
