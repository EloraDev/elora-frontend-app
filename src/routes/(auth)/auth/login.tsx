import { createFileRoute } from '@tanstack/react-router'
import { LoginPage } from '../../../features/auth/pages/login'

export const Route = createFileRoute('/(auth)/auth/login')({
  component: () => <LoginPage />,
})
