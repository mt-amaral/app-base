import { useState } from 'react'
import { MapPin, CheckCircle2, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useQuery } from '@tanstack/react-query'
import { routerSupervisorService } from '@/services/RouterSupervisor/router-supervisor-service'

const diasSemanaMap: Record<number, string> = {
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado',
    7: 'Domingo',
}

interface CheckinFormValues {
    localId: string
}

export function CheckinDialog() {
    const [open, setOpen] = useState(false)

    const form = useForm<CheckinFormValues>({
        defaultValues: {
            localId: '',
        },
    })

    const { data: rotas, isLoading } = useQuery({
        queryKey: ['rotas-supervisor'],
        queryFn: routerSupervisorService.getRotasSupervisor
    })

    // Pega o número do dia da semana atual (1 para Segunda, 7 para Domingo)
    const currentDayOfWeek = new Date().getDay() || 7
    const todaysRoute = rotas?.find(r => r.diaSemana === currentDayOfWeek)
    const nomeDia = diasSemanaMap[currentDayOfWeek]
    
    // Filtramos para apresentar como opções os itens ainda NÃO executados
    const locais = todaysRoute?.itens.filter(i => !i.rotaExecucao) || []

    const onSubmit = (data: CheckinFormValues) => {
        console.log('Realizando checkin no local ID:', data.localId)
        setOpen(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val)
            if (!val) form.reset()
        }}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <MapPin className="h-4 w-4" />
                    Realizar Check-in
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" />
                                Registrar Check-in - {nomeDia}
                            </DialogTitle>
                            <DialogDescription>
                                Selecione a unidade atual para realizar o apontamento de parada da rota de hoje ({nomeDia}).
                            </DialogDescription>
                        </DialogHeader>
                        
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="localId"
                                rules={{ required: 'Selecione um local' }}
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel>Local da Visita</FormLabel>
                                        <Select 
                                            onValueChange={field.onChange} 
                                            defaultValue={field.value}
                                            value={field.value}
                                            disabled={isLoading}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    {isLoading ? (
                                                        <div className="flex items-center gap-2">
                                                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                                            <span>Carregando...</span>
                                                        </div>
                                                    ) : (
                                                        <SelectValue placeholder="Selecione um local da rota de hoje..." />
                                                    )}
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {locais.length > 0 ? (
                                                    locais.map((local) => (
                                                        <SelectItem key={local.id} value={local.id.toString()}>
                                                            {local.localUnidadeNome}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <SelectItem value="none" disabled>
                                                        Nenhuma rota pendente para hoje
                                                    </SelectItem>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 mt-4">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={!form.watch('localId') || form.watch('localId') === 'none'}
                                className="gap-2"
                            >
                                <CheckCircle2 className="h-4 w-4" />
                                Confirmar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
