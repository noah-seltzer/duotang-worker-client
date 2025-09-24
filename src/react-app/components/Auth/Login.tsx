import { useMsal } from '@azure/msal-react'
import { loginRequest } from '@/data/auth-config.ts'
import { Button } from '@/components/Skeleton/Button'

export function Login() {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            console.log(e)
        })
    }

    return (
        <Button variant='naked' onClick={handleLogin}>
            Login
        </Button>
    )
}
