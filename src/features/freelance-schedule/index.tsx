import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { PageHeader } from '@/components/layout/page-header'
import { FreelanceCheckinDialog } from './components/freelance-checkin-dialog'
import { FreelanceScheduleTable } from './components/freelance-schedule-table'
import { WeekNavigation } from './components/week-navigation'
import { MOCK_FREELANCE_SCHEDULE } from './data/mock-freelance'

export function FreelanceSchedule() {
    return (
        <>
            <PageHeader />

            <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
                <div className='card-container'>
                    <div className='flex flex-col sm:flex-row justify-between sm:items-center space-y-4 sm:space-y-0 px-4 pt-4'>
                        <div className='space-y-0.5'>
                            <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
                                Meu Ponto
                            </h1>
                            <p className='text-muted-foreground'>
                                Gerencie seus horários e registros de check-in para os eventos.
                            </p>
                        </div>
                        <FreelanceCheckinDialog />
                    </div>

                    <Separator className='my-4 lg:my-6' />

                    <div className='px-4 pb-8 overflow-x-auto'>
                        <WeekNavigation />
                        <FreelanceScheduleTable items={MOCK_FREELANCE_SCHEDULE} />
                    </div>
                </div>
            </Main>
        </>
    )
}
