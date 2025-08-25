import { useMsal } from '@azure/msal-react'
import { Button } from '../Skeleton/Button'

export function Logout() {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.logout()
    }

    return <Button onClick={handleLogin}>Logout</Button>
}
