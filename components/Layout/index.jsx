import React from 'react'
import { useRouter } from 'next/router'
import PageRoutes from 'constants/routes/pages'
import LayoutDashboard from 'components/Layout/Dashboard'
import LayoutAdminDashaboard from 'components/Layout/AdminDashboard'

export default function Layout({children}) {

  const { pathname } = useRouter()

  if([
      PageRoutes.dashboard.index,
      PageRoutes.dashboard.profile.index,
      PageRoutes.dashboard.profile.edit,
      PageRoutes.dashboard.services.index,
      PageRoutes.dashboard.services.page,
      PageRoutes.dashboard.services.edit,
      PageRoutes.dashboard.ajustes,
      PageRoutes.dashboard.filtrado
    ].includes(pathname))
    return (
      <LayoutDashboard>
        {children}
      </LayoutDashboard>
    )

  if([
      PageRoutes.admin.dashboard,
      PageRoutes.admin.categorias,
      PageRoutes.admin.servicios
    ].includes(pathname))
    return (
      <LayoutAdminDashaboard>
        {children}
      </LayoutAdminDashaboard>
    )

  return <div>{children}</div>
}
