import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import type { ApiResponse } from '@/services/ApiResponse'

const apiUrl = "https://localhost:8091/api/v1"

export const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
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