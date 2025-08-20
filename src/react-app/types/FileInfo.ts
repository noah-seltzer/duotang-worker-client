import type { DocumentRowType } from './DocumentRowType'
import type { FileCacheData } from './FileCacheData'
export interface FileInfo {
    id: number
    docType: DocumentRowType
    fileIds: FileCacheData[]
}
