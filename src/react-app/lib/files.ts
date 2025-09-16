import {
    DEFAULT_DOCUMENT_TYPE,
    UKRANIAN_MARINER_DOCUMENT_LIST
} from '../data/document-list'
import { CachedFile } from '@/types/CachedFile'
import type { ClientInfo } from '@/types/ClientInfo'
import type { DocumentType } from '@/types/DocumentRowType'
import { ListRow } from '@/types/ListRow'

export const DEFAULT_LASTNAME = 'LastName'
export const DEFAULT_FIRSTNAME = 'FirstName'
export const MARAD_STRING = 'Marad_Confirmation_'

export const getFileExtensionFromName = (fileName: string) =>
    fileName.split('.').pop()

export const createFileName = (
    row: ListRow,
    clientInfo: ClientInfo,
    file: CachedFile,
    index: number
) => {
    const ext = getFileExtensionFromName(file.name)
    const hasMultipleFiles = row.fileIds.length > 1

    const subIndex = row.fileIds.indexOf(file.id)
    const subIndexChar = hasMultipleFiles
        ? String.fromCharCode(97 + subIndex)
        : ''

    const clientFullName = createClientNameString(clientInfo)

    const maradString = file.isMarad ? MARAD_STRING : ''

    const { fileLabel, label } = row.docType

    return `${index + 1}${subIndexChar}_${
        fileLabel || label
    }_${maradString}${clientFullName}.${ext}`
}

export const createClientNameString = (clientInfo: ClientInfo) =>
    `${clientInfo.firstName || DEFAULT_FIRSTNAME} ${
        clientInfo.lastName || DEFAULT_LASTNAME
    }`

export const getDocumentRowType = (slug: string): DocumentType => {
    return (
        UKRANIAN_MARINER_DOCUMENT_LIST.find(
            (docType) => docType.slug === slug
        ) || DEFAULT_DOCUMENT_TYPE
    )
}
