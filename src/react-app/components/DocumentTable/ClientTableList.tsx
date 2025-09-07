import { useAppSelector } from '../../store'
import {
    selectClientById,
    selectCurrentClientId
} from '../../store/clientInfoSlice'
import { ClientInput } from '../ClientInput/ClientInput'
import { DocumentListManagementTable } from './DocumentListManagementTable'

interface ClientTableListProps {
    currentClientId: string
}
/**
 * Outermost parent for the spreadsheet-like document table
 */
export function ClientTableList({ currentClientId }: ClientTableListProps) {
    const client = useAppSelector((state) =>
        selectClientById(state, currentClientId)
    )

    return (
        <>
            {client.documentListIds.map((id) => (
                <div className='mt-3' key={id}>
                    <DocumentListManagementTable documentListId={id} />
                </div>
            ))}
        </>
    )
}
