import {
  LayoutDashboard,
  Settings,
  Users,
  Crown
} from 'lucide-react'
import { type SidebarData } from '../types'
import { useAuthStore } from '@/stores/auth-store'

const user = useAuthStore.getState().user

const canViewUsers = user?.claims?.includes('users.view')
const canViewRoles = user?.claims?.includes('users.roles.view')

export const sidebarData: Omit<SidebarData, 'user'> = {
  teams: [
    {
      name: 'App Base',
      logo: Crown,
      plan: 'Business description',
    }
  ],
  navGroups: [
    {
      title: 'Geral',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Usuários',
          icon: Users,
          items: [
            ...(canViewUsers
              ? [
                {
                  title: 'Usuários',
                  url: '/users',
                },
              ]
              : []),

            ...(canViewRoles
              ? [
                {
                  title: 'Perfis',
                  url: '/users/roles',
                },
              ]
              : []),
          ],
        },
      ],
    },
    {
      title: 'Outros',
      items: [
        {
          title: 'Configurações',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}