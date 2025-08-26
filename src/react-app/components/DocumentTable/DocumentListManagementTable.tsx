import { useDocumentListState } from "../../hooks/useDocumentListState"
import { useAppSelector } from '../../store'
import { selectDocumentListById } from '../../store/clientInfoSlice'
import { ExportButton } from "../Input/ExportButton"
import { Button } from "../Skeleton/Button"
import { Table } from "../Table/Table"
import { FileRow } from "./FileRow"

const rowNames = ['Status', 'Delete', 'Document', 'File', 'Preview']


interface DocumentListManagementTableProps {
    documentListId: string
}

export function DocumentListManagementTable({ documentListId }: DocumentListManagementTableProps) {
    const { rows } = useAppSelector((state) => selectDocumentListById(state, documentListId))

    const {createRowInList} = useDocumentListState(documentListId)

    return <div>
                
                <div className='relative overflow-x-auto overflow-y-visible'>
                    <Table rowNames={rowNames}>
                        {rows.map((r, i) => (
                            <FileRow index={i + 1} key={r} rowId={r} />
                        ))}
                    </Table>
                </div>
                <div className='w-full flex justify-left mt-2'></div>
                <div className='flex justify-between mt-2 w-full'>
                    <div
                        className='inline-flex rounded-md shadow-xs gap-2'
                        role='group'
                    >
                        <ExportButton />
                        <Button onClick={() => createRowInList(documentListId)}>Add Row</Button>
                    </div>
                </div>
            </div>

}