import { defaultFileNameComponents } from '@/data/file-name-components'
import { RootState } from '@/store'
import { updateOneEntity } from '@/store/actionHelpers'
import { FileNameComponent } from '@/types/FileNameComponent'
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'

interface ListInput {
    name: string
}

interface List extends ListInput {
    id: string
    listItemIds: string[]
}

interface ListItemInput {
    label: string
    activeItems: string[]
}

interface ListItem extends ListItemInput {
    id: string
    listId?: string
}

const fileNameComponentEntity = createEntityAdapter<FileNameComponent>()
const listEntity = createEntityAdapter<List>()
const listItemEntity = createEntityAdapter<ListItem>()

interface ListBuilderState {
    fileNameComponents: EntityState<FileNameComponent, string>
    lists: EntityState<List, string>
    listItems: EntityState<ListItem, string>
    newList: ListInput
    newListItemIds: string[]
}

const initialState: ListBuilderState = {
    fileNameComponents: fileNameComponentEntity.getInitialState(
        {},
        defaultFileNameComponents
    ),
    lists: listEntity.getInitialState(),
    listItems: listItemEntity.getInitialState(),
    newList: {
        name: ''
    },
    newListItemIds: []
}

const listBuilderSlice = createSlice({
    name: 'listBuilder',
    initialState,
    reducers: {
        setNewListName: (state, action) => {
            state.newList.name = action.payload
        },
        setNewListItemIds: (state, action) => {
            state.newListItemIds = action.payload
        },
        updateNewListItemIds: (state, action) => {
            state.newListItemIds = action.payload

        },
        addFileNameComponent: (state, action) => {
            fileNameComponentEntity.addOne(
                state.fileNameComponents,
                action.payload
            )
        },
        updateFileNameComponent: (state, action) => {
            fileNameComponentEntity.updateOne(
                state.fileNameComponents,
                action.payload
            )
        },
        addList: (state, action) => {
            listEntity.addOne(state.lists, action.payload)
        },
        updateList: (state, action) => {
            updateOneEntity(listEntity, state.lists, action.payload)
        },
        addListItem: (state, action) => {
            listItemEntity.addOne(state.listItems, action.payload)
        },
        updateListItem: (state, action) => {
            updateOneEntity(listItemEntity, state.listItems, action.payload)
        },
        removeListItem: (state, action) => {
            listItemEntity.removeOne(state.listItems, action.payload)
        }
    }
})

export type ListBuilderSlice = {
    [listBuilderSlice.name]: ReturnType<(typeof listBuilderSlice)['reducer']>
}

export const fileNameComponentSelectors =
    fileNameComponentEntity.getSelectors<RootState>(
        (state) => state.listBuilder.fileNameComponents
    )
export const listSelectors = listEntity.getSelectors<RootState>(
    (state) => state.listBuilder.lists
)
export const listItemSelectors = listItemEntity.getSelectors<RootState>(
    (state) => state.listBuilder.listItems
)

export const selectNewList = (state: RootState) => state.listBuilder.newList
export const selectNewListItemIds = (state: RootState) => state.listBuilder.newListItemIds

export const selectAllFileNameComponents = (state: RootState) =>
    fileNameComponentSelectors.selectAll(state)
export const selectAllListItems = (state: RootState) =>
    listItemSelectors.selectAll(state)

export const selectListItemById = (state: RootState, id: string) =>
    listItemSelectors.selectById(state, id)

export const selectListById = (state: RootState, id: string) =>
    listSelectors.selectById(state, id)

export const {
    setNewListName,
    addFileNameComponent,
    updateFileNameComponent,
    addList,
    updateList,
    addListItem,
    updateListItem,
    removeListItem,
    setNewListItemIds
} = listBuilderSlice.actions

export default listBuilderSlice.reducer
