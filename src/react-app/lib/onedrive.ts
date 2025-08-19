import {
    type IPublicClientApplication,
    type SilentRequest
} from '@azure/msal-browser'
import type { IAuthenticateCommand } from '../components/OneDrive/types'

export async function getToken(
    command: IAuthenticateCommand,
    instance: IPublicClientApplication
): Promise<string> {
    let accessToken = ''
    const authParams: SilentRequest = {
        account: instance.getAllAccounts()[0],
        scopes: [`${combine(command.resource, '.default')}`]
    }

    await instance.initialize()

    try {
        // see if we have already the idtoken saved
        const resp = await instance.acquireTokenSilent(authParams!)
        accessToken = resp.accessToken
    } catch (e) {
        // per examples we fall back to popup
        const resp = await instance.loginPopup(authParams!)
        instance.setActiveAccount(resp.account)

        if (resp.idToken) {
            const resp2 = await instance.acquireTokenSilent(authParams!)
            accessToken = resp2.accessToken
        } else {
            // throw the error that brought us here
            throw e
        }
    }

    return accessToken
}

/**
 * Combines an arbitrary set of paths ensuring and normalizes the slashes
 *
 * @param paths 0 to n path parts to combine
 */
export function combine(...paths: (string | null | undefined)[]): string {
    return paths
        .filter((path) => typeof path === 'string' && path !== null)

        .map((path) => path!.replace(/^[\\|/]/, '').replace(/[\\|/]$/, ''))
        .join('/')
        .replace(/\\/g, '/')
}
