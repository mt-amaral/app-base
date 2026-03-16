import { PageHeader } from '@/components/layout/page-header'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'

export function Roles() {

  return (
    <>
      <PageHeader />

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Roles
          </h1>
          <p className='text-muted-foreground'>
            Manage your roles.
          </p>
        </div>

        <Separator className='my-4 lg:my-6' />
      </Main>
    </>
  )
}