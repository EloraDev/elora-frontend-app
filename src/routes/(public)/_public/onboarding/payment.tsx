import { createFileRoute } from '@tanstack/react-router'
import { PaymentPage } from '../../../../features/onboarding/pages/payment'

export const Route = createFileRoute('/(public)/_public/onboarding/payment')({
  component: () => <PaymentPage />,
})
