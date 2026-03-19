import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { WeekdayRow } from './weekday-row'
import { MOCK_ROUTES } from '../data/mock-routes'

export function RouterSupervisorTable() {
    return (
        <Card className="border border-border/60 shadow-sm overflow-hidden bg-white mx-auto rounded-lg">
            <div className="p-6 pb-2">
                <h2 className="text-[24px] tracking-tight font-light text-[#0099D8] mb-6">Rotas Semanais</h2>
                
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center rounded-full border border-border/60 p-1 bg-white shadow-sm">
                        <Button variant="ghost" size="sm" className="rounded-full text-[12px] font-normal text-[#0099D8] px-4 h-8 hover:bg-[#0099D8]/10 hover:text-[#0099D8]">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Semana Anterior
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full text-[12px] font-semibold bg-muted/60 text-foreground px-6 h-8 hover:bg-muted/80">
                            Semana Atual
                        </Button>
                        <Button variant="ghost" size="sm" disabled className="rounded-full text-[12px] font-normal text-muted-foreground px-4 h-8">
                            Próxima Semana
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            </div>
            
            <div className="w-full">
                <div className="flex items-center px-4 py-3 border-b border-border/60">
                    <div className="w-[200px] text-[10px] font-semibold text-[#0099D8] uppercase tracking-wider">
                        Dia da Semana
                    </div>
                    <div className="flex-1 text-[10px] font-semibold text-[#0099D8] uppercase tracking-wider">
                        Rotas
                    </div>
                </div>
                
                <div className="flex flex-col">
                    {MOCK_ROUTES.map((rota) => (
                        <WeekdayRow key={rota.id} rota={rota} />
                    ))}
                </div>
            </div>
        </Card>
    )
}
