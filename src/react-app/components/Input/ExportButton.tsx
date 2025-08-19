import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { selectfileList } from '../../store/fileListSlice'

import { useAppSelector } from '../../store'
import { selectClientInfo } from '../../store/clientInfoSlice'
import localforage from 'localforage'
import { createClientNameString, createFileName, MARAD_STRING } from '../../lib/files'
import { Button } from '../Skeleton/Button'

interface ExportFileData {
    name: string
    file: File
}

export const processFile = async (
    id: string,
    rowIndex: number,
    subIndex: number,
    slug: string,
    clientFullName: string,
    hasMultipleFiles: boolean,
    maradString?: string
) => {
    const file = (await localforage.getItem(id)) as File
    const name = createFileName(
        file.name,
        slug,
        rowIndex,
        subIndex,
        clientFullName,
        hasMultipleFiles,
        maradString
    )
    return {
        file,
        name
    }
}

export function ExportButton() {
    const rows = useAppSelector(selectfileList)
    const clientInfo = useAppSelector(selectClientInfo)
    const clientFullName = createClientNameString(clientInfo)

    const handleZipAndDownload = async () => {
        const files: ExportFileData[] = []

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i]
            console.log('row', row)
            
            const fileIds = row.fileIds
            const maradFileIds = row.maradFileIds
            const allFileIds = [...fileIds, ...maradFileIds]
            const hasMultipleFiles = allFileIds.length > 1
            
            const newFiles = await Promise.all(
                allFileIds.map(async (file, subIndex) => {
                    return processFile(
                        file.id,
                        i,
                        subIndex,
                        row.docType.slug,
                        clientFullName,
                        hasMultipleFiles,
                        subIndex >= fileIds.length ? MARAD_STRING : undefined
                    )
                })
            )
            files.push(...newFiles)
        }

        const zip = new JSZip()

        for (const file of files) {
            console.log('file', file)
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
