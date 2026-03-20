import { useState } from 'react'
import { FileEdit, CheckCircle2 } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
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

interface RequestAlterationFormValues {
    localId: string
    status: string
    observation: string
}

interface RequestAlterationDialogProps {
    rota: RotaDiaSupervisor
}

export function RequestAlterationDialog({ rota }: RequestAlterationDialogProps) {
    const [open, setOpen] = useState(false)
    const form = useForm<RequestAlterationFormValues>({
        defaultValues: { localId: '3', status: 'RotaRealizada', observation: '' }
    })

    const nomeDia = DIAS_SEMANA[rota.diaSemana]

    const onSubmit = (data: RequestAlterationFormValues) => {
        console.log('Solicitando alteração manual:', {
            dia: nomeDia,
            local: data.localId,
            status: data.status,
            observacao: data.observation
        })
        setOpen(false)
        form.reset()
    }

    const renderSelectOptions = () => {
        return rota.itens.map((l) => (
            <SelectItem key={l.id} value={String(l.localUnidade_Id)}>
                {l.localUnidadeNome}
            </SelectItem>
        ))
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) form.reset(); }}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-[10px] font-medium text-white rounded-md bg-transparent bg-primary border-border shadow-sm h-8 px-4"
                >
                    <FileEdit className="h-3.5 w-3.5" />
                    Solicitar Alteração
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <FileEdit className="h-5 w-5 text-primary" />
                                Solicitar Alteração - {nomeDia}
                            </DialogTitle>
                            <DialogDescription>
                                Utilize este formulário para solicitar a correção manual de um check-in para o dia {nomeDia}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="localId"
                                rules={{ required: 'Selecione um local' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Local da Visita</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione o local..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>{renderSelectOptions()}</SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="status"
                                rules={{ required: 'Selecione o status' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status da Rota</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Selecione o status..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="RotaRealizada">Realizada</SelectItem>
                                                <SelectItem value="RotaNaoRealizada">Não Realizada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="observation"
                                rules={{ required: false }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Observação</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Descreva o motivo da alteração manual..."
                                                className="resize-none h-24"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button type="submit" className="gap-2">
                                <CheckCircle2 className="h-4 w-4" /> Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
