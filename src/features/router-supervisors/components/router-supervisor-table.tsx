import { Check, Clock, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface RotaExecucao {
    id: number
    dataExecucao: string
    status: string
    latitude: number
    longitude: number
}

interface RotaItem {
    id: number
    rotaDiaSupervisor_Id: number
    localUnidade_Id: number
    localUnidadeNome: string
    ordem: number
    rotaExecucao: RotaExecucao | null
}

interface RotaDiaSupervisor {
    id: number
    supervisor_Id: number
    supervisorNome: string
    diaSemana: number
    itens: RotaItem[]
}

const DIAS_SEMANA: Record<number, string> = {
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado',
    7: 'Domingo'
}

// Mock data based on requested schema
const MOCK_ROUTES: RotaDiaSupervisor[] = [
    {
        id: 1,
        supervisor_Id: 101,
        supervisorNome: "João Silva",
        diaSemana: 1,
        itens: [
            {
                id: 10,
                rotaDiaSupervisor_Id: 1,
                localUnidade_Id: 201,
                localUnidadeNome: "Cozinha Central - Unidade 01",
                ordem: 1,
                rotaExecucao: {
                    id: 50,
                    dataExecucao: "2024-03-18T08:00:00Z",
                    status: "EXECUTADO",
                    latitude: -23.5505,
                    longitude: -46.6333
                }
            },
            {
                id: 11,
                rotaDiaSupervisor_Id: 1,
                localUnidade_Id: 202,
                localUnidadeNome: "Refeitório Norte - Unidade 05",
                ordem: 2,
                rotaExecucao: {
                    id: 51,
                    dataExecucao: "2024-03-18T10:30:00Z",
                    status: "EXECUTADO",
                    latitude: -23.5605,
                    longitude: -46.6433
                }
            },
            {
                id: 12,
                rotaDiaSupervisor_Id: 1,
                localUnidade_Id: 203,
                localUnidadeNome: "Logística Sul - Unidade 10",
                ordem: 3,
                rotaExecucao: null
            }
        ]
    },
    {
        id: 2,
        supervisor_Id: 101,
        supervisorNome: "João Silva",
        diaSemana: 2,
        itens: [
            {
                id: 20,
                rotaDiaSupervisor_Id: 2,
                localUnidade_Id: 204,
                localUnidadeNome: "Administrativo Oeste",
                ordem: 1,
                rotaExecucao: {
                    id: 60,
                    dataExecucao: "2024-03-19T09:15:00Z",
                    status: "EXECUTADO",
                    latitude: -23.5705,
                    longitude: -46.6533
                }
            },
            {
                id: 23,
                rotaDiaSupervisor_Id: 2,
                localUnidade_Id: 205,
                localUnidadeNome: "Centro de Distribuição",
                ordem: 2,
                rotaExecucao: null
            },
            {
                id: 21,
                rotaDiaSupervisor_Id: 2,
                localUnidade_Id: 205,
                localUnidadeNome: "Centro de Distribuição",
                ordem: 2,
                rotaExecucao: null
            },
            {
                id: 22,
                rotaDiaSupervisor_Id: 2,
                localUnidade_Id: 205,
                localUnidadeNome: "Centro de Distribuição",
                ordem: 2,
                rotaExecucao: null
            }
        ]
    },
    {
        id: 3,
        supervisor_Id: 101,
        supervisorNome: "João Silva",
        diaSemana: 3,
        itens: [
            {
                id: 20,
                rotaDiaSupervisor_Id: 3,
                localUnidade_Id: 204,
                localUnidadeNome: "Administrativo Oeste",
                ordem: 1,
                rotaExecucao: {
                    id: 60,
                    dataExecucao: "2024-03-19T09:15:00Z",
                    status: "EXECUTADO",
                    latitude: -23.5705,
                    longitude: -46.6533
                }
            },
            {
                id: 21,
                rotaDiaSupervisor_Id: 3,
                localUnidade_Id: 205,
                localUnidadeNome: "Centro de Distribuição",
                ordem: 2,
                rotaExecucao: null
            }
        ]
    }
]

export function RouterSupervisorTable() {
    return (
        <div className='flex flex-col gap-6 p-1'>
            {MOCK_ROUTES.map((dia) => (
                <Card key={dia.id} className='overflow-hidden border-border/50 shadow-sm transition-all hover:shadow-md'>
                    <CardHeader className='border-b bg-muted/30 py-4'>
                        <div className='flex items-center justify-between'>
                            <CardTitle className='text-sm font-semibold uppercase tracking-[0.1em] text-muted-foreground'>
                                {DIAS_SEMANA[dia.diaSemana]}
                            </CardTitle>
                            <span className='rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary'>
                                {dia.supervisorNome}
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className='p-6 md:p-8'>
                        <div className='relative flex flex-col gap-8 md:flex-row md:items-start md:gap-0'>
                            {dia.itens.map((item, index) => {
                                const isExecuted = !!item.rotaExecucao
                                const isLast = index === dia.itens.length - 1

                                return (
                                    <div key={item.id} className='relative flex flex-1 flex-col items-center md:items-center'>
                                        {/* Connecting Line */}
                                        {!isLast && (
                                            <div 
                                                className={cn(
                                                    'absolute left-[15.5px] top-8 h-full w-[2px] transition-colors duration-500 md:left-[calc(50%+16px)] md:top-4 md:h-[2px] md:w-[calc(100%-32px)]',
                                                    isExecuted ? 'bg-primary' : 'bg-muted'
                                                )}
                                            />
                                        )}

                                        {/* Step Indicator */}
                                        <div className='relative z-10 flex w-full items-start gap-4 md:flex-col md:items-center md:gap-0'>
                                            <div className={cn(
                                                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
                                                isExecuted 
                                                    ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_10px_rgba(var(--primary),0.3)]' 
                                                    : 'border-muted bg-background text-muted-foreground'
                                            )}>
                                                {isExecuted ? (
                                                    <Check className='h-4 w-4 stroke-[3]' />
                                                ) : (
                                                    <span className='text-xs font-bold'>{item.ordem}</span>
                                                )}
                                            </div>

                                            {/* Step Content */}
                                            <div className='flex flex-col md:mt-4 md:items-center md:px-2 md:text-center'>
                                                <h4 className={cn(
                                                    'text-sm font-bold leading-tight transition-colors',
                                                    isExecuted ? 'text-foreground' : 'text-muted-foreground'
                                                )}>
                                                    {item.localUnidadeNome}
                                                </h4>
                                                
                                                <div className='mt-1.5 flex flex-wrap items-center gap-2 md:justify-center'>
                                                    {isExecuted ? (
                                                        <>
                                                            <div className='flex items-center gap-1 text-[11px] font-medium text-primary'>
                                                                <Clock className='h-3 w-3' />
                                                                {new Date(item.rotaExecucao!.dataExecucao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                            </div>
                                                            <div className='flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600'>
                                                                <MapPin className='h-2.5 w-2.5' />
                                                                OK
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <span className='text-[11px] font-medium italic text-muted-foreground/60'>
                                                            Pendente
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
