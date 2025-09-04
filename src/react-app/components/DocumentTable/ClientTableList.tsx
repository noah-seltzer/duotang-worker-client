import { useAppDispatch } from '../../store'
import { Button } from '../Skeleton/Button'
import { DocumentListManagementTable } from './DocumentListManagementTable'
import { useClientState } from '../../hooks/useClientState'

interface ClientTableListProps {
    currentClientId: string
}

/**
 * Outermost parent for the spreadsheet-like document table
 */
export function ClientTableList({ currentClientId }: ClientTableListProps) {
    const { client, submissionList, createNewListForClient } = useClientState(currentClientId)

    return (
        <div>
            {client && (
                <>
                    <div className='flex flex-col items-start gap-3'>
                        Showing Lists for {client.firstName} {client.lastName}
                        <Button
                            onClick={() => createNewListForClient(currentClientId)
                            }
                        >
                            Create New Document List
                        </Button>
                    </div>
                    {submissionList &&
                        submissionList.submissionIds.map((id) => (
                            <div className='mt-3' key={id}>
                                <DocumentListManagementTable
                                    documentListId={id}
                                />
                            </div>
                        ))}
                </>
            )}
        </div>
    )
}
