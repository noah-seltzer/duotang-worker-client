export interface DocumentList {
    name: string,
    rows: string[]
    clientId: string
    id: string
}

export type DocumentListInput = Omit<DocumentList, 'id'>