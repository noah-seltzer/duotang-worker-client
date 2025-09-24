import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import {
    getFileBinariesFromRows,
    createClientNameString,
    createFileName
} from './files'
import { ListRow } from '@/types/ListRow'
import { ClientInfo } from '@/types/ClientInfo'
import { CachedFile } from '@/types/CachedFile'

export interface ExportFileData {
    name: string
    file: File
}

export const exportFiles = async (
    rows: ListRow[],
    cachedFiles: CachedFile[],
    clientInfo: ClientInfo
) => {
    const clientFullName = createClientNameString(clientInfo)

    const rowsWithFiles = rows.filter((row) => row.fileIds.length > 0)
    const rowsWithFileBinaries = await getFileBinariesFromRows(
        rowsWithFiles,
        cachedFiles
    )

    const namedFiles = rowsWithFileBinaries.map((file) => {
        return {
            ...file,
            name: createFileName(
                file.row,
                clientInfo,
                file,
                rows.indexOf(file.row)
            )
        }
    })

    const zip = new JSZip()

    for (const file of namedFiles) {
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
