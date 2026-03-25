import { api } from '@/lib/api'
import { ApiResponse } from '@/services/ApiResponse'

export interface RoleClaimItem {
    claimValue: string
    claimType: string
    description: string
    selected: boolean
}

export interface RoleClaimResponse {
    roleId: number
    roleName: string
    claims: RoleClaimItem[]
}

export interface UpdateRoleClaimPayload {
    roleId: number
    claims: string[]
}

export const roleClaimService = {
    async getByRoleId(roleId: number) {
        const { data } = await api.get<ApiResponse<RoleClaimResponse>>(
            `/RoleClaim/${roleId}`,
            {withCredentials: true,}
        )
        return data
    },

    async update(payload: UpdateRoleClaimPayload) {
        const { data } = await api.post<ApiResponse<boolean>>(
            '/RoleClaim/update',
            payload, {withCredentials: true,}
        )

        return data
    },
}