import { Formik, FormikConfig, FormikValues } from "formik";
import { ReactNode } from 'react'

interface FormContextProviderProps extends FormikConfig<FormikValues> {
    children: ReactNode
}

export function FormContextProvider(props: FormContextProviderProps) {
    const { children, ...rest } = props
    return (
        <Formik {...rest}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>{children}</form>
            )}
        </Formik>
    )
}