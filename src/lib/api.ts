import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import type { ApiResponse } from '@/services/ApiResponse'

let apiUrl = import.meta.env.VITE_API_URL

// Em desenvolvimento, converte a URL absoluta em um caminho relativo
// (ex: https://localhost:44327/api/v1 -> /api/v1)
// Isso força a requisição a passar pelo proxy do Vite configurado no vite.config.ts,
// que contorna o erro de CORS do navegador.
if (import.meta.env.DEV) {
    try {
        const url = new URL(apiUrl)
        apiUrl = url.pathname
    } catch {
        // Ignora caso a url já seja um caminho relativo
    }
}

export const api = axios.create({
    baseURL: apiUrl,
})

let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: unknown) => void
    reject: (reason?: unknown) => void
}> = []

function processQueue(error: unknown = null) {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve()
        }
    })

    failedQueue = []
}

api.interceptors.response.use(
    (response) => {
        const data = response.data as ApiResponse<unknown>
        if (data?.message) {
            toast.success(data.message)
        }
        return response
    },
    async (error: AxiosError<ApiResponse<unknown>>) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean
        }

        const status = error.response?.status

        const isRefreshRequest = originalRequest?.url?.includes('/Account/Refresh')
        const isLoginRequest = originalRequest?.url?.includes('/Account/Login')

        if (status === 401 && !isRefreshRequest && !isLoginRequest) {
            if (originalRequest._retry) {
                return Promise.reject(error)
            }
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: () => resolve(api(originalRequest)),
                        reject,
                    })
                })
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                await axios.post(
                    `${apiUrl}/Account/Refresh`,
                    {},
                    { withCredentials: true }
                )

                processQueue()

                return api(originalRequest)
            } catch (refreshError) {
                useAuthStore.getState().clearAuth()
                if (window.location.pathname !== '/signIn') {
                    window.location.href = '/signIn'
                }

                processQueue(refreshError)
                return Promise.reject(refreshError)
            } finally {
                isRefreshing = false
            }
        }

        const message = error.response?.data?.message
        if (message) {
            if (status && status >= 400 && status < 500) {
                toast.warning(message)
            } else {
                toast.error(message)
            }
        }

        return Promise.reject(error)
    }
)