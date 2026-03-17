import { api } from '@/lib/api'
import { ApiResponse } from '@/services/ApiResponse'

export interface Role {
    id: number
    name: string
    description: string
}

export const roleService = {
    async listRoles() {
        const { data } = await api.get<ApiResponse<Role[]>>(
            '/Role/list-users', { withCredentials: true, }
        )
        return data
    },
}