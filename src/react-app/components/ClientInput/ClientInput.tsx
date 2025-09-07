import {
    selectNewClient,
    addClient,
    selectCurrentClientId,
    selectAllClients,
    updateCurrentClient
} from '../../store/clientInfoSlice'
import { useAppDispatch, useAppSelector } from '../../store'
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
import { ClientInfoInput } from '../../types/ClientInfo'
import { userSchema } from '../../lib/validators/user-schema'
import { Selector, SelectorContent, SelectorItem } from '../Select/Select'
/**
 * Form for information about the client who the documents are for
 * @param clientInfo react state for client info
 * @param handleClientInfoChange react state setter for client info
 */
export function ClientInput() {
    const newClient = useAppSelector(selectNewClient)
    const currentClientId = useAppSelector(selectCurrentClientId)

    const clients = useAppSelector(selectAllClients)
    const dispatch = useAppDispatch()
    return (
        <div className='flex flex-row gap-4'>
            {clients.length > 0 && (
                <Selector
                    onValueChange={(value) =>
                        dispatch(updateCurrentClient(value))
                    }
                    className='w-72'
                    value={currentClientId}
                >
                    <SelectorContent defaultValue={currentClientId}>
                        {clients.map((client) => {
                            return (
                                <SelectorItem key={client.id} value={client.id}>
                                    {client.firstName} {client.lastName}
                                </SelectorItem>
                            )
                        })}
                    </SelectorContent>
                </Selector>
            )}
            <FloatingModalRoot>
                <FloatingModalTrigger asChild={true}>
                    <Button>Create New Client</Button>
                </FloatingModalTrigger>
                <FloatingModalContent>
                    <FloatingModalTitle>Create New User</FloatingModalTitle>
                    <div className='w-72 flex flex-col gap-3'>
                        <FormContextProvider
                            initialValues={newClient}
                            onSubmit={async (value) => {
                                dispatch(addClient(value as ClientInfoInput))
                            }}
                            validationSchema={userSchema}
                            validate={(values) => {
                                const existingClient = clients.find(
                                    (client) =>
                                        client.firstName === values.firstName &&
                                        client.lastName === values.lastName
                                )
                                if (existingClient) {
                                    return {
                                        firstName: `A client with the name ${values.firstName} ${values.lastName} already exists`
                                    }
                                }
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
        </div>
    )
}
