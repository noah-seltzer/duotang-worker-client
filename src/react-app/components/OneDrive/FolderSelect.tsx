import { OneDriveIcon } from '@/components/Icon/OneDriveIcon'
import { Picker } from '@/components/OneDrive/Picker'
import { Button } from '@/components/Skeleton/Button'
import {
    Dialog,
    DialogPortal,
    DialogTrigger
} from '@/components/Skeleton/Dialog'

export function FolderSelect() {
    return (
        <Dialog>
            <DialogTrigger asChild={true}>
                <Button size='sm'>
                    <OneDriveIcon className='stroke-primary-foreground size-5' />
                    Select Onedrive Folder
                </Button>
            </DialogTrigger>
            <DialogPortal>
                <Picker
                    multiple={false}
                    mode='folder'
                    onPick={async (e) => console.log(e)}
                />
            </DialogPortal>
        </Dialog>
    )
}
