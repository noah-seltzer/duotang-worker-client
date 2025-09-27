import { Login } from '@/components/Auth/Login'
import { OneDriveIcon } from '@/components/Icon/OneDriveIcon'
import { LoaderButton } from '@/components/Loader/LoaderButton'
import { Picker } from '@/components/OneDrive/Picker'
import { Button } from '@/components/Skeleton/Button'
import { useMsGraph } from '@/hooks/useMsal'
import { useAppSelector } from '@/store'
import { useUploadFileToFolderMutation } from '@/store/api/msal/files/files'
import { selectOneDriveFolder, setOneDriveSyncFolder } from '@/store/fileListSlice'
import { Dialog, DialogPortal, DialogTrigger } from '@radix-ui/react-dialog'
import { useDispatch } from 'react-redux'

interface OneDriveSyncButtonProps {
    documentListId: string
}


export function OneDriveSyncButton({ documentListId }: OneDriveSyncButtonProps) {
    const dispatch  = useDispatch()
    const [uploadFile, { isLoading, isError }] = useUploadFileToFolderMutation()

    const { isLoggedIn, account, getToken } = useMsGraph()

    const folder = useAppSelector(selectOneDriveFolder)


    if (!isLoggedIn) return  <Login variant={'secondary'}  />
    const startFileSync = async (item: any) => {
        const token = await getToken()
        if (!token) return
        dispatch(setOneDriveSyncFolder(item))
        uploadFile({ id: documentListId, token })
    }

    
    return (
        <>
            {/* {isError && } */}
            {isLoading && <LoaderButton />}
            {!folder && !isLoading && (
                <Dialog>
                    <DialogTrigger asChild={true}>
                        <Button>
                            <OneDriveIcon className='stroke-primary-foreground size-5' />
                            {isError ? 'Error, try again' : 'Select Onedrive Folder to sync'}
                        </Button>
                    </DialogTrigger>
                    <DialogPortal>
                        <Picker
                            multiple={false}
                            mode='folder'
                            onPick={async (e) => {
                                startFileSync(e.items[0])
                            }}
                        />
                    </DialogPortal>
                </Dialog>
            )}
            {folder && !isLoading && account && (
                <Button onClick={() => startFileSync(folder)}>
                    <OneDriveIcon className='stroke-primary-foreground size-5' />
                    Sync to Onedrive
                </Button>
            )}
        </>
    )
}
