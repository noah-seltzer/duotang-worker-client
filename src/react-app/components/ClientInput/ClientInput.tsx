import { TextInput } from '../Input/TextInput'
import {
    selectClientInfo,
    updateFirstName,
    updateJobTitle,
    updateLastName
} from '../../store/clientInfoSlice'
import { useAppDispatch, useAppSelector } from '../../store'
import { Button } from '../Skeleton/Button'
import {
    FloatingModalClose,
    FloatingModalContent,
    FloatingModalRoot,
    FloatingModalTrigger
} from '../Skeleton/FloatingModal'
import { FormTextInput } from '../Form/FormTextInput'

/**
 * Form for information about the client who the documents are for
 * @param clientInfo react state for client info
 * @param handleClientInfoChange react state setter for client info
 */
export function ClientInput() {
    const { firstName, lastName, jobTitle } = useAppSelector(selectClientInfo)
    const dispatch = useAppDispatch()
    return (
        <>
            <FloatingModalRoot>
                <FloatingModalTrigger asChild={true}>
                    <Button>Edit Client Info</Button>
                </FloatingModalTrigger>
                <FloatingModalContent>
                    <div className='w-72 flex flex-col gap-3'>
                        <FormTextInput
                            label='First Name'
                            name='firstName'
                            placeholder='Client First Name'
                            value={firstName}
                            onChange={(event) => {
                                dispatch(updateFirstName(event.target.value))
                            }}
                        />
                        <FormTextInput
                            label='Last Name'
                            name='lastName'
                            placeholder='Client Last Name'
                            value={lastName}
                            onChange={(event) => {
                                dispatch(updateLastName(event.target.value))
                            }}
                        />
                        <FormTextInput
                            name='Client Job Title'
                            label='Job Title'
                            placeholder='Client Job Title'
                            value={jobTitle}
                            onChange={(event) => {
                                dispatch(updateJobTitle(event.target.value))
                            }}
                        />
                    </div>
                    <FloatingModalClose>
                        <Button>Close</Button>
                    </FloatingModalClose>
                </FloatingModalContent>
            </FloatingModalRoot>
        </>
    )
}
