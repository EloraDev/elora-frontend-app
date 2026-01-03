import { createFileRoute } from '@tanstack/react-router'
import { ConsultationsPage } from '../../../../features/consultations/pages/ConsultationsPage'

export const Route = createFileRoute('/(dashboard)/dashboard/appointments/')({
  component: () => <ConsultationsPage />,
})

