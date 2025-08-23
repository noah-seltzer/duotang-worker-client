import { useMsal } from '@azure/msal-react'
import { Logout } from './Logout'
import { Login } from './Login'

export function LoginOutButtons() {
    const { instance } = useMsal()

    const isLoggedIn = instance.getAllAccounts().length > 0
    return <>{isLoggedIn ? <Logout /> : <Login />}</>
}
