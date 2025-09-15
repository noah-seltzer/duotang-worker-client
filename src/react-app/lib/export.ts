import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import localforage from 'localforage'
import { createClientNameString, createFileName } from './files'
import { ListRow } from '@/types/ListRow'
import { ClientInfo } from '@/types/ClientInfo'
import { CachedFile } from '@/types/CachedFile'

interface ExportFileData {
    name: string
    file: File
}

export const exportFiles = async (
    rows: ListRow[],
    cachedFiles: CachedFile[],
    clientInfo: ClientInfo,
) => {
    const clientFullName = createClientNameString(clientInfo)
    const files: ExportFileData[] = []
    const rowsWithFiles = rows.filter((row) => row.fileIds.length > 0)
    for (let i = 0; i < rowsWithFiles.length; i++) {
        const row = rows[i]
        const ids = row.fileIds
        const newFiles = await Promise.all(
            ids.map(async (id) => {
                const file = cachedFiles.find((file) => file.id === id) as CachedFile
                const fileBinary = (await localforage.getItem(id)) as File
                const name = createFileName(row, clientInfo, file, i)
                return {
                    file: fileBinary,
                    name
                }
            })
        )
        files.push(...newFiles)
    }

    const zip = new JSZip()

    for (const file of files) {
        zip.file(file.name, file.file)
    }

    try {
        const zipBlob = await zip.generateAsync({ type: 'blob' })
        saveAs(zipBlob, clientFullName + '_Submission.zip')
    } catch (error) {
        console.error('Error zipping files:', error)
        alert('An error occurred while zipping the files.')
    }
}
