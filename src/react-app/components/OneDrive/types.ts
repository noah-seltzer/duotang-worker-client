/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAuthenticateCommand {
    command: 'authenticate'
    resource: string
    type: 'SharePoint' | 'Graph'
    claimsChallenge?: {
        claims: string
        token?: string
        error: any // IError;
    }
    expiration?: {
        error: any // IError;
    }
}
