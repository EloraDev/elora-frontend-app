import { createFileRoute } from '@tanstack/react-router'
import { ProfilePage } from '../../../../features/pages/profile-page'

export const Route = createFileRoute('/(dashboard)/dashboard/profile/')({
  component: () => <ProfilePage />,
})


