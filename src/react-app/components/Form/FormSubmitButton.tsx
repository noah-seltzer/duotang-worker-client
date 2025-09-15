import { useFormikContext } from "formik";
import { Button, ButtonProps } from '@/components/Skeleton/Button'

interface FormSubmitButtonProps extends ButtonProps {}

export function FormSubmitButton(props: FormSubmitButtonProps) {
    const { submitForm } = useFormikContext()
    const { onClick, ...rest } = props

    return (
        <Button
            {...rest}
            onClick={(e) => {
                submitForm()
                if (onClick) onClick(e)
            }}
        >
            Submit
        </Button>
    )
}