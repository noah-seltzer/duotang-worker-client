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
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: 'hotpink',
                        primary: 'black'
                    }
                })}
                styles={{
                    option: (base, props) => {
                        const color = props.isSelected ? 'white' : 'black'
                        return {
                            ...base,
                            color
                        }
                    }
                }}
            />
        </div>
    )
}
