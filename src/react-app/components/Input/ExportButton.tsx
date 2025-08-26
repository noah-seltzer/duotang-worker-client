import { selectAllFiles, selectAllRows } from '../../store/fileListSlice'

import { useAppSelector } from '../../store'
import {
    selectClientById,
    selectCurrentClientId
} from '../../store/clientInfoSlice'
import { Button } from '../Skeleton/Button'
import { exportFiles } from '../../lib/export'

interface ExportButtonProps extends React.ComponentProps<'button'> {}

export function ExportButton(props: ExportButtonProps) {
    const rows = useAppSelector(selectAllRows)
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
