import { useAppSelector } from '../../store'
import {
    selectCurrentClientId
} from '../../store/clientInfoSlice'
import { LoginOutButtons } from '../Auth/LoginOutButtons'
import { ClientInput } from '../ClientInput/ClientInput'
import { ClientTableList } from '../DocumentTable/ClientTableList'

export function DocumentManagementPage() {
    const currentClientId = useAppSelector(selectCurrentClientId)

    return (
        <>
            <div className='flex justify-left gap-2 mb-2'>
                <LoginOutButtons />
                <ClientInput />
            </div>
            {currentClientId && <ClientTableList currentClientId={currentClientId} />}
            {!currentClientId && <div>Create a Client First!</div>}
        </>
    )
}
