import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { selectAllFiles, selectAllRows } from '../../store/fileListSlice'

import { useAppSelector } from '../../store'
import { selectClientInfo } from '../../store/clientInfoSlice'
import localforage from 'localforage'
import { createClientNameString, createFileName } from '../../lib/files'
import { Button } from '../Skeleton/Button'
import { CachedFile } from '../../types/CachedFile'
import { ListRow } from '../../types/ListRow'
import { ClientInfo } from '../../types/ClientInfo'

interface ExportFileData {
    name: string
    file: File
}

export const processFile = async (
    file: CachedFile,
    row: ListRow,
    clientInfo: ClientInfo,
    index: number
) => {
    const fileBinary = (await localforage.getItem(file.id)) as File
    const name = createFileName(row, clientInfo, file, index)
    return {
        file: fileBinary,
        name
    }
}

export function ExportButton() {
    const rows = useAppSelector(selectAllRows)
    const cachedFiles = useAppSelector(selectAllFiles)
    const clientInfo = useAppSelector(selectClientInfo)
    const clientFullName = createClientNameString(clientInfo)

    const handleZipAndDownload = async () => {
        const files: ExportFileData[] = []
        const rowsWithFiles = rows.filter((row) => row.fileIds.length > 0)
        for (let i = 0; i < rowsWithFiles.length; i++) {
            const row = rows[i]
            const { fileIds } = row

            const newFiles = await Promise.all(
                fileIds.map(async (file) => {
                    return processFile(
                        cachedFiles.find((f) => f.id === file) as CachedFile,
                        row,
                        clientInfo,
                        i
                    )
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

    return (
        <>
            <Button onClick={handleZipAndDownload}>Export</Button>
        </>
    )
}
