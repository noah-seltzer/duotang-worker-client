import { InputProps } from '@/components/Skeleton/input'
import { FileIcon, PlusCircledIcon } from '@radix-ui/react-icons'

interface FileFormDropZoneProps extends InputProps {
    label?: string
    linkMessage: string
    secondaryMessage?: string
    fileName?: string
}

export function FormFileDropZone({
    label,
    linkMessage,
    secondaryMessage,
    fileName,
    ...props
}: FileFormDropZoneProps) {
    return (
        <>
            {label && (
                <label
                    htmlFor='cover-photo'
                    className='block text-sm/6 font-medium text-white'
                >
                    Cover photo
                </label>
            )}
            <div className='flex justify-start rounded-lg border border-dashed border-foreground/25'>
                <div className='text-center py-2 px-4'>
                    {/* <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-600" /> */}
                    <div className='flex text-sm/6 text-primary'>
                        <label
                            htmlFor='file-upload'
                            className='flex flex-row items-center gap-1 cursor-pointer rounded-md bg-transparent font-semibold text-muted-foreground hover:text-muted'
                        >
                            <PlusCircledIcon />
                            <span>{linkMessage}</span>
                            <input
                                {...props}
                                id='file-upload'
                                name='file-upload'
                                type='file'
                                className='sr-only'
                            />
                        </label>
                        {secondaryMessage && (
                            <p className='pl-1'>{secondaryMessage}</p>
                        )}
                    </div>
                    {fileName && (
                        <div className='flex flex-row justify-start items-center'>
                            <FileIcon />
                            <p className='pl-1 text-underline'>{fileName}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
