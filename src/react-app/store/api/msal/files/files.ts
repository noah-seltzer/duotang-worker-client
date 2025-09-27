import { RootState } from '@/store'
import { MASLApi } from '@/store/api/msal/api'
import {
    createOnedriveCreateFolderAtParentUrl,
    createOnedriveGetItemDataUrl,
    getRequest,
    responseIs200,
    syncFile
} from '@/store/api/msal/files/helpers'
import {
    selectCurrentClient,
    selectDocumentListById,
    updateDocumentList
} from '@/store/clientInfoSlice'
import {
    selectFileById,
    selectOneDriveFolder,
    selectRowById,
    setOneDriveSyncFolder
} from '@/store/fileListSlice'

export const MSALFiles = MASLApi.injectEndpoints({
    endpoints: (builder) => ({
        // getEmails: builder.query<any, { token: string }>({
        //     async queryFn(_arg, { dispatch, getState }, _extraOptions) {
        //             const headers = {
        //                 Authorization: `Bearer ${_arg.token}`,
        //                 'Content-Type': 'application/json'
        //             }
        //             const querystring = {
        //                 $top: '100',
        //                 $select: 'subject,receivedDateTime,from,isRead',
        //                 $orderby: 'receivedDateTime desc'
        //             }
        //             const url = `https://graph.microsoft.com/v1.0/me/messages?${querystring}`
        //             try {

        //                 const response = await getRequest(url, headers, querystring)
        //                 console.log(response)
        //             } catch (e) {
        //                 console.log(e)
        //             }

        //     },
        // }),
        getFileContentByID: builder.query<void, { id: string }>({
            query: ({ id }) => `/me/drive/items/${id}/content`
        }),
        uploadFileToFolder: builder.mutation<
            'error' | 'success',
            { id: string; token: string }
        >({
            async queryFn(_arg, { dispatch, getState }, _extraOptions) {
                try {
                    const headers = {
                        Authorization: `Bearer ${_arg.token}`,
                        'Content-Type': 'application/json'
                    }
                    const promises = []
                    const state = getState() as RootState
                    const client = selectCurrentClient(state)!
                    const folderId = selectOneDriveFolder(state)!.id

                    const list = selectDocumentListById(state, _arg.id)

                    try {
                        await getRequest(
                            createOnedriveGetItemDataUrl(folderId),
                            headers
                        )
                    } catch (e) {
                        console.log(e)
                        dispatch(setOneDriveSyncFolder(undefined))
                        return { data: 'error' }
                    }
                    if (list.oneDriveFolderId) {
                        try {
                            const url = createOnedriveGetItemDataUrl(
                                list.oneDriveFolderId
                            )
                            await getRequest(url, headers)
                        } catch (e) {
                            console.log(e)
                            dispatch(setOneDriveSyncFolder(undefined))
                            return { data: 'error' }
                        }
                    }
                    if (!list.oneDriveFolderId) {
                        const createFolderRequestBody = {
                            name: `${client.firstName} ${client.lastName}`,
                            folder: {}
                        }

                        const body = JSON.stringify(createFolderRequestBody)
                        const url =
                            createOnedriveCreateFolderAtParentUrl(folderId)
                        const response = await fetch(url, {
                            method: 'POST',
                            body,
                            headers
                        })
                        const res = await response.json()
                        if (responseIs200(response)) {
                            list.oneDriveFolderId = res.id
                            updateDocumentList({
                                ...list,
                                oneDriveFolderId: res.id
                            })
                        }
                    }
                    for (let i = 0; i < list.rows.length; i++) {
                        const rowId = list.rows[i]
                        const row = selectRowById(state, rowId)

                        for (let j = 0; j < row.fileIds.length; j++) {
                            const file = selectFileById(state, row.fileIds[j])

                            const promise = syncFile({
                                headers,
                                dispatch,
                                i,
                                file,
                                list,
                                client,
                                row
                            })
                            promises.push(promise)
                        }
                    }
                    await Promise.all(promises)
                    return { data: 'success' }
                } catch (error) {
                    console.log(error)
                    return { data: 'error' }
                }
            }
        })
    })
})

export const { useGetFileContentByIDQuery, useUploadFileToFolderMutation } =
    MSALFiles
