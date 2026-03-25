import { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { PageHeader } from '@/components/layout/page-header'
import { Main } from '@/components/layout/main'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { roleClaimService, type RoleClaimItem } from '@/services/RoleClaim/role-claim-service'
import { TableSkeleton } from '@/components/ui/table-skeleton'
import { useAuthStore } from '@/stores/auth-store'

const SUBGROUP_LABELS: Record<string, string> = {
  users: 'Usuários',
  general: 'Geral',
  roles: 'Perfis de Acesso',
  claims: 'Permissões',
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

export function RoleClaimsEditorPage() {
  const user = useAuthStore((state) => state.user)

  const canViewClaims = user?.claims?.includes('users.claims.view')
  const canUpdateClaims = user?.claims?.includes('users.claims.update')

  const navigate = useNavigate()
  const { roleId } = useParams({ from: '/_authenticated/users/roles/$roleId/edit' })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [roleName, setRoleName] = useState('')
  const [claims, setClaims] = useState<RoleClaimItem[]>([])

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true)
        const response = await roleClaimService.getByRoleId(Number(roleId))
        const data = response.data

        setRoleName(data?.roleName ?? '')
        setClaims(data?.claims ?? [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (canViewClaims || canUpdateClaims) {
      fetchClaims()
    } else {
      setLoading(false)
    }
  }, [roleId, canViewClaims, canUpdateClaims])

  const groupedData = useMemo(() => {
    return claims.reduce((acc, claim) => {
      const parts = claim.claimValue.split('.')
      const module = parts[0]
      const sub = parts.length > 2 ? parts[1] : 'general'

      if (!acc[module]) acc[module] = {}
      if (!acc[module][sub]) acc[module][sub] = []

      acc[module][sub].push(claim)
      return acc
    }, {} as Record<string, Record<string, RoleClaimItem[]>>)
  }, [claims])

  const defaultTab = useMemo(() => Object.keys(groupedData)[0], [groupedData])

  const handleToggle = (claimValue: string) => {
    if (!canUpdateClaims) return

    setClaims((prev) =>
      prev.map((c) =>
        c.claimValue === claimValue
          ? { ...c, selected: !c.selected }
          : c
      )
    )
  }

  const handleToggleModule = (moduleKey: string, select: boolean) => {
    if (!canUpdateClaims) return

    setClaims((prev) =>
      prev.map((c) =>
        c.claimValue.startsWith(`${moduleKey}.`)
          ? { ...c, selected: select }
          : c
      )
    )
  }

  const handleSave = async () => {
    if (!canUpdateClaims) return

    try {
      setSaving(true)

      const selectedClaims = claims
        .filter((claim) => claim.selected)
        .map((claim) => claim.claimValue)

      await roleClaimService.update({
        roleId: Number(roleId),
        claims: selectedClaims,
      })

      navigate({ to: '/users/roles' })
    } catch (error) {
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (!canViewClaims && !canUpdateClaims) {
    return (
      <>
        <PageHeader />
        <Main className='flex flex-1 flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <h1 className='text-xl font-bold tracking-tight'>Permissões do Perfil</h1>
              <p className='text-sm text-muted-foreground'>
                Você não tem permissão para visualizar esta página.
              </p>
            </div>

            <Button
              variant='outline'
              size='sm'
              onClick={() => navigate({ to: '/users/roles' })}
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Voltar
            </Button>
          </div>
        </Main>
      </>
    )
  }

  return (
    <>
      <PageHeader />
      <Main className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h1 className='text-xl font-bold tracking-tight'>Permissões do Perfil</h1>
            <p className='text-sm text-muted-foreground'>
              Editando acesso para:{' '}
              <span className='font-semibold text-foreground'>{roleName}</span>
            </p>
          </div>

          <Button
            variant='outline'
            size='sm'
            onClick={() => navigate({ to: '/users/roles' })}
          >
            <ArrowLeft className='mr-2 h-4 w-4' />
            Voltar
          </Button>
        </div>

        <Separator />

        {loading ? (
          <TableSkeleton columns={3} rows={2} />
        ) : (
          <Tabs defaultValue={defaultTab} className='w-full'>
            <TabsList className='bg-muted/50 p-1 gap-1 h-10 mb-6'>
              {Object.keys(groupedData).map((mod) => (
                <TabsTrigger
                  key={mod}
                  value={mod}
                  className='capitalize px-6 data-[state=active]:bg-background data-[state=active]:shadow-sm'
                >
                  {mod}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(groupedData).map(([moduleKey, subGroups]) => {
              const allSelected = claims
                .filter((c) => c.claimValue.startsWith(moduleKey))
                .every((c) => c.selected)

              return (
                <TabsContent
                  key={moduleKey}
                  value={moduleKey}
                  className='mt-0 border rounded-xl bg-card shadow-sm'
                >
                  <div className='bg-muted/30 px-6 py-2 border-b flex justify-end items-center'>
                    {canUpdateClaims && (
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-xs h-8 font-medium hover:bg-background text-muted-foreground hover:text-foreground transition-colors'
                        onClick={() => handleToggleModule(moduleKey, !allSelected)}
                      >
                        {allSelected ? 'Desmarcar tudo' : 'Marcar tudo'}
                      </Button>
                    )}
                  </div>

                  <div className='p-6 space-y-10'>
                    {Object.entries(subGroups).map(([subKey, subClaims]) => (
                      <div key={subKey} className='space-y-4'>
                        <div className='flex items-center gap-3'>
                          <h3 className='text-sm font-bold text-foreground/80'>
                            {SUBGROUP_LABELS[subKey] || capitalize(subKey)}
                          </h3>
                          <Separator className='flex-1 opacity-40' />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3'>
                          {subClaims.map((claim) => (
                            <div
                              key={claim.claimValue}
                              className='group flex items-center space-x-3 p-3 rounded-lg border border-transparent hover:border-border hover:bg-muted/30 transition-all'
                              onClick={() => handleToggle(claim.claimValue)}
                            >
                              <Checkbox
                                id={claim.claimValue}
                                checked={claim.selected}
                                disabled={!canUpdateClaims}
                                onCheckedChange={() => handleToggle(claim.claimValue)}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <label
                                htmlFor={claim.claimValue}
                                className={`text-sm font-medium leading-tight transition-colors ${canUpdateClaims
                                    ? 'cursor-pointer group-hover:text-primary'
                                    : 'cursor-not-allowed text-muted-foreground'
                                  }`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                {claim.description}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              )
            })}
          </Tabs>
        )}

        <div className='flex justify-end pt-4 border-t mt-4'>
          {canUpdateClaims && (
            <Button
              onClick={handleSave}
              disabled={saving || loading}
              className='px-10 h-11 font-semibold shadow-lg shadow-primary/20'
            >
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          )}
        </div>
      </Main>
    </>
  )
}