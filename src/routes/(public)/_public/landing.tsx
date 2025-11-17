import { createFileRoute } from '@tanstack/react-router'
import { LandingPage } from '../../../features/public/pages/landing-page'

export const Route = createFileRoute('/(public)/_public/landing')({
  component: () => <LandingPage />,
})

