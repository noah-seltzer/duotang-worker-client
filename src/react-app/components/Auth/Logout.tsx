import { useMsal } from '@azure/msal-react'
import { Button } from '../Skeleton/Button'

export function Logout(): React.JSX.Element {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.logout()
    }

    return <Button onClick={handleLogin}>Logout</Button>
}
