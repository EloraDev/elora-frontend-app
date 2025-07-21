import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/dashboard/profile')({
    component: () => (
        <Outlet />
    ),
})

