import { createFileName } from '@/lib/files'
import { RootState } from '@/store'
import { MASLApi } from '@/store/api/msal/api'
import {
    selectCurrentClient,
    selectDocumentListById
} from '@/store/clientInfoSlice'
import { updateFile, updateFileRow } from '@/store/fileListSlice'
import localforage from 'localforage'

export const MSALFiles = MASLApi.injectEndpoints({
    endpoints: (builder) => ({
        getFileContentByID: builder.query<void, { id: string }>({
            query: ({ id }) => `/me/drive/items/${id}/content`
        }),
        uploadFileToFolder: builder.mutation<
            'error' | 'success',
            { id: string; token: string }
        >({
            async queryFn(_arg, { dispatch, getState }, _extraOptions) {
                try {
                    const promises = []
                    const state = getState() as RootState
                    const client = selectCurrentClient(state)!
                    const folder = state.fileList.onedriveSyncFolder!

                    const list = selectDocumentListById(state, _arg.id)
                    for (let i = 0; i < list.rows.length; i++) {
                        const row = state.fileList.rows.entities[list.rows[i]]
                        let clientFolderId = folder.id
                        if (!row.oneDriveFolderId) {
                            const createFolderRequestBody = {
                                name: `${client.firstName} ${client.lastName}`,
                                folder: {}
                            }
                            const response = await fetch(
                                `https://graph.microsoft.com/v1.0/me/drive/items/${folder.id}/children`,
                                {
                                    method: 'POST',
                                    body: JSON.stringify(
                                        createFolderRequestBody
                                    ),
                                    headers: {
                                        Authorization: `Bearer ${_arg.token}`,
                                        'Content-Type': 'application/json'
                                    }
                                }
                            )
                            const res = await response.json()
                            updateFileRow({
                                ...row,
                                oneDriveFolderId: res.id
                            })
                            clientFolderId = res.id
                        }
                        for (let j = 0; j < row.fileIds.length; j++) {
                            const promise = new Promise<boolean>(
                                async (resolve, reject) => {
                                    try {
                                        const file =
                                            state.fileList.files.entities[
                                                row.fileIds[j]
                                            ]
                                        if (
                                            file.oneDriveSyncStatus ===
                                                'synced' &&
                                            file.oneDriveFolderId ===
                                                clientFolderId
                                        ) {
                                            resolve(true)
                                        }

                                        dispatch(
                                            updateFile({
                                                ...file,
                                                oneDriveSyncStatus: 'syncing'
                                            })
                                        )
                                        const content =
                                            await localforage.getItem<File>(
                                                file.id
                                            )
                                        const name = createFileName(
                                            row,
                                            client,
                                            file,
                                            i
                                        )
                                        const response = await fetch(
                                            `https://graph.microsoft.com/v1.0/me/drive/items/${clientFolderId}:/${name}:/content`,
                                            {
                                                method: 'PUT',
                                                body: content,
                                                headers: {
                                                    Authorization: `Bearer ${_arg.token}`
                                                }
                                            }
                                        )
                                        if (
                                            response.status >= 200 &&
                                            response.status < 300
                                        ) {
                                            dispatch(
                                                updateFile({
                                                    ...file,
                                                    oneDriveSyncStatus:
                                                        'synced',
                                                    oneDriveFolderId: folder.id
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
                                }
                            )
                            promises.push(promise)
                        }
                    }
                    await Promise.all(promises)
                    console.log('promises', promises)
                    return { data: 'success' }
                } catch (error) {
                    console.log(error)
                    return { data: 'error' }
                }
            }
            // invalidatesTags: ['File']
            // providesTags: (result, error, id) => {
            //     return [{ type: 'File', id}]
            // }
            // providesTags: ['File']
        })
    })
})

export const { useGetFileContentByIDQuery, useUploadFileToFolderMutation } =
    MSALFiles
