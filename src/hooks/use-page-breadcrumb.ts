import { useLocation } from '@tanstack/react-router'

type BreadcrumbItem = {
    label: string
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
    '/settings': [
        { label: 'Account' },
    ],

    '/router-supervisors': [
        { label: 'Rotas do Supervisor' },
    ],

    '/freelance-schedule': [
        { label: 'Meu Ponto' },
    ],
}

const defaultBreadcrumb: BreadcrumbItem[] = [
    { label: 'Rotas do Supervisor' },
]

export function usePageBreadcrumb() {
    const location = useLocation()

    return breadcrumbMap[location.pathname] ?? defaultBreadcrumb
}