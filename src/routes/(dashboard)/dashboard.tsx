import { createFileRoute, Outlet } from '@tanstack/react-router'
// import { DashboardPage } from '../../features/pages/dashboard-page'

export const Route = createFileRoute('/(dashboard)/dashboard')({
  component: () => (
    <Outlet />
  ),
})

