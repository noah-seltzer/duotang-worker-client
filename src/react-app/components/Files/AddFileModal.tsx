import { useState } from 'react'
import {
    FloatingModalContent,
    FloatingModalRoot,
    FloatingModalTrigger
} from '@/components/Skeleton/FloatingModal'
import { FormHeading } from '@/components/Form/FormHeading'
import { FileFormInput, FileInput } from '@/components/Input/FileFormInput'
import { addFilesToRow } from '@/store/thunks/fileList'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectRowById } from '@/store/fileListSlice'
import { Button } from '@/components/Skeleton/Button'
import { PlusCircledIcon } from '@radix-ui/react-icons'

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
                <Button onClick={() => setOpen(true)} variant='ghost' size='sm'>
                    <PlusCircledIcon /> Add Files
                </Button>
            </FloatingModalTrigger>
            <FloatingModalContent className='flex flex-col gap-4'>
                <FormHeading
                    heading={`Add File for ${row.docType.label}`}
                    subHeading='This will not overwrite existing files'
                />
                <FileFormInput
                    onSaved={(files) => {
                        addFiles(files)
                    }}
                    onCancel={() => setOpen(false)}
                />
                <hr />
            </FloatingModalContent>
        </FloatingModalRoot>
    )
}
