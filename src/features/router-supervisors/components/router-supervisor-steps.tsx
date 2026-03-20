import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { WeekdayRow } from './weekday-row'
import { useQuery } from '@tanstack/react-query'
import { routerSupervisorService } from '@/services/RouterSupervisor/router-supervisor-service'

export function RouterSupervisorSteps() {

    const { data: rotas, isLoading } = useQuery({
        queryKey: ['rotas-supervisor'],
        queryFn: routerSupervisorService.getRotasSupervisor
    })
    
    return (
        <Card className="border border-border/60 shadow-sm overflow-hidden bg-white mx-auto rounded-lg">
            <div className="p-6 pb-2">
                {/* <h2 className="text-[24px] tracking-tight font-light text-primary mb-6">Rotas Semanais</h2> */}
                
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center rounded-full border border-border/60 p-1 bg-white shadow-sm">
                        <Button variant="ghost" size="sm" className="rounded-full text-[12px] font-normal text-primary px-4 h-8 hover:bg-primary/10 hover:text-primary">
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
                    <div className="w-[200px] text-[10px] font-semibold text-primary uppercase tracking-wider">
                        Dia da Semana
                    </div>
                    <div className="flex-1 text-[10px] font-semibold text-primary uppercase tracking-wider">
                        Rotas
                    </div>
                </div>
                
                <div className="flex flex-col">
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    ) : rotas && rotas.length > 0 ? (
                        rotas.map((rota) => (
                            <WeekdayRow key={rota.id} rota={rota} />
                        ))
                    ) : (
                        <div className="py-8 text-center text-[12px] text-muted-foreground">
                            Nenhuma rota encontrada para o período.
                        </div>
                    )}
                </div>
            </div>
        </Card>
    )
}
