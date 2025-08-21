import localforage from 'localforage'

export async function loadFromLocalCache(fileId: string): Promise<File | null> {
    return localforage.getItem(fileId)
}
