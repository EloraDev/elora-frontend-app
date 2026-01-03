import { createFileRoute } from '@tanstack/react-router'
import { DoctorDetailPage } from '../../../../features/consultations/pages/DoctorDetailPage'

export const Route = createFileRoute(
  '/(public)/_public/book-consultations/$doctor',
)({
  component: () => <DoctorDetailPage />,
})
