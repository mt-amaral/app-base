import {
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
          title: 'Minhas Rotas',
          url: '/router-supervisors',
          icon: Users,
        },
      ],
    },
  ],
}
