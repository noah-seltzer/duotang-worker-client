import { useAppSelector } from '../store'
import {
    selectFileById,
    selectRowById,
    selectRowsByIds
} from '../store/fileListSlice'
import {
    selectClientById,
    selectDocumentListById
} from '../store/clientInfoSlice'
import { createFileName } from '../lib/files'

export function useGetFileInfo(fileId: string) {
    if (!fileId) {
        return {
            name: '',
            row: undefined,
            clientInfo: undefined,
            file: undefined
        }
    }
    const file = useAppSelector((state) => selectFileById(state, fileId))
    const row = useAppSelector((state) => selectRowById(state, file.rowId))
    const document = useAppSelector((state) =>
        selectDocumentListById(state, row.listId)
    )
    const clientInfo = useAppSelector((state) =>
        selectClientById(state, document.clientId)
    )

    const rows = useAppSelector((state) =>
        selectRowsByIds(state, document.rows)
    )
    const rowIds = rows.map((row) => row.id)
    const index = rowIds.indexOf(row.id)

    const name = createFileName(row, clientInfo, file, index)

    return {
        file,
        row,
        clientInfo,
        name
    }
}
