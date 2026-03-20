import { useLocation } from '@tanstack/react-router'

type BreadcrumbItem = {
    label: string
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
    '/settings': [
        { label: 'Settings' },
        { label: 'Account' },
    ],
    '/settings/appearance': [
        { label: 'Settings' },
        { label: 'Appearance' },
    ],
    '/users': [
        { label: 'Users' }
    ],
    '/users/roles': [
        { label: 'Users' },
        { label: 'Roles' },
    ],
    '/router-supervisors': [
        { label: 'Rotas' },
        { label: 'Supervisores' },
    ],
}

const defaultBreadcrumb: BreadcrumbItem[] = [
    { label: 'Dashboard' },
]

export function usePageBreadcrumb() {
    const location = useLocation()

    return breadcrumbMap[location.pathname] ?? defaultBreadcrumb
}