import { ListBuilder } from '@/components/Pages/ListBuilder'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/list')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ListBuilder />
}
