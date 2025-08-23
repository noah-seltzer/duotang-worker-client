import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../data/auth-config.ts'
import { Button } from '../Skeleton/Button.tsx'

export function Login() {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            console.log(e)
        })
    }

    return <Button onClick={handleLogin}>Login</Button>
}
