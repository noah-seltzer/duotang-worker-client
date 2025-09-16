import { ChangeEventHandler, MouseEventHandler } from 'react'
import { Button } from '@/components/Skeleton/Button'
import { FormCheckboxInput } from '@/components/Form/FormCheckboxInput'
import { FileInput } from '@/components/Input/FileFormInput'
import { MinusCircledIcon } from '@radix-ui/react-icons'

interface FileDetailsProps {
    file: FileInput
    onClick: MouseEventHandler<HTMLButtonElement>
    onCheckboxChange: ChangeEventHandler<HTMLInputElement>
}
export function FileDetails({
    file,
    onClick,
    onCheckboxChange
}: FileDetailsProps) {
    return (
        <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 items-center'>
            <dt className='text-sm/6 font-medium text-gray-100'>
                {file.file.name}
            </dt>
            <dd className='mt-1 text-sm/6 text-gray-400 sm:mt-0'>
                <FormCheckboxInput
                    checked={file.isMarad}
                    onSelect={onCheckboxChange}
                    label='Is this file MARAD?'
                />
            </dd>

            <dd className=''>
                <Button className='p-2' onClick={onClick}>
                    <MinusCircledIcon className='w-4 h-4' />
                </Button>
            </dd>
        </div>
    )
}

interface FileDetailListProps {
    files: FileInput[]
    onClick: (index: number) => void
    onCheckboxChange: (index: number, value: boolean) => void
}
export function FileDetailsList({
    files,
    onClick,
    onCheckboxChange
}: FileDetailListProps) {
    return (
        <div className='mt-6 border-t border-white/10'>
            <dl className='divide-y divide-white/10'>
                {files.map((file, index) => (
                    <FileDetails
                        key={index}
                        file={file}
                        onCheckboxChange={(e) =>
                            onCheckboxChange(index, e.target.checked)
                        }
                        onClick={() => onClick(index)}
                    />
                ))}
            </dl>
        </div>
    )
}
