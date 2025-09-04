import { nanoid } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from '../store'
import {
    clientActions,
    ClientInput,
    clientSelectors,
    setCurrentClientId,
} from '../store/services/client/slice'
import {
    addOneSubmissionList,
    submissionListActions,
    submissionListSelectors
} from '../store/services/submissionList/slice'
import { selectCurrentClientId, selectNewClient } from '../store/clientInfoSlice'
import { addSubmission } from '../store/services/submission/slice'
import { addOneSubmissionItem, addOneSubmissionItemList } from '../store/services/submissionItemList/slice'

export function useClientState(clientId?: string) {
    const dispatch = useAppDispatch()
    const currentClientId = useAppSelector(selectCurrentClientId)
    const newClient = useAppSelector(selectNewClient)
    const client = !!clientId
        ? useAppSelector((state) => clientSelectors.selectById(state, clientId))
        : undefined

    const submissionList = !!client
        ? useAppSelector((state) =>
              submissionListSelectors.selectById(state.submissionList, client.submissionListId)
          )
        : undefined

    function createClient(clientInfo: ClientInput) {
        const clientId = nanoid()
        const submissionListId = nanoid()
        dispatch(
            clientActions.addOne({
                id: clientId,
                submissionListId,
                ...clientInfo
            })
        )
        dispatch(
            submissionListActions.addOne({
                id: submissionListId,
                clientId,
                submissionIds: []
            })
        )
        dispatch(setCurrentClientId(clientId))
    }

    function createNewListForClient(clientId: string) {
        const submissionListId = nanoid()
        const submissionId = nanoid()
        dispatch(addSubmission({
            name: 'newlist',
            clientId,
            id: submissionId,
            submissionItemListId: submissionListId
        }))

        dispatch(addOneSubmissionItemList({
            id: submissionListId,
            submissionId: submissionId,
            submissionItemIds: []
        }))
    }

    return {
        createNewListForClient,
        newClient,
        currentClientId,
        createClient,
        client,
        submissionList
    }
}
