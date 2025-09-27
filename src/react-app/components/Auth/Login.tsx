import { useMsal } from '@azure/msal-react'
import { loginRequest } from '@/data/auth-config.ts'
import { Button, ButtonProps } from '@/components/Skeleton/Button'

export function Login({ variant = 'naked', ...props }: ButtonProps) {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            console.log(e)
        })
    }

    return (
        <Button variant={variant} {...props} onClick={handleLogin}>
            Login
        </Button>
    )
}
