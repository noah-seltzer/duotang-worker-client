import { RootState } from "@/store"
import { createSlice } from "@reduxjs/toolkit"

interface AppearanceState {
    hoveredRowId?: string 
}

const appearanceSlice = createSlice({
    name: 'appearance',
    initialState: {
        listHoverIndex: undefined
    } as AppearanceState,
    reducers: {
        setListHoverIndex: (state, action) => {
            state.hoveredRowId = action.payload
        }
    }
})

export const selectListHoverIndex = (state: RootState) => state.appearance.hoveredRowId


export const { setListHoverIndex } = appearanceSlice.actions

export default appearanceSlice.reducer