import { useAppDispatch, useAppSelector } from "../store"
import { selectSubmissionById, submissionSelectors } from "../store/services/submission/slice"
// import { selectDocumentListById, updateList } from "../store/clientInfoSlice"
// import { addRow, createBlankRow } from "../store/fileListSlice"

export function useDocumentListState(listId: string) {
    const dispatch = useAppDispatch()
    const list = useAppSelector(state => selectSubmissionById(state, listId))
    
    const createRowInList = (listId: string) => {
        // const newRow = createBlankRow(listId)
        // const newRows = list.rows.c/oncat(newRow.id)
        // dispatch(addRow(newRow))

        // dispatch(
        //     updateList({
        //         ...list,
        //         rows: newRows
        //     })
        // )
    }

    return {
        list,
        createRowInList
    }

}