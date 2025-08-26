import { useFormikContext } from "formik";
import { Button, ButtonProps } from "../Skeleton/Button";

interface FormSubmitButtonProps extends ButtonProps {}

export function FormSubmitButton(props: FormSubmitButtonProps) {
    const { submitForm } = useFormikContext()
    return <Button {...props} onClick={submitForm}>
        Submit
    </Button>
}