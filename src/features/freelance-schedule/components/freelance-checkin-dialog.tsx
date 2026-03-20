import { useState, useRef, useCallback } from 'react'
import Webcam from 'react-webcam'
import { MapPin, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
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
import { CameraSection } from './camera-section'

const DIAS_SEMANA: Record<number, string> = {
    0: 'Domingo',
    1: 'Segunda-feira',
    2: 'Terça-feira',
    3: 'Quarta-feira',
    4: 'Quinta-feira',
    5: 'Sexta-feira',
    6: 'Sábado',
}

interface FormValues {
    localId: string
    observation: string
    photo: string | null
}

export function FreelanceCheckinDialog() {
    const [open, setOpen] = useState(false)
    const webcamRef = useRef<Webcam>(null)
    
    const form = useForm<FormValues>({
        defaultValues: { localId: '', observation: '', photo: null }
    })

    const photo = form.watch('photo')
    const nomeDia = DIAS_SEMANA[new Date().getDay()]

    const handleCapture = useCallback(() => {
        const image = webcamRef.current?.getScreenshot()
        if (image) form.setValue('photo', image)
    }, [form])

    const handleReset = () => {
        form.reset()
        setOpen(false)
    }

    const onSubmit = (data: FormValues) => {
        console.log('Submit Check-in:', { ...data, dia: nomeDia })
        handleReset()
    }

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) handleReset(); setOpen(v); }}>
            <DialogTrigger asChild>
                <Button className="gap-2 shadow-sm active:scale-95 transition-all bg-primary hover:bg-primary/90 text-primary-foreground">
                    <MapPin className="h-4 w-4" /> Realizar Check-in
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[480px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <MapPin className="h-6 w-6 text-primary" /> 
                                Check-in Freelance - {nomeDia}
                            </DialogTitle>
                            <DialogDescription>Confirme sua localização e capture uma foto para registrar sua entrada.</DialogDescription>
                        </DialogHeader>

                        <CameraSection 
                            photo={photo}
                            webcamRef={webcamRef} 
                            onCapture={handleCapture}
                            onClear={() => form.setValue('photo', null)}
                        />

                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="localId"
                                rules={{ required: 'Campo obrigatório' }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-semibold text-foreground/80">Unidade de Atendimento</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full py-5"><SelectValue placeholder="Selecione o local..." /></SelectTrigger>
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
                                        <FormLabel className="font-semibold text-foreground/80">Observações (opcional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Opcional..." className="resize-none h-20 bg-muted/5" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button type="button" variant="outline" onClick={() => handleReset()}>Cancelar</Button>
                            <Button type="submit" className="gap-2 px-8 min-w-[140px]" disabled={!form.watch('localId') || !photo}>
                                <CheckCircle2 className="h-4 w-4" /> Confirmar Check-in
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
