import { api } from '@/lib/api'

export interface RotaExecucao {
    id: number
    dataExecucao: string
    status: string
    latitude: number
    longitude: number
}

export interface RotaItem {
    id: number
    rotaDiaSupervisor_Id: number
    localUnidade_Id: number
    localUnidadeNome: string
    ordem: number
    rotaExecucao: RotaExecucao | null
}

export interface RotaDiaSupervisor {
    id: number
    supervisor_Id: number
    supervisorNome: string
    diaSemana: number
    itens: RotaItem[]
}

export const routerSupervisorService = {
    async getRotasSupervisor() {
        const { data } = await api.get<RotaDiaSupervisor[]>('/RotaDiaSupervisor')
        return data
    },
}
