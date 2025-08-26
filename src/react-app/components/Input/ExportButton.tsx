import { selectAllFiles, selectAllRows } from '../../store/fileListSlice'

import { useAppSelector } from '../../store'
import { selectNewClient } from '../../store/clientInfoSlice'
import { Button } from '../Skeleton/Button'
import { exportFiles } from '../../lib/export'

interface ExportButtonProps extends React.ComponentProps<'button'> {}

export function ExportButton(props: ExportButtonProps) {
    const rows = useAppSelector(selectAllRows)
    const cachedFiles = useAppSelector(selectAllFiles)
    const clientInfo = useAppSelector(selectNewClient)

    return (
        <Button
            onClick={() => exportFiles(rows, cachedFiles, clientInfo)}
            {...props}
        >
            Export
        </Button>
    )
}
