import { ClientInput } from '../ClientInput/ClientInput'
import { FileRow } from './FileRow'
import { Table } from '../Table/Table'
import { DOCUMENT_TYPES } from '../../data/document-list'
import { LoginOutButtons } from '../Auth/LoginOutButtons'
import { useAppDispatch, useAppSelector } from '../../store'
import { addFileRow, selectfileList } from '../../store/fileListSlice'
import { Button } from '../Skeleton/Button'
import { ExportButton } from '../Input/ExportButton'

export const createBlankRow = (index: number = 0) => {
    return {
        id: index + 1,
        docType: DOCUMENT_TYPES[0],
        file: null,
        maradFile: null
    }
}

const rowNames = [
    'Status',
    'Document',
    'File',
    'Marad File',
    'Filename',
    'File'
]

/**
 * Outermost parent for the spreadsheet-like document table
 */
export function DocumentTable(): React.JSX.Element {
    const rows = useAppSelector(selectfileList)
    const dispatch = useAppDispatch()

    const addRow = () => {
        dispatch(addFileRow())
    }

    const rowElements = rows.map((r, i) => (
        <FileRow index={i + 1} key={r.id} row={r} />
    ))
    // const options = DOCUMENT_TYPES.map((docType) => ({
    //     value: docType.slug,
    //     label: docType.label
    // }))
    // const usedSlugs = rows.map((r) => r.docType.slug)

    // const unusedOptions = options.filter(
    //     (option) => !usedSlugs.includes(option.value)
    // )

    // const PopoverTrigger = (
    //     <Button onClick={() => setIsOpen(true)}>Add Row</Button>
    // )
    return (
        <div>
            <div className='flex justify-left gap-2 mb-2'>
                <LoginOutButtons />
                <ClientInput />
            </div>
            <div className='relative'>
                <Table rowNames={rowNames} rows={rowElements} />
            </div>
            <div className='w-full flex justify-left mt-2'>
                {/* <Popover
                    trigger={PopoverTrigger}
                    side='right'
                    onOpenChange={setIsOpen}
                >
                    <div className='pt-2'>
                        <FileTypeSelector
                            currentOption={unusedOptions[0]}
                            options={unusedOptions}
                            onChange={(value) => addRow(value.value)}
                        />
                    </div>
                </Popover> */}
            </div>
            <div className='flex justify-between mt-2 w-full'>
                <ExportButton />
                <Button onClick={() => addRow()}>Add Row</Button>
            </div>
        </div>
    )
}
