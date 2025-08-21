import { createAsyncThunk } from '@reduxjs/toolkit'
import localforage from 'localforage'
import { FileCacheData } from '../types/FileCacheData'
import { FileInfo } from '../types/FileInfo'

export const deleteFileFromCache = createAsyncThunk(
    'fileRow/deleteFileCacheStatus',
    async ({ fileId }: { row: FileInfo; fileId: string }) => {
        return localforage.removeItem(fileId)
    }
)

export const addFileToCache = createAsyncThunk(
    'fileRow/addFileCacheStatus',
    async ({
        fileCacheData,
        file
    }: {
        row: FileInfo
        fileCacheData: FileCacheData
        file: File
    }) => {
        return localforage.setItem(fileCacheData.id, file)
    }
)
