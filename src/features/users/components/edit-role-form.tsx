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
import type { Role, UpdateRolePayload } from '@/services/Role/role-service'

const editRoleSchema = z.object({
    name: z.string(),
    description: z.string().trim().min(1, 'A descrição é obrigatória'),
})

type EditRoleFormData = z.infer<typeof editRoleSchema>

interface EditRoleFormProps {
    role: Role
    onSubmit: (data: UpdateRolePayload) => Promise<void>
    isSubmitting?: boolean
}

export function EditRoleForm({
    role,
    onSubmit,
    isSubmitting = false,
}: EditRoleFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditRoleFormData>({
        resolver: zodResolver(editRoleSchema),
        defaultValues: {
            name: role.name,
            description: role.description,
        },
    })

    const handleFormSubmit = async (data: EditRoleFormData) => {
        await onSubmit({
            id: role.id,
            name: data.name,
            description: data.description,
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogHeader className='text-start'>
                <DialogTitle>Editar perfil</DialogTitle>
                <DialogDescription>
                    Atualize o perfil aqui. Clique em salvar quando terminar.
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
                                className='w-full'
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
                    {isSubmitting ? 'Salvando...' : 'Salvar alterações'}
                </Button>
            </DialogFooter>
        </form>
    )
}