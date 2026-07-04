import { api } from '@/lib/api'
import { ApiResponse } from '@/services/ApiResponse'
import { PagedResponse } from '@/services/PagedResponse'
import { PaginationRequest } from '@/services/PaginationRequest'

export interface Role {
    id: number
    name: string
    description: string
}

export interface RoleList {
    id: number
    name: string
    description: string
    countUser: number
}

export interface CreateRolePayload {
    name: string
    description: string
}

export interface UpdateRolePayload {
    id: number
    name: string
    description: string
}

export interface ListRolesParams extends PaginationRequest {
    searchString?: string
}

export const roleService = {
    async listRoles(params?: ListRolesParams) {
        const { data } = await api.get<PagedResponse<RoleList[]>>(
            '/roles',
            {
                params: {
                    SearchString: params?.searchString ?? '',
                    PageNumber: params?.currentPage ?? 1,
                    PageSize: params?.pageSize ?? 10,
                },
                withCredentials: true,
            }
        )

        return data
    },

    async listAllRoles() {
        const { data } = await api.get<ApiResponse<RoleList[]>>(
            '/roles/summaries',
            {
                withCredentials: true,
            }
        )
        return data
    },

    async create(payload: CreateRolePayload) {
        const { data } = await api.post<ApiResponse<Role>>(
            '/roles',
            payload,
            {
                withCredentials: true,
            }
        )

        return data
    },

    async update(payload: UpdateRolePayload) {
        const { id, ...body } = payload
        const { data } = await api.put<ApiResponse<Role>>(
            `/roles/${id}`,
            body,
            {
                withCredentials: true,
            }
        )

        return data
    },

    async delete(id: number) {
        const { data } = await api.delete<ApiResponse<boolean>>(
            `/roles/${id}`,
            {
                withCredentials: true,
            }
        )

        return data
    },
}
