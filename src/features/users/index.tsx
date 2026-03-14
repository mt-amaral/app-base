// import { getRouteApi } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Separator } from '@/components/ui/separator'

// const route = getRouteApi('/_authenticated/users/')

export function Users() {
  // const search = route.useSearch()
  // const navigate = route.useNavigate()

  return (
    <>
      <Header fixed>
        <div className='ms-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            User
          </h1>
          <p className='text-muted-foreground'>
            Manage your users.
          </p>
        </div>
        <Separator className='my-4 lg:my-6' />
      </Main>
    </>
  )
}
