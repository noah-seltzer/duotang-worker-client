import { DocumentRowType } from "../../../types/DocumentRowType"
import { createNormalizedSlice } from "../../actionHelpers"

interface SubmissionItem {
    id: string
    submissionId: string
    submissionListId: string
    docType: DocumentRowType
    fileListId: string
}

export const {
    slice,
    selectors: submissionItemSelectors,
    actions: submissionItemActions,
    reducer,
    entity
} = createNormalizedSlice<SubmissionItem>({ name: 'document' })

export type DocumentSlice = {
    [slice.name]: ReturnType<(typeof slice)['reducer']>
}


export default reducer