import type { DocumentRowType } from './DocumentRowType'
import type { FileCacheData } from './FileCacheData'
export interface FileInfo {
    id: number
    docType: DocumentRowType
    file: FileList | null
    fileIds: FileCacheData[]
    maradFileIds: FileCacheData[]
    maradFile: FileList | null
}
