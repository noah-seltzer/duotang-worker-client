export interface DocumentList {
    name: string
    rows: string[]
    clientId: string
    id: string
    oneDriveFolderId?: string | undefined
}

export type DocumentListInput = Omit<DocumentList, 'id' | 'oneDriveFolderId'>
