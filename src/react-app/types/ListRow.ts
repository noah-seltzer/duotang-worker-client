import type { DocumentType } from './DocumentRowType'
export interface ListRow {
    id: string
    docType: DocumentType
    fileIds: string[]
    listId: string
}
