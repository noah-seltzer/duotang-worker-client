import type { DocumentRowType } from './DocumentRowType'
import type { FileCacheData } from './FileCacheData'
export interface FileInfo {
    id: string
    docType: DocumentRowType
    fileIds: FileCacheData[]
}
