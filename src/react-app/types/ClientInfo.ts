export interface ClientInfo {
    firstName: string
    lastName: string
    jobTitle: string
    id: string
    documentListIds: string[]
}

export type ClientInfoInput = Omit<ClientInfo, 'id'>
