import { useMsal } from '@azure/msal-react'
import { loginRequest } from '@/data/auth-config.ts'
import { PropsWithChildren } from 'react'

export function Login({ children }: PropsWithChildren) {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            console.log(e)
        })
    }

    return <span onClick={handleLogin}>{children}</span>
}
