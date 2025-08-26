import {
    addListener,
    combineReducers,
    configureStore,
    createListenerMiddleware,
    ListenerEffectAPI,
    TypedAddListener,
    TypedStartListening
} from '@reduxjs/toolkit'
import localForage from 'localforage'
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
    persistReducer
} from 'redux-persist'
import fileListSlice from './fileListSlice'
import clientInfoSlice from './clientInfoSlice'
import { useDispatch, useSelector } from 'react-redux'
import documentListSlice from './savedListSlice'

const rootReducer = combineReducers({
    fileList: fileListSlice,
    clientInfo: clientInfoSlice,
    documentList: documentListSlice
})

const persistConfig = {
    key: 'root',
    storage: localForage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const listenerMiddlewareInstance = createListenerMiddleware({
    onError: () => console.error
})

const middlewareOptions = {
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
}

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(middlewareOptions).prepend(
            listenerMiddlewareInstance.middleware
        )
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppListenerEffectAPI = ListenerEffectAPI<RootState, AppDispatch>

// @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage
export type AppStartListening = TypedStartListening<RootState, AppDispatch>
export type AppAddListener = TypedAddListener<RootState, AppDispatch>

export const startAppListening =
    listenerMiddlewareInstance.startListening as AppStartListening
export const addAppListener = addListener as AppAddListener

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
