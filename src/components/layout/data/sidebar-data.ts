import {
  LayoutDashboard,
  Settings,
  Users,
  Command,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: Omit<SidebarData, 'user'> = {
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    }
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Users',
          icon: Users,
          items: [
            {
              title: 'User',
              url: '/users',
            },
            {
              title: 'Role',
              url: '/users/roles',
            }
          ]
        },
        {
          title: 'Router Supervisors',
          url: '/router-supervisors',
          icon: Users,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          url: '/settings',
          icon: Settings,
        },
      ],
    },
  ],
}
