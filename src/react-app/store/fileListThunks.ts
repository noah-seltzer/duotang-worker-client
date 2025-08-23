import { createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { CachedFile, CachedFileInput } from '../types/CachedFile'

export const addFilesToRow = createAsyncThunk<
    CachedFile[],
    { files: CachedFileInput[] }
>('fileRow/addFileCacheStatus', async ({ files }) => {
    return Promise.all(
        files.map(async (file) => {
            const newFile: CachedFile = {
                id: nanoid(),
                ...file
            }
            await localforage.setItem(newFile.id, file.file)
            return newFile
        })
    )
})

export const deleteFilesFromRow = createAsyncThunk<
    CachedFile[],
    { files: CachedFile[] }
>('fileRow/deleteFileCacheStatus', async ({ files }) => {
    return Promise.all(
        files.map(async (fileData) => {
            await localforage.removeItem(fileData.id)
            return fileData
        })
    )
})

// maybe add some row agnostic thunks later?
