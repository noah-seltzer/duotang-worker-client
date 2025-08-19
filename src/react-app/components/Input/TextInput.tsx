export interface TextInputProps {
    placeholder?: string
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    name?: string
    label?: string
}

export function TextInput({
    placeholder,
    value,
    onChange,
    name,
    label
}: TextInputProps) {
    return (
        <div className='flex flex-col items-start'>
            {label ?? (
                <label
                    htmlFor={name}
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                    {label}
                </label>
            )}
            <input
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                type='text'
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
