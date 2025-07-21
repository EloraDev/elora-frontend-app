import { createFileRoute } from '@tanstack/react-router'
import { ScanPage } from '../../../../features/pages/scan-page'

export const Route = createFileRoute('/(dashboard)/dashboard/scan/')({
    component: () => <ScanPage />,
})

// function RouteComponent() {
//   return <div>Hello "/(dashboard)/dashboard/scan/"!</div>
// }
