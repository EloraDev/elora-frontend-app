import { createFileRoute } from '@tanstack/react-router'
import { IntakePage } from '../../../../features/onboarding/pages/intake'

export const Route = createFileRoute('/(public)/_public/onboarding/')({
  component: () => <IntakePage />,
})
