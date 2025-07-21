import { createFileRoute } from '@tanstack/react-router'
import { ResultPage } from '../../../../features/pages/results-page'

export const Route = createFileRoute('/(dashboard)/dashboard/result/')({
  component: () => <ResultPage />,
})

function RouteComponent() {
  return <div>Hello "/(dashboard)/dashboard/result/"!</div>
}
