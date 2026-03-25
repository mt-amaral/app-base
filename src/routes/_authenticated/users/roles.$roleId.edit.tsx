import { createFileRoute } from '@tanstack/react-router'
import { RoleClaimsEditorPage } from '@/features/users/roles/edit'
import { ForbiddenError } from '@/features/errors/forbidden'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated/users/roles/$roleId/edit')({
    beforeLoad: async () => {
        await useAuthStore.getState().initAuth()

        const user = useAuthStore.getState().user

        const hasPermission = user?.claims?.includes('users.claims.view')
        if (!hasPermission) {
            throw new Error('FORBIDDEN')
        }
    },

    component: RoleClaimsEditorPage,

    errorComponent: ({ error }) => {
        if (error.message === 'FORBIDDEN') {
            return <ForbiddenError />
        }

        throw error
    },
})