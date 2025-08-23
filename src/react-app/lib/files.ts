import { DEFAULT_DOCUMENT_TYPE, DOCUMENT_TYPES } from '../data/document-list'
import type { ClientInfo } from '../types/ClientInfo'
import type { DocumentRowType } from '../types/DocumentRowType'
import type { ListRow } from '../types/ListRow'

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
    fileName: string,
    slug: string,
    index: number,
    subIndex: number,
    clientFullName: string,
    hasMultipleFiles: boolean = false,
    maradString?: string
) => {
    const ext = getFileExtensionFromName(fileName)
    const subIndexChar = hasMultipleFiles ? ALPHABETICAL_INDEXES[subIndex] : ''
    return `${index}${subIndexChar}_${slug}_${
        maradString || ''
    }${clientFullName}.${ext}`
}

export const createClientNameString = (clientInfo: ClientInfo) =>
    `${clientInfo.firstName || DEFAULT_FIRSTNAME}_${
        clientInfo.lastName || DEFAULT_LASTNAME
    }`

export const createFileNamePreviews = (
    fileInfo: ListRow,
    clientInfo: ClientInfo,
    index: number
): string[] => {
    const { fileIds = [], docType } = fileInfo
    const { slug } = docType
    if (fileIds.length === 0) return ['None']

    const clientFullName = createClientNameString(clientInfo)

    const hasMultipleFiles = fileIds.length > 1

    const fileNames = fileIds.map((file, i) =>
        createFileName(
            file.name,
            slug,
            index,
            i,
            clientFullName,
            hasMultipleFiles,
            file.isMarad ? MARAD_STRING : undefined
        )
    )

    return fileNames
}

export const getDocumentRowType = (slug: string): DocumentRowType => {
    return (
        DOCUMENT_TYPES.find((docType) => docType.slug === slug) ||
        DEFAULT_DOCUMENT_TYPE
    )
}
