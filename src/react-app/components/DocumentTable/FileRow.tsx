import { TableCell, TableRow } from '../Table/TableComponents'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { FilePreviews } from './FilePreview'
import { classNames } from '../../lib/tw'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectRowById, updateFileRow } from '../../store/fileListSlice'
import { FileTypeSelector } from './FileTypeSelector'
import { getDocumentRowType } from '../../lib/files'
import { StatusBar } from './StatusBar'
import { addFilesToRow, deleteRows } from '../../store/fileListThunks'
import { FileNamePreviews } from './FileNamePreview'
import { DeleteButton } from '../Input/DeleteButton'
import { FileFormInput } from '../Input/FileFormInput'
import {
    FloatingModalContent,
    FloatingModalRoot,
    FloatingModalTrigger
} from '../Skeleton/FloatingModal'
import { Button } from '../Skeleton/Button'
import { FormRoot, FormTextInput } from '../Form/Form'

export interface FileRowProps {
    index: number
    rowId: string
}

export function FileRow({ rowId }: FileRowProps) {
    const dispatch = useAppDispatch()
    const row = useAppSelector((state) => selectRowById(state, rowId))

    const { fileIds, docType } = row
    const { slug, label } = docType

    const isComplete = fileIds.length > 0

    const currentOption = { value: slug, label: label }

    const addFiles = (files: File[], isMarad: boolean = false) => {
        const newFiles = files.map((file) => ({
            file,
            name: file.name,
            isMarad,
            rowId
        }))

        dispatch(addFilesToRow(newFiles))
    }
    return (
        <TableRow>
            <TableCell>
                <span
                    className={classNames(
                        'flex w-10 h-6 rounded-full',
                        isComplete ? 'bg-green-500' : 'bg-red-500'
                    )}
                ></span>
            </TableCell>
            {/* Status */}
            <TableCell>
                <div className='p-6 flex flex-row items-center gap-4 space-y-0 h-full'>
                    <DeleteButton
                        confirmMessage='Are you sure you want to delete this row? Associated files will be deleted'
                        onClick={() => dispatch(deleteRows([rowId]))}
                    />
                </div>
            </TableCell>
            {/* Document Type */}
            <TableCell>
                <FileTypeSelector
                    currentOption={docType}
                    onChange={(value) => {
                        dispatch(updateFileRow({ ...row, docType: value }))
                    }}
                />
            </TableCell>
            {/* Assigned File */}
            <TableCell>
                <FloatingModalRoot>
                    <FloatingModalTrigger asChild={true}>
                        <Button>Add Files</Button>
                    </FloatingModalTrigger>
                    <FloatingModalContent>
                        <FormRoot>
                            <FormTextInput
                                // onSaved={(files) => addFiles(files)}
                            />
                        </FormRoot>
                    </FloatingModalContent>
                </FloatingModalRoot>
                {/* <div className='flex flex-row items-center gap-2'>
                    <div className='flex flex-col gap-2'>
                        <FileFormInput onSaved={addFiles} />
                        <StatusBar
                            status={fileIds.length > 0 ? 'success' : 'error'}
                        />
                    </div>
                </div> */}
            </TableCell>
            {/* <TableCell>
                {docType.marad ? (
                    <div className='flex flex-col items-center gap-2'>
                        <FileFormInput
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
            </TableCell> */}
            {/* Filename Preview */}
            {/* <TableCell>
                <FileNamePreviews rowId={rowId} />
            </TableCell> */}
            {/* File Preview */}
            {/* <TableCell>
                <FilePreviews fileIds={row.fileIds} />
            </TableCell> */}
        </TableRow>
    )
}
