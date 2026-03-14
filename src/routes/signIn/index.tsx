import { createFileRoute } from '@tanstack/react-router'
import { SignIn } from '@/features/signIn'

export const Route = createFileRoute('/signIn/')({
    component: SignIn,
})

