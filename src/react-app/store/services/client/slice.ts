import { createEntityAdapter, createSlice, current, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";
import { getEntityAdapterActionReducers } from "../../actionHelpers";

export interface ClientInput {
    firstName: string
    lastName: string
    jobTitle: string
}

interface Client extends ClientInput {
    id: string
    submissionListId: string
}

export type ClientState = {
    currentClientId: string | null
    newClient: ClientInput
}

const initialState: ClientState = {
    currentClientId: null,
    newClient: {
        'firstName': 'John',
        'lastName': 'Owens',
        'jobTitle': 'Second Officer'
    }
}

const clientEntity = createEntityAdapter<Client>()

const actionReducers = getEntityAdapterActionReducers(clientEntity)

const clientSlice = createSlice({
    name: 'client',
    initialState: clientEntity.getInitialState(initialState),
    reducers: { 
        setCurrentClientId(state, action: PayloadAction<string>) {
            state.currentClientId = action.payload
        },
        ...actionReducers
     }
})

export const clientSelectors = clientEntity.getSelectors<RootState>(
    (state) => state.client
)

export const selectCurrentClientId = (state: RootState) => state.client.currentClientId
export const selectNewClient = (state: RootState) => state.client.newClient
export const selectClientById = (state: RootState, id: string) => clientSelectors.selectById(state, id)

export const clientActions = clientSlice.actions

export const {
    addOne: addClient,
    addMany: addClients,
    setAll: setClients,
    updateOne: updateClient,
    updateMany: updateClients,
    removeOne: removeClient,
    removeMany: removeClients,
    setCurrentClientId
} = clientActions





export type ClientSlice = {
    [clientSlice.name]: ReturnType<(typeof clientSlice)['reducer']>
}


export default clientSlice.reducer