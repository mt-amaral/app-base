import { api } from '@/lib/api'
import { ApiResponse } from '../ApiResponse'


interface LoginPayload {
    email: string
    password: string
    rememberMe: boolean
}


interface MeResponse {
    name: string
    cpf: string
    roles?: string[]
}

export const accountService = {
    async login(payload: LoginPayload) {
        const { data } = await api.post<ApiResponse<MeResponse>>(
            '/Account/Login',
            payload
        )
        return data
    },

    async checkMe() {
        const { data } = await api.get<ApiResponse<MeResponse>>('/Account/CheckMe', { withCredentials: true })
        return data
    },

    async refresh() {
        const { data } = await api.post<ApiResponse<string>>('/Account/Refresh', { withCredentials: true })
        return data
    },

    async logout() {
        const { data } = await api.post('/Account/Logout', { withCredentials: true })
        return data
    },
}