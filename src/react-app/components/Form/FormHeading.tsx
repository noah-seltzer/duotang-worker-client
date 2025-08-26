interface FormHeadingProps {
    heading: string
    subHeading?: string
}

export function FormHeading({
    heading,
    subHeading = undefined
}: FormHeadingProps) {
    return (
        <div>
            <h2 className='text-base/7 font-semibold text-white'>{heading}</h2>
            <p className='mt-1 text-sm/6 text-gray-400'>
                {subHeading}
            </p>
        </div>
    )
}
