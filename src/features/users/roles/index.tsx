import { useCallback, useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { PageHeader } from '@/components/layout/page-header'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

import {
  roleService,
  type RoleList,
  type CreateRolePayload,
} from '@/services/Role/role-service'
import { RoleTable } from '../components/role-table'
import { AddRoleForm } from '../components/add-role-form'
import { TableSkeleton } from '@/components/ui/table-skeleton'
import { useAuthStore } from '@/stores/auth-store'

function getInitialFiltersFromUrl() {
  const params = new URLSearchParams(window.location.search)

  const page = Number(params.get('page') ?? '1')
  const search = params.get('search') ?? ''

  return {
    page: Number.isNaN(page) || page < 1 ? 1 : page,
    search,
  }
}

export function Roles() {
  const initialFilters = getInitialFiltersFromUrl()
  // ---- Permissões ----
  const user = useAuthStore((state) => state.user)
  const canCreateRole = user?.claims?.includes('users.roles.register')
  const canEditRole = user?.claims?.includes('users.roles.update')
  const canDeleteRole = user?.claims?.includes('users.roles.delete')
  const canViewClaims = user?.claims?.includes('users.claims.view')
  const canViewUsers = user?.claims?.includes('users.view')

  const [roles, setRoles] = useState<RoleList[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  const [currentPage, setCurrentPage] = useState(initialFilters.page)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const [searchString, setSearchString] = useState(initialFilters.search)

  const updateUrl = useCallback((page: number, search: string) => {
    const params = new URLSearchParams()

    if (page > 1) params.set('page', String(page))
    if (search.trim()) params.set('search', search.trim())

    const queryString = params.toString()
    const newUrl = queryString
      ? `${window.location.pathname}?${queryString}`
      : window.location.pathname

    window.history.replaceState({}, '', newUrl)
  }, [])

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true)

      const response = await roleService.listRoles({
        currentPage,
        pageSize,
        searchString: searchString.trim(),
      })

      setRoles(response.data ?? [])
      setCurrentPage(response.currentPage ?? currentPage)
      setTotalPages(response.totalPages ?? 1)
      setTotalCount(response.totalCount ?? 0)
    } catch (error) {
      console.error('Erro ao buscar perfis', error)
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, searchString])

  useEffect(() => {
    updateUrl(currentPage, searchString)
    fetchRoles()
  }, [currentPage, searchString, fetchRoles, updateUrl])

  const handleCreateRole = async (payload: CreateRolePayload) => {
    try {
      setIsCreating(true)

      await roleService.create(payload)
      setIsAddOpen(false)

      await fetchRoles()
    } catch (error) {
      console.error('Erro ao criar perfil', error)
    } finally {
      setIsCreating(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleChangeSearch = (value: string) => {
    setSearchString(value)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchString('')
    setCurrentPage(1)
  }

  return (
    <>
      <PageHeader />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex items-start justify-between gap-4'>
          <div className='space-y-0.5'>
            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
              Perfis
            </h1>
            <p className='text-muted-foreground'>
              Gerencie perfis de acesso.
            </p>
          </div>

          {canCreateRole && (
            <Button onClick={() => setIsAddOpen(true)}>
              <Plus className='mr-2 h-4 w-4' />
              Criar perfil
            </Button>
          )}
        </div>

        <Separator className='my-4 lg:my-6' />

        <div className='flex flex-col gap-3 md:flex-row md:items-end'>
          <div className='w-full md:max-w-sm'>
            <label className='mb-2 block text-sm font-medium'>Buscar</label>
            <Input
              placeholder='Nome ou descrição...'
              value={searchString}
              onChange={(e) => handleChangeSearch(e.target.value)}
            />
          </div>

          <div>
            <Button variant='outline' onClick={handleClearFilters}>
              Limpar filtros
            </Button>
          </div>
        </div>
        {loading ? (
          <TableSkeleton columns={5} rows={5} />
        ) : (
          <RoleTable
            roles={roles}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={handlePageChange}
            onRefresh={() => fetchRoles()}
            canEditRole={canEditRole}
            canDeleteRole={canDeleteRole}
            canViewClaims={canViewClaims}
            canViewUsers={canViewUsers}
          />
        )}
      </Main>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className='sm:max-w-lg'>
          <AddRoleForm
            onSubmit={handleCreateRole}
            isSubmitting={isCreating}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}