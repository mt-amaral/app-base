import { api } from '@/lib/api'
import { ApiResponse } from '../ApiResponse'
import { PagedResponse } from '../PagedResponse'
import { PaginationRequest } from '../PaginationRequest'


export interface User {
    id: number
    name: string
    email: string
    roleId: number
}

export interface CreateUserPayload {
    userName: string
    email: string
    newPassword?: string
    confirmPassword?: string
    roleId: number
}

export interface UpdateUserPayload {
    userName: string
    email: string
    newPassword?: string
    confirmPassword?: string
    roleId: number
}

export interface UpdateUserByIdPayload extends UpdateUserPayload {
    id: number
}

export interface ListUsersParams extends PaginationRequest {
  searchString?: string
  roleId?: number | null
}
export const userService = {
    async listUsers(params?: ListUsersParams) {
        const { data } = await api.get<PagedResponse<User[]>>(
            '/User/list-users',
            {
                params: {
                    PageNumber: params?.currentPage,
                    PageSize: params?.pageSize,
                    SearchString: params?.searchString,
                    RoleId: params?.roleId,
                },
                withCredentials: true,
            }
        )

        return data
    },

    async create(payload: CreateUserPayload) {
        const { data } = await api.post<ApiResponse<User>>(
            '/User/create',
            payload,
            {
                withCredentials: true,
            }
        )

        return data
    },

    async update(payload: UpdateUserByIdPayload) {
        const { id, ...body } = payload

        const { data } = await api.post<ApiResponse<User>>(
            '/User/update',
            body,
            {
                params: {
                    UserId: id,
                },
                withCredentials: true,
            }
        )

        return data
    },

    async updateLogged(payload: UpdateUserPayload) {
        const { data } = await api.post<ApiResponse<User>>(
            '/User/update-logged',
            payload,
            {
                withCredentials: true,
            }
        )

        return data
    },

    async delete(id: number) {
        const { data } = await api.delete<ApiResponse<null>>(
            `/User/delete/${id}`,
            {
                withCredentials: true,
            }
        )

        return data
    },
}