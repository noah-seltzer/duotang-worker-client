import { InputProps } from '@/components/Skeleton/input'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useId } from 'react'

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
    children,
    ...props
}: FileFormDropZoneProps) {
    const id = useId()
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
                            htmlFor={id}
                            className='flex flex-row items-center gap-1 cursor-pointer rounded-md bg-transparent font-semibold text-muted-foreground hover:text-muted'
                        >
                            <PlusCircledIcon />
                            <span>{linkMessage}</span>
                            <input
                                {...props}
                                id={id}
                                name='file-upload'
                                type='file'
                                className='sr-only'
                            />
                        </label>
                        {secondaryMessage && (
                            <p className='pl-1'>{secondaryMessage}</p>
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}
