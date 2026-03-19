import { api } from '@/lib/api'
import { PagedResponse } from '../PagedResponse'

export interface RouterSupervisor {
    id: number
    name: string
    cpf: string
    active: boolean
}

interface ListRouterSupervisorsParams {
    currentPage?: number
    pageSize?: number
}

export const routerSupervisorService = {
    async listRouterSupervisors(params?: ListRouterSupervisorsParams) {
        const { data } = await api.get<PagedResponse<RouterSupervisor[]>>(
            '/supervisor',
            // {
            //     params,
            //     withCredentials: true,
            // }
        )

        return data
    },
}
