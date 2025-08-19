import { TableCell, TableRow } from '../Table/TableComponents'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { FileNamePreview } from './FileNamePreview'
import { FilePreviews } from './FilePreview'
import type { FileInfo } from '../../types/FileInfo'
import { classNames } from '../../lib/tw'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectfileList, updateFileRow } from '../../store/fileListSlice'
import { selectClientInfo } from '../../store/clientInfoSlice'
import { FileTypeSelector } from './FileTypeSelector'
import { getDocumentRowType } from '../../lib/files'
import { FileUploadInput } from '../Input/FileUploadInput'
import { StatusBar } from './StatusBar'

export interface FileRowProps {
    row: FileInfo
    index: number
}

export function FileRow({ row, index }: FileRowProps) {
    const dispatch = useAppDispatch()
    const clientInfo = useAppSelector(selectClientInfo)
    const rows = useAppSelector(selectfileList)

    const { fileIds, docType, maradFileIds } = row
    const { slug, label } = docType

    const isComplete =
        fileIds?.length > 0 && (docType.marad ? maradFileIds?.length > 0 : true)

    const usedSlugs = rows.map((row) => row.docType.slug)
    const unusedFileTypes = DOCUMENT_TYPES.filter(
        (type) => !usedSlugs.includes(type.slug)
    )

    const options = unusedFileTypes.map((docType) => ({
        value: docType.slug,
        label: docType.label
    }))

    const currentOption = { value: slug, label: label }
    const hasMaradFiles = !!maradFileIds && maradFileIds.length > 0
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
                        <FileUploadInput
                            onSaved={(files) =>
                                dispatch(
                                    updateFileRow({ ...row, fileIds: files })
                                )
                            }
                        />
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
                            onSaved={(files) =>
                                dispatch(
                                    updateFileRow({
                                        ...row,
                                        maradFileIds: files
                                    })
                                )
                            }
                        />
                        <StatusBar
                            status={hasMaradFiles ? 'success' : 'error'}
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
                <FilePreviews row={row} />
            </TableCell>
        </TableRow>
    )
}
