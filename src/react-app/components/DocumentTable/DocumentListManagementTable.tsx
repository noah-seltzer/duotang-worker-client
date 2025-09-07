import { useAppDispatch, useAppSelector } from '../../store'
import { selectDocumentListById, updateList } from '../../store/clientInfoSlice'
import { addRow, createBlankRow } from '../../store/fileListSlice'
import { ClientInput } from '../ClientInput/ClientInput'
import { ExportButton } from '../Input/ExportButton'
import { Button } from '../Skeleton/Button'
import { ListCompletionTracker } from './ListCompletionTracker'
import { Table } from '../Table/Table'
import { FileRow } from './FileRow'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { useTestHook } from '../../hooks/useTestHook'
import { SlideAnimation } from '../Animation/SlideLeftEnter'

const rowNames = ['Status', 'Delete', 'Document', 'File', 'Preview']

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
                            <Table rowNames={rowNames}>
                                {rows.map((r, i) => (
                                    <FileRow index={i + 1} key={r} rowId={r} />
                                ))}
                            </Table>
                            <div className='flex justify-between w-full'>
                                <div
                                    className='inline-flex rounded-md shadow-xs gap-2'
                                    role='group'
                                >
                                    <ExportButton />
                                    <Button onClick={() => createRowInList()}>
                                        Add Row
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
