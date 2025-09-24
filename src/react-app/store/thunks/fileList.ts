import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { CachedFile, CachedFileInput } from '@/types/CachedFile'
import { ListRow } from '@/types/ListRow'
import { RootState } from '..'
import { selectRowsByIds } from '../fileListSlice'

export const addFilesToRow = createAsyncThunk<CachedFile[], CachedFileInput[]>(
    'fileRow/addFileCacheStatus',
    async (files) => {
        return Promise.all(
            files.map(async (file) => {
                const id = nanoid()
                await localforage.setItem(id, file.file)
                const newFile = {
                    ...file,
                    id,
                    file: undefined
                }
                return newFile
            })
        )
    }
)

export const updateFileAsync = createAsyncThunk<
    CachedFile,
    CachedFileInput & { id: string }
>('fileRow/updateFileCacheStatus', async (file) => {
    await localforage.setItem(file.id, file.file)
    return {
        ...file,
        file: undefined
    }
})

export const deleteRows = createAsyncThunk<ListRow[], string[]>(
    'fileRow/deleteRowsStatus',
    async (rowIds, thunkApi) => {
        const state = thunkApi.getState() as RootState
        const rows: ListRow[] = selectRowsByIds(state, rowIds)

        await Promise.all(
            rows.map(async (row) => {
                row.fileIds.map(async (id) => {
                    await localforage.removeItem(id)
                })
            })
        )
        return rows
    }
)

export const deleteFilesFromRow = createAsyncThunk<CachedFile[], CachedFile[]>(
    'fileRow/deleteFileCacheStatus',
    async (files) => {
        return Promise.all(
            files.map(async (fileData) => {
                await localforage.removeItem(fileData.id)
                return fileData
            })
        )
    }
)

// maybe add some row agnostic thunks later?
