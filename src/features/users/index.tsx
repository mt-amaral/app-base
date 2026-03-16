import { useEffect, useState } from 'react'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { UserTable } from './components/user-table'
import { userService, type User } from '@/services/User/user-service'
import { PageHeader } from '@/components/layout/page-header'

export function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)

        const response = await userService.listUsers({
          currentPage,
          pageSize,
        })

        setUsers(response.data ?? [])
        setCurrentPage(response.currentPage)
        setTotalPages(response.totalPages)
        setTotalCount(response.totalCount)
      } catch (error) {
        console.error('Failed to fetch users', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
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
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalCount={totalCount}
            onPageChange={setCurrentPage}
          />
        )}
      </Main>
    </>
  )
}