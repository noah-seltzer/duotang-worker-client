import type { DocumentRowType } from './DocumentRowType'
export interface ListRow {
    id: string
    docType: DocumentRowType
    fileIds: string[],
}
