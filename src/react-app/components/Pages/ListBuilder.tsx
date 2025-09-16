import { FormContextProvider } from '@/components/Form/FormContextProvider'
import { H1 } from '@/components/Skeleton/Header/h1'
import { H4 } from '@/components/Skeleton/Header/h4'
import { Separator } from '@/components/Skeleton/separator'
import { FormTextInput } from '@/components/Form/FormTextInput'
import { useAppSelector } from '@/store'
import {
    addList,
    addListItem,
    selectListById,
    selectNewList,
    selectNewListItemIds,
    setNewListItemIds,
    setNewListName,
} from '@/store/listBuilderSlice'
import { useDispatch } from 'react-redux'
import { ListItemBuilder } from '@/components/ListBuilder/ListItemBuilder'
import { Button } from '@/components/Skeleton/Button'
import { nanoid } from '@reduxjs/toolkit'
import { Grid } from '@/components/Layout/Grid'
import { getValueFromOnChangeEvent } from '@/lib/input'
import { Checkbox } from '@/components/Skeleton/checkbox'
import { Label } from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'
interface ListBuilderProps {
    listId?: string
}
export function ListBuilder({ listId }: ListBuilderProps) {
    const dispatch = useDispatch()
    const currenList = listId
        ? useAppSelector((state) => selectListById(state, listId))
        : useAppSelector(selectNewList)
    const listItemIds = useAppSelector(selectNewListItemIds)

    const [marad, setMarad] = useState<boolean>(false)

    const addNewListItem = () => {
        const id = nanoid()

        dispatch(
            addListItem({
                id,
                label: '',
                activeItems: ['1', '2', '3', '4']
            })
        )

        dispatch(setNewListItemIds([...listItemIds, id]))
    }
    return (
        <div className='max-w-6xl'>
            <H1>List Builder</H1>
            <H4 className='mt-4 mb-2'>List Information</H4>
            <FormContextProvider
                initialValues={currenList}
                onSubmit={(values) => {
                    const id = nanoid()
                    const newList = {
                        id,
                        ...values,
                        listItemIds,
                        tags: marad ? ['MARAD'] : []
                    }
                    dispatch(addList(newList))
                }}
            >
                <>
                    <FormTextInput
                        name='name'
                        label='List Name'
                        placeholder='Ukrainian Mariner'
                        onInput={(e) =>
                            dispatch(
                                setNewListName(getValueFromOnChangeEvent(e))
                            )
                        }
                    />
                    <div className='flex flex-row items-center gap-1 mt-2'>
                        <Checkbox
                            defaultChecked={marad}
                            onCheckedChange={(checked) =>
                                setMarad(
                                    checked === 'indeterminate'
                                        ? false
                                        : checked
                                )
                            }
                        />
                        <Label>Does this use MARAD?</Label>
                    </div>
                </>
                <Button type='submit' className='mt-8'>
                    Submit List
                </Button>
            </FormContextProvider>

            <Separator className='mt-8 max-w-4xl' />

            <Grid className='mt-6'>
                {listItemIds.map((id) => (
                    <ListItemBuilder key={id} id={id} />
                ))}
            </Grid>
            <Separator className='mt-8 max-w-4xl' />

            <Button className='mt-8' onClick={() => addNewListItem()}>
                Add new Item
            </Button>
        </div>
    )
}
