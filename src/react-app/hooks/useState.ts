import { useAppDispatch, useAppSelector } from '../store'
import { selectDocumentListById, updateList } from '../store/clientInfoSlice'
import { deleteRows } from '../store/fileListThunks'

export function useListState(listId: string) {
    const dispatch = useAppDispatch()
    const list = useAppSelector((state) =>
        selectDocumentListById(state, listId)
    )

    function deleteRowsFromList(rowIds: string[]) {
        dispatch(deleteRows(rowIds))

        dispatch(
            updateList({
                ...list,
                rows: list.rows.filter((id) => !rowIds.includes(id))
            })
        )
    }

    return { deleteRowsFromList }
}
