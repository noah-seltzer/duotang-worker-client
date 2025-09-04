import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getEntityAdapterActionReducers } from "../../actionHelpers";
import { RootState } from "../..";

export interface Submission {
    name: string,
    clientId: string
    id: string
    submissionItemListId: string
}

const submissionEntity = createEntityAdapter<Submission>()

const actionReducers = getEntityAdapterActionReducers(submissionEntity)

const submissionSlice = createSlice({
    name: 'submission',
    initialState: submissionEntity.getInitialState(),
    reducers: actionReducers
})

export const submissionSelectors = submissionEntity.getSelectors()

export const selectSubmissionById = (state: RootState, id: string) =>  submissionSelectors.selectById(state, id)

export const submissionActions = submissionSlice.actions

export const {
    addOne: addSubmission,
    addMany: addSubmissions,
    updateOne: updateSubmission,
    updateMany: updateSubmissions,
    removeOne: removeSubmission,
    removeMany: removeSubmissions,
    upsertOne: upsertSubmission,
    upsertMany: upsertSubmissions,
} = submissionActions

export type SubmissionSlice = {
    [submissionSlice.name]: ReturnType<(typeof submissionSlice)['reducer']>
}

export default submissionSlice.reducer