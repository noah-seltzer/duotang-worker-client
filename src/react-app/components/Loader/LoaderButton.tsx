import { Button } from '@/components/Skeleton/Button'
import { Spinner } from '@/components/Skeleton/spinner'

export function LoaderButton() {
    return (
        <Button disabled>
            <Spinner variant='circle' />
            Loading...
        </Button>
    )
}
