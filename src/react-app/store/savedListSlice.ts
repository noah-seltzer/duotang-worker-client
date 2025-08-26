import { createSlice } from '@reduxjs/toolkit'
export interface DocumentList {
    name: string
    id: string
    description: string
    // items: ListRow[]
    // dateCreated: Date
    // dateModified: Date
}

export interface DocumentListState {
    lists: DocumentList[]
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

export const documentListSlice = createSlice({
    name: 'documentLists',
    initialState: initialState,
    reducers: {}
})

export default documentListSlice.reducer
