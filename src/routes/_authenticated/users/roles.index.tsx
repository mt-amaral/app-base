import { createFileRoute } from '@tanstack/react-router'
import { Roles } from '@/features/users/roles'
import { ForbiddenError } from '@/features/errors/forbidden'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated/users/roles/')({
  beforeLoad: async () => {
    await useAuthStore.getState().initAuth()

    const user = useAuthStore.getState().user

    const hasPermission = user?.claims?.includes('users.roles.view')
    if (!hasPermission) {
      throw new Error('FORBIDDEN')
    }
  },

  component: Roles,

  errorComponent: ({ error }) => {
    if (error.message === 'FORBIDDEN') {
      return <ForbiddenError />
    }

    throw error
  },
})