import { api } from '@/lib/api'
import { PagedResponse } from '../PagedResponse'

export interface User {
    id: number
    name: string
    email: string
    roleId: number
}

interface ListUsersParams {
    currentPage?: number
    pageSize?: number
}

export const userService = {
    async listUsers(params?: ListUsersParams) {
        const { data } = await api.get<PagedResponse<User[]>>(
            '/User/list-users',
            {
                params,
                withCredentials: true,
            }
        )

        return data
    },
}