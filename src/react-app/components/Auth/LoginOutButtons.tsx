import { useMsal } from '@azure/msal-react'
import { Logout } from '@/components/Auth/Logout'
import { Login } from '@/components/Auth/Login'

export function LoginOutButtons() {
    const { instance } = useMsal()

    const isLoggedIn = instance.getAllAccounts().length > 0
    return <>{isLoggedIn ? <Logout /> : <Login />}</>
}
