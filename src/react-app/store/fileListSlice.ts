import { createSlice } from '@reduxjs/toolkit'
import type { FileInfo } from '../types/FileInfo'
import { DOCUMENT_TYPES } from '../data/document-list'
import type { RootState } from '.'

export interface FileListState {
    fileList: FileInfo[]
}

export const createBlankRow = (index: number = 0) => {
    return {
        id: index + 1,
        docType: DOCUMENT_TYPES[0],
        file: null,
        maradFile: null,
        fileIds: [],
        maradFileIds: []
    }
}

const initialState: FileListState = {
    fileList: [createBlankRow(0)]
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
            state.fileList = state.fileList.map((row) =>
                row.id === updatedRow.id ? updatedRow : row
            )
        }
    }
})


export const selectfileList = (state: RootState) => state.fileList.fileList
export const selectUnusedFileTypes = (state: RootState) => {
    const usedFileTypes = state.fileList.fileList.map((row) => row.docType.slug)
    return DOCUMENT_TYPES.filter((type) => !usedFileTypes.includes(type.slug))
}

export const { addFileRow, updateFileRow } = fileListSlice.actions

export default fileListSlice.reducer
