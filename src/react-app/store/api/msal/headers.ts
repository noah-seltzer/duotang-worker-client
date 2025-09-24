import { useMsal } from '@azure/msal-react'
import { AuthenticationResult } from '@azure/msal-browser'

export const MSALScopes = [
    'Files.Read',
    'Files.ReadWrite',
    'Files.Read.All',
    'Files.ReadWrite.All',
    'Sites.Read.All',
    'Sites.ReadWrite.All'
]

export const prepareHeaders = async (headers: Headers) => {
    const { instance } = useMsal()
    await instance.initialize()

    const accounts = instance.getAllAccounts()

    if (accounts.length === 0) {
        // no token to attach
        return headers
    }
    const authParams = {
        scopes: MSALScopes,
        account: accounts[0]
    }

    const setHeadersFromResponse = (response: AuthenticationResult) => {
        if (response.accessToken) {
            headers.set('Authorization', `Bearer ${response.accessToken}`)
        }
    }

    const aquireTokenSilent = async () => {
        const response = await instance.acquireTokenSilent(authParams)
        setHeadersFromResponse(response)
    }

    const aquireTokenLoud = async () => {
        try {
            const response = await instance.loginPopup(authParams!)
            instance.setActiveAccount(response.account)
            setHeadersFromResponse(response)
        } catch (e) {}
    }

    try {
        await aquireTokenSilent()
    } catch (error) {
        await aquireTokenLoud()
    }

    return headers
}
