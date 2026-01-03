import { createFileRoute } from '@tanstack/react-router'
import { DashboardHomePage } from '../../../features/dashboard/pages/DashboardHome'

export const Route = createFileRoute('/(dashboard)/dashboard/')({
  component: () => <DashboardHomePage />,
})
