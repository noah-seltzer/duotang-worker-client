import { TextInput } from '../Input/TextInput'
import {
    selectClientInfo,
    updateFirstName,
    updateJobTitle,
    updateLastName
} from '../../store/clientInfoSlice'
import { useAppDispatch, useAppSelector } from '../../store'

/**
 * Form for information about the client who the documents are for
 * @param clientInfo react state for client info
 * @param handleClientInfoChange react state setter for client info
 */
export function ClientInput() {
    const { firstName, lastName, jobTitle } = useAppSelector(selectClientInfo)
    const dispatch = useAppDispatch()

    return (
        <div className='w-1/2 mb-6 flex flex-col gap-3'>
            <TextInput
                label='First Name'
                name='firstName'
                placeholder='Client First Name'
                value={firstName}
                onChange={(event) => {
                    dispatch(updateFirstName(event.target.value))
                }}
            />
            <TextInput
                label='Last Name'
                name='lastName'
                placeholder='Client Last Name'
                value={lastName}
                onChange={(event) => {
                    dispatch(updateLastName(event.target.value))
                }}
            />
            <TextInput
                name='Client Job Title'
                label='Job Title'
                placeholder='Client Job Title'
                value={jobTitle}
                onChange={(event) => {
                    dispatch(updateJobTitle(event.target.value))
                }}
            />
        </div>
    )
}
