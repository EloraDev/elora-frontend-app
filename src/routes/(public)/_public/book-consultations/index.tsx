import { createFileRoute } from '@tanstack/react-router'
import { BookConsultationsPage } from '../../../../features/consultations/pages/BookConsultationsPage'

export const Route = createFileRoute('/(public)/_public/book-consultations/')({
  component: () => <BookConsultationsPage />,
})
