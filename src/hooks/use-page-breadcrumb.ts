import { useLocation } from '@tanstack/react-router'

type BreadcrumbItem = {
    label: string
    to?: string
}

const defaultBreadcrumb: BreadcrumbItem[] = [{ label: 'Dashboard' }]

export function usePageBreadcrumb() {
    const location = useLocation()
    const pathname = location.pathname

    if (pathname === '/settings') {
        return [
            { label: 'Configurações' },
            { label: 'Conta' },
        ]
    }

    if (pathname === '/settings/appearance') {
        return [
            { label: 'Configurações', to: '/settings' },
            { label: 'Aparência' },
        ]
    }

    if (pathname === '/users') {
        return [{ label: 'Usuários' }]
    }

    if (pathname === '/users/roles') {
        return [
            { label: 'Usuários', to: '/users' },
            { label: 'Perfis' },
        ]
    }

    if (/^\/users\/roles\/\d+\/edit$/.test(pathname)) {
        return [
            { label: 'Usuários', to: '/users' },
            { label: 'Perfis', to: '/users/roles' },
            { label: 'Permissões' },
        ]
    }

    return defaultBreadcrumb
}