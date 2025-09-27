import { useAppSelector } from '@/store'
import { MSALScopes } from '@/store/api/msal/headers'
import { useMsal } from '@azure/msal-react'
import { use, useEffect, useState } from 'react'

export function useMsGraph() {
    const { instance } = useMsal()

    const accounts = instance.getAllAccounts()

    const isLoggedIn = accounts.length > 0

    const account = isLoggedIn ? accounts[0] : undefined

    const authParams = {
        scopes: MSALScopes,
        account: account
    }

    const folder = useAppSelector((state) => state.fileList.onedriveSyncFolder)

    const aquireTokenSilent = async () => {
        return instance.acquireTokenSilent(authParams)
    }

    const aquireTokenLoud = async () => {
        try {
            const response = await instance.acquireTokenPopup(authParams!)
            instance.setActiveAccount(response.account)
            return response
        } catch (e) {}
    }

    async function getToken() {
        try {
            const token = await aquireTokenSilent()
            return token.accessToken
        } catch (error) {
            const token = await aquireTokenLoud()
            return token?.accessToken
        }
    }



    useEffect(() => {}, [account])
    return {
        accounts,
        account,
        isLoggedIn,
        getToken,
        folder,
        aquireTokenSilent,
        aquireTokenLoud,
        instance
    }
}
