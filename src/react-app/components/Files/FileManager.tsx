import { FilePreview } from '@/components/Files/FilePreview'
import { Button } from '@/components/Skeleton/Button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/Skeleton/Popover'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

interface FileManagerProps {
    fileIds: string[]
}

export function FileManager({ fileIds }: FileManagerProps) {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button className='flex flex-row gap-4 items-center' variant="outline">
                    <div className='data-[state=open]:hidden'>{open ? 'Hide files' : 'Show files'}</div>
                    <ChevronDownIcon 
                        className={cn('text-violet10 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)]', open && 'rotate-180')}
                        aria-hidden
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='max-h-96 w-200 overflow-y-scroll grid grid-cols-3 gap-2 mt-2'>
                {fileIds.map((id) => (
                    <div key={id} className='flex flex-row items-center gap-1'>
                        <FilePreview fileId={id} />
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    )
}
