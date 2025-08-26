import { EntityAdapter, EntityState } from '@reduxjs/toolkit'

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
