import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

import { useAuthStore } from '@/stores/auth-store'
import { userService } from '@/services/User/user-service'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const accountFormSchema = z
  .object({
    userName: z
      .string()
      .trim()
      .min(1, 'Nome é obrigatório.')
      .min(3, 'Nome deve ter no mínimo 3 caracteres.')
      .max(100, 'Nome deve ter no máximo 100 caracteres.'),
    email: z
      .string()
      .trim()
      .min(1, 'Email é obrigatório.')
      .email('Email inválido.'),
    newPassword: z
      .string()
      .max(100, 'Senha deve ter no máximo 100 caracteres.')
      .or(z.literal('')),
    confirmPassword: z
      .string()
      .max(100, 'Confirmação de senha deve ter no máximo 100 caracteres.')
      .or(z.literal('')),
  })
  .refine((data) => !data.newPassword || data.newPassword.length >= 6, {
    message: 'Senha deve ter no mínimo 6 caracteres.',
    path: ['newPassword'],
  })
  .refine(
    (data) =>
      (!data.newPassword && !data.confirmPassword) ||
      data.newPassword === data.confirmPassword,
    {
      message: 'As senhas precisam ser iguais.',
      path: ['confirmPassword'],
    }
  )

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm() {
  const user = useAuthStore((state) => state.user)
  const checkMe = useAuthStore((state) => state.checkMe)

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      userName: user?.name || '',
      email: user?.email || '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: AccountFormValues) {
    if (!user?.id || !user?.roleId) {
      toast.error('Erro de autenticação', {
        description: 'Não foi possível encontrar as informações da conta.',
      })
      return
    }

    setLoading(true)
    try {
      await userService.updateLogged({
        userName: data.userName.trim(),
        email: data.email.trim(),
        newPassword: data.newPassword || undefined,
        confirmPassword: data.confirmPassword || undefined,
        roleId: user.roleId,
      })

      form.setValue('newPassword', '')
      form.setValue('confirmPassword', '')

      await checkMe()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='userName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder='Seu nome' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='Seu email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova senha</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Deixe em branco para não alterar'
                    className='pr-10'
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirme a nova senha'
                    className='pr-10'
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </form>
    </Form>
  )
}
