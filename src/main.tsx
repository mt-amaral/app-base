import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { AxiosError } from 'axios'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { toast } from 'sonner'

import { useAuthStore } from '@/stores/auth-store'
import { handleServerError } from '@/lib/handle-server-error'
import { ThemeProvider } from './context/theme-provider'
import { routeTree } from './routeTree.gen'
import './styles/index.css'

const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined as unknown as QueryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

function handleAuthError(error: unknown) {
  if (!(error instanceof AxiosError)) return

  const status = error.response?.status

  if (status === 401) {
    useAuthStore.getState().clearAuth()
    const redirect = router.history.location.href
    toast.error('Session expired!')
    router.navigate({ to: '/signIn', search: { redirect } })
    return
  }

  if (status === 403) {
    router.navigate({ to: '/forbidden' as string, replace: true })
    return
  }

  if (status === 500) {
    toast.error('Internal Server Error!')
    if (import.meta.env.PROD) {
      router.navigate({ to: '/500' as string })
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (import.meta.env.DEV) return false

        if (error instanceof AxiosError) {
          const status = error.response?.status
          if (status && [400, 401, 403, 404].includes(status)) {
            return false
          }
        }

        return failureCount < 3
      },
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: false,
      onError: (error) => {
        handleServerError(error)
        handleAuthError(error)
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      handleAuthError(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleAuthError(error)
    },
  }),
})

router.update({
  context: {
    queryClient,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}