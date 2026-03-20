import { createFileRoute } from '@tanstack/react-router'
import { RouterSupervisors } from '@/features/router-supervisors'

export const Route = createFileRoute('/_authenticated/')({
  component: RouterSupervisors
})
