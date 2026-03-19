import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { RouterSupervisorTable } from './components/router-supervisor-steps'
import { PageHeader } from '@/components/layout/page-header'
import { CheckinDialog } from './components/checkin-dialog'

export function RouterSupervisors() {

    return (
        <>
            <PageHeader />

            <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='card-container'>
                    <div className='flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0 px-4 pt-4'>
                        <div className='space-y-0.5'>
                            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                                Minhas Rotas
                            </h1>
                            <p className='text-muted-foreground'>
                                Visualize o progresso dos seus roteiros diários.
                            </p>
                        </div>
                        <CheckinDialog />
                    </div>

                    <Separator className='my-4 lg:my-6' />

                    <div className='px-4 pb-8'>
                        <RouterSupervisorTable />
                    </div>
                </div>
            </Main>
        </>
    )
}
