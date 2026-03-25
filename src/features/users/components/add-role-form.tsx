import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { CreateRolePayload } from '@/services/Role/role-service'

const addRoleSchema = z.object({
    name: z.string(),
    description: z.string().trim().min(1, 'A descrição é obrigatória'),
})

type AddRoleFormData = z.infer<typeof addRoleSchema>

interface AddRoleFormProps {
    onSubmit: (data: CreateRolePayload) => Promise<void>
    isSubmitting?: boolean
}

export function AddRoleForm({
    onSubmit,
    isSubmitting = false,
}: AddRoleFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddRoleFormData>({
        resolver: zodResolver(addRoleSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    const handleFormSubmit = async (data: AddRoleFormData) => {
        await onSubmit({
            name: data.name,
            description: data.description,
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogHeader className='text-start'>
                <DialogTitle>Novo Perfil</DialogTitle>
                <DialogDescription>
                    Crie um novo perfil aqui. Clique em salvar quando terminar.
                </DialogDescription>
            </DialogHeader>

            <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
                <div className='space-y-4 px-0.5'>
                    <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                        <Label htmlFor='name' className='col-span-2 text-end'>
                            Nome
                        </Label>
                        <div className='col-span-4'>
                            <Input
                                id='name'
                                placeholder='Administrador'
                                autoComplete='off'
                                {...register('name')}
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-6 items-start gap-x-4 gap-y-1'>
                        <Label htmlFor='description' className='col-span-2 pt-2 text-end'>
                            Descrição
                        </Label>
                        <div className='col-span-4'>
                            <Textarea
                                id='description'
                                placeholder='Descreva este perfil'
                                className='min-h-24'
                                {...register('description')}
                            />
                            {errors.description && (
                                <p className='mt-1 text-sm text-destructive'>
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <DialogFooter className='mt-4'>
                <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Salvando...' : 'Salvar Perfil'}
                </Button>
            </DialogFooter>
        </form>
    )
}