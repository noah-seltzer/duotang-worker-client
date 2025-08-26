import { useAppDispatch, useAppSelector } from "../store"
import { selectDocumentListById, updateList } from "../store/clientInfoSlice"
import { addRow, createBlankRow } from "../store/fileListSlice"

export function useDocumentListState(listId: string) {
    const dispatch = useAppDispatch()
    const list = useAppSelector(state => selectDocumentListById(state, listId))
    
    const createRowInList = (listId: string) => {
        const newRow = createBlankRow(listId)
        const newRows = list.rows.concat(newRow.id)
        dispatch(addRow(newRow))

        dispatch(updateList({
            ...list,
            rows: newRows
        }))

        
    }

    return {
        createRowInList
    }

}