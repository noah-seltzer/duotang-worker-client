import { createNormalizedSlice } from '../../actionHelpers'

interface FileList {
    id: string
    submissionId: string
    clientId: string
    fileIds: string[]
}

export const {
    slice,
    selectors: submissionFileListSelectors,
    actions: submissionFileListActions,
    reducer,
    entity
} = createNormalizedSlice<FileList>({ name: 'fileList' })

export type FileListSlice = {
    [slice.name]: ReturnType<(typeof slice)['reducer']>
}

export default reducer