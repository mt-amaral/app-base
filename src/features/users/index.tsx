import { useEffect, useState } from 'react'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { UserTable, type UserTableItem } from './components/user-table'
import { userService, type User } from '@/services/User/user-service'
import { roleService, type Role } from '@/services/Role/role-service'
import { PageHeader } from '@/components/layout/page-header'

export function Users() {
  const [users, setUsers] = useState<UserTableItem[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const [usersResponse, rolesResponse] = await Promise.all([
          userService.listUsers({
            currentPage,
            pageSize,
          }),
          roleService.listRoles(),
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
        console.error('Failed to fetch users', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage, pageSize])

  return (
    <>
      <PageHeader />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Users
          </h1>
          <p className='text-muted-foreground'>
            Manage your users.
          </p>
        </div>

        <Separator className='my-4 lg:my-6' />

        {loading ? (
          <div className='flex justify-center p-8'>Loading users...</div>
        ) : (
          <UserTable
            users={users}
            roles={roles.map((role) => ({
              id: role.id,
              name: role.name,
            }))}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            onPageChange={setCurrentPage}
          />
        )}
      </Main>
    </>
  )
}