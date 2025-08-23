import { TableCell, TableRow } from '../Table/TableComponents'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { FileNamePreview } from './FileNamePreview'
import { FilePreviews } from './FilePreview'
import { classNames } from '../../lib/tw'
import { useAppDispatch, useAppSelector } from '../../store'
import { rowSelectors, updateFileRow } from '../../store/fileListSlice'
import { selectClientInfo } from '../../store/clientInfoSlice'
import { FileTypeSelector } from './FileTypeSelector'
import { getDocumentRowType } from '../../lib/files'
import { FileUploadInput } from '../Input/FileUploadInput'
import { StatusBar } from './StatusBar'
import { addFilesToRow } from '../../store/fileListThunks'

export interface FileRowProps {
    index: number
    rowId: string
}

export function FileRow({ rowId, index }: FileRowProps) {
    const dispatch = useAppDispatch()
    const clientInfo = useAppSelector(selectClientInfo)
    const row = useAppSelector((state) => rowSelectors.selectById(state, rowId))

    const { fileIds, docType } = row
    const { slug, label } = docType

    const isComplete = fileIds.length > 0

    const options = DOCUMENT_TYPES.map((docType) => ({
        value: docType.slug,
        label: docType.label
    }))

    const currentOption = { value: slug, label: label }

    const addFiles = (files: File[], isMarad: boolean = false) => {
        const newFiles = files.map((file) => ({
            file,
            name: file.name,
            isMarad,
            rowId
        }))

        dispatch(addFilesToRow({ files: newFiles }))
    }

    return (
        <TableRow>
            {/* Status */}
            <TableCell className='p-6 space-y-0'>
                <span
                    className={classNames(
                        'flex w-10 h-6 rounded-full',
                        isComplete ? 'bg-green-500' : 'bg-red-500'
                    )}
                ></span>
            </TableCell>
            {/* Document Type */}
            <TableCell>
                <FileTypeSelector
                    options={options}
                    currentOption={currentOption}
                    onChange={(value) => {
                        const newDocType = getDocumentRowType(value.value)
                        dispatch(updateFileRow({ ...row, docType: newDocType }))
                    }}
                />
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                <div className='flex flex-row items-center gap-2'>
                    <div className='flex flex-col gap-2'>
                        <FileUploadInput onSaved={addFiles} />
                        <StatusBar
                            status={fileIds.length > 0 ? 'success' : 'error'}
                        />
                    </div>
                </div>
            </TableCell>
            <TableCell>
                {docType.marad ? (
                    <div className='flex flex-col items-center gap-2'>
                        <FileUploadInput
                            title='Add Marad File'
                            onSaved={(files) => addFiles(files, true)}
                        />
                        <StatusBar
                            status={fileIds.length > 0 ? 'success' : 'error'}
                        />
                    </div>
                ) : (
                    'No Marad Required'
                )}
            </TableCell>
            {/* Filename Preview */}
            <TableCell>
                <FileNamePreview
                    index={index}
                    fileInfo={row}
                    clientInfo={clientInfo}
                />
            </TableCell>
            {/* File Preview */}
            <TableCell>
                <FilePreviews fileIds={row.fileIds} />
            </TableCell>
        </TableRow>
    )
}
