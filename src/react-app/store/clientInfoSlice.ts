import { ClientInfo, ClientInfoInput } from '@/types/ClientInfo'
import {
    createEntityAdapter,
    createSlice,
    EntityState,
    nanoid,
    PayloadAction
} from '@reduxjs/toolkit'
import type { RootState } from '.'
import { updateOneEntity } from './actionHelpers'
import { DocumentList, DocumentListInput } from '@/types/DocumentList'

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
    listTypeId: '',
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

const addDocumentList = (
    state: ClientInfoState,
    payload: DocumentListInput
) => {
    const id = nanoid()
    documentListEntity.addOne(state.lists, {
        ...payload,
        id
    })
    const client = state.clients.entities[payload.clientId]
    client.documentListIds = client.documentListIds.concat(id)

    updateOneEntity(clientInfoEntity, state.clients, client)
}

const clientInfoSlice = createSlice({
    name: 'clientInfo',
    initialState,
    reducers: {
        addList: (state, action: PayloadAction<DocumentListInput>) => {
            addDocumentList(state, action.payload)
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
            addDocumentList(state, {
                name: 'newList',
                rows: [],
                clientId: newClient.id
            })
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

export const selectAllClients = (state: RootState) =>
    clientInfoSelectors.selectAll(state)

export const selectCurrentClient = (state: RootState) => {
    if (!state.clientInfo.currentClientId) return undefined
    return clientInfoSelectors.selectById(
        state,
        state.clientInfo.currentClientId
    )
}
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
