import {
    selectNewClient,
    addClient,
    selectCurrentClientId,
    selectAllClients,
    updateCurrentClient
} from '@/store/clientInfoSlice'
import { useAppDispatch, useAppSelector } from '@/store'
import {
    FloatingModalClose,
    FloatingModalContent,
    FloatingModalRoot,
    FloatingModalTitle,
    FloatingModalTrigger
} from '@/components/Skeleton/FloatingModal'
import { FormTextInput } from '@/components/Form/FormTextInput'
import { FormContextProvider } from '@/components/Form/FormContextProvider'
import { FormSubmitButton } from '@/components/Form/FormSubmitButton'
import { userSchema } from '@/lib/validators/user-schema'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/Skeleton/Select'
import { ClientInfoInput } from '@/types/ClientInfo'
import { Button } from '@/components/Skeleton/Button'
import { selectAllLists } from '@/store/listBuilderSlice'
import { useState } from 'react'

/**
 * Form for information about the client who the documents are for
 * @param clientInfo react state for client info
 * @param handleClientInfoChange react state setter for client info
 */
export function ClientInput() {
    const newClient = useAppSelector(selectNewClient)
    const currentClientId = useAppSelector(selectCurrentClientId)

    const clients = useAppSelector(selectAllClients)
    const lists = useAppSelector(selectAllLists)
    const dispatch = useAppDispatch()

    const [listId, setListId] = useState<string | undefined>(undefined)

    return (
        <div className='flex flex-row gap-4'>
            {clients.length > 0 && (
                <Select
                    onValueChange={(value) =>
                        dispatch(updateCurrentClient(value))
                    }
                    value={currentClientId}
                >
                    <SelectTrigger className='w-72'>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent defaultValue={currentClientId}>
                        {clients.map((client) => {
                            return (
                                <SelectItem key={client.id} value={client.id}>
                                    {client.firstName} {client.lastName}
                                </SelectItem>
                            )
                        })}
                    </SelectContent>
                </Select>
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
                                dispatch(
                                    addClient({
                                        ...value,
                                        listTypeId: listId
                                    } as ClientInfoInput)
                                )
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
                            <div className='space-y-2'>
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
                                    placeholder='Client Job Title'
                                />
                                <Select onValueChange={setListId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select Client Type' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {lists.map((list) => {
                                            return (
                                                <SelectItem
                                                    key={list.id}
                                                    value={list.id}
                                                >
                                                    {list.name}
                                                </SelectItem>
                                            )
                                        })}
                                        <SelectItem value='default'>
                                            Default
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

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
