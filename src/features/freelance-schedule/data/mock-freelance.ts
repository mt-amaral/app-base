import { FreelanceScheduleItem } from '../types'

export const MOCK_FREELANCE_SCHEDULE: FreelanceScheduleItem[] = [
  {
    id: '1',
    diaSemana: 1, // Segunda
    horarioEstabelecido: '08:00 - 18:00',
    horarioEntradaRealizado: '08:00',
    horarioSaidaRealizado: '18:02',
    status: 'Realizado',
  },
  {
    id: '2',
    diaSemana: 2, // Terça
    horarioEstabelecido: '08:00 - 18:00',
    horarioEntradaRealizado: '08:15',
    horarioSaidaRealizado: '18:00',
    status: 'Atrasado',
  },
  {
    id: '3',
    diaSemana: 3, // Quarta
    horarioEstabelecido: '08:00 - 18:00',
    horarioEntradaRealizado: '08:00',
    horarioSaidaRealizado: '--:--',
    status: 'Pendente',
  },
  {
    id: '4',
    diaSemana: 4, // Quinta
    horarioEstabelecido: '08:00 - 18:00',
    horarioEntradaRealizado: '--:--',
    horarioSaidaRealizado: '--:--',
    status: 'Pendente',
  },
  {
    id: '5',
    diaSemana: 5, // Sexta
    horarioEstabelecido: '08:00 - 17:00',
    horarioEntradaRealizado: '--:--',
    horarioSaidaRealizado: '--:--',
    status: 'Pendente',
  },
]
