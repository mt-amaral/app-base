import { useState } from 'react'
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
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import { EditUserForm } from './edit-user-form'
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
  roles: RoleOption[]
  currentPage: number
  totalPages: number
  totalCount: number
  onPageChange: (page: number) => void
}

export function UserTable({
  users,
  roles,
  currentPage,
  totalPages,
  totalCount,
  onPageChange,
}: UserTableProps) {
  const [selectedUser, setSelectedUser] = useState<UserTableItem | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleEdit = (user: UserTableItem) => {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

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
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className='w-[60px] text-right'>Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.roleName}</TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' size='icon'>
                            <MoreHorizontal className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem onClick={() => handleEdit(user)}>
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user)}>
                            Deletar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className='text-center'>
                    No users found.
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

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className='sm:max-w-lg'>
          {selectedUser && <EditUserForm user={selectedUser} roles={roles} />}
        </DialogContent>
      </Dialog>

      {selectedUser && (
        <DeleteUserDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          user={selectedUser}
        />
      )}
    </>
  )
}