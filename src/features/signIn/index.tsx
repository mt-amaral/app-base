import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuthStore } from '@/stores/auth-store'

export function SignIn() {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(true)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrorMessage('')
        setLoading(true)

        try {
            const success = await login({
                email,
                password,
                rememberMe,
            })

            if (!success) {
                setErrorMessage('Email ou senha inválidos')
                return
            }

            await navigate({ to: '/' })
        } catch {
            setErrorMessage('Não foi possível entrar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='flex min-h-screen items-center justify-center p-6'>
            <div className='w-full max-w-sm rounded-md border p-6'>
                <h1 className='mb-4 text-xl font-semibold'>Entrar</h1>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='mb-1 block text-sm'>Email</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full rounded-md border px-3 py-2'
                            placeholder='admin@teste.com'
                        />
                    </div>

                    <div>
                        <label className='mb-1 block text-sm'>Senha</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full rounded-md border px-3 py-2'
                            placeholder='••••••••'
                        />
                    </div>

                    <label className='flex items-center gap-2 text-sm'>
                        <input
                            type='checkbox'
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        Lembrar de mim
                    </label>

                    {errorMessage ? (
                        <p className='text-sm text-red-500'>{errorMessage}</p>
                    ) : null}

                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full rounded-md border px-3 py-2'
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}