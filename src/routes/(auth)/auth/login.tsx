import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPageNew } from '../../../features/auth/pages/login-new'
import { authService } from '../../../service/auth.service'

export const Route = createFileRoute('/(auth)/auth/login')({
  beforeLoad: async () => {
    // If already authenticated, redirect to dashboard
    if (authService.isAuthenticated()) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: () => <LoginPageNew />,
})
