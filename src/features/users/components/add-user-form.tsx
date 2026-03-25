import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import type { CreateUserPayload } from '@/services/User/user-service'

interface RoleOption {
    id: number
    name: string
}

interface AddUserFormProps {
    roles?: RoleOption[]
    onSubmit: (payload: CreateUserPayload) => Promise<void>
    loading?: boolean
}

const addUserFormSchema = z
    .object({
        userName: z
            .string()
            .trim()
            .min(1, 'Nome é obrigatório.')
            .min(3, 'Nome deve ter no mínimo 3 caracteres.')
            .max(100, 'Nome deve ter no máximo 100 caracteres.'),

        email: z
            .string()
            .trim()
            .min(1, 'Email é obrigatório.')
            .email('Email inválido.'),

        roleId: z
            .string()
            .min(1, 'Perfil é obrigatório.'),

        newPassword: z
            .string()
            .min(1, 'Senha é obrigatória.')
            .min(6, 'Senha deve ter no mínimo 6 caracteres.')
            .max(100, 'Senha deve ter no máximo 100 caracteres.'),

        confirmPassword: z
            .string()
            .min(1, 'Confirmação de senha é obrigatória.'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'As senhas precisam ser iguais.',
        path: ['confirmPassword'],
    })

type AddUserFormData = z.infer<typeof addUserFormSchema>

export function AddUserForm({
    roles = [],
    onSubmit,
    loading = false,
}: AddUserFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AddUserFormData>({
        resolver: zodResolver(addUserFormSchema),
        defaultValues: {
            userName: '',
            email: '',
            roleId: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const selectedRoleId = watch('roleId')

    async function handleFormSubmit(data: AddUserFormData) {
        await onSubmit({
            userName: data.userName.trim(),
            email: data.email.trim(),
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
            roleId: Number(data.roleId),
        })
    }

    return (
        <>
            <DialogHeader className='text-start'>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
                <DialogDescription>
                    Crie um novo usuário aqui. Clique em salvar quando terminar.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
                    <div className='space-y-4 px-0.5'>
                        <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                            <Label htmlFor='userName' className='col-span-2 text-end'>
                                Nome
                            </Label>
                            <div className='col-span-4'>
                                <Input
                                    id='userName'
                                    placeholder='john.doe'
                                    autoComplete='off'
                                    {...register('userName')}
                                />
                                {errors.userName && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.userName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                            <Label htmlFor='email' className='col-span-2 text-end'>
                                Email
                            </Label>
                            <div className='col-span-4'>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='john.doe@email.com'
                                    autoComplete='off'
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                            <Label className='col-span-2 text-end'>Perfil</Label>
                            <div className='col-span-4'>
                                <Select
                                    value={selectedRoleId}
                                    onValueChange={(value) =>
                                        setValue('roleId', value, { shouldValidate: true })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Selecione um perfil' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.length > 0 ? (
                                            roles.map((role) => (
                                                <SelectItem key={role.id} value={String(role.id)}>
                                                    {role.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value='no-role' disabled>
                                                Nenhum perfil disponível
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.roleId && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.roleId.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                            <Label htmlFor='newPassword' className='col-span-2 text-end'>
                                Senha
                            </Label>
                            <div className='relative col-span-4'>
                                <Input
                                    id='newPassword'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='e.g. S3cur3P@ssw0rd'
                                    className='pr-10'
                                    autoComplete='new-password'
                                    {...register('newPassword')}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2'
                                >
                                    {showPassword ? (
                                        <EyeOff className='h-4 w-4' />
                                    ) : (
                                        <Eye className='h-4 w-4' />
                                    )}
                                </button>
                                {errors.newPassword && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className='grid grid-cols-6 items-center gap-x-4 gap-y-1'>
                            <Label htmlFor='confirmPassword' className='col-span-2 text-end'>
                                Confirmar Senha
                            </Label>
                            <div className='relative col-span-4'>
                                <Input
                                    id='confirmPassword'
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='e.g. S3cur3P@ssw0rd'
                                    className='pr-10'
                                    autoComplete='new-password'
                                    {...register('confirmPassword')}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className='absolute right-3 top-1/2 -translate-y-1/2'
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className='h-4 w-4' />
                                    ) : (
                                        <Eye className='h-4 w-4' />
                                    )}
                                </button>
                                {errors.confirmPassword && (
                                    <p className='mt-1 text-sm text-red-500'>
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className='mt-4'>
                    <Button type='submit' disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar Usuário'}
                    </Button>
                </DialogFooter>
            </form>
        </>
    )
}