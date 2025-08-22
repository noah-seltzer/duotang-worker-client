import { IDLE, LOADING_STATE } from './../constants/state'
import {
    createEntityAdapter,
    createSlice,
    EntityState,
    PayloadAction
} from '@reduxjs/toolkit'
import type { FileInfo } from '../types/FileInfo'
import { DOCUMENT_TYPES } from '../data/document-list'
import type { RootState } from '.'
import { FileCacheData } from '../types/FileCacheData'
import { addFileToCache, deleteFileFromCache } from './fileListThunks'
import { DocumentRowType } from '../types/DocumentRowType'

export interface FileListState {
    fileList: FileInfo[]
    loadingState: LOADING_STATE
    ids: string[]
    entities: EntityState<FileInfo, string>
}

const fileEntity = createEntityAdapter<FileInfo>()

export const createBlankRow = (
    index: number = 0,
    typeSlug?: string
): FileInfo => {
    const docType = !!typeSlug
        ? (DOCUMENT_TYPES.find((t) => t.slug === typeSlug) as DocumentRowType)
        : DOCUMENT_TYPES[0]
    return {
        id: String(index + 1),
        docType,
        fileIds: []
    }
}

const initialState: FileListState = {
    fileList: [createBlankRow(0)],
    entities: fileEntity.getInitialState(),
    loadingState: IDLE,
    ids: []
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
            state.fileList = [
                ...state.fileList,
                createBlankRow(state.fileList.length + 1, action.payload)
            ]
        },
        updateFileRow: (state, action) => {
            const updatedRow = action.payload
            updateFileListItem(state, updatedRow)
        },
        deleteRow: (state, action) => {
            state.fileList = state.fileList.filter(
                (row) => row.id !== action.payload
            )
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

export const selectfileList = (state: RootState) => state.fileList.fileList
export const selectUnusedFileTypes = (state: RootState) => {
    const usedFileTypes = state.fileList.fileList.map((row) => row.docType.slug)
    return DOCUMENT_TYPES.filter((type) => !usedFileTypes.includes(type.slug))
}

export const { addFileRow, updateFileRow } = fileListSlice.actions

export default fileListSlice.reducer
