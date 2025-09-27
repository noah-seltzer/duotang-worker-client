import { ListRow } from '@/types/ListRow'

export type FileOnedriveSyncStatus = 'unsynced' | 'syncing' | 'synced' | 'error'

/**
 * Used after a file is saved to localforage cache to identify that file for later
 */
export interface CachedFile {
    name: string
    id: string
    isMarad: boolean
    rowId: string
    oneDriveSyncStatus?: FileOnedriveSyncStatus
    oneDriveFolderId?: string
    oneDriveItemId?: string
}

export interface ExportFile extends CachedFile {
    file: File
    row: ListRow
}

export type CachedFileInput = Omit<CachedFile, 'id'> & { file: File }
