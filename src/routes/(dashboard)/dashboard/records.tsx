import { createFileRoute, Outlet } from '@tanstack/react-router'
// import { RecordsPage } from '../../../features/pages/records-page'

export const Route = createFileRoute('/(dashboard)/dashboard/records')({
  component: () => (
    <Outlet />
  ),
})


