import { FormContextProvider } from '@/components/Form/FormContextProvider'
import { FormTextInput } from '@/components/Form/FormTextInput'
import {
    Popover,
    PopoverAnchor,
    PopoverContent,
    PopoverTrigger
} from '@/components/Skeleton/Popover'
import { Draggable } from '@/components/Draggable/Draggable'
import { DraggableItem } from '@/components/Draggable/DraggableItem'
import { Badge } from '@/components/Skeleton/Badge'
import { LayoutGroup, motion } from 'motion/react'
import { Label } from '@/components/Skeleton/Label'
import { Card, CardContent } from '@/components/Skeleton/card'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { FileNameComponent } from '@/types/FileNameComponent'
import { useAppSelector } from '@/store'
import {
    selectAllFileNameComponents,
    selectListItemById,
    selectNewList,
    updateListItem
} from '@/store/listBuilderSlice'
import { useDispatch } from 'react-redux'
import { ListItemBuilderFlyout } from '@/components/ListBuilder/ListItemBuilderFlyout'
import { getValueFromOnChangeEvent } from '@/lib/input'
import { replaceSpaceWithUnderscore } from '@/lib/string'

interface ListItemBuilderProps {
    id: string
}

export function ListItemBuilder({ id }: ListItemBuilderProps) {
    const dispatch = useDispatch()

    const listItem = useAppSelector((state) => selectListItemById(state, id))
    const { name: newListName } = useAppSelector(selectNewList)
    const { activeItems } = listItem
    const fileNameComponents = useAppSelector(selectAllFileNameComponents)

    const setActiveItems = (items: string[]) => {
        dispatch(updateListItem({ ...listItem, activeItems: [...items] }))
    }
    const handleUnselect = (item: string) => {
        setActiveItems(activeItems.filter((i) => i !== item))
    }

    const handleSelect = (item: string) => {
        setActiveItems([...activeItems, item])
    }
    const createPreview = (item: FileNameComponent, index: number) => {
        let label = item.example
        if (item.value === 'certificate-name') {
            label = replaceSpaceWithUnderscore(listItem.label || item.example)
        }
        if (item.value === 'list-name') {
            label = replaceSpaceWithUnderscore(newListName || item.example)
        }
        return label + (index === activeItems.length - 1 ? '.pdf' : '_')
    }

    const getItem = (id: string) =>
        fileNameComponents.find((item) => item.id === id) as FileNameComponent

    return (
        <FormContextProvider
            initialValues={listItem}
            onSubmit={(values) => console.log('submitted', values)}
        >
            <div className='flex flex-col space-y-6'>
                <FormTextInput
                    name='label'
                    label='Item Name'
                    placeholder='Passport Photo'
                    onInput={(e) => {
                        dispatch(
                            updateListItem({
                                ...listItem,
                                label: getValueFromOnChangeEvent(e)
                            })
                        )
                    }}
                />
                <div>
                    <Card className='w-fit'>
                        <CardContent className='w-fit'>
                            <div className='flex flex-row items-center gap-2'>
                                <Popover>
                                    <PopoverAnchor>
                                        <div className='flex flex-row justify-between mb-7'>
                                            <Label>
                                                File Name (Drag to re-order)
                                            </Label>
                                            <PopoverTrigger>
                                                <DotsVerticalIcon />
                                            </PopoverTrigger>
                                        </div>
                                        <div className='flex flex-row gap-2 items-end'>
                                            <div>
                                                <Draggable
                                                    items={activeItems}
                                                    onChange={(items) =>
                                                        setActiveItems(items)
                                                    }
                                                >
                                                    <div className='flex flex-row gap-1'>
                                                        {activeItems.map(
                                                            (id) => {
                                                                const item =
                                                                    getItem(id)
                                                                return (
                                                                    <DraggableItem
                                                                        id={id}
                                                                        key={id}
                                                                        lockSize={
                                                                            true
                                                                        }
                                                                    >
                                                                        <Badge>
                                                                            {
                                                                                item.label
                                                                            }
                                                                        </Badge>
                                                                    </DraggableItem>
                                                                )
                                                            }
                                                        )}
                                                    </div>
                                                </Draggable>
                                                <div className='flex flex-row mt-2'>
                                                    <LayoutGroup>
                                                        {activeItems.map(
                                                            (id, i) => {
                                                                const item =
                                                                    getItem(id)
                                                                return (
                                                                    <motion.div
                                                                        layout
                                                                        key={id}
                                                                    >
                                                                        {createPreview(
                                                                            item,
                                                                            i
                                                                        )}
                                                                    </motion.div>
                                                                )
                                                            }
                                                        )}
                                                    </LayoutGroup>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverAnchor>
                                    <PopoverContent align='end'>
                                        <ListItemBuilderFlyout
                                            fileNameComponents={
                                                fileNameComponents
                                            }
                                            activeItems={activeItems}
                                            handleSelect={handleSelect}
                                            handleUnselect={handleUnselect}
                                            handleClear={() =>
                                                setActiveItems([])
                                            }
                                            handleCopy={() =>
                                                console.log('copy')
                                            }
                                            handleDelete={() =>
                                                console.log('delete')
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </FormContextProvider>
    )
}
