import { useMsal } from "@azure/msal-react"
import type { OneDrivePickedFileResult } from '../types/OneDrivePickedFileResult'
import { fileDownloadRequest } from '../data/auth-config'
import { IPublicClientApplication } from '@azure/msal-browser'
import { ChangeEvent } from "react"

const processOnedriveFileSelected = async (
    instance: IPublicClientApplication,
    command: OneDrivePickedFileResult
) => {
    const account = instance.getAllAccounts()[0]
    const files = await Promise.all(
        command.items.map(async (item) => {
            const token = await instance.acquireTokenPopup({
                ...fileDownloadRequest,
                account
            })
            const res = await fetch(
                `https://graph.microsoft.com/v1.0/me/drive/items/${item.id}/content`,
                {
                    headers: {
                        authorization: `Bearer ${token.accessToken}`
                    }
                }
            )
            const blob = await res.blob()
            return new File([blob], item.name)
        })
    )
    return files
}


export function useFileSubmit() {
        const { instance } = useMsal()
    
        const isLoggedIn = instance.getAllAccounts().length > 0
    
        // // TODO this cannot be inside a component lmao
        // // also any type is bad
        // const onFilePicked = async (command: any) => {
        //     const files = await processOnedriveFileSelected(instance, command)
        //     onSaved(files)
        // }
    
        // const onFileSaved = (e: ChangeEvent<HTMLInputElement>) => {
        //     const { files } = e.target
        //     if (!files) return
        //     onSaved(Array.from(files))
        // }
}