import { createSlice } from '@reduxjs/toolkit'

export interface PageControlSliceState {
    OneDrivePickerIsOpen: boolean
}

const initialState: PageControlSliceState = {
    OneDrivePickerIsOpen: false
}

export const pageControlSlice = createSlice({
    name: 'pageControl',
    initialState,
    reducers: {
        setOneDrivePickerIsOpen: (state, action) => {
            state.OneDrivePickerIsOpen = action.payload
        }
    }
})

export const { setOneDrivePickerIsOpen } = pageControlSlice.actions

export default pageControlSlice.reducer
