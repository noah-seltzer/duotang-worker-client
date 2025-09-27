import localforage from 'localforage'
import { CachedFile } from '@/types/CachedFile'
import { DocumentList } from '@/types/DocumentList'
import { ClientInfo } from '@/types/ClientInfo'
import { ListRow } from '@/types/ListRow'
import { createFileName } from '@/lib/files'
import { AppDispatch } from '@/store'
import { updateFile } from '@/store/fileListSlice'

export const GRAPH_URL_ROOT = 'https://graph.microsoft.com/v1.0'

export function createOnedriveReplaceUrl(id: string) {
    return `${GRAPH_URL_ROOT}/me/drive/items/${id}/content`
}

export function createOnedriveUploadUrl(folderId: string, fileName: string) {
    return `${GRAPH_URL_ROOT}/me/drive/items/${folderId}:/${fileName}:/content`
}

export function createOnedriveCreateFolderAtParentUrl(id: string) {
    return `${GRAPH_URL_ROOT}/me/drive/items/${id}/children`
}

export function createOnedriveGetItemDataUrl(id: string) {
    return `${GRAPH_URL_ROOT}/me/drive/items/${id}`
}

export function responseIs200(response: Response) {
    return response.status >= 200 && response.status < 300
}

export async function getRequest(url: string, headers: HeadersInit, query?: Record<string, string>) {
    const suffix = query ? `?${new URLSearchParams(query)}` : ''
    const response = await fetch(`${url}${suffix}`, {
        headers
    })

    const data = await response.json()
    if (!responseIs200(response)) {
        throw data
    }
    return data
}


export async function postRequest(url: string, headers: HeadersInit, body: BodyInit) {
    const response = await fetch(url, {
        headers,
        body,
        method: 'POST'
    })

    const data = await response.json()
    if (!responseIs200(response)) {
        throw data
    }
    return data
}

export async function syncFile({
    file,
    list,
    client,
    row,
    i,
    dispatch,
    headers
}: {
    file: CachedFile
    list: DocumentList
    client: ClientInfo
    row: ListRow
    i: number
    dispatch: AppDispatch
    headers: HeadersInit
}) {
    return new Promise<boolean>(async (resolve, reject) => {
        try {
            if (
                file.oneDriveSyncStatus === 'synced' &&
                file.oneDriveFolderId === list.oneDriveFolderId
            ) {
                resolve(true)
            }

            dispatch(
                updateFile({
                    ...file,
                    oneDriveSyncStatus: 'syncing'
                })
            )

            if (file.oneDriveItemId) {
                try {
                    await getRequest(
                        createOnedriveGetItemDataUrl(file.oneDriveItemId),
                        headers
                    )
                } catch {
                    file.oneDriveItemId = undefined
                }
            }

            const content = await localforage.getItem<File>(file.id)
            const name = createFileName(row, client, file, i)

            const url = file.oneDriveItemId
                ? createOnedriveReplaceUrl(file.oneDriveItemId)
                : createOnedriveUploadUrl(list.oneDriveFolderId!, name)

            const response = await fetch(url, {
                method: 'PUT',
                body: content,
                headers
            })

            if (response.status >= 200 && response.status < 300) {
                const driveItem = await response.json()
                dispatch(
                    updateFile({
                        ...file,
                        oneDriveSyncStatus: 'synced',
                        oneDriveFolderId: list.oneDriveFolderId,
                        oneDriveItemId: driveItem.id
                    })
                )
                resolve(true)
            } else {
                dispatch(
                    updateFile({
                        ...file,
                        oneDriveSyncStatus: 'error'
                    })
                )
                reject(false)
            }
        } catch (e) {}
    })
}