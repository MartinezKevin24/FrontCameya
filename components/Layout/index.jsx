import React from 'react'
import { useRouter } from 'next/router'
import PageRoutes from 'constants/routes/pages'
import LayoutDashboard from 'components/Layout/Dashboard'

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
    ].includes(pathname))
    return (
      <LayoutDashboard>
        {children}
      </LayoutDashboard>
    )

  return <div>{children}</div>
}
