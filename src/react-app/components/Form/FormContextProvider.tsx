import { Formik, FormikConfig, FormikValues } from "formik";

interface FormContextProviderProps extends FormikConfig<FormikValues>  {
}

export function FormContextProvider(props: FormContextProviderProps) {
    const { children, ...rest } = props;
    return <Formik {...rest}>
        {children}
    </Formik>
}

