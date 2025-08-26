import { useAppSelector } from '../store'
import {
    selectFileById,
    selectRowById,
    selectRowIds
} from '../store/fileListSlice'
import {
    selectClientById,
    selectDocumentListById
} from '../store/clientInfoSlice'
import { createFileName } from '../lib/files'

export function useGetFileInfo(fileId: string) {
    const file = useAppSelector((state) => selectFileById(state, fileId))
    const row = useAppSelector((state) => selectRowById(state, file.rowId))
    const document = useAppSelector((state) =>
        selectDocumentListById(state, row.listId)
    )
    const clientInfo = useAppSelector((state) =>
        selectClientById(state, document.clientId)
    )

    const rowIds = useAppSelector(selectRowIds)
    const index = rowIds.indexOf(row.id)

    const name = createFileName(row, clientInfo, file, index)

    return {
        file,
        row,
        clientInfo,
        name
    }
}
