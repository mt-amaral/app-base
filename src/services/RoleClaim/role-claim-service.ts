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
            `/roles/${roleId}/claims`,
            {withCredentials: true,}
        )
        return data
    },

    async update(payload: UpdateRoleClaimPayload) {
        const { roleId, claims } = payload
        const { data } = await api.put<ApiResponse<boolean>>(
            `/roles/${roleId}/claims`,
            { claims }, {withCredentials: true,}
        )

        return data
    },
}
