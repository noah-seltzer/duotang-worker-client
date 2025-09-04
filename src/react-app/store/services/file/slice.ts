import { createNormalizedSlice } from '../../actionHelpers'

export type TAG = string
export const MARAD: TAG = 'marad'

export interface File {
    name: string
    id: string
    tags: TAG[]
    submissionId: string
    clientId: string
}

export const { slice, selectors: clientSelectors, actions: clientActions, reducer, entity } =
    createNormalizedSlice<File>({
        name: 'file',
    })

export type FileSlice = {
    [slice.name]: ReturnType<(typeof slice)['reducer']>
}

export default reducer
