import { useAppDispatch } from '../store'
import { updateList } from '../store/clientInfoSlice'
import { addRow, createBlankRow } from '../store/fileListSlice'
import { DocumentList } from '@/types/DocumentList'

export function useDocumentListState(listId: string) {
    const dispatch = useAppDispatch()

    const createRowInList = (list: DocumentList) => {
        const newRow = createBlankRow(listId)
        const newRows = list.rows.concat(newRow.id)
        dispatch(addRow(newRow))

        dispatch(
            updateList({
                ...list,
                rows: newRows
            })
        )
    }

    return {
        createRowInList
    }
}
