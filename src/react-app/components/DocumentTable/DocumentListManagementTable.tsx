import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useAppDispatch, useAppSelector } from '@/store'
import { selectDocumentListById, updateList } from '@/store/clientInfoSlice'
import { addRow, createBlankRow } from '@/store/fileListSlice'
import { ClientInput } from '@/components/ClientInput/ClientInput'
import { ExportButton } from '@/components/Input/ExportButton'
import { Button } from '@/components/Skeleton/Button'
import { ListCompletionTracker } from '@/components/DocumentTable/ListCompletionTracker'
import { FileRow } from '@/components/DocumentTable/FileRow'
import { SlideAnimation } from '@/components/Animation/SlideLeftEnter'
import { OneDriveSyncButton } from '@/components/DocumentTable/OneDriveSyncButton'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/Skeleton/Table'

const rowNames = ['Status', 'File Type', 'File']

interface DocumentListManagementTableProps {
    documentListId: string
}

export function DocumentListManagementTable({
    documentListId
}: DocumentListManagementTableProps) {
    const dispatch = useAppDispatch()

    const list = useAppSelector((state) =>
        selectDocumentListById(state, documentListId)
    )

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
                                    <OneDriveSyncButton documentListId={id} />
                                    <Button onClick={() => createRowInList()}>
                                        <PlusCircledIcon /> Add Row
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div>{/* <EmailList /> */}</motion.div>
                    </AnimatePresence>
                </LayoutGroup>
            </div>
        </>
    )
}
