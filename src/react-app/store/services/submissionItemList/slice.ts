import { createNormalizedSlice } from "../../actionHelpers"

interface SubmissionItemList {
    id: string
    submissionId: string
    submissionItemIds: string[]
}

export const {
    slice,
    selectors: submissionItemListSelectors,
    actions: submissionItemListActions,
    reducer,
    entity
} = createNormalizedSlice<SubmissionItemList>({ name: 'document' })

export const {
  addOne: addOneSubmissionItemList,
  addMany: addManySubmissionItemLists,
  setOne: setOneSubmissionItemList,
  setMany: setManySubmissionItemLists,
  setAll: setAllSubmissionItemLists,
  removeOne: removeOneSubmissionItemList,
  removeMany: removeManySubmissionItemLists,
  removeAll: removeAllSubmissionItemLists,
} = submissionItemListActions

export type DocumentSlice = {
    [slice.name]: ReturnType<(typeof slice)['reducer']>
}

export default reducer