import {
    ActionReducerMapBuilder,
    CaseReducer,
    createEntityAdapter,
    createSlice,
    EntityAdapter,
    EntityState,
    Slice
} from '@reduxjs/toolkit'

export function updateOneEntity<T extends { id: string }>(
    adapter: EntityAdapter<T, string>,
    state: EntityState<T, string>,
    updatedEntity: T
) {
    adapter.updateOne(state, {
        id: updatedEntity.id,
        changes: updatedEntity
    })
}

export function getEntityAdapterActionReducers<T>(
    adapter: EntityAdapter<T, string>
) {
    const {
        selectId,
        sortComparer,
        getSelectors,
        getInitialState,
        ...entityReducers
    } = adapter

    return entityReducers
}

export function createInitialState<T>(
    entity: EntityAdapter<any, string>,
    init: T | undefined
) {
    if (!init) return entity.getInitialState()
    else return entity.getInitialState(init)
}

interface NormalizedSliceProps<T extends { id: string }> {
    name: string
    reducers?: Iterable<CaseReducer, string> | undefined
    initialState?: T | undefined
    extraReducers?: (
        builder: ActionReducerMapBuilder<EntityState<T, string>>
    ) => void
}

export function createNormalizedSlice<T extends { id: string }>({
    name,
    initialState = undefined,
    reducers,
    extraReducers
}: NormalizedSliceProps<T>) {
    const entity = createEntityAdapter<T>()

    const slice = createSlice({
        name,
        initialState: createInitialState(entity, initialState),
        reducers: {
            ...getEntityAdapterActionReducers(entity),
            ...reducers
        },
        extraReducers
    })

    return {
        entity,
        slice,
        selectors: entity.getSelectors(),
        actions: slice.actions,
        reducer: slice.reducer
    }
}
