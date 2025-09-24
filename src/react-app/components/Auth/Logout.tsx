import { useMsal } from '@azure/msal-react'
import { Button, ButtonProps } from '@/components/Skeleton/Button'

export function Logout(props: ButtonProps) {
    const { instance } = useMsal()

    const handleLogin = () => {
        instance.logout()
    }

    return (
        <Button variant='naked' onClick={handleLogin} {...props}>
            Logout
        </Button>
    )
}
