import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
import { Checkbox } from '@/components/ui/checkbox'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

const signInSchema = z.object({
    email: z.string().email('Digite um email válido.'),
    password: z.string().min(1, 'A senha é obrigatória.'),
    rememberMe: z.boolean(),
})

type SignInValues = z.infer<typeof signInSchema>

export function SignIn() {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const form = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: true,
        },
    })

    async function onSubmit(data: SignInValues) {
        setErrorMessage('')
        setLoading(true)

        try {
            const success = await login({
                email: data.email,
                password: data.password,
                rememberMe: data.rememberMe,
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
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="admin@teste.com"
                                                    disabled={loading}
                                                    autoComplete="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between gap-2">
                                                <FormLabel>Senha</FormLabel>
                                                <button
                                                    type="button"
                                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                                >
                                                    Esqueci minha senha
                                                </button>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="••••••••"
                                                    disabled={loading}
                                                    autoComplete="current-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="rememberMe"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked) => field.onChange(checked === true)}
                                                    disabled={loading}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal text-muted-foreground">
                                                Lembrar de mim
                                            </FormLabel>
                                        </FormItem>
                                    )}
                                />

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
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}