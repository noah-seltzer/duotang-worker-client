import { FileInput } from '@/components/Input/FileInput'
import { Button } from '@/components/Skeleton/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from '@/components/Skeleton/DropdownMenu'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { ChangeEvent, useState } from 'react'
export function FileAdderDropdown({
    onAddFile
}: {
    onAddFile: (
        e: ChangeEvent<HTMLInputElement>,
        isMarad?: boolean
    ) => {}
}) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button onClick={() => setOpen(!open)} className='mt-2 py-1 px-2 h-6'>
                    <PlusCircledIcon /> Add Related File
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                // onFocusOutside={event => {event.preventDefault()}}
                onInteractOutside={event => {event.preventDefault()}}
                >
                <DropdownMenuItem onSelect={event => event.preventDefault()}>
                    <FileInput
                        title='Add Marad File'
                        onChange={(e) => {
                            onAddFile(e, true)
                            setOpen(false)
                        }}
                    />
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <FileInput
                        title='Add Other File'
                        onChange={(e) => {
                            onAddFile(e, false)
                            setOpen(false)
                        }}
                    />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
