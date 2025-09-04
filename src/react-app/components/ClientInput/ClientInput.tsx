import { Button } from '../Skeleton/Button'
import {
    FloatingModalClose,
    FloatingModalContent,
    FloatingModalRoot,
    FloatingModalTitle,
    FloatingModalTrigger
} from '../Skeleton/FloatingModal'
import { FormTextInput } from '../Form/FormTextInput'
import { FormContextProvider } from '../Form/FormContextProvider'
import { FormSubmitButton } from '../Form/FormSubmitButton'
import { useClientState } from '../../hooks/useClientState'
import { ClientInput } from '../../store/services/client/slice'

/**
 * Form for information about the client who the documents are for
 * @param clientInfo react state for client info
 * @param handleClientInfoChange react state setter for client info
 */
export function ClientInputForm() {
    const { createClient, newClient } = useClientState()

    return (
        <>
            <FloatingModalRoot>
                <FloatingModalTrigger asChild={true}>
                    <Button>Create New Client</Button>
                </FloatingModalTrigger>
                <FloatingModalContent>
                    <FloatingModalTitle>Create New User</FloatingModalTitle>
                    <div className='w-72 flex flex-col gap-3'>
                        <FormContextProvider
                            initialValues={newClient}
                            onSubmit={(value) => {
                                createClient(value as ClientInput)
                            }}
                        >
                            <FormTextInput
                                label='First Name'
                                name='firstName'
                                placeholder='Client First Name'
                            />
                            <FormTextInput
                                label='Last Name'
                                name='lastName'
                                placeholder='Client First Name'
                            />
                            <FormTextInput
                                label='Job Title'
                                name='jobTitle'
                                placeholder='Client Job jobTitle'
                            />
                            <div className='flex flex-row gap-3'>
                                <FloatingModalClose asChild={true}>
                                    <FormSubmitButton className='mt-3' />
                                </FloatingModalClose>
                                <FloatingModalClose asChild={true}>
                                    <Button className='mt-3'>Cancel</Button>
                                </FloatingModalClose>
                            </div>
                        </FormContextProvider>
                    </div>
                </FloatingModalContent>
            </FloatingModalRoot>
        </>
    )
}
