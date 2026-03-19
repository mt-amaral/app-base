import { type RotaDiaSupervisor } from '../types'

export const MOCK_ROUTES: RotaDiaSupervisor[] = [
    {
        id: 1,
        supervisor_Id: 101,
        supervisorNome: "Marina Silva",
        diaSemana: 1,
        itens: [
            { id: 10, rotaDiaSupervisor_Id: 1, localUnidade_Id: 201, localUnidadeNome: "Fic", ordem: 1, rotaExecucao: { id: 50, dataExecucao: "2024-03-18T08:00:00Z", status: "EXECUTADO", latitude: 0, longitude: 0 } },
            { id: 11, rotaDiaSupervisor_Id: 1, localUnidade_Id: 202, localUnidadeNome: "Unidade Unitaria 2 SA", ordem: 2, rotaExecucao: { id: 51, dataExecucao: "2024-03-18T10:00:00Z", status: "EXECUTADO", latitude: 0, longitude: 0 } }
        ]
    },
    {
        id: 2,
        supervisor_Id: 101,
        supervisorNome: "Marina Silva",
        diaSemana: 2,
        itens: [
            { id: 20, rotaDiaSupervisor_Id: 2, localUnidade_Id: 202, localUnidadeNome: "Unidade Unitaria 2 SA", ordem: 1, rotaExecucao: { id: 60, dataExecucao: "2024-03-19T08:00:00Z", status: "EXECUTADO", latitude: 0, longitude: 0 } },
            { id: 21, rotaDiaSupervisor_Id: 2, localUnidade_Id: 201, localUnidadeNome: "Fic", ordem: 2, rotaExecucao: { id: 61, dataExecucao: "2024-03-19T10:00:00Z", status: "EXECUTADO", latitude: 0, longitude: 0 } }
        ]
    },
    {
        id: 3,
        supervisor_Id: 101,
        supervisorNome: "Marina Silva",
        diaSemana: 3,
        itens: [
            { id: 30, rotaDiaSupervisor_Id: 3, localUnidade_Id: 201, localUnidadeNome: "JC&F - Escritório", ordem: 1, rotaExecucao: { id: 70, dataExecucao: "2024-03-20T08:00:00Z", status: "EXECUTADO", latitude: 0, longitude: 0 } },
            { id: 31, rotaDiaSupervisor_Id: 3, localUnidade_Id: 202, localUnidadeNome: "Unidade Unitaria SA", ordem: 2, rotaExecucao: { id: 71, dataExecucao: "2024-03-20T10:00:00Z", status: "EXECUTADO", latitude: 0, longitude: 0 } },
            { id: 32, rotaDiaSupervisor_Id: 3, localUnidade_Id: 203, localUnidadeNome: "Unidade Unitaria 2 SA", ordem: 3, rotaExecucao: { id: 72, dataExecucao: "2024-03-20T12:00:00Z", status: "EXECUTADO", latitude: 0, longitude: 0 } },
            { id: 33, rotaDiaSupervisor_Id: 3, localUnidade_Id: 204, localUnidadeNome: "Unidade Unitaria SA", ordem: 4, rotaExecucao: { id: 73, dataExecucao: "2024-03-20T14:00:00Z", status: "EXECUTADO", latitude: 0, longitude: 0 } }
        ]
    },
    {
        id: 4,
        supervisor_Id: 101,
        supervisorNome: "Marina Silva",
        diaSemana: 4,
        itens: [
            { id: 40, rotaDiaSupervisor_Id: 4, localUnidade_Id: 201, localUnidadeNome: "JC&F - Escritório", ordem: 1, rotaExecucao: null },
            { id: 41, rotaDiaSupervisor_Id: 4, localUnidade_Id: 201, localUnidadeNome: "JC&F - Escritório", ordem: 2, rotaExecucao: null },
            { id: 42, rotaDiaSupervisor_Id: 4, localUnidade_Id: 203, localUnidadeNome: "Unidade Unitaria 2 SA", ordem: 3, rotaExecucao: null },
            { id: 43, rotaDiaSupervisor_Id: 4, localUnidade_Id: 204, localUnidadeNome: "Unidade Unitaria SA", ordem: 4, rotaExecucao: null }
        ]
    },
    {
        id: 5,
        supervisor_Id: 101,
        supervisorNome: "Marina Silva",
        diaSemana: 5,
        itens: [
            { id: 50, rotaDiaSupervisor_Id: 5, localUnidade_Id: 201, localUnidadeNome: "JC&F - Escritório", ordem: 1, rotaExecucao: null },
            { id: 51, rotaDiaSupervisor_Id: 5, localUnidade_Id: 203, localUnidadeNome: "Unidade Unitaria 2 SA", ordem: 2, rotaExecucao: null },
            { id: 52, rotaDiaSupervisor_Id: 5, localUnidade_Id: 205, localUnidadeNome: "Fic", ordem: 3, rotaExecucao: null },
            { id: 53, rotaDiaSupervisor_Id: 5, localUnidade_Id: 204, localUnidadeNome: "Unidade Unitaria SA", ordem: 4, rotaExecucao: null },
            { id: 54, rotaDiaSupervisor_Id: 5, localUnidade_Id: 205, localUnidadeNome: "Fic", ordem: 5, rotaExecucao: null }
        ]
    }
]
