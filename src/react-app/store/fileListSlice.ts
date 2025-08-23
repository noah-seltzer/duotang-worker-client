import { IDLE, LOADING_STATE } from './../constants/state'
import {
    createEntityAdapter,
    createSlice,
    EntityState,
    nanoid,
    PayloadAction
} from '@reduxjs/toolkit'
import { DOCUMENT_TYPES } from '../data/document-list'
import { CachedFile } from '../types/CachedFile'
import { addFilesToRow, deleteFilesFromRow, deleteRows } from './fileListThunks'
import { DocumentRowType } from '../types/DocumentRowType'
import { RootState } from '.'
import { ListRow } from '../types/ListRow'

export interface FileListState {
    loadingState: LOADING_STATE
    rows: EntityState<ListRow, string>
    files: EntityState<CachedFile, string>
}

const rowEntity = createEntityAdapter<ListRow>()
const fileEntity = createEntityAdapter<CachedFile>()

export const createBlankRow = (typeSlug?: string): ListRow => {
    const docType = !!typeSlug
        ? (DOCUMENT_TYPES.find((t) => t.slug === typeSlug) as DocumentRowType)
        : DOCUMENT_TYPES[0]
    return {
        id: nanoid(),
        docType,
        fileIds: []
    }
}

const initialState: FileListState = {
    rows: rowEntity.getInitialState(),
    files: fileEntity.getInitialState(),
    loadingState: IDLE
}

export const fileListSlice = createSlice({
    name: 'fileRow',
    initialState,
    reducers: {
        addRow: (state) => {
            const newRow = createBlankRow()
            rowEntity.addOne(state.rows, newRow)
        },
        updateFileRow: (state, action: PayloadAction<ListRow>) => {
            const updatedRow = action.payload
            rowEntity.updateOne(state.rows, {
                id: updatedRow.id,
                changes: updatedRow
            })
        },
        deleteRow: (state, action: PayloadAction<string>) => {
            const row = state.rows.entities[action.payload]
            fileEntity.removeMany(state.files, row.fileIds)
            rowEntity.removeOne(state.rows, row.id)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addFilesToRow.fulfilled, (state, action) => {
            const { payload } = action
            fileEntity.addMany(state.files, payload)

            const { rowId } = payload[0]
            const row = state.rows.entities[rowId]

            const ids = payload.map((p) => p.id)
            row.fileIds = row.fileIds.concat(ids)

            rowEntity.updateOne(state.rows, {
                id: rowId,
                changes: row
            })
        })
        builder.addCase(deleteFilesFromRow.fulfilled, (state, action) => {
            const { payload } = action
            const ids = payload.map((p) => p.id)
            fileEntity.removeMany(state.files, ids)

            const { rowId } = payload[0]
            const row = state.rows.entities[payload[0].rowId]

            row.fileIds = row.fileIds.filter((fileId) => !ids.includes(fileId))
            rowEntity.updateOne(state.rows, {
                id: rowId,
                changes: row
            })
        })
        builder.addCase(deleteRows.fulfilled, (state, action) => {
            const { payload } = action
            const ids = payload.map((p) => p.id)
            const fileIds = payload.map((p) => p.fileIds).flat()
            fileEntity.removeMany(state.files, fileIds)
            rowEntity.removeMany(state.rows, ids)
        })
    }
})

export type FileListSlice = {
    [fileListSlice.name]: ReturnType<(typeof fileListSlice)['reducer']>
}

export const fileSelectors = fileEntity.getSelectors<RootState>(
    (state) => state.fileList.files
)

export const rowSelectors = rowEntity.getSelectors<RootState>(
    (state) => state.fileList.rows
)

export const selectRowById = (state: RootState, id: string) =>
    rowSelectors.selectById(state, id)
export const selectRowIds = (state: RootState) => rowSelectors.selectIds(state)
export const selectAllRows = (state: RootState) => rowSelectors.selectAll(state)
export const selectRowsByIds = (state: RootState, ids: string[]) =>
    ids.map((id) => state.fileList.rows.entities[id])


export const selectFileById = (state: RootState, id: string) =>
    fileSelectors.selectById(state, id)
export const selectFileIds = (state: RootState) =>
    fileSelectors.selectIds(state)
export const selectAllFiles = (state: RootState) =>
    fileSelectors.selectAll(state)

export const { updateFileRow, addRow } = fileListSlice.actions

export default fileListSlice.reducer
