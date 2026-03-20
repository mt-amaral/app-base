import { create } from 'zustand'
import { accountService } from '@/services/Account/account-service'

interface AuthUser {
  name: string
  cpf: string
  roles?: string[]
  tipoFuncionarioId?: number
  matricula?: string
  token?: string
}

interface LoginPayload {
  cpf: string
  senha?: string
  rememberMe?: boolean
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isChecking: boolean
  isInitialized: boolean
  login: (payload: LoginPayload) => Promise<boolean>
  checkMe: () => Promise<boolean>
  initAuth: () => Promise<void>
  logout: () => Promise<void>
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isChecking: false,
  isInitialized: false,

  login: async (payload) => {
    try {
      const result = await accountService.login({
        cpf: payload.cpf,
        senha: payload.senha,
      })

      set({
        user: {
          name: result.nome,
          cpf: payload.cpf,
          tipoFuncionarioId: result.tipoFuncionarioId,
          matricula: result.matricula,
          token: result.token
        },
        isAuthenticated: true,
        isChecking: false,
      })

      return true
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isChecking: false,
      })
      return false
    }
  },

  checkMe: async () => {
    set({ isChecking: true })

    try {
      const result = await accountService.checkMe()

      set({
        user: result.data ?? null,
        isAuthenticated: true,
        isChecking: false,
      })

      return true
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isChecking: false,
      })

      return false
    }
  },

  initAuth: async () => {
    if (get().isInitialized) return

    set({ isChecking: true })
    try {
      const result = await accountService.checkMe()
      set({
        user: result.data ?? null,
        isAuthenticated: true,
        isInitialized: true,
      })
    } catch {
      set({
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      })
    } finally {
      set({ isChecking: false })
    }
  },

  logout: async () => {
    try {
      await accountService.logout()
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        isChecking: false,
        isInitialized: false,
      })
    }
  },

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isChecking: false,
      isInitialized: false,
    }),
}))