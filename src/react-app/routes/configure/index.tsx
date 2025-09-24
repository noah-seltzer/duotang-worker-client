import { LoginOutButtons } from '@/components/Auth/LoginOutButtons'
import { FolderSelect } from '@/components/OneDrive/FolderSelect'
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from '@/components/Skeleton/Table'
import { useAppSelector } from '@/store'
import { useMsal } from '@azure/msal-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/configure/')({
    component: RouteComponent
})

function RouteComponent() {
    const { instance } = useMsal()

    const account = instance.getAllAccounts()[0]

    const folder = useAppSelector((state) => state.fileList.onedriveSyncFolder)

    return (
        <>
            {account && (
                <div className='space-y-6'>
                    <Table className='w-120'>
                        <TableBody>
                            <TableRow>
                                <TableCell>Account Name:</TableCell>
                                <TableCell>{account.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Username:</TableCell>
                                <TableCell>{account.username}</TableCell>
                            </TableRow>
                            {folder && (
                                <TableRow>
                                    <TableCell>Current Sync Folder:</TableCell>
                                    <TableCell>{folder.name}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <FolderSelect />
                </div>
            )}
            {!account && <LoginOutButtons />}
        </>
    )
}
