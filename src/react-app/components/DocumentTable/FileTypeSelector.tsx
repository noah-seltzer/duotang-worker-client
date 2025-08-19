import Select from 'react-select'

export interface SelectOption {
    value: string
    label: string
}

interface FileTypeSelectorProps {
    options: SelectOption[]
    currentOption: SelectOption
    onChange: (value: SelectOption) => void
}

export function FileTypeSelector({
    options,
    currentOption,
    onChange
}: FileTypeSelectorProps) {
    return (
        <div className='overflow-visible'>
            <Select
                isMulti={false}
                className='basic-single overflow-visible w-76'
                options={options}
                value={currentOption}
                placeholder='Select Document Type'
                onChange={(value) => {
                    if (!value) return
                    onChange(value)
                }}
                styles={{
                    singleValue: (base) => ({ ...base, color: 'white' }),
                    valueContainer: (base) => ({
                        ...base,
                        color: 'hotpink',
                        width: '100%'
                    }),
                    control: (base) => ({
                        ...base,
                        background: '#1a1a1a',
                        color: '#99a1af',
                    })
                }}
                theme={(theme) => ({
                    ...theme,
                    neutral30: 'white', //control/borderColor(focused)
                    neutral80: 'white', //input color
                    primary25: '#ccc', //option bg color focued
                    primary: 'black', //option bg color selected
                    primary50: 'white', // option bg color active(enavled or available)
                    neutral90: 'hotpink'
                })}
            />
        </div>
    )
}
