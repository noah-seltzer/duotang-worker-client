import { IDLE, LOADING_STATE } from './../constants/state'
import { createSlice } from '@reduxjs/toolkit'
import type { FileInfo } from '../types/FileInfo'
import { DOCUMENT_TYPES } from '../data/document-list'
import type { RootState } from '.'
import { FileCacheData } from '../types/FileCacheData'
import { addFileToCache, deleteFileFromCache } from './fileListThunks'

export interface FileListState {
    fileList: FileInfo[]
    loadingState: LOADING_STATE
}

export const createBlankRow = (index: number = 0): FileInfo => {
    return {
        id: index + 1,
        docType: DOCUMENT_TYPES[0],
        fileIds: []
    }
}

const initialState: FileListState = {
    fileList: [createBlankRow(0)],
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
        addFileRow: (state) => {
            state.fileList = [
                ...state.fileList,
                createBlankRow(state.fileList.length + 1)
            ]
        },
        updateFileRow: (state, action) => {
            const updatedRow = action.payload
            updateFileListItem(state, updatedRow)
        },
        resetFileList: (state) => {
            state = initialState
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
