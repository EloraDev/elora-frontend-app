import { createFileRoute } from '@tanstack/react-router'
import { BookingPage } from '../../../../features/onboarding/pages/booking'

export const Route = createFileRoute('/(public)/_public/onboarding/booking')({
  component: () => <BookingPage />,
})
