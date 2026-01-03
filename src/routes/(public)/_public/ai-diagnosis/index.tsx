import { createFileRoute } from '@tanstack/react-router'
import { PublicAIDiagnosisPage } from '../../../../features/diagnosis/pages/PublicAIDiagnosisPage'

export const Route = createFileRoute('/(public)/_public/ai-diagnosis/')({
  component: () => <PublicAIDiagnosisPage />,
})
