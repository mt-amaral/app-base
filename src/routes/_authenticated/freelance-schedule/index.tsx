import { createFileRoute } from '@tanstack/react-router'
import { FreelanceSchedule } from '@/features/freelance-schedule'

export const Route = createFileRoute('/_authenticated/freelance-schedule/')({
  component: FreelanceSchedule,
})
