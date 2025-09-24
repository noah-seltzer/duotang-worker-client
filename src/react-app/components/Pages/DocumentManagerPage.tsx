import { useAppSelector } from '@/store'
import { selectCurrentClientId } from '@/store/clientInfoSlice'
import { LoginOutButtons } from '../Auth/LoginOutButtons'
import { ClientInput } from '../ClientInput/ClientInput'
import { ClientTableList } from '../DocumentTable/ClientTableList'

export function DocumentManagementPage() {
    const currentClientId = useAppSelector(selectCurrentClientId)

    return (
        <>
            {currentClientId && (
                <ClientTableList currentClientId={currentClientId} />
            )}
            {!currentClientId && (
                <div className='flex flex-row items-center gap-4'>
                    Please create a new Client
                    <ClientInput />
                </div>
            )}
        </>
    )
}
