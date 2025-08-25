import { createSlice } from '@reduxjs/toolkit'
export interface SavedList {
    name: string
    id: string
    description: string
    // items: ListRow[]
    // dateCreated: Date
    // dateModified: Date
}

export interface SavedListState {
    lists: SavedList[]
}

const initialState = {
    lists: [
        {
            name: 'listA',
            id: 'asdlfjweiof',
            description: 'the list of A'
        },
        {
            name: 'listB',
            id: 'odifjaweionmv',
            description: 'the B list'
        }
    ]
}

export const savedListSlice = createSlice({
    name: 'savedLists',
    initialState: initialState,
    reducers: {}
})

export default savedListSlice.reducer
