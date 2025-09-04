import { createNormalizedSlice } from '../../actionHelpers'

interface SubmissionList {
    id: string
    clientId: string
    submissionIds: string[]
}

export const {
    slice,
    selectors: submissionListSelectors,
    actions: submissionListActions,
    reducer,
    entity
} = createNormalizedSlice<SubmissionList>({ name: 'submissionList' })

export const {
    addOne: addOneSubmissionList,
    addMany: addManySubmissionList,
    setOne: setOneSubmissionList,
    setMany: setManySubmissionList,
    setAll: setAllSubmissionList,
    removeOne: removeOneSubmissionList,
    removeMany: removeManySubmissionList,
    removeAll: removeAllSubmissionList,
    upsertOne: upsertOneSubmissionList,
    upsertMany: upsertManySubmissionList
} = submissionListActions

export type SubmissionListSlice = {
    [slice.name]: ReturnType<(typeof slice)['reducer']>
}

export default reducer