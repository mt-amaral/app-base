import { useEffect, useState } from 'react'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { RouterSupervisorTable, type RouterSupervisorTableItem } from './components/router-supervisor-table'
import { routerSupervisorService, type RouterSupervisor } from '@/services/RouterSupervisor/router-supervisor-service'
import { PageHeader } from '@/components/layout/page-header'

export function RouterSupervisors() {
  const [routerSupervisors, setRouterSupervisors] = useState<RouterSupervisorTableItem[]>([])
  const [loading, setLoading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // const response = await routerSupervisorService.listRouterSupervisors({
        //   currentPage,
        //   pageSize,
        // })

        const response = {
          data: [
            {
              id: 1,
              name: 'Marina Silva',
              cpf: '203.200.102-21',
              active: true,
            },
            {
              id: 2,
              name: 'João Silva',
              cpf: '203.200.102-21',
              active: true,
            },
            {
              id: 3,
              name: 'Maria Silva',
              cpf: '203.200.102-21',
              active: true,
            },
          ],
          currentPage,
          pageSize,
          totalPages: 1,
          totalCount: 3,
        }
        const mappedItems: RouterSupervisorTableItem[] = (response.data ?? []).map(
          (item: RouterSupervisor) => ({
            id: item.id,
            name: item.name,
            cpf: item.cpf,
            active: item.active,
          })
        )

        setRouterSupervisors(mappedItems)
        setCurrentPage(response.currentPage)
        setTotalPages(response.totalPages)
        setTotalCount(response.totalCount)
      } catch (error) {
        console.error('Failed to fetch router supervisors', error)
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
            Router Supervisors
          </h1>
          <p className='text-muted-foreground'>
            Manage your router supervisors.
          </p>
        </div>

        <Separator className='my-4 lg:my-6' />

        {loading ? (
          <div className='flex justify-center p-8'>Loading router supervisors...</div>
        ) : (
          <RouterSupervisorTable
            items={routerSupervisors}
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
