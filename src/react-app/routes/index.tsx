import { createFileRoute } from '@tanstack/react-router'
import { DocumentManagementPage } from '@/components/Pages/DocumentManagerPage'

export const Route = createFileRoute('/')({
    component: Index
})

function Index() {
    return <DocumentManagementPage />
}
