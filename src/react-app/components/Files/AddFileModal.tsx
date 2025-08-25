import {
    FloatingModalContent,
    FloatingModalRoot,
    FloatingModalTrigger
} from '../Skeleton/FloatingModal'
import { FormHeading } from '../Form/FormHeading'
import { FormRoot } from '../Form/Form'
import { FileFormInput, FileInput } from '../Input/FileFormInput'
import { addFilesToRow } from '../../store/fileListThunks'
import { useAppDispatch, useAppSelector } from '../../store'
import { selectRowById } from '../../store/fileListSlice'
import { Button } from '../Skeleton/Button'
import { useState } from 'react'

interface AddFileModalProps {
    rowId: string
}
export function AddFileModal({ rowId }: AddFileModalProps) {
    const dispatch = useAppDispatch()
    const row = useAppSelector((state) => selectRowById(state, rowId))

    const [open, setOpen] = useState<boolean>(false)

    const addFiles = (files: FileInput[]) => {
        const newFiles = files.map(({ file, isMarad }) => ({
            file,
            name: file.name,
            isMarad,
            rowId
        }))

        dispatch(addFilesToRow(newFiles))
        setOpen(false)
    }
    return (
        <FloatingModalRoot open={open}>
            <FloatingModalTrigger asChild={true}>
                <Button onClick={() => setOpen(true)}>Add Files</Button>
            </FloatingModalTrigger>
            <FloatingModalContent className='flex flex-col gap-4'>
                <FormHeading
                    heading={`Add File for ${row.docType.label}`}
                    subHeading='This will not overwrite existing files'
                />
                <FormRoot>
                    <FileFormInput
                        onSaved={(files) => {
                            addFiles(files)
                        }}
                        onCancel={() => setOpen(false)}
                    />
                    <hr />
                </FormRoot>
            </FloatingModalContent>
        </FloatingModalRoot>
    )
}
