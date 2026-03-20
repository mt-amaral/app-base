import { useState, useEffect } from 'react'
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
import { useGeolocation } from '@/hooks/use-geolocation'
import { LocationStatus } from '@/components/location-status'

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
    latitude: number | null
    longitude: number | null
}

export function CheckinDialog() {
    const [open, setOpen] = useState(false)
    const { 
        latitude, 
        longitude, 
        loading: locationLoading, 
        error: locationError, 
        getLocation, 
        clearLocation 
    } = useGeolocation()

    const form = useForm<CheckinFormValues>({ 
        defaultValues: { 
            localId: '',
            latitude: null,
            longitude: null
        } 
    })

    const { data: rotas, isLoading: isLoadingRoutes } = useQuery({
        queryKey: ['rotas-supervisor'],
        queryFn: routerSupervisorService.getRotasSupervisor
    })

    const currentDayOfWeek = new Date().getDay() || 7
    const todaysRoute = rotas?.find(r => r.diaSemana === currentDayOfWeek)
    const nomeDia = diasSemanaMap[currentDayOfWeek]
    const locais = todaysRoute?.itens.filter(i => !i.rotaExecucao) || []

    // Captura localização ao abrir o modal
    useEffect(() => {
        if (open) {
            getLocation()
        }
    }, [open, getLocation])

    // Atualiza o formulário com as coordenadas
    useEffect(() => {
        if (latitude && longitude) {
            form.setValue('latitude', latitude)
            form.setValue('longitude', longitude)
        }
    }, [latitude, longitude, form])

    const handleReset = () => {
        form.reset()
        clearLocation()
        setOpen(false)
    }

    const onSubmit = (data: CheckinFormValues) => {
        console.log('Realizando checkin no local:', data.localId, { lat: data.latitude, lng: data.longitude })
        handleReset()
    }

    const renderSelectOptions = () => {
        if (locais.length === 0) {
            return <SelectItem value="none" disabled>Nenhuma rota pendente para hoje</SelectItem>
        }
        return locais.map((local) => (
            <SelectItem key={local.localUnidade_Id} value={String(local.localUnidade_Id)}>
                {local.localUnidadeNome}
            </SelectItem>
        ))
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) handleReset(); setOpen(v); }}>
            <DialogTrigger asChild>
                <Button className="gap-2 shadow-sm transition-all active:scale-95">
                    <MapPin className="h-4 w-4" /> Realizar Check-in
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-primary">
                                <MapPin className="h-5 w-5" /> Registrar Check-in - {nomeDia}
                            </DialogTitle>
                            <DialogDescription>
                                Selecione a unidade para o apontamento de hoje ({nomeDia}).
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <LocationStatus 
                                latitude={latitude}
                                longitude={longitude}
                                loading={locationLoading}
                                error={locationError}
                            />

                            <FormField
                                control={form.control}
                                name="localId"
                                rules={{ required: 'Selecione um local' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-foreground/80">Local da Visita</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value} disabled={isLoadingRoutes}>
                                            <FormControl>
                                                <SelectTrigger className="w-full py-5">
                                                    {isLoadingRoutes ? (
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
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0 border-t pt-4">
                            <Button type="button" variant="ghost" onClick={() => handleReset()}>Cancelar</Button>
                            <Button 
                                type="submit" 
                                className="gap-2 px-8 font-bold shadow-md active:scale-95 transition-all"
                                disabled={!form.watch('localId') || form.watch('localId') === 'none' || locationLoading}
                            >
                                <CheckCircle2 className="h-4 w-4" /> Confirmar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

