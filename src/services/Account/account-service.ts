import { api } from '@/lib/api'
import { ApiResponse } from '../ApiResponse'


interface LoginPayload {
    email: string
    password: string
    rememberMe: boolean
}


interface MeResponse {
    id: number
    name: string
    email: string
    roleId: number
    claims?: string[]
}

export const accountService = {
    async login(payload: LoginPayload) {
        const { data } = await api.post<ApiResponse<MeResponse>>(
            '/sessions',
            payload
        )
        return data
    },

    async checkMe() {
        const { data } = await api.get<ApiResponse<MeResponse>>('/sessions/current', { withCredentials: true })
        return data
    },

    async refresh() {
        const { data } = await api.post<ApiResponse<string>>('/refresh-tokens', {}, { withCredentials: true })
        return data
    },

    async logout() {
        const { data } = await api.delete('/sessions/current', { withCredentials: true })
        return data
    },
}
