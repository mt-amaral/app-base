import { useEffect, useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import {
    MoreHorizontal,
    Pencil,
    ShieldCheck,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
    roleService,
    type Role,
    type RoleList,
    type UpdateRolePayload,
} from '@/services/Role/role-service'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { EditRoleForm } from './edit-role-form'
import { DeleteRoleDialog } from './delete-role-dialog'

interface RoleTableProps {
    roles: RoleList[]
    currentPage: number
    totalPages: number
    totalCount: number
    onPageChange: (page: number) => void
    onRefresh: () => Promise<void>
    canEditRole: boolean | undefined
    canDeleteRole: boolean | undefined
    canViewClaims: boolean | undefined
    canViewUsers: boolean | undefined
}

export function RoleTable({
    roles,
    currentPage,
    totalPages,
    totalCount,
    onPageChange,
    onRefresh,
    canEditRole,
    canDeleteRole,
    canViewClaims,
    canViewUsers,
}: RoleTableProps) {
    const navigate = useNavigate()

    const [localRoles, setLocalRoles] = useState<RoleList[]>(roles)
    const [selectedRole, setSelectedRole] = useState<Role | null>(null)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        setLocalRoles(roles)
    }, [roles])

    const handleEdit = (role: RoleList) => {
        setSelectedRole({
            id: role.id,
            name: role.name,
            description: role.description,
        })
        setIsEditOpen(true)
    }

    const handleDelete = (role: RoleList) => {
        setSelectedRole({
            id: role.id,
            name: role.name,
            description: role.description,
        })
        setIsDeleteOpen(true)
    }

    const handleNavigateToClaims = (roleId: number) => {
        navigate({
            to: '/users/roles/$roleId/edit',
            params: { roleId: String(roleId) },
        })
    }

    const handleUpdateRole = async (payload: UpdateRolePayload) => {
        try {
            setIsEditing(true)

            const response = await roleService.update(payload)
            const updatedRole = response.data

            if (updatedRole) {
                setLocalRoles((prev) =>
                    prev.map((role) =>
                        role.id === updatedRole.id
                            ? {
                                ...role,
                                id: updatedRole.id,
                                name: updatedRole.name,
                                description: updatedRole.description,
                            }
                            : role
                    )
                )

                setSelectedRole(updatedRole)
            }

            setIsEditOpen(false)
        } catch (error) {
            console.error('Erro ao atualizar perfil', error)
        } finally {
            setIsEditing(false)
        }
    }

    const handleConfirmDelete = async (roleId: number) => {
        try {
            setIsDeleting(true)

            await roleService.delete(roleId)
            setIsDeleteOpen(false)
            setSelectedRole(null)

            if (localRoles.length === 1 && currentPage > 1) {
                onPageChange(currentPage - 1)
                return
            }

            await onRefresh()
        } catch (error) {
            console.error('Erro ao excluir perfil', error)
        } finally {
            setIsDeleting(false)
        }
    }

    const canShowActions = Boolean(canViewClaims || canEditRole || canDeleteRole)

    return (
        <>
            <div className='space-y-4'>
                <div className='rounded-md border'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='w-[80px] text-center'>ID</TableHead>
                                <TableHead className='w-[220px]'>Nome</TableHead>
                                <TableHead className='w-[320px]'>Descrição</TableHead>
                                <TableHead className='w-[120px] text-center'>Usuários</TableHead>
                                <TableHead className='w-[60px] text-center'></TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {localRoles.length > 0 ? (
                                localRoles.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className='text-center'>{role.id}</TableCell>

                                        <TableCell>
                                            {canViewClaims ? (
                                                <Link
                                                    to='/users/roles/$roleId/edit'
                                                    params={{ roleId: String(role.id) }}
                                                    className='text-primary hover:underline'
                                                >
                                                    {role.name}
                                                </Link>
                                            ) : (
                                                role.name
                                            )}
                                        </TableCell>

                                        <TableCell>{role.description}</TableCell>

                                        <TableCell className='text-center'>
                                            {canViewUsers ? (<Link
                                                to='/users'
                                                search={{ roleId: role.id }}
                                                className='text-primary hover:underline'
                                            >
                                                {role.countUser}
                                            </Link>) : (
                                                role.countUser
                                            )}
                                        </TableCell>

                                        <TableCell className='text-center'>
                                            {canShowActions && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button
                                                            variant='ghost'
                                                            size='icon'
                                                            className='h-8 w-8 text-muted-foreground'
                                                        >
                                                            <MoreHorizontal className='h-4 w-4' />
                                                        </Button>
                                                    </DropdownMenuTrigger>

                                                    <DropdownMenuContent align='end' className='w-44 p-1'>
                                                        {canViewClaims && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleNavigateToClaims(role.id)}
                                                                className='flex items-center justify-between rounded-md px-3 py-2'
                                                            >
                                                                <span>Permissões</span>
                                                                <ShieldCheck className='h-4 w-4 text-muted-foreground' />
                                                            </DropdownMenuItem>
                                                        )}

                                                        {canEditRole && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleEdit(role)}
                                                                className='flex items-center justify-between rounded-md px-3 py-2'
                                                            >
                                                                <span>Editar perfil</span>
                                                                <Pencil className='h-4 w-4 text-muted-foreground' />
                                                            </DropdownMenuItem>
                                                        )}

                                                        {canDeleteRole && (
                                                            <DropdownMenuItem
                                                                onClick={() => handleDelete(role)}
                                                                className='flex items-center justify-between rounded-md px-3 py-2 text-red-600 focus:text-red-600'
                                                            >
                                                                <span>Deletar</span>
                                                                <Trash2 className='h-4 w-4' />
                                                            </DropdownMenuItem>
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className='text-center'>
                                        Nenhum perfil encontrado.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='text-sm text-muted-foreground'>
                        Página {currentPage} de {totalPages} • {totalCount} perfil(s)
                    </div>

                    <div className='flex items-center gap-2'>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage <= 1}
                        >
                            <ChevronLeft className='h-4 w-4' />
                        </Button>

                        <span className='text-sm'>{currentPage}</span>

                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}
                        >
                            <ChevronRight className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className='sm:max-w-lg'>
                    {selectedRole && (
                        <EditRoleForm
                            role={selectedRole}
                            onSubmit={handleUpdateRole}
                            isSubmitting={isEditing}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {selectedRole && (
                <DeleteRoleDialog
                    open={isDeleteOpen}
                    onOpenChange={setIsDeleteOpen}
                    role={selectedRole}
                    onConfirm={handleConfirmDelete}
                    isSubmitting={isDeleting}
                />
            )}
        </>
    )
}