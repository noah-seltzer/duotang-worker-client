import { useAppSelector } from '@/store'
import { selectClientById } from '@/store/clientInfoSlice'
import { DocumentListManagementTable } from '@/components/DocumentTable/DocumentListManagementTable'

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
