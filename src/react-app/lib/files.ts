import { DEFAULT_DOCUMENT_TYPE, DOCUMENT_TYPES } from '../data/document-list'
import { CachedFile } from '../types/CachedFile'
import type { ClientInfo } from '../types/ClientInfo'
import type { DocumentRowType } from '../types/DocumentRowType'
import { ListRow } from '../types/ListRow'

export const ALPHABETICAL_INDEXES = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j'
]
export const DEFAULT_LASTNAME = 'LastName'
export const DEFAULT_FIRSTNAME = 'FirstName'
export const MARAD_STRING = '_Marad_Confirmation_'

export const getFileExtensionFromName = (fileName: string) =>
    fileName.split('.').pop()

export const createFileName = (
    row: ListRow,
    clientInfo: ClientInfo,
    file: CachedFile,
    index: number
) => {
    const ext = getFileExtensionFromName(file.name)
    const hasMultipleFiles = row.fileIds.length > 0

    const subIndex = row.fileIds.indexOf(file.id)
    const subIndexChar = hasMultipleFiles ? ALPHABETICAL_INDEXES[subIndex] : ''

    const clientFullName = createClientNameString(clientInfo)

    const maradString = file.isMarad ? MARAD_STRING : ''

    return `${index + 1}${subIndexChar}_${
        row.docType.slug
    }_${maradString}${clientFullName}.${ext}`
}

export const createClientNameString = (clientInfo: ClientInfo) =>
    `${clientInfo.firstName || DEFAULT_FIRSTNAME}_${
        clientInfo.lastName || DEFAULT_LASTNAME
    }`

export const getDocumentRowType = (slug: string): DocumentRowType => {
    return (
        DOCUMENT_TYPES.find((docType) => docType.slug === slug) ||
        DEFAULT_DOCUMENT_TYPE
    )
}
