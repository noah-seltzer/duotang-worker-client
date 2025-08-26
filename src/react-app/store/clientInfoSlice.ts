import { ClientInfo, ClientInfoInput } from '../types/ClientInfo'
import {
    createEntityAdapter,
    createSlice,
    EntityState,
    nanoid,
    PayloadAction
} from '@reduxjs/toolkit'
import type { RootState } from '.'
import { updateOneEntity } from './actionHelpers'
import { DocumentList, DocumentListInput } from '../types/DocumentList'

interface ClientInfoState {
    newClient: ClientInfoInput
    currentClientId: string | undefined
    clients: EntityState<ClientInfo, string>
    lists: EntityState<DocumentList, string>
}

const createDefaultClient = (): ClientInfoInput => ({
    firstName: 'Noah',
    lastName: 'Seltzer',
    jobTitle: 'Second Engineer',
    documentListIds: []
})
const documentListEntity = createEntityAdapter<DocumentList>()
const clientInfoEntity = createEntityAdapter<ClientInfo>()

const initialState: ClientInfoState = {
    newClient: createDefaultClient(),
    currentClientId: undefined,
    clients: clientInfoEntity.getInitialState(),
    lists: documentListEntity.getInitialState()
}

const clientInfoSlice = createSlice({
    name: 'clientInfo',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<DocumentListInput>) => {
            const id = nanoid()
            documentListEntity.addOne(state.lists, {
                ...action.payload,
                id
            })
            const client = state.clients.entities[action.payload.clientId]
            client.documentListIds = client.documentListIds.concat(id)

            updateOneEntity(clientInfoEntity, state.clients, client)
        },
        updateList: (state, action: PayloadAction<DocumentList>) => {
            updateOneEntity(documentListEntity, state.lists, action.payload)
        },
        updateFirstName: (state, action) => {
            state.newClient.firstName = action.payload
        },
        updateLastName: (state, action) => {
            state.newClient.lastName = action.payload
        },
        updateJobTitle: (state, action) => {
            state.newClient.jobTitle = action.payload
        },
        updateCurrentClient: (state, action: PayloadAction<string>) => {
            state.currentClientId = action.payload
        },
        updateClient: (state, action: PayloadAction<ClientInfo>) => {
            updateOneEntity(clientInfoEntity, state.clients, action.payload)
        },
        addClient: (state, action: PayloadAction<ClientInfoInput>) => {
            const newClient = {
                ...action.payload,
                id: nanoid()
            }
            clientInfoEntity.addOne(state.clients, newClient)
            state.currentClientId = newClient.id
        }
    }
})

export const clientInfoSelectors = clientInfoEntity.getSelectors<RootState>(
    (state) => state.clientInfo.clients
)

export const documentListSelectors = documentListEntity.getSelectors<RootState>(
    (state) => state.clientInfo.lists
)

export const selectDocumentListById = (state: RootState, id: string) =>
    documentListSelectors.selectById(state, id)

export const selectNewClient = (state: RootState) => state.clientInfo.newClient
export const selectCurrentClientId = (state: RootState) =>
    state.clientInfo.currentClientId

export const selectClientById = (state: RootState, id: string) =>
    clientInfoSelectors.selectById(state, id)

export const {
    updateFirstName,
    updateLastName,
    updateJobTitle,
    updateCurrentClient,
    addClient,
    updateClient,
    addList,
    updateList
} = clientInfoSlice.actions

export type ClientInfoSlice = {
    [clientInfoSlice.name]: ReturnType<(typeof clientInfoSlice)['reducer']>
}

export default clientInfoSlice.reducer
