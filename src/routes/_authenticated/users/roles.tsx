import { Outlet, createFileRoute } from '@tanstack/react-router'

function RolesLayout() {
  return <Outlet />
}

export const Route = createFileRoute('/_authenticated/users/roles')({
  component: RolesLayout,
})