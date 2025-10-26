import { createFileRoute } from '@tanstack/react-router'
import { SignupPage } from '../../../features/auth/pages/signup'

export const Route = createFileRoute('/(auth)/auth/signup')({
  component: () => <SignupPage />,
})
