import { useLocation } from '@tanstack/react-router'

type BreadcrumbItem = {
    label: string
}

const breadcrumbMap: Record<string, BreadcrumbItem[]> = {
    '/settings': [
        { label: 'Account' },
    ],

    '/router-supervisors': [
        { label: 'Rotas' },
        { label: 'Supervisores' },
    ],

    '/freelance-schedule': [
        { label: 'Meu Ponto' },
    ],
}

const defaultBreadcrumb: BreadcrumbItem[] = [
    { label: 'Rotas' },
    { label: 'Supervisores' },
]

export function usePageBreadcrumb() {
    const location = useLocation()

    return breadcrumbMap[location.pathname] ?? defaultBreadcrumb
}