import { ChangeEvent, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { IPublicClientApplication } from '@azure/msal-browser'
import {
    Root as DialogRoot,
    Trigger as DialogTrigger,
    Portal as DialogPortal
} from '@radix-ui/react-dialog'
import { OneDriveIcon } from '@/components/Icon/OneDriveIcon'
import { Picker } from '@/components/OneDrive/Picker'
import { Login } from '@/components/Auth/Login'
import type { OneDrivePickedFileResult } from '@/types/OneDrivePickedFileResult'
import { fileDownloadRequest } from '@/data/auth-config'
import { FileInput } from '@/components/Input/FileInput'
import { Button } from '@/components/Skeleton/Button'
import { FileDetailsList } from '@/components/Files/Filedetails'
interface FileFormInputProps {
    onChange?: (files: FileList | null) => void
    onSaved: (fileIds: FileInput[]) => void
    onCancel?: () => void
    title?: string
}

const processOnedriveFileSelected = async (
    instance: IPublicClientApplication,
    command: OneDrivePickedFileResult
) => {
    const account = instance.getAllAccounts()[0]
    const files = await Promise.all(
        command.items.map(async (item) => {
            const token = await instance.acquireTokenPopup({
                ...fileDownloadRequest,
                account
            })
            const res = await fetch(
                `https://graph.microsoft.com/v1.0/me/drive/items/${item.id}/content`,
                {
                    headers: {
                        authorization: `Bearer ${token.accessToken}`
                    }
                }
            )
            const blob = await res.blob()
            return new File([blob], item.name)
        })
    )
    return files
}

export interface FileInput {
    file: File
    isMarad: boolean
}

export function FileFormInput({ onSaved, onCancel }: FileFormInputProps) {
    const { instance } = useMsal()

    const [currentFiles, setCurrentFiles] = useState<FileInput[]>([])

    const addToCurrentFiles = (files: File[]) => {
        setCurrentFiles([
            ...currentFiles,
            ...files.map((file) => ({ file, isMarad: false }))
        ])
    }

    const removeFromCurrentFiles = (index: number) => {
        if (currentFiles.length === 1) {
            setCurrentFiles([])
        } else {
            setCurrentFiles(currentFiles.splice(index, 1))
        }
    }
    const changeMaradValue = (index: number, value: boolean) => {
        const fileShallowCopy = { ...currentFiles[index] }
        fileShallowCopy.isMarad = value
        currentFiles[index] = fileShallowCopy
        setCurrentFiles([...currentFiles])
    }

    const isLoggedIn = instance.getAllAccounts().length > 0

    const onOnedriveFileSelected = async (command: any) => {
        const files = await processOnedriveFileSelected(instance, command)
        addToCurrentFiles(files)
    }

    const onLocalFilesSelected = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (!files) return
        addToCurrentFiles(Array.from(files))
    }

    return (
        <>
            <div className='flex flex-row items-center gap-2'>
                <FileInput
                    title={'Select from local files'}
                    onChange={onLocalFilesSelected}
                />
                {isLoggedIn ? (
                    <>
                        <DialogRoot>
                            <DialogTrigger asChild={true}>
                                <Button variant='outline' size='sm'>
                                    <OneDriveIcon className='stroke-primary-foreground size-5' />
                                    Select from Onedrive
                                </Button>
                            </DialogTrigger>
                            <DialogPortal>
                                <Picker onPick={onOnedriveFileSelected} />
                            </DialogPortal>
                        </DialogRoot>
                    </>
                ) : (
                    <Login>
                        <Button className='flex flex-row items-center gap-2'>
                            <OneDriveIcon className='stroke-primary-foreground size-5' />
                            Login to select from Onedrive
                        </Button>
                    </Login>
                )}
            </div>
            <FileDetailsList
                onCheckboxChange={changeMaradValue}
                onClick={removeFromCurrentFiles}
                files={currentFiles}
            />
            <div className='flex flex-row gap-2'>
                <Button onClick={() => onSaved(currentFiles)}>Save</Button>
                <Button onClick={() => onCancel && onCancel()}>Cancel</Button>
            </div>
        </>
    )
}
