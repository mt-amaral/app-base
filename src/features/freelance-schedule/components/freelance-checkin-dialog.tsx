import { useState } from 'react'
import { MapPin, CheckCircle2 } from 'lucide-react'
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

interface FreelanceCheckinFormValues {
    localId: string
    observation: string
}

export function FreelanceCheckinDialog() {
    const [open, setOpen] = useState(false)
    const form = useForm<FreelanceCheckinFormValues>({
        defaultValues: { localId: '', observation: '' }
    })

    const onSubmit = (data: FreelanceCheckinFormValues) => {
        console.log('Realizando checkin freelance:', data)
        setOpen(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) form.reset(); }}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <MapPin className="h-4 w-4" />
                    Realizar Check-in
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-primary" /> 
                                Registrar Check-in (Freelance)
                            </DialogTitle>
                            <DialogDescription>
                                Informe os dados da sua chegada para registrar o ponto.
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
                                            <SelectContent>
                                                <SelectItem value="1">Unidade Faria Lima</SelectItem>
                                                <SelectItem value="2">CD Osasco</SelectItem>
                                                <SelectItem value="3">Escritório Central</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="observation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Observação (opcional)</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="Algum comentário sobre a chegada?"
                                                className="resize-none h-20"
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
                            <Button type="submit" className="gap-2" disabled={!form.watch('localId')}>
                                <CheckCircle2 className="h-4 w-4" /> Confirmar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
