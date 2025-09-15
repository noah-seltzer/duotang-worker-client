import { useRef } from 'react'
import { FolderIcon } from '../Icon/FolderIcon'
import { Button } from '@/components/Skeleton/Button'

interface FileInputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    title?: string
    folder?: boolean
}

export function FileInput({ onChange, title, folder = false }: FileInputProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <Button
                className='flex flex-row gap-2 items-center'
                onClick={() => fileInputRef.current?.click()}
            >
                <FolderIcon className='stroke-primary-foreground size-5' />
                {title ?? ''}
            </Button>
            <input
                type='file'
                ref={fileInputRef}
                onSelect={onChange}
                multiple={true}
                hidden
                directory={folder ? 'true' : undefined}
                webkitdirectory={folder ? 'true' : undefined}
            />
        </>
    )
}
