export type Nationality = 'ukrainian' | 'other'

export interface ClientInfo {
    firstName: string
    lastName: string
    jobTitle: string
    id: string
    documentListIds: string[]
    nationality?: Nationality
}

export type ClientInfoInput = Omit<ClientInfo, 'id'>
