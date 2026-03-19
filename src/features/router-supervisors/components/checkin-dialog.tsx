import { useState } from 'react'
import { MapPin, CheckCircle2 } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import { MOCK_ROUTES } from '../data/mock-routes'

export function CheckinDialog() {
    const [open, setOpen] = useState(false)
    const [selectedLocal, setSelectedLocal] = useState<string>('')

    // Pega o número do dia da semana atual (1 para Segunda, 7 para Domingo)
    const currentDayOfWeek = new Date().getDay() || 7
    const todaysRoute = MOCK_ROUTES.find(r => r.diaSemana === currentDayOfWeek)
    
    // Filtramos para apresentar como opções os itens ainda NÃO executados
    const locais = todaysRoute?.itens.filter(i => !i.rotaExecucao) || []

    const handleCheckin = () => {
        console.log('Realizando checkin no local ID:', selectedLocal)
        setOpen(false)
        setSelectedLocal('')
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <MapPin className="h-4 w-4" />
                    Realizar Check-in
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Registrar Check-in
                    </DialogTitle>
                    <DialogDescription>
                        Selecione a unidade atual para realizar o apontamento de parada da rota de hoje.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="local">Local da Visita</Label>
                        <Select 
                            value={selectedLocal} 
                            onValueChange={setSelectedLocal}
                        >
                            <SelectTrigger id="local" className="w-full">
                                <SelectValue placeholder="Selecione um local da rota de hoje..." />
                            </SelectTrigger>
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
                    </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0 mt-4">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancelar
                    </Button>
                    <Button 
                        type="button" 
                        onClick={handleCheckin} 
                        disabled={!selectedLocal || selectedLocal === 'none'}
                        className="gap-2"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Confirmar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
