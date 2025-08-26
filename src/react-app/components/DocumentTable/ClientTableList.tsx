import { useAppDispatch, useAppSelector } from '../../store'
import { Button } from '../Skeleton/Button'
import { addList, selectClientById } from '../../store/clientInfoSlice'
import { DocumentListManagementTable } from './DocumentListManagementTable'

interface ClientTableListProps {
    currentClientId: string
}

/**
 * Outermost parent for the spreadsheet-like document table
 */
export function ClientTableList({ currentClientId }: ClientTableListProps) {
    const dispatch = useAppDispatch()
    const client = useAppSelector((state) =>
        selectClientById(state, currentClientId)
    )

    return (
        <>
            <div className='flex flex-col items-start gap-3'>
                Showing Lists for {client.firstName} {client.lastName}
                <Button
                    onClick={() =>
                        dispatch(
                            addList({
                                name: 'newList',
                                rows: [],
                                clientId: currentClientId
                            })
                        )
                    }
                >
                    Create New Document List
                </Button>
            </div>
            {client.documentListIds.map((id) => (
                <div className='mt-3' key={id}>
                    <DocumentListManagementTable documentListId={id} />
                </div>
            ))}
        </>
    )
}
