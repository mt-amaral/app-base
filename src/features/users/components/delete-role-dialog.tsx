import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Role } from '@/services/Role/role-service'

interface DeleteRoleDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    role: Role
    onConfirm: (roleId: number) => Promise<void>
    isSubmitting?: boolean
}

export function DeleteRoleDialog({
    open,
    onOpenChange,
    role,
    onConfirm,
    isSubmitting = false,
}: DeleteRoleDialogProps) {
    const [value, setValue] = useState('')

    const isValid = value.trim() === role.name

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen) {
            setValue('')
        }

        onOpenChange(nextOpen)
    }

    const handleConfirm = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()

        if (!isValid || isSubmitting) return

        await onConfirm(role.id)
        setValue('')
    }

    return (
        <AlertDialog open={open} onOpenChange={handleOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className='text-destructive'>
                        <span className='inline-flex items-center gap-2'>
                            <AlertTriangle className='h-5 w-5' />
                            Excluir perfil
                        </span>
                    </AlertDialogTitle>

                    <AlertDialogDescription asChild>
                        <div className='space-y-4 text-sm'>
                            <p>
                                Tem certeza que deseja excluir o perfil{' '}
                                <span className='font-bold'>{role.name}</span>?
                                <br />
                                Esta ação removerá permanentemente este perfil do sistema.
                                Isso não poderá ser desfeito.
                            </p>

                            <div className='space-y-2'>
                                <Label htmlFor='confirm-role-delete'>
                                    Digite o nome do perfil para confirmar
                                </Label>
                                <Input
                                    id='confirm-role-delete'
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder='Digite o nome do perfil para confirmar a exclusão'
                                />
                            </div>

                            <Alert variant='destructive'>
                                <AlertTitle>Atenção!</AlertTitle>
                                <AlertDescription>
                                    Tenha cuidado, esta operação não poderá ser revertida.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isSubmitting}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={!isValid || isSubmitting}
                        onClick={handleConfirm}
                    >
                        {isSubmitting ? 'Excluindo...' : 'Excluir'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}