import { useState } from 'react'
import { Link } from '@tanstack/react-router'
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
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Pencil,
  Trash2,
} from 'lucide-react'
import { DeleteUserDialog } from './delete-user-dialog'

export interface UserTableItem {
  id: number
  name: string
  email: string
  roleId: number
  roleName: string
}

export interface RoleOption {
  id: number
  name: string
}

interface UserTableProps {
  users: UserTableItem[]
  currentPage: number
  totalPages: number
  totalCount: number
  onPageChange: (page: number) => void
  onEdit: (user: UserTableItem) => void
  onDelete: (userId: number) => Promise<void> | void
  isDeletingUser?: boolean
  canEditUser: boolean | undefined
  canDeleteUser: boolean | undefined
  canViewClaims: boolean | undefined
}

export function UserTable({
  users,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
  onEdit,
  onDelete,
  isDeletingUser = false,
  canEditUser,
  canDeleteUser,
  canViewClaims,

}: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserTableItem | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const canShowActions = Boolean(canEditUser || canDeleteUser)

  const handleDelete = (user: UserTableItem) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

  return (
    <>
      <div className='space-y-4'>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[220px]'>Nome</TableHead>
                <TableHead className='w-[320px]'>Email</TableHead>
                <TableHead className='w-[180px]'>Perfil</TableHead>
                <TableHead className='w-[60px] text-center'></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {canViewClaims ? (<Link
                        to='/users/roles/$roleId/edit'
                        params={{ roleId: String(user.roleId) }}
                        className='text-primary hover:underline'
                      >
                        {user.roleName}
                      </Link>
                      ) : (
                        user.roleName
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

                          <DropdownMenuContent align='end' className='w-40 p-1'>
                            {canEditUser && (
                              <DropdownMenuItem
                                onClick={() => onEdit(user)}
                                className='flex items-center justify-between rounded-md px-3 py-2'
                              >
                                <span>Editar</span>
                                <Pencil className='h-4 w-4 text-muted-foreground' />
                              </DropdownMenuItem>
                            )}


                            {canDeleteUser && (
                              <DropdownMenuItem
                                onClick={() => handleDelete(user)}
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
                  <TableCell colSpan={4} className='text-center'>
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className='flex items-center justify-between'>
          <div className='text-sm text-muted-foreground'>
            Página {currentPage} de {totalPages} • {totalCount} registro(s)
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

      {selectedUser && (
        <DeleteUserDialog
          open={isDeleteOpen}
          onOpenChange={(open) => {
            setIsDeleteOpen(open)
            if (!open) setSelectedUser(null)
          }}
          user={selectedUser}
          onConfirm={async (userId) => {
            await onDelete(userId)
            setIsDeleteOpen(false)
            setSelectedUser(null)
          }}
          loading={isDeletingUser}
        />
      )}
    </>
  )
}