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
    7: 'Domingo'
}

interface CheckinFormValues {
    localId: string
}

export function CheckinDialog() {
    const [open, setOpen] = useState(false)
    const form = useForm<CheckinFormValues>({ defaultValues: { localId: '' } })

    const { data: rotas, isLoading } = useQuery({
        queryKey: ['rotas-supervisor'],
        queryFn: routerSupervisorService.getRotasSupervisor
    })

    const currentDayOfWeek = new Date().getDay() || 7
    const todaysRoute = rotas?.find(r => r.diaSemana === currentDayOfWeek)
    const nomeDia = diasSemanaMap[currentDayOfWeek]
    const locais = todaysRoute?.itens.filter(i => !i.rotaExecucao) || []

    const onSubmit = (data: CheckinFormValues) => {
        console.log('Realizando checkin no local:', data.localId)
        setOpen(false)
        form.reset()
    }

    const renderSelectOptions = () => {
        const isExisteLocais = locais.length === 0
        if (isExisteLocais) {
            return <SelectItem value="none" disabled>Nenhuma rota pendente para hoje</SelectItem>
        }
        return locais.map((local) => (
            <SelectItem key={local.localUnidade_Id} value={String(local.localUnidade_Id)}>{local.localUnidadeNome}</SelectItem>
        ))
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) form.reset(); }}>
            <DialogTrigger asChild>
                <Button className="gap-2"><MapPin className="h-4 w-4" /> Realizar Check-in</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" /> Registrar Check-in - {nomeDia}
                            </DialogTitle>
                            <DialogDescription>
                                Selecione a unidade para o apontamento de hoje ({nomeDia}).
                            </DialogDescription>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="localId"
                            rules={{ required: 'Selecione um local' }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Local da Visita</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                {isLoading ? (
                                                    <div className="flex items-center gap-2">
                                                        <Loader2 className="h-4 w-4 animate-spin" /> Carregando...
                                                    </div>
                                                ) : <SelectValue placeholder="Selecione um local..." />}
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>{renderSelectOptions()}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                            <Button type="submit" disabled={!form.watch('localId') || form.watch('localId') === 'none'} className="gap-2">
                                <CheckCircle2 className="h-4 w-4" /> Confirmar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
