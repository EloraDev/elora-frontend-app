import { createFileRoute, redirect } from '@tanstack/react-router'
import { RegisterPage } from '../../../features/auth/pages/register'
import { authService } from '../../../service/auth.service'

export const Route = createFileRoute('/(auth)/auth/signup')({
  beforeLoad: async () => {
    // If already authenticated, redirect to dashboard
    if (authService.isAuthenticated()) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: () => <RegisterPage />,
})
