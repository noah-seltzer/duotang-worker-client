import { Button } from '@/components/Skeleton/Button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/Skeleton/Table'
import { useAppDispatch, useAppSelector } from '@/store'
import { deleteList, selectAllLists } from '@/store/listBuilderSlice'

export function ListManager() {
    const lists = useAppSelector(selectAllLists)

    const dispatch = useAppDispatch()

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>

                    <TableHead>Name</TableHead>
                    <TableHead>Uses Marad</TableHead>
                    <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                {lists.map((list) => (
                    <TableRow key={list.id}>
                        <TableCell>
                            <h1>{list.name}</h1>
                        </TableCell>
                        <TableCell>
                            {list.tags.includes('MARAD') ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell>
                            <Button
                                onClick={() => {
                                    dispatch(deleteList(list.id))
                                }}
                                variant='destructive'
                                >
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    )
}
