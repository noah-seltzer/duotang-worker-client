import {
    DetailedHTMLProps,
    FormHTMLAttributes,
    InputHTMLAttributes,
    ReactNode,
    useId
} from 'react'
import { Formik, FormikConfig, FormikValues } from 'formik'
import { classNames } from '../../lib/tw'

export interface FormRootProps
    extends DetailedHTMLProps<
        FormHTMLAttributes<HTMLFormElement>,
        HTMLFormElement
    > {}
export function FormRoot(props: FormRootProps) {
    const { className, children, ...rest } = props

    return (
        <form {...rest}>
            <div className={classNames('space-y-6', className)}>
                {props.children}
            </div>
        </form>
    )
}
