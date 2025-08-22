import { file } from 'jszip'
import { IDLE, LOADING_STATE } from './../constants/state'
import {
    createEntityAdapter,
    createSlice,
    EntityState,
    nanoid,
    PayloadAction
} from '@reduxjs/toolkit'
import type { FileInfo } from '../types/FileInfo'
import { DOCUMENT_TYPES } from '../data/document-list'
import { FileCacheData } from '../types/FileCacheData'
import { addFileToCache, deleteFileFromCache } from './fileListThunks'
import { DocumentRowType } from '../types/DocumentRowType'
import { RootState } from '.'

export interface FileListState {
    fileList: FileInfo[]
    loadingState: LOADING_STATE
    entities: EntityState<FileInfo, string>
}

const fileEntity = createEntityAdapter<FileInfo>()

export const createBlankRow = (typeSlug?: string): FileInfo => {
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
    fileList: [createBlankRow()],
    entities: fileEntity.getInitialState(),
    loadingState: IDLE
}

function updateFileListItem(state: FileListState, newRow: FileInfo) {
    state.fileList = state.fileList.map((row) =>
        row.id === newRow.id ? newRow : row
    )
}

function updateRowFiles(row: FileInfo, newFiles: FileCacheData[]): FileInfo {
    return {
        ...row,
        fileIds: newFiles
    }
}

export const fileListSlice = createSlice({
    name: 'fileRow',
    initialState,
    reducers: {
        addFileRow: (state, action: PayloadAction<string | undefined>) => {
            fileEntity.addOne(state.entities, createBlankRow(action.payload))
        },
        updateFileRow: (state, action: PayloadAction<FileInfo>) => {
            const updatedRow = action.payload
            fileEntity.updateOne(state.entities, {
                id: updatedRow.id,
                changes: updatedRow
            })
        },
        deleteRow: (state, action: PayloadAction<string>) => {
            fileEntity.removeOne(state.entities, action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteFileFromCache.fulfilled, (state, action) => {
            const { row, fileId } = action.meta.arg

            const newFiles = row.fileIds.filter((file) => file.id !== fileId)
            const newRow = updateRowFiles(row, newFiles)

            updateFileListItem(state, newRow)
        })
        builder.addCase(addFileToCache.fulfilled, (state, action) => {
            const { row, fileCacheData } = action.meta.arg

            const newFiles = [...row.fileIds, fileCacheData]
            const newRow = updateRowFiles(row, newFiles)

            updateFileListItem(state, newRow)
        })
    }
})

export type FileListSlice = {
    [fileListSlice.name]: ReturnType<(typeof fileListSlice)['reducer']>
}

export const fileSelectors = fileEntity.getSelectors<RootState>(
    (state) => state.fileList.entities
)

export const selectfileList = (state: RootState) =>
    state.fileList.entities.entities

export const { addFileRow, updateFileRow } = fileListSlice.actions

export default fileListSlice.reducer
