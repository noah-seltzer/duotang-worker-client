import { useRef } from 'react'
import { FolderIcon } from '../Icon/FolderIcon'
import { Button } from '../Skeleton/Button'


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
                className='flex flex-row gap-2'
                onClick={() => fileInputRef.current?.click()}
            >
                {title ?? ''}
                <FolderIcon />
            </Button>
            <input
                type='file'
                ref={fileInputRef}
                onChange={onChange}
                multiple={true}
                hidden
                directory={folder ? 'true' : undefined}
                webkitdirectory={folder ? 'true' : undefined}
            />
        </>
    )
}
