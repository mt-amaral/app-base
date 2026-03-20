import { api } from '@/lib/api'
import { ApiResponse } from '../ApiResponse'


interface LoginPayload {
    cpf: string
    senha?: string
}

interface LoginResponse {
    tipoFuncionarioId: number
    nome: string
    token: string
    matricula: string
}

interface MeResponse {
    name: string
    cpf: string
    roles?: string[]
}

export const accountService = {
    async login(payload: LoginPayload) {
        try {
            const { data } = await api.post<LoginResponse>(
                '/LoginNovoFuncionario',
                payload
            )
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
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