import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from '../../components/layouts/DashboardLayout'
import { authService } from '../../service/auth.service'

export const Route = createFileRoute('/(dashboard)/dashboard')({
  beforeLoad: async ({ location }) => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => <DashboardLayout />,
})

