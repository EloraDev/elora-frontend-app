import { createFileRoute } from '@tanstack/react-router'
import { AppointmentPage } from '../../../../features/pages/appointments-page'

export const Route = createFileRoute('/(dashboard)/dashboard/appointments/')({
  component: () => <AppointmentPage />,
})

