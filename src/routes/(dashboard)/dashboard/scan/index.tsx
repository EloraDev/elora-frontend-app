import { createFileRoute } from '@tanstack/react-router'
import { DashboardScanPage } from '../../../../features/diagnosis/pages/DashboardScanPage'

export const Route = createFileRoute('/(dashboard)/dashboard/scan/')({
    component: () => <DashboardScanPage />,
})
