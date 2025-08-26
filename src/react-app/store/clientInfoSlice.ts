import { ClientInfo } from '../types/ClientInfo'
import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '.'

interface ClientInfoState {
    newClient: ClientInfo
}

const initialState: ClientInfoState = {
    newClient: {
        firstName: 'Noah',
        lastName: 'Seltzer',
        jobTitle: 'Second Engineer'
    }
}

export const clientInfoSlice = createSlice({
    name: 'clientInfo',
    initialState,
    reducers: {
        updateFirstName: (state, action) => {
            state.newClient.firstName = action.payload
        },
        updateLastName: (state, action) => {
            state.newClient.lastName = action.payload
        },
        updateJobTitle: (state, action) => {
            state.newClient.jobTitle = action.payload
        }
    }
})

export const selectClientInfo = (state: RootState) => state.clientInfo.newClient

export const { updateFirstName, updateLastName, updateJobTitle } =
    clientInfoSlice.actions

export default clientInfoSlice.reducer
