import { PageHeader } from '@/components/layout/page-header'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'

export function Dashboard() {

  return (
    <>
      {/* ===== Top Heading ===== */}
      <PageHeader />

      {/* ===== Main ===== */}
      <Main>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Dashboard
          </h1>
          <p className='text-muted-foreground'>
            Manage your Data.
          </p>
        </div>
        <Separator className='my-4 lg:my-6' />
      </Main>
    </>
  )
}