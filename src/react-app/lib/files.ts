import { replaceSpaceWithUnderscore } from '@/lib/string'
import { DEFAULT_DOCUMENT_TYPE } from '../data/document-list'
import { CachedFile, ExportFile } from '@/types/CachedFile'
import type { ClientInfo } from '@/types/ClientInfo'
import type { DocumentType } from '@/types/DocumentRowType'
import { ListRow } from '@/types/ListRow'
import localforage from 'localforage'

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
        !!fileLabel
            ? replaceSpaceWithUnderscore(fileLabel)
            : replaceSpaceWithUnderscore(label)
    }_${maradString}${clientFullName}.${ext}`
}

export const createClientNameString = (clientInfo: ClientInfo) =>
    `${clientInfo.firstName || DEFAULT_FIRSTNAME} ${
        clientInfo.lastName || DEFAULT_LASTNAME
    }`

export const getDocumentRowType = (
    slug: string,
    items: DocumentType[]
): DocumentType => {
    return (
        items.find((docType) => docType.slug === slug) || DEFAULT_DOCUMENT_TYPE
    )
}

export async function getFileBinariesFromRows(
    rows: ListRow[],
    cachedFiles: CachedFile[]
) {
    const files: ExportFile[] = []
    const rowsWithFiles = rows.filter((row) => row.fileIds.length > 0)
    for (let i = 0; i < rowsWithFiles.length; i++) {
        const row = rows[i]
        const ids = row.fileIds
        const newFiles = await Promise.all(
            ids.map(async (id) => {
                const file = cachedFiles.find(
                    (file) => file.id === id
                ) as CachedFile
                const fileBinary = (await localforage.getItem(id)) as File
                return {
                    ...file,
                    file: fileBinary,
                    row
                }
            })
        )
        files.push(...newFiles)
    }

    return files
}
