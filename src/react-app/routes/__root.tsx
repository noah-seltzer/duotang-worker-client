import { RootLayout } from '@/components/Layout/RootLayout'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
export const Route = createRootRoute({
    component: () => (
        <RootLayout>
            <Outlet />
            <TanStackRouterDevtools />
        </RootLayout>
    )
})
