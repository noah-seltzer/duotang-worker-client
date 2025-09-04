import { selectAllFiles, selectAllRows } from '../../store/fileListSlice'

import { useAppSelector } from '../../store'

import { Button } from '../Skeleton/Button'
import { exportFiles } from '../../lib/export'
import { selectCurrentClientId } from '../../store/services/client/slice'
import { selectClientById } from '../../store/clientInfoSlice'

interface ExportButtonProps extends React.ComponentProps<'button'> {
    listId: string
}

export function ExportButton(props: ExportButtonProps) {
    const {
        listId,
        ...rest
    } = props

    // const rows = 
    // const rows = useAppSelector(selectAllRows)
    // const cachedFiles = useAppSelector(selectAllFiles)
    const currentClientId = useAppSelector(selectCurrentClientId)

    if (!currentClientId) return <div>No Client Selected.</div>

    const clientInfo = useAppSelector((state) =>
        selectClientById(state, currentClientId)
    )

    return (
        <Button
            onClick={() => exportFiles(rows, cachedFiles, clientInfo)}
            {...rest}
        >
            Export
        </Button>
    )
}
