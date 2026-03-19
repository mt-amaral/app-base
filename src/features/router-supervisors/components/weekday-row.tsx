import { Button } from '@/components/ui/button'
import { RouteTimeline } from './route-timeline'
import { type RotaDiaSupervisor } from '../types'

const DIAS_SEMANA: Record<number, string> = {
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado',
    7: 'Domingo'
}

interface WeekdayRowProps {
    rota: RotaDiaSupervisor
}

export function WeekdayRow({ rota }: WeekdayRowProps) {
    return (
        <div className="flex items-center border-b border-border/40 py-6 last:border-0 hover:bg-muted/10 transition-colors px-4">
            <div className="w-[200px] shrink-0">
                <h3 className="text-[13px] font-semibold text-foreground/80">
                    {DIAS_SEMANA[rota.diaSemana]}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Sem período</p>
            </div>
            
            <div className="flex-1 overflow-x-auto min-h-[50px] flex items-center pr-4 custom-scrollbar">
                <RouteTimeline items={rota.itens} />
            </div>
            
            <div className="ml-4 shrink-0 pl-4">
                <Button variant="outline" size="sm" className="text-[11px] font-medium text-foreground/80 rounded-md bg-white border-border shadow-sm h-8 px-4">
                    Editar Status da rota
                </Button>
            </div>
        </div>
    )
}
