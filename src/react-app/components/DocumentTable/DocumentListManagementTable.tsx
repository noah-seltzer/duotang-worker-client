import { useAppDispatch, useAppSelector } from '@/store'
import { selectDocumentListById, updateList } from '@/store/clientInfoSlice'
import {
    addRow,
    createBlankRow,
    setOneDriveSyncFolder
} from '@/store/fileListSlice'
import { ClientInput } from '@/components/ClientInput/ClientInput'
import { ExportButton } from '@/components/Input/ExportButton'
import { Button } from '@/components/Skeleton/Button'
import { ListCompletionTracker } from '@/components/DocumentTable/ListCompletionTracker'
import { FileRow } from '@/components/DocumentTable/FileRow'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { SlideAnimation } from '@/components/Animation/SlideLeftEnter'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/Skeleton/Table'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import {
    Dialog,
    DialogPortal,
    DialogTrigger
} from '@/components/Skeleton/Dialog'
import { OneDriveIcon } from '@/components/Icon/OneDriveIcon'
import { Picker } from '@/components/OneDrive/Picker'
import { useUploadFileToFolderMutation } from '@/store/api/msal/files'
import { useMsal } from '@azure/msal-react'
import { MSALScopes } from '@/store/api/msal/headers'
import { Spinner } from '@/components/Skeleton/spinner'

const rowNames = ['Status', 'File Type', 'File']

interface DocumentListManagementTableProps {
    documentListId: string
}

export function DocumentListManagementTable({
    documentListId
}: DocumentListManagementTableProps) {
    const dispatch = useAppDispatch()
    const { instance } = useMsal()

    // const accounts = instance.getAllAccounts()

    const [uploadFile, { isLoading }] = useUploadFileToFolderMutation()

    const list = useAppSelector((state) =>
        selectDocumentListById(state, documentListId)
    )

    const folder = useAppSelector((state) => state.fileList.onedriveSyncFolder)

    const { rows, id } = list

    const createRowInList = () => {
        const newRow = createBlankRow(id)
        const newRows = rows.concat(newRow.id)
        dispatch(addRow(newRow))

        dispatch(
            updateList({
                ...list,
                rows: newRows
            })
        )
    }

    const startFileSync = async (item: any) => {
        await instance.initialize()
        const accounts = instance.getAllAccounts()
        const resp = await instance.acquireTokenSilent({
            scopes: MSALScopes,
            account: accounts[0]
        })
        dispatch(setOneDriveSyncFolder(item))
        uploadFile({ id: documentListId, token: resp.accessToken })
    }

    return (
        <>
            <div className='flex flex-row gap-4'>
                <LayoutGroup>
                    <AnimatePresence initial={false} mode='sync'>
                        <SlideAnimation>
                            <ListCompletionTracker listId={id} />
                        </SlideAnimation>

                        <motion.div
                            layout='position'
                            className='flex flex-col gap-4 justify-start overflow-x-auto overflow-y-visible col-span-3'
                            key='table'
                        >
                            <ClientInput />
                            <Table>
                                <TableHeader>
                                    <TableRow disableHover={true}>
                                        {rowNames.map((name, index) => (
                                            <TableHead key={index}>
                                                {name}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((r, i) => (
                                        <FileRow
                                            index={i + 1}
                                            key={r}
                                            rowId={r}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                            <div className='flex justify-between w-full'>
                                <div
                                    className='inline-flex rounded-md shadow-xs gap-2'
                                    role='group'
                                >
                                    <ExportButton documentId={id} />
                                    {isLoading && (
                                        <Button disabled>
                                            <Spinner variant='circle' />
                                            Loading...
                                        </Button>
                                    )}
                                    {!folder && !isLoading && (
                                        <Dialog>
                                            <DialogTrigger asChild={true}>
                                                <Button size='sm'>
                                                    <OneDriveIcon className='stroke-primary-foreground size-5' />
                                                    Select Onedrive Folder to
                                                    sync
                                                </Button>
                                            </DialogTrigger>
                                            <DialogPortal>
                                                <Picker
                                                    multiple={false}
                                                    mode='folder'
                                                    onPick={async (e) => {
                                                        startFileSync(
                                                            e.items[0]
                                                        )
                                                    }}
                                                />
                                            </DialogPortal>
                                        </Dialog>
                                    )}
                                    {folder && !isLoading && (
                                        <Button
                                            onClick={() =>
                                                startFileSync(folder)
                                            }
                                            size='sm'
                                        >
                                            <OneDriveIcon className='stroke-primary-foreground size-5' />
                                            Sync to Onedrive
                                        </Button>
                                    )}
                                    <Button onClick={() => createRowInList()}>
                                        <PlusCircledIcon /> Add Row
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </LayoutGroup>
            </div>
        </>
    )
}
