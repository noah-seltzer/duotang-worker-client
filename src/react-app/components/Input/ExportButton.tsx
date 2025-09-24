import { selectAllFiles, selectListRows } from '@/store/fileListSlice'

import { useAppSelector } from '@/store'
import {
    selectClientById,
    selectCurrentClientId,
    selectDocumentListById
} from '@/store/clientInfoSlice'
import { Button } from '@/components/Skeleton/Button'
import { exportFiles } from '@/lib/export'

interface ExportButtonProps extends React.ComponentProps<'button'> {
    documentId: string
}

export function ExportButton({ documentId, ...props }: ExportButtonProps) {
    const list = useAppSelector((state) =>
        selectDocumentListById(state, documentId)
    )
    const rows = useAppSelector((state) => selectListRows(state, list.id))
    const cachedFiles = useAppSelector(selectAllFiles)
    const currentClientId = useAppSelector(selectCurrentClientId)

    if (!currentClientId) return <div>No Client Selected.</div>
    const clientInfo = useAppSelector((state) =>
        selectClientById(state, currentClientId)
    )

    return (
        <Button
            onClick={() => exportFiles(rows, cachedFiles, clientInfo)}
            {...props}
        >
            Export
        </Button>
    )
}
