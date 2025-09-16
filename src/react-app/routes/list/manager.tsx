import { ListManager } from '@/components/Pages/ListManager'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list/manager')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ListManager />
}
