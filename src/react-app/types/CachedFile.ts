/**
 * Used after a file is saved to localforage cache to identify that file for later
 */
export interface CachedFile {
    name: string
    id: string
    isMarad: boolean
    rowId: string
}

export type CachedFileInput = Omit<CachedFile, 'id'> & { file: File}