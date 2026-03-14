import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

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
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8">
            <div className="w-full max-w-md">
                <Card className="border-border/60 shadow-sm">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Entrar
                        </CardTitle>
                        <CardDescription>
                            Informe seu email e senha para acessar o sistema.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@teste.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <button
                                        type="button"
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        Esqueci minha senha
                                    </button>
                                </div>

                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                                    disabled={loading}
                                />
                                <Label
                                    htmlFor="rememberMe"
                                    className="text-sm font-normal text-muted-foreground"
                                >
                                    Lembrar de mim
                                </Label>
                            </div>

                            {errorMessage ? (
                                <div
                                    className={cn(
                                        'rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive'
                                    )}
                                >
                                    {errorMessage}
                                </div>
                            ) : null}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Entrando...
                                    </span>
                                ) : (
                                    'Entrar'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}