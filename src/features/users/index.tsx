import { useCallback, useEffect, useState } from 'react'
import { UserPlus } from 'lucide-react'

import { Main } from '@/components/layout/main'
import { PageHeader } from '@/components/layout/page-header'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuthStore } from '@/stores/auth-store'

import { UserTable, type UserTableItem } from './components/user-table'
import { AddUserForm } from './components/add-user-form'
import { EditUserForm } from './components/edit-user-form'
import { TableSkeleton } from '@/components/ui/table-skeleton'

import {
  userService,
  type User,
  type CreateUserPayload,
  type UpdateUserByIdPayload,
} from '@/services/User/user-service'
import { roleService, type Role } from '@/services/Role/role-service'

function getInitialFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search)

  const page = Number(params.get('page') ?? '1')
  const search = params.get('search') ?? ''
  const roleIdParam = params.get('roleId')

  const roleId =
    roleIdParam && !Number.isNaN(Number(roleIdParam))
      ? Number(roleIdParam)
      : null

  return {
    page: Number.isNaN(page) || page < 1 ? 1 : page,
    search,
    roleId,
  }
}

export function Users() {
  const initialFilters = getInitialFiltersFromUrl()

  const [users, setUsers] = useState<UserTableItem[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [isUpdatingUser, setIsUpdatingUser] = useState(false)
  const [isDeletingUser, setIsDeletingUser] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserTableItem | null>(null)

  const [currentPage, setCurrentPage] = useState(initialFilters.page)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  // ---- Permissões ----
  const user = useAuthStore((state) => state.user)
  const canCreateUser = user?.claims?.includes('users.register')
  const canEditUser = user?.claims?.includes('users.update')
  const canDeleteUser = user?.claims?.includes('users.delete')
  const canViewClaims = user?.claims?.includes('users.claims.view')

  const [searchString, setSearchString] = useState(initialFilters.search)
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(
    initialFilters.roleId
  )

  const updateUrl = useCallback(
    (page: number, search: string, roleId: number | null) => {
      const params = new URLSearchParams()

      if (page > 1) params.set('page', String(page))
      if (search.trim()) params.set('search', search.trim())
      if (roleId !== null) params.set('roleId', String(roleId))

      const queryString = params.toString()
      const newUrl = queryString
        ? `${window.location.pathname}?${queryString}`
        : window.location.pathname

      window.history.replaceState({}, '', newUrl)
    },
    []
  )

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)

      const [usersResponse, rolesResponse] = await Promise.all([
        userService.listUsers({
          currentPage,
          pageSize,
          searchString: searchString.trim(),
          roleId: selectedRoleId,
        }),
        roleService.listAllRoles(),
      ])

      const fetchedRoles = rolesResponse.data ?? []
      const rolesMap = new Map<number, string>(
        fetchedRoles.map((role: Role) => [role.id, role.name])
      )

      const mappedUsers: UserTableItem[] = (usersResponse.data ?? []).map(
        (user: User) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          roleId: user.roleId,
          roleName: rolesMap.get(user.roleId) ?? 'Sem role',
        })
      )

      setRoles(fetchedRoles)
      setUsers(mappedUsers)
      setCurrentPage(usersResponse.currentPage)
      setTotalPages(usersResponse.totalPages)
      setTotalCount(usersResponse.totalCount)
    } catch (error) {
      console.error('Erro ao buscar usuários', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, searchString, selectedRoleId])

  useEffect(() => {
    updateUrl(currentPage, searchString, selectedRoleId)
    fetchData()
  }, [currentPage, searchString, selectedRoleId, fetchData, updateUrl])

  async function handleCreateUser(payload: CreateUserPayload) {
    try {
      setIsCreatingUser(true)
      await userService.create(payload)
      setIsAddOpen(false)
      await fetchData()
    } catch (error) {
      console.error('Erro ao criar usuário', error)
    } finally {
      setIsCreatingUser(false)
    }
  }

  function handleOpenEdit(user: UserTableItem) {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

  async function handleUpdateUser(payload: UpdateUserByIdPayload) {
    try {
      setIsUpdatingUser(true)
      await userService.update(payload)
      setIsEditOpen(false)
      setSelectedUser(null)
      await fetchData()
    } catch (error) {
      console.error('Erro ao atualizar usuário', error)
    } finally {
      setIsUpdatingUser(false)
    }
  }

  async function handleDeleteUser(userId: number) {
    try {
      setIsDeletingUser(true)
      await userService.delete(userId)
      await fetchData()
    } catch (error) {
      console.error('Erro ao excluir usuário', error)
    } finally {
      setIsDeletingUser(false)
    }
  }

  function handleChangeSearch(value: string) {
    setSearchString(value)
    setCurrentPage(1)
  }

  function handleChangeRole(value: string) {
    setSelectedRoleId(value === 'all' ? null : Number(value))
    setCurrentPage(1)
  }

  function handleClearFilters() {
    setSearchString('')
    setSelectedRoleId(null)
    setCurrentPage(1)
  }

  return (
    <>
      <PageHeader />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex items-start justify-between gap-4'>
          <div className='space-y-0.5'>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Usuários
            </h1>
          </div>

          {canCreateUser && (
            <Button onClick={() => setIsAddOpen(true)}>
              <UserPlus className='mr-2 h-4 w-4' />
              Criar usuário
            </Button>
          )}
        </div>

        <Separator className='my-4 lg:my-6' />

        <div className='flex flex-col gap-3 md:flex-row md:items-end'>
          <div className='w-full md:max-w-sm'>
            <label className='mb-2 block text-sm font-medium'>Buscar</label>
            <Input
              placeholder='Nome ou email...'
              value={searchString}
              onChange={(e) => handleChangeSearch(e.target.value)}
            />
          </div>

          <div className='w-full md:max-w-xs'>
            <label className='mb-2 block text-sm font-medium'>Perfil</label>
            <Select
              value={selectedRoleId === null ? 'all' : String(selectedRoleId)}
              onValueChange={handleChangeRole}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecione um perfil' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>Todos</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button variant='outline' onClick={handleClearFilters}>
              Limpar filtros
            </Button>
          </div>
        </div>

        {loading ? (
          <TableSkeleton columns={4} rows={5} />
        ) : (
          <UserTable
            users={users}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={setCurrentPage}
            onEdit={handleOpenEdit}
            onDelete={handleDeleteUser}
            isDeletingUser={isDeletingUser}
            canEditUser={canEditUser}
            canDeleteUser={canDeleteUser}
            canViewClaims={canViewClaims}
          />
        )}
      </Main>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className='sm:max-w-lg'>
          <AddUserForm
            roles={roles.map((role) => ({
              id: role.id,
              name: role.name,
            }))}
            onSubmit={handleCreateUser}
            loading={isCreatingUser}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open)
          if (!open) setSelectedUser(null)
        }}
      >
        <DialogContent className='sm:max-w-lg'>
          {selectedUser && (
            <EditUserForm
              user={selectedUser}
              roles={roles.map((role) => ({
                id: role.id,
                name: role.name,
              }))}
              onSubmit={handleUpdateUser}
              loading={isUpdatingUser}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}