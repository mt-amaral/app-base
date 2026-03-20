export interface FreelanceScheduleItem {
  id: string
  diaSemana: number
  horarioEstabelecido: string
  horarioEntradaRealizado: string
  horarioSaidaRealizado: string
  status: 'Realizado' | 'Atrasado' | 'Pendente'
}
